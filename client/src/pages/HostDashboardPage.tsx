import React, { useState, useEffect } from 'react';
import { ImportFacebookPost } from '../components/ImportFacebookPost';
import { HostPostForm } from '../components/HostPostForm';
import { GameList } from '../components/GameList';
import { api } from '../api';
import type { GamePost } from '../types';

export const HostDashboardPage: React.FC = () => {
  const [hostPosts, setHostPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHostPosts = async () => {
    setLoading(true);
    try {
      // In a real app we'd filter by hostId. For MVP we fetch all.
      const data = await api.getPosts();
      setHostPosts(data);
    } catch (error) {
      console.error('Error fetching host posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostPosts();
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Host Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <HostPostForm onSuccess={fetchHostPosts} />
        </div>
        <div>
          <ImportFacebookPost onSuccess={fetchHostPosts} />
          
          <div className="card mt-8" style={{ background: 'var(--soft-bg)' }}>
            <h3 className="font-bold text-lg mb-2">Facebook API Status</h3>
            <p className="text-sm text-muted">
              Official Facebook Page API integration is planned for a future release. Group scraping is not supported to comply with policies.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-xl mb-4">Your Active Posts</h2>
        {loading ? <p>Loading...</p> : <GameList posts={hostPosts} />}
      </div>
    </div>
  );
};
