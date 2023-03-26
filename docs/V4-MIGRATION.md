## V4 Migration
### `X-REQUEST-ID` Response Header
Using v4 you can now use the response header `x-request-id` which correlates the request to the Fireblocks operation.

You can provide the value of this header in case you have support tickets related to an API operation, or a Github issue.

In case of API request failures the SDK throws an AxiosError that contains the following fields:
```ts
      error.response.data; // the error body
      error.response.status; // the error status code
      error.response.headers; // the error headers
```

- You can get the request-id by using the `error.response.headers['x-request-id']` field
- Another way of getting the request-id for successful operations as well, will be to provide an axios response interceptor

For example, you can provide the sdk options with an axios response interceptor:
```ts
new FireblocksSDK(privateKey, userId, serverAddress, undefined, {
        customAxiosOptions: {
            interceptors: {
                response: {
                    onFulfilled: (response) => {
                        console.log(`Request ID: ${response.headers["x-request-id"]}`);
                        return response;
                    },
                    onRejected: (error) => {
                        console.log(`Request ID: ${error.response.headers["x-request-id"]}`);
                        throw error;
                    }
                }
            }
        }
    });
```

### Removed deprecated methods
- `getVaultAccounts` method was removed. It is replaced by the `getVaultAccountsWithPageInfo` method
- `getVaultAccount` method was removed. It is replaced by the `getVaultAccountById` method
- `getExchangeAccount` was removed in favour of `getExchangeAccountById`
