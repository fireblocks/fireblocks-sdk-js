import { AxiosResponseHeaders } from "axios";

export interface Web3PagedResponse<T> {
    data: T[];
    paging?: Paging;
}

export type APIResponseHeaders = AxiosResponseHeaders & {"x-request-id"?: string};

export interface VaultAccountResponse {
    id: string;
    name: string;
    hiddenOnUI?: boolean;
    assets?: AssetResponse[];
    customerRefId?: string;
    autoFuel?: boolean;
}

export enum VirtualAffiliation {
    OFF_EXCHANGE = "OFF_EXCHANGE",
    DEFAULT = "DEFAULT"
}

export interface BalanceRewardInfo {
    pendingRewards: string;
}

export interface AssetResponse {
    id: string;
    total: string;
    /**
     * @deprecated Replaced by "total"
     */
    balance?: string;
    lockedAmount?: string;
    available?: string;
    pending?: string;
    selfStakedCPU?: string;
    selfStakedNetwork?: string;
    pendingRefundCPU?: string;
    pendingRefundNetwork?: string;
    totalStakedCPU?: string;
    totalStakedNetwork?: string;
    rewardInfo?: BalanceRewardInfo;
    blockHeight?: string;
    blockHash?: string;
    allocatedBalances?: {
        allocationId: string;
        thirdPartyAccountId?: string;
        affiliation?: VirtualAffiliation;
        virtualType?: VirtualType;
        total: string;
        available: string;
        pending?: string;
        frozen?: string;
        locked?: string;
    }[];
}

export interface UnfreezeTransactionResponse {
    success: boolean;
}

export interface VaultAssetResponse {
    id: string;
    address: string;
    legacyAddress: string;
    enterpriseAddress?: string;
    tag: string;
    eosAccountName?: string;
    status?: VaultAssetActivationStatus;
    activationTxId?: string;
}

export enum VaultAssetActivationStatus {
    PENDING_ACTIVATION = "PENDING_ACTIVATION",
    ACTIVATION_FAILED = "ACTIVATION_FAILED",
    READY = "READY"
}

export interface WalletContainerResponse<WalletAssetType> {
    id: string;
    name: string;
    assets: WalletAssetType[];
    customerRefId?: string;
}

export interface ExternalWalletAsset {
    id: string;
    status: string;
    address?: string;
    tag?: string;
    activationTime?: string;
}

export interface InternalWalletAsset extends ExternalWalletAsset {
    balance: string;
}

export interface CreateTransactionResponse {
    id: string;
    status: string;
    systemMessages?: ISystemMessageInfo[];
}

export interface EstimateFeeResponse {
    low: EstimatedFee;
    medium: EstimatedFee;
    high: EstimatedFee;
}

export interface EstimateTransactionFeeResponse {
    low: EstimatedTransactionFee;
    medium: EstimatedTransactionFee;
    high: EstimatedTransactionFee;
}

export interface EstimatedFee {
    networkFee?: string;
    gasPrice?: string;
    feePerByte?: string;
    baseFee?: string;
    priorityFee?: string;
}

export interface EstimatedTransactionFee {
    networkFee?: string;
    gasPrice?: string;
    gasLimit?: string;
    feePerByte?: string;
    baseFee?: string;
    priorityFee?: string;
}

export interface TransferPeerPath {
    type?: PeerType;
    id?: string;
    virtualId?: string;
    virtualType?: VirtualType;
    address?: string;
}

export interface DestinationTransferPeerPath {
    type: PeerType;
    id?: string;
    virtualId?: string;
    virtualType?: VirtualType;
    oneTimeAddress?: IOneTimeAddress;
}

export interface IOneTimeAddress {
    address: string;
    tag?: string;
}

export interface DepositAddressResponse {
    assetId?: string;
    address: string;
    tag?: string;
    description?: string;
    type?: string;
    customerRefId?: string;
    addressFormat?: string;
    legacyAddress?: string;
    enterpriseAddress?: string;
}

export interface GenerateAddressResponse {
    address: string;
    tag?: string;
    legacyAddress?: string;
    enterpriseAddress?: string;
}

export enum SigningAlgorithm {
    MPC_ECDSA_SECP256K1 = "MPC_ECDSA_SECP256K1",
    MPC_ECDSA_SECP256R1 = "MPC_ECDSA_SECP256R1",
    MPC_EDDSA_ED25519 = "MPC_EDDSA_ED25519"
}

export interface RawMessageData {
    messages: RawMessage[];
    algorithm?: SigningAlgorithm;
}

export interface RawMessage {
    content: string;
    bip44addressIndex?: number;
    bip44change?: number;
    derivationPath?: number[];
}

export interface TransactionDestination {
    amount: string | number;
    destination: DestinationTransferPeerPath;
}

export interface TransactionArgumentsFeePayerInfo {
    feePayerAccountId: string;
}

export interface TransactionArguments {
    assetId?: string;
    source?: TransferPeerPath;
    destination?: DestinationTransferPeerPath;
    amount?: number | string;
    operation?: TransactionOperation;
    fee?: number | string;
    feeLevel?: FeeLevel;
    failOnLowFee?: boolean;
    maxFee?: string;
    priorityFee?: number | string;
    gasPrice?: number | string;
    gasLimit?: number | string;
    note?: string;
    cpuStaking?: number;
    networkStaking?: number;
    autoStaking?: boolean;
    customerRefId?: string;
    extraParameters?: object;
    destinations?: TransactionDestination[];
    replaceTxByHash?: string;
    externalTxId?: string;
    treatAsGrossAmount?: boolean;
    forceSweep?: boolean;
    feePayerInfo?: TransactionArgumentsFeePayerInfo;
    travelRuleMessage?: TravelRule;
}

export type OwnershipProof = {
    type: string;
    proof: string;
};

export enum TravelRuleAddressTypeCode {
    HOME = "HOME",
    BIZZ = "BIZZ",
    GEOG = "GEOG"
}

type TravelRulePersonAddress = {
    addressType?: TravelRuleAddressTypeCode;
    department?: string;
    subDepartment?: string;
    streetName?: string;
    buildingNumber?: string;
    buildingName?: string;
    floor?: string;
    postBox?: string;
    room?: string;
    postCode?: string;
    townName?: string;
    townLocationName?: string;
    districtName?: string;
    countrySubDivision?: string;
    addressLine?: string[];
    country?: string;
};

export interface ValidateTravelRuleVaspInfo {
    transactionAsset: string;
    destination: string;
    transactionAmount: string;
    originatorVASPdid: string;
    originatorEqualsBeneficiary: boolean;
    beneficiaryVASPdid?: string;
    beneficiaryVASPname?: string;
    beneficiaryName?: string;
    beneficiaryAccountNumber?: string;
    beneficiaryAddress?: TravelRulePersonAddress;
    beneficiaryProof?: OwnershipProof;
    travelRuleBehavior?: boolean;
}

export interface ValidateCreateTravelRuleTransaction {
    transactionAsset: string;
    transactionAmount: string;
    originatorDid?: string;
    beneficiaryDid?: string;
    originatorVASPdid: string;
    beneficiaryVASPdid?: string;
    beneficiaryVASPname?: string;
    transactionBlockchainInfo?: {
        origin?: string;
        destination?: string;
        txHash?: string;
    };
    originator?: TROriginator;
    beneficiary?: TROriginator;
    pii?: PII;
    pii_url?: string;
    protocol?: string;
    notificationEmail?: string;
    originatorProof?: OwnershipProof;
    beneficiaryProof?: OwnershipProof;
    skipBeneficiaryDataValidation?: boolean;
}

export interface TravelRule {
    originatorRef?: string;
    beneficiaryRef?: string;
    originatorVASPdid: string;
    travelRuleBehavior?: boolean;
    beneficiaryVASPdid: string;
    beneficiaryVASPname?: string;
    originator: TROriginator;
    beneficiary: TRBeneficiary;
    pii?: PII;
    jsonDidKey?: string;
}

export interface TROriginator {
    originatorPersons?: TROriginatorPerson[];
    accountNumber?: string[];
}

export interface TROriginatorPerson {
    naturalPerson?: TRNaturalPerson;
    legalPerson?: TRNaturalPerson;
}

export interface TRNaturalPerson {
    name: TRName[];
    geographicAddress?: TRGeographicAddress[];
    nationalIdentification?: TRNationalIdentification;
    dateAndPlaceOfBirth?: TRDateAndPlaceOfBirth;
}

export interface TRName {
    nameIdentifier?: TRNameIdentifier[];
}

export interface TRNameIdentifier {
    primaryIdentifier?: string;
    secondaryIdentifier?: string;
}

export interface TRGeographicAddress {
    streetName?: string;
    townName?: string;
    country?: string;
    buildingNumber?: string;
    postCode?: string;
    addressType?: string;
    department?: string;
    subDepartment?: string;
    buildingName?: string;
    floor?: string;
    postBox?: string;
    room?: string;
    townLocationName?: string;
    districtName?: string;
    countrySubDivision?: string;
    addressLine?: string;
}

export interface TRNationalIdentification {
    nationalIdentifier?: string;
    nationalIdentifierType?: string;
    registrationAuthority?: string;
    countryOfIssue?: string;
}

export interface TRDateAndPlaceOfBirth {
    dateOfBirth?: string;
    placeOfBirth?: string;
}

export interface TRBeneficiary {
    beneficiaryPersons?: TRBeneficiaryPerson[];
    originatorPersons?: TROriginatorPerson[];
    accountNumber?: string[];
}

export interface TRBeneficiaryPerson {
    naturalPerson?: TRNaturalPerson;
}

interface PII {
    originator?: TROriginator;
    beneficiary?: TRBeneficiary;
}

export interface TravelRuleOptions {
    clientId: string;
    clientSecret: string;
    authURL?: string;
    audience?: string;
    audiencePII?: string;
    baseURL?: string;
    baseURLPII?: string;
    jsonDidKey?: string;
}

export interface TravelRuleEncryptionOptions {
    beneficiaryPIIDidKey?: string;
    sendToProvider?: boolean;
}

export interface TravelRuleVasp {
    did: string;
    name: string;
    verificationStatus: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    emailDomains: string;
    website: string;
    logo: string;
    legalStructure: string;
    legalName: string;
    yearFounded: string;
    incorporationCountry: string;
    isRegulated: string;
    otherNames: string;
    identificationType: string;
    identificationCountry: string;
    businessNumber: string;
    regulatoryAuthorities: string;
    jurisdictions: string;
    street: string;
    number: string;
    unit: string;
    postCode: string;
    state: string;
    certificates: string;
    description: string;
    travelRule_OPENVASP: string;
    travelRule_SYGNA: string;
    travelRule_TRISA: string;
    travelRule_TRLIGHT: string;
    travelRule_EMAIL: string;
    travelRule_TRP: string;
    travelRule_SHYFT: string;
    travelRule_USTRAVELRULEWG: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    lastSentDate: string;
    lastReceivedDate: string;
    documents: string;
    hasAdmin: boolean;
    isNotifiable: boolean;
    issuers: {
        name: {
            issuerDid: string;
        };
        nonce: {
            issuerDid: string;
        };
    };
    regulatoryStatus: string;
    supervisoryAuthority: string;
    registrationLicenseId: string;
    statusStartDate: string;
    statusExpirationDate: string;
    lastChecked: string;
    additionalInformation: string;
    subsidiaryOf: string;
    chainalysis_clusterName: string;
    pii_didkey: string;
    onboardingStatus: string;
    compliancePhase: number;
    vaspnetId: string;
    node: string;
    node_didkey: string;
    parentGateway: string;
    isActiveSender: boolean;
    isActiveReceiver: boolean;
    subsidiaries: string[];
}

export interface ValidateFullTravelRuleResult {
    isValid: boolean;
    type: string;
    beneficiaryAddressType: string;
    addressSource: string;
    beneficiaryVASPname: string;
    beneficiaryVASPdid: string;
    errors: string[];
    warnings: string[];
}

export interface ValidateTravelRuleResult {
    isValid: boolean;
    type: string;
    beneficiaryAddressType: string;
    addressSource: string;
    beneficiaryVASPdid: string;
    warnings: string[];
}

export interface TravelRuleVaspFilter {
    q?: string;
    fields?: string[];
    page?: number;
    per_page?: number;
    order?: string;
}

export enum Web3ConnectionFeeLevel {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
}

export enum FeeLevel {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface ExchangeResponse {
    id: string;
    type: string;
    name: string;
    assets: AssetResponse[];
    isSubaccount: boolean;
    status: string;
}

export interface ConvertExchangeAssetResponse {
    status: boolean;
}

export interface FiatAccountResponse {
    id: string;
    type: string;
    name: string;
    address?: string;
    assets: AssetResponse[];
}

export interface TransactionPageResponse {
    transactions: TransactionResponse[];
    pageDetails: PageDetails;
}

export interface PageDetails {
    prevPage: string;
    nextPage: string;
}

export interface RewardInfo {
    srcRewards?: string;
    destRewards?: string;
}

export interface FeePayerInfo {
    feePayerAccountId?: string;
}

export interface TransactionResponse {
    id: string;
    assetId: string;
    source: TransferPeerPathResponse;
    destination: TransferPeerPathResponse;
    amount: number;
    /**
     * @deprecated Replaced by "networkFee"
     */
    fee?: number;
    networkFee: number;
    amountUSD: number;
    netAmount: number;
    createdAt: number;
    lastUpdated: number;
    status: TransactionStatus;
    txHash: string;
    numOfConfirmations?: number;
    subStatus?: string;
    signedBy: string[];
    createdBy: string;
    rejectedBy: string;
    destinationAddress: string;
    sourceAddress?: string;
    destinationAddressDescription?: string;
    destinationTag: string;
    addressType: string;
    note: string;
    exchangeTxId: string;
    requestedAmount: number;
    serviceFee?: number;
    feeCurrency: string;
    amlScreeningResult?: AmlScreeningResult;
    customerRefId?: string;
    amountInfo?: AmountInfo;
    feeInfo?: FeeInfo;
    signedMessages?: SignedMessageResponse[];
    extraParameters?: any;
    externalTxId?: string;
    destinations?: TransactionResponseDestination[];
    blockInfo?: BlockInfo;
    authorizationInfo?: AuthorizationInfo;
    index?: number;
    rewardInfo?: RewardInfo;
    feePayerInfo?: FeePayerInfo;
}

export interface AmountInfo {
    amount?: string;
    requestedAmount?: string;
    netAmount?: string;
    amountUSD?: string;
}

export interface FeeInfo {
    networkFee?: string;
    serviceFee?: string;
    gasPrice?: string;
}

export interface TransactionResponseDestination {
    amount?: string;
    amountUSD?: string;
    amlScreeningResult?: AmlScreeningResult;
    destination?: TransferPeerPathResponse;
    authorizationInfo?: AuthorizationInfo;
}

export interface AmlScreeningResult {
    provider?: string;
    payload: any;
    screeningStatus: string;
    bypassReason: string;
    timestamp: number;
}

export interface TransferPeerPathResponse {
    id: string;
    type: PeerType;
    name?: string;
    subType?: string;
    virtualType?: VirtualType;
    virtualId?: string;
}

export interface AuthorizationInfo {
    allowOperatorAsAuthorizer: boolean;
    logic: "OR" | "AND";
    groups: {
        users: UserGroup;
        th: number
    }[];
}

export interface UserGroup {
    [id: string]: string;
}

export interface BlockInfo {
    blockHeight?: string;
    blockHash?: string;
}

export interface SignedMessageResponse {
    content: string;
    algorithm: string;
    derivationPath: number[];
    signature: {
        fullSig: string;
        r?: string;
        s?: string;
        v?: number;
    };
    publicKey: string;
}

export interface CancelTransactionResponse {
    success: boolean;
}

export interface OperationSuccessResponse {
    success: boolean;
}

export interface NetworkConnectionResponse {
    id: string;
    status: string;
    remoteNetworkId: NetworkId;
    localNetworkId: NetworkId;
    routingPolicy?: NetworkConnectionRoutingPolicy;
}

export interface NetworkIdResponse {
    id: string;
    name: string;
    isDiscoverable: boolean;
    routingPolicy?: NetworkIdRoutingPolicy;
}

interface NetworkId {
    id: string;
    name: string;
}

export interface CustomCryptoRoutingDest {
    scheme: NetworkScheme.CUSTOM;
    dstType: NetworkDestType.EXCHANGE_ACCOUNT | NetworkDestType.VAULT_ACCOUNT;
    dstId: string;
}

export interface CustomFiatRoutingDest {
    scheme: NetworkScheme.CUSTOM;
    dstType: NetworkDestType.FIAT_ACCOUNT;
    dstId: string;
}

export interface DefaultNetworkRoutingDest {
    scheme: NetworkScheme.DEFAULT;
}

export interface NoneNetworkRoutingDest {
    scheme: NetworkScheme.NONE;
}

export type NetworkConnectionCryptoRoutingDest = CustomCryptoRoutingDest | DefaultNetworkRoutingDest | NoneNetworkRoutingDest;
export type NetworkConnectionFiatRoutingDest = CustomFiatRoutingDest | DefaultNetworkRoutingDest | NoneNetworkRoutingDest;
export type NetworkIdCryptoRoutingDest = CustomCryptoRoutingDest | NoneNetworkRoutingDest;
export type NetworkIdFiatRoutingDest = CustomFiatRoutingDest | NoneNetworkRoutingDest;

export interface NetworkConnectionRoutingPolicy {
    crypto?: NetworkConnectionCryptoRoutingDest;
    sen?: NetworkConnectionFiatRoutingDest;
    signet?: NetworkConnectionFiatRoutingDest;
    sen_test?: NetworkConnectionFiatRoutingDest;
    signet_test?: NetworkConnectionFiatRoutingDest;
}

export interface NetworkIdRoutingPolicy {
    crypto?: NetworkIdCryptoRoutingDest;
    sen?: NetworkIdFiatRoutingDest;
    signet?: NetworkIdFiatRoutingDest;
    sen_test?: NetworkIdFiatRoutingDest;
    signet_test?: NetworkIdFiatRoutingDest;
}

export enum NetworkScheme {
    DEFAULT = "DEFAULT",
    CUSTOM = "CUSTOM",
    NONE = "NONE",
}

export enum NetworkDestType {
    VAULT_ACCOUNT = "VAULT",
    EXCHANGE_ACCOUNT = "EXCHANGE",
    FIAT_ACCOUNT = "FIAT_ACCOUNT",
}

export interface TransactionFilter {
    before?: number;
    after?: number;
    status?: TransactionStatus;
    orderBy?: TransactionOrder;
    limit?: number;
    txHash?: string;
    assets?: string;
    sourceType?: PeerType;
    destType?: PeerType;
    sourceId?: string;
    destId?: string;
}

export interface NFTOwnershipFilter {
    blockchainDescriptor?: string;
    vaultAccountIds?: string[];
    collectionIds?: string[];
    ids?: string[];
    pageCursor?: string;
    pageSize?: number;
    sort?: GetOwnedNFTsSortValues[];
    order?: OrderValues;
    status?: NFTOwnershipStatus;
    search?: string;
}

export interface NFTOwnedCollectionsFilter {
    search?: string;
    pageCursor?: string;
    pageSize?: number;
    sort?: GetOwnedCollectionsSortValues[];
    order?: OrderValues;
}

export interface GetNFTsFilter {
    ids: string[];
    pageCursor?: string;
    pageSize?: number;
    sort?: GetNFTsSortValues[];
    order?: OrderValues;
}

class MediaEntity {
    url: string;
    contentType: string;
}

interface NFTCollection {
    id: string;
    name: string;
    symbol: string;
}

export interface Paging {
    next: string;
}

export interface Token {
    id: string;
    tokenId: string;
    standard: string;
    blockchainDescriptor: string;
    description: string;
    name: string;
    media: MediaEntity[];
    metadataURI?: string;
    cachedMetadataURI?: string;
    collection?: NFTCollection;
}

export interface TokenWithBalance extends Token {
    balance: string;
    vaultAccountId: string;
    ownershipStartTime: number;
    ownershipLastUpdateTime: number;
}

export interface CollectionOwnership extends NFTCollection {
    standard?: string;
    blockchainDescriptor: string;
    contractAddress?: string;
}

export interface TransactionPageFilter {
    before?: number;
    after?: number;
    status?: TransactionStatus;
    limit?: number;
    txHash?: string;
    assets?: string;
    sourceType?: PeerType;
    destType?: PeerType;
    sourceId?: string;
    destId?: string;
}

export enum TransactionOrder {
    CREATED_AT = "createdAt",
    LAST_UPDATED = "lastUpdated"
}

export enum TransactionStatus {
    SUBMITTED = "SUBMITTED",
    QUEUED = "QUEUED",
    PENDING_SIGNATURE = "PENDING_SIGNATURE",
    PENDING_AUTHORIZATION = "PENDING_AUTHORIZATION",
    PENDING_3RD_PARTY_MANUAL_APPROVAL = "PENDING_3RD_PARTY_MANUAL_APPROVAL",
    PENDING_3RD_PARTY = "PENDING_3RD_PARTY",
    /**
     * @deprecated
     */
    PENDING = "PENDING",
    BROADCASTING = "BROADCASTING",
    CONFIRMING = "CONFIRMING",
    /**
     * @deprecated Replaced by "COMPLETED"
     */
    CONFIRMED = "CONFIRMED",
    COMPLETED = "COMPLETED",
    PENDING_AML_SCREENING = "PENDING_AML_SCREENING",
    PARTIALLY_COMPLETED = "PARTIALLY_COMPLETED",
    CANCELLING = "CANCELLING",
    CANCELLED = "CANCELLED",
    REJECTED = "REJECTED",
    FAILED = "FAILED",
    TIMEOUT = "TIMEOUT",
    BLOCKED = "BLOCKED"
}

export enum PeerType {
    VAULT_ACCOUNT = "VAULT_ACCOUNT",
    EXCHANGE_ACCOUNT = "EXCHANGE_ACCOUNT",
    INTERNAL_WALLET = "INTERNAL_WALLET",
    EXTERNAL_WALLET = "EXTERNAL_WALLET",
    UNKNOWN = "UNKNOWN",
    NETWORK_CONNECTION = "NETWORK_CONNECTION",
    FIAT_ACCOUNT = "FIAT_ACCOUNT",
    COMPOUND = "COMPOUND",
    ONE_TIME_ADDRESS = "ONE_TIME_ADDRESS",
    OEC_PARTNER = "OEC_PARTNER"
}

export enum VirtualType {
    OFF_EXCHANGE = "OFF_EXCHANGE",
    DEFAULT = "DEFAULT",
    OEC_FEE_BANK = "OEC_FEE_BANK"
}

export enum TransactionOperation {
    TRANSFER = "TRANSFER",
    MINT = "MINT",
    BURN = "BURN",
    SUPPLY_TO_COMPOUND = "SUPPLY_TO_COMPOUND",
    REDEEM_FROM_COMPOUND = "REDEEM_FROM_COMPOUND",
    RAW = "RAW",
    CONTRACT_CALL = "CONTRACT_CALL",
    TYPED_MESSAGE = "TYPED_MESSAGE",
}

export enum Web3ConnectionType {
    WALLET_CONNECT = "WalletConnect"
}

export enum Web3ConnectionMethod {
    MOBILE = "MOBILE",
    DESKTOP = "DESKTOP",
    API = "API"
}

export interface AllocateFundsRequest {
    allocationId: string;
    amount: string;
    treatAsGrossAmount?: boolean;
}

export interface DeallocateFundsRequest {
    allocationId: string;
    amount: string;
}

export interface AllocateFundsResponse {
    id: string;
    status: string;
}

export interface CreateTransferTicketArgs {
    externalTicketId: string;
    description?: string;
    terms: {
        networkConnectionId: string;
        outgoing: boolean;
        asset: string;
        amount: string;
        note: string;
    }[];
}

export enum TransferTicketStatus {
    OPEN = "OPEN",
    PARTIALLY_FULFILLED = "PARTIALLY_FULFILLED",
    FULFILLED = "FULFILLED",
    FAILED = "FAILED",
    CANCELED = "CANCELED"
}

export enum TransferTicketTermStatus {
    OPEN = "OPEN",
    FULFILLED = "FULFILLED"
}

export interface TransferTicketResponse {
    ticketId: string;
    externalTicketId: string;
    description: string;
    status: TransferTicketStatus;
    terms: TermResponse[];
}

export interface TermResponse {
    termId: string;
    networkConnectionId: string;
    outgoing: boolean;
    asset: string;
    amount: string;
    txIds: string[];
    status: TransferTicketTermStatus;
    note: string;
}

export interface ExecuteTermArgs {
    source: {
        type: string;
        id: string;
    };
    fee?: number;
    gasPrice?: number;
}

export interface CreateTransferTicketResponse {
    ticketId: string;
}

export interface PublicKeyInfoArgs {
    algorithm?: string;
    derivationPath?: number[];
    compressed?: boolean;
}

export interface PublicKeyInfoForVaultAccountArgs {
    assetId: string;
    vaultAccountId: number;
    change: number;
    addressIndex: number;
    compressed?: boolean;
}

export interface GasStationInfo {
    balance: { [asset: string]: string };
    configuration: {
        gasThreshold: string;
        gasCap: string;
        maxGasPrice: string;
    };
}

export interface PublicKeyResponse {
    status: number;
    algorithm: string;
    derivationPath: number[];
    publicKey: string;
}

export interface PublicKeyInformation {
    algorithm: string;
    derivationPath: number[];
    publicKey: String;
}

export interface DropTransactionResponse {
    success: boolean;
    transactions?: string[];
}

export interface MaxSpendableAmountResponse {
    maxSpendableAmount: string;
}

export interface MaxBip44IndexUsedResponse {
    maxBip44AddressIndexUsed?: number;
    maxBip44ChangeAddressIndexUsed?: number;
}

export interface VaultAccountsFilter {
    namePrefix?: string;
    nameSuffix?: string;
    minAmountThreshold?: number;
    assetId?: string;
}

export interface PagedVaultAccountsRequestFilters {
    namePrefix?: string;
    nameSuffix?: string;
    minAmountThreshold?: number;
    assetId?: string;
    orderBy?: "ASC" | "DESC";
    limit?: number; // for default and max limit values please see: https://docs.fireblocks.com/api/swagger-ui/#/
    before?: string;
    after?: string;
}

export interface PagedVaultAccountsResponse {
    accounts: VaultAccountResponse[];
    paging?: {
        before?: string;
        after?: string;
    };
    previousUrl?: string;
    nextUrl?: string;
}

export interface VaultBalancesFilter {
    accountNamePrefix?: string;
    accountNameSuffix?: string;
}

export interface RequestOptions {
    idempotencyKey: string;
}

export interface ValidateAddressResponse {
    isValid: boolean;
    isActive: boolean;
    requiresTag: boolean;
}

export interface AssetTypeResponse {
    id: string;
    name: string;
    type: string;
    contractAddress: string;
    nativeAsset: string;
    decimals?: number;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    role: string;
}

export interface UsersGroup {
    id: string;
    name: string;
    membersIds: string[];
    status: string;
}

export interface ResendWebhooksResponse {
    webhooksCount: number;
}

export interface OffExchangeEntityResponse {
    id: string;
    vaultAccountId: string;
    thirdPartyAccountId: string;
    balance?: {
        [assetId: string]: {
            total?: string;
            locked?: string;
            pending?: string;
            frozen?: string;
        };
    };
}

export interface SettleOffExchangeAccountResponse {
    message: string;
    code: SettleResponseCode;
}

export enum SettleResponseCode {
    NONE = 0,
    NOTHING_TO_SETTLE = 1
}

export interface GetSettlementTransactionsResponse {
    toExchange: ToExchangeTransaction[];
    toCollateral: ToCollateralTransaction[];
}

export interface ToExchangeTransaction {
    assetId: string;
    amount: string;
    dstAddress: string;
    dstTag: string;
}

export interface ToCollateralTransaction {
    assetId: string;
    amount: string;
    fee?: string;
    srcAddress?: string;
    srcTag?: string;
}

export interface AddCollateralTransactionRequest {
    transactionRequest: TransactionArguments;
    isSrcCollateral?: boolean;
}

export interface RemoveCollateralTransactionRequest {
    transactionRequest: TransactionArguments;
    isDstCollateral?: boolean;
}

export interface SettlementRequest {
    mainExchangeAccountId: string;
}

enum InitiatorType {
    EXCHANGE = "EXCHANGE",
    TRADER = "TRADER"
}

export interface InitiatedTransactions {
    toExchange: SettlementTransactionResponse[];
    toCollateral: SettlementTransactionResponse[];
}

export interface SettlementTransactionResponse {
    txId: string;
    status: TransactionStatus;
}

export enum ExchangeReply {
    REJECTED = "REJECTED",
    NOT_NEEDED = "NOT_NEEDED",
    FAILED = "FAILED"
}

export interface SettlementResponse {
    id: string;
    initiator: InitiatorType;
    exchangeReply?: ExchangeReply;
    fireblocksInitiatedTransactions?: InitiatedTransactions;
    exchangeRequestedTransactions?: GetSettlementTransactionsResponse;
}

export interface SetFeePayerConfiguration {
    feePayerAccountId: string;
}

export interface FeePayerConfiguration {
    feePayerAccountId: string;
}

export interface CreateWeb3ConnectionPayload {
    vaultAccountId: number;
    feeLevel: Web3ConnectionFeeLevel;
}

export interface CreateWalletConnectPayload extends CreateWeb3ConnectionPayload {
    uri: string;
    chainIds: string[];
}

export interface GetWeb3ConnectionsPayload {
    pageCursor?: string;
    pageSize?: number;
    sort?: string;
    filter?: { [filterProp: string]: string };
    order?: "ASC" | "DESC";
}

export interface CreateWeb3ConnectionResponse {
    id: string;
    sessionMetadata: {
      appIcon?: string,
      appId?: string,
      appName?: string,
      appUrl?: string,
      appDescription?: string
    };
}

export interface SessionMetadata {
    appIcon?: string;
    appId?: string;
    appName?: string;
    appUrl?: string;
    appDescription?: string;
  }

export interface Session {
    id: string;
    vaultAccountId: number;
    chainIds?: string[];
    feeLevel: Web3ConnectionFeeLevel;
    creationDate: string;
    connectionType: Web3ConnectionType;
    connectionMethod?: Web3ConnectionMethod;
    sessionMetadata?: SessionMetadata;
  }
export enum TimePeriod {
    DAY = "DAY",
    WEEK = "WEEK"
}

export interface Audit {
    data?: any;
    vendorId?: string;
    tenantId?: string;
    severity?: string;
    createdAt?: string;
    subject?: string;
    event?: string;
    user?: string;
    email?: string;
    txId?: string;
    amount?: string;
    transactionId?: string;
    walletType?: string;
    walletName?: string;
    confirmationThreshold?: string;
    sourceType?: string;
    sourceName?: string;
    sourceId?: string;
    destination?: string;
    destAddress?: string;
    newNote?: string;
    remoteType?: string;
    destName?: string;
    remoteId?: string;
    note?: string;
    signedBy?: string;
    approvedBy?: string;
    setBy?: string;
    cancelType?: string;
    fee?: string;
    rule?: string;
    screeningStatus?: string;
    verdict?: string;
    bypassReason?: string;
    status?: string;
    subStatus?: string;
    ruleJsonStr?: string;
    rejectedReason?: string;
    failReason?: string;
    oldRole?: string;
    role?: string;
    subjectUser?: string;
    ip?: string;
    accountName?: string;
    tag?: string;
    address?: string;
    accountType?: string;
    counterpartyName?: string;
    initiatedBy?: string;
    asset?: string;
    newIpAddress?: string;
    approverList?: string;
    removedUserName?: string;
    removedUserEmail?: string;
    action?: string;
    description?: string;
    userAgent?: string;
    authorizationInfo?: string;
    reEnrolledUser?: string;
    oldThreshold?: string;
    newThreshold?: string;
    oldAmount?: string;
    newAmount?: string;
    draftPolicyJson?: string;
}

export interface AuditsResponse {
    data: Audit[];
    total: number;
}

export interface ISystemMessageInfo {
    type: string;
    message: string;
}

export enum GetNFTsSortValues {
    "collectionName" = "collection.name",
    "name" = "name",
    "blockchainDescriptor" = "blockchainDescriptor",
}

export enum GetOwnedNFTsSortValues {
    "ownershipLastUpdateTime" = "ownershipLastUpdateTime",
    "name" = "name",
    "collectionName" = "collection.name",
    "blockchainDescriptor" = "blockchainDescriptor",
}

export enum GetOwnedCollectionsSortValues {
    "name" = "name",
}

export enum OrderValues {
    "ASC" = "ASC",
    "DESC" = "DESC",
}

export enum NFTOwnershipStatus {
    "LISTED" = "LISTED",
    "ARCHIVED" = "ARCHIVED",
}

export interface ContractUploadRequest {
    name: string;
    description: string;
    longDescription: string;
    bytecode: string;
    sourcecode: string;
    compilerOutputMetadata?: object;
    docs?: ContractDoc;
    abi?: AbiFunction[];
    attributes?: Record<string, string>;
    vendorId?: string;
}
interface AbiFunction {
    name?: string;
    stateMutability?: string;
    type: "function" | "constructor" | string;
    inputs: Parameter[];
    outputs?: Parameter[];
    description?: string;
    returns?: Record<string, string>;
}

interface Parameter {
    name: string;
    description?: string;
    internalType: string;
    type: string;
    components?: Parameter[];
}
interface ContractDoc {
    details?: string;
    events?: string;
    kind: "dev" | "user" | string;
    methods: Record<string, FunctionDoc>;
    version: string | number;
}

interface FunctionDoc {
    details?: string;
    params?: Record<string, string>;
    returns?: Record<string, string>;
}
interface VendorDto {
    id: string;
    name: string;
    attributes: Record<string, string>;
}

export interface ContractTemplateDto {
    isPublic: boolean;
    vendor?: VendorDto;
    id: string;
    name: string;
    description: string;
    bytecode: string;
    sourcecode?: string;
    owner?: string;
    compilerOutputMetadata?: object;
    abi: AbiFunction[];
    docs?: ContractDoc;
    attributes?: Record<string, string>;
}
export enum TokenLinkPermission {
    MINT = "MINT",
    BURN = "BURN",
}

export interface TokenLinkPermissionEntry {
    permission: TokenLinkPermission;
    vaultAccountId: string;
}

export interface LinkedTokenMetadata {
    assetId: string;
    name?: string;
    totalSupply?: string;
    holdersCount?: number;
    type?: string;
    contractAddress?: string;
    issuerAddress?: string;
    testnet?: boolean;
    blockchain?: string;
}
export interface TokenLink {
    id: string;
    assetId: string;
    assetMetadata?: LinkedTokenMetadata;
    permissions: TokenLinkPermissionEntry[];
}
export interface PendingTokenLinkDto {
    id: number;
    txId?: string;
    name?: string;
    symbol?: string;
    vaultAccountId?: string;
    blockchainId?: string;
}


export interface IssueTokenRequest {
    symbol: string;
    name: string;
    blockchainId: string;
    vaultAccountId: string;
    createParams: CreateTokenParams;
}
type CreateTokenParams = EVMTokenCreateParamsDto | StellarRippleCreateParamsDto;
interface StellarRippleCreateParamsDto {
    issuerAddress?: string;
}
interface ParameterWithValue {
    internalType: string;
    name: string;
    type: string;
    description?: string;
    value: any;
}

interface EVMTokenCreateParamsDto {
    contractId: string;
    constructorParams?: Array<ParameterWithValue>;
}

export enum SmartTransfersTicketDirection {
    EXCHANGE = "EXCHANGE",
    SEND = "SEND",
    RECEIVE = "RECEIVE",
    INTERMEDIATE = "INTERMEDIATE",
}

export enum SmartTransfersTicketStatus {
    DRAFT = "DRAFT",
    PENDING_APPROVAL = "PENDING_APPROVAL",
    OPEN = "OPEN",
    IN_SETTLEMENT = "IN_SETTLEMENT",
    FULFILLED = "FULFILLED",
    EXPIRED = "EXPIRED",
    CANCELED = "CANCELED",
}

export enum SmartTransferTicketTermStatus {
    CREATED = "CREATED",
    FUNDING = "FUNDING",
    FUNDING_FAILED = "FUNDING_FAILED",
    FUNDED = "FUNDED",
    REJECTED = "REJECTED",
}

export interface SmartTransfersTicketTermPayload {
    asset: string;
    amount: string;
    fromNetworkId: string;
    toNetworkId: string;
}
export interface SmartTransfersTicketCreatePayload {
    createdByNetworkId: string;
    type: string;
    expiresIn?: number;
    terms?: SmartTransfersTicketTermPayload[];
    externalRefId?: string;
    note?: string;
    submit?: boolean;
}

export interface SmartTransfersTicketTerm {
    id: string;
    asset: string;
    amount: string;
    fromNetworkId: string;
    fromNetworkIdName?: string;
    toNetworkId: string;
    toNetworkIdName?: string;
    txHash?: string;
    fbTxId?: string;
    transactionStatus: TransactionStatus;
    status: SmartTransferTicketTermStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface SmartTransfersTicket {
    id: string;
    type: string;
    direction?: SmartTransfersTicketDirection;
    canceledByMe?: boolean;
    createdByMe?: boolean;
    status: SmartTransfersTicketStatus;
    terms: SmartTransfersTicketTerm[];
    expiresIn?: number;
    expiresAt?: Date;
    submittedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    externalRefId?: string;
    note?: string;
    createdByNetworkId: string;
    createdByNetworkIdName: string;
}

export interface SmartTransfersTicketTermResponse {
    data: SmartTransfersTicketTerm;
}

export interface SmartTransfersTicketResponse {
    data: SmartTransfersTicket;
}

export interface SmartTransfersTicketsResponse {
    message?: string;
    after?: string;
    data: SmartTransfersTicket[];
}

export interface SmartTransfersTicketsFilters {
    q?: string;
    statuses?: SmartTransfersTicketStatus[];
    networkId?: string;
    externalRefId?: string;
    after?: string;
    limit?: number;
    createdByMe?: boolean;
    expiresAfter?: Date;
    expiresBefore?: Date;
    type?: string;
}

export interface SmartTransfersTicketTermFundPayload {
    asset: string;
    amount: string;
    networkConnectionId: string;
    srcId: string;
    srcType: string;
    fee?: string;
    feeLevel?: FeeLevel;
}