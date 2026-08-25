import React, { useState, useEffect } from 'react';
import type { SearchFilters as ISearchFilters, GamePost } from '../types';
import { SearchFilters } from '../components/SearchFilters';
import { GameList } from '../components/GameList';
import { MockMap } from '../components/MockMap';
import { SkeletonGameCard } from '../components/SkeletonGameCard';
import { api } from '../api';
import { useAlert } from '../contexts/GlobalAlertContext';
import { BadmintonIcon, PhoneIcon } from '../components/icons';

export const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState<ISearchFilters>({});
  const [posts, setPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredGameId, setHoveredGameId] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<GamePost | null>(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await api.getPosts(filters);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [filters]);

  const handleGameClick = (game: GamePost) => {
    setSelectedGame(game);
  };

  const closeGameModal = () => {
    setSelectedGame(null);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    showAlert(`Đã sao chép số điện thoại ${phone} vào bộ nhớ tạm!`, 'success');
  };

  return (
    <div className="explore-container" style={{ display: 'flex', height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 1024px) {
          .explore-container {
            flex-direction: column-reverse !important;
            height: auto !important;
            overflow: visible !important;
          }
          .explore-left {
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            height: auto !important;
          }
          .explore-right {
            height: 480px !important;
          }
        }
      `}</style>
      
      {/* Left Column: Filters and List (Scrollable) */}
      <div className="explore-left" style={{ 
        width: '45%', minWidth: '480px', maxWidth: '620px', 
        height: '100%', overflowY: 'auto', 
        borderRight: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Filters Sticky Header */}
        <div style={{ 
          padding: '24px 20px', 
          position: 'sticky', top: 0, zIndex: 10, 
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderBottom: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', margin: 0, color: 'var(--navy)' }}>
              Khám phá kèo cầu lông
            </h2>
            <span style={{
              fontSize: '12px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'var(--volt-bg)',
              color: 'var(--volt)',
              border: '1px solid rgba(16, 242, 132, 0.3)'
            }}>
              {posts.length} sân đang mở
            </span>
          </div>

          <SearchFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Results List */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <SkeletonGameCard />
              <SkeletonGameCard />
              <SkeletonGameCard />
            </div>
          ) : posts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '64px 24px', 
              backgroundColor: 'var(--surface-card)', 
              borderRadius: '24px',
              border: '1px dashed var(--border)' 
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏸</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                Không tìm thấy kèo phù hợp
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' }}>
                Thử nới lỏng bộ lọc Quận/Huyện, Trình độ hoặc Ngày chơi để xem thêm nhiều kèo hơn.
              </p>
              <button 
                onClick={() => setFilters({})}
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          ) : (
            <GameList 
              posts={posts} 
              onHover={setHoveredGameId}
              onClick={handleGameClick}
            />
          )}
        </div>
      </div>

      {/* Right Column: Interactive Vector Sports Map */}
      <div className="explore-right" style={{ flex: 1, height: '100%', position: 'relative' }}>
        <MockMap 
          games={posts} 
          hoveredGameId={hoveredGameId}
          onSelectGame={handleGameClick}
        />
      </div>

      {/* Modern Game Detail Modal */}
      {selectedGame && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(9, 13, 22, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'reveal-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onClick={closeGameModal}
        >
          <div 
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '28px',
              maxWidth: '580px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Top Banner */}
            <div style={{
              height: '140px',
              background: 'linear-gradient(135deg, var(--blue) 0%, #1e40af 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '24px',
              color: '#ffffff'
            }}>
              <div className="court-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
              
              <button 
                onClick={closeGameModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="badge-live open" style={{ marginBottom: '8px' }}>
                  <span className="pulse-dot" />
                  {selectedGame.status === 'OPEN' || selectedGame.status === 'APPROVED' ? `Còn ${selectedGame.slotsNeeded} slot` : 'Đã đủ'}
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>
                  {selectedGame.courtName}
                </h2>
              </div>
              <div style={{ opacity: 0.15, position: 'absolute', right: '-10px', bottom: '-20px', pointerEvents: 'none' }}>
                <BadmintonIcon size={140} />
              </div>
            </div>

            {/* Modal Details Content */}
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                <div style={{ backgroundColor: 'var(--soft-bg)', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, marginBottom: '2px' }}>Địa chỉ</div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{selectedGame.address}</div>
                </div>

                <div style={{ backgroundColor: 'var(--soft-bg)', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, marginBottom: '2px' }}>Thời gian chơi</div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>
                    {selectedGame.playDate} ({selectedGame.startTime} - {selectedGame.endTime})
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--soft-bg)', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, marginBottom: '2px' }}>Trình độ yêu cầu</div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{selectedGame.skillLevel}</div>
                </div>

                <div style={{ backgroundColor: 'var(--soft-bg)', padding: '12px 16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, marginBottom: '2px' }}>Chi phí tham gia</div>
                  <div style={{ fontWeight: 900, color: 'var(--blue)', fontSize: '16px' }}>{selectedGame.price.toLocaleString()}đ/người</div>
                </div>
              </div>

              {/* Host Info Box */}
              <div style={{
                backgroundColor: 'var(--bg)',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Host đăng kèo:</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)' }}>{selectedGame.hostName || 'Chủ sân'}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Liên hệ: <strong>{selectedGame.contactInfo}</strong></div>
                </div>

                <button
                  onClick={() => handleCopyPhone(selectedGame.contactInfo)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--soft-bg)',
                    color: 'var(--navy)',
                    border: '1px solid var(--border)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Sao chép SĐT
                </button>
              </div>

              {selectedGame.description && (
                <div style={{ marginBottom: '24px', padding: '12px 16px', backgroundColor: 'var(--soft-bg)', borderRadius: '12px', fontSize: '13px', color: 'var(--muted)', fontStyle: 'italic' }}>
                  "{selectedGame.description}"
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={`tel:${selectedGame.contactInfo}`}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: 'var(--blue)',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 800,
                    borderRadius: '14px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onClick={() => {
                    showAlert('Đang mở ứng dụng gọi điện tới Host...', 'info');
                  }}
                >
                  <PhoneIcon size={18} /> Gọi điện cho Host
                </a>

                <button
                  style={{
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
                    color: 'var(--text)',
                    fontSize: '15px',
                    fontWeight: 700,
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    cursor: 'pointer'
                  }}
                  onClick={closeGameModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

