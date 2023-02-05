export const contractPayload = {
  assetId: 'ETH_TEST3',
  // operation: 'CONTRACT_CALL',
  amount: '0.005',
  source: {
    type: 'VAULT_ACCOUNT',
    id: '0',
  },
  destination: {
    type: 'ONE_TIME_ADDRESS',
    oneTimeAddress: {
      address: '0x39Ec448b891c476e166b3C3242A90830DB556661',
    },
  },
  extraParameters: {
    contractCallData:
      '095ea7b30000000000000000000000003f50c6500ccd7110eb78b38a8b9679136c262fe200000000000000000000000000000000000000000000000000000000132e4881' /* Data Payload */,
  },
};

export const transferPayload = {
  assetId: 'ETH_TEST3',
  amount: '0.5',
  source: {
    type: 'VAULT_ACCOUNT',
    id: '0',
  },
  destination: {
    type: 'VAULT_ACCOUNT',
    id: '2',
  },
};
