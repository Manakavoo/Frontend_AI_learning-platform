
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate login without API call
      const mockUser = {
        id: '1',
        name: email.split('@')[0], // Use part of email as name
        email: email
      };
      
      // Store a dummy token to simulate authentication
      localStorage.setItem('access_token', 'dummy-token');
      setUser(mockUser);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate registration without API call
      const mockUser = {
        id: '1',
        name: name,
        email: email
      };
      
      // Store a dummy token to simulate authentication
      localStorage.setItem('access_token', 'dummy-token');
      setUser(mockUser);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
      navigate('/questionnaire');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Simulate logout without API call
      localStorage.removeItem('access_token');
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "An error occurred during logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!localStorage.getItem('access_token'),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
