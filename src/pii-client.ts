import PIIsdk, { PIIEncryptionMethod } from "@notabene/pii-sdk";
import { TransactionArguments, TravelRule, TravelRuleEncryptionOptions, TravelRuleOptions } from "./types";
import * as util from "util";

const requiredFields = [
    "baseURLPII",
    "audiencePII",
    "clientId",
    "clientSecret",
    "authURL",
    "jsonDidKey",
];

export class PIIEncryption {
    public toolset: PIIsdk;

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

        this.toolset = new PIIsdk({
            piiURL: config.baseURLPII,
            audience: config.audiencePII,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            authURL: config.authURL,
        });
    }

    async hybridEncode(transaction: TransactionArguments, travelRuleEncryptionOptions?: TravelRuleEncryptionOptions) {
        const { travelRuleMessage } = transaction;
        const pii = travelRuleMessage.pii || {
            originator: travelRuleMessage.originator,
            beneficiary: travelRuleMessage.beneficiary,
        };
        const { jsonDidKey } = this.config;
        const counterpartyDIDKey = travelRuleEncryptionOptions?.beneficiaryPIIDidKey;
        
        let piiIvms;

        try {
            piiIvms = await this.toolset.generatePIIField({
                pii,
                originatorVASPdid: travelRuleMessage.originatorVASPdid,
                beneficiaryVASPdid: travelRuleMessage.beneficiaryVASPdid,
                counterpartyDIDKey,
                keypair: JSON.parse(jsonDidKey),
                senderDIDKey: JSON.parse(jsonDidKey).did,
                encryptionMethod: travelRuleEncryptionOptions?.sendToProvider
                    ? PIIEncryptionMethod.HYBRID
                    : PIIEncryptionMethod.END_2_END,
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
            originatorPersons: piiIvms.beneficiary.beneficiaryPersons,
            accountNumber: piiIvms.beneficiary.accountNumber,
        };

        return travelRuleMessage;
    }
}