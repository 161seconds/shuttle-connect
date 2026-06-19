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
  iconBgColor = '#e5edf7',
  iconColor = '#0d5cff',
  label, 
  number, 
  subtext,
  subtextColor = '#18b365'
}) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      border: '1px solid var(--border)'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: iconBgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: iconColor
      }}>
        {iconUrl}
      </div>
      <div>
        <div style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{number}</div>
        <div style={{ fontSize: '12px', color: subtextColor, marginTop: '4px', fontWeight: 500 }}>{subtext}</div>
      </div>
    </div>
  );
};
