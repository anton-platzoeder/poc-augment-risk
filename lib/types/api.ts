/**
 * TypeScript types generated from OpenAPI specification
 * AugmentRiskPaymentsPOC API v1.0.19
 *
 * Base URL: http://localhost:8040
 */

// ============================================================================
// Error Response
// ============================================================================

export interface ApiError {
  Code: string;
  Message: string;
  Details?: Record<string, any>;
}

// ============================================================================
// Beneficiary Types
// ============================================================================

export interface BeneficiaryWrite {
  BeneficiaryName: string;
  SortCode?: string;
  AccountNumber?: string;
  IBAN?: string;
  SwiftCode?: string;
  Currency: string;
  Country?: string;
  AddressLine1?: string;
  City?: string;
  PostalCode?: string;
}

export interface BeneficiaryRead {
  Id: number;
  BeneficiaryName: string;
  SortCode?: string;
  AccountNumber?: string;
  IBAN?: string;
  SwiftCode?: string;
  Currency: string;
  Country?: string;
  IsActive: boolean;
  AddressLine1?: string;
  City?: string;
  PostalCode?: string;
  VerificationStatus: string;
  VerificationNote?: string;
  LastChangedBy: string;
  LastChangedDate: string;
  ValidFrom: string;
  ValidTo?: string;
}

export interface BeneficiaryCreateResult {
  Id: number;
}

export interface BeneficiaryVerificationResult {
  VerificationStatus: string;
  VerificationMessage: string;
}

// ============================================================================
// Payment Types
// ============================================================================

export interface PaymentWrite {
  Reference: string;
  InvoiceNumber?: string;
  PaymentDate: string;
  Amount: number;
  Currency: string;
  PaymentType: string;
  BeneficiaryId: number;
  PaymentMethod?: string;
  RemittanceAdvice?: string;
  CostCentre?: string;
  GLCode?: string;
  ReasonCode?: string;
  IsERP: boolean;
  ERPRef?: string;
}

export interface PaymentRead {
  Id: number;
  Reference: string;
  InvoiceNumber?: string;
  PaymentDate: string;
  Amount: number;
  Currency: string;
  PaymentType: string;
  PaymentMethod?: string;
  RemittanceAdvice?: string;
  CostCentre?: string;
  GLCode?: string;
  ReasonCode?: string;
  IsERP: boolean;
  ERPRef?: string;
  Status: string;
  IsDuplicate: boolean;
  BeneficiaryName: string;
  SortCode?: string;
  AccountNumber?: string;
  IBAN?: string;
  SwiftCode?: string;
  ValidFrom: string;
  ValidTo?: string;
  CreatedBy: string;
  CreatedDate: string;
}

export interface PaymentCreateResult {
  Id: number;
}

export interface SubmitForApprovalResult {
  ApprovalId: number;
}

// ============================================================================
// Approval Types
// ============================================================================

export interface ApprovalRead {
  Id: number;
  Status: string;
  CreatedBy: string;
  CreatedDate: string;
  IsDuplicate: boolean;
  IsOutOfRange: boolean;
  IsEscalated: boolean;
  Comments?: string;
  Approver1?: string;
  Approver2?: string;
  Deadline?: string;
  VerificationStatus: string;
  VerificationNote?: string;
  PaymentRef: string;
  BeneficiaryName: string;
  Amount: number;
  Currency: string;
  PaymentType: string;
  ApprovalCount: number;
  CfoApprovalRequired: boolean;
  CfoApproved: boolean;
  ApprovedCount: number;
  ValidFrom: string;
  ValidTo?: string;
}

export interface ApprovalBulkAction {
  ApprovalIds: number[];
}

// ============================================================================
// Release Queue Types
// ============================================================================

export interface ReleaseQueueRead {
  Id: number;
  ApprovalStatus: string;
  ReleaseStatus: string;
  ReleasedBy?: string;
  ReleasedDate?: string;
  BatchId?: number;
  PaymentRef: string;
  BeneficiaryName: string;
  Amount: number;
  Currency: string;
  PaymentType: string;
  CreatedBy: string;
  CreatedDate: string;
  VerificationStatus: string;
  DuplicateFlag: boolean;
  OutOfRangeFlag: boolean;
  ValidFrom: string;
  ValidTo?: string;
  Comments?: string;
  Deadline?: string;
}

export interface CreateBatchRequest {
  ReleaseQueueIds: number[];
}

export interface CreateBatchResult {
  BatchId: number;
  Count: number;
  TotalAmount: number;
}

export interface ReleaseQueueBulkAction {
  ReleaseQueueIds: number[];
}

// ============================================================================
// Bank Receipt Types
// ============================================================================

export interface BankReceiptRead {
  Id: number;
  BankRef: string;
  MatchedPaymentId?: number;
  PaymentRef?: string;
  BeneficiaryName: string;
  Amount: number;
  Currency: string;
  Method: string;
  Status: string;
  StatusReason?: string;
  ValueDate: string;
  ReceivedDate: string;
  MatchStatus: string;
  AckStatus: string;
  ValidFrom: string;
  ValidTo?: string;
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface ConfigurationRead {
  Id: number;
  Key: string;
  DataType: string;
  Value: string;
}

export interface ConfigurationWrite {
  Value: string;
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface DashboardItemsRead {
  ReadyToRelease: number;
  ApprovalRequired: number;
  BankReceipts: number;
  AccountVerificationStatistics: {
    Passed: {
      LastWeek: number;
      LastMonth: number;
      LastYear: number;
    };
    Outstanding: {
      LastWeek: number;
      LastMonth: number;
      LastYear: number;
    };
    Failed: {
      LastWeek: number;
      LastMonth: number;
      LastYear: number;
    };
  };
  AnomaliesDetected: number;
  EscalationsTriggered: number;
  NearSLA: {
    Within30Minutes: number;
    Within1Hour: number;
    Within2Hours: number;
  };
}

// ============================================================================
// Utility Types
// ============================================================================

export interface DuplicateCheckResult {
  IsDuplicate: boolean;
}

// ============================================================================
// Enums
// ============================================================================

export enum PaymentStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  PendingApproval = 'PendingApproval',
  Approved = 'Approved',
  Released = 'Released',
  Reconciled = 'Reconciled',
}

export enum PaymentType {
  Domestic = 'Domestic',
  Foreign = 'Foreign',
}

export enum VerificationStatus {
  Passed = 'Passed',
  Failed = 'Failed',
  Outstanding = 'Outstanding',
}

export enum MatchStatus {
  Matched = 'Matched',
  Unmatched = 'Unmatched',
  PartiallyMatched = 'PartiallyMatched',
}

export enum AckStatus {
  Pending = 'Pending',
  Acknowledged = 'Acknowledged',
  Failed = 'Failed',
}

export enum ApprovalStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum ReleaseStatus {
  Queued = 'Queued',
  Released = 'Released',
  Rejected = 'Rejected',
}

// ============================================================================
// Query Parameters Types
// ============================================================================

export interface BeneficiaryListParams {
  IsActive?: boolean;
}

export interface PaymentListParams {
  PaymentType?: string;
  Reference?: string;
  IsERP?: boolean;
  Status?: string;
  CreatedBy?: string;
}

export interface ApprovalListParams {
  Status?: string;
  CFOHighValuePayments?: boolean;
  PaymentType?: string;
  IsOverdue?: boolean;
}

export interface ReleaseQueueListParams {
  PaymentType?: string;
  Status?: string;
  Date?: string;
  Amount?: number;
  Beneficiary?: string;
}

export interface DashboardParams {
  FromDate: string;
  ToDate: string;
}

export interface BeneficiaryDuplicateCheckParams {
  Currency: string;
  AccountNumber?: string;
  SortCode?: string;
  SwiftCode?: string;
  IBAN?: string;
}

export interface PaymentDuplicateCheckParams {
  BeneficiaryId?: number;
  InvoiceNumber?: string;
  Amount?: number;
  Date?: string;
}

export interface BeneficiaryVerificationParams {
  BeneficiaryName: string;
  Currency: string;
  SwiftCode?: string;
  SortCode?: string;
  AccountNumber?: string;
  IBAN?: string;
}
