export interface IAuthProvider {
    signJwt(path: string, bodyJson?: any): string | Promise<string>;

    getApiKey(): string | Promise<string>;
}
