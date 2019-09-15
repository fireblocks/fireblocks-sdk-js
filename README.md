# The Official Javascript & Typescript SDK for Fireblocks API

## About

This repository contains the official Javascript & Typescript SDK for Fireblocks API.
For the complete API reference, go to [API reference](https://api.fireblocks.io/docs/v1/swagger-ui).

## Usage

### Before You Begin

Make sure you have the credentials for Fireblocks API Services. Otherwise, please contact Fireblocks support for further instructions on how to obtain your API credentials.

### Requirements

- [node.js](https://nodejs.org) v6.3.1 or newer

### Installation

`npm install fireblocks-sdk --save`
or
`yarn add fireblocks-sdk`

## Docs

### Importing and setting up the Fireblocks SDK

In order to use the Fireblocks SDK you will need a `Private Key` and an `API Key`.
You can receive instructions on how to get your private key by contacting Fireblocks. The API Key is your userId.

JavaScript:

```js
const FireblocksSDK = require("fireblocks-sdk").FireblocksSDK;
const fireblocks = new FireblocksSDK(privateKey, apiKey);
```

TypeScript:

```ts
import { FireblocksSDK } from "fireblocks-sdk";
const fireblocks = new FireblocksSDK(privateKey, apiKey);
```

### Transactions

#### Get Transactions

Parameters:

- `status:` Only retrieves transactions with the specified status.
- `before:` Only gets transactions created before a given timestamp (in seconds).
- `after:` Only gets transactions created after a given timestamp (in seconds).

```ts
const transactions = await fireblocks.getTransactions({ status: "FAILED" });

// transactions = [
//   {
//     id: "66ce3e76-2c9c-4921-b94b-b417db0ee6cc",
//     createdAt: 1568299259372,
//     lastUpdated: 1568385685144,
//     assetId: "ETH_TEST",
//     source: { id: "0", type: "VAULT_ACCOUNT", name: "Default" },
//     destination: {
//       id: "03d6d5af-5241-5673-acfa-4674187e3d1c",
//       type: "EXCHANGE_ACCOUNT",
//       name: "Test #1"
//     },
//     amount: 0.01,
//     fee: -1,
//     netAmount: -1,
//     destinationAddress: "",
//     destinationTag: "",
//     status: "FAILED",
//     txHash: "",
//     failureReason: "TIMEOUT",
//     signedBy: [],
//     createdBy: "168cacd3-ce04-5264-bc1b-da34eb249313",
//     rejectedBy: "",
//     addressType: ""
//   },
// ];
```

#### Get Transaction By Id

Parameters:

- `id:` the transaction ID

```ts
const txId = "66ce3e76-2c9c-4921-b94b-b417db0ee6cc";
const transactionById = fireblocks.getTransactionById(txId);

// transactionById = {
//   id: "66ce3e76-2c9c-4921-b94b-b417db0ee6cc",
//   createdAt: 1568299259372,
//   lastUpdated: 1568385685144,
//   assetId: "ETH_TEST",
//   source: { id: "0", type: "VAULT_ACCOUNT", name: "Default" },
//   destination: {
//     id: "03d6d5af-5241-5673-acfa-4674187e3d1c",
//     type: "EXCHANGE_ACCOUNT",
//     name: "Test #1"
//   },
//   amount: 0.01,
//   fee: -1,
//   netAmount: -1,
//   destinationAddress: "",
//   destinationTag: "",
//   status: "FAILED",
//   txHash: "",
//   failureReason: "TIMEOUT",
//   signedBy: [],
//   createdBy: "168cacd3-ce04-5264-bc1b-da34eb249313",
//   rejectedBy: "",
//   addressType: ""
// };
```

#### Create transactions

Parameters:

- `assetId`
- `source`
  - `type`
  - `id`
- `destination`
  - `type`
  - `id`
- `amount`
- `fee`
- `note`

```ts
const payload: TransactionArguments = {
  assetId: "BTC",
  source: {
    type: "VAULT_ACCOUNT",
    id: "0"
  },
  destination: {
    type: "EXCHANGE_ACCOUNT",
    id: "03d6d5af-5241-5673-acfa-4674187e3d1c"
  },
  amount: 2,
  fee: -1,
  note: "Created with <3 but the Fireblocks SDK"
};

const result = await fireblocks.createTransaction(payload);
// result = {"id":"8187d8c1-0707-4cc2-b242-cf4c6dbe461f","status":"SUBMITTED"}
```

#### Cancel transaction

Parameters:

- `id:` ID of the transaction to cancel

```ts
const result = await fireblocks.cancelTransactionById("some-tx-id");

// Result = { success: true } (throws error if cancel failed)
```

### Vault Accounts

#### Get All Vault Accounts

```ts
const result = await fireblocks.getVaultAccounts();
// Result = [
//   {
//     id: "0",
//     name: "Default",
//     assets: [
//       { id: "BTC", balance: "0.00000000", lockedAmount: "0.00000000" },
//       { id: "BTC_TEST", balance: "0.00000000", lockedAmount: "0.00000000" },
//       { id: "ETH", balance: "0.00000000", lockedAmount: "0.00000000" },
//       { id: "ETH_TEST", balance: "0.27958000", lockedAmount: "0.00000000" }
//     ]
//   }
// ];
```

#### Get Vault Account By Id

Parameter:

- `id`: ID of the vault account to retrieve

```ts
const result = await fireblocks.getVaultAccount("0");
```

#### Get Vault Account Asset

Parameters:

- `id`: ID of the vault account
- `asset`: ID of the asset

```ts
const result = await fireblocks.getVaultAccountAsset("0", "BTC");
// Result = {
//   id: 'BTC',
//   balance: '0.00000000',
//   lockedAmount: '0.00000000',
// }
```

#### Create Vault Account

Parameter:

- `name`: Name of the vault account to create

```ts
const result = await fireblocks.createVaultAccount("My New Vault");
// result = {
//   id: '1',
//   name: 'My New Vault',
//   assets: [],
// }
```

#### Update Vault Account

Parameters:

- `id`: ID of the vault account to update
- `name`: New name for the vault account

```ts
const result = await fireblocks.updateVaultAccount("1", "Updated Name");
// result = {
//   id: '1',
//   name: 'Updated Name',
// }
```

#### Create Vault Asset

Creates a new asset within an existing vault account.

Parameters:

- `id`: ID of the vault account
- `assetId`: Asset to create to the chosen vault account

```ts
const result = await fireblocks.createVaultAsset(id, assetId);
// result = {
//   id: '1',
//   balance: 0,
//   lockedAmount: 0,
// }
```

### Exchange Accounts

#### Get Exchange Accounts

```ts
const result = await fireblocks.getExchangeAccounts();
// result = [
//   {
//     id: "03d6d5af-5241-5673-acfa-4674187e3d1c",
//     name: "Test #1",
//     type: "EXCHANGETEST",
//     assets: [
//       { id: "BTC_TEST", balance: "1.00451824", lockedAmount: "0.00000000" },
//       {
//         id: "ETH_TEST",
//         balance: "6.454149322147810994",
//         lockedAmount: "0.00000000"
//       },
//       { id: "XRP_TEST", balance: "58.351084", lockedAmount: "0.00000000" }
//     ],
//     isSubaccount: false,
//     status: "APPROVED"
//   },
//    (more accounts...)
// ];
```

### Internal/External Wallets

In addition to your Vault Accounts, Fireblocks blocks allows you to add internal and external wallets:

- Internal wallets are wallets from your organization but not managed by Fireblocks. Fireblocks will only look at their balance.

- External wallets are wallets you have no control over, like a customer's wallet.

#### Create Internal Wallet Container

Parameter:

- `name`: name of the wallet

```ts
const result = await fireblocks.createInternalWallet("Internal wallet");
// result = { id: "5926605d-73a2-ebf8-7b9d-6e5b705ce223", assets: [] };
```

#### Create Internal Wallet Asset

Parameters:

- `containerId`: ID of the internal wallet to create the asset to
- `assetId`: asset type
- `address`: Address of the wallet to add
- `tag`

```ts
const result = await fireblocks.createInternalWalletAsset(
  containerId,
  assetId,
  address,
  tag
);
```

#### Get Internal Wallets

```ts
const result = await fireblocks.getInternalWallets();
```

#### Create External Wallet Container

Parameter:

- `name`: name of the wallet

```ts
const result = await fireblocks.createExternalWallet("External wallet");
// result = { id: "5926605d-73a2-ebf8-7b9d-6e5b705ce223", assets: [] };
```

#### Create External Wallet Asset

Parameters:

- `containerId`: ID of the external wallet to create the asset to
- `assetId`: asset type
- `address`: Address of the wallet to add
- `tag`

```ts
const result = await fireblocks.createExternalWalletAsset(
  containerId,
  assetId,
  address,
  tag
);
```

#### Get External Wallets

```ts
const result = await fireblocks.getExternalWallets();
// result = [
//   {
//     id: "26bd0789-0285-6ea9-a89b-dbbcbbdd4b6e",
//     name: "external customer",
//     assets: [
//       {
//         id: "ETH_TEST",
//         status: "APPROVED",
//         address: "0x6808a2b156A56af3598F59ea869C843A28434eEE",
//         tag: ""
//       }
//     ]
//   }
// ];
```

### Others

#### Get Supported Assets

Gets all assets that are currently supported by Fireblocks.

```ts
const result = await fireblocks.getSupportedAssets();
```

#### Get Deposit Addresses

Gets deposit addresses for an asset in a vault account.

Parameters:

- `id`: vault account ID
- `assetId`: asset to get deposit addresses to

```ts
const result = await fireblocks.getDepositAddresses(id, assetId);
// result = [
//   {
//     assetId: "BTC",
//     address: "1E9yj2hWVS2BsohZDp73VusPQQ2gsxoYhd",
//     tag: "",
//     description: "",
//     type: "Deposit"
//   }
// ];
```
