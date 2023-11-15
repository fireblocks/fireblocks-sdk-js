import {
    ChainInfo, CheckTermsOfServiceResponseDto,
    DelegationSummaryDto,
    DelegationSummaryDtoByVault,
    ExecuteActionResponse,
    StakingAction,
    StakingChain, StakingPosition, StakingProvider,
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
    getPositionsSummary(): Promise<DelegationSummaryDto>;

    /**
     * Get staking positions summary by vault
     */
    getPositionsSummaryByVault(): Promise<DelegationSummaryDtoByVault>;

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
     * Get all staking providers
     */
    getProviders(): Promise<StakingProvider[]>;

    /**
     * Approve staking provider terms of service
     */
    approveProviderTermsOfService(providerId: string): Promise<CheckTermsOfServiceResponseDto>;
}
