/**
 * Release Queue Service - API calls for payment release and batching
 */

import { apiClient } from './api-client';
import type {
  ReleaseQueueRead,
  CreateBatchRequest,
  CreateBatchResult,
  ReleaseQueueBulkAction,
  ReleaseQueueListParams,
} from '@/lib/types/api';

export const releaseQueueService = {
  /**
   * Get list of release queue items
   */
  async getAll(params?: ReleaseQueueListParams): Promise<ReleaseQueueRead[]> {
    return apiClient.get<ReleaseQueueRead[]>('/release-queue', { params });
  },

  /**
   * Get release queue item by ID
   */
  async getById(id: number): Promise<ReleaseQueueRead> {
    return apiClient.get<ReleaseQueueRead>(`/release-queue/${id}`);
  },

  /**
   * Create a batch and release payments
   */
  async release(
    releaseQueueIds: number[],
    incomingUser: string
  ): Promise<CreateBatchResult> {
    const data: CreateBatchRequest = { ReleaseQueueIds: releaseQueueIds };
    return apiClient.post<CreateBatchResult>('/release-queue/release', data, {
      incomingUser,
    });
  },

  /**
   * Reject one or more release queue items
   */
  async reject(releaseQueueIds: number[]): Promise<void> {
    const data: ReleaseQueueBulkAction = { ReleaseQueueIds: releaseQueueIds };
    return apiClient.post<void>('/release-queue/reject', data);
  },
};
