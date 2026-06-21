import React from 'react';
import type { GamePost } from '../types';
import { MapPinIcon, ClockIcon, UsersIcon, BookmarkIcon } from './icons';

interface CompactGameItemProps {
  game: GamePost;
}

export const CompactGameItem: React.FC<CompactGameItemProps> = ({ game }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      borderBottom: '1px solid var(--border)',
      alignItems: 'center',
      backgroundColor: 'var(--surface)',
      borderRadius: '16px',
      marginBottom: '12px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '12px',
        backgroundColor: 'var(--soft-bg)',
        border: '1px solid var(--border)',
        position: 'relative',
        flexShrink: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          backgroundColor: 'var(--green)',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '9999px',
          fontSize: '10px',
          fontWeight: 600
        }}>
          {game.slotsText}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>{game.courtName}</h4>
        <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><MapPinIcon size={14} /> {game.district}</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><ClockIcon size={14} /> {game.startTime} - {game.endTime} · {game.dateLabel}</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><UsersIcon size={14} /> Trình: {game.skillLevel}</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginTop: '4px' }}>
          {game.price.toLocaleString()}đ<span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--muted)' }}>/người</span>
        </div>
      </div>

      <button style={{ color: 'var(--blue)', padding: '8px', alignSelf: 'flex-start', display: 'flex' }}>
        <BookmarkIcon size={20} />
      </button>
    </div>
  );
};
