import React, { useState, useEffect } from 'react';
import type { SearchFilters as ISearchFilters, GamePost } from '../types';
import { SearchFilters } from '../components/SearchFilters';
import { GameList } from '../components/GameList';
import { MockMap } from '../components/MockMap';
import { api } from '../api';

export const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [posts, setPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredGameId, setHoveredGameId] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<GamePost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await api.getPosts(filters);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filters]);

  const handleGameClick = (game: GamePost) => {
    if (!document.startViewTransition) {
      setSelectedGame(game);
      return;
    }
    document.startViewTransition(() => {
      setSelectedGame(game);
    });
  };

  const closeGameModal = () => {
    if (!document.startViewTransition) {
      setSelectedGame(null);
      return;
    }
    document.startViewTransition(() => {
      setSelectedGame(null);
    });
  };

  return (
    <div className="container py-8 explore-layout" style={{ height: 'calc(100vh - 70px)' }}>
      {/* Left Sidebar */}
      <div style={{ width: '100%', maxWidth: '300px', flexShrink: 0, overflowY: 'auto' }}>
        <SearchFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Main Content */}
      <div className="flex-col flex-1" style={{ display: 'flex', gap: '24px', overflowY: 'auto', minWidth: 0 }}>
        <div style={{ height: '400px', flexShrink: 0 }}>
          <MockMap games={posts} hoveredGameId={hoveredGameId} />
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Available Games ({loading ? '...' : posts.length})</h2>
          {loading ? <p>Loading...</p> : <GameList posts={posts} onHover={setHoveredGameId} onClick={handleGameClick} />}
        </div>
      </div>

      {/* View Transition Modal Overlay */}
      {selectedGame && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={closeGameModal}>
          <div style={{
            backgroundColor: 'var(--surface)',
            width: '100%', maxWidth: '500px',
            borderRadius: '24px', overflow: 'hidden',
            viewTransitionName: `game-card-morph-${selectedGame.id}`,
            boxShadow: 'var(--shadow-lg)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ height: '200px', backgroundColor: 'var(--soft-bg)' }} />
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>{selectedGame.courtName}</h2>
              <p className="text-muted">{selectedGame.district} • {selectedGame.startTime} - {selectedGame.endTime}</p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                <button className="btn btn-primary flex-1">Book now</button>
                <button className="btn btn-outline" onClick={closeGameModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
