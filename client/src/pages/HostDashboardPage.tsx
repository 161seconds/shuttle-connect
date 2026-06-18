import React from 'react';
import { ImportFacebookPost } from '../components/ImportFacebookPost';
import { HostPostForm } from '../components/HostPostForm';
import { mockPosts } from '../data/mockPosts';
import { GameList } from '../components/GameList';

export const HostDashboardPage: React.FC = () => {
  // Only showing posts hosted by the current user (mocked as 'h1' or just showing all for now)
  const hostPosts = mockPosts;

  return (
    <div className="layout-container py-8">
      <h1 className="text-2xl font-bold mb-8">Host Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <HostPostForm />
        </div>
        <div>
          <ImportFacebookPost />
          
          <div className="card mt-8" style={{ background: 'rgba(59, 130, 246, 0.05)' }}>
            <h3 className="font-bold text-lg mb-2">Facebook API Status</h3>
            <p className="text-sm text-muted">
              Official Facebook Page API integration is planned for a future release. Group scraping is not supported to comply with policies.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-xl mb-4">Your Active Posts</h2>
        <GameList posts={hostPosts} />
      </div>
    </div>
  );
};
