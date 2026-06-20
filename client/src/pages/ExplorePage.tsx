import React, { useState, useEffect } from 'react';
import type { SearchFilters as ISearchFilters, GamePost } from '../types';
import { SearchFilters } from '../components/SearchFilters';
import { GameList } from '../components/GameList';
import { MapView } from '../components/MapView';
import { api } from '../api';

export const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [posts, setPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="layout-container py-8 flex gap-6" style={{ height: 'calc(100vh - 70px)' }}>
      {/* Left Sidebar */}
      <div style={{ width: '300px', flexShrink: 0, overflowY: 'auto' }}>
        <SearchFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 gap-6" style={{ overflowY: 'auto' }}>
        <div style={{ height: '400px', flexShrink: 0 }}>
          <MapView />
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Available Games ({loading ? '...' : posts.length})</h2>
          {loading ? <p>Loading...</p> : <GameList posts={posts} />}
        </div>
      </div>
    </div>
  );
};
