import React from 'react';
import logoUrl from '../assets/shuttle-connect-logo.svg';
import { BellIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  const { role, logout } = useAuth();
  return (
    <nav style={{
      backgroundColor: 'var(--surface)',
      height: '64px',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container flex items-center justify-between" style={{ height: '100%' }}>
        {/* Logo Area */}
        <a href="/" className="flex items-center gap-2">
          <img src={logoUrl} alt="Shuttle Connect" style={{ height: '40px', width: 'auto' }} />
        </a>

        {/* Center Nav Links */}
        <div className="flex gap-8 hide-on-mobile" style={{ height: '100%', alignItems: 'center', fontSize: '15px', fontWeight: 600 }}>
          <a href="/" style={{ color: 'var(--green)', borderBottom: '2px solid var(--green)', display: 'flex', alignItems: 'center', height: '100%' }}>Trang chủ</a>
          <a href="/explore" className="text-muted" style={{ display: 'flex', alignItems: 'center', height: '100%', borderBottom: '2px solid transparent' }}>Khám phá</a>
          <a href="/host" className="text-muted" style={{ display: 'flex', alignItems: 'center', height: '100%', borderBottom: '2px solid transparent' }}>Đăng kèo</a>
          <a href="/admin" className="text-muted" style={{ display: 'flex', alignItems: 'center', height: '100%', borderBottom: '2px solid transparent' }}>Dashboard</a>
          <a href="/about" className="text-muted" style={{ display: 'flex', alignItems: 'center', height: '100%', borderBottom: '2px solid transparent' }}>Giới thiệu</a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <button style={{ color: 'var(--navy)', display: 'flex' }}><BellIcon size={24} /></button>
          
          {role ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={`https://ui-avatars.com/api/?name=${role}&background=0D8BFF&color=fff&bold=true`} 
                  alt="Avatar" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>
                    {role === 'PLAYER' ? 'Người chơi' : role === 'HOST' ? 'Host' : 'Admin'}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Cá nhân</span>
                </div>
              </div>
              <button 
                onClick={logout}
                style={{ fontSize: '14px', fontWeight: 600, color: '#ef4444' }}
              >
                Thoát
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-primary" 
              style={{ padding: '8px 24px', fontSize: '14px' }}
              onClick={onOpenLogin}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
