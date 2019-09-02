import { IAuthProvider } from "./iauth-provider";
import requestPromise from "request-promise-native";

export class ApiClient {
    constructor(private authProvider: IAuthProvider, private apiBaseUrl: string) { }

    public async issueGetRequest(path: string) {
        const token = this.authProvider.signJwt(path);

        return await requestPromise.get({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            json: true
        });
    }

    public async issuePostRequest(path: string, body: any) {
        const token = this.authProvider.signJwt(path, body);

        return await requestPromise.post({
            uri: this.apiBaseUrl + path,
            headers: {
                "X-API-Key": this.authProvider.getApiKey(),
                "Authorization": `Bearer ${token}`
            },
            body: body,
            json: true
        });
    }

}
