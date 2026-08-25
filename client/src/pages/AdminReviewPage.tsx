import React, { useState, useEffect } from 'react';
import { api } from '../api';
import type { GamePost, PostStatus } from '../types';
import { useAlert } from '../contexts/GlobalAlertContext';
import { ShieldIcon, CheckCircleIcon } from '../components/icons';


export const AdminReviewPage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<GamePost[]>([]);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getAllPosts();
      setAllPosts(data);
    } catch (error) {
      console.error('Error fetching posts for admin:', error);
      showAlert('Lỗi khi tải danh sách bài duyệt', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpdateStatus = async (id: string, status: PostStatus) => {
    try {
      await api.updatePostStatus(id, status);
      const statusLabel = 
        status === 'APPROVED' ? 'Đã duyệt bài (Bài đã xuất hiện trên trang Khám phá)' :
        status === 'DUPLICATE' ? 'Đã đánh dấu trùng lặp' : 'Đã từ chối bài đăng';
      
      showAlert(statusLabel, status === 'APPROVED' ? 'success' : 'info');
      fetchPosts();
    } catch (error) {
      console.error('Error updating status:', error);
      showAlert('Lỗi khi cập nhật trạng thái bài đăng', 'error');
    }
  };

  const handleResetData = async () => {
    if (window.confirm('Khôi phục lại toàn bộ dữ liệu mẫu ban đầu?')) {
      await api.resetMockData();
      showAlert('Đã khôi phục dữ liệu mẫu!', 'success');
      fetchPosts();
    }
  };

  const pendingPosts = allPosts.filter(p => p.status === 'PENDING' || (p.sourceType === 'FACEBOOK_IMPORT' && p.status !== 'APPROVED' && p.status !== 'REJECTED' && p.status !== 'DUPLICATE'));
  const approvedPosts = allPosts.filter(p => p.status === 'APPROVED' || p.status === 'OPEN');
  const rejectedPosts = allPosts.filter(p => p.status === 'REJECTED' || p.status === 'DUPLICATE');

  const displayedPosts = activeTab === 'PENDING' ? pendingPosts : activeTab === 'APPROVED' ? approvedPosts : rejectedPosts;

  return (
    <div style={{ padding: '40px 24px', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ color: 'var(--blue)' }}><ShieldIcon size={24} /></span>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-0.5px', margin: 0 }}>
              Khu vực Quản trị & Duyệt bài (Admin)
            </h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0 }}>
            Kiểm tra chất lượng dữ liệu bóc tách từ Facebook, phát hiện bài đăng trùng lặp và phê duyệt kèo công khai.
          </p>
        </div>

        <button
          onClick={handleResetData}
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            backgroundColor: 'var(--soft-bg)',
            color: 'var(--navy)',
            border: '1px solid var(--border)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🔄 Khôi phục dữ liệu mẫu
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('PENDING')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            backgroundColor: activeTab === 'PENDING' ? 'var(--blue)' : 'var(--surface)',
            color: activeTab === 'PENDING' ? '#ffffff' : 'var(--text)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Chờ duyệt</span>
          <span style={{
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            backgroundColor: activeTab === 'PENDING' ? 'rgba(255,255,255,0.3)' : 'var(--warning)',
            color: activeTab === 'PENDING' ? '#ffffff' : '#ffffff'
          }}>
            {pendingPosts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('APPROVED')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            backgroundColor: activeTab === 'APPROVED' ? 'var(--blue)' : 'var(--surface)',
            color: activeTab === 'APPROVED' ? '#ffffff' : 'var(--text)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Đã phê duyệt / Đang mở</span>
          <span style={{
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            backgroundColor: activeTab === 'APPROVED' ? 'rgba(255,255,255,0.3)' : 'var(--green)',
            color: activeTab === 'APPROVED' ? '#ffffff' : '#ffffff'
          }}>
            {approvedPosts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('REJECTED')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 700,
            backgroundColor: activeTab === 'REJECTED' ? 'var(--blue)' : 'var(--surface)',
            color: activeTab === 'REJECTED' ? '#ffffff' : 'var(--text)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>Từ chối / Trùng lặp</span>
          <span style={{
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            backgroundColor: activeTab === 'REJECTED' ? 'rgba(255,255,255,0.3)' : 'var(--muted)',
            color: '#ffffff'
          }}>
            {rejectedPosts.length}
          </span>
        </button>
      </div>

      {/* Posts List */}
      {loading ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)', backgroundColor: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)' }}>
          Đang tải dữ liệu kiểm duyệt...
        </div>
      ) : displayedPosts.length === 0 ? (
        <div style={{ padding: '64px 24px', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)' }}>
          <div style={{ color: 'var(--green)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <CheckCircleIcon size={48} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
            Không có bài đăng nào trong mục này
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
            Hệ thống đang hoạt động tối ưu. Bạn có thể sang trang Host để thử tạo bài import mới từ Facebook!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {displayedPosts.map((post) => {
            const score = post.confidenceScore || 85;
            const missing = post.missingFields || [];

            return (
              <div
                key={post.id}
                style={{
                  backgroundColor: 'var(--surface)',
                  borderRadius: '24px',
                  padding: '28px',
                  border: '1px solid var(--border)',
                  borderLeft: `6px solid ${post.status === 'APPROVED' || post.status === 'OPEN' ? 'var(--green)' : post.status === 'PENDING' ? 'var(--warning)' : 'var(--danger)'}`,
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Status & Confidence Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 800,
                      backgroundColor: post.status === 'APPROVED' || post.status === 'OPEN' ? 'rgba(24, 179, 101, 0.15)' : post.status === 'PENDING' ? 'rgba(255, 138, 31, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: post.status === 'APPROVED' || post.status === 'OPEN' ? 'var(--green)' : post.status === 'PENDING' ? 'var(--warning)' : 'var(--danger)'
                    }}>
                      Trạng thái: {post.status}
                    </span>

                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>
                      Nguồn: <strong>{post.sourceType === 'FACEBOOK_IMPORT' ? 'Facebook Import' : 'Thủ công'}</strong>
                    </span>
                  </div>

                  {/* Confidence meter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)' }}>Độ tin cậy trích xuất:</span>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 900,
                      color: score >= 80 ? 'var(--green)' : score >= 60 ? 'var(--warning)' : 'var(--danger)',
                      backgroundColor: 'var(--soft-bg)',
                      padding: '3px 10px',
                      borderRadius: '8px'
                    }}>
                      {score}%
                    </span>
                  </div>
                </div>

                {/* Original Text if Facebook Import */}
                {post.originalText && (
                  <div style={{
                    backgroundColor: 'var(--soft-bg)',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    border: '1px solid var(--border)',
                    fontSize: '13px',
                    color: 'var(--text)'
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      📝 Nội dung bài đăng gốc Facebook:
                    </div>
                    <div style={{ fontStyle: 'italic', lineHeight: 1.5 }}>
                      "{post.originalText}"
                    </div>
                  </div>
                )}

                {/* Parsed Structure Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  backgroundColor: 'var(--bg)',
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Tên sân</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--navy)' }}>{post.courtName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Quận / Địa chỉ</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>{post.district}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Thời gian</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>{post.playDate} • {post.startTime} - {post.endTime}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Trình độ & Slot</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)' }}>{post.skillLevel} • {post.slotsNeeded} slot</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Chi phí & Liên hệ</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--blue)' }}>{post.price.toLocaleString()}đ • {post.contactInfo}</div>
                  </div>
                </div>

                {/* Missing Fields Warning if any */}
                {missing.length > 0 && (
                  <div style={{ fontSize: '12px', color: 'var(--warning)', backgroundColor: 'rgba(255, 138, 31, 0.1)', padding: '8px 14px', borderRadius: '8px' }}>
                    ⚠️ Thiếu trường dữ liệu: {missing.join(', ')}
                  </div>
                )}

                {/* Admin Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
                  {post.status !== 'APPROVED' && post.status !== 'OPEN' && (
                    <button
                      onClick={() => handleUpdateStatus(post.id, 'APPROVED')}
                      className="btn btn-success"
                      style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 700 }}
                    >
                      ✓ Phê duyệt bài (Approve)
                    </button>
                  )}

                  {post.status !== 'DUPLICATE' && (
                    <button
                      onClick={() => handleUpdateStatus(post.id, 'DUPLICATE')}
                      className="btn btn-outline"
                      style={{ padding: '10px 18px', fontSize: '14px', fontWeight: 700 }}
                    >
                      ⚠️ Đánh dấu trùng lặp
                    </button>
                  )}

                  {post.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleUpdateStatus(post.id, 'REJECTED')}
                      className="btn btn-danger-outline"
                      style={{ padding: '10px 18px', fontSize: '14px', fontWeight: 700 }}
                    >
                      ✕ Từ chối bài (Reject)
                    </button>
                  )}

                  {(post.status === 'APPROVED' || post.status === 'OPEN') && (
                    <button
                      onClick={() => handleUpdateStatus(post.id, 'PENDING')}
                      style={{
                        padding: '10px 18px',
                        fontSize: '14px',
                        fontWeight: 700,
                        backgroundColor: 'var(--soft-bg)',
                        color: 'var(--muted)',
                        borderRadius: '9999px',
                        border: '1px solid var(--border)'
                      }}
                    >
                      Thu hồi về Chờ duyệt
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

