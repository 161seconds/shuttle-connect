import React from 'react';
import type { GamePost } from '../types';
import { MapPinIcon, ClockIcon, BadmintonIcon, FacebookIcon } from './icons';

interface GameCardProps {
  game: GamePost;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onMouseEnter, onMouseLeave, onClick }) => {
  const isOpen = game.status === 'OPEN' || game.status === 'APPROVED';
  const isFull = game.status === 'FULL';

  // Skill level energy bar calculator (1 to 5)
  const getSkillBars = (level: string) => {
    const l = level.toLowerCase();
    if (l.includes('yếu')) return 1;
    if (l.includes('tb khá') || l.includes('trung bình khá')) return 3;
    if (l.includes('khá')) return 4;
    if (l.includes('cứng')) return 5;
    return 2; // Default Trung bình
  };

  const skillBarsCount = getSkillBars(game.skillLevel || '');

  return (
    <div 
      className="hover-tilt"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        backgroundColor: 'var(--surface-card)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        height: '100%'
      }}
    >
      {/* Top Banner - Sport Visual Header */}
      <div style={{
        height: '120px',
        background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.15) 0%, rgba(16, 242, 132, 0.1) 100%)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Court Grid Accent */}
        <div className="court-grid-pattern" style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.8,
          pointerEvents: 'none'
        }} />

        {/* Big Shuttle Watermark */}
        <div style={{
          position: 'absolute',
          right: '-15px',
          bottom: '-25px',
          color: 'var(--blue)',
          opacity: 0.12,
          pointerEvents: 'none'
        }}>
          <BadmintonIcon size={130} />
        </div>

        {/* Top Floating Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Live Slot Pulse Badge */}
          <div className={`badge-live ${isOpen ? 'open' : isFull ? 'full' : 'pending'}`}>
            <span className="pulse-dot" />
            <span>{isOpen ? game.slotsText || `Còn ${game.slotsNeeded} slot` : isFull ? 'Đã đủ người' : 'Chờ duyệt'}</span>
          </div>

          {/* Source Badge */}
          <div style={{
            backgroundColor: 'var(--surface)',
            color: game.sourceType === 'FACEBOOK_IMPORT' ? '#1877f2' : 'var(--navy)',
            padding: '3px 9px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 800,
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {game.sourceType === 'FACEBOOK_IMPORT' ? (
              <>
                <FacebookIcon size={12} />
                <span>Facebook</span>
              </>
            ) : (
              <span>Host Tạo</span>
            )}
          </div>
        </div>

        {/* Center Shuttlecock Visual Icon */}
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '16px',
          backgroundColor: 'var(--surface)',
          color: 'var(--blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-md), 0 0 20px var(--blue-glow)',
          border: '1px solid var(--border)',
          zIndex: 1
        }}>
          <BadmintonIcon size={26} />
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
        <div>
          <h4 style={{
            fontSize: '18px',
            fontWeight: 800,
            color: 'var(--navy)',
            margin: '0 0 4px 0',
            lineHeight: 1.25,
            letterSpacing: '-0.3px'
          }}>
            {game.courtName}
          </h4>
          <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Host: <strong style={{ color: 'var(--text)' }}>{game.hostName || 'Chủ sân'}</strong></span>
            <span style={{ color: 'var(--volt)', fontSize: '11px' }}>✓</span>
          </div>
        </div>

        {/* Match Info Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'flex', color: 'var(--blue)' }}><MapPinIcon size={15} /></span>
            <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{game.district}</span>
            <span style={{ fontSize: '12px', opacity: 0.75, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              • {game.address}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'flex', color: 'var(--blue)' }}><ClockIcon size={15} /></span>
            <span style={{ fontWeight: 600 }}>{game.playDate} • {game.startTime} - {game.endTime}</span>
          </div>

          {/* Skill Level Energy Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--soft-bg)', padding: '6px 12px', borderRadius: '10px', marginTop: '2px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Trình độ: <strong style={{ color: 'var(--navy)' }}>{game.skillLevel}</strong></span>
            <div className="skill-meter" title={`Trình độ ${skillBarsCount}/5`}>
              {[1, 2, 3, 4, 5].map(bar => (
                <div 
                  key={bar} 
                  className={`skill-bar ${bar <= skillBarsCount ? 'active volt' : ''}`} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.5px' }}>
              {game.price.toLocaleString()}đ<span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}>/người</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
              style={{ 
                color: 'var(--navy)', 
                fontSize: '13px',
                fontWeight: 700,
                padding: '8px 14px',
                backgroundColor: 'var(--soft-bg)',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--border)'; }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = 'var(--soft-bg)'; }}
            >
              Chi tiết
            </button>

            <a 
              href={`tel:${game.contactInfo}`}
              onClick={(e) => e.stopPropagation()}
              className="btn-primary"
              style={{ 
                fontSize: '13px',
                fontWeight: 800,
                padding: '8px 16px',
                borderRadius: '9999px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Ghép kèo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


