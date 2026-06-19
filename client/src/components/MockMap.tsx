import React from 'react';

export const MockMap: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '600px',
      backgroundColor: '#e5e7eb',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Future VietMap integration using import.meta.env.VITE_VIETMAP_API_KEY */}
      
      {/* Map Labels/Roads Mock */}
      <div style={{ position: 'absolute', top: '20%', left: '30%', fontSize: '14px', fontWeight: 600, color: '#9ca3af', transform: 'rotate(-15deg)' }}>TÂN BÌNH</div>
      <div style={{ position: 'absolute', top: '40%', left: '50%', fontSize: '14px', fontWeight: 600, color: '#9ca3af', transform: 'rotate(10deg)' }}>PHÚ NHUẬN</div>
      <div style={{ position: 'absolute', top: '60%', left: '70%', fontSize: '14px', fontWeight: 600, color: '#9ca3af', transform: 'rotate(-5deg)' }}>QUẬN 1</div>

      {/* Markers Mock */}
      <div style={{ position: 'absolute', top: '25%', left: '40%', fontSize: '32px' }}>📍</div>
      <div style={{ position: 'absolute', top: '45%', left: '55%', fontSize: '32px' }}>📍</div>
      <div style={{ position: 'absolute', top: '65%', left: '45%', fontSize: '32px' }}>📍</div>
      <div style={{ position: 'absolute', top: '35%', left: '75%', fontSize: '32px' }}>📍</div>

      {/* Action Button */}
      <button style={{
        position: 'absolute',
        top: '24px',
        backgroundColor: 'var(--blue)',
        color: 'white',
        padding: '10px 24px',
        borderRadius: '9999px',
        fontWeight: 600,
        fontSize: '14px',
        boxShadow: 'var(--shadow-md)'
      }}>
        Tìm kiếm trong khu vực này
      </button>

      {/* Map Controls */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', fontSize: '20px', fontWeight: 'bold' }}>+</button>
        <button style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', fontSize: '20px', fontWeight: 'bold' }}>-</button>
      </div>
    </div>
  );
};
