import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, BadmintonIcon } from './icons';
import { CustomSelect } from './CustomSelect';
import { DateSelect } from './DateSelect';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    navigate('/explore');
  };

  const hotDistricts = ['Bình Thạnh', 'Quận 10', 'Tân Bình', 'Quận 7', 'Gò Vấp', 'Thủ Đức'];

  return (
    <div style={{
      position: 'relative',
      borderRadius: '32px',
      overflow: 'hidden',
      backgroundColor: 'var(--surface-card)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-lg)',
      padding: '56px 48px',
      color: 'var(--text)',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      {/* Background Graphic Accents */}
      <div className="court-grid-pattern" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Decorative Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--blue-glow) 0%, rgba(0, 102, 255, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '20%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--volt-glow) 0%, rgba(16, 242, 132, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Floating Badminton Shuttlecock Watermark */}
      <div style={{
        position: 'absolute',
        right: '4%',
        top: '50%',
        transform: 'translateY(-50%) rotate(12deg)',
        color: 'var(--blue)',
        opacity: 0.08,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <BadmintonIcon size={380} />
      </div>

      {/* Main Content Area */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
        
        {/* Live Active Match Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'var(--volt-bg)',
          border: '1px solid rgba(16, 242, 132, 0.3)',
          color: 'var(--volt)',
          fontSize: '13px',
          fontWeight: 800,
          marginBottom: '24px'
        }}>
          <span className="pulse-dot" style={{ color: 'var(--volt)' }} />
          <span>24+ Kèo cầu đang tuyển vãng lai tối nay tại TP. HCM</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '52px',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-1.5px',
          color: 'var(--navy)',
          marginBottom: '20px'
        }}>
          Ghép kèo cầu lông <br />
          <span className="gradient-text-blue">chỉ trong 30 giây.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '18px',
          color: 'var(--muted)',
          lineHeight: 1.6,
          fontWeight: 500,
          marginBottom: '36px',
          maxWidth: '620px'
        }}>
          Không còn cảnh thiếu chân, mỏi mắt lướt Facebook tìm nhóm. Khám phá sân trống gần bạn, chọn đúng trình độ và xách vợt ra sân ngay!
        </p>

        {/* Floating Search Capsule */}
        <div style={{
          display: 'flex',
          gap: '12px',
          backgroundColor: 'var(--surface)',
          padding: '10px',
          borderRadius: '24px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: '1 1 200px', minWidth: '180px' }}>
            <CustomSelect
              options={[
                { value: 'Quận 1', label: 'Quận 1' },
                { value: 'Quận 3', label: 'Quận 3' },
                { value: 'Quận 4', label: 'Quận 4' },
                { value: 'Quận 7', label: 'Quận 7' },
                { value: 'Quận 10', label: 'Quận 10' },
                { value: 'Quận 11', label: 'Quận 11' },
                { value: 'Bình Thạnh', label: 'Bình Thạnh' },
                { value: 'Tân Bình', label: 'Tân Bình' },
                { value: 'Tân Phú', label: 'Tân Phú' },
                { value: 'Phú Nhuận', label: 'Phú Nhuận' },
                { value: 'Gò Vấp', label: 'Gò Vấp' },
                { value: 'Thủ Đức', label: 'Thủ Đức' },
              ]}
              value={district}
              onChange={setDistrict}
              placeholder="📍 Chọn Quận/Huyện"
            />
          </div>

          <div style={{ flex: '1 1 180px', minWidth: '160px' }}>
            <DateSelect
              value={date}
              onChange={setDate}
              placeholder="📅 Chọn ngày chơi"
              includeAllOption={true}
            />
          </div>

          <button
            onClick={handleSearch}
            className="btn btn-primary"
            style={{
              padding: '14px 32px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 800,
              gap: '8px',
              flex: '0 0 auto'
            }}
          >
            <SearchIcon size={18} />
            <span>Tìm Sân Ngay</span>
          </button>
        </div>

        {/* Hot District Quick Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            🔥 Khu vực hot:
          </span>
          {hotDistricts.map((d) => (
            <button
              key={d}
              onClick={() => navigate('/explore')}
              style={{
                padding: '5px 12px',
                borderRadius: '9999px',
                backgroundColor: 'var(--soft-bg)',
                color: 'var(--navy)',
                fontSize: '12px',
                fontWeight: 700,
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--blue)';
                e.currentTarget.style.color = 'var(--blue)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--navy)';
              }}
            >
              {d}
            </button>
          ))}
        </div>

      </div>

      {/* Trust & Community Stats Bar */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid var(--border)',
        paddingTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Avatar Stack */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', marginLeft: '6px' }}>
            {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Player"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid var(--surface)',
                  marginLeft: '-8px',
                  objectFit: 'cover'
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--navy)' }}>1,800+ Vợt thủ</strong> đã tham gia tuần này
          </div>
        </div>

        {/* Rating Metric */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
          <span style={{ color: '#f59e0b', fontSize: '16px' }}>★★★★★</span>
          <span><strong>4.9/5</strong> từ hơn 3,200 đánh giá</span>
        </div>
      </div>

    </div>
  );
};

