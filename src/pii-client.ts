import { dynamicImport } from "tsimportlib";
import { TransactionArguments, TravelRule, TravelRuleOptions } from "./types";
import * as util from "util";

const requiredFields = [
    "kmsSecretKey",
    "baseURLPII",
    "audiencePII",
    "clientId",
    "clientSecret",
    "authURL",
    "jsonDidKey",
];

export class PIIEncryption {
    public toolset: any;
    private static PIIsdk: any;

    async init() {
        if (!PIIEncryption.PIIsdk) {
            PIIEncryption.PIIsdk = await dynamicImport("@notabene/pii-sdk", module) as typeof import("@notabene/pii-sdk");
        }
    }

    constructor(private readonly config: TravelRuleOptions) {
        this.config = config;
        const missingFields = requiredFields.filter(
            (field) => !(field in this.config)
        );

        if (missingFields.length > 0) {
            throw new Error(
                `Missing PII configuration fields: ${missingFields.join(", ")}`
            );
        }
    }

    async hybridEncode(transaction: any) {
        const { travelRuleMessage } = transaction;
        const pii = travelRuleMessage.pii || {
            originator: travelRuleMessage.originator,
            beneficiary: travelRuleMessage.beneficiary,
        };
        const { beneficiaryDidKey, jsonDidKey, kmsSecretKey } = this.config;
        const counterpartyDIDKey = beneficiaryDidKey || undefined;

        let piiIvms;

        try {
            const {toolset, agent} = await this.initializePiiClient(jsonDidKey, kmsSecretKey);
            piiIvms = await toolset.generatePIIField({
                pii,
                originatorVASPdid: travelRuleMessage.originatorVASPdid,
                beneficiaryVASPdid: travelRuleMessage.beneficiaryVASPdid,
                counterpartyDIDKey,
                agent,
                senderDIDKey: JSON.parse(jsonDidKey).did,
                encryptionMethod: PIIEncryption.PIIsdk.PIIEncryptionMethod.HYBRID,
            });
        } catch (error) {
            const errorMessage = error.message || error.toString();
            const errorDetails = JSON.stringify(error);
            throw new Error(`Failed to generate PII fields error: ${errorMessage}. Details: ${errorDetails}`);
        }

        transaction.travelRuleMessage = this.travelRuleMessageHandler(travelRuleMessage, piiIvms);

        return transaction;
    }

    async initializePiiClient(jsonDidKey: string, kmsSecretKey: string) {
        await this.init();
        let agent;

        agent = PIIEncryption.PIIsdk.initAgent({ KMS_SECRET_KEY: kmsSecretKey }).agent;
        await agent.didManagerImport(JSON.parse(jsonDidKey));

        const toolset = new PIIEncryption.PIIsdk.default({
            kmsSecretKey: this.config.kmsSecretKey,
            piiURL: this.config.baseURLPII,
            audience: this.config.audiencePII,
            clientId: this.config.clientId,
            clientSecret: this.config.clientSecret,
            authURL: this.config.authURL,
        });

        return { toolset, agent } ;
    }

    private travelRuleMessageHandler(travelRuleMessage: TravelRule, piiIvms: any): TravelRule {
        travelRuleMessage.beneficiary = piiIvms.beneficiary;
        travelRuleMessage.originator = piiIvms.originator;

        travelRuleMessage.beneficiary = {
            originatorPersons: piiIvms.beneficiary.beneficairyPersons,
            accountNumber: piiIvms.beneficiary.accountNumber,
        };

        return travelRuleMessage;
    }
}