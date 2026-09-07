import { MapPin } from 'lucide-react';
import type { GamePost } from '../types';

// Future VietMap integration:
// Use import.meta.env.VITE_VIETMAP_API_KEY here.
// Add markers based on court latitude and longitude.
export function MapView({ games, selectedId, onSelect }: { games: GamePost[]; selectedId?: string; onSelect: (game: GamePost) => void }) {
  const position = (game: GamePost) => ({
    left: `${10 + ((game.lng - 106.60) / (106.78 - 106.60)) * 80}%`,
    top: `${90 - ((game.lat - 10.72) / (10.87 - 10.72)) * 80}%`,
  });

  return (
    <section className="map-card" aria-label="Bản đồ sân cầu lông mô phỏng">
      <div className="map-grid" />
      <div className="river river-one" /><div className="river river-two" />
      <span className="map-label label-center">TRUNG TÂM</span>
      <span className="map-label label-north">BÌNH THẠNH</span>
      <span className="map-label label-east">THỦ ĐỨC</span>
      <span className="map-label label-west">TÂN PHÚ</span>
      {games.map((game) => (
        <button key={game.id} className={selectedId === game.id ? 'map-pin is-selected' : 'map-pin'} style={position(game)} onClick={() => onSelect(game)} aria-label={`Xem ${game.courtName}`}>
          <MapPin size={19} fill="currentColor" />
          <span>{game.price === 0 ? 'Free' : `${game.price / 1000}k`}</span>
        </button>
      ))}
      <div className="map-legend"><span>{games.length} kèo</span><small>VietMap-ready placeholder</small></div>
    </section>
  );
}
