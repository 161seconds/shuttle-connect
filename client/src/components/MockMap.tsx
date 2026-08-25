import React, { useState, useEffect } from 'react';
import type { GamePost } from '../types';
import { BadmintonIcon, MapPinIcon, ClockIcon, UsersIcon } from './icons';

// Future VietMap integration:
// Use import.meta.env.VITE_VIETMAP_API_KEY here.
// Add markers based on court latitude and longitude.

interface MockMapProps {
  games?: GamePost[];
  hoveredGameId?: string | null;
  onSelectGame?: (game: GamePost) => void;
}

export const MockMap: React.FC<MockMapProps> = ({ games = [], hoveredGameId, onSelectGame }) => {
  const [selectedPinGame, setSelectedPinGame] = useState<GamePost | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeDistrictFilter, setActiveDistrictFilter] = useState<string>('Tất cả');

  // Sync selected pin when hovered from list
  useEffect(() => {
    if (hoveredGameId) {
      const found = games.find(g => g.id === hoveredGameId);
      if (found) setSelectedPinGame(found);
    }
  }, [hoveredGameId, games]);

  // HCMC Coordinates bounding box helper for map visualization
  // Lat range: ~10.72 (Q7) to 10.86 (Thủ Đức)
  // Lng range: ~106.60 (Tân Phú) to 106.77 (Thủ Đức)
  const minLat = 10.72;
  const maxLat = 10.87;
  const minLng = 10.60;
  const maxLng = 106.78;

  const getPositionOnMap = (lat?: number, lng?: number) => {
    if (!lat || !lng) {
      return { x: 50, y: 50 };
    }
    const x = ((lng - minLng) / (maxLng - minLng)) * 80 + 10;
    const y = 90 - ((lat - minLat) / (maxLat - minLat)) * 80;
    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(8, Math.min(92, y))
    };
  };

  const filteredGames = activeDistrictFilter === 'Tất cả'
    ? games
    : games.filter(g => g.district.includes(activeDistrictFilter));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '520px',
      backgroundColor: 'var(--bg)',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Map Controls */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        right: '16px',
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'none'
      }}>
        {/* District Quick Filter Chips */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          padding: '4px',
          backgroundColor: 'var(--surface)',
          borderRadius: '9999px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border)',
          pointerEvents: 'auto',
          maxWidth: '80%'
        }}>
          {['Tất cả', 'Bình Thạnh', 'Quận 10', 'Tân Bình', 'Quận 7', 'Thủ Đức'].map(d => (
            <button
              key={d}
              onClick={() => {
                setActiveDistrictFilter(d);
                setSelectedPinGame(null);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                backgroundColor: activeDistrictFilter === d ? 'var(--blue)' : 'transparent',
                color: activeDistrictFilter === d ? '#ffffff' : 'var(--text)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          backgroundColor: 'var(--surface)',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border)',
          pointerEvents: 'auto'
        }}>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
            style={{ width: '32px', height: '32px', borderRadius: '8px', fontWeight: 800, fontSize: '16px', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Phóng to"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            style={{ width: '32px', height: '32px', borderRadius: '8px', fontWeight: 800, fontSize: '16px', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Thu nhỏ"
          >
            −
          </button>
        </div>
      </div>

      {/* Interactive Vector Map Canvas */}
      <div style={{
        flex: 1,
        position: 'relative',
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease',
        cursor: 'grab'
      }}>
        {/* Stylized SVG Map Base of HCMC */}
        <svg
          viewBox="0 0 1000 700"
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          preserveAspectRatio="none"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="sport-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.8" opacity="0.6" />
            </pattern>
            <linearGradient id="river-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Map Background with Grid */}
          <rect width="1000" height="700" fill="var(--soft-bg)" />
          <rect width="1000" height="700" fill="url(#sport-grid)" />

          {/* Stylized Saigon River (Sông Sài Gòn) */}
          <path
            d="M 150 0 C 250 150, 450 120, 520 250 C 580 360, 680 320, 720 450 C 760 580, 850 620, 950 700"
            fill="none"
            stroke="url(#river-gradient)"
            strokeWidth="38"
            strokeLinecap="round"
          />
          {/* Nhieu Loc Canal */}
          <path
            d="M 300 200 C 380 250, 440 320, 480 420 C 510 490, 560 530, 620 560"
            fill="none"
            stroke="url(#river-gradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Major District Zones (Stylized polygons) */}
          {/* Quận 1 / 3 / 10 Zone */}
          <circle cx="480" cy="380" r="140" fill="var(--surface)" opacity="0.4" stroke="var(--blue)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="480" y="380" fill="var(--muted)" fontSize="14" fontWeight="700" textAnchor="middle" opacity="0.6">KHU VỰC TRUNG TÂM (Q1 - Q3 - Q10)</text>

          {/* Bình Thạnh Zone */}
          <circle cx="600" cy="240" r="90" fill="var(--surface)" opacity="0.3" stroke="var(--green)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="600" y="240" fill="var(--muted)" fontSize="13" fontWeight="700" textAnchor="middle" opacity="0.6">BÌNH THẠNH</text>

          {/* Tân Bình Zone */}
          <circle cx="340" cy="280" r="100" fill="var(--surface)" opacity="0.3" stroke="var(--orange)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="340" y="280" fill="var(--muted)" fontSize="13" fontWeight="700" textAnchor="middle" opacity="0.6">TÂN BÌNH / SÂN BAY</text>

          {/* Quận 7 Zone */}
          <circle cx="580" cy="560" r="95" fill="var(--surface)" opacity="0.3" stroke="var(--purple)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="580" y="560" fill="var(--muted)" fontSize="13" fontWeight="700" textAnchor="middle" opacity="0.6">QUẬN 7 / NAM SÀI GÒN</text>

          {/* Thủ Đức Zone */}
          <circle cx="780" cy="220" r="110" fill="var(--surface)" opacity="0.3" stroke="var(--blue)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="780" y="220" fill="var(--muted)" fontSize="13" fontWeight="700" textAnchor="middle" opacity="0.6">TP. THỦ ĐỨC</text>
        </svg>

        {/* Dynamic Interactive Court Pins */}
        {filteredGames.map((game) => {
          const pos = getPositionOnMap(game.lat, game.lng);
          const isHovered = hoveredGameId === game.id;
          const isSelected = selectedPinGame?.id === game.id;

          return (
            <div
              key={game.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPinGame(game);
                if (onSelectGame) onSelectGame(game);
              }}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -100%)',
                zIndex: isSelected ? 30 : isHovered ? 25 : 10,
                cursor: 'pointer',
                transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              {/* Pin Bubble */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: isSelected || isHovered ? 'var(--blue)' : 'var(--surface)',
                color: isSelected || isHovered ? '#ffffff' : 'var(--navy)',
                padding: '6px 12px',
                borderRadius: '9999px',
                border: `2px solid ${isSelected || isHovered ? '#ffffff' : 'var(--blue)'}`,
                boxShadow: isSelected || isHovered ? '0 8px 20px rgba(13, 92, 255, 0.4)' : 'var(--shadow-md)',
                transform: isSelected || isHovered ? 'scale(1.15) translateY(-4px)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: isSelected || isHovered ? '#ffffff' : 'var(--soft-bg)',
                  color: isSelected || isHovered ? 'var(--blue)' : 'var(--blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BadmintonIcon size={12} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                    {game.courtName}
                  </span>
                  <span style={{ fontSize: '10px', opacity: 0.85, whiteSpace: 'nowrap' }}>
                    {game.price / 1000}k • {game.slotsText}
                  </span>
                </div>
              </div>

              {/* Pin Point Pointer */}
              <div style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `8px solid ${isSelected || isHovered ? 'var(--blue)' : 'var(--surface)'}`,
                margin: '-2px auto 0'
              }} />

              {/* Radar pulse for active item */}
              {(isSelected || isHovered) && (
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '100%',
                  width: '24px',
                  height: '24px',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  backgroundColor: 'var(--blue)',
                  opacity: 0.4,
                  animation: 'map-pulse 1.8s infinite',
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Court Popup Card */}
      {selectedPinGame && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          maxWidth: '420px',
          margin: '0 auto',
          backgroundColor: 'var(--surface)',
          borderRadius: '20px',
          padding: '16px 20px',
          boxShadow: 'var(--shadow-lg)',
          border: '2px solid var(--blue)',
          zIndex: 40,
          animation: 'reveal-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'var(--soft-bg)', color: 'var(--blue)', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                {selectedPinGame.district}
              </div>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--navy)' }}>
                {selectedPinGame.courtName}
              </h4>
            </div>
            <button
              onClick={() => setSelectedPinGame(null)}
              style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--soft-bg)', color: 'var(--muted)', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ×
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ClockIcon size={14} /> {selectedPinGame.startTime} - {selectedPinGame.endTime} ({selectedPinGame.dateLabel})</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><UsersIcon size={14} /> Trình: {selectedPinGame.skillLevel}</span>
            <span style={{ fontWeight: 800, color: 'var(--blue)' }}>{selectedPinGame.price.toLocaleString()}đ/người</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1, padding: '8px 16px', fontSize: '13px', borderRadius: '10px' }}
              onClick={() => onSelectGame && onSelectGame(selectedPinGame)}
            >
              Xem chi tiết & Ghép kèo
            </button>
            <a
              href={`tel:${selectedPinGame.contactInfo}`}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                backgroundColor: 'var(--soft-bg)',
                color: 'var(--navy)',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Gọi ngay
            </a>
          </div>
        </div>
      )}

      {/* Map Footer Helper */}
      <div style={{
        padding: '8px 16px',
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: 'var(--muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPinIcon size={14} />
          <span>Bản đồ thể thao TP. HCM • <strong>{filteredGames.length}</strong> sân đang mở</span>
        </div>
        <span style={{ fontSize: '11px', opacity: 0.8 }}>
          {import.meta.env.VITE_VIETMAP_API_KEY ? 'VietMap GL Active' : 'Chế độ Bản đồ Vector'}
        </span>
      </div>
    </div>
  );
};

