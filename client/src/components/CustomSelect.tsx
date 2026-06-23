import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'default' | 'large';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ 
  options, value, onChange, placeholder = 'Chọn...', style, size = 'default' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const buttonPadding = size === 'large' ? '16px' : size === 'small' ? '8px 12px' : '10px 16px';
  const buttonFontSize = size === 'large' ? '16px' : size === 'small' ? '13px' : '14px';
  const buttonBorder = size === 'large' ? '2px solid transparent' : '1px solid var(--border)';
  const focusBorder = size === 'large' ? '2px solid var(--blue)' : '1px solid var(--blue)';

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', ...style }}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--surface)',
          color: selectedOption ? 'var(--text)' : 'var(--muted)',
          border: isOpen ? focusBorder : buttonBorder,
          borderRadius: '12px',
          padding: buttonPadding,
          fontSize: buttonFontSize,
          fontWeight: 600,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.2s',
          fontFamily: 'inherit',
          boxShadow: size === 'large' ? 'none' : '0 1px 2px rgba(0,0,0,0.04) inset'
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: selectedOption ? 'var(--text)' : 'var(--muted)', flexShrink: 0, marginLeft: '8px' }}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 100,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '8px'
        }}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                backgroundColor: value === option.value ? 'var(--blue)' : 'transparent',
                color: value === option.value ? '#ffffff' : 'var(--text)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: value === option.value ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.1s',
                fontFamily: 'inherit',
                marginBottom: '4px'
              }}
              onMouseOver={e => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = 'var(--soft-bg)';
                  e.currentTarget.style.color = 'var(--blue)';
                }
              }}
              onMouseOut={e => {
                if (value !== option.value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text)';
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
