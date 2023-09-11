export interface IAuthProvider {
    signJwt(path: string, bodyJson?: any): string;

    getApiKey(): string;
}
