import React from 'react';
import type { GamePost } from '../types';
import { MapPinIcon, ClockIcon, UsersIcon, BookmarkIcon } from './icons';

interface GameCardProps {
  game: GamePost;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Image Placeholder */}
      <div style={{
        height: '160px',
        backgroundColor: '#cbd5e1',
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
          <button style={{ color: 'var(--blue)', display: 'flex' }}><BookmarkIcon size={20} /></button>
        </div>
      </div>
    </div>
  );
};
