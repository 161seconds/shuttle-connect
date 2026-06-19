import React from 'react';
import logoUrl from '../assets/shuttle-connect-logo.svg';

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
        <div className="flex gap-8 hide-on-mobile" style={{ fontSize: '15px', fontWeight: 600 }}>
          <a href="#" style={{ color: 'var(--green)', borderBottom: '2px solid var(--green)', paddingBottom: '20px', transform: 'translateY(11px)' }}>Trang chủ</a>
          <a href="#" className="text-muted">Khám phá</a>
          <a href="#" className="text-muted">Đăng kèo</a>
          <a href="#" className="text-muted">Dashboard</a>
          <a href="#" className="text-muted">Giới thiệu</a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <button style={{ fontSize: '20px', color: 'var(--navy)' }}>🔔</button>
          <button className="btn btn-primary" style={{ padding: '8px 24px', fontSize: '14px' }}>Đăng nhập</button>
        </div>
      </div>
    </nav>
  );
};
