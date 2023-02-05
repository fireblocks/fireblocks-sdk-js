require('dotenv').config();
const fs = require('fs');
const { FireblocksSDK } = require('fireblocks-sdk');
const { ApiTokenProvider } = require('../dist/api-token-provider');

const apiSecret = fs.readFileSync(process.env.API_SECRET_PATH, 'utf8');
const apiKey = process.env.API_ADMIN_COMMUNED;

// const fireblocks = new FireblocksSDK(apiSecret, apiKey);
// const tokenProvider = new ApiTokenProvider(apiSecret, apiKey);
