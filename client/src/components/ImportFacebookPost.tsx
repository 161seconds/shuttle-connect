import React, { useState } from 'react';
import { api } from '../api';
import type { ParsedFacebookPost } from '../types';
import { useAlert } from '../contexts/GlobalAlertContext';

interface ImportFacebookPostProps {
  onSuccess?: () => void;
}

export const ImportFacebookPost: React.FC<ImportFacebookPostProps> = ({ onSuccess }) => {
  const [text, setText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedFacebookPost | null>(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleParse = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const data = await api.parseFacebookPost(text);
      setParsedData(data);
    } catch (error) {
      console.error('Parse error:', error);
      showAlert('Failed to parse text from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDraft = async () => {
    if (!parsedData) return;
    setLoading(true);
    try {
      await api.createPost({
        courtName: parsedData.courtName || 'Unknown Court',
        address: parsedData.address || 'Unknown Address',
        district: parsedData.district || 'Unknown District',
        playDate: parsedData.date || new Date().toISOString().split('T')[0], // fallback today
        startTime: parsedData.startTime || '18:00',
        endTime: parsedData.endTime || '20:00',
        skillLevel: parsedData.skillLevel || 'Trung bình',
        slotsNeeded: parsedData.slotsNeeded || 1,
        price: Number(parsedData.price || 0),
        contactInfo: parsedData.contactInfo || 'Unknown Contact',
        description: text,
        hostName: 'Current Host',
        sourceType: 'FACEBOOK_IMPORT',
        status: 'PENDING',
        slotsText: `Cần thêm ${parsedData.slotsNeeded || 1} slot`,
        dateLabel: 'Imported Date'
      });
      showAlert('Tạo nháp thành công! Vui lòng chờ Admin duyệt.', 'success');
      setText('');
      setParsedData(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Create error:', error);
      showAlert('Lỗi tạo kèo nháp.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex-col gap-4">
      <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--navy)' }}>Import from Facebook</h3>
      <p className="text-sm text-muted mb-4">
        Dán nội dung bài viết tìm người chơi từ Facebook vào đây. Trí tuệ nhân tạo sẽ tự động trích xuất thông tin.
      </p>
      <div style={{
        position: 'relative',
        padding: '2px',
        borderRadius: '14px',
        background: text ? 'linear-gradient(45deg, var(--blue), var(--purple), var(--green))' : 'var(--border)',
        backgroundSize: '200% 200%',
        animation: text ? 'shimmer 3s ease infinite' : 'none',
        marginBottom: '1rem',
        transition: 'all 0.3s ease'
      }}>
        <textarea
          rows={6}
          placeholder="Dán nội dung bài viết Facebook vào đây..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', resize: 'vertical', border: 'none', borderRadius: '12px', outline: 'none' }}
        />
      </div>
      <button disabled={loading || !text} className="btn-primary" onClick={handleParse}>
        {loading ? 'Parsing...' : 'Parse Post'}
      </button>

      {parsedData && (
        <div style={{
          marginTop: '16px',
          padding: '24px',
          background: 'var(--soft-bg)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          animation: 'reveal-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ fontWeight: 800, fontSize: '18px', color: 'var(--navy)' }}>Kết quả phân tích</h4>
            
            {/* Circular Progress for Confidence */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>Độ tin cậy</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: parsedData.confidenceScore > 50 ? 'var(--success)' : 'var(--warning)' }}>
                  {parsedData.confidenceScore}%
                </div>
              </div>
              <svg width="40" height="40" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border)" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={parsedData.confidenceScore > 50 ? 'var(--success)' : 'var(--warning)'} strokeWidth="4" strokeDasharray={`${parsedData.confidenceScore}, 100`} />
              </svg>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', fontWeight: 600 }}>Thời gian</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '15px' }}>{parsedData.date || '---'} • {parsedData.startTime ? `${parsedData.startTime} - ${parsedData.endTime}` : '---'}</div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', fontWeight: 600 }}>Số lượng & Trình độ</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '15px' }}>Cần {parsedData.slotsNeeded || '---'} người • {parsedData.skillLevel || '---'}</div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', fontWeight: 600 }}>Chi phí</div>
              <div style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '16px' }}>{parsedData.price ? `${parsedData.price.toLocaleString()}đ` : '---'}</div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px', fontWeight: 600 }}>Liên hệ</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '15px' }}>{parsedData.contactInfo || '---'}</div>
            </div>
          </div>
          
          {parsedData.missingFields && parsedData.missingFields.length > 0 && (
            <div style={{ fontSize: '13px', color: 'var(--warning)', marginBottom: '24px', backgroundColor: 'rgba(249, 115, 22, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
              <strong>Lưu ý:</strong> Thiếu thông tin về {parsedData.missingFields.join(', ')}
            </div>
          )}

          <button disabled={loading} className="btn-primary hover-lift" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '15px' }} onClick={handleCreateDraft}>
            Tạo Kèo Nháp
          </button>
        </div>
      )}
    </div>
  );
};
