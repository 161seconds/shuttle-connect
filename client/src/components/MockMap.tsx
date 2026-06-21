import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import vietmapgl from '@vietmap/vietmap-gl-js/dist/vietmap-gl';
import '@vietmap/vietmap-gl-js/dist/vietmap-gl.css';
import type { GamePost } from '../types';

interface MockMapProps {
  games?: GamePost[];
}

export const MockMap: React.FC<MockMapProps> = ({ games = [] }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const apiKey = import.meta.env.VITE_VIETMAP_API_KEY || '';
    
    // Fallback if no API key
    if (!apiKey) {
      console.warn("No VietMap API key found");
      return;
    }

    const mapInstance = new vietmapgl.Map({
      container: mapContainerRef.current,
      style: `https://maps.vietmap.vn/api/maps/light/styles.json?apikey=${apiKey}`,
      center: [106.68, 10.76], // HCMC center
      zoom: 11,
      pitch: 0,
      bearing: 0
    });

    mapInstance.on('load', () => {
      setMap(mapInstance);
      
      // Add markers
      games.forEach(game => {
        if (game.lat && game.lng) {
          const el = document.createElement('div');
          el.innerHTML = '<div style="font-size: 32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); cursor: pointer;">📍</div>';
          
          el.addEventListener('click', () => {
            new vietmapgl.Popup({ offset: 25 })
              .setDOMContent(
                (function() {
                  const div = document.createElement('div');
                  div.innerHTML = `
                    <div style="padding: 4px; font-family: sans-serif; color: #111827;">
                      <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700;">${game.courtName}</h4>
                      <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${game.startTime} - ${game.endTime}</p>
                      <p style="margin: 0; font-size: 12px; font-weight: bold; color: #0d5cff;">${game.price.toLocaleString()}đ</p>
                    </div>
                  `;
                  return div;
                })()
              )
              .setLngLat([game.lng!, game.lat!])
              .addTo(mapInstance);
          });

          new vietmapgl.Marker({ element: el })
            .setLngLat([game.lng, game.lat])
            .addTo(mapInstance);
        }
      });
    });

    return () => {
      mapInstance.remove();
    };
  }, [games]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '600px',
      backgroundColor: 'var(--soft-bg)',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {import.meta.env.VITE_VIETMAP_API_KEY ? (
        <>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
          {/* Action Button */}
          <button style={{
            position: 'absolute',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--blue)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: 'var(--shadow-md)',
            zIndex: 10
          }}>
            Tìm kiếm trong khu vực này
          </button>
        </>
      ) : (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
          <h3>Chưa cấu hình VietMap API Key</h3>
          <p>Vui lòng thêm VITE_VIETMAP_API_KEY vào file .env</p>
        </div>
      )}
    </div>
  );
};
