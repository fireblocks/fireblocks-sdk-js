import { IAuthProvider } from "./iauth-provider";
import { RequestOptions } from "./types";
import { SDKOptions } from "./fireblocks-sdk";
import axios, { AxiosInstance } from "axios";
import { version as SDK_VERSION } from "../package.json";
import os from "os";

export class ApiClient {
    private axiosInstance: AxiosInstance;
    private readonly userAgent: string;

    constructor(private authProvider: IAuthProvider, private apiBaseUrl: string, private options: SDKOptions) {
        this.axiosInstance = axios.create({
            baseURL: this.apiBaseUrl,
            proxy: this.options?.proxy
        });
        this.userAgent = this.getUserAgent();
    }

    private getUserAgent(): string {
        let userAgent = `fireblocks-sdk-js/${SDK_VERSION}`;
        if (!this.options?.anonymousPlatform) {
            userAgent += ` (${os.type()}; ${os.platform()} ${os.release()}; ${os.arch()})`;
        }
        return userAgent;
    }

    public async issueGetRequest(path: string, pageMode: boolean = false) {
        const token = this.authProvider.signJwt(path);
        const res = await this.axiosInstance.get(path, {
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`,
                "User-Agent": this.userAgent
            },
            timeout: this.options?.timeoutInMs
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

        const idempotencyKey = requestOptions?.idempotencyKey;
        const headers: any = {
            "X-API-Key": this.authProvider.getApiKey(),
            "Authorization": `Bearer ${token}`,
            "User-Agent": this.userAgent
        };

        if (idempotencyKey) {
            headers["Idempotency-Key"] = idempotencyKey;
        }

        return (await this.axiosInstance.post(path, body, {
            headers,
            timeout: this.options?.timeoutInMs
        })).data;
    }

    public async issuePutRequest(path: string, body: any) {
        const token = this.authProvider.signJwt(path, body);

        return (await this.axiosInstance.put(path, body, {
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`,
                "User-Agent": this.userAgent
            },
            timeout: this.options?.timeoutInMs
        })).data;
    }

    public async issuePatchRequest(path: string, body: any) {
        const token = this.authProvider.signJwt(path, body);

        const headers: any = {
            "X-API-Key": this.authProvider.getApiKey(),
            "Authorization": `Bearer ${token}`,
            "User-Agent": this.userAgent
        };

        return (await this.axiosInstance.patch(path, body, {
            headers,
            timeout: this.options?.timeoutInMs
        })).data;
    }

    public async issueDeleteRequest(path: string) {
        const token = this.authProvider.signJwt(path);

        return (await this.axiosInstance.delete(path, {
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`,
                "User-Agent": this.userAgent
            },
            timeout: this.options?.timeoutInMs
        })).data;
    }
}
