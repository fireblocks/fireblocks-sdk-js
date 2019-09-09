import { ApiClient } from "./api-client";
import { ApiTokenProvider } from "./api-token-provider";
import { IAuthProvider } from "./iauth-provider";
import { VaultAccountResponse, CreateTransactionResponse, TransactionArguments, AssetResponse,
    ExchangeResponse, TransactionResponse, TransactionFilter, CancelTransactionResponse, WalletContainerResponse, WalletAssetResponse, DepositAddressResponse } from "./types";
import queryString from "query-string";

export class FireblocksSDK {

    private authProvider: IAuthProvider;
    private apiBaseUrl: string;
    private apiClient: ApiClient;

    /**
     * Creates a new Fireblocks API Client.
     * @param privateKey A string representation of your private key.
     * @param apiKey Your api key. This is a uuid you received from Fireblocks.
     * @param apiBaseUrl The fireblocks server URL. Leave empty to use the default server.
     */
    constructor(privateKey: string, apiKey: string, apiBaseUrl: string = "https://api.fireblocks.io") {
        this.authProvider = new ApiTokenProvider(privateKey, apiKey);

        if (apiBaseUrl) {
            this.apiBaseUrl = apiBaseUrl;
        }

        this.apiClient = new ApiClient(this.authProvider, this.apiBaseUrl);
    }

    /**
     * Gets all vault accounts for your tenant.
     */
    public async getVaultAccounts(): Promise<VaultAccountResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/vault/accounts");
    }

     /**
      * Gets a single vault account.
      * @param vaultAccountId The vault account ID.
      */
    public async getVaultAccount(vaultAccountId: string): Promise<VaultAccountResponse> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}`);
    }

     /**
      * Gets a single vault account asset.
      * @param vaultAccountId The vault account ID.
      * @param assetId The ID of the asset to get.
      */
    public async getVaultAccountAsset(vaultAccountId: string, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}`);
    }

     /**
      * Gets deposit addresses for an asset in a vault account.
      * @param vaultAccountId The vault account ID.
      * @param assetId The ID of the asset for which to get the deposit address.
      */
    public async getDepositAddresses(vaultAccountId: string, assetId: string): Promise<DepositAddressResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses`);
    }

    /**
     * Gets all exchange accounts for your tenant.
     */
    public async getExchangeAccounts(): Promise<ExchangeResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/exchange_accounts");
    }

    /**
     * Gets a single exchange account by ID.
     * @param exchangeAccountId The exchange account ID.
     */
    public async getExchangeAccount(exchangeAccountId: string): Promise<ExchangeResponse> {
        return await this.apiClient.issueGetRequest(`/v1/exchange_accounts/${exchangeAccountId}`);
    }

    /**
     * Gets a list of transactions matching the given filter.
     * @param filter.before Only gets transactions created before a given timestamp (in seconds).
     * @param filter.after Only gets transactions created after a given timestamp (in seconds).
     * @param filter.status Only gets transactions with the spcified status.
     */
    public async getTransactions(filter: TransactionFilter): Promise<TransactionResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/transactions?${queryString.stringify(filter)}`);
    }

    /**
     * Gets all internal wallets for your tenant.
     */
    public async getInternalWallets(): Promise<WalletContainerResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/internal_wallets");
    }

    /**
     * Gets a single internal wallet.
     * @param walletId The internal wallet ID.
     */
    public async getInternalWallet(walletId: string): Promise<WalletContainerResponse> {
        return await this.apiClient.issueGetRequest(`/v1/internal_wallets/${walletId}`);
    }

    /**
     * Gets a single internal wallet asset.
     * @param walletId The internal wallet ID.
     * @param assetId The asset ID.
     */
    public async getInternalWalletAsset(walletId: string, assetId: string): Promise<WalletAssetResponse> {
        return await this.apiClient.issueGetRequest(`/v1/internal_wallets/${walletId}/${assetId}`);
    }

    /**
     * Gets all external wallets for your tenant.
     */
    public async getExternalWallets(): Promise<WalletContainerResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/external_wallets");
    }

    /**
     * Gets a single external wallet.
     * @param walletId The external wallet ID.
     */
    public async getExternalWallet(walletId: string): Promise<WalletContainerResponse> {
        return await this.apiClient.issueGetRequest(`/v1/external_wallets/${walletId}`);
    }

    /**
     * Gets a single external wallet asset.
     * @param walletId The external wallet ID.
     * @param assetId The asset ID.
     */
    public async getExternalWalletAsset(walletId: string, assetId: string): Promise<WalletAssetResponse> {
        return await this.apiClient.issueGetRequest(`/v1/external_wallets/${walletId}/${assetId}`);
    }

    /**
     * Gets detailed information for a single transaction.
     * @param txId The transaction id to query.
     */
    public async getTransactionById(txId: string): Promise<TransactionResponse> {
        return await this.apiClient.issueGetRequest(`/v1/transactions/${txId}`);
    }

    /**
     * Cancels the selected transaction.
     * @param txId The transaction id to cancel.
     */
    public async cancelTransactionById(txId: string): Promise<CancelTransactionResponse> {
        return await this.apiClient.issuePostRequest(`/v1/transactions/${txId}/cancel`, {});
    }

    /**
     * Creates a new vault account.
     * @param name A name for the new vault account.
     */
    public async createVaultAccount(name: string): Promise<VaultAccountResponse> {
        const body = {
            name: name
        };

        return await this.apiClient.issuePostRequest("/v1/vault/accounts", body);
    }

    /**
     * Creates a new asset within an existing vault account.
     * @param vaultAccountId The vault account ID.
     * @param assetId The asset to add.
     */
    public async createVaultAsset(vaultAccountId: string, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}`, {});
    }

    public async createExternalWallet(name: string): Promise<WalletContainerResponse> {
        const body = {
            name: name
        };

        return await this.apiClient.issuePostRequest("/v1/external_wallets", body);
    }

    /**
     * Creates a new internal wallet.
     * @param name A name for the new internal wallet.
     */
    public async createInternalWallet(name: string): Promise<WalletContainerResponse> {
        const body = {
            name: name
        };

        return await this.apiClient.issuePostRequest("/v1/internal_wallets", body);
    }

    /**
     * Creates a new asset within an exiting external wallet.
     * @param walletId The wallet id.
     * @param assetId The asset to add.
     * @param address The wallet address.
     * @param tag (for ripple only) The ripple account tag.
     */
    public async createExternalWalletAsset(walletId: string, assetId: string, address: string, tag?: string): Promise<WalletAssetResponse> {
        const path = `/v1/external_wallets/${walletId}/${assetId}`;

        const body = {
            address: address,
            tag: tag
        };
        return await this.apiClient.issuePostRequest(path, body);
    }

    /**
     * Creates a new asset within an exiting internal wallet.
     * @param walletId The wallet id.
     * @param assetId The asset to add.
     * @param address The wallet address.
     * @param tag (for ripple only) The ripple account tag.
     */
    public async createInternalWalletAsset(walletId: string, assetId: string, address: string, tag?: string): Promise<WalletAssetResponse> {
        const path = `/v1/internal_wallets/${walletId}/${assetId}`;

        const body = {
            address: address,
            tag: tag
        };
        return await this.apiClient.issuePostRequest(path, body);
    }

    /**
     * Creates a new transaction with the specified options.
     */
    public async createTransaction(options: TransactionArguments): Promise<CreateTransactionResponse> {
        return await this.apiClient.issuePostRequest("/v1/transactions", options);
    }
}
