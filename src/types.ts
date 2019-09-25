export interface VaultAccountResponse {
    id: string;
    name: string;
    assets: AssetResponse[];
}

export interface AssetResponse {
    id: string;
    balance?: string;
    lockedAmount?: string;
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
    tag: string;
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
    fee?: number | string;
    gasPrice?: number | string;
    note: string;
}

export interface ExchangeResponse {
    id: string;
    type: string;
    name: string;
    assets: AssetResponse[];
    isSubaccount: boolean;
    status: string;
}

export interface TransactionResponse {
    id: string;
    assetId: string;
    source: {
        id: string;
        type: PeerType;
        name?: string;
    };
    destination: {
        id: string;
        type: PeerType;
        name?: string;
    };
    amount: number;
    fee: number;
    amountUSD: number;
    netAmount: number;
    createdAt: number;
    lastUpdated: number;
    status: TransactionStatus;
    txHash: string;
    numOfConfirmations?: number;
    failureReason?: string;
    signedBy: string[];
    createdBy: string;
    rejectedBy: string;
    destinationAddress: string;
    destinationTag: string;
    addressType: string;
}

export interface CancelTransactionResponse {
    success: boolean;
}

export interface OperationSuccessResponse {
    success: boolean;
}

export interface TransactionFilter {
    before?: number;
    after?: number;
    status?: TransactionStatus;
}

export enum TransactionStatus {
    SUBMITTED = "SUBMITTED",
    PENDING_SIGNATURE= "PENDING_SIGNATURE",
    PENDING_AUTHORIZATION = "PENDING_AUTHORIZATION",
    PENDING = "PENDING",
    BROADCASTING = "BROADCASTING",
    CONFIRMING= "CONFIRMING",
    CONFIRMED = "CONFIRMED",
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
    UNKNOWN = "UNKNOWN"
}

export enum TransactionOperation {
    TRANSFER = "TRANSFER",
    MINT = "MINT",
    BURN = "BURN"
}
