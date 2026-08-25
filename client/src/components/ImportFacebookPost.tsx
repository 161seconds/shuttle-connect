import React, { useState } from 'react';
import { api } from '../api';
import type { ParsedFacebookPost } from '../types';
import { useAlert } from '../contexts/GlobalAlertContext';
import { FacebookIcon, CheckCircleIcon } from './icons';

interface ImportFacebookPostProps {
  onSuccess?: () => void;
}

const SAMPLE_POSTS = [
  {
    title: 'Mẫu 1: Bình Thạnh',
    text: 'Tối nay sân TADA Bình Thạnh 19-21h cần 2 vãng lai trình TB khá, 80k/người, ib mình nha 0909123456'
  },
  {
    title: 'Mẫu 2: Tân Bình',
    text: 'Mai 18h-20h sân Ga Trực Thăng Tân Bình thiếu 1 bạn đánh khá, tiền sân + cầu 75k. Zalo 0918234567'
  },
  {
    title: 'Mẫu 3: Quận 10',
    text: 'Hôm nay 17h30 - 19h30 sân Kỳ Hòa Quận 10 tuyển 3 slot giao lưu vui vẻ, 65k/slot, liên hệ 0966332211'
  }
];

export const ImportFacebookPost: React.FC<ImportFacebookPostProps> = ({ onSuccess }) => {
  const [text, setText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedFacebookPost | null>(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleParse = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const data = await api.parseFacebookPost(text);
      setParsedData(data);
      showAlert(`Đã trích xuất thông tin với độ tin cậy ${data.confidenceScore}%!`, 'success');
    } catch (error) {
      console.error('Parse error:', error);
      showAlert('Lỗi khi phân tích nội dung.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplySample = (sampleText: string) => {
    setText(sampleText);
    setParsedData(null);
  };

  const handleCreateDraft = async () => {
    if (!parsedData) return;
    setLoading(true);
    try {
      await api.createPost({
        courtName: parsedData.courtName || 'Sân Cầu Lông (Chưa rõ)',
        address: parsedData.address || `${parsedData.district || 'TP. HCM'}`,
        district: parsedData.district || 'Quận 1',
        playDate: parsedData.date || new Date().toISOString().split('T')[0],
        startTime: parsedData.startTime || '19:00',
        endTime: parsedData.endTime || '21:00',
        skillLevel: parsedData.skillLevel || 'Trung bình',
        slotsNeeded: parsedData.slotsNeeded || 2,
        price: Number(parsedData.price || 80000),
        contactInfo: parsedData.contactInfo || '0909 123 456',
        description: text,
        hostName: 'Host Tự Động',
        sourceType: 'FACEBOOK_IMPORT',
        status: 'PENDING',
        slotsText: `Cần ${parsedData.slotsNeeded || 2} slot`,
        dateLabel: 'Hôm nay',
        originalText: text,
        confidenceScore: parsedData.confidenceScore,
        missingFields: parsedData.missingFields
      });
      showAlert('Tạo kèo nháp thành công! Bài viết đã được lưu vào hệ thống và gửi Admin duyệt.', 'success');
      setText('');
      setParsedData(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Create error:', error);
      showAlert('Lỗi khi tạo kèo nháp.', 'error');
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
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          backgroundColor: '#e7f0ff',
          color: '#1877f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FacebookIcon size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
            Trích xuất bài đăng Facebook
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
            Nhập bài đăng tìm vãng lai để tự động điền thông tin kèo
          </p>
        </div>
      </div>

      {/* Sample Post Quick Pill Buttons */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
          Thử nhanh với bài viết mẫu:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SAMPLE_POSTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplySample(sample.text)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: text === sample.text ? 'var(--blue)' : 'var(--soft-bg)',
                color: text === sample.text ? '#ffffff' : 'var(--navy)',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Textarea with glowing border on typing */}
      <div style={{
        position: 'relative',
        padding: '2px',
        borderRadius: '14px',
        background: text ? 'linear-gradient(45deg, var(--blue), var(--purple), var(--green))' : 'var(--border)',
        transition: 'all 0.3s ease'
      }}>
        <textarea
          rows={4}
          placeholder="Ví dụ: Tối nay sân TADA Bình Thạnh 19-21h cần 2 vãng lai trình TB khá, 80k/người, ib mình nha 0909123456..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            resize: 'vertical',
            border: 'none',
            borderRadius: '12px',
            outline: 'none',
            fontSize: '14px',
            lineHeight: 1.5,
            padding: '12px',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          disabled={loading || !text.trim()}
          className="btn btn-primary"
          style={{
            flex: 1,
            padding: '12px 20px',
            fontSize: '14px',
            opacity: (!text.trim() || loading) ? 0.6 : 1,
            cursor: (!text.trim() || loading) ? 'not-allowed' : 'pointer'
          }}
          onClick={handleParse}
        >
          {loading ? 'Đang phân tích...' : '✨ Phân tích tự động'}
        </button>
        {text && (
          <button
            type="button"
            onClick={() => { setText(''); setParsedData(null); }}
            style={{
              padding: '12px 16px',
              borderRadius: '9999px',
              backgroundColor: 'var(--soft-bg)',
              color: 'var(--muted)',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            Xóa
          </button>
        )}
      </div>

      {/* Parsed Result Box */}
      {parsedData && (
        <div style={{
          marginTop: '12px',
          padding: '20px',
          backgroundColor: 'var(--soft-bg)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          animation: 'reveal-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--green)', display: 'flex' }}><CheckCircleIcon size={20} /></span>
              <h4 style={{ fontWeight: 800, fontSize: '16px', color: 'var(--navy)', margin: 0 }}>
                Kết quả bóc tách dữ liệu
              </h4>
            </div>
            
            {/* Confidence Score Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--surface)',
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid var(--border)'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>Độ tin cậy:</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 800,
                color: parsedData.confidenceScore >= 80 ? 'var(--green)' : 'var(--warning)'
              }}>
                {parsedData.confidenceScore}%
              </span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px', fontWeight: 600 }}>Sân & Quận</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>
                {parsedData.courtName || '---'} ({parsedData.district || '---'})
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px', fontWeight: 600 }}>Thời gian</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>
                {parsedData.date || '---'} • {parsedData.startTime} - {parsedData.endTime}
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px', fontWeight: 600 }}>Số slot & Trình độ</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>
                Cần {parsedData.slotsNeeded} slot • {parsedData.skillLevel}
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px', fontWeight: 600 }}>Chi phí & Liên hệ</div>
              <div style={{ fontWeight: 800, color: 'var(--blue)', fontSize: '14px' }}>
                {(parsedData.price || 0).toLocaleString()}đ • {parsedData.contactInfo}
              </div>

            </div>
          </div>
          
          {parsedData.missingFields && parsedData.missingFields.length > 0 && (
            <div style={{ fontSize: '12px', color: 'var(--warning)', marginBottom: '16px', backgroundColor: 'rgba(255, 138, 31, 0.1)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255, 138, 31, 0.2)' }}>
              <strong>Lưu ý:</strong> Chưa nhận diện được {parsedData.missingFields.join(', ')}. Bạn có thể điều chỉnh sau khi tạo.
            </div>
          )}

          <button
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: 700 }}
            onClick={handleCreateDraft}
          >
            Lưu và Tạo Kèo Nháp (Chờ Admin Duyệt)
          </button>
        </div>
      )}

      {/* MVP Limitations Notice per AGENTS.md */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: 'var(--soft-bg)',
        borderRadius: '12px',
        fontSize: '12px',
        color: 'var(--muted)',
        lineHeight: 1.4
      }}>
        💡 <strong>Ghi chú MVP:</strong> Shuttle Connect hỗ trợ nhập bài đăng thủ công và sẵn sàng tích hợp Facebook Page API chính thức. Hệ thống không sử dụng bot hay tự động cào dữ liệu (không vi phạm chính sách Meta).
      </div>
    </div>
  );
};

