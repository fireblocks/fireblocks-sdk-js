import {
    ChainInfo, CheckTermsOfServiceResponseDto,
    DelegationSummaryDto,
    DelegationSummaryDtoByVault,
    ExecuteActionResponse,
    StakingAction,
    StakingChain, StakingPosition, StakingValidator
} from "./types";

export interface StakingSDK {
    /**
     * Get all staking chains
     */
    getChains(): Promise<string[]>;

    /**
     * Get chain info
     */
    getChainInfo(chainDescriptor: StakingChain): Promise<ChainInfo>;

    /**
     * Get staking positions summary
     */
    getPositionsSummary(): Promise<DelegationSummaryDto | DelegationSummaryDtoByVault>;

    /**
     * Execute staking action on a chain
     */
    executeAction(actionId: StakingAction, chainDescriptor: StakingChain, body: any): Promise<ExecuteActionResponse>;

    /**
     * Get all staking positions, optionally filtered by chain
     */
    getPositions(chainDescriptor?: StakingChain): Promise<StakingPosition[]>;
    /**
     * Get a staking position by id
     */
    getPosition(positionId?: string): Promise<StakingPosition[]>;

    /**
     * Get all staking validators, filtered by chain
     */
    getValidatorsByChain(chainDescriptor: StakingChain): Promise<StakingValidator[]>;

    /**
     * Approve staking provider terms of service
     */
    approveProviderTermsOfService(validatorProviderId: string): Promise<CheckTermsOfServiceResponseDto>;
}
