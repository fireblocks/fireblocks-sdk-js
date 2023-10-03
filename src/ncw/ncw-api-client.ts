import { ApiClient } from "../api-client";
import { NcwAdminSdk } from "./api-client-admin";
import { NcwSignerSdk } from "./api-client-signer";

export class NcwApiClient {
    private readonly _admin: NcwAdminSdk;
    private readonly _signer: NcwSignerSdk;

    private readonly NCW_BASE_PATH = "/v1/ncw/wallets";

    constructor(readonly apiClient: ApiClient) {
        this._admin = new NcwAdminSdk(apiClient, this.NCW_BASE_PATH);
        this._signer = new NcwSignerSdk(apiClient, this.NCW_BASE_PATH);
    }

    public get admin(): NcwAdminSdk {
        return this._admin;
    }
    public get signer(): NcwSignerSdk {
        return this._signer;
    }

}
