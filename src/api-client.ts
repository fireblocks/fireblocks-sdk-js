import { IAuthProvider } from "./iauth-provider";
import requestPromise from "request-promise-native";
import { RequestOptions } from "./types";

export class ApiClient {
    constructor(private authProvider: IAuthProvider, private apiBaseUrl: string) { }

    public async issueGetRequest(path: string, pageMode: boolean = false) {
        const token = this.authProvider.signJwt(path);
        console.log("token: " + token);
        console.log(this.apiBaseUrl + path);
        console.log("getApiKey: " + this.authProvider.getApiKey());
        const res = await requestPromise.get({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            json: true
        });

        if (pageMode) {
            console.log("date header: " + res.headers);
            const prevHeader = res.header["previous"] ? res.header["previous"].toString() :  "";
            const nextHeader = res.header["next"] ? res.header["next"].toString() :  "";
            return {
                transactions: res,
                pageDetails: {
                    previous: prevHeader,
                    next:  nextHeader,
                }
            };
        }

        return res;
    }

    public async issuePostRequest(path: string, body: any, requestOptions?: RequestOptions) {
        const token = this.authProvider.signJwt(path, body);

        const idempotencyKey = requestOptions?.idempotencyKey;

        return await requestPromise.post({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`,
                "Idempotency-Key": idempotencyKey
            },
            body: body,
            json: true
        });
    }

    public async issuePutRequest(path: string, body: any) {
        const token = this.authProvider.signJwt(path, body);

        return await requestPromise.put({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            body: body,
            json: true
        });
    }

    public async issueDeleteRequest(path: string) {
        const token = this.authProvider.signJwt(path);

        return await requestPromise.delete({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            json: true
        });
    }
}
