import { Payments } from "./payments-types";
import { ApiClient } from "../api-client";
import CreateWorkflowConfigurationRequest = Payments.CreateWorkflowConfigurationRequest;
import WorkflowConfiguration = Payments.WorkflowConfiguration;
import WorkflowConfigurationId = Payments.WorkflowConfigurationId;
import CreateWorkflowExecutionRequest = Payments.CreateWorkflowExecutionRequest;
import WorkflowExecution = Payments.WorkflowExecution;

const PAYMENTS_BASE_PATH = "/v1/payments";

export class PaymentsApiClient {
    constructor(private readonly apiClient: ApiClient) {}

    public async createPaymentWorkflowConfiguration(request: CreateWorkflowConfigurationRequest): Promise<WorkflowConfiguration> {
        return await this.apiClient.issuePostRequest(`${PAYMENTS_BASE_PATH}/workflow_config`, request);
    }

    public async getPaymentWorkflowConfiguration(configId: string): Promise<WorkflowConfiguration> {
        return await this.apiClient.issueGetRequest(`${PAYMENTS_BASE_PATH}/workflow_config/${configId}`);
    }

    public async deletePaymentWorkflowConfiguration(configId: string): Promise<WorkflowConfigurationId> {
        return await this.apiClient.issueDeleteRequest(`${PAYMENTS_BASE_PATH}/workflow_config/${configId}`);
    }

    public async createPaymentWorkflowExecution(request: CreateWorkflowExecutionRequest): Promise<WorkflowExecution> {
        return await this.apiClient.issuePostRequest(`${PAYMENTS_BASE_PATH}/workflow_execution`, request);
    }

    public async getPaymentWorkflowExecution(workflowExeuctionId: string): Promise<WorkflowExecution> {
        return await this.apiClient.issueGetRequest(`${PAYMENTS_BASE_PATH}/workflow_execution/${workflowExeuctionId}`);
    }

    public async executePaymentFlow(workflowExeuctionId: string): Promise<WorkflowExecution> {
        return await this.apiClient.issuePostRequest(`${PAYMENTS_BASE_PATH}/workflow_execution/${workflowExeuctionId}/actions/execute`, {});
    }
}