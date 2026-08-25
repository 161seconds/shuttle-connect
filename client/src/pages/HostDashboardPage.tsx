import React, { useState, useEffect } from 'react';
import { ImportFacebookPost } from '../components/ImportFacebookPost';
import { HostPostForm } from '../components/HostPostForm';
import { api } from '../api';
import type { GamePost, PostStatus } from '../types';
import { useAlert } from '../contexts/GlobalAlertContext';
import { CalendarIcon, UsersIcon, CheckCircleIcon, MapPinIcon } from '../components/icons';

export const HostDashboardPage: React.FC = () => {
  const [hostPosts, setHostPosts] = useState<GamePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'MANUAL' | 'FACEBOOK'>('MANUAL');
  const { showAlert } = useAlert();

  const fetchHostPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getAllPosts();
      setHostPosts(data);
    } catch (error) {
      console.error('Error fetching host posts:', error);
      showAlert('Lỗi khi tải danh sách bài đăng', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostPosts();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: PostStatus) => {
    const nextStatus: PostStatus = currentStatus === 'OPEN' ? 'FULL' : 'OPEN';
    try {
      await api.updatePostStatus(id, nextStatus);
      showAlert(`Đã cập nhật trạng thái thành: ${nextStatus === 'FULL' ? 'Đã đủ người (FULL)' : 'Đang mở (OPEN)'}`, 'success');
      fetchHostPosts();
    } catch (err) {
      console.error(err);
      showAlert('Lỗi cập nhật trạng thái', 'error');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này không?')) {
      try {
        await api.deletePost(id);
        showAlert('Đã xóa bài đăng', 'info');
        fetchHostPosts();
      } catch (err) {
        console.error(err);
        showAlert('Lỗi khi xóa bài đăng', 'error');
      }
    }
  };

  const openCount = hostPosts.filter(p => p.status === 'OPEN').length;
  const pendingCount = hostPosts.filter(p => p.status === 'PENDING').length;
  const fullCount = hostPosts.filter(p => p.status === 'FULL').length;

  return (
    <div style={{ padding: '40px 24px', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: '4px' }}>
            Bảng điều khiển Host
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0 }}>
            Quản lý các kèo vãng lai, đăng bài mới hoặc nhập nhanh từ bài viết Facebook.
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '10px 20px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--green)' }}><CalendarIcon size={20} /></span>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Đang mở</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)' }}>{openCount} kèo</div>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--surface)', padding: '10px 20px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--warning)' }}><UsersIcon size={20} /></span>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Chờ duyệt</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)' }}>{pendingCount} bài</div>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--surface)', padding: '10px 20px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--blue)' }}><CheckCircleIcon size={20} /></span>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Đã đủ người</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navy)' }}>{fullCount} kèo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, List Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        <style>{`
          @media (max-width: 1024px) {
            .host-grid-container {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
        
        {/* Left Column: Tabbed Creation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--soft-bg)', padding: '6px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <button
              onClick={() => setActiveTab('MANUAL')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: activeTab === 'MANUAL' ? 'var(--surface)' : 'transparent',
                color: activeTab === 'MANUAL' ? 'var(--blue)' : 'var(--muted)',
                boxShadow: activeTab === 'MANUAL' ? 'var(--shadow-sm)' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ✍️ Đăng thủ công
            </button>
            <button
              onClick={() => setActiveTab('FACEBOOK')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: activeTab === 'FACEBOOK' ? 'var(--surface)' : 'transparent',
                color: activeTab === 'FACEBOOK' ? 'var(--blue)' : 'var(--muted)',
                boxShadow: activeTab === 'FACEBOOK' ? 'var(--shadow-sm)' : 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ⚡ Import từ Facebook
            </button>
          </div>

          {activeTab === 'MANUAL' ? (
            <HostPostForm onSuccess={fetchHostPosts} />
          ) : (
            <ImportFacebookPost onSuccess={fetchHostPosts} />
          )}
        </div>

        {/* Right Column: Submitted Posts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              Danh sách kèo của bạn ({hostPosts.length})
            </h2>
            <button
              onClick={fetchHostPosts}
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Tải lại ↻
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)', backgroundColor: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)' }}>
              Đang tải danh sách bài đăng...
            </div>
          ) : hostPosts.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--muted)', fontWeight: 600, marginBottom: '12px' }}>Bạn chưa tạo kèo nào.</p>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Hãy sử dụng biểu mẫu bên trái để tạo kèo đầu tiên của bạn!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto', paddingRight: '4px' }}>
              {hostPosts.map((post) => {
                const isPending = post.status === 'PENDING';
                const isOpen = post.status === 'OPEN' || post.status === 'APPROVED';


                return (
                  <div
                    key={post.id}
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 800,
                            backgroundColor: isOpen ? 'rgba(24, 179, 101, 0.15)' : isPending ? 'rgba(255, 138, 31, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                            color: isOpen ? 'var(--green)' : isPending ? 'var(--warning)' : 'var(--muted)'
                          }}>
                            {isOpen ? '● ĐANG MỞ' : isPending ? '⏳ CHỜ DUYỆT' : '✓ ĐỦ NGƯỜI'}
                          </span>
                          {post.sourceType === 'FACEBOOK_IMPORT' && (
                            <span style={{ padding: '2px 6px', borderRadius: '6px', backgroundColor: '#e7f0ff', color: '#1877f2', fontSize: '10px', fontWeight: 700 }}>
                              Facebook Import
                            </span>
                          )}
                        </div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--navy)' }}>
                          {post.courtName}
                        </h4>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--blue)' }}>
                          {post.price.toLocaleString()}đ
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>/người</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: 'var(--muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPinIcon size={14} /> {post.district}</span>
                      <span>•</span>
                      <span>{post.playDate} ({post.startTime} - {post.endTime})</span>
                      <span>•</span>
                      <span>Trình: <strong>{post.skillLevel}</strong></span>
                      <span>•</span>
                      <span>Cần: <strong>{post.slotsNeeded} slot</strong></span>
                    </div>

                    {post.description && (
                      <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, fontStyle: 'italic', backgroundColor: 'var(--soft-bg)', padding: '6px 10px', borderRadius: '8px' }}>
                        "{post.description}"
                      </p>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        LH: <strong>{post.contactInfo}</strong>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {!isPending && (
                          <button
                            onClick={() => handleToggleStatus(post.id, post.status)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 700,
                              backgroundColor: isOpen ? 'var(--soft-bg)' : 'rgba(24, 179, 101, 0.1)',
                              color: isOpen ? 'var(--muted)' : 'var(--green)',
                              border: '1px solid var(--border)',
                              cursor: 'pointer'
                            }}
                          >
                            {isOpen ? 'Đánh dấu Đủ Người' : 'Mở lại kèo'}
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            color: 'var(--danger)',
                            border: '1px solid var(--danger)',
                            cursor: 'pointer'
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

