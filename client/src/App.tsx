import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatCard } from './components/StatCard';
import { FeatureCard } from './components/FeatureCard';
import { GameCard } from './components/GameCard';
import { ExplorePanel } from './components/ExplorePanel';
import { PostFormPanel } from './components/PostFormPanel';
import { mockGames } from './data/mockGames';
import { CalendarIcon, UsersIcon, MapPinIcon, ChartIcon, SearchIcon, FacebookIcon, ShieldIcon, StarIcon } from './components/icons';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: '32px 24px', width: '100%', maxWidth: '1440px' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          
          {/* Left Column (~58%) */}
          <div style={{ width: '58%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <HeroSection />

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
              <StatCard iconUrl={<CalendarIcon size={28} />} iconBgColor="#e5f7ed" iconColor="#18b365" label="Kèo đang mở" number="128" subtext="+12 hôm nay" />
              <StatCard iconUrl={<UsersIcon size={28} />} iconBgColor="#e5edf7" iconColor="#0d5cff" label="Host uy tín" number="86" subtext="+5 tuần này" />
              <StatCard iconUrl={<MapPinIcon size={28} />} iconBgColor="#fff4e5" iconColor="#ff8a1f" label="Sân phủ sóng" number="45+" subtext="quận/huyện" subtextColor="var(--muted)" />
              <StatCard iconUrl={<ChartIcon size={28} />} iconBgColor="#f3e8ff" iconColor="#7c3aed" label="Lượt tìm kiếm" number="2.4K" subtext="tuần này" subtextColor="var(--muted)" />
            </div>

            {/* Features Section */}
            <div>
              <h2 className="text-center" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px' }}>Tại sao chọn Shuttle Connect?</h2>
              <div className="grid grid-cols-4 gap-4">
                <FeatureCard iconUrl={<MapPinIcon size={32} color="var(--blue)" />} title="Tìm kèo bản đồ" text="Xem kèo gần bạn nhất trên bản đồ." />
                <FeatureCard iconUrl={<SearchIcon size={32} color="var(--blue)" />} title="Lọc thông minh" text="Lọc theo thời gian, trình độ, giá." />
                <FeatureCard iconUrl={<FacebookIcon size={32} color="var(--blue)" />} title="Import Facebook" text="Dán nội dung Facebook, tách tự động." />
                <FeatureCard iconUrl={<ShieldIcon size={32} color="var(--blue)" />} title="Host uy tín" text="Hệ thống duyệt bài, minh bạch." />
              </div>
            </div>

            {/* Featured Games Section */}
            <div>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--green)', display: 'flex' }}><StarIcon size={24} /></span> Kèo nổi bật gần bạn
                </h2>
                <a href="#" className="text-blue font-semibold">Xem tất cả →</a>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {mockGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (~42%) */}
          <div style={{ width: '42%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <ExplorePanel />
            <PostFormPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
