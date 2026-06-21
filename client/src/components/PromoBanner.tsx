import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0d5cff 0%, #18b365 100%)',
      borderRadius: '16px',
      padding: '24px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative element */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ zIndex: 1, display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontSize: '48px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
          🏆
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Giải đấu cộng đồng tháng 5</span>
            <span style={{ fontSize: '24px' }}>🏸</span>
          </h2>
          <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Tranh tài - Kết nối - Nhận thưởng hấp dẫn</p>
        </div>
      </div>
      
      <div style={{ zIndex: 1 }}>
        <button style={{
          backgroundColor: '#18b365', // fallback, ideally transparent with white border
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '10px 24px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.color = '#0d5cff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'white';
        }}>
          Tham gia ngay <span style={{ fontSize: '18px', lineHeight: 1 }}>›</span>
        </button>
      </div>
    </div>
  );
};
