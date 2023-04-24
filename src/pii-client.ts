import PIIsdk, {
    AgentType,
    initAgent,
    PIIEncryptionMethod,
} from "@notabene/pii-sdk";
import { TransactionArguments, TravelRuleOptions } from "./types";
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
            agent = initAgent({ KMS_SECRET_KEY: kmsSecretKey }).agent as AgentType;
            await agent.didManagerImport(JSON.parse(jsonDidKey));
            piiIvms = await this.toolset.generatePIIField({
                pii,
                originatorVASPdid: travelRuleMessage.originatorVASPdid,
                beneficiaryVASPdid: travelRuleMessage.beneficiaryVASPdid,
                counterpartyDIDKey,
                agent,
                senderDIDKey: JSON.parse(jsonDidKey).did,
                encryptionMethod: PIIEncryptionMethod.HYBRID,
            });
        } catch (error) {
            const errorMessage = error.message || error.toString();
            const errorDetails = JSON.stringify(error);
            throw new Error(`Failed to generate PII fields error: ${errorMessage}. Details: ${errorDetails}`);
        }

        travelRuleMessage.beneficiary = piiIvms.beneficiary;
        travelRuleMessage.originator = piiIvms.originator;
        console.dir(travelRuleMessage, { depth: null });

        transaction.travelRuleMessage = travelRuleMessage;

        console.log("TRAVEL RULE________", util.inspect(travelRuleMessage, false, null, true /* enable colors */));

        return transaction;
    }
}

const test = {
    "originatorVASPdid": "did:ethr:0x44957e75d6ce4a5bf37aae117da86422c848f7c2",
    "travelRuleBehavior": false,
    "beneficiaryVASPdid": "did:ethr:0xc7d10be62c7a5af366a13511fe5e0584b891",
    "beneficiaryVASPname": "",
    "originator": {
        "originatorPersons": [
            {
                "naturalPerson": {
                    "name": [
                        {
                            "nameIdentifier": [
                                {
                                    "primaryIdentifier": "QmaJkoTzJJy5Fh3JrLGH2TMQ8rtfNCuM5qJcpweGqd42ag",
                                    "secondaryIdentifier": "QmUK2T3cbDaMWHFwxHJVqoVfadSDL9F9bZ2xYJuXtFUMNC"
                                }
                            ]
                        }
                    ],
                    "geographicAddress": [
                        {
                            "streetName": "QmcD3Sr83UPqCwYjurZ7125TxdDQSAZSHJSKFMNkAKt1dT",
                            "buildingNumber": "QmfMzVjxHHuLhQ4tx8WgoZF7bPEYLFL1oNiiykR8dRohBW",
                            "buildingName": "QmX7TkdiLC1E3muBQzL6H66SLLP12BzpHZALw9HJ1esQhe",
                            "townName": "QmXeDAZ6HWzrFda6iHciuD6Y1A1Ar5iAbmjJ7GY3tvhFLv",
                            "countrySubDivision": "QmUkZ127Cj4cBM2vuenG3LQgp8JvpGLHDYWmTrZZLdG2tF",
                            "postCode": "QmanicrtWEt7sdXq8e36bEoPCS4u8McCLfjcYZqKoSJyPy",
                            "country": "QmT9nGQ7oVYiK4n1dZGei76Y76LwB8fiN4j6mNGsgV9MnB"
                        }
                    ],
                    "nationalIdentification": {
                        "countryOfIssue": "QmYzaC7d9qGGGAap1hyRfZnMzLwRLmo4dCgCTrjbKwbhHS",
                        "nationalIdentifier": "QmQnAVmRwa6Gb64LWLsND7K4E3mXfy6qhLRCL6oARpbtqe",
                        "nationalIdentifierType": "QmaprMsUxAvynZZEqdKKEnRoRGWNMoFnDs2zs5LXyG5KVv",
                        "registrationAuthority": "QmQRHt73XRQemtVr8x23HrAa2xbWZzoE5dGuHZvKdWR6a1"
                    },
                    "dateAndPlaceOfBirth": {
                        "dateOfBirth": "QmfFC7j59Rb6QC7RCFaszgMQS688KoP3wsZ6VjNunJqtmf",
                        "placeOfBirth": "QmdrPrvGYNr18o5oGbZnpdE59V8oQdJ6N7CEgqUAbSE64g"
                    }
                }
            }
        ],
        "accountNumber": [ "QmWS9ASedBbA5sWEij1nSq1uwRAwZ1XqMTydxdFAv6TVNh" ]
    },
    "beneficiary": {
        "beneficiaryPersons": [
            {
                "naturalPerson": {
                    "name": [
                        {
                            "nameIdentifier": [
                                {
                                    "primaryIdentifier": "QmUbXfZY12T9QqFUjuq9CxKcsBk4nWg1wsbYKuBxz4pxq3",
                                    "secondaryIdentifier": "QmcXaX8aoL7k5BuL89gUT8HvjKT1mmyA2yAUVxpxjjkXVc"
                                }
                            ]
                        }
                    ],
                    "geographicAddress": [
                        {
                            "streetName": "QmZ1jSkoK3N5fQnE8tqoiY2wq52PJWUHXuHKmb7DNpuAis",
                            "buildingNumber": "QmQcoFGA1xakyjQzKG6F6XyY7eynRS4AaSMYkqUozYhFjZ",
                            "buildingName": "QmbVcJbL5rn3WsV4AmSAja1ocUhDCft5eshsbwxpLjXCVv",
                            "townName": "QmPYrrJH3vXzrY6C1H23mzV84vkL8AsMTXdfPj5cxWJiqh",
                            "countrySubDivision": "QmP2rEuedaj9EYi7d4noyqQTYJ3e7ZDmke882wAqufXD1o",
                            "postCode": "QmRd3S1aDGyqoh313jjvgqe248KFC4exiSdgf2Yu71YNKV",
                            "country": "QmWeDNbW7MbhUUwueHYKDpThQ12q75fWZEnueXK8zkERKt"
                        }
                    ]
                }
            }
        ],
        "aaccountNumber": [ "QmdKDKHV7yr2aarqTznPD2E1yvSoRPmDjM6Jdnxdr1LsXE" ]
    }
};