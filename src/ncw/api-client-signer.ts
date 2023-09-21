import { ApiClient } from "../api-client";
import { AssetResponse, NCW, RequestOptions, Web3PagedResponse } from "../types";
import { INcwSignerSdk } from "./types";

export class NcwSignerSdk implements INcwSignerSdk {

    constructor(private readonly apiClient: ApiClient, private readonly BASE_PATH: string) { }

    public async getWallet(walletId: string): Promise<{ walletId: string; enabled: boolean; }> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}`,
            this.getRequestOptions(walletId),
        );
    }

    public async enableWallet(walletId: string, enabled: boolean): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `${this.BASE_PATH}/${walletId}/enable`,
            { enabled },
            this.getRequestOptions(walletId),
        );
    }

    public async getWalletDevices(walletId: string): Promise<NCW.Device> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/devices/`,
            this.getRequestOptions(walletId),
        );
    }

    public async enableWalletDevice(walletId: string, deviceId: string, enabled: boolean): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `${this.BASE_PATH}/${walletId}/devices/${deviceId}/enable`,
            { enabled },
            this.getRequestOptions(walletId),
        );
    }

    public async invokeWalletRpc(walletId: string, deviceId: string, payload: string): Promise<{ result: string; } | { error: { message: string; code?: number; }; }> {
        return await this.apiClient.issuePostRequest(
            `${this.BASE_PATH}/${walletId}/devices/${deviceId}/invoke`,
            { payload },
            this.getRequestOptions(walletId),
        );
    }

    public async createWalletAccount(walletId: string): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issuePostRequest(
            `${this.BASE_PATH}/${walletId}/accounts`,
            {},
            this.getRequestOptions(walletId),
        );
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
            this.getRequestOptions(walletId),
        );
    }

    public async getWalletAccount(walletId: string, accountId: number): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}`,
            this.getRequestOptions(walletId),
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
            this.getRequestOptions(walletId),
        );
    }

    public async getWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}`,
            this.getRequestOptions(walletId),
        );
    }

    public async activateWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetAddress> {
        return await this.apiClient.issuePostRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}`,
            {},
            this.getRequestOptions(walletId),
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
            this.getRequestOptions(walletId),
        );
    }

    public async getWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issueGetRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/balance`,
            this.getRequestOptions(walletId),
        );
    }

    public async refreshWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issuePutRequest(
            `${this.BASE_PATH}/${walletId}/accounts/${accountId}/assets/${assetId}/balance`,
            {},
            this.getRequestOptions(walletId),
        );
    }

    private getRequestOptions(walletId: string): RequestOptions {
        return {
            ncw: {
                walletId,
            },
        };
    }
}
