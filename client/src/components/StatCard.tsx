import React from 'react';

interface StatCardProps {
  iconUrl?: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  label: string;
  number: string;
  subtext: string;
  subtextColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  iconUrl, 
  iconBgColor = 'var(--soft-bg)',
  iconColor = 'var(--blue)',
  label, 
  number, 
  subtext,
  subtextColor = 'var(--green)'
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      borderRadius: '16px',
      padding: '20px 16px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      border: '1px solid var(--border)'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: iconBgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        color: iconColor,
        flexShrink: 0
      }}>
        {iconUrl}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '13px', color: 'var(--navy)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{number}</div>
        <div style={{ fontSize: '12px', color: subtextColor, marginTop: '2px', fontWeight: 500 }}>{subtext}</div>
      </div>
    </div>
  );
};
