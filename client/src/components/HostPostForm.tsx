import React, { useState } from 'react';
import { api } from '../api';
import { CustomSelect } from './CustomSelect';
import { DateSelect } from './DateSelect';
import { useAlert } from '../contexts/GlobalAlertContext';

interface HostPostFormProps {
  onSuccess?: () => void;
}

export const HostPostForm: React.FC<HostPostFormProps> = ({ onSuccess }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    courtName: '',
    district: 'Quận 10',
    address: '',
    playDate: todayStr,
    startTime: '19:00',
    endTime: '21:00',
    skillLevel: 'Trung bình khá',
    slotsNeeded: 2,
    price: 80000,
    contactInfo: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courtName.trim()) {
      showAlert('Vui lòng nhập tên sân', 'warning');
      return;
    }
    if (!formData.contactInfo.trim()) {
      showAlert('Vui lòng nhập số điện thoại hoặc Zalo liên hệ', 'warning');
      return;
    }

    setLoading(true);
    try {
      await api.createPost({
        courtName: formData.courtName.trim(),
        district: formData.district,
        address: formData.address.trim() || `${formData.courtName}, ${formData.district}, TP. HCM`,
        playDate: formData.playDate || todayStr,
        startTime: formData.startTime || '19:00',
        endTime: formData.endTime || '21:00',
        skillLevel: formData.skillLevel,
        slotsNeeded: Number(formData.slotsNeeded) || 1,
        price: Number(formData.price) || 80000,
        contactInfo: formData.contactInfo.trim(),
        description: formData.description.trim() || 'Nhóm giao lưu vui vẻ, chào đón vãng lai.',
        hostName: 'Host Bạn',
        sourceType: 'MANUAL',
        status: 'OPEN',
        dateLabel: 'Hôm nay',
        slotsText: `Còn ${formData.slotsNeeded} slot`
      });

      showAlert('Đăng kèo thành công! Kèo của bạn đã xuất hiện trên bản đồ và trang Khám phá.', 'success');
      
      // Reset form
      setFormData({
        courtName: '',
        district: 'Quận 10',
        address: '',
        playDate: todayStr,
        startTime: '19:00',
        endTime: '21:00',
        skillLevel: 'Trung bình khá',
        slotsNeeded: 2,
        price: 80000,
        contactInfo: '',
        description: ''
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error creating post', error);
      showAlert('Có lỗi xảy ra khi tạo kèo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      borderRadius: '24px',
      padding: '28px',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
        Đăng kèo mới thủ công
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
        Điền thông tin sân và thời gian chơi để tìm người ghép kèo nhanh nhất.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Tên sân <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <input
              type="text"
              name="courtName"
              value={formData.courtName}
              onChange={handleChange}
              required
              placeholder="VD: Sân Bách Khoa, Sân Kỳ Hòa..."
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Quận/Huyện <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <CustomSelect 
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
              value={formData.district}
              onChange={(val) => setFormData(prev => ({ ...prev, district: val }))}
              placeholder="Chọn Quận/Huyện"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
            Địa chỉ chi tiết
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="VD: 268 Lý Thường Kiệt, P. 14, Q. 10"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Ngày chơi
            </label>
            <DateSelect 
              value={formData.playDate} 
              onChange={(val) => setFormData(prev => ({ ...prev, playDate: val }))} 
              placeholder="Chọn ngày"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Bắt đầu
            </label>
            <input 
              type="time" 
              name="startTime" 
              value={formData.startTime} 
              onChange={handleChange} 
              required 
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Kết thúc
            </label>
            <input 
              type="time" 
              name="endTime" 
              value={formData.endTime} 
              onChange={handleChange} 
              required 
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Trình độ yêu cầu
            </label>
            <CustomSelect 
              options={[
                { value: 'Yếu', label: 'Yếu' },
                { value: 'Trung bình', label: 'Trung bình' },
                { value: 'Trung bình khá', label: 'Trung bình khá' },
                { value: 'Khá', label: 'Khá' },
                { value: 'Cứng', label: 'Cứng' },
              ]}
              value={formData.skillLevel}
              onChange={(val) => setFormData(prev => ({ ...prev, skillLevel: val }))}
              placeholder="Trình độ"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Cần tuyển (slot)
            </label>
            <input 
              type="number" 
              name="slotsNeeded" 
              value={formData.slotsNeeded} 
              onChange={handleChange} 
              min="1" 
              max="10"
              required 
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
              Chi phí (VND)
            </label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              step="5000" 
              required 
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
            Thông tin liên hệ (SĐT / Zalo) <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input 
            type="text" 
            name="contactInfo" 
            value={formData.contactInfo} 
            onChange={handleChange} 
            required 
            placeholder="VD: 0909 123 456 (Zalo Nam)" 
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--navy)' }}>
            Ghi chú thêm
          </label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows={2} 
            placeholder="Cầu dùng loại gì, có nước uống hay quạt mát không..." 
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}
        >
          {loading ? 'Đang xuất bản...' : '🚀 Đăng Kèo Ngay'}
        </button>
      </form>
    </div>
  );
};

