import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BadmintonIcon } from '../components/icons';
import { LightRays } from '../components/LightRays';

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
    // Default to player if real login used
    login('PLAYER');
    navigate('/');
  };

  const handleMockLogin = (role: 'PLAYER' | 'HOST' | 'ADMIN') => {
    login(role);
    navigate('/');
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#07152f',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style>
        {`
          @keyframes floatSlow {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* --- BACKGROUND LAYER --- */}
      {/* Glowing Ambient Orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '15%', width: '600px', height: '600px',
        background: 'rgba(13, 92, 255, 0.25)', borderRadius: '50%', filter: 'blur(120px)', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '10%', width: '500px', height: '500px',
        background: 'rgba(124, 58, 237, 0.25)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0
      }} />

      {/* Light Rays Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.8 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={1.5}
          rayLength={4}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0.02}
          distortion={0.05}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Decorative Pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, zIndex: 2,
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      {/* --- FOREGROUND CONTENT --- */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Logo Header */}
        <Link to="/" className="hover-lift" style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'white', marginBottom: '40px',
          animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
            <BadmintonIcon size={28} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '28px', letterSpacing: '-0.5px' }}>ShuttleConnect</span>
        </Link>

        {/* Glassmorphism Form Container */}
        <div style={{
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '24px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
        }}>
          
          <div style={{ 
            display: 'flex', 
            width: '200%', 
            transform: `translateX(${step === 1 ? '0%' : '-50%'})`, 
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' 
          }}>
            
            {/* --- STEP 1: EMAIL --- */}
            <form onSubmit={handleNext} style={{ width: '50%', padding: '40px', flexShrink: 0, boxSizing: 'border-box' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Chào mừng</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '32px' }}>Vui lòng nhập email để tiếp tục</p>
              
              <input 
                ref={emailInputRef}
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  fontSize: '18px', 
                  padding: '16px 20px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  backgroundColor: 'rgba(0,0,0,0.2)', 
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'; }}
                required
              />
              
              <button 
                type="submit"
                disabled={email.trim().length === 0}
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  color: '#ffffff', 
                  backgroundColor: email.trim().length === 0 ? 'rgba(255,255,255,0.1)' : '#0d5cff', 
                  borderRadius: '12px',
                  border: 'none',
                  cursor: email.trim().length === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  marginTop: '24px',
                  boxShadow: email.trim().length === 0 ? 'none' : '0 8px 16px rgba(13, 92, 255, 0.4)'
                }} 
              >
                Tiếp tục
              </button>
            </form>

            {/* --- STEP 2: PASSWORD --- */}
            <form onSubmit={handleLogin} style={{ width: '50%', padding: '40px', flexShrink: 0, boxSizing: 'border-box' }}>
              <button 
                type="button" 
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '16px', fontSize: '14px', fontWeight: 500, padding: 0 }}
                onMouseOver={e => e.currentTarget.style.color = 'white'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
                Quay lại
              </button>

              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Mật khẩu</h2>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#0d5cff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: 'white' }}>
                  {email.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: 500, color: 'white', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>{email}</span>
              </div>
              
              <div style={{ position: 'relative' }}>
                <input 
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Nhập mật khẩu" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ 
                    width: '100%', 
                    fontSize: '18px', 
                    padding: '16px 20px', 
                    paddingRight: '50px',
                    borderRadius: '12px', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    backgroundColor: 'rgba(0,0,0,0.2)', 
                    color: 'white',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'; }}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                    color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px'
                  }}
                  onMouseOver={e => e.currentTarget.style.color = 'white'}
                  onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  fontWeight: 600, 
                  color: '#ffffff', 
                  backgroundColor: '#0d5cff', 
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginTop: '24px',
                  boxShadow: '0 8px 16px rgba(13, 92, 255, 0.4)'
                }} 
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(13, 92, 255, 0.5)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(13, 92, 255, 0.4)'; }}
              >
                Đăng nhập
              </button>
            </form>

          </div>
        </div>

        {/* Demo Roles Panel (Discreet & Elegant) */}
        <div style={{ 
          marginTop: '40px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both'
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Trải nghiệm nhanh
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => handleMockLogin('PLAYER')} style={{
              padding: '8px 16px', borderRadius: '99px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s'
            }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
              Player
            </button>
            <button onClick={() => handleMockLogin('HOST')} style={{
              padding: '8px 16px', borderRadius: '99px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s'
            }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
              Host
            </button>
            <button onClick={() => handleMockLogin('ADMIN')} style={{
              padding: '8px 16px', borderRadius: '99px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s'
            }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'white'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}>
              Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
