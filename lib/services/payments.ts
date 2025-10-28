/**
 * Payment Service - API calls for payment management
 */

import { apiClient } from './api-client';
import type {
  PaymentRead,
  PaymentWrite,
  PaymentCreateResult,
  SubmitForApprovalResult,
  PaymentListParams,
  PaymentDuplicateCheckParams,
  DashboardParams,
  DashboardItemsRead,
  DuplicateCheckResult,
} from '@/lib/types/api';

export const paymentService = {
  /**
   * Get list of payments
   */
  async getAll(params?: PaymentListParams): Promise<PaymentRead[]> {
    return apiClient.get<PaymentRead[]>('/payments', { params });
  },

  /**
   * Get payment by ID
   */
  async getById(id: number): Promise<PaymentRead> {
    return apiClient.get<PaymentRead>(`/payments/${id}`);
  },

  /**
   * Create a new payment
   */
  async create(
    data: PaymentWrite,
    incomingUser: string
  ): Promise<PaymentCreateResult> {
    return apiClient.post<PaymentCreateResult>('/payments', data, {
      incomingUser,
    });
  },

  /**
   * Update an existing payment
   */
  async update(
    id: number,
    data: PaymentWrite,
    incomingUser: string
  ): Promise<void> {
    return apiClient.put<void>(`/payments/${id}`, data, { incomingUser });
  },

  /**
   * Submit a payment for approval
   */
  async submitForApproval(
    id: number,
    incomingUser?: string
  ): Promise<SubmitForApprovalResult> {
    return apiClient.post<SubmitForApprovalResult>(
      `/payments/${id}/submit-for-approval`,
      undefined,
      { incomingUser }
    );
  },

  /**
   * Import bank receipts for a payment
   */
  async importReceipts(id: number): Promise<void> {
    return apiClient.post<void>(`/payments/${id}/import-receipts`);
  },

  /**
   * Check for duplicate payment
   */
  async duplicateCheck(
    params: PaymentDuplicateCheckParams
  ): Promise<DuplicateCheckResult> {
    return apiClient.get<DuplicateCheckResult>('/payments/duplicate-check', {
      params,
    });
  },

  /**
   * Get dashboard KPIs
   */
  async getDashboard(params: DashboardParams): Promise<DashboardItemsRead> {
    return apiClient.get<DashboardItemsRead>('/payments/dashboard-items', {
      params,
    });
  },
};
