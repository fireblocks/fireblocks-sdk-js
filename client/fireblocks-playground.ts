/* eslint-disable no-console */

import 'dotenv/config';

import * as fs from 'fs';

import { BigNumber, ethers } from 'ethers';
import { Chain, FireblocksSDK } from 'fireblocks-defi-sdk';
import {
  PeerType,
  TransactionOperation,
  TransactionResponse,
  TransactionStatus,
} from 'fireblocks-sdk';

import { Transaction } from '@ethereumjs/tx';
import { Common } from '@ethereumjs/common';

const chain = Chain.GOERLI;
const SOURCE_VAULT_ID = '0';

const CHAIN_TO_ASSET_ID = {
  [Chain.MAINNET]: 'ETH',
  [Chain.ROPSTEN]: 'ETH_TEST',
  [Chain.GOERLI]: 'ETH_TEST3',
  [Chain.KOVAN]: 'ETH_TEST2',
  [Chain.BSC]: 'BNB_BSC',
  [Chain.BSC_TEST]: 'BNB_TEST',
  [Chain.POLYGON]: 'MATIC_POLYGON',
  [Chain.MUMBAI]: 'MATIC_POLYGON_MUMBAI',
  [Chain.RINKEBY]: 'ETH_TEST4',
  [Chain.ARBITRUM]: 'ETH-AETH',
  [Chain.FANTOM]: 'FTM_FANTOM',
  [Chain.AVALANCHE]: 'AVAX',
};

const httpProviderUrl =
  'https://goerli.infura.io/v3/6ae1b379ebdf41b7ae2dbf891e3bfa34';
const provider = new ethers.providers.JsonRpcProvider(httpProviderUrl);

async function getUnsignedRawTransactions() {
  const gasPrice = (await provider.getGasPrice()).mul(BigNumber.from(10));
  console.log('gasPrice:', gasPrice);

  const oneClickApiResponse = {
    status: 'SUCCESS',
    rpc_requests: [
      {
        method: 'eth_sendTransaction',
        params: [
          {
            data: '0x095ea7b30000000000000000000000007b5c526b7f8dfdff278b4a3e045083fba4028790000000000000000000000000000000000000000000000000016345785d8a0000',
            to: '0x8153A21dFeB1F67024aA6C6e611432900FF3dcb9',
            from: '0x3f50C6500CCd7110eb78B38A8B9679136c262Fe2',
            gasLimit: '0x0000C350',
            value: '0x0011C37937E08000',
            gasPrice: gasPrice.toHexString(),
          },
        ],
      },
    ],
  };
  return oneClickApiResponse;
}

if (!process.env.API_SECRET_PATH)
  throw new Error('FIREBLOCKS_API_SECRET_PATH is undefined');
if (!process.env.API_ADMIN_COMMUNED)
  throw new Error('FIREBLOCKS_API_KEY is undefined');
const apiSecret = fs.readFileSync(process.env.API_SECRET_PATH, 'utf8');
const fireblocksApiClient = new FireblocksSDK(
  apiSecret,
  process.env.API_ADMIN_COMMUNED,
  process.env.FIREBLOCKS_API_BASE_URL
);

const signTransaction = async ([txData]: any[]) => {
  const chainId = 5;
  const accountAddresses = await fireblocksApiClient.getDepositAddresses(
    SOURCE_VAULT_ID,
    CHAIN_TO_ASSET_ID[chain]
  );
  const defaultAccount = accountAddresses[0].address;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nonce = await provider.getTransactionCount(defaultAccount);

  const common = Common.custom({ chainId: 5 });
  const tx = new Transaction({ ...txData, nonce }, { common });
  console.log(tx);
  const content = tx.getMessageToSign().toString('hex');

  console.log('content ', content);
  const { status, id } = await fireblocksApiClient.createTransaction({
    operation: TransactionOperation.RAW,
    assetId: CHAIN_TO_ASSET_ID[chain],
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: SOURCE_VAULT_ID,
    },
    note: `Extract tx from VA ${SOURCE_VAULT_ID}`,
    extraParameters: {
      rawMessageData: {
        messages: [
          {
            content,
          },
        ],
      },
    },
  });

  let currentStatus = status;
  let txInfo: TransactionResponse;

  while (
    currentStatus != TransactionStatus.COMPLETED &&
    currentStatus != TransactionStatus.FAILED
  ) {
    try {
      console.log('keep polling for tx ' + id + '; status: ' + currentStatus);
      txInfo = await fireblocksApiClient.getTransactionById(id);
      currentStatus = txInfo.status;
    } catch (err) {
      console.log('err', err);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  if (currentStatus == TransactionStatus.FAILED) {
    throw 'Transaction failed';
  }
  // raw transaction signed
  const signature = txInfo!.signedMessages![0].signature;

  console.log('signature ', signature);

  const signedTransaction = new Transaction({
    nonce: tx.nonce,
    gasPrice: tx.gasPrice,
    gasLimit: tx.gasLimit,
    to: tx.to,
    value: tx.value,
    data: tx.data,
    s: '0x' + signature.s,
    r: '0x' + signature.r,
    v: chainId * 2 + (signature.v! + 35),
  });

  console.log('signedTransaction ', signedTransaction);
  return '0x' + signedTransaction.serialize().toString('hex');
};

// Step 1: Fetch unsigned raw transactions from our api
const main = async () => {
  const unsignedRawTxResponse = await getUnsignedRawTransactions();

  for (const rpc_request of unsignedRawTxResponse.rpc_requests) {
    // Step 2: Sign the transaction
    const signedTx = await signTransaction(rpc_request.params);

    console.log(signedTx);
    // Step 3: Submit the transaction and execute it using the provider
    const tx = await provider.sendTransaction(signedTx);
    console.log(tx);
    const txReceipt = await tx.wait();
    console.log(txReceipt);
  }
};
main();
