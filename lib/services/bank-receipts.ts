/**
 * Bank Receipt Service - API calls for bank receipt reconciliation
 */

import { apiClient } from './api-client';
import type { BankReceiptRead } from '@/lib/types/api';

export const bankReceiptService = {
  /**
   * Get list of bank receipts
   */
  async getAll(): Promise<BankReceiptRead[]> {
    return apiClient.get<BankReceiptRead[]>('/bank-receipts');
  },
};
