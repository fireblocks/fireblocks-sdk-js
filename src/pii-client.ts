import { dynamicImport } from "tsimportlib";
import { TransactionArguments, TravelRule, TravelRuleOptions } from "./types";

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
        PIIEncryption.PIIsdk = await dynamicImport("@notabene/pii-sdk", module) as typeof import("@notabene/pii-sdk");
    }

    constructor(private readonly config: TravelRuleOptions) {
        this.init();
        while (!PIIEncryption.PIIsdk) {
            console.info("waiting for init");
        }

        this.config = config;
        const missingFields = requiredFields.filter(
            (field) => !(field in this.config)
        );

        if (missingFields.length > 0) {
            throw new Error(
                `Missing PII configuration fields: ${missingFields.join(", ")}`
            );
        }

        this.toolset = new PIIEncryption.PIIsdk.default({
            kmsSecretKey: config.kmsSecretKey,
            piiURL: config.baseURLPII,
            audience: config.audiencePII,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            authURL: config.authURL,
        });
    }

    async hybridEncode(transaction: TransactionArguments) {
        const { travelRuleMessage } = transaction;
        const pii = travelRuleMessage.pii || {
            originator: travelRuleMessage.originator,
            beneficiary: travelRuleMessage.beneficiary,
        };
        const { beneficiaryDidKey, jsonDidKey, kmsSecretKey } = this.config;
        const counterpartyDIDKey = beneficiaryDidKey || undefined;

        let piiIvms;
        let agent;

        try {
            agent = PIIEncryption.PIIsdk.initAgent({ KMS_SECRET_KEY: kmsSecretKey }).agent as any;
            await agent.didManagerImport(JSON.parse(jsonDidKey));
            piiIvms = await this.toolset.generatePIIField({
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