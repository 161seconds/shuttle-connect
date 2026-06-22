import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BadmintonIcon } from '../components/icons';
import { LightRays } from '../components/LightRays';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleMockLogin = (role: 'PLAYER' | 'HOST' | 'ADMIN') => {
    login(role);
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--surface)',
      overflow: 'hidden'
    }}>
      {/* Left Side: Visual / Branding */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #07152f 0%, var(--blue) 100%)',
        color: 'white',
        padding: '64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style>
          {`
            @keyframes floatSlow {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-15px) rotate(2deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }
            @keyframes floatFast {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(-2deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }
          `}
        </style>

        {/* Glowing Ambient Orbs */}
        <div style={{
          position: 'absolute', top: '10%', left: '15%', width: '400px', height: '400px',
          background: 'rgba(56, 189, 248, 0.4)', borderRadius: '50%', filter: 'blur(120px)', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '10%', width: '350px', height: '350px',
          background: 'rgba(139, 92, 246, 0.4)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0
        }} />

        {/* Light Rays Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <LightRays
            raysOrigin="top-left"
            raysColor="#ffffff"
            raysSpeed={1.5}
            lightSpread={1}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>

        {/* Decorative Pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1, zIndex: 2,
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        <div style={{ position: 'relative', zIndex: 3 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'white', marginBottom: '64px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
              <BadmintonIcon size={24} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.5px' }}>ShuttleConnect</span>
          </Link>

          <h1 className="reveal-on-scroll" style={{ fontSize: '56px', fontWeight: 800, lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-1px' }}>
            Nền tảng kết nối<br/>người chơi cầu lông<br/>hàng đầu.
          </h1>
          <p className="reveal-on-scroll" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.6, maxWidth: '480px', animationDelay: '0.1s' }}>
            Tham gia mạng lưới cầu lông năng động nhất. Đặt sân, tìm đồng đội và trải nghiệm những tính năng vượt trội ngay hôm nay.
          </p>
        </div>

        {/* Floating Glassmorphism Cards */}
        <div style={{ position: 'absolute', right: '8%', top: '35%', zIndex: 4, animation: 'floatSlow 6s ease-in-out infinite' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.2)', padding: '16px 20px', borderRadius: '16px',
            display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px' }}>T</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>Trần Minh Tài</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Vừa đăng ký 1 slot vãng lai</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', right: '15%', top: '55%', zIndex: 4, animation: 'floatFast 5s ease-in-out infinite', animationDelay: '1s' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.2)', padding: '16px 20px', borderRadius: '16px',
            display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px' }}>H</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>Hoàng Gia</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Vừa tạo kèo sân Viettel lúc 19:00</div>
            </div>
          </div>
        </div>

        <div className="reveal-on-scroll" style={{ position: 'relative', zIndex: 3, display: 'flex', gap: '24px', animationDelay: '0.2s', maxWidth: '500px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '20px', backdropFilter: 'blur(12px)', flex: 1, border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '4px', background: 'linear-gradient(to right, #fff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3K+</div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Sân cầu lông</div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '20px', backdropFilter: 'blur(12px)', flex: 1, border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '36px', fontWeight: 800, marginBottom: '4px', background: 'linear-gradient(to right, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>10K+</div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>Trận đấu mỗi tháng</div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div style={{ 
        flex: '0 0 520px', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'var(--surface)', 
        position: 'relative', 
        zIndex: 10, 
        boxShadow: '-20px 0 40px rgba(0,0,0,0.2)',
        overflowY: 'auto',
        padding: '64px 48px'
      }}>
        
        {/* Nút quay lại trang chủ */}
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--muted)', 
            textDecoration: 'none', 
            fontSize: '14px', 
            fontWeight: 500,
            marginBottom: '40px',
            transition: 'color 0.2s',
            alignSelf: 'flex-start'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Quay lại trang chủ
        </Link>

        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          animation: 'reveal 0.4s ease-out',
          flex: 1,
          justifyContent: 'center'
        }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1 style={{ 
              fontSize: '40px', 
              fontWeight: 700, 
              color: 'var(--text)', 
              marginBottom: '12px',
              letterSpacing: '-1px'
            }}>
              Chào mừng trở lại
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
              Nhập email và mật khẩu để truy cập tài khoản của bạn
            </p>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Email</label>
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                style={{ 
                  width: '100%', 
                  fontSize: '15px', 
                  padding: '14px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border)', 
                  backgroundColor: 'var(--soft-bg)', 
                  color: 'var(--text)',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Nhập mật khẩu" 
                  style={{ 
                    width: '100%', 
                    fontSize: '15px', 
                    padding: '14px 16px', 
                    paddingRight: '48px',
                    borderRadius: '8px', 
                    border: '1px solid var(--border)', 
                    backgroundColor: 'var(--soft-bg)', 
                    color: 'var(--text)',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }} 
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text)', fontWeight: 500 }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--blue)', borderRadius: '4px', border: '1px solid var(--border)' }} />
                Ghi nhớ đăng nhập
              </label>
              <button style={{ color: 'var(--blue)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                Quên mật khẩu?
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <button style={{ 
                width: '100%', 
                padding: '14px', 
                fontSize: '15px', 
                fontWeight: 600, 
                color: '#ffffff', 
                backgroundColor: 'var(--blue)', 
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(13, 92, 255, 0.3)'
              }} onMouseOver={e => {e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'}} onMouseOut={e => {e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'}}>
                Đăng nhập
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--muted)' }}>
            Chưa có tài khoản? <button style={{ color: 'var(--text)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Đăng ký</button>
          </div>
        </div>

        {/* Demo Roles - Pushed to the bottom */}
        <div style={{ width: '100%', marginTop: '64px', borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
          <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Đăng nhập nhanh (Bản Demo)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => handleMockLogin('PLAYER')} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', borderRadius: '8px', 
              backgroundColor: 'var(--surface)', border: '1px dashed var(--border)', transition: 'all 0.2s',
              color: 'var(--muted)', fontWeight: 500, fontSize: '13px', cursor: 'pointer'
            }} onMouseOver={(e) => {e.currentTarget.style.backgroundColor = 'var(--soft-bg)'; e.currentTarget.style.color = 'var(--text)';}} onMouseOut={(e) => {e.currentTarget.style.backgroundColor = 'var(--surface)'; e.currentTarget.style.color = 'var(--muted)';}}>
              Vai trò: Người chơi
            </button>
            
            <button onClick={() => handleMockLogin('HOST')} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', borderRadius: '8px', 
              backgroundColor: 'var(--surface)', border: '1px dashed var(--border)', transition: 'all 0.2s',
              color: 'var(--muted)', fontWeight: 500, fontSize: '13px', cursor: 'pointer'
            }} onMouseOver={(e) => {e.currentTarget.style.backgroundColor = 'var(--soft-bg)'; e.currentTarget.style.color = 'var(--text)';}} onMouseOut={(e) => {e.currentTarget.style.backgroundColor = 'var(--surface)'; e.currentTarget.style.color = 'var(--muted)';}}>
              Vai trò: Host
            </button>

            <button onClick={() => handleMockLogin('ADMIN')} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '10px', borderRadius: '8px', 
              backgroundColor: 'var(--surface)', border: '1px dashed var(--border)', transition: 'all 0.2s',
              color: 'var(--muted)', fontWeight: 500, fontSize: '13px', cursor: 'pointer'
            }} onMouseOver={(e) => {e.currentTarget.style.backgroundColor = 'var(--soft-bg)'; e.currentTarget.style.color = 'var(--text)';}} onMouseOut={(e) => {e.currentTarget.style.backgroundColor = 'var(--surface)'; e.currentTarget.style.color = 'var(--muted)';}}>
              Vai trò: Admin
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};
