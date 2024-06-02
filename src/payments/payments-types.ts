export namespace Payments {
    export interface ErrorResponse {
        error: {
            /** @enum {string} */
            type: "INTERNAL" | "AUTHENTICATION" | "AUTHORIZATION" | "VALIDATION" | "NOT_FOUND" | "UNPROCESSABLE_ENTITY" | "FORBIDDEN";
            message: string;
        };
    }

    export type CorrelationData = AnyAdditionalPropertiesSchema | string;

    export interface AnyAdditionalPropertiesSchema {
        [key: string]: unknown;
    }

    export interface CreateWorkflowConfigurationRequest {
        configName: string;
        preScreening?: PreScreening;
        configOperations: CreateConfigOperationRequest[];
        externalCorrelationData?: CorrelationData;
        failureHandling?: FailureHandling;
    }

    export interface PreScreening {
        enabled: boolean;
    }
    export interface AutoLaunch {
        enabled: boolean;
    }
    export interface WorkflowConfigurationId {
        configId: string;
    }
    export interface WorkflowConfiguration {
        configId: string;
        configName: string;
        preScreening?: PreScreening;
        status: WorkflowConfigStatus;
        createdAt: number;
        configOperations: ConfigOperation[];
        externalCorrelationData?: CorrelationData;
        failureHandling?: FailureHandling;
    }
    /** @enum {string} */
    export type WorkflowConfigStatus = "PENDING" | "VALIDATION_IN_PROGRESS" | "VALIDATION_FAILED" | "READY_FOR_EXECUTION" | "DELETED";
    export type CreateConfigOperationRequest = CreateConversionConfigOperationRequest | CreateTransferConfigOperationRequest | CreateDisbursementConfigOperationRequest;
    export type ConfigOperation = ConversionConfigOperation | TransferConfigOperation | DisbursementConfigOperation;
    export type ConfigOperationSnapshot = ConfigConversionOperationSnapshot | ConfigTransferOperationSnapshot | ConfigDisbursementOperationSnapshot;
    export interface ConfigConversionOperationSnapshot {
        operationId: string;
        type: ConversionOperationType;
        params: ConversionOperationConfigParams;
    }
    export interface ConfigDisbursementOperationSnapshot {
        operationId: string;
        type: DisbursementOperationType;
        params: DisbursementOperationConfigParams;
    }
    export interface ConfigTransferOperationSnapshot {
        operationId: string;
        type: TransferOperationType;
        params: TransferOperationConfigParams;
    }
    export interface ConversionConfigOperation {
        operationId: string;
        type: ConversionOperationType;
        params: ConversionOperationConfigParams;
        status: ConfigOperationStatus;
        validationFailure?: ConversionValidationFailure;
    }
    export interface TransferConfigOperation {
        operationId: string;
        type: TransferOperationType;
        params: TransferOperationConfigParams;
        status: ConfigOperationStatus;
        validationFailure?: TransferValidationFailure;
    }
    export interface DisbursementConfigOperation {
        operationId: string;
        type: DisbursementOperationType;
        params: DisbursementOperationConfigParams;
        status: ConfigOperationStatus;
        validationFailure?: DisbursementValidationFailure;
    }
    /** @enum {string} */
    export type ConfigOperationStatus = "PENDING" | "VALIDATION_IN_PROGRESS" | "READY_FOR_EXECUTION" | "VALIDATION_FAILED";
    export interface ConversionOperationFailure {
        /** @enum {string} */
        reason: "INSUFFICIENT_FUNDS" | "ASSETS_CONVERSION_NOT_SUPPORTED" | "SLIPPAGE_EXCEEDED" | "AMOUNT_TOO_SMALL" | "CONVERSION_NOT_ALLOWED_BY_POLICY";
        data?: {
            [key: string]: unknown;
        };
    }
    export interface TransferOperationFailure {
        /** @enum {string} */
        reason: "INVALID_AMOUNT" | "SUBMISSION_FAILED" | "TRANSACTION_FAILED";
        data?: {
            txId: string;
            txStatus: string;
            txSubStatus?: string;
        };
    }
    export interface OperationExecutionFailure {
        reason: string;
        data?: {
            [key: string]: unknown;
        };
    }
    export interface ConversionValidationFailure {
        /** @enum {string} */
        reason: "ACCOUNT_NOT_FOUND" | "ACCOUNT_TYPE_NOT_SUPPORTED" | "INSUFFICIENT_BALANCE" | "ASSET_NOT_FOUND" | "ASSETS_CONTINUITY_MISMATCH" | "EXCHANGE_BASKETS_MISMATCH" | "ACCOUNTS_CONTINUITY_MISMATCH" | "ACCOUNT_CONTINUITY_NOT_ALLOWED" | "EQUAL_ACCOUNTS_NOT_ALLOWED" | "EQUAL_ASSETS_NOT_ALLOWED" | "INVALID_AMOUNT" | "ACCOUNT_AS_SOURCE_NOT_ALLOWED" | "MANAGED_OPERATION_PARAMS_INVALID_SCHEMA" | "ACCOUNT_IS_NOT_EXCHANGE" | "UNSUPPORTED_TRADING_METHOD" | "ASSETS_CAN_NOT_BE_CONVERTED";
        data?: {
            [key: string]: unknown;
        };
    }
    export interface TransferValidationFailure {
        /** @enum {string} */
        reason: "ACCOUNT_NOT_FOUND" | "ACCOUNT_TYPE_NOT_SUPPORTED" | "INSUFFICIENT_BALANCE" | "ASSET_NOT_FOUND" | "ASSETS_CONTINUITY_MISMATCH" | "EXCHANGE_BASKETS_MISMATCH" | "ACCOUNTS_CONTINUITY_MISMATCH" | "ACCOUNT_CONTINUITY_NOT_ALLOWED" | "EQUAL_ACCOUNTS_NOT_ALLOWED" | "EQUAL_ASSETS_NOT_ALLOWED" | "INVALID_AMOUNT" | "ACCOUNT_AS_SOURCE_NOT_ALLOWED" | "MANAGED_OPERATION_PARAMS_INVALID_SCHEMA";
        data?: {
            [key: string]: unknown;
        };
    }
    export interface DisbursementValidationFailure {
        /** @enum {string} */
        reason: "ACCOUNT_NOT_FOUND" | "ACCOUNT_TYPE_NOT_SUPPORTED" | "INSUFFICIENT_BALANCE" | "ASSET_NOT_FOUND" | "ASSETS_CONTINUITY_MISMATCH" | "EXCHANGE_BASKETS_MISMATCH" | "ACCOUNTS_CONTINUITY_MISMATCH" | "ACCOUNT_CONTINUITY_NOT_ALLOWED" | "EQUAL_ACCOUNTS_NOT_ALLOWED" | "EQUAL_ASSETS_NOT_ALLOWED" | "INVALID_AMOUNT" | "ACCOUNT_AS_SOURCE_NOT_ALLOWED" | "MANAGED_OPERATION_PARAMS_INVALID_SCHEMA" | "INSTRUCTIONS_EXCEED_HUNDRED_PERCENT" | "INSTRUCTIONS_ARRAY_EMPTY";
        data?: {
            [key: string]: unknown;
        };
    }
    export interface ScreeningValidationFailure {
        /** @enum {string} */
        reason: "SCREENING_DISABLED_IN_TENANT";
        data?: {
            [key: string]: unknown;
        };
    }
    /** @enum {string} */
    export type ConversionOperationType = "CONVERSION";
    /** @enum {string} */
    export type TransferOperationType = "TRANSFER";
    /** @enum {string} */
    export type DisbursementOperationType = "DISBURSEMENT";
    /** @enum {string} */
    export type ScreeningOperationType = "SCREENING";
    export interface CreateConversionConfigOperationRequest {
        type: ConversionOperationType;
        params: ConversionOperationConfigParams;
    }
    export interface ConversionOperationConfigParams {
        amount?: string;
        accountId?: string;
        srcAssetId?: string;
        destAssetId: string;
        slippageBasisPoints?: number;
    }
    export interface ConversionOperationExecutionParams {
        configOperationId: string;
        executionParams?: {
            amount?: string;
            accountId?: string;
            srcAssetId?: string;
            destAssetId?: string;
            slippageBasisPoints?: number;
        };
    }
    export interface CreateTransferConfigOperationRequest {
        type: TransferOperationType;
        params: TransferOperationConfigParams;
    }
    export interface CreateDisbursementConfigOperationRequest {
        type: DisbursementOperationType;
        params: DisbursementOperationConfigParams;
    }
    export interface TransferOperationConfigParams {
        amount?: string;
        assetId?: string;
        source?: Source;
        destination: Destination;
    }
    export type Source = SourceAccount;
    export type Destination = DestinationAccount | OneTimeAddress;
    export interface OneTimeAddress {
        oneTimeAddress: string;
        tag?: string;
    }
    export interface DisbursementOperationConfigParams {
        paymentAccount?: Source;
        instructionSet: DisbursementInstruction[];
    }
    /** @enum {string} */
    export type DestinationAccountType = "EXCHANGE_ACCOUNT" | "UNMANAGED_WALLET" | "VAULT_ACCOUNT" | "NETWORK_CONNECTION" | "FIAT_ACCOUNT";
    /** @enum {string} */
    export type SourceAccountType = "EXCHANGE_ACCOUNT" | "UNMANAGED_WALLET" | "VAULT_ACCOUNT" | "FIAT_ACCOUNT";
    export interface DisbursementAmountInstruction {
        payeeAccount: Destination;
        assetId: string;
        amount: string;
    }
    export interface DisbursementPercentageInstruction {
        payeeAccount: Destination;
        assetId: string;
        percentage: string;
    }
    export type DisbursementInstruction = DisbursementAmountInstruction | DisbursementPercentageInstruction;
    export interface TransferOperationExecutionParams {
        configOperationId: string;
        executionParams?: {
            amount?: string;
            assetId?: string;
            source?: Source;
            destination?: Destination;
        };
    }
    export interface DisbursementOperationExecutionParams {
        configOperationId: string;
        executionParams?: {
            amount?: string;
            paymentAccount?: Source;
            instructionSet?: DisbursementInstruction[];
        };
    }
    export interface CreateWorkflowExecutionRequest {
        configId: string;
        preScreening?: PreScreening;
        autoLaunch?: AutoLaunch;
        params: (ConversionOperationExecutionParams | TransferOperationExecutionParams | DisbursementOperationExecutionParams)[];
        externalCorrelationData?: CorrelationData;
        failureHandling?: FailureHandling;
    }
    export interface WorkflowExecution {
        executionId: string;
        preScreening?: PreScreening;
        autoLaunch?: AutoLaunch;
        configSnapshot: WorkflowConfigurationSnapshot;
        executionOperations: WorkflowExecutionOperation[];
        /** @enum {string} */
        status: "PENDING" | "VALIDATION_IN_PROGRESS" | "VALIDATION_FAILED" | "VALIDATION_COMPLETED" | "PREVIEW_IN_PROGRESS" | "PREVIEW_FAILED" | "READY_FOR_LAUNCH" | "EXECUTION_IN_PROGRESS" | "EXECUTION_COMPLETED" | "EXECUTION_FAILED";
        triggeredBy?: string;
        triggeredAt?: number;
        finishedAt?: number;
        externalCorrelationData?: CorrelationData;
        failureHandling?: FailureHandlingExecuted;
    }
    export interface WorkflowConfigurationSnapshot {
        configId: string;
        configName: string;
        createdAt: number;
        configOperations: ConfigOperationSnapshot[];
        externalCorrelationData?: CorrelationData;
    }
    /** @enum {string} */
    export type ExecutionOperationStatus = "PENDING" | "VALIDATION_IN_PROGRESS" | "VALIDATION_FAILED" | "VALIDATION_COMPLETED" | "PREVIEW_REQUESTED" | "PREVIEW_IN_PROGRESS" | "PREVIEW_FAILED" | "READY_FOR_LAUNCH" | "EXECUTION_REQUESTED" | "EXECUTION_IN_PROGRESS" | "EXECUTION_COMPLETED" | "EXECUTION_FAILED";
    export type WorkflowExecutionOperation = ExecutionScreeningOperation | ExecutionConversionOperation | ExecutionTransferOperation | ExecutionDisbursementOperation;
    export interface ExecutionConversionOperation {
        operationId: string;
        status: ExecutionOperationStatus;
        validationFailure?: ConversionValidationFailure;
        operationType: ConversionOperationType;
        preview?: ConversionOperationPreview;
        execution?: ConversionOperationExecution;
    }
    export type ConversionOperationInput = ConversionOperationConfigParams;
    export interface ConversionOperationPreview {
        input?: ConversionOperationInput;
        output?: ConversionOperationPreviewOutput;
        failure?: ConversionOperationFailure;
    }
    export interface ConversionOperationPreviewOutput {
        amount: AssetAmount;
        fee: AssetAmount;
        conversionRate: string;
        timeSeconds: number;
    }
    export interface ConversionOperationExecution {
        input?: ConversionOperationInput;
        output?: ConversionOperationExecutionOutput;
        startedAt: number;
        finishedAt?: number;
        failure?: ConversionOperationFailure;
    }
    export interface ConversionOperationExecutionOutput {
        amount: AssetAmount;
        fee: AssetAmount;
        conversionRate: string;
    }
    export interface ExecutionScreeningOperation {
        operationId: string;
        status: ExecutionOperationStatus;
        operationType: ScreeningOperationType;
        validationFailure?: ScreeningValidationFailure;
        execution?: ScreeningOperationExecution;
    }
    export interface ScreeningOperationExecution {
        output?: ScreeningOperationExecutionOutput;
        startedAt: number;
        finishedAt?: number;
        failure?: ScreeningOperationFailure;
    }
    export interface ScreeningOperationExecutionOutput {
        verdicts: ScreeningVerdict[];
    }
    export interface ScreeningVerdict {
        /** @enum {string} */
        verdict: "PASSED" | "PASSED_WITH_ALERT" | "REJECTED" | "FAILED" | "BYPASSED";
        executionOperationId: string;
        account: Destination;
        assetId: string;
        amount: string;
        matchedRule?: {
            action?: string;
            category?: string[];
        };
    }
    export interface ScreeningOperationFailure {
        /** @enum {string} */
        reason: "AML_PROCESS_FAILED" | "SCREENING_REJECTED";
        data?: ScreeningOperationRejectedOutput;
    }
    export type ScreeningOperationRejectedOutput = ScreeningOperationExecutionOutput;
    export interface AssetAmount {
        amount: string;
        assetId: string;
    }
    export interface ExecutionTransferOperation {
        operationId: string;
        status: ExecutionOperationStatus;
        validationFailure?: TransferValidationFailure;
        operationType: TransferOperationType;
        preview?: TransferOperationPreview;
        execution?: TransferOperationExecution;
    }
    export type TransferOperationInput = TransferOperationConfigParams;
    export interface TransferOperationPreview {
        input?: TransferOperationInput;
        output?: TransferOperationPreviewOutput;
    }
    export interface TransferOperationPreviewOutput {
        amount: AssetAmount;
        fee: AssetAmount;
        isSignRequired: boolean;
        timeSeconds: number;
    }
    export interface TransferOperationExecution {
        input?: TransferOperationInput;
        output?: TransferOperationExecutionOutput;
        txId?: string;
        startedAt: number;
        finishedAt?: number;
        failure?: TransferOperationFailure;
    }
    export interface TransferOperationExecutionOutput {
        amount: AssetAmount;
        fee: AssetAmount;
    }
    export interface ExecutionDisbursementOperation {
        operationId: string;
        status: ExecutionOperationStatus;
        validationFailure?: DisbursementValidationFailure;
        operationType: DisbursementOperationType;
        preview?: DisbursementOperationPreview;
        execution?: DisbursementOperationExecution;
    }
    export interface DisbursementOperationPreview {
        input?: DisbursementOperationInput;
        output?: DisbursementOperationPreviewOutput;
    }
    export interface DisbursementOperationInput {
        amount?: string;
        paymentAccount: Source;
        instructionSet: DisbursementInstruction[];
    }
    export interface DisbursementOperationPreviewOutput {
        instructionSet: (DisbursementInstructionOutput & {
            timeSeconds: number;
        })[];
    }
    export interface DisbursementInstructionOutput {
        amount: AssetAmount;
        fee: AssetAmount;
        payeeAccount: Destination;
    }
    export interface DisbursementOperationExecution {
        input?: DisbursementOperationInput;
        output?: DisbursementOperationExecutionOutput;
        payoutId?: string;
        startedAt: number;
        finishedAt?: number;
        failure?: DisbursementOperationFailure;
    }
    export interface DisbursementOperationFailure {
        /** @enum {string} */
        reason: "SUBMISSION_FAILED" | "PAYOUT_FAILED";
        data?: {
            payoutId?: string;
            payoutError?: string;
        };
    }
    export interface DisbursementOperationExecutionOutput {
        instructionSet: DisbursementInstructionOutput[];
    }
    export interface DestinationAccount {
        accountId: string;
        accountType: DestinationAccountType;
    }
    export interface SourceAccount {
        accountId: string;
        accountType: SourceAccountType;
    }
    export interface FailureHandling {
        /** @description Flag to enable/disable failure handling */
        enabled: boolean;
        type?: FailureHandlingType;
    }
    export type FailureHandlingExecuted = FailureHandling & {
        /**
         * Format: uuid
         * @description The related workflow id that executes the failure handling
         */
        workflowExecutionId?: string;
    };
    /**
     * @description Type of failure handling mechanism
     * @enum {string}
     */
    export type FailureHandlingType = "REVERSE";
}
