import os from "os";
import platform from "platform";
import { IAuthProvider } from "./iauth-provider";
import { RequestOptions } from "./types";
import { SDKOptions } from "./fireblocks-sdk";
import axios, { AxiosInstance } from "axios";
import { version as SDK_VERSION } from "../package.json";

export class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(private authProvider: IAuthProvider, private apiBaseUrl: string, private options: SDKOptions) {
        this.axiosInstance = axios.create({
            baseURL: this.apiBaseUrl,
            proxy: this.options?.proxy,
            timeout: this.options?.timeoutInMs,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "User-Agent": this.getUserAgent()
            }
        });
    }

    private getUserAgent(): string {
        let userAgent = `fireblocks-sdk-js/${SDK_VERSION}`;
        if (!this.options?.anonymousPlatform) {
            userAgent += ` (${os.type()} ${os.release()}; ${platform.name} ${platform.version}; ${os.arch()})`;
        }
        return userAgent;
    }

    public async issueGetRequest(path: string, pageMode: boolean = false) {
        const token = this.authProvider.signJwt(path);
        const res = await this.axiosInstance.get(path, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        if (pageMode) {
            return {
                transactions: res.data,
                pageDetails: {
                    prevPage: res.headers["prev-page"] ? res.headers["prev-page"].toString() : "",
                    nextPage: res.headers["next-page"] ? res.headers["next-page"].toString() : "",
                }
            };
        }
        return res.data;
    }

    public async issuePostRequest(path: string, body: any, requestOptions?: RequestOptions) {
        const token = this.authProvider.signJwt(path, body);
        const headers: any = {"Authorization": `Bearer ${token}`};
        const idempotencyKey = requestOptions?.idempotencyKey;
        if (idempotencyKey) {
            headers["Idempotency-Key"] = idempotencyKey;
        }
        return (await this.axiosInstance.post(path, body, {headers})).data;
    }

    public async issuePutRequest(path: string, body: any) {
        const token = this.authProvider.signJwt(path, body);
        return (await this.axiosInstance.put(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        })).data;
    }

    public async issuePatchRequest(path: string, body: any) {
        const token = this.authProvider.signJwt(path, body);
        return (await this.axiosInstance.patch(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        })).data;
    }

    public async issueDeleteRequest(path: string) {
        const token = this.authProvider.signJwt(path);
        return (await this.axiosInstance.delete(path, {
            headers: {"Authorization": `Bearer ${token}`}
        })).data;
    }
}
