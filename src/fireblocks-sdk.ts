import { ApiClient } from "./api-client";
import { ApiTokenProvider } from "./api-token-provider";
import { IAuthProvider } from "./iauth-provider";
import queryString from "query-string";
import { stringify } from "qs";
import {
    AllocateFundsRequest,
    AssetResponse,
    AssetTypeResponse,
    CancelTransactionResponse,
    ConvertExchangeAssetResponse,
    CreateTransactionResponse,
    DeallocateFundsRequest,
    DepositAddressResponse,
    EstimateFeeResponse,
    EstimateTransactionFeeResponse,
    ExchangeResponse,
    ExternalWalletAsset,
    FiatAccountResponse,
    GasStationInfo,
    GenerateAddressResponse,
    InternalWalletAsset,
    MaxSpendableAmountResponse,
    MaxBip44IndexUsedResponse,
    PaginatedAddressesResponse,
    OptionalPaginatedAddressesRequestFilters,
    NetworkConnectionResponse,
    OffExchangeEntityResponse,
    OperationSuccessResponse,
    PagedVaultAccountsRequestFilters,
    PagedVaultAccountsResponse,
    PublicKeyInfoArgs,
    PublicKeyInfoForVaultAccountArgs,
    RequestOptions,
    ResendWebhooksResponse,
    TransactionArguments,
    TransactionFilter,
    TransactionPageFilter,
    TransactionPageResponse,
    TransactionResponse,
    User,
    ValidateAddressResponse,
    VaultAccountResponse,
    VaultAssetResponse,
    VaultBalancesFilter,
    WalletContainerResponse,
    SetFeePayerConfiguration,
    FeePayerConfiguration,
    CreateWeb3ConnectionPayload,
    CreateWeb3ConnectionResponse,
    Session,
    NetworkConnectionRoutingPolicy,
    NetworkIdRoutingPolicy,
    NetworkIdResponse,
    TimePeriod,
    AuditsResponse,
    NFTOwnershipFilter,
    NFTOwnedAssetsFilter,
    Token,
    TokenWithBalance,
    Web3PagedResponse,
    CreateWalletConnectPayload,
    Web3ConnectionType,
    GetWeb3ConnectionsPayload,
    PublicKeyResponse,
    AllocateFundsResponse,
    AddCollateralTransactionRequest,
    RemoveCollateralTransactionRequest,
    GetSettlementTransactionsResponse,
    SettlementRequest,
    SettlementResponse,
    GetNFTsFilter,
    SettleOffExchangeAccountResponse,
    PublicKeyInformation,
    DropTransactionResponse,
    GetAssetWalletsFilters,
    GetAssetWalletsResponse,
    PeerType,
    NFTOwnershipStatus,
    NFTOwnershipStatusUpdatedPayload,
    NFTOwnedCollectionsFilter,
    CollectionOwnership,
    TravelRuleOptions,
    ValidateTravelRuleVaspInfo,
    ValidateTravelRuleResult,
    ValidateCreateTravelRuleTransaction,
    ValidateFullTravelRuleResult,
    TravelRuleVasp,
    TravelRuleVaspFilter,
    TravelRuleEncryptionOptions,
    TravelRuleVaspForVaultRequestResponse,
    SmartTransfersTicketResponse,
    SmartTransfersTicketCreatePayload,
    SmartTransfersTicketsResponse,
    SmartTransfersTicketsFilters,
    SmartTransfersTicketTermPayload,
    SmartTransfersTicketTermFundPayload,
    ScreeningPolicyConfiguration,
    SmartTransfersTicketTermResponse,
    ConsoleUser,
    ApiUser,
    TRole,
    UsersGroup,
    SmartTransfersUserGroupsResponse,
    LeanContractTemplateDto,
    ContractTemplateDto,
    BatchTask,
    BatchJob,
    JobCreatedResponse,
    ContractUploadRequest,
    ContractDeployResponse,
    ContractDeployRequest,
    ExchangeAccountsPageFilter,
    PagedExchangeResponse,
    TAP,
    WriteCallFunctionDto,
    ReadCallFunctionDto,
    WriteCallFunctionResponseDto,
    ContractAbiResponseDto,
    DeployedContractResponseDto,
    TransactionReceiptResponseDto,
    LeanDeployedContractResponseDto,
    ParameterWithValueList,
    ScreeningTenantConfiguration,
    ScreeningType,
    ScreeningConfigurationsResponse,
    ScreeningPolicyRuleResponse,
    ScreeningProviderConfigurationResponse,
    AuditLogsResponse,
    TokenLink,
    IssueTokenRequest,
    TokenLinksCount,
    GetTokenLinksFilter,
    GetContractTemplatesFilter,
    TokenLinkStatus,
    SupportedContractTemplateType,
    AbiFunction,
    SupportedBlockchainsResponse,
    GetContractsFilter,
    TokenOwnershipSpamUpdatePayload,
    ScreeningSupportedAssetResponse,
    ScreeningSupportedProviders,
    RegisterAssetResponse,
    UnspentInputsResponse,
    ContractAddressResponseDto,
    AssetPriceResponse,
    CollectionLink,
    CreateCollectionRequest,
    CollectionTokenResponseDto,
    MintCollectionTokenRequest,
    BurnCollectionTokenRequest,
    ContractWithABIDto,
    RescanTx,
    RescanTxResponse,
    ListAssetsResponse,
    ListAssetsFilters,
    ListAssetResponse,
    ListBlockchainResponse,
    ListBlockchainsFilters,
    ListBlockchainsResponse,
    PaginatedInternalWalletContainerResponse,
} from "./types";
import { AxiosProxyConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { PIIEncryption } from "./pii-client";
import { NcwApiClient } from "./ncw-api-client";
import { NcwSdk } from "./ncw-sdk";
import { StakingApiClient } from "./staking/staking-api-client";
import {
    ChainInfo,
    CheckTermsOfServiceResponseDto,
    DelegationSummaryDto,
    DelegationSummaryDtoByVault, SplitRequestDto, SplitResponse,
    StakeRequestDto,
    StakeResponse,
    StakingChain,
    StakingPosition,
    StakingProvider,
    UnstakeRequestDto,
    UnstakeResponse,
    WithdrawRequestDto,
    WithdrawResponse
} from "./staking";
import { getPublicKeyInfoByAccountAssetImpl, getPublicKeyInfoImpl } from "./common/public_key_info";

export * from "./types";

export interface SDKOptions {
    /** HTTP request timeout */
    timeoutInMs?: number;

    /** Proxy configurations */
    proxy?: AxiosProxyConfig | false;

    /** Whether to remove platform from User-Agent header */
    anonymousPlatform?: boolean;

    /** Additional product identifier to be prepended to the User-Agent header */
    userAgent?: string;

    /** Replace default https agent */
    httpsAgent?: any;

    /**
     * Providing custom axios options including a response interceptor (https://axios-http.com/docs/interceptors)
     */
    customAxiosOptions?: {
        interceptors?: {
            request?: {
                onFulfilled: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>;
                onRejected: (error: any) => any;
            };
            response?: {
                onFulfilled: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
                onRejected: (error: any) => any;
            };
        }
    };

    /**
     * TravelRule Provider options to initialize PII Client for PII encryption
     */
    travelRuleOptions?: TravelRuleOptions;
}

const DEFAULT_MAX_PAGE_SIZE = 100;

export class FireblocksSDK {
    private readonly authProvider: IAuthProvider;
    private readonly apiBaseUrl: string;
    private readonly apiClient: ApiClient;
    private readonly apiNcw: NcwApiClient;
    private readonly stakingApiClient: StakingApiClient;

    private piiClient: PIIEncryption;

    /**
     * Creates a new Fireblocks API Client
     * @param privateKey A string representation of your private key
     * @param apiKey Your api key. This is a uuid you received from Fireblocks
     * @param apiBaseUrl The fireblocks server URL. Leave empty to use the default server
     * @param authProvider
     * @param sdkOptions
     */
    constructor(privateKey: string, apiKey: string, apiBaseUrl: string = "https://api.fireblocks.io", authProvider: IAuthProvider = undefined, sdkOptions?: SDKOptions) {
        this.authProvider = !!authProvider ? authProvider : new ApiTokenProvider(privateKey, apiKey);

        if (!!apiBaseUrl) {
            this.apiBaseUrl = apiBaseUrl;
        }

        this.apiClient = new ApiClient(this.authProvider, this.apiBaseUrl, sdkOptions);

        if (sdkOptions?.travelRuleOptions) {
            this.piiClient = new PIIEncryption(sdkOptions.travelRuleOptions);
        }

        this.apiNcw = new NcwApiClient(this.apiClient);

        this.stakingApiClient = new StakingApiClient(this.apiClient);
    }

    /**
     * NCW API Namespace
     *
     * @readonly
     * @type {NcwSdk}
     */
    public get NCW(): NcwSdk {
        return this.apiNcw;
    }
    /**
     * Get the instance of ApiClient used by the FireblocksSDK
     */
    public getApiClient(): ApiClient {
        return this.apiClient;
    }
    /**
     * Get all staking chains
     */
    public async getStakingChains(): Promise<string[]> {
        return await this.stakingApiClient.getChains();
    }
    /**
     * Get chain info
     */
    public async getStakingChainInfo(chainDescriptor: StakingChain): Promise<ChainInfo> {
        return await this.stakingApiClient.getChainInfo(chainDescriptor);
    }
    /**
     * Get staking positions summary
     */
    public async getStakingPositionsSummary(): Promise<DelegationSummaryDto> {
        return await this.stakingApiClient.getPositionsSummary();
    }
    /**
     * Get staking positions summary by vault
     */
    public async getStakingPositionsSummaryByVault(): Promise<DelegationSummaryDtoByVault> {
        return await this.stakingApiClient.getPositionsSummaryByVault();
    }
    /**
     * Initiate staking stake on a chain
     */
    public async executeStakingStake(chainDescriptor: StakingChain, body: StakeRequestDto): Promise<StakeResponse> {
        return await this.stakingApiClient.stake(chainDescriptor, body);
    }
    /**
     * Execute staking unstake on a chain
     */
    public async executeStakingUnstake(chainDescriptor: StakingChain, body: UnstakeRequestDto): Promise<UnstakeResponse> {
        return await this.stakingApiClient.unstake(chainDescriptor, body);
    }
    /**
     * Execute staking withdraw on a chain
     */
    public async executeStakingWithdraw(chainDescriptor: StakingChain, body: WithdrawRequestDto): Promise<WithdrawResponse> {
        return await this.stakingApiClient.withdraw(chainDescriptor, body);
    }
    /**
     * Execute staking claim rewards on a chain
     */
    public async executeStakingClaimRewards(chainDescriptor: StakingChain, body: WithdrawRequestDto): Promise<WithdrawResponse> {
        return await this.stakingApiClient.withdraw(chainDescriptor, body);
    }
    /**
     * Execute staking split on a chain
     */
    public async executeStakingSplit(chainDescriptor: StakingChain, body: SplitRequestDto): Promise<SplitResponse> {
        return await this.stakingApiClient.split(chainDescriptor, body);
    }
    /**
     * Get all staking positions, optionally filtered by chain
     */
    public async getStakingPositions(chainDescriptor?: StakingChain): Promise<StakingPosition[]> {
        return await this.stakingApiClient.getPositions(chainDescriptor);
    }
    /**
     * Get a staking position by id
     */
    public async getStakingPosition(positionId: string): Promise<StakingPosition> {
        return await this.stakingApiClient.getPosition(positionId);
    }
    /**
     * Get all staking providers
     */
    public async getStakingProviders(): Promise<StakingProvider[]> {
        return await this.stakingApiClient.getProviders();
    }
    /**
     * Approve staking provider terms of service
     */
    public async approveStakingProviderTermsOfService(providerId: string): Promise<CheckTermsOfServiceResponseDto> {
        return await this.stakingApiClient.approveProviderTermsOfService(providerId);
    }
    /**
     * Gets all assets that are currently supported by Fireblocks
     */
    public async getSupportedAssets(): Promise<AssetTypeResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/supported_assets");
    }

    /**
     * Sets asset price
     * @param id The asset ID
     * @param currency The currency (according to ISO 4217 currency codes)
     * @param price The price in currency
     */
    public async setAssetPrice(id: string, currency: string, price: number): Promise<AssetPriceResponse> {
        return await this.apiClient.issuePostRequest(`/v1/assets/prices/${id}`, { currency, price });
    }

    /**
     * Gets a list of vault accounts per page matching the given filter or path
     * @param pagedVaultAccountsRequestFilters Filters for the first request
     */
    public async getVaultAccountsWithPageInfo(pagedVaultAccountsRequestFilters: PagedVaultAccountsRequestFilters): Promise<PagedVaultAccountsResponse> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts_paged?${queryString.stringify(pagedVaultAccountsRequestFilters)}`);
    }

    /**
     * Gets a list of asset wallets per page matching the given filter or path
     * @param getVaultWalletsFilters Filters for the first request
     */
    public async getAssetWallets(getVaultWalletsFilters: GetAssetWalletsFilters): Promise<GetAssetWalletsResponse> {
        return await this.apiClient.issueGetRequest(`/v1/vault/asset_wallets?${queryString.stringify(getVaultWalletsFilters)}`);
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
     * Gets a single vault account asset balance after forcing refresh from the blockchain
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset to get
     * @param requestOptions
     */
    public async refreshVaultAssetBalance(vaultAccountId: string, assetId: string, requestOptions?: RequestOptions): Promise<AssetResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/balance`, "{}", requestOptions);
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
    public async getUnspentInputs(vaultAccountId: string, assetId: string): Promise<UnspentInputsResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/unspent_inputs`);
    }

    /**
     * Generates a new address for an asset in a vault account
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset for which to generate the deposit address
     * @param description A description for the new address
     * @param customerRefId A customer reference ID
     * @param requestOptions
     */
    public async generateNewAddress(vaultAccountId: string, assetId: string, description?: string, customerRefId?: string, requestOptions?: RequestOptions): Promise<GenerateAddressResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses`, {
            description,
            customerRefId
        }, requestOptions);
    }

    /**
     * Sets the description of an existing address
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset
     * @param address The address for which to set the description
     * @param tag The XRP tag, or EOS memo, for which to set the description
     * @param description The description to set
     */
    public async setAddressDescription(vaultAccountId: string, assetId: string, address: string, tag?: string, description?: string): Promise<OperationSuccessResponse> {
        let addressId = address;
        if (tag && tag.length > 0) {
            addressId = `${address}:${tag}`;
        }

        return await this.apiClient.issuePutRequest(
            `/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses/${addressId}`,
            { description: description || "" });
    }

    /**
     * Gets all network connections
     * @returns NetworkConnectionResponse
     */
    public async getNetworkConnections(): Promise<NetworkConnectionResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/network_connections");
    }

    /**
     * Creates a network connection
     * @param localNetworkId The local netowrk profile's id
     * @param remoteNetworkId The remote network profile's id
     * @param routingPolicy The desired routing policy for the connection
     * @returns NetworkConnectionResponse
     */
    public async createNetworkConnection(localNetworkId: string, remoteNetworkId: string, routingPolicy?: NetworkConnectionRoutingPolicy): Promise<NetworkConnectionResponse> {
        const body = { localNetworkId, remoteNetworkId, routingPolicy };
        return await this.apiClient.issuePostRequest(`/v1/network_connections`, body);
    }

    /**
     * Gets a single network connection
     * @param connectionId The network connection's id
     * @returns NetworkConnectionResponse
     */
    public async getNetworkConnectionById(connectionId: string): Promise<NetworkConnectionResponse> {
        return await this.apiClient.issueGetRequest(`/v1/network_connections/${connectionId}`);
    }

    /**
     * Removes a network connection
     * @param connectionId The network connection's id
     * @returns OperationSuccessResponse
     */
    public async removeNetworkConnection(connectionId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/network_connections/${connectionId}`);
    }

    /**
     * Sets routing policy for a network connection
     * @param connectionId The network connection's id
     * @param routingPolicy The desired routing policy
     */
    public async setNetworkConnectionRoutingPolicy(connectionId: string, routingPolicy: NetworkConnectionRoutingPolicy): Promise<void> {
        const body = { routingPolicy };
        return await this.apiClient.issuePatchRequest(`/v1/network_connections/${connectionId}/set_routing_policy`, body);
    }

    /**
     * Gets all discoverable network profiles
     * @returns NetworkIdResponse
     */
    public async getDiscoverableNetworkIds(): Promise<NetworkIdResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/network_ids`);
    }

    /**
     * Creates a new network profile
     * @param name A name for the new network profile
     * @param routingPolicy The desired routing policy for the network
     * @returns NetworkConnectionResponse
     */
    public async createNetworkId(name: string, routingPolicy?: NetworkIdRoutingPolicy): Promise<NetworkIdResponse> {
        const body = { name, routingPolicy };
        return await this.apiClient.issuePostRequest(`/v1/network_ids`, body);
    }

    /**
     * Gets a single network profile
     * @param networkId The network profile's id
     * @returns NetworkIdResponse
     */
    public async getNetworkId(networkId: string): Promise<NetworkIdResponse> {
        return await this.apiClient.issueGetRequest(`/v1/network_ids/${networkId}`);
    }

    /**
     * Deletes a single network profile
     * @param networkId The network profile's id
     * @returns NetworkIdResponse
     */
    public async deleteNetworkId(networkId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/network_ids/${networkId}`);
    }

    /**
     * Sets discoverability for network profile
     * @param networkId The network profile's id
     * @param isDiscoverable The desired discoverability to set
     * @returns OperationSuccessResponse
     */
    public async setNetworkIdDiscoverability(networkId: string, isDiscoverable: boolean): Promise<OperationSuccessResponse> {
        const body = { isDiscoverable };
        return await this.apiClient.issuePatchRequest(`/v1/network_ids/${networkId}/set_discoverability`, body);
    }

    /**
     * Sets routing policy for network profile
     * @param networkId The network profile's id
     * @param routingPolicy The desired routing policy
     * @returns OperationSuccessResponse
     */
    public async setNetworkIdRoutingPolicy(networkId: string, routingPolicy: NetworkIdRoutingPolicy): Promise<void> {
        const body = { routingPolicy };
        return await this.apiClient.issuePatchRequest(`/v1/network_ids/${networkId}/set_routing_policy`, body);
    }

    /**
     * Sets network profile name
     * @param networkId The network profile's id
     * @param name The desired network profile's name
     * @returns OperationSuccessResponse
     */
    public async setNetworkIdName(networkId: string, name: string): Promise<void> {
        const body = { name };
        return await this.apiClient.issuePatchRequest(`/v1/network_ids/${networkId}/set_name`, body);
    }

    /**
     * Gets all exchange accounts for your tenant
     */
    public async getExchangeAccounts(): Promise<ExchangeResponse[]> {
        return await this.apiClient.issueGetRequest("/v1/exchange_accounts");
    }

    /**
     * Gets all exchange accounts for your tenant
     * @param filter Get exchange accounts matching pageFilter params
     */
    public async getExchangeAccountsPaged(filter: ExchangeAccountsPageFilter): Promise<PagedExchangeResponse> {
        return await this.apiClient.issueGetRequest(`/v1/exchange_accounts/paged?${queryString.stringify(filter)}`);
    }

    /**
     * Gets a single exchange account by ID
     * @param exchangeAccountId The exchange account ID
     */
    public async getExchangeAccountById(exchangeAccountId: string): Promise<ExchangeResponse> {
        return await this.apiClient.issueGetRequest(`/v1/exchange_accounts/${exchangeAccountId}`);
    }

    /**
     * Gets a single asset within an Exchange Account
     * @param exchangeAccountId The exchange account ID
     * @param assetId The ID of the asset
     */
    public async getExchangeAsset(exchangeAccountId: string, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issueGetRequest(`/v1/exchange_accounts/${exchangeAccountId}/${assetId}`);
    }

    /**
     * Convert an asset at an Exchange Account
     * @param exchangeAccountId The exchange account ID
     * @param srcAsset The source asset to convert from
     * @param destAsset The destination asset to convert to
     * @param amount The amount to convert
     */
    public async convertExchangeAsset(exchangeAccountId: string, srcAsset: string, destAsset: string, amount: number, requestOptions?: RequestOptions): Promise<ConvertExchangeAssetResponse> {
        return await this.apiClient.issuePostRequest(`/v1/exchange_accounts/${exchangeAccountId}/convert`, {
            srcAsset, destAsset, amount
        }, requestOptions);
    }

    /**
     * Internal Transfer from a main exchange account to a subaccount
     * @param exchangeAccountId The exchange ID in Fireblocks
     * @param subaccountId The ID of the subaccount in the exchange
     * @param assetId The asset to transfer
     * @param amount The amount to transfer
     * @param note A description of the transfer
     * @param requestOptions
     */
    public async internalTransfer(exchangeAccountId: string, subaccountId: string, assetId: string, amount: number, note: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
      const body = {
          subaccountId,
          assetId,
          amount,
          note
      };

      return await this.apiClient.issuePostRequest(`/v1/exchange_accounts/${exchangeAccountId}/internal_transfer`, body, requestOptions);
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
     * @param requestOptions
     */
    public async redeemToLinkedDDA(accountId: string, amount: number, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        const body = {
            amount
        };

        return await this.apiClient.issuePostRequest(`/v1/fiat_accounts/${accountId}/redeem_to_linked_dda`, body, requestOptions);
    }

    /**
     * Deposit to a fiat account from a linked DDA
     * @param accountId The fiat account ID in Fireblocks
     * @param amount The amount to transfer
     * @param requestOptions
     */
    public async depositFromLinkedDDA(accountId: string, amount: number, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        const body = {
            amount
        };

        return await this.apiClient.issuePostRequest(`/v1/fiat_accounts/${accountId}/deposit_from_linked_dda`, body, requestOptions);
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
            return await this.apiClient.issueGetRequestForTransactionPages(`/v1/transactions?${queryString.stringify(pageFilter)}`);
        } else if (nextOrPreviousPath) {
            const index = nextOrPreviousPath.indexOf("/v1/");
            const path = nextOrPreviousPath.substring(index, nextOrPreviousPath.length);
            return await this.apiClient.issueGetRequestForTransactionPages(path);
        }

        return {
            transactions: [], pageDetails: { prevPage: "", nextPage: "" },
        };
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
     * Gets a paginated response of assets for a single internal wallet
     * @param walletId The internal wallet ID
     * @param pageSize Number of assets to return per page (default=50, max=200)
     * @param pageCursor Cursor for pagination
     */
    public async getInternalWalletAssets(walletId: string, pageSize?: number, pageCursor?: string): Promise<PaginatedInternalWalletContainerResponse> {
        return await this.apiClient.issueGetRequest(`/v1/internal_wallets/${walletId}/assets`, {pageSize, pageCursor});
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
     * Gets all contract wallets for your tenant
     */
    public async getContractWallets(): Promise<WalletContainerResponse<ExternalWalletAsset>[]> {
        return await this.apiClient.issueGetRequest("/v1/contracts");
    }

    /**
     * Gets a single contract wallet
     * @param walletId The contract wallet ID
     */
    public async getContractWallet(walletId: string): Promise<WalletContainerResponse<ExternalWalletAsset>> {
        return await this.apiClient.issueGetRequest(`/v1/contracts/${walletId}`);
    }

    /**
     * Gets a single contract wallet asset
     * @param walletId The contract wallet ID
     * @param assetId The asset ID
     */
    public async getContractWalletAsset(walletId: string, assetId: string): Promise<ExternalWalletAsset> {
        return await this.apiClient.issueGetRequest(`/v1/contracts/${walletId}/${assetId}`);
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
     * @param requestOptions
     */
    public async cancelTransactionById(txId: string, requestOptions?: RequestOptions): Promise<CancelTransactionResponse> {
        return await this.apiClient.issuePostRequest(`/v1/transactions/${txId}/cancel`, {}, requestOptions);
    }

    /**
     * Creates a new vault account
     * @param name A name for the new vault account
     * @param hiddenOnUI If true, the created account and all related transactions will not be shown on Fireblocks console
     * @param customerRefId A customer reference ID
     * @param autoFuel
     * @param requestOptions
     * @param autoFuel
     * @param requestOptions
     */
    public async createVaultAccount(name: string, hiddenOnUI?: boolean, customerRefId?: string, autoFuel?: boolean, requestOptions?: RequestOptions): Promise<VaultAccountResponse> {
        const body = {
            name,
            customerRefId,
            hiddenOnUI: hiddenOnUI || false,
            autoFuel: autoFuel || false
        };

        return await this.apiClient.issuePostRequest("/v1/vault/accounts", body, requestOptions);
    }

    /**
     * Hides a vault account in Fireblocks console
     * @param vaultAccountId The vault account ID
     * @param requestOptions
     */
    public async hideVaultAccount(vaultAccountId: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/hide`, {}, requestOptions);
    }

    /**
     * Reveals a hidden vault account in Fireblocks console
     * @param vaultAccountId The vault account ID
     * @param requestOptions
     */
    public async unhideVaultAccount(vaultAccountId: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/unhide`, {}, requestOptions);
    }

    /**
     * Sets autoFuel to true/false for a vault account
     * @param vaultAccountId The vault account ID
     * @param autoFuel The new value for the autoFuel flag
     * @param requestOptions
     */
    public async setAutoFuel(vaultAccountId: string, autoFuel: boolean, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/set_auto_fuel`, { autoFuel }, requestOptions);
    }

    /**
     * Updates a vault account
     * @param vaultAccountId
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
     * @param requestOptions
     */
    public async createVaultAsset(vaultAccountId: string, assetId: string, requestOptions?: RequestOptions): Promise<VaultAssetResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}`, {}, requestOptions);
    }

    /**
     * Registers new asset
     * @param blockchainId Native asset of blockchain
     * @param address Asset contract address
     * @param symbol Asset symbol
     * @param requestOptions
     */
    public async registerNewAsset(blockchainId: string, address: string, symbol?: string, requestOptions?: RequestOptions): Promise<RegisterAssetResponse> {
        return await this.apiClient.issuePostRequest(`/v1/assets`, { blockchainId, address, symbol }, requestOptions);
    }

    /**
     * List assets
     * @param filters
     */
    public async listAssets(filters?: ListAssetsFilters): Promise<ListAssetsResponse> {
        return await this.apiClient.issueGetRequest(`/v1/assets`, filters);
    }

    /**
     * Get an asset
     * @param assetId The ID or legacyId of the asset
     */
    public async getAssetById(assetId: string): Promise<ListAssetResponse> {
        return await this.apiClient.issueGetRequest(`/v1/assets/${assetId}`);
    }

    /**
     * List blockchains
     * @param filters
     */
    public async listBlockchains(filters?: ListBlockchainsFilters): Promise<ListBlockchainsResponse> {
        return await this.apiClient.issueGetRequest(`/v1/blockchains`, filters);
    }

    /**
     * Get an blockchain
     * @param blockchainId The ID or legacyId of the blockchain
     */
    public async getBlockchainById(blockchainId: string): Promise<ListBlockchainResponse> {
        return await this.apiClient.issueGetRequest(`/v1/blockchains/${blockchainId}`);
    }

    /**
     * Retry to create a vault asset for a vault asset that failed
     * @param vaultAccountId The vault account ID
     * @param assetId The asset to add
     * @param requestOptions
     */
    public async activateVaultAsset(vaultAccountId: string, assetId: string, requestOptions?: RequestOptions): Promise<VaultAssetResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/activate`, {}, requestOptions);
    }

    /**
     * Creates a new external wallet
     * @param name A name for the new external wallet
     * @param customerRefId A customer reference ID
     * @param requestOptions
     */
    public async createExternalWallet(name: string, customerRefId?: string, requestOptions?: RequestOptions): Promise<WalletContainerResponse<ExternalWalletAsset>> {
        const body = {
            name,
            customerRefId
        };

        return await this.apiClient.issuePostRequest("/v1/external_wallets", body, requestOptions);
    }

    /**
     * Creates a new internal wallet
     * @param name A name for the new internal wallet
     * @param customerRefId A customer reference ID
     * @param requestOptions
     */
    public async createInternalWallet(name: string, customerRefId?: string, requestOptions?: RequestOptions): Promise<WalletContainerResponse<InternalWalletAsset>> {
        const body = {
            name,
            customerRefId
        };

        return await this.apiClient.issuePostRequest("/v1/internal_wallets", body, requestOptions);
    }

    /**
     * Creates a new contract wallet
     * @param name A name for the new contract wallet
     */
    public async createContractWallet(name: string, requestOptions?: RequestOptions): Promise<WalletContainerResponse<ExternalWalletAsset>> {
        const body = {
            name,
        };

        return await this.apiClient.issuePostRequest("/v1/contracts", body, requestOptions);
    }

    /**
     * Creates a new asset within an exiting external wallet
     * @param walletId The wallet id
     * @param assetId The asset to add
     * @param address The wallet address
     * @param tag (for ripple only) The ripple account tag
     * @param requestOptions
     */
    public async createExternalWalletAsset(walletId: string, assetId: string, address: string, tag?: string, requestOptions?: RequestOptions): Promise<ExternalWalletAsset> {
        const path = `/v1/external_wallets/${walletId}/${assetId}`;

        const body = {
            address: address,
            tag: tag
        };
        return await this.apiClient.issuePostRequest(path, body, requestOptions);
    }

    /**
     * Creates a new asset within an exiting internal wallet
     * @param walletId The wallet id
     * @param assetId The asset to add
     * @param address The wallet address
     * @param tag (for ripple only) The ripple account tag
     * @param requestOptions
     */
    public async createInternalWalletAsset(walletId: string, assetId: string, address: string, tag?: string, requestOptions?: RequestOptions): Promise<InternalWalletAsset> {
        const path = `/v1/internal_wallets/${walletId}/${assetId}`;

        const body = {
            address: address,
            tag: tag
        };
        return await this.apiClient.issuePostRequest(path, body, requestOptions);
    }

    /**
     * Creates a new asset within an exiting contract wallet
     * @param walletId The wallet id
     * @param assetId The asset to add
     * @param address The wallet address
     * @param tag (for ripple only) The ripple account tag
     */
    public async createContractWalletAsset(walletId: string, assetId: string, address: string, tag?: string, requestOptions?: RequestOptions): Promise<ExternalWalletAsset> {
        const path = `/v1/contracts/${walletId}/${assetId}`;

        const body = {
            address: address,
            tag: tag
        };
        return await this.apiClient.issuePostRequest(path, body, requestOptions);
    }

    /**
     * Creates a new transaction with the specified options
     */
    public async createTransaction(transactionArguments: TransactionArguments, requestOptions?: RequestOptions, travelRuleEncryptionOptions?: TravelRuleEncryptionOptions): Promise<CreateTransactionResponse> {
        const opts = { ...requestOptions };

        if (transactionArguments?.travelRuleMessage) {
            transactionArguments = await this.piiClient.hybridEncode(transactionArguments, travelRuleEncryptionOptions);
        }

        if (transactionArguments.source?.type === PeerType.END_USER_WALLET && !opts.ncw?.walletId) {
            const { walletId } = transactionArguments.source;
            opts.ncw = { ...opts.ncw, walletId };
        }

        return await this.apiClient.issuePostRequest("/v1/transactions", transactionArguments, opts);
    }

    /**
     * Estimates the fee for a transaction request
     */
    public async estimateFeeForTransaction(transactionArguments: TransactionArguments, requestOptions?: RequestOptions): Promise<EstimateTransactionFeeResponse> {
        return await this.apiClient.issuePostRequest("/v1/transactions/estimate_fee", transactionArguments, requestOptions);
    }

    /**
     * Gets the estimated fees for an asset
     */
    public async getFeeForAsset(asset: string): Promise<EstimateFeeResponse> {
        return await this.apiClient.issueGetRequest(`/v1/estimate_network_fee?assetId=${asset}`);
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
     * Deletes a single contract wallet
     * @param walletId The contract wallet ID
     */
    public async deleteContractWallet(walletId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/contracts/${walletId}`);
    }

    /**
     * Deletes a single contract wallet asset
     * @param walletId The contract wallet ID
     * @param assetId The asset ID
     */
    public async deleteContractWalletAsset(walletId: string, assetId: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueDeleteRequest(`/v1/contracts/${walletId}/${assetId}`);
    }

    /**
     * Sets a customer reference ID
     * @param vaultAccountId The vault account ID
     * @param customerRefId The customer reference ID to set
     * @param requestOptions
     */
    public async setCustomerRefIdForVaultAccount(vaultAccountId: string, customerRefId: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/set_customer_ref_id`, { customerRefId }, requestOptions);
    }

    /**
     * Sets a customer reference ID
     * @param walletId The ID of the internal wallet
     * @param customerRefId The customer reference ID to set
     * @param requestOptions
     */
    public async setCustomerRefIdForInternalWallet(walletId: string, customerRefId: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/internal_wallets/${walletId}/set_customer_ref_id`, { customerRefId }, requestOptions);
    }

    /**
     * Sets a customer reference ID
     * @param walletId The ID of the external wallet
     * @param customerRefId The customer reference ID to set
     * @param requestOptions
     */
    public async setCustomerRefIdForExternalWallet(walletId: string, customerRefId: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/external_wallets/${walletId}/set_customer_ref_id`, { customerRefId }, requestOptions);
    }

    /**
     * Sets a customer reference ID
     * @param vaultAccountId The vault account ID
     * @param assetId The ID of the asset
     * @param address The address
     * @param tag The XRP tag, or EOS memo
     * @param customerRefId The customer reference ID to set
     * @param requestOptions
     */
    public async setCustomerRefIdForAddress(vaultAccountId: string, assetId: string, address: string, tag?: string, customerRefId?: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        let addressId = address;
        if (tag && tag.length > 0) {
            addressId = `${address}:${tag}`;
        }

        return await this.apiClient.issuePostRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses/${addressId}/set_customer_ref_id`, { customerRefId }, requestOptions);
    }

    /**
     * Set the required number of confirmations for transaction
     * @param txId
     * @param requiredConfirmationsNumber
     * @param requestOptions
     */
    public async setConfirmationThresholdForTxId(txId: string, requiredConfirmationsNumber: number, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/transactions/${txId}/set_confirmation_threshold`, { numOfConfirmations: requiredConfirmationsNumber }, requestOptions);
    }

    /**
     * Set the required number of confirmations for transactions by tx hash
     * @param txHash
     * @param requiredConfirmationsNumber
     * @param requestOptions
     */
    public async setConfirmationThresholdForTxHash(txHash: string, requiredConfirmationsNumber: number, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/txHash/${txHash}/set_confirmation_threshold`, { numOfConfirmations: requiredConfirmationsNumber }, requestOptions);
    }

    /**
     * Get the public key information
     * @param args
     */
    public async getPublicKeyInfo(args: PublicKeyInfoArgs): Promise<PublicKeyInformation> {
        return await getPublicKeyInfoImpl(PeerType.VAULT_ACCOUNT, args, this.apiClient);
    }

    /**
     * allocate funds from you default balance to a private ledger
     * @param vaultAccountId
     * @param asset
     * @param vaultAccountId
     * @param asset
     * @param args
     * @param requestOptions
     */
    public async allocateFundsToPrivateLedger(vaultAccountId: string, asset: string, args: AllocateFundsRequest, requestOptions?: RequestOptions): Promise<AllocateFundsResponse> {
        const url = `/v1/vault/accounts/${vaultAccountId}/${asset}/lock_allocation`;
        return await this.apiClient.issuePostRequest(url, args, requestOptions);
    }

    /**
     * deallocate funds from a private ledger to your default balance
     * @param vaultAccountId
     * @param asset
     * @param args
     * @param requestOptions
     */
    public async deallocateFundsFromPrivateLedger(vaultAccountId: string, asset: string, args: DeallocateFundsRequest, requestOptions?: RequestOptions): Promise<AllocateFundsResponse> {
        const url = `/v1/vault/accounts/${vaultAccountId}/${asset}/release_allocation`;
        return await this.apiClient.issuePostRequest(url, args, requestOptions);
    }

    /**
     * Get the public key information for a vault account
     * @param args
     */
    public async getPublicKeyInfoForVaultAccount(args: PublicKeyInfoForVaultAccountArgs): Promise<PublicKeyResponse> {
        return await getPublicKeyInfoByAccountAssetImpl(PeerType.VAULT_ACCOUNT, args, this.apiClient);
    }

    /**
     * Get configuration and status of the Gas Station account
     */
    public async getGasStationInfo(assetId?: string): Promise<GasStationInfo> {
        let url = `/v1/gas_station`;

        if (assetId) {
            url += `/${assetId}`;
        }

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Set configuration of the Gas Station account
     */
    public async setGasStationConfiguration(gasThreshold: string, gasCap: string, maxGasPrice?: string, assetId?: string): Promise<OperationSuccessResponse> {
        let url = `/v1/gas_station/configuration`;

        if (assetId) {
            url += `/${assetId}`;
        }

        const body = { gasThreshold, gasCap, maxGasPrice };

        return await this.apiClient.issuePutRequest(url, body);
    }

    /**
     * Drop an ETH based transaction
     */
    public async dropTransaction(txId: string, feeLevel?: string, requestedFee?: string, requestOptions?: RequestOptions): Promise<DropTransactionResponse> {
        const url = `/v1/transactions/${txId}/drop`;

        const body = { feeLevel, requestedFee };

        return await this.apiClient.issuePostRequest(url, body, requestOptions);
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
     * Get maximum BIP44 index used in deriving addresses or in change addresses
     */
    public async getMaxBip44IndexUsed(vaultAccountId: string, assetId: string): Promise<MaxBip44IndexUsedResponse> {
        const url = `/v1/vault/accounts/${vaultAccountId}/${assetId}/max_bip44_index_used`;

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Gets a paginated response of the addresses for a given vault account and asset
     */
    public async getPaginatedAddresses(vaultAccountId: string, assetId: string, paginatedAddressesRequestFilters?: OptionalPaginatedAddressesRequestFilters): Promise<PaginatedAddressesResponse> {
        return await this.apiClient.issueGetRequest(`/v1/vault/accounts/${vaultAccountId}/${assetId}/addresses_paginated?${queryString.stringify(paginatedAddressesRequestFilters)}`);
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
     * @param requestOptions
     */
    public async unfreezeTransactionById(txId: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return this.apiClient.issuePostRequest(`/v1/transactions/${txId}/unfreeze`, {}, requestOptions);
    }

    /**
     * Freezes the selected transaction
     * @param txId The transaction id to freeze
     * @param requestOptions
     */
    public async freezeTransactionById(txId: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return this.apiClient.issuePostRequest(`/v1/transactions/${txId}/freeze`, {}, requestOptions);
    }

    /**
     * Resend failed webhooks
     */
    public async resendWebhooks(requestOptions?: RequestOptions): Promise<ResendWebhooksResponse> {
        return await this.apiClient.issuePostRequest("/v1/webhooks/resend", {}, requestOptions);
    }

    /**
     * Resend transaction webhooks
     * @param txId The transaction for which the message is sent
     * @param resendCreated If true a webhook will be sent for the creation of the transaction
     * @param resendStatusUpdated If true a webhook will be sent for the status of the transaction
     * @param requestOptions
     */
    public async resendTransactionWebhooksById(txId: string, resendCreated?: boolean, resendStatusUpdated?: boolean, requestOptions?: RequestOptions): Promise<ResendWebhooksResponse> {
        const body = { resendCreated, resendStatusUpdated };
        return await this.apiClient.issuePostRequest(`/v1/webhooks/resend/${txId}`, body, requestOptions);
    }

    /**
     * Gets all Users for your tenant
     */
    public async getUsers(): Promise<User[]> {
        return await this.apiClient.issueGetRequest("/v1/users");
    }

    /**
     * Gets all Console Users for your tenant
     */
    public async getConsoleUsers(): Promise<{ users: ConsoleUser[] }> {
        return await this.apiClient.issueGetRequest("/v1/management/users");
    }

    /**
     * Gets all Api Users for your tenant
     */
    public async getApiUsers(): Promise<{ users: ApiUser[] }> {
        return await this.apiClient.issueGetRequest("/v1/management/api_users");
    }

    /**
     * Create Console User for your tenant
     * @param firstName firstName of the user, example: "Johnny".  Maximum length: 30 chars.
     * @param lastName lastName of the user. Maximum length: 30 chars.
     * @param email email of the user, example: "email@example.com"
     * @param role role of the user, for example: "ADMIN"
     * @param requestOptions
     */
    public async createConsoleUser(firstName: string, lastName: string, email: string, role: TRole, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        const body = { firstName, lastName, email, role };
        return await this.apiClient.issuePostRequest("/v1/management/users", body, requestOptions);
    }

    /**
     * Create Api User for your tenant
     * @param name name of the api user, example: "Johnny The Api".  Maximum length: 30 chars.
     * @param role role of the user, for example: "ADMIN"
     * @param csrPem generate .csr file and provide its string content here, example:  "-----BEGIN CERTIFICATE REQUEST-----aaa-----END CERTIFICATE REQUEST-----"
     * You can find more info about csrPem and how to create it here: https://developers.fireblocks.com/docs/quickstart
     * @param coSignerSetup your cosigner, for example: "SGX_MACHINE", read more: https://developers.fireblocks.com/docs/quickstart
     * @param coSignerSetupIsFirstUser [SGX server enabled only] If you are the first user to be configured on this SGX-enabled Co-Signer server, this has to be true
     */
    public async createApiUser(name: string, role: TRole, csrPem: string, coSignerSetup?: string, coSignerSetupIsFirstUser?: boolean, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        const body = { name, role, csrPem, coSignerSetup, coSignerSetupIsFirstUser };
        return await this.apiClient.issuePostRequest("/v1/management/api_users", body, requestOptions);
    }

    /**
     * Re-enroll Mobile Device of a user in your tenant
     * @param id userId of the user to reset device
     * @param requestOptions
     */
    public async resetDeviceRequest(id: string, requestOptions?: RequestOptions): Promise<OperationSuccessResponse> {
        return await this.apiClient.issuePostRequest(`/v1/management/users/${id}/reset_device`, {}, requestOptions);
    }

    /**
     * Get whitelisted addresses of api user in your tenant
     * @param id userId of the user
     * @param requestOptions
     */
    public async getWhitelistedAddresses(id: string): Promise<OperationSuccessResponse> {
        return await this.apiClient.issueGetRequest(`/v1/management/api_users/${id}/whitelist_ip_addresses`);
    }

    /**
     * Get the tenant's OTA (One-Time-Address) configuration
     */
    public async getOtaConfiguration(): Promise<{ enabled: boolean }> {
        return await this.apiClient.issueGetRequest("/v1/management/ota");
    }

    /**
     * Update the tenant's OTA (One-Time-Address) configuration
     * @param enable
     */
    public async updateOtaConfiguration(enable: boolean): Promise<void> {
        const body = { enabled: enable };
        return await this.apiClient.issuePutRequest("/v1/management/ota", body);
    }

    /** Gets all Users Groups for your tenant
     */
    public async getUserGroups(): Promise<UsersGroup[]> {
        return await this.apiClient.issueGetRequest("/v1/management/user_groups");
    }

    /**
     * Gets a Users Group by ID
     * @param id The ID of the User
     */
    public async getUserGroup(id: string): Promise<UsersGroup> {
        return await this.apiClient.issueGetRequest(`/v1/management/user_groups/${id}`);
    }

    /**
     * Creates a new Users Group
     * @param name The name of the Users Group
     * @param memberIds The members of the Users Group
     */
    public async createUserGroup(groupName: string, memberIds?: string[]): Promise<UsersGroup> {
        const body = { groupName, memberIds };
        return await this.apiClient.issuePostRequest("/v1/management/user_groups", body);
    }

    /**
     * Updates a Users Group
     * @param id The ID of the Users Group
     * @param name The name of the Users Group
     * @param memberIds The members of the Users Group
     */
    public async updateUserGroup(id: string, groupName?: string, memberIds?: string[]): Promise<UsersGroup> {
        const body = { groupName, memberIds };
        return await this.apiClient.issuePutRequest(`/v1/management/user_groups/${id}`, body);
    }

    /**
     * Deletes a Users Group
     * @param id The ID of the Users Group
     */
    public async deleteUserGroup(id: string): Promise<void> {
        return await this.apiClient.issueDeleteRequest(`/v1/management/user_groups/${id}`);
    }

    /**
     * Get off exchange accounts
     */
    public async getOffExchangeAccounts(): Promise<OffExchangeEntityResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/off_exchange_accounts`);
    }

    /**
     * Get off exchange account by virtual account id
     * @param id the ID of the off exchange
     */
    public async getOffExchangeAccountById(id: string): Promise<OffExchangeEntityResponse> {
        return await this.apiClient.issueGetRequest(`/v1/off_exchange_accounts/${id}`);
    }

    /**
     * Settle off exchange account by virtual account id
     * @param id the ID of the off exchange
     * @param requestOptions
     */
    public async settleOffExchangeAccountById(id: string, requestOptions?: RequestOptions): Promise<SettleOffExchangeAccountResponse> {
        return await this.apiClient.issuePostRequest(`/v1/off_exchange_accounts/${id}/settle`, {}, requestOptions);
    }

    /**
     * Add collateral account, create deposit request
     * @param depositRequest
     * @param requestOptions
     */
    public async addCollateral(depositRequest: AddCollateralTransactionRequest, requestOptions?: RequestOptions): Promise<CreateTransactionResponse> {
        return await this.apiClient.issuePostRequest(`/v1/off_exchange/add`, depositRequest, requestOptions);
    }

    /**
     * Remove collateral account, create withdraw request
     * @param withdrawRequest
     * @param requestOptions
     */
    public async removeCollateral(withdrawRequest: RemoveCollateralTransactionRequest, requestOptions?: RequestOptions): Promise<CreateTransactionResponse> {
        return await this.apiClient.issuePostRequest(`/v1/off_exchange/remove`, withdrawRequest, requestOptions);
    }

    /**
     *
     * @param requestOptions
     */
    public async getSettlementTransactions(settlementRequest: SettlementRequest): Promise<GetSettlementTransactionsResponse> {
        return await this.apiClient.issueGetRequest(`/v1/off_exchange/settlements/transactions?mainExchangeAccountId=${settlementRequest.mainExchangeAccountId}`);
    }

    /**
     *
     * @param settlementRequest
     * @param requestOptions
     */
    public async settlement(settlementRequest: SettlementRequest, requestOptions?: RequestOptions): Promise<SettlementResponse> {
        return await this.apiClient.issuePostRequest(`/v1/off_exchange/settlements/trader`, settlementRequest, requestOptions);
    }
    /**
     * Set Fee Payer configuration
     * @param feePayerConfiguration
     * @param baseAsset
     * @param requestOptions
     */
    public async setFeePayerConfiguration(baseAsset: string, feePayerConfiguration: SetFeePayerConfiguration, requestOptions?: RequestOptions): Promise<FeePayerConfiguration> {
        return await this.apiClient.issuePostRequest(`/v1/fee_payer/${baseAsset}`, feePayerConfiguration, requestOptions);
    }

    /**
     * Get Fee Payer Configuration
     * @param baseAsset
     */
    public async getFeePayerConfiguration(baseAsset: string): Promise<FeePayerConfiguration> {
        return await this.apiClient.issueGetRequest(`/v1/fee_payer/${baseAsset}`);
    }

    /**
     * Delete Fee Payer Configuration
     * @param baseAsset
     */
    public async removeFeePayerConfiguration(baseAsset: string): Promise<void> {
        return await this.apiClient.issueDeleteRequest(`/v1/fee_payer/${baseAsset}`);
    }

    private getWeb3ConnectionPath(type: Web3ConnectionType): string {
        const basePath = `/v1/connections`;

        switch (type) {
            case (Web3ConnectionType.WALLET_CONNECT): {
                return `${basePath}/wc`;
            }
            default: {
                throw new Error(`Invalid Web3 connection type`);
            }
        }
    }

    /**
     * Get all signer connections of the current tenant
     * @param {Object} payload The payload for getting the current tenant's sessions
     * @param payload.pageCursor The cursor for the next page
     * @param payload.pageSize The amount of results to return on the next page
     * @param payload.sort The property to sort the results by
     * @param payload.filter The filter object, containing properties as keys and the values to filter by as values
     * @param payload.order Should the results be ordered in ascending order (false) or descending (true)
     *
     * @returns An object containing the data returned and the cursor for the next page
     */
    public async getWeb3Connections({
        pageCursor,
        pageSize,
        sort,
        filter,
        order
    }: GetWeb3ConnectionsPayload = {}): Promise<Web3PagedResponse<Session>> {
        const params = new URLSearchParams({
            ...(pageCursor && { next: pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(filter && { filter: stringify(filter, { delimiter: "," }) }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(`/v1/connections?${params.toString()}`);
    }

    /**
     * Initiate a new web3 connection
     * @param type The type of the connection
     * @param payload The payload for creating a new web3 connection
     * @param requestOptions
     * @param payload.vaultAccountId The vault account to link with the dapp
     * @param payload.feeLevel The fee level for the connection
     * @param payload.uri The WalletConnect URI, as provided by the dapp
     * @param payload.chainIds Array of the approved chains for the connection
     *
     * @returns The created session's ID and it's metadata
     * @example {
     *  vaultAccountId: 0
     *  feeLevel: "MEDIUM"
     *  connectionType: "WalletConnect"
     *  uri: "wc:77752975-906f-48f5-b59f-047826ee947e@1?bridge=https%3A%2F%2F0.bridge.walletconnect.org&key=64be99adc6086b7a729b0ec8c7e1f174927ab92e84f5c6f9527050225344a637"
     *  chainIds: ["ETH", "ETH_TEST"]
     * }
     */
    public async createWeb3Connection(type: Web3ConnectionType.WALLET_CONNECT, payload: CreateWalletConnectPayload, requestOptions?: RequestOptions): Promise<CreateWeb3ConnectionResponse>;
    public async createWeb3Connection(type: Web3ConnectionType, payload: CreateWeb3ConnectionPayload, requestOptions?: RequestOptions): Promise<CreateWeb3ConnectionResponse> {
        const path = this.getWeb3ConnectionPath(type);

        return await this.apiClient.issuePostRequest(path, payload, requestOptions);
    }

    /**
     * Approve or Reject the initiated connection
     * @param type The type of the connection
     * @param sessionId The ID of the session
     * @param approve Whether you approve the connection or not
     */
    public async submitWeb3Connection(type: Web3ConnectionType.WALLET_CONNECT, sessionId: string, approve: boolean): Promise<void>;
    public async submitWeb3Connection(type: Web3ConnectionType, sessionId: string, approve: boolean): Promise<void> {
        const path = this.getWeb3ConnectionPath(type);

        return await this.apiClient.issuePutRequest(`${path}/${sessionId}`, { approve });
    }

    /**
     * Remove an existing connection
     * @param type The type of the connection
     * @param sessionId The ID of the session
     */
    public async removeWeb3Connection(type: Web3ConnectionType.WALLET_CONNECT, sessionId: string): Promise<void>;
    public async removeWeb3Connection(type: Web3ConnectionType, sessionId: string): Promise<void> {
        const path = this.getWeb3ConnectionPath(type);

        return await this.apiClient.issueDeleteRequest(`${path}/${sessionId}`);
    }

    /**
     * Gets all audits for selected time period
     * @param timePeriod
     * @param cursor
     */
    public async getAudits(timePeriod?: TimePeriod): Promise<AuditsResponse> {
        const queryParams = {
            timePeriod,
        };

        return await this.apiClient.issueGetRequest(`/v1/audits?${queryString.stringify(queryParams)}`);
    }

    /**
     * Gets paginated audit logs for selected time period
     * @param timePeriod
     * @param cursor
     */
    public async getPaginatedAuditLogs(timePeriod?: TimePeriod, cursor?: string): Promise<AuditLogsResponse> {
        const queryParams = {
            timePeriod,
            cursor,
        };

        return await this.apiClient.issueGetRequest(`/v1/management/audit_logs?${queryString.stringify(queryParams)}`);
    }

    /**
     *
     * @param id
     */
    public async getNFT(id: string): Promise<Token> {
        return await this.apiClient.issueGetRequest(`/v1/nfts/tokens/${id}`);
    }

    /**
     * @param {Object} payload
     * @param payload.pageCursor
     * @param payload.pageSize
     * @param payload.ids
     * @param payload.sort
     * @param payload.order
     */
    public async getNFTs({ pageCursor, pageSize, ids, sort, order }: GetNFTsFilter): Promise<Web3PagedResponse<Token>> {
        const queryParams = {
            pageCursor,
            pageSize,
            ids: this.getCommaSeparatedList(ids),
            sort: this.getCommaSeparatedList(sort),
            order,
        };

        return await this.apiClient.issueGetRequest(`/v1/nfts/tokens?${queryString.stringify(queryParams)}`);
    }

    /**
     *
     * Gets a list of owned NFT tokens
     * @param filter.vaultAccountIds List of vault account IDs
     * @param filter.blockchainDescriptor The blockchain descriptor (based on legacy asset)
     * @param filter.collectionIds List of collection IDs
     * @param filter.ids List of token ids to fetch
     * @param filter.pageCursor Page cursor
     * @param filter.pageSize Page size
     * @param filter.sort Sort by value
     * @param filter.order Order value
     * @param filter.status Status (LISTED, ARCHIVED)
     * @param filter.search Search filter
     * @param filter.ncwAccountIds List of Non-Custodial wallet account IDs
     * @param filter.ncwId Non-Custodial wallet id
     * @param filter.walletType Wallet type (VAULT_ACCOUNT, END_USER_WALLET)
     * @param filter.spam Spam filter (true, false, all)
     */
    public async getOwnedNFTs(filter?: NFTOwnershipFilter): Promise<Web3PagedResponse<TokenWithBalance>> {
        let url = "/v1/nfts/ownership/tokens";
        if (filter) {
            const { blockchainDescriptor, vaultAccountIds, collectionIds, ids, pageCursor, pageSize, sort, order, status, search, ncwId, ncwAccountIds, walletType, spam } = filter;
            const requestFilter = {
                vaultAccountIds: this.getCommaSeparatedList(vaultAccountIds),
                blockchainDescriptor,
                collectionIds: this.getCommaSeparatedList(collectionIds),
                pageCursor,
                pageSize,
                ids: this.getCommaSeparatedList(ids),
                sort: this.getCommaSeparatedList(sort),
                order,
                status,
                search,
                ncwId,
                ncwAccountIds,
                walletType,
                spam,
            };
            url += `?${queryString.stringify(requestFilter)}`;
        }
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     *
     * Get a list of owned NFT collections
     * @param filter.search Search by value
     * @param filter.status Status (LISTED, ARCHIVED)
     * @param filter.ncwId Non-Custodial wallet id
     * @param filter.walletType Wallet type (VAULT_ACCOUNT, END_USER_WALLET)
     * @param filter.pageCursor Page cursor
     * @param filter.pageSize Page size
     * @param filter.sort Sort by value
     * @param filter.order Order by value
     */
    public async listOwnedCollections(filter?: NFTOwnedCollectionsFilter): Promise<Web3PagedResponse<CollectionOwnership>> {
        let url = "/v1/nfts/ownership/collections";
        if (filter) {
            const { search, status, ncwId, walletType, pageCursor, pageSize, sort, order } = filter;

            const requestFilter = {
                search,
                status,
                ncwId,
                walletType,
                pageCursor,
                pageSize,
                sort: this.getCommaSeparatedList(sort),
                order,
            };
            url += `?${queryString.stringify(requestFilter)}`;
        }

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     *
     * Get a list of owned tokens
     * @param filter.search Search by value
     * @param filter.status Status (LISTED, ARCHIVED)
     * @param filter.ncwId Non-Custodial wallet id
     * @param filter.walletType Wallet type (VAULT_ACCOUNT, END_USER_WALLET)
     * @param filter.pageCursor Page cursor
     * @param filter.pageSize Page size
     * @param filter.sort Sort by value
     * @param filter.order Order by value
     * @param filter.spam Spam filter (true, false, all)
     */
    public async listOwnedAssets(filter?: NFTOwnedAssetsFilter): Promise<Web3PagedResponse<Token>> {
        let url = "/v1/nfts/ownership/assets";
        if (filter) {
            const { search, status, ncwId, walletType, pageCursor, pageSize, sort, order, spam } = filter;

            const requestFilter = {
                search,
                status,
                ncwId,
                walletType,
                pageCursor,
                pageSize,
                sort: this.getCommaSeparatedList(sort),
                order,
                spam,
            };
            url += `?${queryString.stringify(requestFilter)}`;
        }

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     *
     * @param id
     */
    public async refreshNFTMetadata(id: string): Promise<void> {
        return await this.apiClient.issuePutRequest(`/v1/nfts/tokens/${id}`, undefined);
    }

    /**
     *
     * Update NFT ownership status for specific token
     * @param id NFT asset id
     * @param status Status for update
     */
    public async updateNFTOwnershipStatus(id: string, status: NFTOwnershipStatus): Promise<void> {
        return await this.apiClient.issuePutRequest(`/v1/nfts/ownership/tokens/${id}/status`, { status });
    }

    /**
     *
     * Updates tokens status for a tenant, in all tenant vaults.
     * @param payload List of assets with status for update
     */
    public async updateNFTOwnershipsStatus(payload: NFTOwnershipStatusUpdatedPayload[]): Promise<void> {
        return await this.apiClient.issuePutRequest(`/v1/nfts/ownership/tokens/status`, payload);
    }

    /**
     *
     * @param vaultAccountId
     * @param blockchainDescriptor
     */
    public async refreshNFTOwnershipByVault(vaultAccountId: string, blockchainDescriptor: string): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `/v1/nfts/ownership/tokens?vaultAccountId=${vaultAccountId}&blockchainDescriptor=${blockchainDescriptor}`,
            undefined);
    }

    /**
     *
     * @param payload.assetId NFT asset id
     * @param payload.spam Spam status
     */
    public async updateNFTTokenOwnershipSpamStatus(payload: TokenOwnershipSpamUpdatePayload[]): Promise<void> {
        return await this.apiClient.issuePutRequest(`/v1/nfts/ownership/tokens/spam`, payload);
    }

    /**
     * Get all contract templates
     * @param {Object} payload The payload for getting the current tenant's sessions
     * @param {ContractInitializationPhase} payload.initializationPhase The contract initialization phase
     * @param {ContractTemplateType} payload.type The type of the contract templates you wish to retrieve. May contain more than one type
     * @param {number} payload.pageSize The amount of results to return on the next page
     * @param {string} payload.pageCursor The cursor for the next page
     *
     * @returns {LeanContractTemplateDto[]} A paginated array of contract templates
     */
    public async getContractTemplates({
        initializationPhase,
        type,
        pageSize = DEFAULT_MAX_PAGE_SIZE,
        pageCursor
    }: GetContractTemplatesFilter = {}): Promise<Web3PagedResponse<LeanContractTemplateDto>> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/templates`, {
            initializationPhase,
            type,
            pageSize,
            pageCursor
        });
    }

    /**
     * Upload a new contract. This contract would be private and only your tenant can see it
     * @param payload
     *
     * @returns {ContractTemplateDto}
     */
    public async uploadContractTemplate(payload: ContractUploadRequest): Promise<ContractTemplateDto> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/templates`, payload);
    }

    /**
     * Get contract template by id
     * @param templateId
     *
     * @returns {ContractTemplateDto}
     */
    public async getContractTemplate(templateId: string): Promise<ContractTemplateDto> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/templates/${templateId}`);
    }

    /**
     * Delete a contract template by id
     * @param templateId
     */
    public async deleteContractTemplate(templateId: string): Promise<void> {
        return await this.apiClient.issueDeleteRequest(`/v1/tokenization/templates/${templateId}`);
    }

    /**
     * Get contract template deploy function by id
     * @param templateId
     * @param withDocs
     *
     * @returns {AbiFunction}
     */
    public async getContractTemplateDeployFunction(templateId: string, withDocs: boolean = false): Promise<AbiFunction> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/templates/${templateId}/deploy_function?withDocs=${withDocs}`);
    }

    /**
     * Deploy a new contract by contract template id
     * @param templateId
     *
     * @returns {ContractDeployResponse}
     */
    public async deployContract(templateId: string, payload: ContractDeployRequest): Promise<ContractDeployResponse> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/templates/${templateId}/deploy`, payload);
    }

    /**
     * Get supported blockchains by template id
     * @param templateId
     *
     * @returns {SupportedBlockchainsResponse}
     */
    public async getSupportedBlockchains(templateId: string): Promise<SupportedBlockchainsResponse> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/templates/${templateId}/supported_blockchains`);
    }

    /**
     * Get all contracts by blockchain and template
     * @param blockchainId
     * @param contractTemplateId
     *
     * @returns {LeanDeployedContractResponseDto[]}
     */
    public async getContractsByFilter({ contractTemplateId, baseAssetId, contractAddress, pageSize = DEFAULT_MAX_PAGE_SIZE, pageCursor }: GetContractsFilter = {}): Promise<Web3PagedResponse<LeanDeployedContractResponseDto>> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/contracts`, {
            contractTemplateId,
            baseAssetId,
            contractAddress,
            pageSize,
            pageCursor,
        });
    }

    /**
     * Get contract ABI function by contractId
     * @param contractId
     * @param functionSignature
     *
     * @returns {AbiFunction}
     */
    public async getContractAbiFunction(contractId: string, functionSignature: string): Promise<AbiFunction> {
        return await this.apiClient.issueGetRequest(`/v1/contract-service/contract/${contractId}/function`, {
            functionSignature
        });
    }

    /**
     * Get contract's address by blockchain base assetId and the transaction hash
     * @param baseAssetId
     * @param txHash
     *
     * @returns {ContractAddressResponseDto}
     */
    public async getContractAddress(baseAssetId: string, txHash: string): Promise<ContractAddressResponseDto> {
        return await this.apiClient.issueGetRequest(`/v1/contract_interactions/base_asset_id/${baseAssetId}/tx_hash/${txHash}`);
    }
    /**
     * Get contract by blockchain base assetId and contract address
     * @param baseAssetId
     * @param templateId
     *
     * @returns {DeployedContractResponseDto}
     */
    public async getContractByAddress(baseAssetId: string, contractAddress: string): Promise<DeployedContractResponseDto> {
        return await this.apiClient.issueGetRequest(`/v1/contract_interactions/base_asset_id/${baseAssetId}/contract_address/${contractAddress}`);
    }

    /**
     * Get contract's ABI by blockchain base assetId and contract address
     * @param baseAssetId
     * @param contractAddress
     *
     * @returns {ContractAbiResponseDto}
     */
    public async getContractAbi(baseAssetId: string, contractAddress: string): Promise<ContractAbiResponseDto> {
        return await this.apiClient.issueGetRequest(`/v1/contract_interactions/base_asset_id/${baseAssetId}/contract_address/${contractAddress}/functions`);
    }

    /**
     * Fetch the ABI. If not found fetch the ABI from the block explorer
     * @param baseAssetId
     * @param contractAddress
     *
     * @returns {ContractWithABIDto}
     */
    public async fetchOrScrapeABI(baseAssetId: string, contractAddress: string): Promise<ContractWithABIDto> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/contracts/fetch_abi`, {
            baseAssetId,
            contractAddress
        });
    }

    /**
     * Save contract ABI for the tenant
     * @param baseAssetId
     * @param contractAddress
     * @param abi
     * @param name
     *
     * @returns {ContractWithABIDto}
     */
    public async saveABI(baseAssetId: string, contractAddress: string, abi: AbiFunction[], name?: string): Promise<ContractWithABIDto> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/contracts/abi`, {
            baseAssetId,
            contractAddress,
            abi,
            name
        });
    }

    /**
     * Get transaction receipt by blockchain base assetId and transaction hash
     * @param baseAssetId
     * @param txHash
     *
     * @returns TransactionReceiptResponseDto
     */
    public async getTransactionReceipt(baseAssetId: string, txHash: string): Promise<TransactionReceiptResponseDto> {
        return await this.apiClient.issueGetRequest(`/v1/contract_interactions/base_asset_id/${baseAssetId}/tx_hash/${txHash}/receipt`);
    }

    /**
     * Call contract read function by blockchain base assetId and contract address
     * @param baseAssetId
     * @param templateId
     *
     * @returns ParameterWithValueList
     */
    public async readContractCallFunction(baseAssetId: string, contractAddress: string, payload: ReadCallFunctionDto): Promise<ParameterWithValueList> {
        return await this.apiClient.issuePostRequest(`/v1/contract_interactions/base_asset_id/${baseAssetId}/contract_address/${contractAddress}/functions/read`, payload);
    }

    /**
     * Call contract write function by blockchain base assetId and contract address
     * @param baseAssetId
     * @param templateId
     *
     * @returns WriteCallFunctionResponseDto
     */
    public async writeContractCallFunction(baseAssetId: string, contractAddress: string, payload: WriteCallFunctionDto): Promise<WriteCallFunctionResponseDto> {
        return await this.apiClient.issuePostRequest(`/v1/contract_interactions/base_asset_id/${baseAssetId}/contract_address/${contractAddress}/functions/write`, payload);
    }

    /**
     * Creates a new asset and links it as a token.
     *
     * @param {IssueTokenRequest} payload - The payload containing information for token issuance.
     *
     * @returns {TokenLink} Response with created token ID
     */
    public async issueNewToken(payload: IssueTokenRequest): Promise<TokenLink> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/tokens`, payload);
    }

    /**
     * Retrieves all linked tokens in a paginated format.
     *
     * @param {Object} payload
     * @param {TokenLinkStatus} payload.status - The status of linked tokens (COMPLETED / PENDING). Default is COMPLETED
     * @param {number} payload.pageSize - The number of results to return on the next page
     * @param {string} payload.pageCursor - The cursor for the next page
     *
     * @returns {TokenLink[]} A paginated array of linked tokens
     */
    public async getLinkedTokens({ status, pageSize = DEFAULT_MAX_PAGE_SIZE, pageCursor }: GetTokenLinksFilter = {}): Promise<Web3PagedResponse<TokenLink>> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/tokens`, {
            status,
            pageSize,
            pageCursor,
        });
    }

    /**
     * Get the total count of linked tokens
     * @returns TokenLinksCount
     */
    public async getLinkedTokensCount(): Promise<TokenLinksCount> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/tokens/count`);
    }

    /**
     * Link a token by refId to the tenant
     * @param type
     * @param refId
     * @param displayName
     *
     * @returns TokenLink
     */
    public async linkToken(type: SupportedContractTemplateType, refId: string, displayName?: string): Promise<TokenLink> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/tokens/link`, { type, refId, displayName });
    }

    /**
     * Link a token by baseAssetId and contract address to the tenant
     * @param type
     * @param baseAssetId
     * @param contractAddress
     * @param displayName
     *
     * @returns TokenLink
     */
    public async linkContractByAddress(type: SupportedContractTemplateType, baseAssetId: string, contractAddress: string, displayName?: string): Promise<TokenLink> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/tokens/link`, { type, baseAssetId, contractAddress, displayName });
    }

    /**
     * Get a linked token
     * @param id
     *
     * @returns TokenLink
     */
    public async getLinkedToken(id: string): Promise<TokenLink> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/tokens/${id}`);
    }

    /**
     * Delete a token link
     * @param id
     */
    public async unlinkToken(id: string): Promise<void> {
        await this.apiClient.issueDeleteRequest(`/v1/tokenization/tokens/${id}`);
    }

    /**
     * Retrieves all pending linked tokens in a paginated format
     *
     * @param {Object} payload - The payload for retrieving pending linked tokens
     * @param {number} payload.pageSize - The number of results to return on the next page
     * @param {string} payload.pageCursor - The cursor for the next page
     *
     * @returns {TokenLink[]} A paginated array of pending linked tokens
     */
    public async getPendingLinkedTokens({ pageSize, pageCursor }: GetTokenLinksFilter = {}): Promise<Web3PagedResponse<TokenLink>> {
        return await this.getLinkedTokens({ status: TokenLinkStatus.PENDING, pageSize, pageCursor });
    }

    /**
     * Creates a new collection and links it
     *
     * @param {CreateCollectionRequest} payload - The payload containing information for collection creation
     *
     * @returns {CollectionLink} Response with created collection link ID
     */
    public async createNewCollection(payload: CreateCollectionRequest): Promise<CollectionLink> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/collections`, payload);
    }

    /**
     * Retrieves all linked collections in a paginated format.
     *
     * @param {Object} payload
     * @param {TokenLinkStatus} payload.status - The status of linked collections (COMPLETED / PENDING). Default is COMPLETED
     * @param {number} payload.pageSize - The number of results to return on the next page
     * @param {string} payload.pageCursor - The cursor for the next page
     *
     * @returns {CollectionLink[]} A paginated array of linked collections
     */
    public async getLinkedCollections({ status, pageSize = DEFAULT_MAX_PAGE_SIZE, pageCursor }: GetTokenLinksFilter = {}): Promise<Web3PagedResponse<CollectionLink>> {
        return await this.apiClient.issueGetRequest("/v1/tokenization/collections", {
            status,
            pageSize,
            pageCursor,
        });
    }

    /**
     * Get a linked collection
     *
     * @returns CollectionLink
     */
    public async getLinkedCollection(id: string): Promise<CollectionLink> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/collections/${id}`);
    }

    /**
     * Unlink a collection
     */
    public async unlinkCollection(id: string): Promise<void> {
        await this.apiClient.issueDeleteRequest(`/v1/tokenization/collections/${id}`);
    }

    /**
     * Mint collection NFT
     *
     * @returns WriteCallFunctionResponseDto
     */
    public async mintNFT(collectionId: string, payload: MintCollectionTokenRequest): Promise<WriteCallFunctionResponseDto> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/collections/${collectionId}/tokens/mint`, payload);
    }

    /**
     * Burn collection NFT
     *
     * @returns WriteCallFunctionResponseDto
     */
    public async burnNFT(collectionId: string, payload: BurnCollectionTokenRequest): Promise<WriteCallFunctionResponseDto> {
        return await this.apiClient.issuePostRequest(`/v1/tokenization/collections/${collectionId}/tokens/burn`, payload);
    }

    /**
     * Get collection token details
     *
     * @returns CollectionTokenResponseDto
     */
    public async getLinkedCollectionTokenDetails(collectionId: string, tokenId: string): Promise<CollectionTokenResponseDto> {
        return await this.apiClient.issueGetRequest(`/v1/tokenization/collections/${collectionId}/tokens/${tokenId}`);
    }

    /**
     * Validate VASP details for travel rule compliance
     * @param travelRuleMessageVaspInfo
     */
    public async validateTravelRuleTransaction(travelRuleMessageVaspInfo: ValidateTravelRuleVaspInfo): Promise<ValidateTravelRuleResult> {
        return await this.apiClient.issuePostRequest(`/v1/screening/travel_rule/transaction/validate`, travelRuleMessageVaspInfo);
    }

    /**
     * Validate Travel Rule transaction and PII data
     * @param travelRuleMessage
     */
    public async validateFullTravelRuleTransaction(travelRuleMessage: ValidateCreateTravelRuleTransaction): Promise<ValidateFullTravelRuleResult> {
        return await this.apiClient.issuePostRequest(`/v1/screening/travel_rule/transaction/validate/full`, travelRuleMessage);
    }

    /**
     * Get VASP details for travel rule compliance
     * @param did
     */
    public async getTravelRuleVASPDetails(did: string): Promise<TravelRuleVasp> {
        return await this.apiClient.issueGetRequest(`/v1/screening/travel_rule/vasp/${did}`);
    }

    /**
     * Get VASP library for travel rule compliance
     */
    public async getAllTravelRuleVASPs(filter?: TravelRuleVaspFilter): Promise<TravelRuleVasp[]> {
        let url = `/v1/screening/travel_rule/vasp`;

        if (filter) {
            const { q, fields, page, per_page, order } = filter;
            const queryParameters = {
                q,
                fields: this.getCommaSeparatedList(fields),
                page,
                per_page,
                order,
            };

            url += `?${queryString.stringify(queryParameters)}`;
        }

        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Update VASP for travel rule compliance
     */
    public async updateVasp(vaspInfo: TravelRuleVasp): Promise<TravelRuleVasp> {
        return await this.apiClient.issuePutRequest(`/v1/screening/travel-rule/vasp/update`, vaspInfo);
    }

    /**
     * Get assigned VASP Did for a specific vault. Returns empty string vaspDid value in response if none assigned.
     */
    public async getVaspForVault(vaultAccountId: number): Promise<TravelRuleVaspForVaultRequestResponse> {
        return await this.apiClient.issueGetRequest(`/v1/screening/travel_rule/vault/${vaultAccountId.toString()}/vasp`);
    }

    /**
     * Sets the VASP Did for a specific vault. Pass empty string to remove existing one.
     */
    public async setVaspForVault(vaultAccountId: number, vaspDid: string): Promise<TravelRuleVaspForVaultRequestResponse> {
        return await this.apiClient.issuePostRequest(`/v1/screening/travel_rule/vault/${vaultAccountId.toString()}/vasp`, {
            vaspDid
        });
    }

    /**
     * Get PostScreening Policies for compliance
     * @param screeningType The type of screening (e.g., 'travel_rule', 'aml')
     */
    public async getPostScreeningPolicy(screeningType: ScreeningType): Promise<ScreeningProviderConfigurationResponse> {
        const endpoint = `/v1/screening/${screeningType}/post_screening_policy`;
        return await this.apiClient.issueGetRequest(endpoint);
    }

    /**
     * Get Screening Policies for compliance
     * @param screeningType The type of screening (e.g., 'travel_rule', 'aml')
     */
    public async getScreeningPolicy(screeningType: ScreeningType): Promise<ScreeningPolicyRuleResponse> {
        const endpoint = `/v1/screening/${screeningType}/screening_policy`;
        return await this.apiClient.issueGetRequest(endpoint);
    }

    /**
     * Get Screening Configuration for compliance
     * @param screeningType The type of screening (e.g., 'travel_rule', 'aml')
     */
    public async getScreeningConfiguration(screeningType: ScreeningType): Promise<ScreeningConfigurationsResponse> {
        const endpoint = `/v1/screening/${screeningType}/policy_configuration`;
        return await this.apiClient.issueGetRequest(endpoint);
    }

    /**
     * Update Bypass Screening Configuration for compliance
     * @param screeningType The type of screening (e.g., 'travel_rule', 'aml')
     * @param screeningPolicyConfiguration The configuration to update
     */
    public async updatePolicyConfiguration(screeningType: ScreeningType, screeningPolicyConfiguration: ScreeningPolicyConfiguration): Promise<ScreeningConfigurationsResponse> {
        const endpoint = `/v1/screening/${screeningType}/policy_configuration`;
        return await this.apiClient.issuePutRequest(endpoint, screeningPolicyConfiguration);
    }

    /**
     * Update Bypass Screening Tenant Configuration for AML/KYT compliance
     * @param screeningTenantConfiguration
     */
    public async updateTenantScreeningConfiguration(screeningTenantConfiguration: ScreeningTenantConfiguration): Promise<ScreeningTenantConfiguration> {
        return await this.apiClient.issuePutRequest(`/v1/screening/config`, screeningTenantConfiguration);
    }

    /**
     * Get supported assets for screening per provider
     * @param provider The provider to get supported assets for
     */
    public async getSupportedAssetsForScreening(provider: ScreeningSupportedProviders): Promise<ScreeningSupportedAssetResponse> {
        return await this.apiClient.issueGetRequest(`/v1/screening/supported_assets/${provider}`);
    }

    /**
     * Creates Smart Transfers ticket
     * @param data
     * @param requestOptions
     */
    public async createSmartTransferTicket(data: SmartTransfersTicketCreatePayload, requestOptions?: RequestOptions): Promise<SmartTransfersTicketResponse> {
        return await this.apiClient.issuePostRequest(`/v1/smart-transfers`, data, requestOptions);
    }

    /**
     * Get Smart Transfer tickets
     * @param filters
     */
    public getSmartTransferTickets(filters: SmartTransfersTicketsFilters): Promise<SmartTransfersTicketsResponse> {
        return this.apiClient.issueGetRequest(`/v1/smart-transfers?${queryString.stringify(filters)}`);
    }

    /**
     * Get Smart Transfers ticket by id
     * @param ticketId
     */
    public getSmartTransferTicket(ticketId: string): Promise<SmartTransfersTicketResponse> {
        return this.apiClient.issueGetRequest(`/v1/smart-transfers/${ticketId}`);
    }

    /**
     * Set Smart Transfers ticket expires in
     * @param ticketId
     * @param expiresIn
     */
    public setSmartTransferTicketExpiresIn(ticketId: string, expiresIn: number): Promise<SmartTransfersTicketResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/expires-in`, { expiresIn });
    }

    /**
     * Set Smart Transfer ticket external id
     * @param ticketId
     * @param externalRefId
     */
    public setSmartTransferTicketExternalId(ticketId: string, externalRefId: string): Promise<SmartTransfersTicketResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/external-id`, { externalRefId });
    }

    /**
     * Submit Smart Transfers ticket
     * @param ticketId
     * @param expiresIn
     */
    public submitSmartTransferTicket(ticketId: string, expiresIn: number): Promise<SmartTransfersTicketResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/submit`, { expiresIn });
    }

    /**
     * Fulfill Smart Transfers ticket
     * @param ticketId
     */
    public fulfillSmartTransferTicket(ticketId: string): Promise<SmartTransfersTicketResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/fulfill`, {});
    }

    /**
     * Cancel Smart Transfers ticket
     * @param ticketId
     */
    public cancelSmartTransferTicket(ticketId: string): Promise<SmartTransfersTicketResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/cancel`, {});
    }

    /**
     * Create Smart Transfers ticket term
     * @param ticketId
     * @param data
     */
    public createSmartTransferTicketTerm(ticketId: string, data: SmartTransfersTicketTermPayload): Promise<SmartTransfersTicketTermResponse> {
        return this.apiClient.issuePostRequest(`/v1/smart-transfers/${ticketId}/terms`, data);
    }

    /**
     * Fet Smart Transfers ticket term
     * @param ticketId
     * @param termId
     */
    public getSmartTransferTicketTerms(ticketId: string, termId: string): Promise<SmartTransfersTicketTermResponse> {
        return this.apiClient.issueGetRequest(`/v1/smart-transfers/${ticketId}/terms/${termId}`);
    }

    /**
     * Update Smart Transfers ticket term
     * @param ticketId
     * @param termId
     * @param data
     */
    public updateSmartTransferTicketTerms(ticketId: string, termId: string, data: SmartTransfersTicketTermPayload): Promise<SmartTransfersTicketTermResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/terms/${termId}`, data);
    }

    /**
     * Fund Smart Transfers ticket term
     * @param ticketId
     * @param termId
     * @param data
     */
    public fundSmartTransferTicketTerm(ticketId: string, termId: string, data: SmartTransfersTicketTermFundPayload): Promise<SmartTransfersTicketTermResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/terms/${termId}/fund`, data);
    }

    /**
     * Manually fund Smart Transfers ticket term
     * @param ticketId
     * @param termId
     * @param txHash
     */
    public manuallyFundSmartTransferTicketTerms(ticketId: string, termId: string, txHash: string): Promise<SmartTransfersTicketTermResponse> {
        return this.apiClient.issuePutRequest(`/v1/smart-transfers/${ticketId}/terms/${termId}/manually-fund`, { txHash });
    }

    /**
     * Set Smart Transfers user group ids. User group ids are used for Smart Transfer notifications
     * @param userGroupIds
     */
    public setSmartTransferTicketUserGroups(userGroupIds: string[]): Promise<SmartTransfersUserGroupsResponse> {
        return this.apiClient.issuePostRequest(`/v1/smart-transfers/settings/user-groups`, { userGroupIds });
    }

    /**
     * Get Smart Transfers user group ids. User group ids are used for Smart Transfer notifications
     */
    public getSmartTransferTicketUserGroups(): Promise<SmartTransfersUserGroupsResponse> {
        return this.apiClient.issueGetRequest(`/v1/smart-transfers/settings/user-groups`);
    }

    /**
     * Delete Smart Transfers ticket term
     * @param ticketId
     * @param termId
     */
    public deleteSmartTransferTicketTerms(ticketId: string, termId: string): Promise<void> {
        return this.apiClient.issueDeleteRequest(`/v1/smart-transfers/${ticketId}/terms/${termId}`);
    }

    /**
     * Get active policy (TAP) [BETA]
     */
    public async getActivePolicy(): Promise<TAP.PolicyAndValidationResponse> {
        return await this.apiClient.issueGetRequest(`/v1/tap/active_policy`);
    }

    /**
     * Get draft policy (TAP) [BETA]
     */
    public async getDraft(): Promise<TAP.DraftReviewAndValidationResponse> {
        return await this.apiClient.issueGetRequest(`/v1/tap/draft`);
    }

    /**
     * Update draft policy (TAP) [BETA]
     * @param rules
     */
    public async updateDraft(rules: TAP.PolicyRule[]): Promise<TAP.DraftReviewAndValidationResponse> {
        return await this.apiClient.issuePutRequest(`/v1/tap/draft`, { rules });
    }

    /**
     * Publish draft policy (TAP) [BETA]
     * @param draftId
     */
    public async publishDraft(draftId: string): Promise<TAP.PublishResult> {
        return await this.apiClient.issuePostRequest(`/v1/tap/draft`, { draftId });
    }

    /**
     * Publish rules (TAP) [BETA]
     * @param rules
     */
    public async publishPolicyRules(rules: TAP.PolicyRule[]): Promise<TAP.PublishResult> {
        return await this.apiClient.issuePostRequest(`/v1/tap/publish`, { rules });
    }

    private getCommaSeparatedList(items: Array<string>): string | undefined {
        return items ? items.join(",") : undefined;
    }

    /**
     * Get list of jobs for current tenant
     * @param fromTime beggining of time range in Unix Epoch
     * @param toTime ending of time range in Unix Epoch
     */
    public getJobsForTenant(fromTime: number, toTime: number): Promise<BatchJob[]> {
        return this.apiClient.issueGetRequest(`/v1/batch/jobs?fromTime=${fromTime}&toTime=${toTime}`);
    }

    /**
     * Get job info by job ID
     * @param jobId
     */
    public getJobById(jobId: string): Promise<BatchJob> {
        return this.apiClient.issueGetRequest(`/v1/batch/${jobId}`);
    }

    /**
     * Get tasks belonging to given job
     * @param jobId
     */
    public getTasksByJobId(jobId: string): Promise<BatchTask> {
        return this.apiClient.issueGetRequest(`/v1/batch/${jobId}/tasks`);
    }

    /**
     * Cancel a job by ID
     * @param jobId
     */
    public cancelJob(jobId: string): Promise<void> {
        return this.apiClient.issuePostRequest(`/v1/batch/${jobId}/cancel`, {});
    }

    /**
     * Pause a job by ID
     * @param jobId
     */
    public pauseJob(jobId: string): Promise<void> {
        return this.apiClient.issuePostRequest(`/v1/batch/${jobId}/pause`, {});
    }

    /**
     * Continue a job by ID
     * @param jobId
     */
    public continueJob(jobId: string): Promise<void> {
        return this.apiClient.issuePostRequest(`/v1/batch/${jobId}/continue`, {});
    }

    /**
     * Create multiple vault accounts in one bulk operation
     * @param count number of vault accounts
     * @param assetId optional asset id to create in each new account
     * @param requestOptions
     */
    public createVaultAccountsBulk(count: number, assetId: string, requestOptions?: RequestOptions): Promise<JobCreatedResponse> {
        const body = {
            count,
            assetId
        };
        return this.apiClient.issuePostRequest(`/v1/vault/accounts/bulk`, body, requestOptions);
    }

    /**
     * Creates a new asset within a list of existing vault accounts
     * @param assetId The asset to add
     * @param vaultAccountIdFrom The first of the account ID range
     * @param vaultAccountIdTo The last of the account ID range
     * @param requestOptions
     */
    public createVaultAssetsBulk(assetId: string, vaultAccountIdFrom: string, vaultAccountIdTo: string, requestOptions?: RequestOptions): Promise<JobCreatedResponse> {
        const body = {
            assetId, vaultAccountIdFrom, vaultAccountIdTo
        };
        return this.apiClient.issuePostRequest(`/v1/vault/assets/bulk`, body, requestOptions);
    }

    /**
     * Rescan transactions base on assetId and txHash
     * @param rescanTxs An array of RescanTx
     */
    public rescanTransactionsBeta(rescanTxs: RescanTx[]): Promise<RescanTxResponse[]> {
        return this.apiClient.issuePostRequest(`/v1/transactions/rescan`, rescanTxs);
    }
}
