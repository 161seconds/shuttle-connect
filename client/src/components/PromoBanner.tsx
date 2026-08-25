import React from 'react';
import { BadmintonIcon } from './icons';
import { useNavigate } from 'react-router-dom';

export const PromoBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%)',
      borderRadius: '24px',
      padding: '36px 40px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Bạn thiếu sân hoặc cần ghép kèo?
        </h2>
        <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px', lineHeight: 1.5 }}>
          Tìm sân cầu lông trống và kèo vãng lai khu vực quanh bạn chỉ trong 30 giây. Tham gia ngay để giữ slot!
        </p>
        <button 
          className="btn-white-outline"
          onClick={() => navigate('/explore')}
        >
          Khám phá ngay <span style={{ fontSize: '18px', lineHeight: 1 }}>›</span>
        </button>
      </div>

      <div style={{
        position: 'absolute',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-15deg)',
        opacity: 0.15,
        color: '#ffffff',
        pointerEvents: 'none'
      }}>
        <BadmintonIcon size={200} />
      </div>
    </div>
  );
};

