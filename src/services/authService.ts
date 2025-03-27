
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
    // Mock response without API call
    const mockResponse: AuthResponse = {
      access_token: 'dummy-token',
      token_type: 'bearer'
    };
    localStorage.setItem('access_token', mockResponse.access_token);
    return mockResponse;
  },
  
  async login(data: LoginData): Promise<AuthResponse> {
    // Mock response without API call
    const mockResponse: AuthResponse = {
      access_token: 'dummy-token',
      token_type: 'bearer'
    };
    localStorage.setItem('access_token', mockResponse.access_token);
    return mockResponse;
  },
  
  async getUserInfo(): Promise<UserInfo> {
    // Mock user info without API call
    return {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com'
    };
  },
  
  async logout(): Promise<{ success: boolean }> {
    localStorage.removeItem('access_token');
    return { success: true };
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
};

// Export types for use in other components
export type { RegisterData, LoginData, AuthResponse, UserInfo };
