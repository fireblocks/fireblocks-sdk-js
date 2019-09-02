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

export interface CreateTransactionResponse {
    id: string;
    status: string;
}

export interface TransferPeerPath {
    type: PeerType;
    id: string;
}

export interface TransactionArguments {
    assetId: string;
    source: TransferPeerPath;
    destination?: TransferPeerPath;
    amount: number;
    operation?: TransactionOperation;
    waitForStatus?: boolean;
    fee?: number;
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
