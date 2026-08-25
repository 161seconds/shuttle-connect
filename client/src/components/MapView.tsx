import React from 'react';
import { MockMap } from './MockMap';
import type { GamePost } from '../types';

// Future VietMap integration:
// Use import.meta.env.VITE_VIETMAP_API_KEY here.
// Add markers based on court latitude and longitude.

interface MapViewProps {
  games?: GamePost[];
  hoveredGameId?: string | null;
  onSelectGame?: (game: GamePost) => void;
}

export const MapView: React.FC<MapViewProps> = ({ games = [], hoveredGameId, onSelectGame }) => {
  return (
    <MockMap games={games} hoveredGameId={hoveredGameId} onSelectGame={onSelectGame} />
  );
};

