import React from 'react';
import { mockPosts } from '../data/mockPosts';
import { GameCard } from '../components/GameCard';

export const AdminReviewPage: React.FC = () => {
  // Mocking that the second post is an imported post pending review
  const pendingPosts = [mockPosts[1]];

  return (
    <div className="layout-container py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Review Dashboard</h1>
      <p className="text-muted mb-8">Review imported posts from hosts to ensure data quality and avoid duplicates.</p>

      {pendingPosts.length === 0 ? (
        <p>No pending posts to review.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {pendingPosts.map(post => (
            <div key={post.id} className="card flex flex-col gap-4" style={{ borderLeft: '4px solid var(--warning)' }}>
              <div className="flex justify-between items-center">
                <span className="font-bold">Needs Review - Confidence Score: 85%</span>
              </div>
              <GameCard post={post} />
              
              <div className="flex gap-4 mt-2">
                <button className="btn-primary" style={{ background: 'var(--success)' }}>Approve</button>
                <button className="btn-outline">Mark Duplicate</button>
                <button className="btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
