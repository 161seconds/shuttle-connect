import { createContext, useContext } from 'react';
import type { UserRole } from '../types';

export interface AuthValue {
  role: UserRole | null;
  userId: string;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthValue | undefined>(undefined);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
