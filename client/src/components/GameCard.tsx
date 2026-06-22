import React from 'react';
import type { GamePost } from '../types';
import { MapPinIcon, ClockIcon, UsersIcon } from './icons';

interface GameCardProps {
  game: GamePost;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <div 
      className="hover-tilt"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        backgroundColor: 'var(--surface)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        viewTransitionName: `game-card-morph-${game.id}`,
      }}
    >
      {/* Image Placeholder */}
      <div style={{
        height: '160px',
        backgroundColor: 'var(--soft-bg)',
        borderBottom: '1px solid var(--border)',
        position: 'relative'
      }}>
        {/* Slot Badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          backgroundColor: 'var(--green)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 600
        }}>
          {game.slotsText}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>{game.courtName}</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'flex' }}><MapPinIcon size={16} /></span> <span>{game.district}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'flex' }}><ClockIcon size={16} /></span> <span>{game.startTime} - {game.endTime} · {game.dateLabel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'flex' }}><UsersIcon size={16} /></span> <span>Trình: {game.skillLevel}</span>
          </div>
        </div>

        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)' }}>
            {game.price.toLocaleString()}đ<span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--muted)' }}>/người</span>
          </span>
          <button className="hover-scale-icon" style={{ 
            color: 'var(--blue)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '14px',
            fontWeight: 600,
            padding: '6px 12px',
            backgroundColor: 'var(--soft-bg)',
            borderRadius: '9999px',
            transition: 'background-color 0.2s'
          }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--border)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--soft-bg)'}>
            Liên hệ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
