import React, { useState } from 'react';
import { parseFacebookPost } from '../utils/postParser';
import type { ParsedFacebookPost } from '../types';

export const ImportFacebookPost: React.FC = () => {
  const [text, setText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedFacebookPost | null>(null);

  const handleParse = () => {
    const data = parseFacebookPost(text);
    setParsedData(data);
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
      <button className="btn-primary" onClick={handleParse}>
        Parse Post
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
            <div><strong>Time:</strong> {parsedData.timeRange || '---'}</div>
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

          <button className="btn-outline" style={{ width: '100%' }}>
            Create Draft Post
          </button>
        </div>
      )}
    </div>
  );
};
