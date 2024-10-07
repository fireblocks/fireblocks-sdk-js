import { ApiClient } from "../api-client";
import { PeerType, PublicKeyInfoArgs, PublicKeyInfoByAccountAssetArgs, PublicKeyInfoForVaultAccountArgs, PublicKeyInformation, PublicKeyResponse, RequestOptions } from "../types";
import queryString from "query-string";

export async function getPublicKeyInfoImpl(peerType: PeerType, args: PublicKeyInfoArgs, apiClient: ApiClient, walletId?: string): Promise<PublicKeyInformation> {
    let url: string;
    let requestOptions: RequestOptions;
    if (peerType === PeerType.VAULT_ACCOUNT) {
        url = `/v1/vault/public_key_info`;
    } else {
        requestOptions = { ncw: { walletId } };
        url = `/v1/ncw/${walletId}/public_key_info`;
    }

    const query = queryString.stringify({
        algorithm: args.algorithm,
        derivationPath: JSON.stringify(args.derivationPath),
        compressed: args.compressed,
    });
    url += `?${query}`;

    return await apiClient.issueGetRequest(url, undefined, requestOptions);
}

export async function getPublicKeyInfoByAccountAssetImpl(peerType: PeerType, args: PublicKeyInfoForVaultAccountArgs | PublicKeyInfoByAccountAssetArgs, apiClient: ApiClient, walletId?: string): Promise<PublicKeyResponse> {
    let url: string;
    let requestOptions: RequestOptions;
    if (peerType === PeerType.VAULT_ACCOUNT) {
        url = `/v1/vault/accounts/${(args as PublicKeyInfoForVaultAccountArgs).vaultAccountId}/${args.assetId}/${args.change}/${args.addressIndex}/public_key_info`;
    } else {
        requestOptions = { ncw: { walletId } };
        url = `/v1/ncw/${walletId}/accounts/${(args as PublicKeyInfoByAccountAssetArgs).accountId}/${args.assetId}/${args.change}/${args.addressIndex}/public_key_info`;
    }

    const query = queryString.stringify({
        compressed: args.compressed,
    });
    url += `?${query}`;

    return await apiClient.issueGetRequest(url, undefined, requestOptions);
}