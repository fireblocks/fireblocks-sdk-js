## The Official Javascript & Typescript SDK for Fireblocks API
[![npm version](https://badge.fury.io/js/fireblocks-sdk.svg)](https://badge.fury.io/js/fireblocks-sdk)

### About
This repository contains the official Javascript & Typescript SDK for Fireblocks API.
For the complete API reference, go to [API reference](https://docs.fireblocks.com/api/swagger-ui/).

## Usage
#### Before You Begin
Make sure you have the credentials for Fireblocks API Services. Otherwise, please contact Fireblocks support for further instructions on how to obtain your API credentials.

#### Requirements
- [node.js](https://nodejs.org) v6.3.1 or newer

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
const fireblocks = new FireblocksSDK(privateKey, apiKey, baseUrl, options);
```
The `options` argument has the following structure:
```typescript
interface SDKOptions {
    timeoutInMs?: number;               // HTTP request timeout
    proxy?: AxiosProxyConfig | false;   // Proxy configuration
    anonymousPlatform?: boolean;        // Whether to remove platform from User-Agent header
}
```