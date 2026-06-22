import React from 'react';
import { ShieldIcon, UsersIcon, ChartIcon, MapPinIcon } from '../components/icons';
import { Link } from 'react-router-dom';
import { LightRays } from '../components/LightRays';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Hero Section */}
      <div style={{
        padding: '120px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#07152f',
        color: 'white'
      }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#0d5cff"
          raysSpeed={1.5}
          rayLength={2.5}
          lightSpread={1.5}
          pulsating={true}
          followMouse={true}
        />
        
        {/* Glow effect fallback/accent */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(13,92,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <div className="reveal-on-scroll" style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: 'var(--soft-bg)', color: 'var(--blue)', borderRadius: '99px', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
            NỀN TẢNG CẦU LÔNG SỐ 1
          </div>
          <h1 className="reveal-on-scroll" style={{ 
            fontSize: '64px', 
            fontWeight: 900, 
            marginBottom: '24px', 
            letterSpacing: '-2px',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Kết nối đam mê,<br/>Chạm đỉnh phong độ.
          </h1>
          <p className="reveal-on-scroll" style={{ fontSize: '20px', color: 'var(--muted)', lineHeight: 1.6, animationDelay: '0.1s', maxWidth: '600px', margin: '0 auto' }}>
            Shuttle Connect giúp bạn tìm sân, ghép kèo và quản lý lịch chơi dễ dàng hơn bao giờ hết. Tạm biệt những giờ phút lướt Facebook mỏi mắt.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 2 }}>
        
        {/* BENTO GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          
          {/* Card 1: Mission */}
          <div className="reveal-on-scroll" style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '32px',
            padding: '40px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border)',
            gridColumn: '1 / -1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            background: 'linear-gradient(145deg, var(--surface) 0%, var(--soft-bg) 100%)'
          }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: 'var(--blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 16px rgba(13,92,255,0.3)' }}>
              <UsersIcon size={32} />
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '16px' }}>Sứ mệnh cộng đồng</h3>
            <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '800px' }}>
              Chúng tôi sinh ra để giải quyết nỗi đau của các tay vợt: thiếu người chơi, trống sân, và khó khăn trong việc quản lý tài chính nhóm. Shuttle Connect tự động hóa mọi thứ để bạn chỉ cần xách vợt lên và đi.
            </p>
          </div>

          {/* Card 2: Speed */}
          <div className="reveal-on-scroll" style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '32px',
            padding: '40px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            animationDelay: '0.1s'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(24, 179, 101, 0.1)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ChartIcon size={24} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Nhanh chóng & Tiện lợi</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, flex: 1 }}>
              Tích hợp bộ lọc siêu tốc theo trình độ, khu vực và giá tiền. Chỉ 3 giây để tìm ra trận đấu phù hợp nhất với bạn hôm nay.
            </p>
          </div>

          {/* Card 3: Map */}
          <div className="reveal-on-scroll" style={{
            backgroundColor: '#07152f',
            color: 'white',
            borderRadius: '32px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(7, 21, 47, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            animationDelay: '0.2s'
          }}>
            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1 }}>
              <MapPinIcon size={200} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <MapPinIcon size={24} />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Bản đồ trực quan</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                Không còn cảnh đi lạc. Hệ thống bản đồ Cinematic tích hợp giúp bạn dễ dàng định vị các sân cầu lông quanh khu vực sống.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Section (Glassmorphism) */}
        <div className="reveal-on-scroll" style={{
          position: 'relative',
          padding: '2px', // For gradient border
          background: 'linear-gradient(135deg, var(--danger) 0%, var(--orange) 100%)',
          borderRadius: '34px',
          animationDelay: '0.3s'
        }}>
          <div style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '32px',
            padding: '40px',
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '24px', 
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(255, 138, 31, 0.1) 100%)', 
              color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
            }}>
              <ShieldIcon size={40} />
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>Cam kết bảo mật & Chính sách</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '16px' }}>
                Shuttle Connect tôn trọng quyền riêng tư. Chúng tôi <strong>không bao giờ sử dụng bot để cào dữ liệu (scrape)</strong> từ các group Facebook. 
                Thay vào đó, các Host được cung cấp công cụ "Import Text" hiện đại để tự do sao chép và quản lý kèo của mình một cách hoàn toàn minh bạch.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Link to="/explore" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(13,92,255,0.3)' }}>
                Bắt đầu khám phá
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
