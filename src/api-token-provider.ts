import { IAuthProvider } from "./iauth-provider";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export class ApiTokenProvider implements IAuthProvider {

    constructor(private privateKey: string, private apiKey: string) { }

    signJwt(path: string, bodyJson?: any): string {
        const token =  jwt.sign({
            uri: path,
            nonce: Date.now(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 20,
            sub: this.apiKey,
            bodyHash: crypto.createHash("sha256").update(JSON.stringify(bodyJson || "")).digest().toString("hex")
        } as any, this.privateKey, { algorithm: "RS256"});

        return token;
    }

    getApiKey(): string {
        return this.apiKey;
    }
}
