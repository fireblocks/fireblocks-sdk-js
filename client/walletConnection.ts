import * as dotenv from 'dotenv';
dotenv.config();

import {
  CreateWalletConnectPayload,
  FireblocksSDK,
  Web3ConnectionFeeLevel,
  Web3ConnectionType,
} from 'fireblocks-sdk';
import * as fs from 'fs';

const apiSecret = fs.readFileSync(process.env.API_SECRET_PATH_STAKING!, 'utf-8');
const apiKey = process.env.API_SIGNER_STAKING!;

const fireblocks = new FireblocksSDK(apiSecret, apiKey);

const createWalletConnection = async (
  type: Web3ConnectionType,
  payload: CreateWalletConnectPayload
) => {
  const WalletConnectData = await fireblocks.createWeb3Connection(type, payload);
  return WalletConnectData;
};

const submitWeb3Connection = async (
  type: Web3ConnectionType,
  sessionId: string,
  approve: boolean
) => {
  const web3Connection = await fireblocks.submitWeb3Connection(
    type,
    sessionId,
    approve
  );
  return web3Connection;
};

const getWeb3Connections = async () => {
  const { data } = await fireblocks.getWeb3Connections();
  const web3ConnectionData = data.map((connection) => {
    const data = {
      sessionId: connection.id,
      connectionType: connection.connectionType,
    };
    return data;
  });
  console.log('web3ConnectionsApproval -->', data);
  return console.log(web3ConnectionData);
};
// getWeb3Connections();

const main = async () => {
  const walletConnectPayload = {
    vaultAccountId: 0,
    feeLevel: Web3ConnectionFeeLevel.MEDIUM,
    uri: 'wc:0983d607-4a1b-4053-acf3-1f0932029d68@1?bridge=https%3A%2F%2Fu.bridge.walletconnect.org&key=7607b4f9690b91130d6b8c440bc4381d802303c78843285e42511a789c7c4ece',
    chainIds: ['ETH_TEST3'],
  };

  try {
    const { id } = await createWalletConnection(
      Web3ConnectionType.WALLET_CONNECT,
      walletConnectPayload
    );
    const connectionData = await submitWeb3Connection(
      Web3ConnectionType.WALLET_CONNECT,
      id,
      true
    );
    console.log('sessionId: ', id, 'connectionData: ', connectionData);
  } catch (error) {
    console.error(error);
  }
};
main();

const removeWeb3Connection = async (type: Web3ConnectionType, sessionId: string) => {
  try {
    const removedWeb3Connection = await fireblocks.removeWeb3Connection(
      type,
      sessionId
    );
    console.log('removedWeb3Connection', removedWeb3Connection);
  } catch (error) {
    console.error(error);
  }
};

// removeWeb3Connection(
//   Web3ConnectionType.WALLET_CONNECT,
//   'b73b2a86-5fa1-44e5-a622-d06c15fa35a2'
// );
