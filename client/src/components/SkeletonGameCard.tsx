import React from 'react';

export const SkeletonGameCard: React.FC = () => {
  return (
    <div 
      style={{
        backgroundColor: 'var(--surface)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image Placeholder Skeleton */}
      <div className="skeleton" style={{ height: '160px', width: '100%', borderBottom: '1px solid var(--border)' }} />

      {/* Content Skeleton */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="skeleton skeleton-text" style={{ width: '70%', height: '24px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
          <div className="skeleton skeleton-text" style={{ width: '50%' }} />
          <div className="skeleton skeleton-text" style={{ width: '80%' }} />
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        </div>

        <div style={{ 
          marginTop: 'auto', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="skeleton skeleton-text" style={{ width: '100px', height: '24px', marginBottom: 0 }} />
          <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
        </div>
      </div>
    </div>
  );
};
