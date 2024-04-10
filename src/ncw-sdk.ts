import {
    AssetResponse, Web3PagedResponse, NCW, UnspentInputsResponse,
} from "./types";

export interface NcwSdk {
    /**
     * Get NCW supported assets
     */
    getSupportedAssets({ pageCursor, pageSize, onlyBaseAssets }: NCW.GetSupportedAssetsPayload): Promise<Web3PagedResponse<NCW.WalletAssetResponse>>;

    /**
     * Create a new NCW wallet
     */
    createWallet(): Promise<{ walletId: string; enabled: boolean; }>;

    /**
     * Get a NCW wallet
     *
     * @param {string} walletId
     */
    getWallet(walletId: string): Promise<{ walletId: string; enabled: boolean; }>;


    /**
     * Get NCW wallet's latest backup
     *
     * @param {string} walletId
     */
    getLatestBackup(walletId: string): Promise<NCW.LatestBackupResponse>;

    /**
     * Enable a NCW wallet
     *
     * @param {string} walletId
     * @param {boolean} enabled
     */
    enableWallet(walletId: string, enabled: boolean): Promise<void>;


    /**
     * Get NCW wallet devices
     *
     * @param {string} walletId
     * @return {*}  {Promise<NCW.Device>}
     */
    getWalletDevices(walletId: string): Promise<NCW.Device>;

    /**
     * Set NCW wallet device's enabled state
     *
     * @param {string} walletId
     * @param {string} deviceId
     * @param {boolean} enabled
     * @return {*}  {Promise<void>}
     */
    enableWalletDevice(walletId: string, deviceId: string, enabled: boolean): Promise<void>;

    /**
     * Invoke NCW wallet RPC call
     *
     * @param {string} walletId
     * @param {string} deviceId
     * @param {string} payload
     * @return {*}  {(Promise<{ result: string } | { error: { message: string, code?: number } }>)}
     */
    invokeWalletRpc(walletId: string, deviceId: string, payload: string): Promise<{ result: string; } | { error: { message: string; code?: number; }; }>;

    /**
     * Create a new NCW wallet account
     *
     * @param {string} walletId
     */
    createWalletAccount(walletId: string): Promise<{
        walletId: string;
        accountId: number;
    }>;

    /**
     * Get NCW wallets
     *
     * @param {GetWalletsPayload} { pageCursor, pageSize, sort, order }
     * @return {*}  {Promise<Web3PagedResponse<WalletInfo>>}
     */
    getWallets({ pageCursor, pageSize, sort, order }: NCW.GetWalletsPayload): Promise<Web3PagedResponse<NCW.WalletInfo>>;

    /**
     * Get NCW accounts
     *
     * @param {string} walletId
     * @param {GetWalletsPayload} [{ pageCursor, pageSize, sort, order }]
     */
    getWalletAccounts(walletId: string, { pageCursor, pageSize, sort, order }?: NCW.GetWalletsPayload): Promise<Web3PagedResponse<{
        walletId: string;
        accountId: number;
    }>>;

    /**
     * Get a NCW account
     *
     * @param {string} walletId
     * @param {number} accountId
     */
    getWalletAccount(walletId: string, accountId: number): Promise<{
        walletId: string;
        accountId: number;
    }>;

    /**
     * Get NCW assets
     *
     * @param {string} walletId
     * @param {number} accountId
     * @param {GetWalletAssetsPayload} [{ pageCursor, pageSize, sort, order }]
     * @return {*}  {Promise<Web3PagedResponse<NcwWalletAssetResponse>>}
     */
    getWalletAssets(walletId: string, accountId: number, { pageCursor, pageSize, sort, order }?: NCW.GetWalletAssetsPayload): Promise<Web3PagedResponse<NCW.WalletAssetResponse>>;

    /**
     * Get a NCW asset
     *
     * @param {string} walletId
     * @param {number} accountId
     * @param {string} assetId
     * @return {*}  {Promise<NcwWalletAssetResponse>}
     */
    getWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetResponse>;

    /**
     * Activate a NCW asset
     *
     * @param {string} walletId
     * @param {number} accountId
     * @param {string} assetId
     * @return {*}  {Promise<DepositAddressResponse>}
     */
    activateWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetAddress>;

    /**
     * Get a NCW asset addresses
     *
     * @param {string} walletId
     * @param {number} accountId
     * @param {string} assetId
     * @param {GetWalletAddressesPayload} { pageCursor, pageSize, sort, order }
     * @return {*}  {Promise<Web3PagedResponse<DepositAddressResponse>>}
     */
    getWalletAssetAddresses(walletId: string, accountId: number, assetId: string, { pageCursor, pageSize, sort, order }?: NCW.GetWalletAddressesPayload): Promise<Web3PagedResponse<NCW.WalletAssetAddress>>;

    /**
     * Get a NCW asset balance
     *
     * @param {string} walletId
     * @param {number} accountId
     * @param {string} assetId
     * @return {*}  {Promise<AssetResponse>}
     */
    getWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse>;

    /**
     * refresh a NCW asset balance
     *
     * @param {string} walletId
     * @param {number} accountId
     * @param {string} assetId
     * @return {*}  {Promise<AssetResponse>}
     */
    refreshWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse>;

    /**
     * get NCW wallet setup status
     *
     * @param {string} walletId
     * @return {*}  {Promise<NCW.WalletSetupStatusResponse>}
     */
    getWalletSetupStatus(walletId: string): Promise<NCW.WalletSetupStatusResponse>;

    /**
     * get NCW device setup status
     *
     * @param {string} walletId
     * @param {string} deviceId
     * @return {*}  {Promise<NCW.DeviceKeySetupResponse>}
     */
    getDeviceSetupStatus(walletId: string, deviceId: string): Promise<NCW.DeviceKeySetupResponse>;

    /**
     * Gets utxo list for an asset
     *
     * @param {string} walletId
     * @param {string} accountId
     * @param {string} assetId
     * @return {*}  {Promise<UnspentInputsResponse>}
     */
    getUnspentInputs(walletId: string, accountId: number, assetId: string): Promise<UnspentInputsResponse[]>;
}
