import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, BadmintonIcon } from './icons';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container" style={{
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      color: 'var(--text)',
      borderRadius: '24px',
      padding: '64px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-container {
            padding: 32px 24px !important;
          }
          .hero-title {
            font-size: 40px !important;
          }
          .hero-search {
            flex-direction: column !important;
          }
          .hero-bg-graphic {
            width: 100% !important;
            transform: skewX(0deg) !important;
            opacity: 0.15 !important;
          }
          .hero-icon {
            display: none !important;
          }
        }
      `}</style>

      {/* Background Graphic */}
      <div className="hero-bg-graphic" style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '55%',
        height: '120%',
        backgroundColor: 'var(--soft-bg)',
        transform: 'skewX(-15deg)',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 16px', 
          backgroundColor: 'var(--soft-bg)', 
          borderRadius: '999px', 
          fontSize: '14px', 
          fontWeight: 700, 
          marginBottom: '32px', 
          letterSpacing: '0.5px' 
        }}>
          <span style={{ color: 'var(--green)' }}>●</span> <span style={{ color: 'var(--navy)' }}>Nền tảng kết nối #1 Việt Nam</span>
        </div>
        
        <h1 className="hero-title" style={{ 
          fontSize: '64px', 
          fontWeight: 900, 
          lineHeight: 1.1, 
          marginBottom: '24px', 
          letterSpacing: '-2px', 
          textWrap: 'balance',
          color: 'var(--navy)'
        }}>
          Tìm sân cầu lông <br />
          <span style={{ color: 'var(--blue)' }}>gần bạn nhất.</span>
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: 'var(--muted)', 
          marginBottom: '48px', 
          lineHeight: 1.5, 
          fontWeight: 500, 
          textWrap: 'pretty' 
        }}>
          Tìm kiếm nhanh chóng sân cầu lông chất lượng, đặt sân dễ dàng và kết nối cộng đồng yêu cầu lông chỉ với vài cú click.
        </p>

        {/* Dense, high-contrast search bar */}
        <div className="hero-search" style={{
          display: 'flex',
          backgroundColor: 'var(--bg)',
          borderRadius: '16px',
          padding: '8px',
          gap: '8px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <select style={{ 
            flex: 1, 
            backgroundColor: 'var(--surface)', 
            color: 'var(--text)', 
            border: '2px solid transparent', 
            borderRadius: '12px', 
            padding: '16px 36px 16px 16px', 
            fontSize: '16px', 
            fontWeight: 600, 
            outline: 'none',
            cursor: 'pointer'
          }} onFocus={e => e.currentTarget.style.borderColor = 'var(--blue)'} onBlur={e => e.currentTarget.style.borderColor = 'transparent'}>
            <option>Chọn Quận/Huyện</option>
            <option>Quận 1</option>
            <option>Quận 2</option>
            <option>Quận 3</option>
            <option>Quận 7</option>
            <option>Bình Thạnh</option>
          </select>
          <input type="date" style={{ 
            flex: 1, 
            backgroundColor: 'var(--surface)', 
            color: 'var(--text)', 
            border: '2px solid transparent', 
            borderRadius: '12px', 
            padding: '16px 36px 16px 16px', 
            fontSize: '16px', 
            fontWeight: 600, 
            outline: 'none',
            fontFamily: 'inherit'
          }} onFocus={e => e.currentTarget.style.borderColor = 'var(--blue)'} onBlur={e => e.currentTarget.style.borderColor = 'transparent'} />
          <button onClick={() => navigate('/explore')} style={{ 
            padding: '16px 32px', 
            borderRadius: '12px', 
            backgroundColor: 'var(--blue)', 
            color: '#ffffff', 
            border: 'none', 
            fontSize: '16px', 
            fontWeight: 700, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '8px', 
            cursor: 'pointer', 
            transition: 'all 0.2s' 
          }} onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--blue-dark)'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <SearchIcon size={20} /> Tìm kiếm
          </button>
        </div>
      </div>

      {/* Floating badminton icon on the right side */}
      <div className="hero-icon" style={{ 
        position: 'absolute', 
        right: '10%', 
        top: '50%', 
        transform: 'translateY(-50%) rotate(15deg)', 
        zIndex: 5, 
        color: 'var(--blue)', 
        opacity: 0.05 
      }}>
        <BadmintonIcon size={320} />
      </div>
    </div>
  );
};
