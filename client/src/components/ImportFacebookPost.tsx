import React, { useState } from 'react';
import { api } from '../api';
import type { ParsedFacebookPost } from '../types';

interface ImportFacebookPostProps {
  onSuccess?: () => void;
}

export const ImportFacebookPost: React.FC<ImportFacebookPostProps> = ({ onSuccess }) => {
  const [text, setText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedFacebookPost | null>(null);
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const data = await api.parseFacebookPost(text);
      setParsedData(data);
    } catch (error) {
      console.error('Parse error:', error);
      alert('Failed to parse text from server.');
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
        price: parsedData.price || 50000,
        contactInfo: parsedData.contactInfo || 'Unknown Contact',
        description: text,
        hostName: 'Current Host',
        sourceType: 'FACEBOOK_IMPORT',
        status: 'PENDING',
        slotsText: `Cần thêm ${parsedData.slotsNeeded || 1} slot`,
        dateLabel: 'Imported Date'
      });
      alert('Tạo nháp thành công! Vui lòng chờ Admin duyệt.');
      setText('');
      setParsedData(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Create error:', error);
      alert('Lỗi tạo kèo nháp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex-col gap-4">
      <h3 className="font-bold text-xl mb-2">Import from Facebook</h3>
      <p className="text-sm text-muted mb-4">
        Note: This MVP does not scrape Facebook groups. Paste the content of a Facebook post below.
      </p>
      <textarea
        rows={6}
        placeholder="Paste Facebook post text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', resize: 'vertical', marginBottom: '1rem' }}
      />
      <button disabled={loading || !text} className="btn-primary" onClick={handleParse}>
        {loading ? 'Parsing...' : 'Parse Post'}
      </button>

      {parsedData && (
        <div className="mt-4 p-4" style={{ background: 'var(--bg-color)', borderRadius: 'var(--radius)' }}>
          <h4 className="font-bold mb-2 flex justify-between">
            Parsed Results
            <span style={{ color: parsedData.confidenceScore > 50 ? 'var(--success)' : 'var(--warning)' }}>
              Confidence: {parsedData.confidenceScore}%
            </span>
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div><strong>Date:</strong> {parsedData.date || '---'}</div>
            <div><strong>Time:</strong> {parsedData.startTime ? `${parsedData.startTime} - ${parsedData.endTime}` : '---'}</div>
            <div><strong>Slots:</strong> {parsedData.slotsNeeded || '---'}</div>
            <div><strong>Price:</strong> {parsedData.price ? `${parsedData.price} VND` : '---'}</div>
            <div><strong>Skill Level:</strong> {parsedData.skillLevel || '---'}</div>
            <div><strong>Contact:</strong> {parsedData.contactInfo || '---'}</div>
          </div>
          
          {parsedData.missingFields.length > 0 && (
            <div className="text-sm mb-4 text-warning" style={{ color: 'var(--warning)' }}>
              <strong>Missing fields:</strong> {parsedData.missingFields.join(', ')}
            </div>
          )}

          <button disabled={loading} className="btn-outline" style={{ width: '100%' }} onClick={handleCreateDraft}>
            Create Draft Post
          </button>
        </div>
      )}
    </div>
  );
};
