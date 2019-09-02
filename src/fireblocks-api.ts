import { ApiClient } from "./api-client";
import { ApiTokenProvider } from "./api-token-provider";
import { IAuthProvider } from "./iauth-provider";
import { VaultAccountResponse, TransactionOperation, CreateTransactionResponse, TransactionArguments, AssetResponse,
    ExchangeResponse, TransactionResponse, TransactionFilter, CancelTransactionResponse, WalletContainerResponse } from "./types";
import queryString from "query-string";

export class FireblocksApi {

    private authProvider: IAuthProvider;
    private apiBaseUrl: string;
    private apiClient: ApiClient;

    /**
     * Creates a new Fireblocks API Client.
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
        return await this.apiClient.issueGetRequest("/v1/exchange_accounts");
    }

    public async getTransactions(filter: TransactionFilter): Promise<TransactionResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/transactions?${queryString.stringify(filter)}`);
    }

    public async getTransactionById(txId: string): Promise<TransactionResponse> {
        return await this.apiClient.issueGetRequest(`/v1/transactions/${txId}`);
    }

    public async getInternalWallets(): Promise<WalletContainerResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/internal_wallets");
    }

    public async getexternalWallets(): Promise<WalletContainerResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/external_wallets");
    }

    public async cancelTransactionById(txId: string): Promise<CancelTransactionResponse> {
        return await this.apiClient.issuePostRequest(`/v1/transactions/${txId}/cancel`, {});
    }

    public async createVaultAccount(name: string): Promise<VaultAccountResponse> {
        const body = {
            name: name
        };

        return this.apiClient.issuePostRequest("/v1/vault/accounts", body);
    }

    public async createVaultAsset(vaultAccountId: string, assetId: string): Promise<AssetResponse> {
        return this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}`, {});
    }

    public async createTransaction(args: TransactionArguments): Promise<CreateTransactionResponse> {
        return this.apiClient.issuePostRequest("/v1/transactions", args);
    }
}
