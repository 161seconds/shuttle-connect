import { CalendarDays, Clock3, MapPin, Phone, Users } from 'lucide-react';
import type { GamePost } from '../types';

const statusLabel = { OPEN: 'Còn chỗ', APPROVED: 'Đã duyệt', FULL: 'Đủ người', EXPIRED: 'Hết hạn', PENDING: 'Chờ duyệt', REJECTED: 'Từ chối', DUPLICATE: 'Trùng bài' };

export function GameCard({ game, onDetails }: { game: GamePost; onDetails?: (game: GamePost) => void }) {
  return (
    <article className="game-card">
      <div className="game-card-topline">
        <span className={`status status-${game.status.toLowerCase()}`}>{statusLabel[game.status]}</span>
        <span className="source">{game.sourceType === 'FACEBOOK_IMPORT' ? 'Facebook import' : 'Host đăng'}</span>
      </div>
      <div>
        <p className="eyebrow">{game.district}</p>
        <h3>{game.courtName}</h3>
        <p className="address"><MapPin size={15} />{game.address}</p>
      </div>
      <div className="game-facts">
        <span><CalendarDays size={16} />{new Date(`${game.playDate}T00:00:00`).toLocaleDateString('vi-VN')}</span>
        <span><Clock3 size={16} />{game.startTime}–{game.endTime}</span>
        <span><Users size={16} />Cần {game.slotsNeeded} người</span>
      </div>
      <div className="skill-row">
        <span>{game.skillLevel}</span>
        <strong>{game.price === 0 ? 'Miễn phí' : `${game.price.toLocaleString('vi-VN')}đ`}</strong>
      </div>
      <p className="description">{game.description}</p>
      <div className="card-footer">
        <span className="host-name">Host · {game.hostName}</span>
        <div className="card-actions">
          <a className="button button-ghost button-small" href={`tel:${game.contactInfo}`}><Phone size={15} />Liên hệ</a>
          {onDetails && <button className="button button-dark button-small" onClick={() => onDetails(game)}>Chi tiết</button>}
        </div>
      </div>
    </article>
  );
}
