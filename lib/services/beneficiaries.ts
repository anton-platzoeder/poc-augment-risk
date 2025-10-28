/**
 * Beneficiary Service - API calls for beneficiary management
 */

import { apiClient } from './api-client';
import type {
  BeneficiaryRead,
  BeneficiaryWrite,
  BeneficiaryCreateResult,
  BeneficiaryVerificationResult,
  BeneficiaryListParams,
  BeneficiaryDuplicateCheckParams,
  BeneficiaryVerificationParams,
  DuplicateCheckResult,
} from '@/lib/types/api';

export const beneficiaryService = {
  /**
   * Get list of beneficiaries
   */
  async getAll(params?: BeneficiaryListParams): Promise<BeneficiaryRead[]> {
    return apiClient.get<BeneficiaryRead[]>('/beneficiaries', { params });
  },

  /**
   * Get beneficiary by ID
   */
  async getById(id: number): Promise<BeneficiaryRead> {
    return apiClient.get<BeneficiaryRead>(`/beneficiaries/${id}`);
  },

  /**
   * Create a new beneficiary
   */
  async create(
    data: BeneficiaryWrite,
    incomingUser: string
  ): Promise<BeneficiaryCreateResult> {
    return apiClient.post<BeneficiaryCreateResult>('/beneficiaries', data, {
      incomingUser,
    });
  },

  /**
   * Update an existing beneficiary
   */
  async update(
    id: number,
    data: BeneficiaryWrite,
    incomingUser: string
  ): Promise<void> {
    return apiClient.put<void>(`/beneficiaries/${id}`, data, {
      incomingUser,
    });
  },

  /**
   * Delete a beneficiary
   */
  async delete(id: number, incomingUser: string): Promise<void> {
    return apiClient.delete<void>(`/beneficiaries/${id}`, { incomingUser });
  },

  /**
   * Check for duplicate beneficiary
   */
  async duplicateCheck(
    params: BeneficiaryDuplicateCheckParams
  ): Promise<DuplicateCheckResult> {
    return apiClient.get<DuplicateCheckResult>(
      '/beneficiaries/duplicate-check',
      { params }
    );
  },

  /**
   * Verify beneficiary account details (CoP, IBAN, Sort Code, etc.)
   */
  async verifyAccount(
    params: BeneficiaryVerificationParams
  ): Promise<BeneficiaryVerificationResult> {
    return apiClient.get<BeneficiaryVerificationResult>(
      '/beneficiaries/account-verification',
      { params }
    );
  },
};
