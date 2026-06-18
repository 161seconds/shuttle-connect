import React, { useState } from 'react';
import type { SearchFilters as ISearchFilters } from '../types';
import { SearchFilters } from '../components/SearchFilters';
import { GameList } from '../components/GameList';
import { MapView } from '../components/MapView';
import { mockPosts } from '../data/mockPosts';

export const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState<ISearchFilters>({});

  // Filter logic
  const filteredPosts = mockPosts.filter(post => {
    if (filters.district && post.court.district !== filters.district) return false;
    if (filters.date && post.date !== filters.date) return false;
    if (filters.skillLevel && post.skillLevel !== filters.skillLevel) return false;
    if (filters.maxPrice && post.price > filters.maxPrice) return false;
    if (filters.availableSlotsOnly && post.slotsNeeded <= 0) return false;
    return true;
  });

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
          <h2 className="font-bold text-xl mb-4">Available Games ({filteredPosts.length})</h2>
          <GameList posts={filteredPosts} />
        </div>
      </div>
    </div>
  );
};
