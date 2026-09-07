import { useState, type ReactNode } from 'react';
import type { UserRole } from '../types';
import { AuthContext } from './auth-context';

const ROLE_KEY = 'shuttle_connect_role';
const validRoles: UserRole[] = ['PLAYER', 'HOST', 'ADMIN'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem(ROLE_KEY);
    return validRoles.includes(saved as UserRole) ? saved as UserRole : null;
  });

  const login = (nextRole: UserRole) => {
    localStorage.setItem(ROLE_KEY, nextRole);
    setRole(nextRole);
  };

  const logout = () => {
    localStorage.removeItem(ROLE_KEY);
    setRole(null);
  };

  return <AuthContext.Provider value={{ role, userId: 'host-demo', login, logout }}>{children}</AuthContext.Provider>;
}
