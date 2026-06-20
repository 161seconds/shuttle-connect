import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { StatCard } from '../components/StatCard';
import { FeatureCard } from '../components/FeatureCard';
import { GameCard } from '../components/GameCard';
import { ExplorePanel } from '../components/ExplorePanel';
import { PostFormPanel } from '../components/PostFormPanel';
import { api } from '../api';
import type { GamePost } from '../types';
import { CalendarIcon, UsersIcon, MapPinIcon, ChartIcon, SearchIcon, FacebookIcon, ShieldIcon, StarIcon } from '../components/icons';

export const HomePage: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<GamePost[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await api.getPosts();
        // Just show 2 recent or featured games on the homepage
        setRecentPosts(data.slice(0, 2));
      } catch (err) {
        console.error('Error fetching recent posts', err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="container" style={{ padding: '32px 24px', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column (~58%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', minWidth: 0 }}>
          <HeroSection />

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard iconUrl={<CalendarIcon size={24} />} iconBgColor="#e5f7ed" iconColor="#18b365" label="Kèo mở" number="128" subtext="+12 hôm nay" />
            <StatCard iconUrl={<UsersIcon size={24} />} iconBgColor="#e5edf7" iconColor="#0d5cff" label="Host" number="86" subtext="+5 tuần này" />
            <StatCard iconUrl={<MapPinIcon size={24} />} iconBgColor="#fff4e5" iconColor="#ff8a1f" label="Khu vực" number="45+" subtext="quận/huyện" subtextColor="var(--muted)" />
            <StatCard iconUrl={<ChartIcon size={24} />} iconBgColor="#f3e8ff" iconColor="#7c3aed" label="Tìm kiếm" number="2.4K" subtext="tuần này" subtextColor="var(--muted)" />
          </div>

          {/* Features Section */}
          <div>
            <h2 className="text-center" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px' }}>Tại sao chọn Shuttle Connect?</h2>
            <div className="grid grid-cols-4 gap-4">
              <FeatureCard iconUrl={<MapPinIcon size={28} color="var(--blue)" />} title="Tìm bản đồ" text="Xem kèo gần nhất trên map." />
              <FeatureCard iconUrl={<SearchIcon size={28} color="var(--blue)" />} title="Lọc cực nhạy" text="Theo thời gian, trình độ, giá." />
              <FeatureCard iconUrl={<FacebookIcon size={28} color="var(--blue)" />} title="Import FB" text="Dán nội dung Facebook, tách nhanh." />
              <FeatureCard iconUrl={<ShieldIcon size={28} color="var(--blue)" />} title="Uy tín cao" text="Hệ thống duyệt bài, minh bạch." />
            </div>
          </div>

          {/* Featured Games Section */}
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--green)', display: 'flex' }}><StarIcon size={24} /></span> Kèo nổi bật gần bạn
              </h2>
              <Link to="/explore" className="text-blue font-semibold">Xem tất cả →</Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {recentPosts.length === 0 ? <p>Loading...</p> : recentPosts.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (~42%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
          <ExplorePanel />
          <PostFormPanel />
        </div>
      </div>
    </div>
  );
};
