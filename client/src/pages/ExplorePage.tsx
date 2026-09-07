import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { postsApi } from '../api';
import { GameCard } from '../components/GameCard';
import { MapView } from '../components/MapView';
import { SearchFilters } from '../components/SearchFilters';
import type { GamePost, SearchFilters as Filters } from '../types';

const initialFilters: Filters = { district: '', date: '', startTime: '', endTime: '', skillLevel: '', maxPrice: '', availableSlotsOnly: true };

export function ExplorePage() {
  const [filters, setFilters] = useState(initialFilters);
  const [selected, setSelected] = useState<GamePost>();
  const games = useMemo(() => postsApi.list(filters), [filters]);

  return (
    <main className="page-shell explore-page">
      <div className="page-intro"><p className="eyebrow">Khám phá</p><h1>Tìm đúng kèo.<br />Đánh đúng trình.</h1><p>{games.length} kèo phù hợp đang hiển thị.</p></div>
      <SearchFilters value={filters} onChange={setFilters} />
      <div className="explore-layout">
        <div className="game-list">
          {games.length ? games.map((game) => <GameCard key={game.id} game={game} onDetails={setSelected} />) : <div className="empty-state"><b>Chưa có kèo phù hợp.</b><span>Thử nới bộ lọc khu vực, giờ hoặc giá.</span></div>}
        </div>
        <MapView games={games} selectedId={selected?.id} onSelect={setSelected} />
      </div>
      {selected && <div className="modal-backdrop" onMouseDown={() => setSelected(undefined)}><section className="detail-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Chi tiết kèo">
        <button className="modal-close" onClick={() => setSelected(undefined)} aria-label="Đóng"><X size={20} /></button>
        <p className="eyebrow">{selected.district} · {selected.status}</p><h2>{selected.courtName}</h2>
        <p>{selected.address}</p><div className="detail-grid"><span><small>Ngày</small>{new Date(`${selected.playDate}T00:00:00`).toLocaleDateString('vi-VN')}</span><span><small>Giờ</small>{selected.startTime}–{selected.endTime}</span><span><small>Trình</small>{selected.skillLevel}</span><span><small>Chi phí</small>{selected.price === 0 ? 'Miễn phí' : `${selected.price.toLocaleString('vi-VN')}đ`}</span></div>
        <p className="modal-description">{selected.description}</p><a className="button button-primary full-button" href={`tel:${selected.contactInfo}`}>Liên hệ {selected.hostName} · {selected.contactInfo}</a>
      </section></div>}
    </main>
  );
}
