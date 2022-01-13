import { ApiClient } from "./api-client";
import { ApiTokenProvider } from "./api-token-provider";
import { IAuthProvider } from "./iauth-provider";
import {
    VaultAccountResponse,
    CreateTransactionResponse,
    TransactionArguments,
    AssetResponse,
    ExchangeResponse,
    TransactionResponse,
    TransactionFilter,
    CancelTransactionResponse,
    WalletContainerResponse,
    DepositAddressResponse,
    GenerateAddressResponse,
    OperationSuccessResponse,
    NetworkConnectionResponse,
    FiatAccountResponse,
    CreateTransferTicketArgs,
    TransferTicketResponse,
    TermResponse,
    ExecuteTermArgs,
    CreateTransferTicketResponse,
    EstimateTransactionFeeResponse,
    EstimateFeeResponse,
    PublicKeyInfoArgs,
    PublicKeyInfoForVaultAccountArgs,
    GasStationInfo,
    MaxSpendableAmountResponse,
    VaultAccountsFilter,
    VaultBalancesFilter,
    ValidateAddressResponse,
    CreateVaultAssetResponse,
    RequestOptions,
    AllocateFundsRequest,
    DeallocateFundsRequest,
    ResendWebhooksResponse,
    AssetTypeResponse,
    User,
    TransactionPageResponse,
    TransactionPageFilter,
    InternalWalletAsset,
    ExternalWalletAsset, RoutingPolicy
} from "./types";

export * from "./types";
import queryString from "query-string";

export class FireblocksSDK {

    private authProvider: IAuthProvider;
    private apiBaseUrl: string;
    private apiClient: ApiClient;

    /**
     * Creates a new Fireblocks API Client
     * @param privateKey A string representation of your private key
     * @param apiKey Your api key. This is a uuid you received from Fireblocks
     * @param apiBaseUrl The fireblocks server URL. Leave empty to use the default server
     */
    constructor(privateKey: string, apiKey: string, apiBaseUrl: string = "https://api.fireblocks.io", authProvider: IAuthProvider = undefined) {
        this.authProvider = authProvider ?? new ApiTokenProvider(privateKey, apiKey);

        if (apiBaseUrl) {
            this.apiBaseUrl = apiBaseUrl;
        }

        this.apiClient = new ApiClient(this.authProvider, this.apiBaseUrl);
    }

    /**
     * Gets all assets that are currently supported by Fireblocks
     */
    public async getSupportedAssets(): Promise<AssetTypeResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/supported_assets");
    }

    /**
     * Gets all vault accounts for your tenant
     */
    public async getVaultAccounts(filter?: VaultAccountsFilter): Promise<VaultAccountResponse[]> {
        const url = `/v1/vault/accounts?${queryString.stringify(filter)}`;
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * @deprecated Replaced by getVaultAccountById.
     * Gets a single vault account
     * @param vaultAccountId The vault account ID
     */
    public async getVaultAccount(vaultAccountId: string): Promise<VaultAccountResponse> {
        return await this.getVaultAccountById(vaultAccountId);
    }

    /**
     * Gets a single vault account
     * @param vaultAccountId The vault account ID
     */
    public async getVaultAccountById(vaultAccountId: string): Promise<VaultAccountResponse> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}`);
    }

    /**
     * Gets a single vault account asset
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset to get
     */
    public async getVaultAccountAsset(vaultAccountId: string, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}`);
    }

    /**
     * Gets deposit addresses for an asset in a vault account
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset for which to get the deposit address
     */
    public async getDepositAddresses(vaultAccountId: string, assetId: string): Promise<DepositAddressResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses`);
    }

    /**
     * Gets utxo list for an asset in a vault account
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset for which to get the utxo list
     */
    public async getUnspentInputs(vaultAccountId: string, assetId: string): Promise<DepositAddressResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/unspent_inputs`);
    }

    /**
     * Generates a new address for an asset in a vault account
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset for which to generate the deposit address
     * @param description A description for the new address
     * @param customerRefId A customer reference ID
     */
    public async generateNewAddress(vaultAccountId: string, assetId: string, description?: string, customerRefId?: string): Promise<GenerateAddressResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses`, {
            description,
            customerRefId
        });
    }

    /**
     * Sets the description of an existing address
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset
     * @param address The address for which to set the description
     * @param tag The XRP tag, or EOS memo, for which to set the description
     * @param description The description to set
     */
    public async setAddressDescription(vaultAccountId: string, assetId: string, address: string, tag?: string, description?: string): Promise<GenerateAddressResponse> {
        let addressId = address;
        if (tag && tag.length > 0) {
            addressId = `${address}:${tag}`;
        }

        return await this.apiClient.issuePutRequest(
            `/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses/${addressId}`,
            {description: description || ""});
    }

    /**
     * Gets all network connections
     */
    public async getNetworkConnections(): Promise<NetworkConnectionResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/network_connections");
    }

    /**
     * Creates a network connection
     * @param connectionId the connectionId between the peers
     */
    public async removeNetworkConnection(connectionId: string) {
        return await this.apiClient.issueDeleteRequest(`/v1/network_connections/${connectionId}`);
    }

    /**
     * Creates a network connection
     * @param localNetworkId NetworkId for the local
     * @param remoteNetworkId NetworkId for the remote
     * @param routingPolicy of the connection
     */
    public async createNetworkConnection(localNetworkId: string, remoteNetworkId: string, routingPolicy?: RoutingPolicy) {
        const body = { localNetworkId, remoteNetworkId, routingPolicy };
        return await this.apiClient.issuePostRequest(`/v1/network_connections`, body);
    }

    /**
     * Set networkId routing policy
     * @param routingPolicy  the policy
     * @param networkId the networkId
     */
    public async setNetworkConnectionRoutingPolicy(connectionId: string, routingPolicy?: RoutingPolicy) {
        const body = { routingPolicy };
        return await this.apiClient.issuePostRequest(`/v1/network_connections/${connectionId}/set_routing_policy`, body);
    }

    /**
     * Gets a single network connection by id
     */
    public async getNetworkConnectionById(connectionId: string): Promise<NetworkConnectionResponse> {
        return await this.apiClient.issueGetRequest(`/v1/network_connections/${connectionId}`);
    }

    /**
     * Creates a new networkId
     * @param routingPolicy network policy
     * @param name A name for the new networkId
     */
    public async createNetworkId(name: string, routingPolicy?: RoutingPolicy) {
        const body = { name, routingPolicy };
        return await this.apiClient.issuePostRequest(`/v1/network_ids`, body);
    }

    /**
     * Set networkId routing policy
     * @param routingPolicy  the policy
     * @param networkId the networkId
     */
    public async setNetworkIdRoutingPolicy(networkId: string, routingPolicy?: RoutingPolicy) {
        const body = { routingPolicy };
        return await this.apiClient.issuePostRequest(`/v1/network_ids/${networkId}/set_routing_policy`, body);
    }

    /**
     * Gets a single networkId info by networkId
     */
    public async getNetworkId(networkId: string) {
        return await this.apiClient.issueGetRequest(`/v1/network_ids/${networkId}`);
    }

    /**
     * Gets a all discoverable networkIds
     */
    public async getDiscoverableNetworkIds() {
        return await this.apiClient.issueGetRequest(`/v1/network_ids`);
    }

    /**
     * Set a new networkId
     * @param networkId The networkId
     * @param isDiscoverable The Discoverability to set
     */
    public async setNetworkIdDiscoverability(networkId: string, isDiscoverable: boolean) {
        const body = { isDiscoverable };
        return await this.apiClient.issuePostRequest(`/v1/network_ids/${networkId}/set_discoverability`, body);
    }

    /**
     * Gets all exchange accounts for your tenant
     */
    public async getExchangeAccounts(): Promise<ExchangeResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/exchange_accounts");
    }

    /**
     * @deprecated Replaced by getExchangeAccountById
     * Gets a single exchange account by ID
     * @param exchangeAccountId The exchange account ID
     */
    public async getExchangeAccount(exchangeAccountId: string): Promise<ExchangeResponse> {
        return await this.getExchangeAccount(exchangeAccountId);
    }

    /**
     * Gets a single exchange account by ID
     * @param exchangeAccountId The exchange account ID
     */
    public async getExchangeAccountById(exchangeAccountId: string): Promise<ExchangeResponse> {
        return await this.apiClient.issueGetRequest(`/v1/exchange_accounts/${exchangeAccountId}`);
    }

    /**
     * Transfer from a main exchange account to a subaccount
     * @param exchangeAccountId The exchange ID in Fireblocks
     * @param subaccountId The ID of the subaccount in the exchange
     * @param assetId The asset to transfer
     * @param amount The amount to transfer
     */
    public async transferToSubaccount(exchangeAccountId: string, subaccountId: string, assetId: string, amount: number): Promise<OperationSuccessResponse> {
        const body = {
            subaccountId,
            amount
        };

        return await this.apiClient.issuePostRequest(`/v1/exchange_accounts/${exchangeAccountId}/${assetId}/transfer_to_subaccount`, body);
    }

    /**
     * Transfer from a subaccount to a main exchange account
     * @param exchangeAccountId The exchange ID in Fireblocks
     * @param subaccountId The ID of the subaccount in the exchange
     * @param assetId The asset to transfer
     * @param amount The amount to transfer
     */
    public async transferFromSubaccount(exchangeAccountId: string, subaccountId: string, assetId: string, amount: number): Promise<OperationSuccessResponse> {
        const body = {
            subaccountId,
            amount
        };

        return await this.apiClient.issuePostRequest(`/v1/exchange_accounts/${exchangeAccountId}/${assetId}/transfer_from_subaccount`, body);
    }

    /**
     * Gets all fiat accounts for your tenant
     */
    public async getFiatAccounts(): Promise<FiatAccountResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/fiat_accounts");
    }

    /**
     * Gets a single fiat account by ID
     * @param accountId The fiat account ID
     */
    public async getFiatAccountById(accountId: string): Promise<FiatAccountResponse> {
        return await this.apiClient.issueGetRequest(`/v1/fiat_accounts/${accountId}`);
    }

    /**
     * Redeem from a fiat account to a linked DDA
     * @param accountId The fiat account ID in Fireblocks
     * @param amount The amount to transfer
     */
    public async redeemToLinkedDDA(accountId: string, amount: number): Promise<OperationSuccessResponse> {
        const body = {
            amount
        };

        return await this.apiClient.issuePostRequest(`/v1/fiat_accounts/${accountId}/redeem_to_linked_dda`, body);
    }

    /**
     * Deposit to a fiat account from a linked DDA
     * @param accountId The fiat account ID in Fireblocks
     * @param amount The amount to transfer
     */
    public async depositFromLinkedDDA(accountId: string, amount: number): Promise<OperationSuccessResponse> {
        const body = {
            amount
        };

        return await this.apiClient.issuePostRequest(`/v1/fiat_accounts/${accountId}/deposit_from_linked_dda`, body);
    }

    /**
     * Gets a list of transactions matching the given filter
     * @param filter.before Only gets transactions created before a given timestamp (in milliseconds)
     * @param filter.after Only gets transactions created after a given timestamp (in milliseconds)
     * @param filter.status Only gets transactions with the spcified status
     * @param filter.limit Limit the amount of returned results. If not specified, a limit of 200 results will be used
     * @param filter.orderBy Determines the order of the results
     */
    public async getTransactions(filter: TransactionFilter): Promise<TransactionResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/transactions?${queryString.stringify(filter)}`);
    }

    /**
     * Gets a list of transactions per page matching the given filter or path
     * @param pageFilter Get transactions matching pageFilter params
     * @param nextOrPreviousPath Get transactions from each of pageDetails paths
     */
    public async getTransactionsWithPageInfo(pageFilter?: TransactionPageFilter, nextOrPreviousPath?: string): Promise<TransactionPageResponse> {
        if (pageFilter) {
            return await this.apiClient.issueGetRequest(`/v1/transactions?${queryString.stringify(pageFilter)}`, true);
        } else if (nextOrPreviousPath) {
            const index = nextOrPreviousPath.indexOf("/v1/");
            const path = nextOrPreviousPath.substring(index, nextOrPreviousPath.length);
            return await this.apiClient.issueGetRequest(path, true);
        }

        return {transactions: [], pageDetails: { prevPage:  "", nextPage: "" }};
    }

    /**
     * Gets a transaction matching the external transaction id provided
     * @param externalTxId
     */
    public async getTransactionByExternalTxId(externalTxId: string): Promise<TransactionResponse> {
        return await this.apiClient.issueGetRequest(`/v1/transactions/external_tx_id/${externalTxId}`);
    }

    /**
     * Gets all internal wallets for your tenant
     */
    public async getInternalWallets(): Promise<WalletContainerResponse<InternalWalletAsset>[]> {
        return await this.apiClient.issueGetRequest("/v1/internal_wallets");
    }

    /**
     * Gets a single internal wallet
     * @param walletId The internal wallet ID
     */
    public async getInternalWallet(walletId: string): Promise<WalletContainerResponse<InternalWalletAsset>> {
        return await this.apiClient.issueGetRequest(`/v1/internal_wallets/${walletId}`);
    }

    /**
     * Gets a single internal wallet asset
     * @param walletId The internal wallet ID
     * @param assetId The asset ID
     */
    public async getInternalWalletAsset(walletId: string, assetId: string): Promise<InternalWalletAsset> {
        return await this.apiClient.issueGetRequest(`/v1/internal_wallets/${walletId}/${assetId}`);
    }

    /**
     * Gets all external wallets for your tenant
     */
    public async getExternalWallets(): Promise<WalletContainerResponse<ExternalWalletAsset>[]> {
        return await this.apiClient.issueGetRequest("/v1/external_wallets");
    }

    /**
     * Gets a single external wallet
     * @param walletId The external wallet ID
     */
    public async getExternalWallet(walletId: string): Promise<WalletContainerResponse<ExternalWalletAsset>> {
        return await this.apiClient.issueGetRequest(`/v1/external_wallets/${walletId}`);
    }

    /**
     * Gets a single external wallet asset
     * @param walletId The external wallet ID
     * @param assetId The asset ID
     */
    public async getExternalWalletAsset(walletId: string, assetId: string): Promise<ExternalWalletAsset> {
        return await this.apiClient.issueGetRequest(`/v1/external_wallets/${walletId}/${assetId}`);
    }

    /**
     * Gets detailed information for a single transaction
     * @param txId The transaction id to query
     */
    public async getTransactionById(txId: string): Promise<TransactionResponse> {
        return await this.apiClient.issueGetRequest(`/v1/transactions/${txId}`);
    }

    /**
     * Cancels the selected transaction
     * @param txId The transaction id to cancel
     */
    public async cancelTransactionById(txId: string): Promise<CancelTransactionResponse> {
        return await this.apiClient.issuePostRequest(`/v1/transactions/${txId}/cancel`, {});
    }

    /**
     * Creates a new vault account
     * @param name A name for the new vault account
     * @param hiddenOnUI If true, the created account and all related transactions will not be shown on Fireblocks console
     * @param customerRefId A customer reference ID
     */
    public async createVaultAccount(name: string, hiddenOnUI?: boolean, customerRefId?: string, autoFuel?: boolean): Promise<VaultAccountResponse> {
        const body = {
            name,
            customerRefId,
            hiddenOnUI: hiddenOnUI || false,
            autoFuel: autoFuel || false
        };

        return await this.apiClient.issuePostRequest("/v1/vault/accounts", body);
    }

    /**
     * Hides a vault account in Fireblocks console
     * @param vaultAccountId The vault account ID
     */
    public async hideVaultAccount(vaultAccountId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/hide`, {});
    }

    /**
     * Reveals a hidden vault account in Fireblocks console
     * @param vaultAccountId The vault account ID
     */
    public async unhideVaultAccount(vaultAccountId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/unhide`, {});
    }

    /**
     * Sets autoFuel to true/false for a vault account
     * @param vaultAccountId The vault account ID
     * @param autoFuel The new value for the autoFuel flag
     */
    public async setAutoFuel(vaultAccountId: string, autoFuel: boolean): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/set_auto_fuel`, { autoFuel });
    }

    /**
     * Updates a vault account
     * @param name A new name for the vault account
     */
    public async updateVaultAccount(vaultAccountId: string, name: string): Promise<VaultAccountResponse> {
        const body = {
            name: name
        };

        return await this.apiClient.issuePutRequest(`/v1/vault/accounts/${vaultAccountId}`, body);
    }

    /**
     * Creates a new asset within an existing vault account
     * @param vaultAccountId The vault account ID
     * @param assetId The asset to add
     */
    public async createVaultAsset(vaultAccountId: string, assetId: string): Promise<CreateVaultAssetResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}`, {});
    }

    /**
     * Creates a new external wallet
     * @param name A name for the new external wallet
     * @param customerRefId A customer reference ID
     */
    public async createExternalWallet(name: string, customerRefId?: string): Promise<WalletContainerResponse<ExternalWalletAsset>> {
        const body = {
            name,
            customerRefId
        };

        return await this.apiClient.issuePostRequest("/v1/external_wallets", body);
    }

    /**
     * Creates a new internal wallet
     * @param name A name for the new internal wallet
     * @param customerRefId A customer reference ID
     */
    public async createInternalWallet(name: string, customerRefId?: string): Promise<WalletContainerResponse<InternalWalletAsset>> {
        const body = {
            name,
            customerRefId
        };

        return await this.apiClient.issuePostRequest("/v1/internal_wallets", body);
    }

    /**
     * Creates a new asset within an exiting external wallet
     * @param walletId The wallet id
     * @param assetId The asset to add
     * @param address The wallet address
     * @param tag (for ripple only) The ripple account tag
     */
    public async createExternalWalletAsset(walletId: string, assetId: string, address: string, tag?: string): Promise<ExternalWalletAsset> {
        const path = `/v1/external_wallets/${walletId}/${assetId}`;

        const body = {
            address: address,
            tag: tag
        };
        return await this.apiClient.issuePostRequest(path, body);
    }

    /**
     * Creates a new asset within an exiting internal wallet
     * @param walletId The wallet id
     * @param assetId The asset to add
     * @param address The wallet address
     * @param tag (for ripple only) The ripple account tag
     */
    public async createInternalWalletAsset(walletId: string, assetId: string, address: string, tag?: string): Promise<InternalWalletAsset> {
        const path = `/v1/internal_wallets/${walletId}/${assetId}`;

        const body = {
            address: address,
            tag: tag
        };
        return await this.apiClient.issuePostRequest(path, body);
    }

    /**
     * Creates a new transaction with the specified options
     */
    public async createTransaction(transactionArguments: TransactionArguments, requestOptions?: RequestOptions): Promise<CreateTransactionResponse> {
        return await this.apiClient.issuePostRequest("/v1/transactions", transactionArguments, requestOptions);
    }

    /**
     * Estimates the fee for a transaction request
     */
    public async estimateFeeForTransaction(transactionArguments: TransactionArguments): Promise<EstimateTransactionFeeResponse> {
        return await this.apiClient.issuePostRequest("/v1/transactions/estimate_fee", transactionArguments);
    }

    /**
     * Gets the estimated fees for an asset
     */
    public async getFeeForAsset(asset: string): Promise<EstimateFeeResponse> {
        return await this.apiClient.issueGetRequest(`/v1/estimate_network_fee?assetId=${asset}`);
    }

    /**
     * Creates a new transfer ticket
     */
    public async createTransferTicket(options: CreateTransferTicketArgs): Promise<CreateTransferTicketResponse> {
        return await this.apiClient.issuePostRequest("/v1/transfer_tickets", options);
    }

    /**
     * Gets all transfer tickets
     */
    public async getTransferTickets(): Promise<TransferTicketResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/transfer_tickets");
    }

    /**
     * Get a transfer ticket by ticket ID
     * @param ticketId
     */
    public async getTransferTicketById(ticketId: string): Promise<TransferTicketResponse> {
        return await this.apiClient.issueGetRequest(`/v1/transfer_tickets/${ticketId}`);
    }

    /**
     * Get a term of transfer ticket
     * @param ticketId
     * @param termId
     */
    public async getTransferTicketTerm(ticketId: string, termId: string): Promise<TermResponse> {
        return await this.apiClient.issueGetRequest(`/v1/transfer_tickets/${ticketId}/${termId}`);
    }

    /**
     * Cancel the transfer ticket
     * @param ticketId
     */
    public async cancelTransferTicket(ticketId: string) {
        return await this.apiClient.issuePostRequest(`/v1/transfer_tickets/${ticketId}/cancel`, {});
    }

    /**
     * Executes a transaction for a single term of a transfer ticket
     * @param ticketId
     * @param termId
     * @param options
     */
    public async executeTransferTicketTerm(ticketId: string, termId: string, options: ExecuteTermArgs) {
        return await this.apiClient.issuePostRequest(`/v1/transfer_tickets/${ticketId}/${termId}/transfer`,
            options);
    }

    /**
     * Deletes a single internal wallet
     * @param walletId The internal wallet ID
     */
    public async deleteInternalWallet(walletId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/internal_wallets/${walletId}`);
    }

    /**
     * Deletes a single internal wallet asset
     * @param walletId The internal wallet ID
     * @param assetId The asset ID
     */
    public async deleteInternalWalletAsset(walletId: string, assetId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/internal_wallets/${walletId}/${assetId}`);
    }

    /**
     * Deletes a single external wallet
     * @param walletId The external wallet ID
     */
    public async deleteExternalWallet(walletId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/external_wallets/${walletId}`);
    }

    /**
     * Deletes a single external wallet asset
     * @param walletId The external wallet ID
     * @param assetId The asset ID
     */
    public async deleteExternalWalletAsset(walletId: string, assetId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/external_wallets/${walletId}/${assetId}`);
    }

    /**
     * Sets a customer reference ID
     * @param vaultAccountId The vault account ID
     * @param customerRefId The customer reference ID to set
     */
    public async setCustomerRefIdForVaultAccount(vaultAccountId: string, customerRefId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/set_customer_ref_id`, {customerRefId});
    }

    /**
     * Sets a customer reference ID
     * @param walletId The ID of the internal wallet
     * @param customerRefId The customer reference ID to set
     */
    public async setCustomerRefIdForInternalWallet(walletId: string, customerRefId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/internal_wallets/${walletId}/set_customer_ref_id`, {customerRefId});
    }

    /**
     * Sets a customer reference ID
     * @param walletId The ID of the external wallet
     * @param customerRefId The customer reference ID to set
     */
    public async setCustomerRefIdForExternalWallet(walletId: string, customerRefId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/external_wallets/${walletId}/set_customer_ref_id`, {customerRefId});
    }

    /**
     * Sets a customer reference ID
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset
     * @param address The address
     * @param tag The XRP tag, or EOS memo
     * @param customerRefId The customer reference ID to set
     */
    public async setCustomerRefIdForAddress(vaultAccountId: string, assetId: string, address: string, tag?: string, customerRefId?: string): Promise<OperationSuccessResponse> {
        let addressId = address;
        if (tag && tag.length > 0) {
            addressId = `${address}:${tag}`;
        }

        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses/${addressId}/set_customer_ref_id`, {customerRefId});
    }

    /**
     * Set the required number of confirmations for transaction
     * @param txId
     * @param requiredConfirmationsNumber
     */
    public async setConfirmationThresholdForTxId(txId: string, requiredConfirmationsNumber: number): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/transactions/${txId}/set_confirmation_threshold`, {numOfConfirmations: requiredConfirmationsNumber});
    }

    /**
     * Set the required number of confirmations for transactions by tx hash
     * @param txHash
     * @param requiredConfirmationsNumber
     */
    public async setConfirmationThresholdForTxHash(txHash: string, requiredConfirmationsNumber: number): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/txHash/${txHash}/set_confirmation_threshold`, {numOfConfirmations: requiredConfirmationsNumber});
    }

    /**
     * Get the public key information
     * @param args
     */
    public async getPublicKeyInfo(args: PublicKeyInfoArgs) {
        let url = `/v1/vault/public_key_info`;
        if (args.algorithm) {
            url += `?algorithm=${args.algorithm}`;
        }
        if (args.derivationPath) {
            url += `&derivationPath=${args.derivationPath}`;
        }
        if (args.compressed) {
            url += `&compressed=${args.compressed}`;
        }
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * allocate funds from you default balance to a private ledger
     * @param vaultAccountId
     * @param asset
     * @param vaultAccountId
     * @param asset
     * @param args
     */
    public async allocateFundsToPrivateLedger(vaultAccountId: string, asset: string, args: AllocateFundsRequest) {
        const url = `/v1/vault/accounts/${vaultAccountId}/${asset}/lock_allocation`;
        return await this.apiClient.issuePostRequest(url, args);
    }

    /**
     * deallocate funds from a private ledger to your default balance
     * @param vaultAccountId
     * @param asset
     * @param args
     */
    public async deallocateFundsFromPrivateLedger(vaultAccountId: string, asset: string, args: DeallocateFundsRequest) {
        const url = `/v1/vault/accounts/${vaultAccountId}/${asset}/release_allocation`;
        return await this.apiClient.issuePostRequest(url, args);
    }

    /**
     * Get the public key information for a vault account
     * @param args
     */
    public async getPublicKeyInfoForVaultAccount(args: PublicKeyInfoForVaultAccountArgs) {
        let url = `/v1/vault/accounts/${args.vaultAccountId}/${args.assetId}/${args.change}/${args.addressIndex}/public_key_info`;
        if (args.compressed) {
            url += `?compressed=${args.compressed}`;
        }
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Get configuration and status of the Gas Station account
     */
    public async getGasStationInfo(): Promise<GasStationInfo> {
        const url = `/v1/gas_station`;

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Set configuration of the Gas Station account
     */
    public async setGasStationConfiguration(gasThreshold: string, gasCap: string, maxGasPrice?: string): Promise<OperationSuccessResponse> {
        const url = `/v1/gas_station/configuration`;

        const body = { gasThreshold, gasCap, maxGasPrice };

        return await this.apiClient.issuePutRequest(url, body);
    }

    /**
     * Drop an ETH based transaction
     */
    public async dropTransaction(txId: string, feeLevel?: string, requestedFee?: string ) {
        const url = `/v1/transactions/${txId}/drop`;

        const body = { feeLevel, requestedFee };

        return await this.apiClient.issuePostRequest(url, body);
    }

    /**
     * Get max spendable amount per asset and vault
     */
    public async getMaxSpendableAmount(vaultAccountId: string, assetId: string, manualSigning?: Boolean): Promise<MaxSpendableAmountResponse> {
        let url = `/v1/vault/accounts/${vaultAccountId}/${assetId}/max_spendable_amount`;

        if (manualSigning) {
            url += `?manualSigning=${manualSigning}`;
        }

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Get all vault assets balance overview
     */
    public async getVaultAssetsBalance(filter: VaultBalancesFilter): Promise<AssetResponse[]> {
        const url = `/v1/vault/assets?${queryString.stringify(filter)}`;

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Get vault balance overview per asset
     */
    public async getVaultBalanceByAsset(assetId: string): Promise<AssetResponse> {
        const url = `/v1/vault/assets/${assetId}`;
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Get address validation info
     */
    public async validateAddress(assetId: string, address: string): Promise<ValidateAddressResponse> {
        const url = `/v1/transactions/validate_address/${assetId}/${address}`;
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Unfreezes the selected transaction
     * @param txId The transaction id to unfreeze
     */
    public async unfreezeTransactionById(txId: string): Promise<OperationSuccessResponse> {
        return this.apiClient.issuePostRequest(`/v1/transactions/${txId}/unfreeze`, {});
    }

    /**
     * Freezes the selected transaction
     * @param txId The transaction id to freeze
     */
    public async freezeTransactionById(txId: string): Promise<OperationSuccessResponse> {
        return this.apiClient.issuePostRequest(`/v1/transactions/${txId}/freeze`, {});
    }

    /**
     * Resend failed webhooks
     */
    public async resendWebhooks(): Promise<ResendWebhooksResponse> {
        return await this.apiClient.issuePostRequest("/v1/webhooks/resend", {});
    }

    /**
     * Gets all Users for your tenant
     */
    public async getUsers(): Promise<User[]> {
        return await this.apiClient.issueGetRequest("/v1/users");
    }
}
