
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('chatUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll create a user from the email
    const userData = {
      id: email.replace('@', '_').replace('.', '_'),
      name: email.split('@')[0],
      email
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('chatUser', JSON.stringify(userData));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: email.replace('@', '_').replace('.', '_'),
      name,
      email
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('chatUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('chatUser');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
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
