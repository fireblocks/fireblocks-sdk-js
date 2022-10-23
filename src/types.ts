export interface VaultAccountResponse {
    id: string;
    name: string;
    hiddenOnUI: boolean;
    assets: AssetResponse[];
    customerRefId?: string;
    autoFuel: boolean;
}

export enum VirtualAffiliation {
    OFF_EXCHANGE = "OFF_EXCHANGE",
    DEFAULT = "DEFAULT"
}

export interface BalanceRewardInfo {
    pendingRewards: string;
}

export interface AssetResponse {
    id: string;
    total: string;
    /**
     * @deprecated Replaced by "total"
     */
    balance?: string;
    lockedAmount?: string;
    available: string;
    pending: string;
    selfStakedCPU?: string;
    selfStakedNetwork?: string;
    pendingRefundCPU?: string;
    pendingRefundNetwork?: string;
    totalStakedCPU?: string;
    totalStakedNetwork?: string;
    rewardInfo?: BalanceRewardInfo;
    blockHeight?: string;
    blockHash?: string;
    allocatedBalances?: {
        allocationId: string;
        thirdPartyAccountId?: string;
        affiliation?: VirtualAffiliation;
        virtualType?: VirtualType;
        total: string;
        available: string;
        pending?: string;
        frozen?: string;
        locked?: string;
    }[];
}

export interface UnfreezeTransactionResponse {
    success: boolean;
}

export interface VaultAssetResponse {
    id: string;
    address: string;
    legacyAddress: string;
    enterpriseAddress?: string;
    tag: string;
    eosAccountName: string;
    status?: VaultAssetActivationStatus;
    activationTxId?: string;
}

export enum VaultAssetActivationStatus {
    PENDING_ACTIVATION = "PENDING_ACTIVATION",
    ACTIVATION_FAILED = "ACTIVATION_FAILED",
    READY = "READY"
}

export interface WalletContainerResponse<WalletAssetType> {
    id: string;
    name: string;
    assets: WalletAssetType[];
    customerRefId?: string;
}

export interface ExternalWalletAsset {
    id: string;
    status: string;
    address: string;
    tag: string;
    activationTime?: string;
}

export interface InternalWalletAsset extends ExternalWalletAsset {
    balance: string;
}

export interface CreateTransactionResponse {
    id: string;
    status: string;
}

export interface EstimateFeeResponse {
    low: EstimatedFee;
    medium: EstimatedFee;
    high: EstimatedFee;
}

export interface EstimateTransactionFeeResponse {
    low: EstimatedTransactionFee;
    medium: EstimatedTransactionFee;
    high: EstimatedTransactionFee;
}

export interface EstimatedFee {
    networkFee?: string;
    gasPrice?: string;
    feePerByte?: string;
    baseFee?: string;
    priorityFee?: string;
}

export interface EstimatedTransactionFee {
    networkFee?: string;
    gasPrice?: string;
    gasLimit?: string;
    feePerByte?: string;
    baseFee?: string;
    priorityFee?: string;
}

export interface TransferPeerPath {
    type?: PeerType;
    id?: string;
    virtualId?: string;
    virtualType?: VirtualType;
    address?: string;
}

export interface DestinationTransferPeerPath {
    type: PeerType;
    id?: string;
    virtualId?: string;
    virtualType?: VirtualType;
    oneTimeAddress?: IOneTimeAddress;
}

export interface IOneTimeAddress {
    address: string;
    tag?: string;
}

export interface DepositAddressResponse {
    assetId: string;
    address: string;
    tag?: string;
    description?: string;
    type: string;
    customerRefId?: string;
    addressFormat: string;
    legacyAddress?: string;
    enterpriseAddress?: string;
}

export interface GenerateAddressResponse {
    address: string;
    tag?: string;
    legacyAddress?: string;
    enterpriseAddress?: string;
}

export enum SigningAlgorithm {
    MPC_ECDSA_SECP256K1 = "MPC_ECDSA_SECP256K1",
    MPC_ECDSA_SECP256R1 = "MPC_ECDSA_SECP256R1",
    MPC_EDDSA_ED25519 = "MPC_EDDSA_ED25519"
}

export interface RawMessageData {
    messages: RawMessage[];
    algorithm?: SigningAlgorithm;
}

export interface RawMessage {
    content: string;
    bip44addressIndex?: number;
    bip44change?: number;
    derivationPath?: number[];
}

export interface TransactionDestination {
    amount: string | number;
    destination: DestinationTransferPeerPath;
}

export interface TransactionArgumentsFeePayerInfo {
    feePayerAccountId: string;
}

export interface TransactionArguments {
    assetId?: string;
    source?: TransferPeerPath;
    destination?: DestinationTransferPeerPath;
    amount?: number | string;
    operation?: TransactionOperation;
    fee?: number | string;
    feeLevel?: FeeLevel;
    failOnLowFee?: boolean;
    maxFee?: string;
    priorityFee?: number | string;
    gasPrice?: number | string;
    gasLimit?: number | string;
    note?: string;
    cpuStaking?: number;
    networkStaking?: number;
    autoStaking?: boolean;
    customerRefId?: string;
    extraParameters?: object;
    destinations?: TransactionDestination[];
    replaceTxByHash?: string;
    externalTxId?: string;
    treatAsGrossAmount?: boolean;
    forceSweep?: boolean;
    feePayerInfo?: TransactionArgumentsFeePayerInfo;
}

export enum FeeLevel {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface ExchangeResponse {
    id: string;
    type: string;
    name: string;
    assets: AssetResponse[];
    isSubaccount: boolean;
    status: string;
}

export interface ConvertExchangeAssetResponse {
    status: boolean;
}

export interface FiatAccountResponse {
    id: string;
    type: string;
    name: string;
    address?: string;
    assets: AssetResponse[];
}

export interface TransactionPageResponse {
    transactions: TransactionResponse[];
    pageDetails: PageDetails;
}

export interface PageDetails {
    prevPage: string;
    nextPage: string;
}

export interface RewardInfo {
    srcRewards?: string;
    destRewards?: string;
}

export interface FeePayerInfo {
    feePayerAccountId?: string;
}

export interface TransactionResponse {
    id: string;
    assetId: string;
    source: TransferPeerPathResponse;
    destination: TransferPeerPathResponse;
    amount: number;
    /**
     * @deprecated Replaced by "networkFee"
     */
    fee?: number;
    networkFee: number;
    amountUSD: number;
    netAmount: number;
    createdAt: number;
    lastUpdated: number;
    status: TransactionStatus;
    txHash: string;
    numOfConfirmations?: number;
    subStatus?: string;
    signedBy: string[];
    createdBy: string;
    rejectedBy: string;
    destinationAddress: string;
    sourceAddress?: string;
    destinationAddressDescription?: string;
    destinationTag: string;
    addressType: string;
    note: string;
    exchangeTxId: string;
    requestedAmount: number;
    serviceFee?: number;
    feeCurrency: string;
    amlScreeningResult?: AmlScreeningResult;
    customerRefId?: string;
    amountInfo?: AmountInfo;
    feeInfo?: FeeInfo;
    signedMessages?: SignedMessageResponse[];
    extraParameters?: any;
    externalTxId?: string;
    destinations?: TransactionResponseDestination[];
    blockInfo?: BlockInfo;
    authorizationInfo?: AuthorizationInfo;
    index?: number;
    rewardInfo?: RewardInfo;
    feePayerInfo?: FeePayerInfo;
}

export interface AmountInfo {
    amount?: string;
    requestedAmount?: string;
    netAmount?: string;
    amountUSD?: string;
}

export interface FeeInfo {
    networkFee?: string;
    serviceFee?: string;
    gasPrice?: string;
}

export interface TransactionResponseDestination {
    amount?: string;
    amountUSD?: string;
    amlScreeningResult?: AmlScreeningResult;
    destination?: TransferPeerPathResponse;
    authorizationInfo?: AuthorizationInfo;
}

export interface AmlScreeningResult {
    provider?: string;
    payload: any;
    screeningStatus: string;
    bypassReason: string;
    timestamp: number;
}

export interface TransferPeerPathResponse {
    id: string;
    type: PeerType;
    name?: string;
    subType?: string;
    virtualType?: VirtualType;
    virtualId?: string;
}

export interface AuthorizationInfo {
    allowOperatorAsAuthorizer: boolean;
    logic: "OR" | "AND";
    groups: {
        users: UserGroup;
        th: number
    }[];
}

export interface UserGroup {
    [id: string]: string;
}

export interface BlockInfo {
    blockHeight?: string;
    blockHash?: string;
}

export interface SignedMessageResponse {
    content: string;
    algorithm: string;
    derivationPath: string;
    signature: {
        fullSig: string;
        r?: string;
        s?: string;
        v?: number;
    };
    publicKey: string;
}

export interface CancelTransactionResponse {
    success: boolean;
}

export interface OperationSuccessResponse {
    success: boolean;
}

export interface NetworkConnectionResponse {
    id: string;
    status: string;
    remoteNetworkId: NetworkId;
    localNetworkId: NetworkId;
    routingPolicy?: NetworkConnectionRoutingPolicy;
}

export interface NetworkIdResponse {
    id: string;
    name: string;
    isDiscoverable: boolean;
    routingPolicy?: NetworkIdRoutingPolicy;
}

interface NetworkId {
    id: string;
    name: string;
}

export interface CustomCryptoRoutingDest {
    scheme: NetworkScheme.CUSTOM;
    dstType: NetworkDestType.EXCHANGE_ACCOUNT | NetworkDestType.VAULT_ACCOUNT;
    dstId: string;
}

export interface CustomFiatRoutingDest {
    scheme: NetworkScheme.CUSTOM;
    dstType: NetworkDestType.FIAT_ACCOUNT;
    dstId: string;
}

export interface DefaultNetworkRoutingDest {
    scheme: NetworkScheme.DEFAULT;
}

export interface AutoNetworkRoutingDest {
    scheme: NetworkScheme.AUTO;
}

export interface NoneNetworkRoutingDest {
    scheme: NetworkScheme.NONE;
}

export type NetworkConnectionCryptoRoutingDest = CustomCryptoRoutingDest | DefaultNetworkRoutingDest | NoneNetworkRoutingDest;
export type NetworkConnectionFiatRoutingDest = CustomFiatRoutingDest | DefaultNetworkRoutingDest | NoneNetworkRoutingDest;
export type NetworkIdCryptoRoutingDest = CustomCryptoRoutingDest | AutoNetworkRoutingDest | NoneNetworkRoutingDest;
export type NetworkIdFiatRoutingDest = CustomFiatRoutingDest | AutoNetworkRoutingDest | NoneNetworkRoutingDest;

export interface NetworkConnectionRoutingPolicy {
    crypto?: NetworkConnectionCryptoRoutingDest;
    sen?: NetworkConnectionFiatRoutingDest
    signet?: NetworkConnectionFiatRoutingDest;
    sen_test?: NetworkConnectionFiatRoutingDest;
    signet_test?: NetworkConnectionFiatRoutingDest;
}

export interface NetworkIdRoutingPolicy {
    crypto?: NetworkIdCryptoRoutingDest;
    sen?: NetworkIdFiatRoutingDest;
    signet?: NetworkIdFiatRoutingDest;
    sen_test?: NetworkIdFiatRoutingDest;
    signet_test?: NetworkIdFiatRoutingDest;
}

export enum NetworkScheme {
    DEFAULT = "DEFAULT",
    CUSTOM = "CUSTOM",
    AUTO = "AUTO",
    NONE = "NONE",
}

export enum NetworkDestType {
    VAULT_ACCOUNT = "VAULT",
    EXCHANGE_ACCOUNT = "EXCHANGE",
    FIAT_ACCOUNT = "FIAT_ACCOUNT",
}

export interface TransactionFilter {
    before?: number;
    after?: number;
    status?: TransactionStatus;
    orderBy?: TransactionOrder;
    limit?: number;
    txHash?: string;
    assets?: string;
    sourceType?: PeerType;
    destType?: PeerType;
    sourceId?: string;
    destId?: string;
}

export interface TransactionPageFilter {
    before?: number;
    after?: number;
    status?: TransactionStatus;
    limit?: number;
    txHash?: string;
    assets?: string;
    sourceType?: PeerType;
    destType?: PeerType;
    sourceId?: string;
    destId?: string;
}

export enum TransactionOrder {
    CREATED_AT = "createdAt",
    LAST_UPDATED = "lastUpdated"
}

export enum TransactionStatus {
    SUBMITTED = "SUBMITTED",
    QUEUED = "QUEUED",
    PENDING_SIGNATURE = "PENDING_SIGNATURE",
    PENDING_AUTHORIZATION = "PENDING_AUTHORIZATION",
    PENDING_3RD_PARTY_MANUAL_APPROVAL = "PENDING_3RD_PARTY_MANUAL_APPROVAL",
    PENDING_3RD_PARTY = "PENDING_3RD_PARTY",
    /**
     * @deprecated
     */
    PENDING = "PENDING",
    BROADCASTING = "BROADCASTING",
    CONFIRMING = "CONFIRMING",
    /**
     * @deprecated Replaced by "COMPLETED"
     */
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    PENDING_AML_SCREENING = "PENDING_AML_SCREENING",
    PARTIALLY_COMPLETED = "PARTIALLY_COMPLETED",
    CANCELLING = "CANCELLING",
    CANCELLED = "CANCELLED",
    REJECTED = "REJECTED",
    FAILED = "FAILED",
    TIMEOUT = "TIMEOUT",
    BLOCKED = "BLOCKED"
}

export enum PeerType {
    VAULT_ACCOUNT = "VAULT_ACCOUNT",
    EXCHANGE_ACCOUNT = "EXCHANGE_ACCOUNT",
    INTERNAL_WALLET = "INTERNAL_WALLET",
    EXTERNAL_WALLET = "EXTERNAL_WALLET",
    UNKNOWN = "UNKNOWN",
    NETWORK_CONNECTION = "NETWORK_CONNECTION",
    FIAT_ACCOUNT = "FIAT_ACCOUNT",
    COMPOUND = "COMPOUND",
    ONE_TIME_ADDRESS = "ONE_TIME_ADDRESS",
    OEC_PARTNER = "OEC_PARTNER"
}

export enum VirtualType {
    OFF_EXCHANGE = "OFF_EXCHANGE",
    DEFAULT = "DEFAULT",
    OEC_FEE_BANK = "OEC_FEE_BANK"
}

export enum TransactionOperation {
    TRANSFER = "TRANSFER",
    MINT = "MINT",
    BURN = "BURN",
    SUPPLY_TO_COMPOUND = "SUPPLY_TO_COMPOUND",
    REDEEM_FROM_COMPOUND = "REDEEM_FROM_COMPOUND",
    RAW = "RAW",
    CONTRACT_CALL = "CONTRACT_CALL",
    TYPED_MESSAGE = "TYPED_MESSAGE",
}

export interface AllocateFundsRequest {
    allocationId: string;
    amount: string;
    treatAsGrossAmount?: boolean;
}

export interface DeallocateFundsRequest {
    allocationId: string;
    amount: string;
}

export interface CreateTransferTicketArgs {
    externalTicketId: string;
    description?: string;
    terms: {
        networkConnectionId: string;
        outgoing: boolean;
        asset: string;
        amount: string;
        note: string;
    }[];
}

export enum TransferTicketStatus {
    OPEN = "OPEN",
    PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
    FULFILLED = "FULFILLED",
    FAILED = "FAILED",
    CANCELED = "CANCELED"
}

export enum TransferTicketTermStatus {
    OPEN = "OPEN",
    FULFILLED = "FULFILLED"
}

export interface TransferTicketResponse {
    ticketId: string;
    externalTicketId: string;
    description: string;
    status: TransferTicketStatus;
    terms: TermResponse[];
}

export interface TermResponse {
    termId: string;
    networkConnectionId: string;
    outgoing: boolean;
    asset: string;
    amount: string;
    txIds: string[];
    status: TransferTicketTermStatus;
    note: string;
}

export interface ExecuteTermArgs {
    source: {
        type: string;
        id: string;
    };
    fee?: number;
    gasPrice?: number;
}

export interface CreateTransferTicketResponse {
    ticketId: string;
}

export interface PublicKeyInfoArgs {
    algorithm?: string;
    derivationPath?: string;
    compressed?: boolean;
}

export interface PublicKeyInfoForVaultAccountArgs {
    assetId: string;
    vaultAccountId: number;
    change: number;
    addressIndex: number;
    compressed?: boolean;
}

export interface GasStationInfo {
    balance: { [asset: string]: string };
    configuration: {
        gasThreshold: string;
        gasCap: string;
        maxGasPrice: string;
    };
}

export interface PublicKeyResonse {
    status: number;
    algorithm: string;
    derivationPath: number[];
    publicKey: string;
}

export interface MaxSpendableAmountResponse {
    maxSpendableAmount: string;
}

export interface VaultAccountsFilter {
    namePrefix?: string;
    nameSuffix?: string;
    minAmountThreshold?: number;
    assetId?: string;
}

export interface PagedVaultAccountsRequestFilters {
    namePrefix?: string;
    nameSuffix?: string;
    minAmountThreshold?: number;
    assetId?: string;
    orderBy?: "ASC" | "DESC";
    limit?: number; // for default and max limit values please see: https://docs.fireblocks.com/api/swagger-ui/#/
    before?: string;
    after?: string;
}

export interface PagedVaultAccountsResponse {
    accounts: VaultAccountResponse[];
    paging: {
        before: string;
        after: string;
    };
    previousUrl: string;
    nextUrl: string;
}

export interface VaultBalancesFilter {
    accountNamePrefix?: string;
    accountNameSuffix?: string;
}
export interface RequestOptions {
    idempotencyKey: string;
}

export interface ValidateAddressResponse {
    isValid: boolean;
    isActive: boolean;
    requiresTag: boolean;
}

export interface AssetTypeResponse {
    id: string;
    name: string;
    type: string;
    contractAddress: string;
    nativeAsset: string;
    decimals?: number;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    role: string;
}

export interface ResendWebhooksResponse {
    webhooksCount: number;
}

export interface OffExchangeEntityResponse {
    id: string;
    vaultAccountId: string;
    thirdPartyAccountId: string;
    balance?: {
        [assetId: string]: {
            total?: string;
            locked?: string;
            pending?: string;
            frozen?: string;
        };
    };
}

export interface SetFeePayerConfiguration {
    feePayerAccountId: string;
}

export interface FeePayerConfiguration {
    feePayerAccountId: string;
}
