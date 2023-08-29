import { ApiClient } from "../api-client";
import { NcwAdminApiClient } from "./api-client-admin";
import { NcwSignerApiClient } from "./api-client-signer";

export class NcwApiClient {
    private readonly _admin: NcwAdminApiClient;
    private readonly _signer: NcwSignerApiClient;

    private readonly NCW_BASE_PATH = "/v1/ncw/wallets";

    constructor(readonly apiClient: ApiClient) {
        this._admin = new NcwAdminApiClient(apiClient, this.NCW_BASE_PATH);
        this._signer = new NcwSignerApiClient(apiClient, this.NCW_BASE_PATH);
    }

    public get admin(): NcwAdminApiClient {
        return this._admin;
    }
    public get signer(): NcwSignerApiClient {
        return this._signer;
    }

}
