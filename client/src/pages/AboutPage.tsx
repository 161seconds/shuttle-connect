import React from 'react';
import { ShieldIcon, UsersIcon, ChartIcon, MapPinIcon } from '../components/icons';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingBottom: '120px', fontFamily: '"Be Vietnam Pro", -apple-system, sans-serif' }}>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 64px;
        }
        .mission-card, .policy-card {
          flex-direction: row;
        }
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .about-grid > div {
            grid-column: 1 / -1 !important;
          }
          .mission-card, .policy-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 768px) {
          .about-hero-title {
            font-size: 48px !important;
          }
          .about-hero-wrapper {
            padding: 120px 24px 80px !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="about-hero-wrapper" style={{
        padding: '160px 32px 120px',
        position: 'relative',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        color: 'var(--text)',
        borderBottomLeftRadius: '48px',
        borderBottomRightRadius: '48px',
        overflow: 'hidden'
      }}>
        {/* Bold geometric shape */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60%',
          height: '140%',
          backgroundColor: 'var(--soft-bg)',
          transform: 'skewX(-15deg)',
          zIndex: 0,
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: 'var(--blue)', color: '#ffffff', borderRadius: '999px', fontSize: '14px', fontWeight: 700, marginBottom: '32px', letterSpacing: '1px' }}>
            NỀN TẢNG CẦU LÔNG SỐ 1
          </div>
          <h1 className="about-hero-title" style={{ 
            fontSize: '80px', 
            fontWeight: 900, 
            marginBottom: '32px', 
            letterSpacing: '-3px',
            lineHeight: 1.05,
            textWrap: 'balance',
            color: 'var(--navy)'
          }}>
            Kết nối đam mê, <br/>
            Chạm đỉnh phong độ.
          </h1>
          <p style={{ fontSize: '24px', color: 'var(--muted)', lineHeight: 1.5, fontWeight: 500, maxWidth: '640px', textWrap: 'pretty' }}>
            Shuttle Connect giúp bạn tìm sân, ghép kèo và quản lý lịch chơi dễ dàng. Không còn cảnh lướt Facebook mỏi mắt để tìm một trận cầu vừa sức.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-60px auto 0', position: 'relative', zIndex: 2, padding: '0 32px' }}>
        
        {/* BENTO GRID */}
        <div className="about-grid">
          
          {/* Card 1: Mission */}
          <div className="mission-card" style={{
            backgroundColor: 'var(--blue)',
            color: '#ffffff',
            borderRadius: '32px',
            padding: '48px',
            gridColumn: '1 / -1',
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#ffffff', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <UsersIcon size={32} />
              </div>
              <h3 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-1px' }}>Sứ mệnh cộng đồng</h3>
              <p style={{ fontSize: '20px', lineHeight: 1.6, fontWeight: 500, opacity: 0.9, textWrap: 'pretty' }}>
                Chúng tôi sinh ra để giải quyết nỗi đau của các tay vợt: thiếu người chơi, trống sân, và khó khăn quản lý tài chính nhóm. 
                Shuttle Connect tự động hóa mọi thứ để bạn chỉ cần xách vợt lên và đi.
              </p>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', opacity: 0.2 }}>
              <UsersIcon size={240} />
            </div>
          </div>

          {/* Card 2: Speed */}
          <div style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '32px',
            padding: '48px',
            border: '2px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--blue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
              <ChartIcon size={32} />
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px', letterSpacing: '-1px' }}>Tốc độ &<br/>Tiện lợi</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '18px', fontWeight: 500 }}>
              Bộ lọc siêu tốc theo trình độ, khu vực và giá tiền. Chỉ mất 3 giây để tìm ra trận đấu phù hợp nhất với bạn hôm nay.
            </p>
          </div>

          {/* Card 3: Map */}
          <div style={{
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            border: '2px solid var(--border)',
            borderRadius: '32px',
            padding: '48px',
            gridColumn: 'span 2',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', right: '-10%', bottom: '-20%', opacity: 0.05, color: 'var(--blue)' }}>
              <MapPinIcon size={320} />
            </div>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--blue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                <MapPinIcon size={32} />
              </div>
              <h3 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px', color: 'var(--navy)' }}>Bản đồ trực quan</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '18px', fontWeight: 500 }}>
                Không còn cảnh đi lạc. Hệ thống bản đồ tích hợp giúp bạn dễ dàng định vị sân cầu lông quanh khu vực sống với độ chính xác cao.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Section (Solid Block instead of Glassmorphism) */}
        <div className="policy-card" style={{
          backgroundColor: 'var(--orange)',
          color: '#ffffff',
          borderRadius: '32px',
          padding: '64px',
          display: 'flex',
          gap: '48px',
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '24px', 
            backgroundColor: '#ffffff', 
            color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
          }}>
            <ShieldIcon size={40} />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-1px' }}>Chính sách dữ liệu minh bạch</h3>
            <p style={{ lineHeight: 1.6, fontSize: '20px', fontWeight: 500, textWrap: 'pretty' }}>
              Shuttle Connect tôn trọng quyền riêng tư tuyệt đối. Chúng tôi <strong>không bao giờ sử dụng bot để scrape dữ liệu</strong> từ Facebook. 
              Các Host được trang bị công cụ tự động trích xuất thông minh để sao chép bài đăng một cách minh bạch và tự chủ.
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Link to="/explore" style={{ 
              display: 'inline-block',
              padding: '20px 40px', 
              fontSize: '18px', 
              fontWeight: 800,
              borderRadius: '16px', 
              backgroundColor: '#ffffff',
              color: 'var(--orange)',
              textDecoration: 'none',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Bắt đầu khám phá
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
