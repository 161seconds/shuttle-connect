import React from 'react';
import { BadmintonIcon } from './icons';

export const PromoBanner: React.FC = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%)',
      borderRadius: '24px',
      padding: '32px 40px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Bạn thiếu sân? Chúng tôi có.
        </h2>
        <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px', maxWidth: '400px' }}>
          Tìm sân cầu lông trống khu vực quanh bạn chỉ trong 30 giây. Đặt chỗ ngay để giữ slot!
        </p>
        <button className="btn-white-outline">
          Tham gia ngay <span style={{ fontSize: '18px', lineHeight: 1 }}>›</span>
        </button>
      </div>
    </div>
  );
};
