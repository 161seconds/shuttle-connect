import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole } from '../types';

interface AuthContextType {
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('shuttle_connect_role') as UserRole | null;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const login = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('shuttle_connect_role', newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('shuttle_connect_role');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
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
