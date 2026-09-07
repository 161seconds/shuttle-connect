import { ArrowRight, BadgeCheck, Map, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { postsApi } from '../api';
import { GameCard } from '../components/GameCard';

export function HomePage() {
  const featured = postsApi.list().slice(0, 3);
  return (
    <>
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="kicker"><span /> Kèo gần bạn. Vào sân nhanh.</p>
          <h1>ĐỪNG ĐỂ<br />SÂN <em>TRỐNG.</em></h1>
          <p className="hero-lead">Tìm người ghép kèo cầu lông tại TP.HCM theo đúng sân, giờ, trình độ và ngân sách.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/explore">Tìm kèo ngay <ArrowRight size={18} /></Link>
            <Link className="button button-ghost" to="/host">Đăng kèo</Link>
          </div>
          <div className="hero-proof"><BadgeCheck size={18} />Không cần đăng nhập để xem kèo</div>
        </div>
        <div className="hero-court" aria-hidden="true">
          <span className="court-word">DROP<br />IN</span>
          <div className="court-lines"><i /><i /><i /></div>
          <div className="shuttle-orbit">●</div>
          <div className="hero-ticket"><b>19:00</b><span>TADA · BÌNH THẠNH</span><small>CÒN 2 SLOT</small></div>
        </div>
      </section>

      <section className="signal-strip">
        <div><Search size={22} /><b>LỌC CHÍNH XÁC</b><span>Quận · ngày · giờ · trình</span></div>
        <div><Map size={22} /><b>NHÌN TRÊN BẢN ĐỒ</b><span>VietMap-ready</span></div>
        <div><Zap size={22} /><b>IMPORT NHANH</b><span>Dán text Facebook thủ công</span></div>
      </section>

      <section className="page-shell section-block">
        <div className="section-heading"><div><p className="eyebrow">Kèo đang nóng</p><h2>Vào sân tuần này</h2></div><Link to="/explore">Xem tất cả <ArrowRight size={16} /></Link></div>
        <div className="card-grid">{featured.map((game) => <GameCard key={game.id} game={game} />)}</div>
      </section>
    </>
  );
}
