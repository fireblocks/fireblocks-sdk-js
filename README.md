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
```
const FireblocksSDK = require("fireblocks-sdk").FireblocksSDK;
const fireblocks = new FireblocksSDK(privateKey, apiKey);
```

TypeScript:
```
import { FireblocksSDK } from "fireblocks-sdk";
const fireblocks = new FireblocksSDK(privateKey, apiKey);
```

You can also specify timeout for the http requests:
```
import { FireblocksSDK } from "fireblocks-sdk";
const fireblocks = new FireblocksSDK(privateKey, apiKey, undefined, {timeoutInMs: 4000});
```
