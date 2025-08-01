const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: 'GET',
      headers,
    });
  }

  // POST request
  async post(endpoint: string, data: any, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint: string, data: any, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request(endpoint, {
      method: 'DELETE',
      headers,
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient; 