import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import vietmapgl from '@vietmap/vietmap-gl-js/dist/vietmap-gl';
import '@vietmap/vietmap-gl-js/dist/vietmap-gl.css';
import type { GamePost } from '../types';
import { MapMapIcon } from './icons';

interface MockMapProps {
  games?: GamePost[];
  hoveredGameId?: string | null;
}

export const MockMap: React.FC<MockMapProps> = ({ games = [], hoveredGameId }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');
  const markersRef = useRef<{ [key: string]: any }>({});
  const domElementsRef = useRef<{ [key: string]: HTMLDivElement }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const apiKey = import.meta.env.VITE_VIETMAP_API_KEY || '';
    
    if (!apiKey) {
      console.warn("No VietMap API key found");
      return;
    }

    const mapInstance = new vietmapgl.Map({
      container: mapContainerRef.current,
      style: `https://maps.vietmap.vn/api/maps/light/styles.json?apikey=${apiKey}`, 
      center: [106.68, 10.76], 
      zoom: 11,
      pitch: 45, // Overdrive: Add 3D pitch
      bearing: 0
    });

    mapInstance.on('load', () => {
      setMap(mapInstance);
      
      games.forEach(game => {
        if (game.lat && game.lng) {
          const el = document.createElement('div');
          el.innerHTML = `
            <div style="cursor: pointer; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); color: var(--blue); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--surface)" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          `;
          
          domElementsRef.current[game.id] = el.firstElementChild as HTMLDivElement;

          const marker = new vietmapgl.Marker({ element: el })
            .setLngLat([game.lng, game.lat])
            .addTo(mapInstance);
            
          markersRef.current[game.id] = marker;
        }
      });
    });

    return () => {
      mapInstance.remove();
    };
  }, [games]);

  useEffect(() => {
    if (!map || !hoveredGameId) return;

    // Reset all markers
    Object.values(domElementsRef.current).forEach(el => {
      el.style.transform = 'scale(1)';
      el.style.animation = 'none';
      el.style.color = 'var(--blue)';
    });

    const activeGame = games.find(g => g.id === hoveredGameId);
    if (activeGame && activeGame.lat && activeGame.lng) {
      // Cinematic Fly-to
      map.flyTo({
        center: [activeGame.lng, activeGame.lat],
        zoom: 13,
        speed: 1.2,
        curve: 1.4,
        pitch: 60,
        essential: true 
      });

      // Animate Active Marker
      const activeEl = domElementsRef.current[hoveredGameId];
      if (activeEl) {
        activeEl.style.color = 'var(--warning)';
        activeEl.style.animation = 'map-pulse 2s infinite';
        activeEl.style.borderRadius = '50%';
      }
    }
  }, [hoveredGameId, map, games]);

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
