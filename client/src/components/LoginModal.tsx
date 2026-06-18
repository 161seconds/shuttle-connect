import React from 'react';
import type { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSelectRole }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
        <h3 className="font-bold text-xl mb-4">Mock Login</h3>
        <p className="text-sm text-muted mb-4">Select a role to simulate logging in.</p>
        
        <div className="flex flex-col gap-2">
          <button className="btn-outline" onClick={() => onSelectRole('Player')}>Login as Player</button>
          <button className="btn-outline" onClick={() => onSelectRole('Host')}>Login as Host</button>
          <button className="btn-outline" onClick={() => onSelectRole('Admin')}>Login as Admin</button>
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
