import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, PlusIcon } from './icons';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      background: 'linear-gradient(135deg, #e5f0ff 0%, #ffffff 100%)',
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
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '40%',
        height: '2px',
        background: 'rgba(255,255,255,0.8)',
        transform: 'rotate(-15deg)',
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ maxWidth: '420px', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
          <span className="text-navy">Tìm kèo cầu lông</span><br />
          <span className="text-green">gần bạn nhất</span>
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
          Tìm kèo đánh vãng lai theo vị trí, thời gian, trình độ và số lượng còn trống. Nhanh chóng – Chính xác – Tiện lợi.
        </p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/explore')} className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px', boxShadow: '0 4px 12px rgba(13, 92, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={18} /> Khám phá ngay
          </button>
          <button onClick={() => navigate('/host')} className="btn btn-outline" style={{ padding: '12px 24px', fontSize: '15px', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusIcon size={18} /> Đăng kèo ngay
          </button>
        </div>
      </div>

      {/* Player Visual Placeholder */}
      <div style={{
        position: 'absolute',
        right: '40px',
        bottom: '0',
        height: '90%',
        width: '300px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 5
      }}>
        {/* Abstract silhouette of a player jumping */}
        <div style={{
          width: '180px',
          height: '280px',
          backgroundColor: 'var(--navy)',
          maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,10 C60,10 65,20 60,30 C55,40 40,40 30,50 C20,60 10,80 20,100 C30,120 50,110 60,130 C70,150 60,180 70,200 C80,220 90,180 80,150 C70,120 90,90 80,60 C70,30 90,20 70,10 Z\' fill=\'black\'/%3E%3C/svg%3E")',
          WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,10 C60,10 65,20 60,30 C55,40 40,40 30,50 C20,60 10,80 20,100 C30,120 50,110 60,130 C70,150 60,180 70,200 C80,220 90,180 80,150 C70,120 90,90 80,60 C70,30 90,20 70,10 Z\' fill=\'black\'/%3E%3C/svg%3E")',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'bottom center',
          opacity: 0.9,
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))'
        }} />
        
        {/* Shuttlecock decorative element */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '48px',
          transform: 'rotate(-30deg)',
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
        }}>
          🏸
        </div>
      </div>
    </div>
  );
};
