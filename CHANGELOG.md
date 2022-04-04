### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

### [v2.0.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.14.0...v2.0.0)

> 4 April 2022

- feat: added pagination to vault_accounts endpoint [`#79`](https://github.com/fireblocks/fireblocks-sdk-js/pull/79)

#### [v1.14.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.13.0...v1.14.0)

> 3 March 2022

- Add assetId to gas-station configuration [`#76`](https://github.com/fireblocks/fireblocks-sdk-js/pull/76)

#### [v1.13.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.12.0...v1.13.0)

> 17 February 2022

- added get exchange by asset [`#75`](https://github.com/fireblocks/fireblocks-sdk-js/pull/75)
- Bump follow-redirects from 1.14.7 to 1.14.8 [`#74`](https://github.com/fireblocks/fireblocks-sdk-js/pull/74)
- fix typo in README.md [`#72`](https://github.com/fireblocks/fireblocks-sdk-js/pull/72)
- Bump follow-redirects from 1.14.5 to 1.14.7 [`#73`](https://github.com/fireblocks/fireblocks-sdk-js/pull/73)

#### [v1.12.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.11.1...v1.12.0)

> 4 January 2022

- add refresh balance to js sdk [`#71`](https://github.com/fireblocks/fireblocks-sdk-js/pull/71)
- Added resend transaction webhooks [`#66`](https://github.com/fireblocks/fireblocks-sdk-js/pull/66)

#### [v1.11.1](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.11.0...v1.11.1)

> 20 December 2021

- fix: add missing fields to TransactionResponse [`#69`](https://github.com/fireblocks/fireblocks-sdk-js/pull/69)

#### [v1.11.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.10.0...v1.11.0)

> 9 December 2021

- Feat added treat as gross amount flag to allocate funds request [`#63`](https://github.com/fireblocks/fireblocks-sdk-js/pull/63)

#### [v1.10.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.9.0...v1.10.0)

> 5 December 2021

- Add RequestOptions for all post request [`#64`](https://github.com/fireblocks/fireblocks-sdk-js/pull/64)
- add functionality for activate vault asset [`#62`](https://github.com/fireblocks/fireblocks-sdk-js/pull/62)

#### [v1.9.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.8.2...v1.9.0)

> 29 November 2021

- added typed message [`#48`](https://github.com/fireblocks/fireblocks-sdk-js/pull/48)
- Update pull_request_template.md [`#61`](https://github.com/fireblocks/fireblocks-sdk-js/pull/61)

#### [v1.8.2](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.8.1...v1.8.2)

> 24 November 2021

- bugfix: when Idempotency key is undefined, axios fails [`#59`](https://github.com/fireblocks/fireblocks-sdk-js/pull/59)

#### [v1.8.1](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.8.0...v1.8.1)

> 23 November 2021

- add timeout mechanism [`#58`](https://github.com/fireblocks/fireblocks-sdk-js/pull/58)

#### [v1.8.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.7.3...v1.8.0)

> 23 November 2021

- use axios instead of deprecated request-promise package [`#56`](https://github.com/fireblocks/fireblocks-sdk-js/pull/56)

#### [v1.7.3](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.7.2...v1.7.3)

> 22 November 2021

- Release drafter [`#55`](https://github.com/fireblocks/fireblocks-sdk-js/pull/55)
- Create node.js CI configuration [`#54`](https://github.com/fireblocks/fireblocks-sdk-js/pull/54)
- Update API Reference link in README [`#52`](https://github.com/fireblocks/fireblocks-sdk-js/pull/52)
- added decimals to assetTypeResponse [`#51`](https://github.com/fireblocks/fireblocks-sdk-js/pull/51)
- add off exchanges endpoints [`#42`](https://github.com/fireblocks/fireblocks-sdk-js/pull/42)
- Add forceSweep field to TransactionArguments [`#46`](https://github.com/fireblocks/fireblocks-sdk-js/pull/46)

#### [v1.7.2](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.7.1...v1.7.2)

> 7 October 2021

- added authorizationInfo field to TransactionResponse interface [`#49`](https://github.com/fireblocks/fireblocks-sdk-js/pull/49)

#### [v1.7.1](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.7.0...v1.7.1)

> 29 September 2021

- Handle empty value passed to page request [`#47`](https://github.com/fireblocks/fireblocks-sdk-js/pull/47)

#### [v1.7.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.6.4...v1.7.0)

> 20 September 2021

- Get users [`#38`](https://github.com/fireblocks/fireblocks-sdk-js/pull/38)
- add support for eip-1559 [`#36`](https://github.com/fireblocks/fireblocks-sdk-js/pull/36)
- Cursor based pagination [`#39`](https://github.com/fireblocks/fireblocks-sdk-js/pull/39)
- Gross amount flag [`#30`](https://github.com/fireblocks/fireblocks-sdk-js/pull/30)
- Add london fork fees to response [`#41`](https://github.com/fireblocks/fireblocks-sdk-js/pull/41)
- Resend webhooks [`#40`](https://github.com/fireblocks/fireblocks-sdk-js/pull/40)
- Cor 7813 blockheight blockhash in assetresponse [`#45`](https://github.com/fireblocks/fireblocks-sdk-js/pull/45)
- COR-7812 blockInfo in txn response [`#44`](https://github.com/fireblocks/fireblocks-sdk-js/pull/44)

#### [v1.6.4](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.6.3...v1.6.4)

> 21 August 2021

- Enterprise address in ADA address resposes [`df00677`](https://github.com/fireblocks/fireblocks-sdk-js/commit/df006777b4b65f850ee2f8a4c2edc6acefd2504c)

#### [v1.6.3](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.6.2...v1.6.3)

> 15 August 2021

- External tx ID [`#35`](https://github.com/fireblocks/fireblocks-sdk-js/pull/35)

#### [v1.6.2](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.6.1...v1.6.2)

> 27 July 2021

- Change minAmountThreshold to optional [`5b69aa0`](https://github.com/fireblocks/fireblocks-sdk-js/commit/5b69aa0695f48a413f10dc8ddab7207f23e66993)

#### [v1.6.1](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.22...v1.6.1)

> 20 July 2021

- Add off exchange custody types [`#34`](https://github.com/fireblocks/fireblocks-sdk-js/pull/34)
- feat(fireblocks-sdk): bring your own auth provider [`#29`](https://github.com/fireblocks/fireblocks-sdk-js/pull/29)

#### [v1.5.22](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.21...v1.5.22)

> 15 June 2021

- Make id property optional [`2c2091f`](https://github.com/fireblocks/fireblocks-sdk-js/commit/2c2091fc7d298a1eb7640da58c027cce896f1567)

#### [v1.5.21](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.20...v1.5.21)

> 10 May 2021

- Cor 6703 list unstpent txo [`#27`](https://github.com/fireblocks/fireblocks-sdk-js/pull/27)

#### [v1.5.20](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.19...v1.5.20)

> 1 May 2021

- Freeze/Unfreeze transaction [`dccebcf`](https://github.com/fireblocks/fireblocks-sdk-js/commit/dccebcf3cb14574bf839976dfe327f59cf69bc1e)

#### [v1.5.19](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.18...v1.5.19)

> 29 April 2021

- Update depositAddressResponse [`b911d77`](https://github.com/fireblocks/fireblocks-sdk-js/commit/b911d7741d35e819816fef28ce4f2dd3e0f375be)

#### [v1.5.18](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.17...v1.5.18)

> 26 April 2021

- Off exchange [`#26`](https://github.com/fireblocks/fireblocks-sdk-js/pull/26)

#### [v1.5.17](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.16...v1.5.17)

> 10 April 2021

- Fix typo in getVaultBalanceByAsset [`f1e0368`](https://github.com/fireblocks/fireblocks-sdk-js/commit/f1e0368aa2ee7857bdc18e65d6da64e7cfe5cc65)

#### [v1.5.16](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.15...v1.5.16)

> 29 March 2021

- Use random nonce, align CreateVaultAssetResponse with api [`e6cb804`](https://github.com/fireblocks/fireblocks-sdk-js/commit/e6cb8044fc263be4d8cebff5299d878708711be7)

#### [v1.5.15](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.14...v1.5.15)

> 1 March 2021

- Add get_vault_balance_by_asset & Update query parameters [`#22`](https://github.com/fireblocks/fireblocks-sdk-js/pull/22)

#### [v1.5.14](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.13...v1.5.14)

> 22 February 2021

- Add address validation [`#23`](https://github.com/fireblocks/fireblocks-sdk-js/pull/23)

#### [v1.5.13](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.12...v1.5.13)

> 10 February 2021

- Make note optional [`263b5c4`](https://github.com/fireblocks/fireblocks-sdk-js/commit/263b5c4196d0e27370fefc1d1a1cdc7d29b12915)

#### [v1.5.12](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.11...v1.5.12)

> 2 February 2021

- Add idempotency key to createTransaction [`5f51eca`](https://github.com/fireblocks/fireblocks-sdk-js/commit/5f51ecaee96a8438fed931a71ef016f161a86f4d)

#### [v1.5.11](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.10...v1.5.11)

> 31 January 2021

- one time address support [`#19`](https://github.com/fireblocks/fireblocks-sdk-js/pull/19)
- vault assets balance overview [`#21`](https://github.com/fireblocks/fireblocks-sdk-js/pull/21)
- Filter vaultAccounts by name [`#18`](https://github.com/fireblocks/fireblocks-sdk-js/pull/18)

#### [v1.5.10](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.9...v1.5.10)

> 26 January 2021

- Unfreeze tx [`#17`](https://github.com/fireblocks/fireblocks-sdk-js/pull/17)
- Add max spendable amount operation [`#16`](https://github.com/fireblocks/fireblocks-sdk-js/pull/16)
- Add support for multiple destinations [`#15`](https://github.com/fireblocks/fireblocks-sdk-js/pull/15)

#### [v1.5.9](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.8...v1.5.9)

> 20 December 2020

- Update fireblocks-sdk.ts [`#13`](https://github.com/fireblocks/fireblocks-sdk-js/pull/13)
- RBF-Drop-Transaction [`#12`](https://github.com/fireblocks/fireblocks-sdk-js/pull/12)

#### [v1.5.8](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.7...v1.5.8)

> 27 November 2020

- Add contract call [`8cb5269`](https://github.com/fireblocks/fireblocks-sdk-js/commit/8cb5269404efbf8cba07b810c10c5c19a34f47b0)

#### [v1.5.7](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.6...v1.5.7)

> 26 November 2020

- support fee level [`#9`](https://github.com/fireblocks/fireblocks-sdk-js/pull/9)

#### [v1.5.6](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.5...v1.5.6)

> 7 November 2020

- Gas station [`#10`](https://github.com/fireblocks/fireblocks-sdk-js/pull/10)
- add extra params [`#8`](https://github.com/fireblocks/fireblocks-sdk-js/pull/8)

#### [v1.5.5](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.4...v1.5.5)

> 20 October 2020

- Support raw messages [`#7`](https://github.com/fireblocks/fireblocks-sdk-js/pull/7)

#### [v1.5.4](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.3...v1.5.4)

> 8 September 2020

- Add types for legacy addresses [`1188875`](https://github.com/fireblocks/fireblocks-sdk-js/commit/11888757bcdf6622674cfb7f02b4f47c6f8efa4d)

#### [v1.5.3](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.2...v1.5.3)

> 18 August 2020

- Update dependencies [`d70015b`](https://github.com/fireblocks/fireblocks-sdk-js/commit/d70015b58b6313d9377c634d23892ae117999dd5)

#### [v1.5.2](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.1...v1.5.2)

> 18 August 2020

- support manual-confirmations [`#5`](https://github.com/fireblocks/fireblocks-sdk-js/pull/5)

#### [v1.5.1](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.5.0...v1.5.1)

> 15 July 2020

- Fees endpoints [`68cac47`](https://github.com/fireblocks/fireblocks-sdk-js/commit/68cac470cfa30cca3eb243816c82a180d72bd180)

#### [v1.5.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.4.6...v1.5.0)

> 13 July 2020

- Transfer assist [`#3`](https://github.com/fireblocks/fireblocks-sdk-js/pull/3)
- add more types of filters [`#2`](https://github.com/fireblocks/fireblocks-sdk-js/pull/2)

#### [v1.4.6](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.4.5...v1.4.6)

> 24 June 2020

- Rename AML endpoints and fields [`d2df748`](https://github.com/fireblocks/fireblocks-sdk-js/commit/d2df7488a981568344b577a220a5f9557bd4c2e3)

#### [v1.4.5](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.4.4...v1.4.5)

> 15 June 2020

#### [v1.4.4](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.4.3...v1.4.4)

> 15 June 2020

- Support setting AML user ID [`fae99f5`](https://github.com/fireblocks/fireblocks-sdk-js/commit/fae99f511801fbc7402c85e22fc144ce0d3aa09f)

#### [v1.4.3](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.4.2...v1.4.3)

> 14 May 2020

- Fix address description editing [`3beed06`](https://github.com/fireblocks/fireblocks-sdk-js/commit/3beed06848610c82ddd0c22efc9762cbba8380d7)

#### [v1.4.2](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.4.1...v1.4.2)

> 18 April 2020

- Modify return type for hide and unhide [`37aa8cd`](https://github.com/fireblocks/fireblocks-sdk-js/commit/37aa8cda95a0eff826d38bcbd6f2cfd920ccc726)

#### [v1.4.1](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.4.0...v1.4.1)

> 18 April 2020

- Support for hidden accounts [`71538c7`](https://github.com/fireblocks/fireblocks-sdk-js/commit/71538c7fd09b2ba3cfdf4c4a66d958245934b14f)

#### [v1.4.0](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.2.6...v1.4.0)

> 2 April 2020

- Deprecate unused status, upgrade tslint [`597233a`](https://github.com/fireblocks/fireblocks-sdk-js/commit/597233a85c7b8f3a741253369cb87600c83afbf8)
- Statuses changes + Compound addition [`1f098bd`](https://github.com/fireblocks/fireblocks-sdk-js/commit/1f098bdc03bc19c39c45064fc40b6b2387823aab)
- Status fix [`bc0dc7a`](https://github.com/fireblocks/fireblocks-sdk-js/commit/bc0dc7a0ecf3c8bb0a98aafc9499f4603339da80)

#### [v1.2.6](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.2.5...v1.2.6)

> 20 February 2020

- Increased exp to be 55sec [`7677a57`](https://github.com/fireblocks/fireblocks-sdk-js/commit/7677a577d3ee2213c99661b38a3dd04d6e733091)

#### [v1.2.5](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.2.4...v1.2.5)

> 17 February 2020

- Add getTransactions orderBy [`26c1d13`](https://github.com/fireblocks/fireblocks-sdk-js/commit/26c1d13c249d8a4b223bd24f97a67718d2fd5d25)

#### [v1.2.4](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.2.3...v1.2.4)

> 17 February 2020

- Add getTransactions limit param [`2d43756`](https://github.com/fireblocks/fireblocks-sdk-js/commit/2d437565f6b54eb8e3ca73027ced51653b347ad3)

#### [v1.2.3](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.2.2...v1.2.3)

> 4 February 2020

- Minor fixes and documentation [`2996e11`](https://github.com/fireblocks/fireblocks-sdk-js/commit/2996e11e0b7f0c4993d7f644f4f7a72594beb027)

#### [v1.2.2](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.2.1...v1.2.2)

> 15 January 2020

- Add support for fiat accounts [`e71b13c`](https://github.com/fireblocks/fireblocks-sdk-js/commit/e71b13cc7e6938ae7a654096975ce2260e5b3796)

#### [v1.2.1](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.13...v1.2.1)

> 8 December 2019

- API updates for network and EOS [`433af47`](https://github.com/fireblocks/fireblocks-sdk-js/commit/433af47be4a388e248bc7dd358dfa257b267b9f6)

#### [v1.0.13](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.12...v1.0.13)

> 11 November 2019

- Update types [`89a5208`](https://github.com/fireblocks/fireblocks-sdk-js/commit/89a520851e13c2405a113bbd236a59d5c1cda27a)

#### [v1.0.12](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.11...v1.0.12)

> 23 October 2019

- Add deletion methods [`f9c303f`](https://github.com/fireblocks/fireblocks-sdk-js/commit/f9c303fe4c865a5f8cf6a8b47a302b366a894b94)

#### [v1.0.11](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.10...v1.0.11)

> 22 October 2019

- Add API methods [`4efe26c`](https://github.com/fireblocks/fireblocks-sdk-js/commit/4efe26caffaf57d3eed7bf9ff71812dff86c25c0)

#### [v1.0.10](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.8...v1.0.10)

> 25 September 2019

- Add additional methods [`8ea6245`](https://github.com/fireblocks/fireblocks-sdk-js/commit/8ea6245aeb29b994b0cfec854504760e4cabe6f7)

#### [v1.0.8](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.7...v1.0.8)

> 15 September 2019

- Add API methods [`d935b61`](https://github.com/fireblocks/fireblocks-sdk-js/commit/d935b61f20d512d48b5a0ffc8661962421e7d66e)

#### [v1.0.7](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.6...v1.0.7)

> 10 September 2019

- Remove unneeded dependency [`4a43f3b`](https://github.com/fireblocks/fireblocks-sdk-js/commit/4a43f3b7f7db9cce9eef112d9bd800774885f3c9)

#### [v1.0.6](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.5...v1.0.6)

> 10 September 2019

- Add API methods [`cea6c95`](https://github.com/fireblocks/fireblocks-sdk-js/commit/cea6c95355b3ae08e0fa741676d8898508260793)
- Increased exp period to 20sec [`a71ac40`](https://github.com/fireblocks/fireblocks-sdk-js/commit/a71ac4036c7c2061373cd0021ebde1d0ae55dc77)

#### [v1.0.5](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.4...v1.0.5)

> 4 September 2019

- Update readme [`0267dfc`](https://github.com/fireblocks/fireblocks-sdk-js/commit/0267dfc16d5f62e9f01c6538ca2ee8fb244415aa)
- Add gasPrice parameter to tx [`bbf191c`](https://github.com/fireblocks/fireblocks-sdk-js/commit/bbf191cee45da47829a3015ba6c16f42c04952ea)

#### [v1.0.4](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.3...v1.0.4)

> 3 September 2019

- Update README.md [`04f6769`](https://github.com/fireblocks/fireblocks-sdk-js/commit/04f6769189efe7c261cbc031f878f7659abcaff3)
- Update README.md [`1c533d6`](https://github.com/fireblocks/fireblocks-sdk-js/commit/1c533d6a40f12e0e793ae41cf6bfed4ea8ba7f60)
- Update README.md [`a154d1a`](https://github.com/fireblocks/fireblocks-sdk-js/commit/a154d1a7f2b6be2a1c3680c5c213556d03ca4cd3)

#### [v1.0.3](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.2...v1.0.3)

> 3 September 2019

#### [v1.0.2](https://github.com/fireblocks/fireblocks-sdk-js/compare/v1.0.1...v1.0.2)

> 3 September 2019

- Update README.md [`a1edaad`](https://github.com/fireblocks/fireblocks-sdk-js/commit/a1edaad2b55ecb7f8d44b8479ae86339c7891e2e)

#### v1.0.1

> 3 September 2019

- Remove package lock [`6fd1c56`](https://github.com/fireblocks/fireblocks-sdk-js/commit/6fd1c5664bf6dadeab8c3849184064e921452537)
- Initial commit [`a6e63b4`](https://github.com/fireblocks/fireblocks-sdk-js/commit/a6e63b40442f67c6425c53024a9af7fac7bb12dd)
- Add API client [`0a0fa1c`](https://github.com/fireblocks/fireblocks-sdk-js/commit/0a0fa1ca8389ceb28bde9e88bf46582196ab3ce3)
