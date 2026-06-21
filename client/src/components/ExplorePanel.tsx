import React from 'react';
import { SearchIcon } from './icons';
import { MockMap } from './MockMap';
import type { GamePost } from '../types';

interface ExplorePanelProps {
  games?: GamePost[];
}

export const ExplorePanel: React.FC<ExplorePanelProps> = ({ games = [] }) => {
  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--border)',
      height: '680px', // Controlled fixed height as requested
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>Khám phá kèo</h2>
      
      {/* Filters Bar (Compact) */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        flexWrap: 'wrap',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ flex: '1 1 150px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '10px', top: '8px', color: 'var(--muted)', display: 'flex' }}><SearchIcon size={14} /></span>
          <input type="text" placeholder="Tìm sân..." style={{ width: '100%', paddingLeft: '32px', fontSize: '13px' }} />
        </div>
        <select style={{ flex: '1 1 100px', fontSize: '13px' }}><option>Quận/huyện</option></select>
        <input type="date" value="2025-05-23" style={{ flex: '1 1 110px', fontSize: '13px' }} onChange={()=>{}}/>
        <select style={{ flex: '1 1 100px', fontSize: '13px' }}><option>Thời gian</option></select>
        <select style={{ flex: '1 1 90px', fontSize: '13px' }}><option>Trình độ</option></select>
        <button className="btn btn-primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '13px', flexShrink: 0 }}>
          Lọc
        </button>
      </div>

      {/* Content Area: Map Only */}
      <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', minHeight: 0 }}>
        <MockMap games={games} />
      </div>
    </div>
  );
};
