import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import vietmapgl from '@vietmap/vietmap-gl-js/dist/vietmap-gl';
import '@vietmap/vietmap-gl-js/dist/vietmap-gl.css';
import type { GamePost } from '../types';
import { MapMapIcon } from './icons';

interface MockMapProps {
  games?: GamePost[];
}

export const MockMap: React.FC<MockMapProps> = ({ games = [] }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<any>(null);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');

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
      style: `https://maps.vietmap.vn/api/maps/light/styles.json?apikey=${apiKey}`, // Always use light as base
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
          // SVG for MapPinIcon directly in innerHTML
          el.innerHTML = `
            <div style="cursor: pointer; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); color: var(--blue);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--surface)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          `;
          
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

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    };
    
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

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
          <div 
            ref={mapContainerRef} 
            style={{ 
              width: '100%', 
              height: '100%', 
              position: 'absolute', 
              inset: 0,
              filter: theme === 'dark' ? 'invert(100%) hue-rotate(180deg) saturate(1.5) brightness(0.9) contrast(0.9)' : 'none',
              transition: 'filter 0.3s ease'
            }} 
          />
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
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '16px' }}>
            <MapMapIcon size={48} />
          </div>
          <h3>Chưa cấu hình VietMap API Key</h3>
          <p>Vui lòng thêm VITE_VIETMAP_API_KEY vào file .env</p>
        </div>
      )}
    </div>
  );
};
