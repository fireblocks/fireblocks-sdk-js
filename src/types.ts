export interface VaultAccountResponse {
    id: string;
    name: string;
    assets: AssetResponse[];
}

export interface AssetResponse {
    id: string;
    total: string;
    /**
     * @deprecated - replaced by "total"
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
}

export interface CreateTransactionResponse {
    id: string;
    status: string;
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
}
export interface GenerateAddressResponse {
    address: string;
    tag?: string;
}

export interface TransactionArguments {
    assetId: string;
    source: TransferPeerPath;
    destination?: DestinationTransferPeerPath;
    amount: number | string;
    operation?: TransactionOperation;
    waitForStatus?: boolean;
    fee?: number;
    gasPrice?: number;
    note: string;
    cpuStaking?: number;
    networkStaking?: number;
    autoStaking?: boolean;
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
     * @deprecated - replaced by "networkFee"
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
}

export enum TransactionOrder {
    CREATED_AT = "createdAt",
    LAST_UPDATED = "lastUpdated"
}

export enum TransactionStatus {
    SUBMITTED = "SUBMITTED",
    QUEUED = "QUEUED",
    PENDING_SIGNATURE= "PENDING_SIGNATURE",
    PENDING_AUTHORIZATION = "PENDING_AUTHORIZATION",
    PENDING_3RD_PARTY_MANUAL_APPROVAL = "PENDING_3RD_PARTY_MANUAL_APPROVAL",
    PENDING_3RD_PARTY = "PENDING_3RD_PARTY",
    BROADCASTING = "BROADCASTING",
    CONFIRMING= "CONFIRMING",
    COMPLETED = "COMPLETED",
    PENDING_AML_CHECKUP = "PENDING_AML_CHECKUP",
    PENDING_COMPLETED = "PENDING_COMPLETED",
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
