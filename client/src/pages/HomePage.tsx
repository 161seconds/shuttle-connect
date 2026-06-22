import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatCard } from '../components/StatCard';
import { FeatureCard } from '../components/FeatureCard';
import { GameCard } from '../components/GameCard';
import { ExplorePanel } from '../components/ExplorePanel';
import { PostFormPanel } from '../components/PostFormPanel';
import { PromoBanner } from '../components/PromoBanner';
import { api } from '../api';
import type { GamePost } from '../types';
import { CalendarIcon, UsersIcon, MapPinIcon, ChartIcon, SearchIcon, ShieldIcon, StarIcon, CheckCircleIcon } from '../components/icons';

export const HomePage: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<GamePost[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await api.getPosts();
        // Show up to 4 recent games for the suggestion grid
        setRecentPosts(data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching recent posts', err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="container" style={{ padding: '32px 24px', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Layout uses a 1fr 1fr grid or something similar for the two main columns */}
      <div className="home-grid">

        {/* Left Column (50%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          <HeroSection />

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 reveal-on-scroll">
            <StatCard iconUrl={<CalendarIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--green)" label="Sân đang mở" number="128" subtext="+12 hôm nay" />
            <StatCard iconUrl={<UsersIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--blue)" label="Người chơi" number="86" subtext="+5 tuần này" />
            <StatCard iconUrl={<MapPinIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--orange)" label="Sân/CLB" number="45+" subtext="quận/huyện" subtextColor="var(--muted)" />
            <StatCard iconUrl={<ChartIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--purple)" label="Lượt tìm kiếm" number="2.4K" subtext="tuần này" subtextColor="var(--muted)" />
            <StatCard iconUrl={<StarIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--warning)" label="Đánh giá tốt" number="4.8/5" subtext="từ người chơi" subtextColor="var(--muted)" />
            <StatCard iconUrl={<ShieldIcon size={24} />} iconBgColor="var(--soft-bg)" iconColor="var(--red)" label="Trận thành công" number="95%" subtext="tỷ lệ ghép trận" subtextColor="var(--green)" />
          </div>

          {/* Features Section */}
          <div className="grid gap-3 reveal-on-scroll" style={{ padding: '8px 0', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <FeatureCard iconUrl={<SearchIcon size={24} color="var(--blue)" />} title="Tìm kiếm nhanh" text="" />
            <FeatureCard iconUrl={<CalendarIcon size={24} color="var(--blue)" />} title="Đặt sân dễ dàng" text="" />
            <FeatureCard iconUrl={<StarIcon size={24} color="var(--blue)" />} title="Chất lượng uy tín" text="" />
            <FeatureCard iconUrl={<UsersIcon size={24} color="var(--blue)" />} title="Cộng đồng cầu lông" text="" />
          </div>

          <div className="reveal-on-scroll">
            <PromoBanner />
          </div>

          {/* Featured Games Section */}
          <div className="reveal-on-scroll">
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Sân gợi ý cho bạn
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentPosts.length === 0 ? <p>Loading...</p> : recentPosts.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="reveal-on-scroll" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--soft-bg)',
            padding: '16px 24px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            marginTop: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>
              <span style={{ color: 'var(--blue)' }}><UsersIcon size={20} /></span> 12K+ Người dùng
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>
              <span style={{ color: 'var(--blue)' }}><MapPinIcon size={20} /></span> 500+ Sân đối tác
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>
              <span style={{ color: 'var(--blue)' }}><CheckCircleIcon size={20} /></span> 99% Hài lòng
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>
              <span style={{ color: 'var(--blue)' }}><ShieldIcon size={20} /></span> 24/7 Hỗ trợ
            </div>
          </div>
        </div>

        {/* Right Column (50%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          <ExplorePanel games={recentPosts} />
          <PostFormPanel />
        </div>
      </div>
    </div>
  );
};
