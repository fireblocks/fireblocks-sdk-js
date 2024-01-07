import os from "os";
import platform from "platform";
import { IAuthProvider } from "./iauth-provider";
import { RequestOptions, TransactionPageResponse } from "./types";
import { SDKOptions } from "./fireblocks-sdk";
import axios, { AxiosInstance } from "axios";
import { version as SDK_VERSION } from "../package.json";

export class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(private authProvider: IAuthProvider, private apiBaseUrl: string, private options?: SDKOptions) {
        this.axiosInstance = axios.create({
            baseURL: this.apiBaseUrl,
            proxy: this.options?.proxy,
            timeout: this.options?.timeoutInMs,
            httpsAgent: this.options?.httpsAgent,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "User-Agent": this.getUserAgent()
            },
        });

        if (options?.customAxiosOptions?.interceptors?.response) {
            this.axiosInstance.interceptors.response.use(options.customAxiosOptions.interceptors.response.onFulfilled, options.customAxiosOptions.interceptors.response.onRejected);
        }
    }

    private getUserAgent(): string {
        let userAgent = `fireblocks-sdk-js/${SDK_VERSION}`;
        if (!this.options?.anonymousPlatform) {
            userAgent += ` (${os.type()} ${os.release()}; ${platform.name} ${platform.version}; ${os.arch()})`;
        }
        if (this.options?.userAgent) {
            userAgent = `${this.options.userAgent} ${userAgent}`;
        }
        return userAgent;
    }

    public async issueGetRequestForTransactionPages(rawPath: string): Promise<TransactionPageResponse> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path);
        const res = await this.axiosInstance.get(path, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return {
            transactions: res.data,
            pageDetails: {
                prevPage: res.headers["prev-page"] ? res.headers["prev-page"].toString() : "",
                nextPage: res.headers["next-page"] ? res.headers["next-page"].toString() : "",
            }
        };
    }

    public async issueGetRequest<T>(rawPath: string): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path);
        const res = await this.axiosInstance.get(path, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return res.data;
    }

    public async issuePostRequest<T>(rawPath: string, body: any, requestOptions?: RequestOptions): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path, body);
        const headers: any = {"Authorization": `Bearer ${token}`};
        const idempotencyKey = requestOptions?.idempotencyKey;
        if (idempotencyKey) {
            headers["Idempotency-Key"] = idempotencyKey;
        }

        const ncwWalletId = requestOptions?.ncw?.walletId;
        if (ncwWalletId) {
            headers["X-End-User-Wallet-Id"] = ncwWalletId;
        }

        const response = await this.axiosInstance.post<T>(path, body, {headers});
        return response.data;
    }

    public async issuePutRequest<T>(rawPath: string, body: any): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path, body);
        const res = (await this.axiosInstance.put<T>(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return res.data;
    }

    public async issuePatchRequest<T>(rawPath: string, body: any): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path, body);
        const res = (await this.axiosInstance.patch<T>(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return res.data;
    }

    public async issueDeleteRequest<T>(rawPath: string): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path);
        const res = (await this.axiosInstance.delete<T>(path, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return res.data;
    }
}

/**
 * This function allows backward compatibility with previous version of axois that did not omit ? for
 * urls with no params. This function will make sure we are omitting the ? before signing it
 */
function normalizePath(path: string) {
    return path.replace(/\?$/, "");
}
