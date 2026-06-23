import React, { useState, useEffect } from 'react';
import { GameCard } from '../components/GameCard';
import { api } from '../api';
import type { GamePost, PostStatus } from '../types';
import { useAlert } from '../contexts/GlobalAlertContext';

export const AdminReviewPage: React.FC = () => {
  const [pendingPosts, setPendingPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  const fetchPendingPosts = async () => {
    setLoading(true);
    try {
      // The backend should technically support filtering by status: api.getPosts({ status: 'PENDING' })
      // For now, let's fetch all and filter client side if the backend doesn't support the status query param type yet
      const data = await api.getPosts();
      setPendingPosts(data.filter(p => p.status === 'PENDING' || p.sourceType === 'FACEBOOK_IMPORT'));
    } catch (error) {
      console.error('Error fetching pending posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const handleUpdateStatus = async (id: string, status: PostStatus) => {
    try {
      await api.updatePostStatus(id, status);
      fetchPendingPosts();
    } catch (error) {
      console.error('Error updating status:', error);
      showAlert('Failed to update status', 'error');
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Review Dashboard</h1>
      <p className="text-muted mb-8">Review imported posts from hosts to ensure data quality and avoid duplicates.</p>

      {loading ? (
        <p>Loading...</p>
      ) : pendingPosts.length === 0 ? (
        <p>No pending posts to review.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {pendingPosts.map(post => (
            <div key={post.id} className="card flex flex-col gap-4" style={{ borderLeft: '4px solid var(--warning)' }}>
              <div className="flex justify-between items-center">
                <span className="font-bold">Needs Review - Confidence Score: 85%</span>
              </div>
              <GameCard game={post} />
              
              <div className="flex gap-4 mt-4">
                <button onClick={() => handleUpdateStatus(post.id, 'APPROVED')} className="btn btn-success">Approve</button>
                <button onClick={() => handleUpdateStatus(post.id, 'DUPLICATE')} className="btn btn-outline">Mark Duplicate</button>
                <button onClick={() => handleUpdateStatus(post.id, 'REJECTED')} className="btn btn-danger-outline">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
