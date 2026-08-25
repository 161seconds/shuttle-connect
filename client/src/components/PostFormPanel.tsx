import React, { useState } from 'react';
import { FacebookIcon, MapPinIcon, ClockIcon, UsersIcon, PhoneIcon, BadmintonIcon } from './icons';
import { CustomSelect } from './CustomSelect';
import { DateSelect } from './DateSelect';
import { api } from '../api';
import { parseFacebookPost } from '../utils/postParser';
import { useAlert } from '../contexts/GlobalAlertContext';

const SAMPLE_FB_POSTS = [
  { label: 'Sân TADA (Bình Thạnh)', text: 'Tối nay sân TADA Bình Thạnh 19-21h cần 2 vãng lai trình TB khá, 80k/người, ib mình nha 0909123456.' },
  { label: 'Sân Bách Khoa (Q10)', text: 'Mai 18h-20h sân Bách Khoa Q10 thiếu 1 bạn nam/nữ giao lưu trình TB, 70k, zalo 0988776655.' },
];

export const PostFormPanel: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState<'MANUAL' | 'FB'>('MANUAL');
  const [fbText, setFbText] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    courtName: 'Sân KDC Tân Quy',
    district: 'Quận 7',
    address: '17 Tân Quy, P. Tân Quy, Quận 7',
    playDate: todayStr,
    startTime: '19:00',
    endTime: '21:00',
    skillLevel: 'Trung bình khá',
    slotsNeeded: 2,
    price: 80000,
    contactInfo: '0909 123 456 (Zalo)',
    description: 'Nhóm giao lưu vui vẻ, chào đón vãng lai.'
  });

  const handleManualChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParseFb = () => {
    if (!fbText.trim()) {
      showAlert('Vui lòng dán nội dung bài viết', 'warning');
      return;
    }
    const parsed = parseFacebookPost(fbText);
    setFormData(prev => ({
      ...prev,
      courtName: parsed.courtName || prev.courtName,
      district: parsed.district || prev.district,
      address: parsed.address || `${parsed.courtName || 'Sân Cầu Lông'}, ${parsed.district || 'TP. HCM'}`,
      playDate: parsed.playDate || todayStr,
      startTime: parsed.startTime || '19:00',
      endTime: parsed.endTime || '21:00',
      skillLevel: parsed.skillLevel || 'Trung bình khá',
      slotsNeeded: parsed.slotsNeeded || 2,
      price: parsed.price || 80000,
      contactInfo: parsed.contactInfo || prev.contactInfo,
      description: parsed.description || fbText
    }));
    showAlert(`Đã trích xuất thông tin thành công! (Độ tin cậy: ${parsed.confidenceScore}%)`, 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courtName.trim()) {
      showAlert('Vui lòng nhập tên sân', 'warning');
      return;
    }
    setLoading(true);
    try {
      await api.createPost({
        courtName: formData.courtName,
        district: formData.district,
        address: formData.address,
        playDate: formData.playDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        skillLevel: formData.skillLevel,
        slotsNeeded: Number(formData.slotsNeeded),
        price: Number(formData.price),
        contactInfo: formData.contactInfo,
        description: formData.description,
        hostName: 'Host Bạn',
        sourceType: activeTab === 'FB' ? 'FACEBOOK_IMPORT' : 'MANUAL',
        status: 'OPEN',
        dateLabel: 'Hôm nay',
        slotsText: `Còn ${formData.slotsNeeded} slot`,
        originalText: activeTab === 'FB' ? fbText : undefined
      });
      showAlert('Đăng kèo thành công! Kèo đã xuất hiện trên trang Khám phá.', 'success');
    } catch (err) {
      console.error(err);
      showAlert('Lỗi khi đăng bài', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--surface-card)',
      borderRadius: '28px',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header & Tabs */}
      <div style={{
        padding: '24px 28px 0 28px',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--soft-bg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--volt-bg)',
            color: 'var(--volt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BadmintonIcon size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)', margin: 0 }}>
              Đăng Kèo Nhanh
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
              Tiếp cận hơn 12,000 vợt thủ đang online
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '4px',
          backgroundColor: 'var(--surface)',
          padding: '4px',
          borderRadius: '14px',
          border: '1px solid var(--border)'
        }}>
          <button 
            type="button"
            onClick={() => setActiveTab('MANUAL')}
            style={{ 
              padding: '8px 16px', 
              color: activeTab === 'MANUAL' ? '#ffffff' : 'var(--muted)', 
              backgroundColor: activeTab === 'MANUAL' ? 'var(--blue)' : 'transparent',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              transition: 'all 0.2s'
            }}
          >
            ✍️ Nhập tay
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('FB')}
            style={{ 
              padding: '8px 16px', 
              color: activeTab === 'FB' ? '#ffffff' : 'var(--muted)', 
              backgroundColor: activeTab === 'FB' ? '#1877f2' : 'transparent',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <FacebookIcon size={14} /> ⚡ Import FB
          </button>
        </div>
      </div>

      {/* Content Area - 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', minHeight: '440px' }}>
        <style>{`
          @media (max-width: 860px) {
            .post-grid-panel { grid-template-columns: 1fr !important; }
            .preview-side-column { display: none !important; }
          }
        `}</style>

        {/* Left Side: Form */}
        <div style={{ padding: '28px', borderRight: '1px solid var(--border)' }}>
          {activeTab === 'FB' && (
            <div style={{ marginBottom: '20px', backgroundColor: 'var(--soft-bg)', padding: '16px', borderRadius: '18px', border: '1px solid var(--border)' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                📋 Dán nội dung bài đăng từ Facebook:
              </label>
              <textarea
                value={fbText}
                onChange={(e) => setFbText(e.target.value)}
                placeholder="VD: Tối nay sân TADA Bình Thạnh 19-21h cần 2 vãng lai trình TB khá, 80k/người, ib mình nha 0909123456"
                rows={3}
                style={{ width: '100%', fontSize: '13px', marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleParseFb}
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  ⚡ Trích xuất AI
                </button>
                <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>Mẫu thử:</span>
                {SAMPLE_FB_POSTS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFbText(sample.text);
                      const parsed = parseFacebookPost(sample.text);
                      setFormData(prev => ({
                        ...prev,
                        courtName: parsed.courtName || prev.courtName,
                        district: parsed.district || prev.district,
                        address: parsed.address || `${parsed.courtName || 'Sân Cầu Lông'}, ${parsed.district || 'TP. HCM'}`,
                        playDate: parsed.playDate || todayStr,
                        startTime: parsed.startTime || '19:00',
                        endTime: parsed.endTime || '21:00',
                        skillLevel: parsed.skillLevel || 'Trung bình khá',
                        slotsNeeded: parsed.slotsNeeded || 2,
                        price: parsed.price || 80000,
                        contactInfo: parsed.contactInfo || prev.contactInfo,
                        description: parsed.description || sample.text
                      }));
                      showAlert(`Đã điền và trích xuất ${sample.label}`, 'success');
                    }}
                    style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '8px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Tên sân</label>
                <input 
                  type="text" 
                  value={formData.courtName}
                  onChange={(e) => handleManualChange('courtName', e.target.value)}
                  placeholder="VD: Sân KDC Tân Quy" 
                  style={{ width: '100%' }} 
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Quận/Huyện</label>
                <CustomSelect 
                  value={formData.district} 
                  onChange={(val) => handleManualChange('district', val)} 
                  options={[
                    { value: 'Quận 1', label: 'Quận 1' },
                    { value: 'Quận 3', label: 'Quận 3' },
                    { value: 'Quận 4', label: 'Quận 4' },
                    { value: 'Quận 7', label: 'Quận 7' },
                    { value: 'Quận 10', label: 'Quận 10' },
                    { value: 'Quận 11', label: 'Quận 11' },
                    { value: 'Bình Thạnh', label: 'Bình Thạnh' },
                    { value: 'Tân Bình', label: 'Tân Bình' },
                    { value: 'Tân Phú', label: 'Tân Phú' },
                    { value: 'Phú Nhuận', label: 'Phú Nhuận' },
                    { value: 'Gò Vấp', label: 'Gò Vấp' },
                    { value: 'Thủ Đức', label: 'Thủ Đức' },
                  ]} 
                  placeholder="Chọn quận/huyện" 
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Địa chỉ sân</label>
              <input 
                type="text" 
                value={formData.address}
                onChange={(e) => handleManualChange('address', e.target.value)}
                placeholder="VD: 17 Tân Quy, Phường Tân Quy, Quận 7" 
                style={{ width: '100%' }} 
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Ngày chơi</label>
                <DateSelect 
                  value={formData.playDate} 
                  onChange={(val) => handleManualChange('playDate', val)} 
                  placeholder="Chọn ngày" 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Bắt đầu</label>
                <input 
                  type="time" 
                  value={formData.startTime} 
                  style={{ width: '100%' }} 
                  onChange={(e) => handleManualChange('startTime', e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Kết thúc</label>
                <input 
                  type="time" 
                  value={formData.endTime} 
                  style={{ width: '100%' }} 
                  onChange={(e) => handleManualChange('endTime', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Trình độ</label>
                <CustomSelect 
                  value={formData.skillLevel} 
                  onChange={(val) => handleManualChange('skillLevel', val)} 
                  options={[
                    { value: 'Yếu', label: 'Yếu' },
                    { value: 'Trung bình', label: 'Trung bình' },
                    { value: 'Trung bình khá', label: 'Trung bình khá' },
                    { value: 'Khá', label: 'Khá' },
                    { value: 'Cứng', label: 'Cứng' },
                  ]} 
                  placeholder="Chọn trình độ" 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Cần tuyển (slot)</label>
                <input 
                  type="number" 
                  value={formData.slotsNeeded}
                  onChange={(e) => handleManualChange('slotsNeeded', e.target.value)}
                  min="1" 
                  max="10" 
                  style={{ width: '100%' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Giá (VND)</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => handleManualChange('price', e.target.value)}
                  step="5000" 
                  style={{ width: '100%' }} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>Thông tin liên hệ (SĐT / Zalo)</label>
              <input 
                type="text" 
                value={formData.contactInfo}
                onChange={(e) => handleManualChange('contactInfo', e.target.value)}
                placeholder="0909 123 456 (Zalo)" 
                style={{ width: '100%' }} 
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '6px', padding: '14px', borderRadius: '14px', fontSize: '15px', fontWeight: 800 }}
            >
              {loading ? 'Đang xử lý...' : '🚀 Xuất Bản Kèo Ngay'}
            </button>
          </form>
        </div>

        {/* Right Side: Live Reactive Preview */}
        <div className="preview-side-column" style={{ backgroundColor: 'var(--soft-bg)', padding: '28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, margin: 0, color: 'var(--navy)' }}>Xem trước trực tiếp</h3>
            <span style={{ fontSize: '11px', color: 'var(--volt)', fontWeight: 800, backgroundColor: 'var(--volt-bg)', padding: '3px 10px', borderRadius: '9999px' }}>
              ● Live Preview
            </span>
          </div>
          
          {/* Mock Pro Sports Preview Card */}
          <div style={{
            backgroundColor: 'var(--surface-card)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              height: '100px',
              background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(16, 242, 132, 0.15) 100%)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              position: 'relative'
            }}>
              <div className="court-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
              <div style={{ position: 'relative', zIndex: 1, fontSize: '12px', fontWeight: 800, backgroundColor: 'var(--surface)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid var(--border)', color: 'var(--navy)' }}>
                📍 {formData.district}
              </div>
              <div className="badge-live open" style={{ position: 'relative', zIndex: 1 }}>
                <span className="pulse-dot" />
                Còn {formData.slotsNeeded} slot
              </div>
            </div>

            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--navy)' }}>
                {formData.courtName || 'Tên sân cầu lông'}
              </h4>
              <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--blue)' }}><MapPinIcon size={14} /></span> {formData.address}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--blue)' }}><ClockIcon size={14} /></span> {formData.playDate} • {formData.startTime} - {formData.endTime}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--blue)' }}><UsersIcon size={14} /></span> Trình: <strong style={{ color: 'var(--navy)' }}>{formData.skillLevel}</strong>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--blue)' }}><PhoneIcon size={14} /></span> {formData.contactInfo}
              </div>
              
              <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--navy)' }}>
                  {Number(formData.price).toLocaleString()}đ<span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}>/người</span>
                </span>
                <span className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                  Ghép ngay
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


