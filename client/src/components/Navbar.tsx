import React, { useState, useEffect } from 'react';

import { BellIcon, BadmintonIcon, SunIcon, MoonIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    // Dispatch a custom event to notify other components (like MockMap) of theme changes
    window.dispatchEvent(new Event('theme-change'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
        <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy)', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-sm)' }}>
              <BadmintonIcon size={20} />
            </div>
            Shuttle<span style={{ color: 'var(--blue)' }}>Connect</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="flex gap-8 hide-on-mobile" style={{ height: '100%', alignItems: 'center', fontSize: '15px', fontWeight: 600 }}>
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--green)' : 'var(--muted)', borderBottom: location.pathname === '/' ? '2px solid var(--green)' : '2px solid transparent', display: 'flex', alignItems: 'center', height: '100%' }}>Trang chủ</Link>
          <Link to="/explore" style={{ color: location.pathname === '/explore' ? 'var(--green)' : 'var(--muted)', display: 'flex', alignItems: 'center', height: '100%', borderBottom: location.pathname === '/explore' ? '2px solid var(--green)' : '2px solid transparent' }}>Khám phá</Link>
          <Link to="/host" style={{ color: location.pathname === '/host' ? 'var(--green)' : 'var(--muted)', display: 'flex', alignItems: 'center', height: '100%', borderBottom: location.pathname === '/host' ? '2px solid var(--green)' : '2px solid transparent' }}>Đăng kèo</Link>
          {(role === 'ADMIN') && (
            <Link to="/admin" style={{ color: location.pathname === '/admin' ? 'var(--green)' : 'var(--muted)', display: 'flex', alignItems: 'center', height: '100%', borderBottom: location.pathname === '/admin' ? '2px solid var(--green)' : '2px solid transparent' }}>Admin</Link>
          )}
          <Link to="/about" style={{ color: location.pathname === '/about' ? 'var(--green)' : 'var(--muted)', display: 'flex', alignItems: 'center', height: '100%', borderBottom: location.pathname === '/about' ? '2px solid var(--green)' : '2px solid transparent' }}>Giới thiệu</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} style={{ color: 'var(--navy)', display: 'flex' }} aria-label="Toggle Theme">
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
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
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
