import React, { useState } from 'react';
import { CalendarIcon, FacebookIcon, MapPinIcon, ClockIcon, StarIcon, PhoneIcon } from './icons';

export const PostFormPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MANUAL' | 'FB'>('MANUAL');

  return (
    <div style={{
      backgroundColor: 'var(--surface)',
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '400px' }}>
        {/* Left Side: Form */}
        <div style={{ padding: '24px', borderRight: '1px solid var(--border)' }}>
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
              justifyContent: 'center',
              textAlign: 'center', 
              gap: '16px',
              padding: '32px 16px',
              height: '100%'
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
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Preview */}
        <div style={{ backgroundColor: 'var(--soft-bg)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 16px 0', color: 'var(--navy)' }}>Xem trước</h3>
          
          {/* Mock Preview Card */}
          <div style={{ backgroundColor: 'var(--surface)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '120px', backgroundColor: 'var(--border)', backgroundImage: 'url("https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--navy)' }}>Sân KDC Tân Quy</h4>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPinIcon size={14} /> Quận 7, TP. HCM</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><ClockIcon size={14} /> 23/05/2025 • 19:00 - 21:00</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><StarIcon size={14} /> Trình độ: Trung bình khá</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><b style={{fontWeight: 700, fontSize: 14}}>₫</b> 80K/người</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><PhoneIcon size={14} /> 0909 123 456 (Zalo)</div>
              
              <div style={{ marginTop: '8px', padding: '10px', backgroundColor: 'var(--soft-bg)', borderRadius: '8px', fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic' }}>
                "Giao lưu vui vẻ, không quạu. Cần tuyển 2 bạn đánh cố định."
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px', backgroundColor: '#e5f7ed', color: '#18b365', border: 'none', padding: '8px' }}>
                Cần 2 vãng lai
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
