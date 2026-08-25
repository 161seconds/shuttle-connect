import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { GameCard } from '../components/GameCard';
import { PostFormPanel } from '../components/PostFormPanel';
import { api } from '../api';
import type { GamePost } from '../types';
import { MapPinIcon, ShieldIcon, BadmintonIcon, ClockIcon } from '../components/icons';
import { useNavigate, Link } from 'react-router-dom';

const DISTRICT_CAROUSEL = [
  { name: 'Bình Thạnh', count: 8, icon: '🔥', tag: 'Sôi động nhất' },
  { name: 'Quận 10', count: 6, icon: '⚡', tag: 'Trung tâm' },
  { name: 'Tân Bình', count: 5, icon: '🏸', tag: 'Nhiều sân đẹp' },
  { name: 'Quận 7', count: 4, icon: '🌟', tag: 'Sân thảm VIP' },
  { name: 'Phú Nhuận', count: 3, icon: '🎯', tag: 'Gần trung tâm' },
  { name: 'Gò Vấp', count: 3, icon: '🚀', tag: 'Giá sinh viên' },
  { name: 'Thủ Đức', count: 3, icon: '🏆', tag: 'Sân rộng' },
];

export const HomePage: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      setLoading(true);
      try {
        const data = await api.getPosts();
        setRecentPosts(data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching recent posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', paddingBottom: '96px' }}>
      
      {/* 1. HERO SECTION */}
      <section className="container" style={{ paddingTop: '32px' }}>
        <HeroSection />
      </section>

      {/* 2. HOT DISTRICTS CAROUSEL SECTION */}
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--volt)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              KHU VỰC SÔI ĐỘNG
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', margin: 0, letterSpacing: '-0.5px' }}>
              Tìm sân theo Quận / Huyện
            </h2>
          </div>
          <Link to="/explore" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Xem toàn bộ bản đồ TP. HCM →
          </Link>
        </div>

        {/* District Scroll Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {DISTRICT_CAROUSEL.map((district) => (
            <div
              key={district.name}
              onClick={() => navigate('/explore')}
              className="hover-lift"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>{district.icon}</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--soft-bg)',
                  color: 'var(--blue)'
                }}>
                  {district.count} kèo
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 2px 0' }}>
                  {district.name}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
                  {district.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED LIVE MATCHES GRID */}
      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              ĐANG TUYỂN VÃNG LAI
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', margin: 0, letterSpacing: '-0.5px' }}>
              Kèo cầu nổi bật hôm nay
            </h2>
          </div>

          <Link
            to="/explore"
            className="btn btn-primary"
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            Xem tất cả {recentPosts.length}+ kèo →
          </Link>
        </div>

        {/* Games Grid (4 Columns) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)', gridColumn: '1 / -1' }}>
              Đang tải danh sách kèo...
            </div>
          ) : recentPosts.map((game) => (
            <GameCard key={game.id} game={game} onClick={() => navigate('/explore')} />
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE CREATOR & FACEBOOK IMPORT WIDGET */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 32px auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--volt)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            DÀNH CHO CHỦ SÂN & TRƯỞNG NHÓM
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
            Đăng kèo hoặc Import từ Facebook cực nhanh
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0 }}>
            Hệ thống tự động bóc tách ngày giờ, sân, giá tiền và trình độ từ bài đăng Facebook mà không cần nhập tay.
          </p>
        </div>

        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <PostFormPanel />
        </div>
      </section>

      {/* 5. BENTO GRID: COMMUNITY & TRUST */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
            TẠI SAO CHỌN SHUTTLE CONNECT
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
            Nền tảng kết nối thể thao số #1
          </h2>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          <style>{`
            @media (max-width: 1024px) {
              .bento-card-wide { grid-column: 1 / -1 !important; }
            }
          `}</style>

          {/* Bento 1: Superfast Matching */}
          <div style={{
            backgroundColor: 'var(--surface-card)',
            borderRadius: '28px',
            padding: '36px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'var(--blue-light)',
              color: 'var(--blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ClockIcon size={28} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Ghép kèo trong 30 giây
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Lọc chính xác theo trình độ (Yếu, TB, TB Khá, Khá, Cứng), khoảng giá và khung giờ chơi mong muốn.
            </p>
          </div>

          {/* Bento 2: Vector Court Map */}
          <div style={{
            backgroundColor: 'var(--surface-card)',
            borderRadius: '28px',
            padding: '36px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'var(--volt-bg)',
              color: 'var(--volt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MapPinIcon size={28} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Bản đồ sân trực quan
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Định vị chính xác tọa độ sân tại TP. HCM, xem khoảng cách di chuyển và tích hợp sẵn sàng cho VietMap API.
            </p>
          </div>

          {/* Bento 3: Safe & Transparent */}
          <div style={{
            backgroundColor: 'var(--surface-card)',
            borderRadius: '28px',
            padding: '36px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              color: 'var(--warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldIcon size={28} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Minh bạch 100%
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Không dùng bot cào dữ liệu Facebook trái phép. Hỗ trợ trích xuất thủ công thông minh và bảo mật dữ liệu tuyệt đối.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="container">
        <div style={{
          borderRadius: '32px',
          background: 'linear-gradient(135deg, var(--blue) 0%, #1e40af 100%)',
          padding: '64px 48px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '32px',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
            <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.2)', fontSize: '12px', fontWeight: 800, marginBottom: '12px' }}>
              CỘNG ĐỒNG CẦU LÔNG SÀI GÒN
            </div>
            <h2 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-1px', margin: '0 0 12px 0', lineHeight: 1.15 }}>
              Bạn đang tìm sân tối nay? <br />
              Ghép nhóm ngay bây giờ!
            </h2>
            <p style={{ fontSize: '16px', opacity: 0.9, margin: 0, lineHeight: 1.5 }}>
              Hàng trăm tay vợt đang đợi bạn trên sân. Đừng để buổi tối trôi qua uể oải!
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/explore"
              className="btn btn-volt"
              style={{ padding: '16px 36px', fontSize: '16px' }}
            >
              🏸 Khám phá kèo ngay
            </Link>
            <Link
              to="/host"
              className="btn btn-glass"
              style={{ padding: '16px 28px', fontSize: '16px', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)' }}
            >
              ✍️ Đăng kèo tìm người
            </Link>
          </div>

          <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', opacity: 0.1, pointerEvents: 'none' }}>
            <BadmintonIcon size={300} />
          </div>
        </div>
      </section>

    </div>
  );
};

