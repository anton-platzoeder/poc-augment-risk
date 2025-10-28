/**
 * Approval Service - API calls for approval workflow
 */

import { apiClient } from './api-client';
import type {
  ApprovalRead,
  ApprovalBulkAction,
  ApprovalListParams,
} from '@/lib/types/api';

export const approvalService = {
  /**
   * Get list of approvals
   */
  async getAll(params?: ApprovalListParams): Promise<ApprovalRead[]> {
    return apiClient.get<ApprovalRead[]>('/approvals', { params });
  },

  /**
   * Get approval by ID
   */
  async getById(id: number): Promise<ApprovalRead> {
    return apiClient.get<ApprovalRead>(`/approvals/${id}`);
  },

  /**
   * Approve one or more approvals
   */
  async approve(
    approvalIds: number[],
    incomingUser: string
  ): Promise<void> {
    const data: ApprovalBulkAction = { ApprovalIds: approvalIds };
    return apiClient.post<void>('/approvals/approve', data, { incomingUser });
  },

  /**
   * Reject one or more approvals
   */
  async reject(
    approvalIds: number[],
    incomingUser: string
  ): Promise<void> {
    const data: ApprovalBulkAction = { ApprovalIds: approvalIds };
    return apiClient.post<void>('/approvals/reject', data, { incomingUser });
  },
};
