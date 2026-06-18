import React from 'react';
import { MapPin } from 'lucide-react';

export const MapView: React.FC = () => {
  return (
    <div className="card flex items-center justify-center" style={{ height: '100%', minHeight: '400px', background: '#e2e8f0', position: 'relative' }}>
      <div className="text-center text-muted">
        <MapPin size={48} className="mx-auto mb-2" />
        <p className="font-bold text-lg">VietMap Integration Placeholder</p>
        <p className="text-sm">Map and court markers will be rendered here.</p>
        {/* TODO: Add real VietMap integration here */}
        {/* Requires VITE_VIETMAP_API_KEY environment variable */}
      </div>
    </div>
  );
};
