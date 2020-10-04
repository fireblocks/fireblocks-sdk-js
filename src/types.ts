export interface VaultAccountResponse {
    id: string;
    name: string;
    hiddenOnUI: boolean;
    assets: AssetResponse[];
    customerRefId?: string;
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
}

export interface CreateVaultAssetResponse {
    id: string;
    eosAccountName?: string;
}

export interface WalletAssetResponse extends AssetResponse {
    status: string;
    address: string;
    tag: string;
}

export interface WalletContainerResponse {
    id: string;
    name: string;
    assets: WalletAssetResponse[];
    customerRefId?: string;
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
}

export interface EstimatedTransactionFee {
    networkFee?: string;
    gasPrice?: string;
    gasLimit?: string;
    feePerByte?: string;
}

export interface TransferPeerPath {
    type: PeerType;
    id: string;
}

interface DestinationTransferPeerPath {
    type: PeerType;
    id: string;
    oneTimeAddress?: IOneTimeAddress;
}

interface IOneTimeAddress {
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
}

export interface GenerateAddressResponse {
    address: string;
    tag?: string;
    legacyAddress?: string;
}

export interface TransactionArguments {
    assetId: string;
    source: TransferPeerPath;
    destination?: DestinationTransferPeerPath;
    amount: number | string;
    operation?: TransactionOperation;
    fee?: number;
    gasPrice?: number;
    note: string;
    cpuStaking?: number;
    networkStaking?: number;
    autoStaking?: boolean;
    customerRefId?: string;
}

export interface ExchangeResponse {
    id: string;
    type: string;
    name: string;
    assets: AssetResponse[];
    isSubaccount: boolean;
    status: string;
}

export interface FiatAccountResponse {
    id: string;
    type: string;
    name: string;
    address?: string;
    assets: AssetResponse[];
}

export interface TransactionResponse {
    id: string;
    assetId: string;
    source: {
        id: string;
        type: PeerType;
        name?: string;
        subType?: string;
    };
    destination: {
        id: string;
        type: PeerType;
        name?: string;
        subType?: string;
    };
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
    destinationAddressDescription?: string;
    destinationTag: string;
    addressType: string;
    note: string;
    exchangeTxId: string;
    requestedAmount: number;
    serviceFee?: number;
    feeCurrency: string;
    amlScreeningResult?: {
        provider: string;
        payload: any;
    };
}

export interface CancelTransactionResponse {
    success: boolean;
}

export interface OperationSuccessResponse {
    success: boolean;
}

export interface NetworkConnectionResponse {
    id: string;
    localChannel: {
        networkId: string;
        name: string
    };
    remoteChannel: {
        networkId: string;
        name: string
    };
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
    COMPOUND = "COMPOUND"
}

export enum TransactionOperation {
    TRANSFER = "TRANSFER",
    MINT = "MINT",
    BURN = "BURN",
    SUPPLY_TO_COMPOUND = "SUPPLY_TO_COMPOUND",
    REDEEM_FROM_COMPOUND = "REDEEM_FROM_COMPOUND"
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
