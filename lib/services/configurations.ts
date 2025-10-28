/**
 * Configuration Service - API calls for system configuration
 */

import { apiClient } from './api-client';
import type { ConfigurationRead, ConfigurationWrite } from '@/lib/types/api';

export const configurationService = {
  /**
   * Get all configuration settings
   */
  async getAll(): Promise<ConfigurationRead[]> {
    return apiClient.get<ConfigurationRead[]>('/configurations');
  },

  /**
   * Update a configuration setting
   */
  async update(id: number, data: ConfigurationWrite): Promise<void> {
    return apiClient.put<void>(`/configurations/${id}`, data);
  },
};
