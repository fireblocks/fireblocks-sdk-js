## The Official Javascript & Typescript SDK for Fireblocks API
[![npm version](https://badge.fury.io/js/fireblocks-sdk.svg)](https://badge.fury.io/js/fireblocks-sdk)

### About
This repository contains the official Javascript & Typescript SDK for Fireblocks API.
For the complete API reference, go to [API reference](https://docs.fireblocks.com/api/swagger-ui/).

## V4 Migration
In v4 we changed all the sdk response types to return the `APIResponse` object, which is defined as:
```ts
export interface APIResponse<T> {
    data: T; // http response body
    status?: number; // http status code
    headers?: AxiosResponseHeaders; // http response headers
}
```

This means that if you previously fetched data in the following way:
```ts
const exchangeAccounts: ExchangeResponse = await sdk.getExchangeAccount(exchangeAccountId);
```

It should be transformed to:
```ts
const {data: exchangeAccounts, headers} = (await sdk.getExchangeAccount(exchangeAccountId));
```

### `X-REQUEST-ID` Response Header
Using v4 you can now use the response header `x-request-id` which correlates the request to the Fireblocks operation.

You can provide the value of this header in case you have support tickets related to an API operation, or a Github issue.

### Removed deprecated methods
- `getVaultAccounts` method was removed. It is replaced by the `getVaultAccountsWithPageInfo` method
- `getVaultAccount` method was removed. It is replaced by the `getVaultAccountById` method
- `getExchangeAccount` was removed in favour of `getExchangeAccountById`

## Usage
#### Before You Begin
Make sure you have the credentials for Fireblocks API Services. Otherwise, please contact Fireblocks support for further instructions on how to obtain your API credentials.

#### Requirements
- [node.js](https://nodejs.org) v12 or newer

#### Installation
`npm install fireblocks-sdk --save`

or

`yarn add fireblocks-sdk`

#### Importing Fireblocks SDK
JavaScript:
```javascript
const FireblocksSDK = require("fireblocks-sdk").FireblocksSDK;
const fireblocks = new FireblocksSDK(privateKey, apiKey);
```

TypeScript:
```typescript
import { FireblocksSDK } from "fireblocks-sdk";
const fireblocks = new FireblocksSDK(privateKey, apiKey);
```

You can also pass additional options:
```typescript
const baseUrl = "https://api.fireblocks.io";
const authProvider: IAuthProvider = { /* Custom implementation */ };
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl, authProvider, options);
```
The `options` argument has the following structure:
```typescript
interface SDKOptions {
    /** HTTP request timeout */
    timeoutInMs?: number;

    /** Proxy configurations */
    proxy?: AxiosProxyConfig | false;

    /** Whether to remove platform from User-Agent header */
    anonymousPlatform?: boolean;
    
    /** Additional product identifier to be prepended to the User-Agent header */
    userAgent?: string;
}
```
