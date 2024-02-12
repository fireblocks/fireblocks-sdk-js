export enum PositionStatus {
    "error" = "error",

    "activating" = "activating",
    "active" = "active",

    "deactivating" = "deactivating",
    "deactivated" = "deactivated",

    "withdrawing" = "withdrawing",
    "withdrawn" = "withdrawn",
}

interface ISolanaBlockchainData {
    /**
     * The stake account address matching the stakeAccountId
     */
    stakeAccountAddress?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IEthereumBlockchainData {}

export type TBlockchainPositionInfo = ISolanaBlockchainData | IEthereumBlockchainData;

interface RelatedTransactionDto {
    /**
     * The transaction ID
     */
    txId: string;

    /**
     * Is the transaction completed or not
     */
    completed: boolean;
}

export interface StakingPosition {
    /**
     * The unique identifier of the staking position
     */
    id: string;

    /**
     * The unique identifier of the staking provider
     */
    providerId: string;

    /**
     * The source vault account to stake from.
     */
    vaultAccountId: string;

    /**
     * The destination validator address name.
     */
    validatorName: string;
    /**
     * The destination validator provider name.
     */
    providerName: string;

    /**
     * The blockchain descriptor to use.
     */
    chainDescriptor: string;

    /**
     * Amount of tokens to stake.
     */
    amount: string;

    /**
     * The amount staked in the position, measured in the blockchain descriptor unit.
     */
    rewardsAmount: string;

    /**
     * When was the request made (ISO Date).
     */
    dateCreated: string;

    /**
     * The current status.
     */
    status: PositionStatus;

    /**
     * An array of transaction objects related to this position.
     * Each object includes a 'txId' representing the transaction ID
     * and a 'isSuccessful' boolean indicating if the transaction was successful.
     */
    relatedTransactions: RelatedTransactionDto[];

    /**
     * Indicates whether there is an ongoing action for this position (true if ongoing, false if not).
     */
    inProgress: boolean;

    /**
     * The transaction ID of the ongoing request
     */
    inProgressTxId?: string;

    /**
     * Additional fields per blockchain - can be empty or missing if not initialized or no additional info exists.
     * The type depends on the chainDescriptor value.
     * For Solana (SOL), stake account address.
     * For Ethereum (ETH), an empty object is returned as no specific data is available.
     */
    blockchainPositionInfo: TBlockchainPositionInfo;

    /**
     * The destination address of the staking transaction.
     */
    validatorAddress: string;

    /**
     * An array of available actions that can be performed. for example, actions like "unstake" or "withdraw".
     */
    availableActions: string[];
}

export interface ValidatorDto {
    /**
     * The protocol identifier (e.g. "ETH"/"SOL") of the validator
     */
    chainDescriptor: string;
    /**
     * The service fee as a percentage out of the earned rewards
     */
    feePercent: number;
}
export interface StakingProvider {
    /**
     * The ID of the provider
     */
    id: string;
    /**
     * Name of the provider
     */
    providerName: string;
    /**
     * An array of objects that includes chain descriptors and the corresponding fee percentages for validators supported by the provider
     */
    validators: ValidatorDto[];
    /**
     * URL to the validator's icon
     */
    iconUrl: string;
    /**
     * URL to the terms of service
     */
    termsOfServiceUrl: string;
    /**
     * Indicates whether the terms of service are approved"
     */
    isTermsOfServiceApproved: boolean;
}

/**
 * Staking actions
 */
export enum StakingAction {
    stake = "stake",
    unstake = "unstake",
    withdraw = "withdraw",
}

/**
 * Staking chain descriptors
 */
export enum StakingChain {
    SOLANA = "SOL",
    SOLANA_TESTNET = "SOL_TEST",
    ETHEREUM = "ETH",
    GOERLI = "ETH_TEST3",
    MATIC = "MATIC",
}

/**
 * Check terms of service response
 */
export interface CheckTermsOfServiceResponseDto {}

export interface ChainInfo {
    chainId: string;
    currentEpoch: number;
    nextEpoch: number;
    epochElapsed: number;
    epochDuration: number;
    additionalInfo: { [key: string]: any };
}

export interface AmountAndChainDescriptor {
    chainDescriptor: string;
    amount: string;
}

export interface DelegationSummaryDto {
    /**
     * An array of objects containing chain descriptors and associated amounts, representing active positions.
     */
    active: AmountAndChainDescriptor[];

    /**
     * An array of objects containing chain descriptors and associated amounts, representing inactive positions.
     */
    inactive: AmountAndChainDescriptor[];

    /**
     * An array of objects containing chain descriptors and associated amounts, representing rewards positions.
     */
    rewardsAmount: AmountAndChainDescriptor[];

    /**
     * An array of objects with chain descriptors and total staked amounts,
     * representing the combined staked totals of active and inactive positions.
     */
    totalStaked: AmountAndChainDescriptor[];
}

export class DelegationSummaryDtoByVault {
    [vaultAccountId: string]: DelegationSummaryDto;
}

export type StakeResponse = {
    delegationRequestId: string;
};

export type UnstakeResponse = {};

export type WithdrawResponse = {};

export type ClaimRewardsResponse = {};

export interface StakeRequestDto {
    /**
     * The source vault account to stake from
     */
    vaultAccountId: string;

    /**
     * The ID of the provider
     */
    providerId: string;

    /**
     * Amount of tokens to stake
     */
    stakeAmount: string;

    /**
     * The note to associate with the stake transactions
     */
    txNote?: string;

    /**
     * Represents the fee for a transaction, which can be specified as a percentage value. Only one of fee/feeLevel is required
     */
    fee?: string;

    /**
     * Represents the fee level for a transaction, which can be set as slow, medium, or fast. Only one of fee/feeLevel is required
     */
    feeLevel?: string;
}

export interface UnstakeRequestDto {
    /**
     * id of position to unstake
     */
    id: string;

    /**
     * Represents the fee for a transaction, which can be specified as a percentage value. Only one of fee/feeLevel is required
     */
    fee?: string;

    /**
     * Represents the fee level for a transaction, which can be set as slow, medium, or fast. Only one of fee/feeLevel is required
     */
    feeLevel?: string;

    /**
     * The note to associate with the transactions
     */
    txNote?: string;
}

export interface WithdrawRequestDto {
    /**
     * id of position to withdraw
     */
    id: string;

    /**
     * Represents the fee for a transaction, which can be specified as a percentage value. Only one of fee/feeLevel is required
     */
    fee?: string;

    /**
     * Represents the fee level for a transaction, which can be set as slow, medium, or fast. Only one of fee/feeLevel is required
     */
    feeLevel?: string;

    /**
     * The note to associate with the transactions
     */
    txNote?: string;
}

export interface ClaimRewardsRequestDto {
    /**
     * id of position to withdraw rewards from
     */
    id: string;

    /**
     * Represents the fee for a transaction, which can be specified as a percentage value. Only one of fee/feeLevel is required
     */
    fee?: string;

    /**
     * Represents the fee level for a transaction, which can be set as slow, medium, or fast. Only one of fee/feeLevel is required
     */
    feeLevel?: string;

    /**
     * The note to associate with the transactions
     */
    txNote?: string;
}