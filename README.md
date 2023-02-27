## The Official Javascript & Typescript SDK for Fireblocks API
[![npm version](https://badge.fury.io/js/fireblocks-sdk.svg)](https://badge.fury.io/js/fireblocks-sdk)

### About
This repository contains the official Javascript & Typescript SDK for Fireblocks API.
For the complete API reference, go to [API reference](https://docs.fireblocks.com/api/swagger-ui/).

## V4 Migration
Please read the [following](./docs/V4-MIGRATION.md) guide for migration

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

#### Axios Interceptor
You can provide the sdk options with an [axios response interceptor](https://axios-http.com/docs/interceptors):
```ts
new FireblocksSDK(privateKey, userId, serverAddress, undefined, {
    customAxiosOptions: {
        interceptors: {
            response: {
                onFulfilled: (response) => {
                    console.log(`Request ID: ${response.headers["x-request-id"]}`);
                    return response;
                },
                onRejected: (error) => {
                    console.log(`Request ID: ${error.response.headers["x-request-id"]}`);
                    throw error;
                }
            }
        }
    }
});
```

#### Error Handling
The SDK throws `AxiosError` upon http errors for API requests.

You can read more about axios error handling [here](https://axios-http.com/docs/handling_errors).

You can get more data on the Fireblocks error using the following fields:

- `error.response.data.code`: The Fireblocks error code, should be provided on support tickets
- `error.response.data.message`: Explanation of the Fireblocks error
- `error.response.headers['x-request-id']`: The request ID correlated to the API request, should be provided on support tickets / Github issues




