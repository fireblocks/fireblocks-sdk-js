import os from "os";
import platform from "platform";
import { IAuthProvider } from "./iauth-provider";
import { RequestOptions, TransactionPageResponse } from "./types";
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
        });

        this.axiosInstance.interceptors.request.use(async (config: any) => {
            config.headers.common["X-API-Key"] = await this.authProvider.getApiKey();
            config.headers.common["User-Agent"] = this.getUserAgent();
            return config;
        });

        if (options.customAxiosOptions?.interceptors?.response) {
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

    public async issueGetRequestForTransactionPages(path: string): Promise<TransactionPageResponse> {
        const token = await this.authProvider.signJwt(path);
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

    public async issueGetRequest<T>(path: string): Promise<T> {
        const token = await this.authProvider.signJwt(path);
        const res = await this.axiosInstance.get(path, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return res.data;
    }

    public async issuePostRequest<T>(path: string, body: any, requestOptions?: RequestOptions): Promise<T> {
        const token = await this.authProvider.signJwt(path, body);
        const headers: any = {"Authorization": `Bearer ${token}`};
        const idempotencyKey = requestOptions?.idempotencyKey;
        if (idempotencyKey) {
            headers["Idempotency-Key"] = idempotencyKey;
        }
        const response = await this.axiosInstance.post<T>(path, body, {headers});
        return response.data;
    }

    public async issuePutRequest<T>(path: string, body: any): Promise<T> {
        const token = await this.authProvider.signJwt(path, body);
        const res = (await this.axiosInstance.put<T>(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return res.data;
    }

    public async issuePatchRequest<T>(path: string, body: any): Promise<T> {
        const token = await this.authProvider.signJwt(path, body);
        const res = (await this.axiosInstance.patch<T>(path, body, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return res.data;
    }

    public async issueDeleteRequest<T>(path: string): Promise<T> {
        const token = await this.authProvider.signJwt(path);
        const res = (await this.axiosInstance.delete<T>(path, {
            headers: {"Authorization": `Bearer ${token}`}
        }));
        return res.data;
    }
}
