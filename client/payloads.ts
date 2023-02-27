import { PeerType, TransactionArguments } from 'fireblocks-sdk';

export const contractPayload = {
  assetId: 'ETH_TEST3',
  operation: 'CONTRACT_CALL',
  amount: '0',
  source: {
    type: 'VAULT_ACCOUNT',
    id: '0',
  },
  destination: {
    type: 'ONE_TIME_ADDRESS',
    oneTimeAddress: {
      address: '0x35a006C48a6E4A397c880f743F0c5818Bcdc9595',
    },
  },
  extraParameters: {
    contractCallData:
      '095ea7b30000000000000000000000003f50c6500ccd7110eb78b38a8b9679136c262fe2000000000000000000000000000000000000000000000000000000000000000a' /* Data Payload */,
  },
};

export const transferPayload: TransactionArguments = {
  assetId: 'ETH_TEST3',
  amount: '0.003',
  source: {
    type: PeerType.VAULT_ACCOUNT,
    id: '110',
  },
  destination: {
    type: PeerType.INTERNAL_WALLET,
    id: '2',
  },
  gasPrice: 5,
};
