import React, { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, BadmintonIcon } from './icons';
import { LightRays } from './LightRays';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation 5deg
    const rotateX = ((centerY - y) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'linear-gradient(135deg, var(--soft-bg) 0%, var(--surface) 100%)',
        borderRadius: '24px',
        height: '400px',
        padding: '48px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: tilt.x === 0 && tilt.y === 0 ? 'var(--shadow-sm)' : '0 20px 40px rgba(0,0,0,0.1), 0 0 40px rgba(13,92,255,0.2)',
        border: '1px solid var(--border)',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'all 0.5s ease-out' : 'all 0.1s linear',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background Light Rays */}
      <div className="hero-parallax-slow" style={{ position: 'absolute', inset: 0, zIndex: 0, transform: 'translateZ(-50px)' }}>
        <LightRays
          raysOrigin="right"
          raysColor="#0d5cff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.4}
          noiseAmount={0.05}
          distortion={0.1}
          pulsating={false}
          fadeDistance={1}
          saturation={1.2}
        />
      </div>

      {/* Content */}
      <div className="hero-parallax-fast" style={{ maxWidth: '480px', position: 'relative', zIndex: 10, transform: 'translateZ(50px)' }}>
        <h1 style={{ fontSize: '46px', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
          <span className="text-navy">Tìm sân cầu lông</span><br />
          <span className="text-green" style={{ textShadow: '0 4px 12px rgba(24, 179, 101, 0.2)' }}>gần bạn nhất</span>
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
      <div className="hero-parallax-fade" style={{
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
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
        transform: 'translateZ(20px)'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
          alt="Badminton player" 
          style={{
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderBottomRightRadius: '24px',
            filter: 'brightness(1.05) contrast(1.1) drop-shadow(-10px 0 20px rgba(0,0,0,0.1))'
          }}
        />
      </div>
    </div>
  );
};
