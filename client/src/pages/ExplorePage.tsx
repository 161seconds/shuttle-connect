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
    <div className="explore-container" style={{ display: 'flex', height: 'calc(100vh - 70px)', overflow: 'hidden', fontFamily: '"Be Vietnam Pro", -apple-system, sans-serif' }}>
      <style>{`
        @media (max-width: 1024px) {
          .explore-container {
            flex-direction: column-reverse !important;
          }
          .explore-left {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            height: 60% !important;
          }
          .explore-header {
            padding: 24px !important;
          }
          .explore-title {
            font-size: 32px !important;
          }
        }
      `}</style>
      
      {/* Left Column: Filters and List (Scrollable) */}
      <div className="explore-left" style={{ 
        width: '45%', minWidth: '480px', maxWidth: '600px', 
        height: '100%', overflowY: 'auto', 
        borderRight: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Filters Sticky Header - Bold Navy */}
        <div className="explore-header" style={{ 
          padding: '40px 32px', 
          position: 'sticky', top: 0, zIndex: 10, 
          backgroundColor: 'var(--surface)', 
          color: 'var(--navy)',
          borderBottom: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)' 
        }}>
          <h2 className="explore-title" style={{ fontSize: '40px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-1px' }}>Khám phá kèo</h2>
          <div style={{ backgroundColor: 'var(--bg)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border)' }}>
            <SearchFilters filters={filters} onFilterChange={setFilters} />
          </div>
        </div>

        {/* Scrollable List */}
        <div style={{ padding: '32px', flex: 1, backgroundColor: 'var(--bg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)' }}>Kết quả tìm kiếm ({loading ? '...' : posts.length})</h3>
          </div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SkeletonGameCard />
              <SkeletonGameCard />
              <SkeletonGameCard />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <GameList posts={posts} onHover={setHoveredGameId} onClick={handleGameClick} />
            </div>
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={closeGameModal}>
          <div style={{
            backgroundColor: 'var(--surface)',
            width: '100%', maxWidth: '560px',
            borderRadius: '32px', overflow: 'hidden',
            viewTransitionName: `game-card-morph-${selectedGame.id}`,
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ height: '240px', backgroundColor: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 900 }}>
              Sân Cầu Lông
            </div>
            <div style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-1px', color: 'var(--navy)' }}>{selectedGame.courtName}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <span style={{ padding: '8px 16px', backgroundColor: 'var(--soft-bg)', color: 'var(--blue)', borderRadius: '8px', fontWeight: 700 }}>{selectedGame.district}</span>
                <span style={{ fontWeight: 600, color: 'var(--muted)', fontSize: '18px' }}>{selectedGame.startTime} - {selectedGame.endTime}</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ flex: 1, padding: '16px', backgroundColor: 'var(--blue)', color: '#ffffff', fontSize: '18px', fontWeight: 800, border: 'none', borderRadius: '12px', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--blue-dark)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--blue)'} onClick={() => alert('Booked!')}>Đặt chỗ ngay</button>
                <button style={{ padding: '16px 32px', backgroundColor: 'transparent', color: 'var(--text)', fontSize: '18px', fontWeight: 700, border: '2px solid var(--border)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--soft-bg)'; }} onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; }} onClick={closeGameModal}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
