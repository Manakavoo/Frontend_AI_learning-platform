
import api from './api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    // Make sure the URL matches exactly what the backend expects, including the trailing slash
    const response = await api.post<AuthResponse>('/api/auth/register/', data);
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  },
  
  async login(data: LoginData): Promise<AuthResponse> {
    // Add trailing slash for consistency
    const response = await api.post<AuthResponse>('/api/auth/login/', data);
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  },
  
  async getUserInfo(): Promise<UserInfo> {
    // Add trailing slash for consistency
    const response = await api.post<UserInfo>('/api/auth/me/');
    return response.data;
  },
  
  async logout(): Promise<{ success: boolean }> {
    // Add trailing slash for consistency
    const response = await api.post<{ success: boolean }>('/api/auth/logout/');
    localStorage.removeItem('access_token');
    return response.data;
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
};

// Export types for use in other components
export type { RegisterData, LoginData, AuthResponse, UserInfo };
