import React from 'react';

interface FeatureCardProps {
  iconUrl?: React.ReactNode;
  title: string;
  text: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ iconUrl, title, text }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '12px',
      height: '100%'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'var(--soft-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: 'var(--blue)'
      }}>
        {iconUrl}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', margin: 0, lineHeight: 1.3 }}>{title}</h3>
        {text && <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.4 }}>{text}</p>}
      </div>
    </div>
  );
};
