import { ApiClient } from "./api-client";
import {
    AssetResponse,
    Web3PagedResponse,
    NCW,
    UnspentInputsResponse,
} from "./types";
import { NcwSdk } from "./ncw-sdk";

export class NcwApiClient implements NcwSdk {
    private readonly NCW_BASE_PATH = "/v1/ncw/wallets";

    constructor(private readonly apiClient: ApiClient) { }

    public async getSupportedAssets({ pageCursor, pageSize, onlyBaseAssets }: NCW.GetSupportedAssetsPayload): Promise<Web3PagedResponse<NCW.WalletAssetResponse>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(onlyBaseAssets !== undefined && { onlyBaseAssets: String(onlyBaseAssets) }),
        });

        return await this.apiClient.issueGetRequest(`${this.NCW_BASE_PATH}/supported_assets?${params.toString()}`);
    }

    public async createWallet(): Promise<{ walletId: string; enabled: boolean; }> {
        return await this.apiClient.issuePostRequest(
            `${this.NCW_BASE_PATH}`,
            {});
    }

    public async getWallet(walletId: string): Promise<{ walletId: string; enabled: boolean; }> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}`);
    }

    public async getLatestBackup(walletId: string): Promise<NCW.LatestBackupResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/backup/latest`);
    }

    public async enableWallet(walletId: string, enabled: boolean): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `${this.NCW_BASE_PATH}/${walletId}/enable`,
            { enabled });
    }

    public async getWalletDevices(walletId: string): Promise<NCW.Device[]> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/devices/`);
    }

    public async enableWalletDevice(walletId: string, deviceId: string, enabled: boolean): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `${this.NCW_BASE_PATH}/${walletId}/devices/${deviceId}/enable`,
            { enabled });
    }

    public async invokeWalletRpc(walletId: string, deviceId: string, payload: string): Promise<{ result: string; } | { error: { message: string; code?: number; }; }> {
        return await this.apiClient.issuePostRequest(
            `${this.NCW_BASE_PATH}/${walletId}/devices/${deviceId}/invoke`,
            { payload });
    }

    public async createWalletAccount(walletId: string): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issuePostRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts`,
            {});
    }

    public async getWallets({ pageCursor, pageSize, sort, order }: NCW.GetWalletsPayload = {}): Promise<Web3PagedResponse<NCW.WalletInfo>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(`${this.NCW_BASE_PATH}?${params.toString()}`);
    }

    public async getWalletAccounts(walletId: string, { pageCursor, pageSize, sort, order }: NCW.GetWalletsPayload = {}): Promise<Web3PagedResponse<{
        walletId: string;
        accountId: number;
    }>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts?${params.toString()}`);
    }

    public async getWalletAccount(walletId: string, accountId: number): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts/${accountId}`);
    }

    public async getWalletAssets(walletId: string, accountId: number, { pageCursor, pageSize, sort, order }: NCW.GetWalletAssetsPayload = {}): Promise<Web3PagedResponse<NCW.WalletAssetResponse>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts/${accountId}/assets?${params.toString()}`);
    }

    public async getWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}`);
    }

    public async activateWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetAddress> {
        return await this.apiClient.issuePostRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}`, {});
    }

    public async getWalletAssetAddresses(walletId: string, accountId: number, assetId: string, { pageCursor, pageSize, sort, order }: NCW.GetWalletAddressesPayload = {}): Promise<Web3PagedResponse<NCW.WalletAssetAddress>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/addresses?${params.toString()}`);
    }

    public async getWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/balance`);
    }

    public async refreshWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issuePutRequest(
            `${this.NCW_BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/balance`,
            {});
    }

    public async getWalletSetupStatus(walletId: string): Promise<NCW.WalletSetupStatusResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/setup_status`);
    }

    public async getDeviceSetupStatus(walletId: string, deviceId: string): Promise<NCW.DeviceKeySetupResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.NCW_BASE_PATH}/${walletId}/devices/${deviceId}/setup_status`);
    }

    public async getUnspentInputs(walletId: string, accountId: number, assetId: string): Promise<UnspentInputsResponse[]> {
        return await this.apiClient.issueGetRequest(`/v1/ncw/${walletId}/accounts/${accountId}/${assetId}/unspent_inputs`);
    }
}
