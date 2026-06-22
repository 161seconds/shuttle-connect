import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, BadmintonIcon } from './icons';
import { LightRays } from './LightRays';

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
      {/* Background Light Rays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LightRays
          raysOrigin="right"
          raysColor="#0d5cff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '480px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
          <span className="text-navy">Tìm sân cầu lông</span><br />
          <span className="text-green">gần bạn nhất</span>
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
          Tìm kiếm nhanh chóng sân cầu lông chất lượng, đặt sân dễ dàng và kết nối cộng đồng yêu cầu lông.
        </p>
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--surface)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '8px',
          gap: '8px',
          boxShadow: 'var(--shadow-lg)',
          marginTop: '8px'
        }}>
          <select style={{ flex: 1, backgroundColor: 'var(--soft-bg)', border: '1px solid transparent', borderRadius: '10px' }}>
            <option>Quận/huyện</option>
            <option>Quận 1</option>
            <option>Bình Thạnh</option>
          </select>
          <input type="date" style={{ flex: 1, backgroundColor: 'var(--soft-bg)', border: '1px solid transparent', borderRadius: '10px' }} />
          <button onClick={() => navigate('/explore')} className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={18} /> Tìm sân
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div style={{ position: 'absolute', top: '15%', left: '45%', zIndex: 1, animation: 'floatSlow 4s ease-in-out infinite', opacity: 0.5, color: 'var(--blue)' }}>
        <BadmintonIcon size={48} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', left: '40%', zIndex: 1, animation: 'floatFast 3s ease-in-out infinite', opacity: 0.3, color: 'var(--green)', transform: 'rotate(45deg)' }}>
        <BadmintonIcon size={32} />
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
