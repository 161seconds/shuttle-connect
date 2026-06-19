import React, { useState } from 'react';
import { CalendarIcon, FacebookIcon } from './icons';

export const PostFormPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MANUAL' | 'FB'>('MANUAL');

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header & Tabs */}
      <div style={{ padding: '24px 24px 0 24px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--soft-bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ color: 'var(--green)', display: 'flex' }}><CalendarIcon size={24} /></div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>Đăng kèo mới</h2>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <button 
            onClick={() => setActiveTab('MANUAL')}
            style={{ 
              padding: '12px 0', 
              color: activeTab === 'MANUAL' ? 'var(--blue)' : 'var(--muted)', 
              borderBottom: activeTab === 'MANUAL' ? '2px solid var(--blue)' : '2px solid transparent', 
              fontWeight: 600,
              fontSize: '15px'
            }}
          >
            Tạo mới thủ công
          </button>
          <button 
            onClick={() => setActiveTab('FB')}
            style={{ 
              padding: '12px 0', 
              color: activeTab === 'FB' ? 'var(--blue)' : 'var(--muted)', 
              borderBottom: activeTab === 'FB' ? '2px solid var(--blue)' : '2px solid transparent', 
              fontWeight: 600,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: '#1877f2', display: 'flex' }}><FacebookIcon size={18} /></span> Import từ Facebook
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '24px' }}>
        {activeTab === 'MANUAL' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Tên sân</label>
                <input type="text" placeholder="VD: Sân KDC Tân Quy" style={{ width: '100%', fontSize: '14px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Quận/Huyện</label>
                <select style={{ width: '100%', fontSize: '14px' }}><option>Chọn quận/huyện</option></select>
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Địa chỉ</label>
              <input type="text" placeholder="VD: 17 Tân Quy, Phường Tân Quy, Quận 7" style={{ width: '100%', fontSize: '14px' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Ngày bắt đầu</label>
                <input type="date" value="2025-05-23" style={{ width: '100%', fontSize: '14px' }} onChange={()=>{}}/>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Giờ bắt đầu</label>
                <input type="time" value="19:00" style={{ width: '100%', fontSize: '14px' }} onChange={()=>{}}/>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Trình độ</label>
                <select style={{ width: '100%', fontSize: '14px' }}><option>Chọn trình độ</option></select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Cần tuyển (người)</label>
                <input type="number" placeholder="VD: 2" style={{ width: '100%', fontSize: '14px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Liên hệ</label>
              <input type="text" placeholder="SĐT, Zalo, Facebook..." style={{ width: '100%', fontSize: '14px' }} />
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: '12px' }}>
              Đăng kèo
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            gap: '16px',
            padding: '32px 16px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#e5f0ff',
              color: '#1877f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FacebookIcon size={28} />
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.5, maxWidth: '280px' }}>
              Dán link bài viết Facebook, hệ thống tự động tách thông tin kèo.
            </p>
            <div style={{ width: '100%', maxWidth: '320px', marginTop: '8px' }}>
              <input type="text" placeholder="Dán link tại đây" style={{ width: '100%', textAlign: 'center', marginBottom: '12px', fontSize: '14px' }} />
              <button className="btn btn-primary" style={{ width: '100%', fontSize: '14px' }}>Tự động điền thông tin</button>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px' }}>* Hỗ trợ bài viết công khai. Không thu thập dữ liệu người dùng.</div>
              {/* MVP only supports manual Facebook post import. No Facebook group scraping. */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
