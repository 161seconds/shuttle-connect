import React from 'react';
import type { GamePost } from '../types';
import { MapPin, Clock, Calendar, Users, DollarSign, Award } from 'lucide-react';

export const GameCard: React.FC<{ post: GamePost }> = ({ post }) => {
  const isFull = post.slotsNeeded <= 0;

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg" style={{ color: 'var(--primary)' }}>{post.court.name}</h3>
        <span style={{
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 600,
          background: isFull ? 'var(--danger)' : 'var(--success)',
          color: 'white'
        }}>
          {isFull ? 'Full' : 'Open'}
        </span>
      </div>

      <div className="flex items-center gap-2 text-muted text-sm">
        <MapPin size={16} />
        {post.court.address}, {post.court.district}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1"><Calendar size={16}/> {post.date}</div>
        <div className="flex items-center gap-1"><Clock size={16}/> {post.startTime} - {post.endTime}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mt-2">
        <div className="flex items-center gap-1"><Award size={16} className="text-muted"/> {post.skillLevel}</div>
        <div className="flex items-center gap-1"><Users size={16} className="text-muted"/> Needs {post.slotsNeeded}</div>
        <div className="flex items-center gap-1"><DollarSign size={16} className="text-muted"/> {post.price.toLocaleString()} VND</div>
      </div>

      <div className="mt-2 text-sm text-muted border-t pt-2" style={{ borderColor: 'var(--border-color)' }}>
        Host: {post.host.name} {post.host.isVerified && '✓'} | Source: {post.source}
      </div>

      <div className="flex gap-2 mt-2">
        <button className="btn-primary" style={{ flex: 1 }} disabled={isFull}>
          Contact Host
        </button>
        <button className="btn-outline">
          Details
        </button>
      </div>
    </div>
  );
};
