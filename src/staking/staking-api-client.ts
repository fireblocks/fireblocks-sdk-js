import {
    ChainInfo,
    CheckTermsOfServiceResponseDto,
    DelegationSummaryDto,
    DelegationSummaryDtoByVault,
    ExecuteActionResponse,
    StakingAction,
    StakingChain,
    StakingPosition,
    StakingValidator,
} from "./types";
import { StakingSDK } from "./staking-sdk";
import { ApiClient } from "../api-client";

const STAKING_BASE_PATH = "/v1/staking";

export class StakingApiClient implements StakingSDK {
    constructor(private readonly apiClient: ApiClient) {}

    /**
     * Get all staking chains
     */
    public async getChains(): Promise<string[]> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/chains`);
    }

    /**
     * Get chain info
     */
    public async getChainInfo(chainDescriptor: StakingChain): Promise<ChainInfo> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/chains/${chainDescriptor}/chainInfo`);
    }

    /**
     * Get staking positions summary
     */
    public async getPositionsSummary(): Promise<DelegationSummaryDto | DelegationSummaryDtoByVault> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/positions/summary`);
    }

    /**
     * Execute staking action on a chain
     */
    public async executeAction(
        actionId: StakingAction,
        chainDescriptor: StakingChain,
        body: any,
    ): Promise<ExecuteActionResponse> {
        return await this.apiClient.issuePostRequest(
            `${STAKING_BASE_PATH}/chains/${chainDescriptor}/${actionId}`,
            body,
        );
    }

    /**
     * Get all staking positions, optionally filtered by chain
     */
    public async getPositions(chainDescriptor?: StakingChain): Promise<StakingPosition[]> {
        const url = `${STAKING_BASE_PATH}/positions${chainDescriptor ? `?chainDescriptor=${chainDescriptor}` : ""}`;
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Get a staking position by id
     */
    public async getPosition(positionId?: string): Promise<StakingPosition[]> {
        const url = `${STAKING_BASE_PATH}/positions/${positionId}`;
        return await this.apiClient.issueGetRequest(url);
    }

    /**
     * Get all staking validators, filtered by chain
     */
    public async getValidatorsByChain(chainDescriptor: StakingChain): Promise<StakingValidator[]> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/validators/${chainDescriptor}`);
    }

    /**
     * Approve staking provider terms of service
     */
    public async approveProviderTermsOfService(validatorProviderId: string): Promise<CheckTermsOfServiceResponseDto> {
        return await this.apiClient.issuePostRequest(`${STAKING_BASE_PATH}/providers/approveTermsOfService`, {
            validatorProviderId,
        });
    }
}

