import { ApiClient } from "../api-client";
import { AssetResponse, NCW, Web3PagedResponse } from "../types";
import { NcwSdk } from "./ncw-sdk";

export class NcwAdminApiClient implements Omit<NcwSdk, "invokeWalletRpc"> {

    constructor(private readonly apiClient: ApiClient, private readonly BASE_PATH: string) { }

    public async createWallet(): Promise<{ walletId: string; enabled: boolean; }> {
        return await this.apiClient.issuePostRequest(
            `${this.BASE_PATH}`,
            {},
        );
    }

    public async getWallet(walletId: string): Promise<{ walletId: string; enabled: boolean; }> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}`,
        );
    }

    public async enableWallet(walletId: string, enabled: boolean): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `${this.BASE_PATH}/${walletId}/enable`,
            { enabled },
        );
    }

    public async getWalletDevices(walletId: string): Promise<NCW.Device> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/devices/`,
        );
    }

    public async enableWalletDevice(walletId: string, deviceId: string, enabled: boolean): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `${this.BASE_PATH}/${walletId}/devices/${deviceId}/enable`,
            { enabled },
        );
    }

    public async createWalletAccount(walletId: string): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issuePostRequest(
            `${this.BASE_PATH}/${walletId}/accounts`,
            {},
        );
    }

    public async getWallets({ pageCursor, pageSize, sort, order }: NCW.GetWalletsPayload = {}): Promise<Web3PagedResponse<NCW.WalletInfo>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(`${this.BASE_PATH}?${params.toString()}`);
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
            `${this.BASE_PATH}/${walletId}/accounts?${params.toString()}`,
        );
    }

    public async getWalletAccount(walletId: string, accountId: number): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}`,
        );
    }

    public async getWalletAssets(walletId: string, accountId: number, { pageCursor, pageSize, sort, order }: NCW.GetWalletAssetsPayload = {}): Promise<Web3PagedResponse<NCW.WalletAssetResponse>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets?${params.toString()}`,
        );
    }

    public async getWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}`,
        );
    }

    public async activateWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetAddress> {
        return await this.apiClient.issuePostRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}`,
            {},
        );
    }

    public async getWalletAssetAddresses(walletId: string, accountId: number, assetId: string, { pageCursor, pageSize, sort, order }: NCW.GetWalletAddressesPayload = {}): Promise<Web3PagedResponse<NCW.WalletAssetAddress>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/addresses?${params.toString()}`,
        );
    }

    public async getWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/balance`,
        );
    }

    public async refreshWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issuePutRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/balance`,
            {},
        );
    }
}
