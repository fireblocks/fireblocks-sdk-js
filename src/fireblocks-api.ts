import { IAuthProvider } from "./iauth-provider";
import { ApiTokenProvider } from "./api-token-provider";
import requestPromise from "request-promise-native";
import { VaultAccountResponse, TransactionOperation, CreateTransactionResponse, TransactionArguments, AssetResponse } from "./types";

export class FireblocksApi {

    private authProvider: IAuthProvider;
    private apiBaseUrl: string;

    constructor(privateKeyFilePath: string, apiKey: string, apiBaseUrl: string = "https://api.fireblocks.io") {
        this.authProvider = new ApiTokenProvider(privateKeyFilePath, apiKey);
        if (apiBaseUrl) {
            this.apiBaseUrl = apiBaseUrl;
        }
    }

    public async createVaultAccount(name: string): Promise<VaultAccountResponse> {
        const body = {
            name: name
        };

        const path = "/v1/vault/accounts";
        const token = this.authProvider.signJwt(path, body);

        return await requestPromise.post({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            body: body,
            json: true
        });
    }

    public async createVaultAsset(vaultAccountId: string, assetId: string): Promise<AssetResponse> {
        const path = `/v1/vault/accounts/${vaultAccountId}/${assetId}`;
        const token = this.authProvider.signJwt(path);

        return await requestPromise.post({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            json: true
        });
    }

    public async getExchangeAccounts() {
        const path = "/v1/exchange_accounts";
        const token = this.authProvider.signJwt(path);

        return await requestPromise.get({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            json: true
        });
    }

    async createTransaction(args: TransactionArguments): Promise<CreateTransactionResponse> {
        const body = {
            assetId: args.assetId,
            source: args.source,
            destination: args.destination,
            amount: args.amount,
            fee: args.fee || -1,
            waitForStatus: args.waitForStatus || false,
            operation: args.operation || TransactionOperation.TRANSFER
        };

        const path = "/v1/transactions";
        const token = this.authProvider.signJwt(path, body);

        return await requestPromise.post({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey,
                "Authorization": `Bearer ${token}`
            },
            body: body,
            json: true
        });
    }
}
