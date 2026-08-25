import React, { useState, useEffect, useRef } from 'react';
import { BadmintonIcon, SunIcon, MoonIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { role, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Click outside to close role menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSwitchRole = (newRole: UserRole) => {
    login(newRole);
    setIsRoleMenuOpen(false);
    if (newRole === 'ADMIN') navigate('/admin');
    else if (newRole === 'HOST') navigate('/host');
  };

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/explore', label: 'Khám phá', badge: 'Hot' },
    { path: '/host', label: 'Đăng kèo' },
    { path: '/admin', label: 'Admin' },
    { path: '/about', label: 'Giới thiệu' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      borderBottom: '1px solid var(--border)',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--blue) 0%, #00d2ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <BadmintonIcon size={22} />
          </div>
          <div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 900,
              fontSize: '20px',
              letterSpacing: '-0.5px',
              color: 'var(--navy)',
              lineHeight: 1.1
            }}>
              SHUTTLE<span className="gradient-text-blue">CONNECT</span>
            </div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--volt)' }}>
              SPORT MATCHING
            </div>
          </div>
        </Link>

        {/* Center Pill Navigation */}
        <div className="hide-on-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--soft-bg)',
          padding: '5px 8px',
          borderRadius: '9999px',
          border: '1px solid var(--border)'
        }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  position: 'relative',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#ffffff' : 'var(--muted)',
                  backgroundColor: isActive ? 'var(--blue)' : 'transparent',
                  boxShadow: isActive ? '0 2px 10px var(--blue-glow)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 900,
                    padding: '2px 5px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? '#ffffff' : 'var(--volt)',
                    color: isActive ? 'var(--blue)' : '#060911'
                  }}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--soft-bg)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--navy)',
              transition: 'all 0.2s ease'
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
          </button>

          {/* Quick Role Switcher Pill */}
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px 6px 8px',
                borderRadius: '9999px',
                backgroundColor: 'var(--soft-bg)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: role === 'ADMIN' ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : role === 'HOST' ? 'linear-gradient(135deg, #10f284, #059669)' : 'linear-gradient(135deg, #0066ff, #00d2ff)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 900
              }}>
                {role === 'ADMIN' ? '👑' : role === 'HOST' ? '🏸' : '🎾'}
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1 }}>
                  {role === 'ADMIN' ? 'Quản Trị' : role === 'HOST' ? 'Chủ Sân' : 'Người Chơi'}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--volt)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span className="pulse-dot" style={{ color: 'var(--volt)' }} /> Đang bật
                </div>
              </div>

              <span style={{ fontSize: '10px', color: 'var(--muted)', marginLeft: '2px' }}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {isRoleMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '240px',
                backgroundColor: 'var(--surface)',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                padding: '10px',
                zIndex: 200,
                animation: 'reveal-up 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', padding: '6px 12px', letterSpacing: '0.5px' }}>
                  Chọn vai trò trải nghiệm
                </div>

                <button
                  onClick={() => handleSwitchRole('PLAYER')}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: role === 'PLAYER' ? 'var(--soft-bg)' : 'transparent',
                    color: role === 'PLAYER' ? 'var(--blue)' : 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🎾</span>
                  <div>
                    <div>Người chơi (Player)</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>Tìm & ghép kèo vãng lai</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSwitchRole('HOST')}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: role === 'HOST' ? 'var(--soft-bg)' : 'transparent',
                    color: role === 'HOST' ? 'var(--blue)' : 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🏸</span>
                  <div>
                    <div>Chủ sân / Host</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>Đăng bài & import Facebook</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSwitchRole('ADMIN')}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: role === 'ADMIN' ? 'var(--soft-bg)' : 'transparent',
                    color: role === 'ADMIN' ? 'var(--blue)' : 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>👑</span>
                  <div>
                    <div>Quản trị viên (Admin)</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>Kiểm duyệt bài import</div>
                  </div>
                </button>

                <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '8px 0' }} />

                <button
                  onClick={() => {
                    logout();
                    setIsRoleMenuOpen(false);
                    navigate('/login');
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--danger)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                >
                  🚪 Trang chọn vai trò đầy đủ
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};


