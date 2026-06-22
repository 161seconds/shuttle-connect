import React, { useState, useEffect } from 'react';
import type { SearchFilters as ISearchFilters, GamePost } from '../types';
import { SearchFilters } from '../components/SearchFilters';
import { GameList } from '../components/GameList';
import { MockMap } from '../components/MockMap';
import { SkeletonGameCard } from '../components/SkeletonGameCard';
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
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
      
      {/* Left Column: Filters and List (Scrollable) */}
      <div style={{ 
        width: '40%', minWidth: '400px', maxWidth: '500px', 
        height: '100%', overflowY: 'auto', 
        borderRight: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Filters Sticky Header */}
        <div style={{ padding: '24px', position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
          <h2 className="font-bold text-2xl mb-4" style={{ color: 'var(--navy)' }}>Khám phá kèo</h2>
          <SearchFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Scrollable List */}
        <div style={{ padding: '24px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="font-bold text-lg">Kết quả ({loading ? '...' : posts.length})</h3>
          </div>
          {loading ? (
            <div className="flex flex-col gap-4">
              <SkeletonGameCard />
              <SkeletonGameCard />
              <SkeletonGameCard />
            </div>
          ) : (
            <GameList posts={posts} onHover={setHoveredGameId} onClick={handleGameClick} />
          )}
        </div>
      </div>

      {/* Right Column: Sticky Map */}
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        <MockMap games={posts} hoveredGameId={hoveredGameId} />
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
