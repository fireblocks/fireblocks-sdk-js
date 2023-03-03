/* eslint-disable no-console */

import 'dotenv/config';

import * as fs from 'fs';

import { BigNumber, PopulatedTransaction, ethers } from 'ethers';
import { Chain, FireblocksSDK } from 'fireblocks-defi-sdk';
import { PeerType, TransactionOperation, TransactionStatus } from 'fireblocks-sdk';

import { createHash } from 'crypto';

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

const finalTransactionStates = [
  TransactionStatus.COMPLETED,
  TransactionStatus.FAILED,
  TransactionStatus.CANCELLED,
  TransactionStatus.BLOCKED,
  TransactionStatus.REJECTED,
];

const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.ankr.com/eth_goerli'
);

let signer: ethers.Wallet;
if (process.env.MY_WALLET_PRIVATE_KEY) {
  signer = new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider);
  console.log('\nWallet address is : ', signer.address);
} else {
  console.log('Wallet private key is not defined in environment variables');
  process.exit();
}

async function getUnsignedRawTransactions() {
  const oneClickApiResponse = {
    status: 'SUCCESS',
    rpc_requests: [
      {
        method: 'eth_sendTransaction',
        params: {
          data: '0x095ea7b30000000000000000000000007b5c526b7f8dfdff278b4a3e045083fba4028790000000000000000000000000000000000000000000000000016345785d8a0000',
          to: '0x8153A21dFeB1F67024aA6C6e611432900FF3dcb9',
          gasLimit: '0x0186a0',
        },
      },
    ],
  };
  return oneClickApiResponse;
}

async function signTransaction(
  fireblocksApiClient: FireblocksSDK,
  sourceVaultId: string,
  rpc_request: PopulatedTransaction
) {
  const serializedTx = ethers.utils.serializeTransaction(rpc_request);

  const hash = createHash('sha256').update(serializedTx, 'utf8').digest();
  const content = createHash('sha256').update(hash).digest('hex');

  const { status, id } = await fireblocksApiClient.createTransaction({
    operation: TransactionOperation.RAW,
    assetId: CHAIN_TO_ASSET_ID[chain],
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: sourceVaultId,
    },
    extraParameters: {
      rawMessageData: { messages: [{ content: content }] },
    },
  });

  let currentStatus = status;
  let txInfo;

  do {
    try {
      console.log('keep polling for tx ' + id + '; status: ' + currentStatus);
      txInfo = await fireblocksApiClient.getTransactionById(id);
      currentStatus = txInfo.status;
    } catch (err) {
      console.log('err', err);
    }
    await new Promise((r) => setTimeout(r, 1000));
  } while (
    !finalTransactionStates.includes(
      TransactionStatus[currentStatus as keyof typeof TransactionStatus]
    )
  );

  if (
    txInfo === undefined ||
    txInfo.signedMessages === undefined ||
    txInfo.signedMessages[0] === undefined
  )
    throw new Error('Failed signing the message');

  const signature = txInfo.signedMessages[0].signature;
  console.log('signature:', signature);

  const encodedSig =
    Buffer.from([Number.parseInt(signature.v!.toString(), 16) + 35 + 10]).toString(
      'hex'
    ) + signature.fullSig;

  return `0x${encodedSig}`;
}

async function executeTransactions(encodedTx: string) {
  const tx = await provider.sendTransaction(encodedTx);
  await tx.wait();
  console.log('tx hash: ', tx.hash);
}
async function main() {
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

  // Step 1: Fetch unsigned raw transactions from our api
  const unsignedRawTxResponse = await getUnsignedRawTransactions();

  for (const rpc_request of unsignedRawTxResponse.rpc_requests) {
    const populatedTx: PopulatedTransaction = {
      data: rpc_request.params.data,
      to: rpc_request.params.to,
      gasLimit: BigNumber.from(rpc_request.params.gasLimit),
      chainId: 5,
    };

    // Step 2: Raw sign the transaction data using fireblocks raw signing api
    const signedTransactions = await signTransaction(
      fireblocksApiClient,
      SOURCE_VAULT_ID,
      populatedTx
    );

    // Step 3: Execute transaction using provider for now.
    await executeTransactions(signedTransactions);
  }
}

(async () => {
  await main();
})();
