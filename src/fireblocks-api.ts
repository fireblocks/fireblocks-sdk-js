import { IAuthProvider } from "./iauth-provider";
import { ApiTokenProvider } from "./api-token-provider";
import { VaultAccountResponse, TransactionOperation, CreateTransactionResponse, TransactionArguments, AssetResponse, ExchangeResponse } from "./types";
import { ApiClient } from "./api-client";

export class FireblocksApi {

    private authProvider: IAuthProvider;
    private apiBaseUrl: string;
    private apiClient: ApiClient;

    /**
     * Creates a new Fireblocks API.
     * @param privateKey A string representation of your private key.
     * @param apiKey Your api key. This is a uuid you received from Fireblocks.
     * @param apiBaseUrl The fireblocks server URL. Leave empty to use the production server.
     */
    constructor(privateKey: string, apiKey: string, apiBaseUrl: string = "https://api.fireblocks.io") {
        this.authProvider = new ApiTokenProvider(privateKey, apiKey);

        if (apiBaseUrl) {
            this.apiBaseUrl = apiBaseUrl;
        }

        this.apiClient = new ApiClient(this.authProvider, this.apiBaseUrl);
    }

    public async getExchangeAccounts(): Promise<ExchangeResponse[]> {
        const path = "/v1/exchange_accounts";
        return await this.apiClient.issueGetRequest(path);
    }

    public async createVaultAccount(name: string): Promise<VaultAccountResponse> {
        const body = {
            name: name
        };

        const path = "/v1/vault/accounts";
        return this.apiClient.issuePostRequest(path, body);
    }

    public async createVaultAsset(vaultAccountId: string, assetId: string): Promise<AssetResponse> {
        const path = `/v1/vault/accounts/${vaultAccountId}/${assetId}`;

        return this.apiClient.issuePostRequest(path, {});
    }

    public async createTransaction(args: TransactionArguments): Promise<CreateTransactionResponse> {
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
        return this.apiClient.issuePostRequest(path, body);
    }
}
