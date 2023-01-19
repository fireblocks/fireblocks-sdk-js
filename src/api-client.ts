import os from "os";
import platform from "platform";
import { IAuthProvider } from "./iauth-provider";
import { APIResponse, RequestOptions, TransactionPageResponse } from "./types";
import { SDKOptions } from "./fireblocks-sdk";
import axios, { AxiosInstance } from "axios";

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
        let userAgent = `fireblocks-sdk-js`;
        if (!this.options?.anonymousPlatform) {
            userAgent += ` (${os.type()} ${os.release()}; ${platform.name} ${platform.version}; ${os.arch()})`;
        }
        return userAgent;
    }

    public async issueGetRequestForTransactionPages(path: string): Promise<APIResponse<TransactionPageResponse>> {
        const token = this.authProvider.signJwt(path);
        const res = await this.axiosInstance.get(path, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return {
            data: {
                transactions: res.data,
                pageDetails: {
                    prevPage: res.headers["prev-page"] ? res.headers["prev-page"].toString() : "",
                    nextPage: res.headers["next-page"] ? res.headers["next-page"].toString() : "",
                }
            },
            headers: res.headers
        };
    }

    public async issueGetRequest<T>(path: string): Promise<APIResponse<T>> {
        const token = this.authProvider.signJwt(path);
        const res = await this.axiosInstance.get(path, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return {
            data: res.data,
            headers: res.headers
        };
    }

    public async issuePostRequest<T>(path: string, body: any, requestOptions?: RequestOptions): Promise<APIResponse<T>> {
        const token = this.authProvider.signJwt(path, body);
        const headers: any = {"Authorization": `Bearer ${token}`};
        const idempotencyKey = requestOptions?.idempotencyKey;
        if (idempotencyKey) {
            headers["Idempotency-Key"] = idempotencyKey;
        }
        const response = await this.axiosInstance.post(path, body, {headers});
        return {
            data: response.data,
            headers: response.headers
        };
    }

    public async issuePutRequest<T>(path: string, body: any): Promise<APIResponse<T>> {
        const token = this.authProvider.signJwt(path, body);
        const res = (await this.axiosInstance.put(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return {
            data: res.data,
            headers: res.headers,
        };
    }

    public async issuePatchRequest<T>(path: string, body: any): Promise<APIResponse<T>> {
        const token = this.authProvider.signJwt(path, body);
        const res = (await this.axiosInstance.patch(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return {
            data: res.data,
            headers: res.headers
        };
    }

    public async issueDeleteRequest<T>(path: string): Promise<APIResponse<T>> {
        const token = this.authProvider.signJwt(path);
        const res = (await this.axiosInstance.delete(path, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return {
            data: res.data,
            headers: res.headers
        };
    }
}
