import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BadmintonIcon } from '../components/icons';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 1 && emailInputRef.current) {
      emailInputRef.current.focus();
    } else if (step === 2 && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [step]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 0) {
      setStep(2);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('PLAYER');
    navigate('/');
  };

  const handleMockLogin = (role: 'PLAYER' | 'HOST' | 'ADMIN') => {
    login(role);
    navigate('/');
  };

  return (
    <div className="login-container" style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)'
    }}>
      <style>{`
        .login-container {
          flex-direction: row;
        }
        .login-left-panel {
          flex: 1;
          padding: 64px;
        }
        .login-right-panel {
          flex: 1;
          padding: 64px;
          align-items: center;
        }
        .login-title {
          font-size: 64px;
        }
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          .login-left-panel {
            flex: none;
            padding: 32px 24px;
          }
          .login-right-panel {
            padding: 40px 24px;
            align-items: flex-start;
          }
          .login-title {
            font-size: 40px;
          }
        }
      `}</style>

      {/* Left Panel: Bold Brand Presence */}
      <div className="login-left-panel" style={{
        backgroundColor: 'var(--blue)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '80%',
          height: '80%',
          backgroundColor: 'var(--blue-dark)',
          borderRadius: '50%',
          opacity: 0.8,
          zIndex: 0,
          transform: 'scale(1.5)'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '48px' }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px', 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: 800, 
            fontSize: '24px', 
            letterSpacing: '-0.5px' 
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              backgroundColor: '#ffffff', 
              color: 'var(--blue)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <BadmintonIcon size={24} />
            </div>
            ShuttleConnect
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '540px', marginBottom: '48px' }}>
          <h1 className="login-title" style={{ 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-2px',
            marginBottom: '24px',
            textWrap: 'balance'
          }}>
            Sân cầu lông số năng động.
          </h1>
          <p style={{ 
            fontSize: '20px', 
            fontWeight: 500, 
            lineHeight: 1.5,
            opacity: 0.9,
            textWrap: 'pretty'
          }}>
            Tìm kiếm kèo vãng lai nhanh chóng, kết nối người chơi và chủ sân chỉ với vài cú click.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '16px' }}>
            Trải nghiệm nhanh
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['PLAYER', 'HOST', 'ADMIN'].map((role) => (
              <button 
                key={role}
                onClick={() => handleMockLogin(role as any)} 
                style={{
                  padding: '12px 24px', 
                  borderRadius: '9999px', 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '2px solid rgba(255,255,255,0.15)',
                  color: 'white', 
                  fontSize: '14px', 
                  fontWeight: 700, 
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }} 
                onMouseOver={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} 
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: High Contrast Form */}
      <div className="login-right-panel" style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'var(--surface)'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          
          <div style={{ 
            display: 'flex', 
            overflow: 'hidden',
            width: '100%',
            position: 'relative'
          }}>
            <div style={{ 
              display: 'flex', 
              width: '200%', 
              transform: `translateX(${step === 1 ? '0%' : '-50%'})`, 
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}>
              
              {/* --- STEP 1: EMAIL --- */}
              <form onSubmit={handleNext} style={{ width: '50%', flexShrink: 0, paddingRight: step === 1 ? '0' : '40px', boxSizing: 'border-box' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-1px', color: 'var(--navy)' }}>Đăng nhập</h2>
                <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '40px', fontWeight: 500 }}>Sử dụng tài khoản của bạn để tiếp tục.</p>
                
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Địa chỉ Email</label>
                  <input 
                    ref={emailInputRef}
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ 
                      width: '100%', 
                      fontSize: '16px', 
                      padding: '16px', 
                      borderRadius: '12px', 
                      border: '2px solid var(--border)', 
                      backgroundColor: 'var(--bg)', 
                      color: 'var(--text)',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      fontWeight: 500,
                      boxSizing: 'border-box'
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--blue)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={email.trim().length === 0}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: email.trim().length === 0 ? 'var(--muted)' : '#ffffff', 
                    backgroundColor: email.trim().length === 0 ? 'var(--soft-bg)' : 'var(--blue)', 
                    borderRadius: '12px',
                    border: 'none',
                    cursor: email.trim().length === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: email.trim().length === 0 ? 'none' : '0 4px 12px rgba(13, 92, 255, 0.25)'
                  }} 
                  onMouseOver={e => { if (email.trim().length > 0) e.currentTarget.style.backgroundColor = 'var(--blue-dark)'; }}
                  onMouseOut={e => { if (email.trim().length > 0) e.currentTarget.style.backgroundColor = 'var(--blue)'; }}
                >
                  Tiếp tục
                </button>
              </form>

              {/* --- STEP 2: PASSWORD --- */}
              <form onSubmit={handleLogin} style={{ width: '50%', flexShrink: 0, paddingLeft: step === 2 ? '0' : '40px', boxSizing: 'border-box' }}>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  style={{ 
                    background: 'none', border: 'none', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', 
                    cursor: 'pointer', marginBottom: '24px', fontSize: '14px', fontWeight: 700, padding: 0,
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.color = 'var(--navy)'}
                  onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
                  Quay lại
                </button>

                <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px', color: 'var(--navy)' }}>Mật khẩu</h2>
                
                <div style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '10px', 
                  padding: '6px 16px 6px 6px', backgroundColor: 'var(--soft-bg)', borderRadius: '999px', border: '1px solid var(--border)',
                  marginBottom: '40px'
                }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '14px' }}>{email}</span>
                </div>
                
                <div style={{ marginBottom: '32px', position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '8px' }}>Mật khẩu của bạn</label>
                  <input 
                    ref={passwordInputRef}
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ 
                      width: '100%', 
                      fontSize: '16px', 
                      padding: '16px', 
                      paddingRight: '50px',
                      borderRadius: '12px', 
                      border: '2px solid var(--border)', 
                      backgroundColor: 'var(--bg)', 
                      color: 'var(--text)',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      fontWeight: 500,
                      boxSizing: 'border-box'
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--blue)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '16px', top: '38px',
                      color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                      transition: 'color 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--navy)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
                
                <button 
                  type="submit"
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: '#ffffff', 
                    backgroundColor: 'var(--blue)', 
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(13, 92, 255, 0.25)'
                  }} 
                  onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--blue-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 92, 255, 0.3)'; }}
                  onMouseOut={e => { e.currentTarget.style.backgroundColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 92, 255, 0.25)'; }}
                >
                  Đăng nhập
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
