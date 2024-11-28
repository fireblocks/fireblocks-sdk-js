import {
    ChainInfo,
    CheckTermsOfServiceResponseDto, ClaimRewardsRequestDto, ClaimRewardsResponse,
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
    WithdrawResponse,
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
     * Initiate staking stake on a chain
     */
    stake(chainDescriptor: StakingChain, body: StakeRequestDto): Promise<StakeResponse>;

    /**
     * Execute staking unstake on a chain
     */
    unstake(chainDescriptor: StakingChain, body: UnstakeRequestDto): Promise<UnstakeResponse>;

    /**
     * Execute staking withdraw on a chain
     */
    withdraw(chainDescriptor: StakingChain, body: WithdrawRequestDto): Promise<WithdrawResponse>;

    /**
     * Execute staking claim rewards on a chain
     */
    claimRewards(chainDescriptor: StakingChain, body: ClaimRewardsRequestDto): Promise<ClaimRewardsResponse>;

    /**
     * Execute staking split on a chain
     */
    split(chainDescriptor: StakingChain, body: SplitRequestDto): Promise<SplitResponse>;

    /**
     * Get all staking positions, optionally filtered by chain
     */
    getPositions(chainDescriptor?: StakingChain): Promise<StakingPosition[]>;
    /**
     * Get a staking position by id
     */
    getPosition(positionId?: string): Promise<StakingPosition>;

    /**
     * Get all staking providers
     */
    getProviders(): Promise<StakingProvider[]>;

    /**
     * Approve staking provider terms of service
     */
    approveProviderTermsOfService(providerId: string): Promise<CheckTermsOfServiceResponseDto>;
}
