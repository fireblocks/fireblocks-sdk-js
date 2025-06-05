import os from "os";
import platform from "platform";
import axios, { AxiosInstance } from "axios";
import queryString from "query-string";

import { IAuthProvider } from "./iauth-provider";
import { RequestOptions, TransactionPageResponse } from "./types";
import { SDKOptions } from "./fireblocks-sdk";
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

        if (options?.customAxiosOptions?.interceptors?.request) {
            this.axiosInstance.interceptors.request.use(options.customAxiosOptions.interceptors.request.onFulfilled, options.customAxiosOptions.interceptors.request.onRejected);
        }
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

    public async issueGetRequest<T>(rawPath: string, queryStringParams?: object, requestOptions?: RequestOptions): Promise<T> {
        const pathWithParams = queryStringParams ? `${rawPath}?${queryString.stringify(queryStringParams)}` : rawPath;
        const path = normalizePath(pathWithParams);

        const token = this.authProvider.signJwt(path);
        const headers: any = {"Authorization": `Bearer ${token}`};

        this.addNcwHeaderIfNeeded(headers, requestOptions);

        const res = await this.axiosInstance.get(path, { headers });
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
        this.addNcwHeaderIfNeeded(headers, requestOptions);
        const response = await this.axiosInstance.post<T>(path, body, {headers});
        return response.data;
    }

    public async issuePutRequest<T>(rawPath: string, body: any, requestOptions?: RequestOptions): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path, body);
        const headers: any = { "Authorization": `Bearer ${token}` };
        this.addNcwHeaderIfNeeded(headers, requestOptions);
        const res = (await this.axiosInstance.put<T>(path, body, {headers}));

        return res.data;
    }

    public async issuePatchRequest<T>(rawPath: string, body: any, requestOptions?: RequestOptions): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path, body);
        const headers: any = { "Authorization": `Bearer ${token}` };
        this.addNcwHeaderIfNeeded(headers, requestOptions);
        const res = (await this.axiosInstance.patch<T>(path, body, {headers}));
        return res.data;
    }

    public async issueDeleteRequest<T>(rawPath: string, requestOptions?: RequestOptions): Promise<T> {
        const path = normalizePath(rawPath);
        const token = this.authProvider.signJwt(path);
        const headers: any = { "Authorization": `Bearer ${token}` };
        this.addNcwHeaderIfNeeded(headers, requestOptions);
        const res = (await this.axiosInstance.delete<T>(path, {headers}));
        return res.data;
    }

    private addNcwHeaderIfNeeded(headers: any, requestOptions: RequestOptions) {
        if (requestOptions?.ncw?.walletId) {
            headers["X-End-User-Wallet-Id"] = requestOptions.ncw.walletId;
        }
    }
}

/**
 * This function allows backward compatibility with previous version of axios that did not omit "?" for
 * urls with no params. This function will make sure we are omitting the "?" before signing it
 */
function normalizePath(path: string) {
    return path.replace(/\?$/, "");
}
