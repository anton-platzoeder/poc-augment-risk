/**
 * API Client - Base HTTP client for AugmentRisk Payments API
 */

import type { ApiError } from '@/lib/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8040';

export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public error?: ApiError
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

interface RequestConfig extends RequestInit {
  params?: Record<string, any>;
  incomingUser?: string;
}

/**
 * Base API client with error handling and request/response interceptors
 */
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Build URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Handle API response and errors
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let error: ApiError | undefined;

      try {
        error = await response.json();
      } catch {
        // If response is not JSON, create a generic error
        error = {
          Code: `HTTP_${response.status}`,
          Message: response.statusText || 'An error occurred',
        };
      }

      throw new ApiClientError(
        error?.Message || 'Request failed',
        response.status,
        error
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    try {
      return await response.json();
    } catch {
      return undefined as T;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const headers = new Headers(config?.headers);
    if (config?.incomingUser) {
      headers.set('IncomingUser', config.incomingUser);
    }

    const response = await fetch(url, {
      ...config,
      method: 'GET',
      headers,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const headers = new Headers(config?.headers);
    headers.set('Content-Type', 'application/json');
    if (config?.incomingUser) {
      headers.set('IncomingUser', config.incomingUser);
    }

    const response = await fetch(url, {
      ...config,
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const headers = new Headers(config?.headers);
    headers.set('Content-Type', 'application/json');
    if (config?.incomingUser) {
      headers.set('IncomingUser', config.incomingUser);
    }

    const response = await fetch(url, {
      ...config,
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);

    const headers = new Headers(config?.headers);
    if (config?.incomingUser) {
      headers.set('IncomingUser', config.incomingUser);
    }

    const response = await fetch(url, {
      ...config,
      method: 'DELETE',
      headers,
    });

    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
