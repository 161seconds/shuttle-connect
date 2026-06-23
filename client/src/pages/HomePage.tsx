import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatCard } from '../components/StatCard';
import { GameCard } from '../components/GameCard';
import { ExplorePanel } from '../components/ExplorePanel';
import { PostFormPanel } from '../components/PostFormPanel';
import { PromoBanner } from '../components/PromoBanner';
import { api } from '../api';
import type { GamePost } from '../types';
import { CalendarIcon, UsersIcon, MapPinIcon, ChartIcon, ShieldIcon, StarIcon, CheckCircleIcon } from '../components/icons';

export const HomePage: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<GamePost[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await api.getPosts();
        setRecentPosts(data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching recent posts', err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div style={{ padding: '48px 32px', width: '100%', maxWidth: '1440px', margin: '0 auto', fontFamily: '"Be Vietnam Pro", sans-serif' }}>
      <style>{`
        .home-main-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 48px;
          align-items: start;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .games-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          background-color: var(--surface);
          border: 1px solid var(--border);
          padding: 32px;
          border-radius: 24px;
          color: var(--navy);
        }
        @media (max-width: 1024px) {
          .home-main-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .trust-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .games-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="home-main-grid">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', minWidth: 0 }}>
          <HeroSection />

          {/* Stats Row */}
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Nền tảng phát triển nhanh nhất
            </h2>
            <div className="stats-grid">
              <StatCard iconUrl={<CalendarIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--green)" label="Sân đang mở" number="128" subtext="+12 hôm nay" />
              <StatCard iconUrl={<UsersIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--blue)" label="Người chơi" number="86" subtext="+5 tuần này" />
              <StatCard iconUrl={<MapPinIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--orange)" label="Sân/CLB" number="45+" subtext="quận/huyện" subtextColor="var(--muted)" />
              <StatCard iconUrl={<ChartIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--purple)" label="Lượt tìm kiếm" number="2.4K" subtext="tuần này" subtextColor="var(--muted)" />
              <StatCard iconUrl={<StarIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--warning)" label="Đánh giá tốt" number="4.8/5" subtext="từ người chơi" subtextColor="var(--muted)" />
              <StatCard iconUrl={<ShieldIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--danger)" label="Trận thành công" number="95%" subtext="tỷ lệ ghép trận" subtextColor="var(--green)" />
            </div>
          </div>

          <PromoBanner />

          {/* Featured Games Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.5px' }}>
                Sân gợi ý cho bạn
              </h2>
            </div>
            <div className="games-grid">
              {recentPosts.length === 0 ? (
                <div style={{ padding: '24px', backgroundColor: 'var(--soft-bg)', borderRadius: '16px', gridColumn: '1 / -1', fontWeight: 600, color: 'var(--muted)' }}>
                  Đang tải...
                </div>
              ) : recentPosts.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', fontWeight: 700 }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--soft-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                <UsersIcon size={24} />
              </div>
              12K+ Người dùng
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', fontWeight: 700 }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--soft-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                <MapPinIcon size={24} />
              </div>
              500+ Sân đối tác
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', fontWeight: 700 }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--soft-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                <CheckCircleIcon size={24} />
              </div>
              99% Hài lòng
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', fontWeight: 700 }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--soft-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)' }}>
                <ShieldIcon size={24} />
              </div>
              24/7 Hỗ trợ
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0, position: 'sticky', top: '32px' }}>
          <ExplorePanel games={recentPosts} />
          <PostFormPanel />
        </div>
      </div>
    </div>
  );
};
