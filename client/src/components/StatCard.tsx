import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="card flex items-center gap-4">
      <div style={{ 
        padding: '1rem', 
        borderRadius: '50%', 
        background: 'rgba(59, 130, 246, 0.1)',
        color: 'var(--primary)'
      }}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted">{title}</div>
      </div>
    </div>
  );
};
