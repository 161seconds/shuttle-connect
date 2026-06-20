import React from 'react';

interface FeatureCardProps {
  iconUrl?: React.ReactNode;
  title: string;
  text: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ iconUrl, title, text }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '24px 16px',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '16px',
      height: '100%'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--soft-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px'
      }}>
        {iconUrl}
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
};
