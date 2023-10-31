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
    public async getChains(): Promise<string[]> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/chains`);
    }
    public async getChainInfo(chainDescriptor: StakingChain): Promise<ChainInfo> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/chains/${chainDescriptor}/chainInfo`);
    }
    public async getPositionsSummary(byVault?: boolean): Promise<DelegationSummaryDto | DelegationSummaryDtoByVault> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/positions/summary${byVault ? "?byVault=true" : "?byVault=false"}`);
    }
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
    public async getPositions(chainDescriptor?: StakingChain): Promise<StakingPosition[]> {
        const url = `${STAKING_BASE_PATH}/positions${chainDescriptor ? `?chainDescriptor=${chainDescriptor}` : ""}`;
        return await this.apiClient.issueGetRequest(url);
    }
    public async getPosition(positionId: string): Promise<StakingPosition[]> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/positions/${positionId}`);
    }
    public async getValidatorsByChain(chainDescriptor: StakingChain): Promise<StakingValidator[]> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/validators/${chainDescriptor}`);
    }
    public async approveProviderTermsOfService(validatorProviderId: string): Promise<CheckTermsOfServiceResponseDto> {
        return await this.apiClient.issuePostRequest(`${STAKING_BASE_PATH}/providers/approveTermsOfService`, {
            validatorProviderId,
        });
    }
}

