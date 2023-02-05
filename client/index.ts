import * as dotenv from 'dotenv';
dotenv.config();

import {
  CreateWalletConnectPayload,
  FireblocksSDK,
  Web3ConnectionFeeLevel,
  Web3ConnectionType,
  NFTOwnershipFilter,
} from 'fireblocks-sdk';
import * as fs from 'fs';
import { transferPayload, contractPayload } from './payloads';

const apiSecret = fs.readFileSync(process.env.API_SECRET_PATH_STAKING!, 'utf-8');
const apiKeyAdmin = process.env.API_EDITOR_STAKING!;

const fireblocks = new FireblocksSDK(apiSecret, apiKeyAdmin);

async function getFeeForAsset(assetId: string) {
  const feeResult = await fireblocks.getFeeForAsset(assetId);
  return console.log(feeResult);
}

// getFeeForAsset('BNB_TEST');

const getOwnedNFTs = async (filters?: NFTOwnershipFilter) => {
  const nftData = await fireblocks.getOwnedNFTs(filters);
  return console.log(`nftData`, nftData.data);
};

// getOwnedNFTs({ vaultAccountId: '10' });

const refreshNFTMetadata = async (assetId: string) => {
  const refreshNFTMetadata = await fireblocks.refreshNFTMetadata(assetId);
  return console.log(`refreshNFTMetadata`, refreshNFTMetadata);
};
// refreshNFTMetadata('NFT-58137147060240427bc07eaeeb1324fee717e947');
//NFT-b7483faa1a431ef83a32c3b7a84952ff6f145d32'

const refreshNFTOwnershipByVault = async (
  vaultAccountId: string,
  blockchainDescriptor: string
) => {
  const refreshAllMetaData = await fireblocks.refreshNFTOwnershipByVault(
    vaultAccountId,
    blockchainDescriptor
  );
  return console.log('refreshAllMetaData', refreshAllMetaData);
};

// refreshNFTOwnershipByVault('1', 'ETH');

const getNFT = async (assetId: string) => {
  const dataNFT = await fireblocks.getNFT(assetId);
  console.log(`dataNFT`, dataNFT);
};
// getNFT('NFT-58137147060240427bc07eaeeb1324fee717e947');

const createContractCall = async (payload: any) => {
  const txData = await fireblocks.createTransaction(payload);
  console.log(`txData`, txData);
};

// createContractCall(contractPayload);

const getVaultById = async (id: string) => {
  const vault = await fireblocks.getVaultAccountById(id);
  console.log(`vault`, vault);
};
// getVaultById('0');

const gasStationInfo = async () => {
  const gasStationInfo = await fireblocks.getGasStationInfo();
  console.log('gasStationInfo', gasStationInfo);
};
// gasStationInfo();

const hideVault = async (vaultAccountId: string) => {
  const vaultAsset = await fireblocks.hideVaultAccount(vaultAccountId);
  console.log('vaultAsset', vaultAsset);
};
// hideVault('0');

const unhideVault = async (vaultAccountId: string) => {
  const vaultAsset = await fireblocks.unhideVaultAccount(vaultAccountId);
  console.log('vaultAsset', vaultAsset);
};
// unhideVault('0');

const estimateFee = async (payload: any) => {
  const estimationFee = await fireblocks.estimateFeeForTransaction(payload);
  console.log('estimationFee', estimationFee);
};
// estimateFee(transferPayload);

const walletConnection = async (
  type: Web3ConnectionType,
  payload: CreateWalletConnectPayload
) => {
  const WalletConnectData = await fireblocks.createWeb3Connection(type, payload);
  return WalletConnectData.id;
};

// walletConnection(Web3ConnectionType.WALLET_CONNECT, walletConnectPayload);

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
  console.log('web3Connection', web3Connection);
};

const main = async () => {
  const walletConnectPayload = {
    vaultAccountId: 0,
    feeLevel: Web3ConnectionFeeLevel.MEDIUM,
    uri: 'wc:beeabbcc-48ca-4bae-8f4d-88d4b17973fb@1?bridge=https%3A%2F%2F5.bridge.walletconnect.org&key=ff2a757eafb613133e7512e6f9c6da6cd3421b2992319150b77111db0b8871dc',
    chainIds: ['MATIC_POLYGON_MUMBAI'],
  };

  const walletConnectionId = await walletConnection(
    Web3ConnectionType.WALLET_CONNECT,
    walletConnectPayload
  );

  await submitWeb3Connection(
    Web3ConnectionType.WALLET_CONNECT,
    walletConnectionId,
    true
  );
};
// main();

const getWeb3Connections = async () => {
  const web3Connections = await fireblocks.getWeb3Connections();
  console.log('web3ConnectionsApproval -->', web3Connections);
};
// getWeb3Connections();

const removeWeb3Connection = async (type: Web3ConnectionType, sessionId: string) => {
  const removedWeb3Connection = await fireblocks.removeWeb3Connection(
    type,
    sessionId
  );
  console.log('removedWeb3Connection', removedWeb3Connection);
};

// removeWeb3Connection(
//   Web3ConnectionType.WALLET_CONNECT,
//   '766cc819-ecd0-4462-b3cb-df324e448fd2'
// );
