import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, PlusIcon } from './icons';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--soft-bg) 0%, var(--surface) 100%)',
      borderRadius: '24px',
      height: '400px',
      padding: '48px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border)'
    }}>
      {/* Background Court Lines */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '60%',
        height: '140%',
        borderLeft: '4px solid rgba(255,255,255,0.8)',
        borderTop: '4px solid rgba(255,255,255,0.8)',
        borderRadius: '80px 0 0 0',
        transform: 'rotate(-15deg)',
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ maxWidth: '480px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
          <span className="text-navy">Tìm sân cầu lông</span><br />
          <span className="text-green">gần bạn nhất</span>
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
          Tìm kiếm nhanh chóng sân cầu lông chất lượng, đặt sân dễ dàng và kết nối cộng đồng yêu cầu lông.
        </p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/explore')} className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px', boxShadow: '0 4px 12px rgba(13, 92, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={18} /> Khám phá ngay
          </button>
          <button onClick={() => navigate('/host')} className="btn btn-outline" style={{ padding: '12px 24px', fontSize: '15px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusIcon size={18} /> Đăng ký ngay
          </button>
        </div>
      </div>

      {/* Player Visual from Unsplash */}
      <div style={{
        position: 'absolute',
        right: '0',
        bottom: '0',
        height: '100%',
        width: '45%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        zIndex: 5,
        maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
          alt="Badminton player" 
          style={{
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderBottomRightRadius: '24px',
            filter: 'brightness(1.05) contrast(1.1)'
          }}
        />
      </div>
    </div>
  );
};
