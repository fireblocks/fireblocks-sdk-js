import * as dotenv from 'dotenv';
dotenv.config();

import {
  CreateWalletConnectPayload,
  FireblocksSDK,
  Web3ConnectionFeeLevel,
  Web3ConnectionType,
  NFTOwnershipFilter,
  RequestOptions,
  TransactionArguments,
} from 'fireblocks-sdk';
import * as fs from 'fs';
import { transferPayload, contractPayload } from './payloads';

const apiSecret = fs.readFileSync(process.env.API_SECRET_PATH!, 'utf-8');
const apiKey = process.env.API_ADMIN_COMMUNED!;

const fireblocks = new FireblocksSDK(apiSecret, apiKey);

async function getFeeForAsset(assetId: string) {
  const feeResult = await fireblocks.getFeeForAsset(assetId);
  return console.log(feeResult);
}
// getFeeForAsset('ETH_TEST3');

const estimateTransactionFee = async (payload: any) => {
  const estimationFee = await fireblocks.estimateFeeForTransaction(payload);
  console.log('estimationFee', estimationFee);
};
// estimateTransactionFee(transferPayload);

const getOwnedNFTs = async (filters?: NFTOwnershipFilter) => {
  const nftData = await fireblocks.getOwnedNFTs(filters);
  return console.log(`nftData`, nftData.data);
};

// getOwnedNFTs({ vaultAccountIds: ['0'] });

const refreshNFTMetadata = async (assetId: string) => {
  const refreshNFTMetadata = await fireblocks.refreshNFTMetadata(assetId);
  return console.log(`refreshNFTMetadata`, refreshNFTMetadata);
};
// refreshNFTMetadata('NFT-ff41843e3f4d5fb4a04d27c96cff0fc739076176');
//NFT-b7483faa1a431ef83a32c3b7a84952ff6f145d32'

const refreshNFTOwnershipByVault = async (
  vaultAccountId: string,
  blockchainDescriptor: string
) => {
  try {
    const refreshAllMetaData = await fireblocks.refreshNFTOwnershipByVault(
      vaultAccountId,
      blockchainDescriptor
    );
    return console.log('refreshAllMetaData', refreshAllMetaData);
  } catch (error) {
    console.error(error);
  }
};

// refreshNFTOwnershipByVault('0', 'MATIC_POLYGON');

const getNFT = async (assetId: string) => {
  const dataNFT = await fireblocks.getNFT(assetId);
  console.log(`dataNFT`, dataNFT);
};
// getNFT('NFT-58137147060240427bc07eaeeb1324fee717e947');

const createTransaction = async (payload: any, idempotencyKey?: RequestOptions) => {
  try {
    const txData = await fireblocks.createTransaction(payload, idempotencyKey);
    return console.log(`txData`, txData);
  } catch (error) {
    console.error(error);
  }
};

// createTransaction(transferPayload, { idempotencyKey: 'FoieringFoiering' });
// createTransaction(transferPayload);

const createVaultAsset = async (vaultAccountId: string, assetId: string) => {
  try {
    const createVaultAssetResponse = await fireblocks.createVaultAsset(
      vaultAccountId,
      assetId
    );
    return console.log('createVaultAssetResponse', createVaultAssetResponse);
  } catch (error) {
    console.error(error);
  }
};
// createVaultAsset('7', 'BNB_BSC');

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
// hideVault('7');

const unhideVault = async (vaultAccountId: string) => {
  const vaultAsset = await fireblocks.unhideVaultAccount(vaultAccountId);
  console.log('vaultAsset', vaultAsset);
};
// unhideVault('7');

const getTransactionById = async (txId: string) => {
  const getTransaction = await fireblocks.getTransactionById(txId);
  return console.log(getTransaction);
};
// getTransactionById('fb0a4b49-95f7-4fb0-bf5b-06908dd1ac78');

const getAddresses = async (vaultAccountId: string, assetId: string) => {
  const addresses = await fireblocks.getDepositAddresses(vaultAccountId, assetId);
  console.log('addresses:', addresses);
};
// getAddresses('0', 'ADA_TEST');

const getExchange = async () => {
  const exchangeData = await fireblocks.getExchangeAccounts();
  return console.log(exchangeData);
};

// getExchange();
