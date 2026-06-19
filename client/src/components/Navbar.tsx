import React from 'react';
import logoUrl from '../assets/shuttle-connect-logo.svg';
import { BellIcon } from './icons';

export const Navbar: React.FC = () => {
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
          <button className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '14px' }}>Đăng nhập</button>
        </div>
      </div>
    </nav>
  );
};
