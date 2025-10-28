/**
 * Demo Service - API calls for demo administration
 */

import { apiClient } from './api-client';

export const demoService = {
  /**
   * Reset demo data to initial state
   */
  async resetDemo(): Promise<void> {
    return apiClient.post<void>('/demo/reset-demo');
  },
};
