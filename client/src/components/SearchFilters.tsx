import React from 'react';
import type { SearchFilters as ISearchFilters } from '../types';
import { CustomSelect } from './CustomSelect';
import { DateSelect } from './DateSelect';

interface SearchFiltersProps {
  filters: ISearchFilters;
  onFilterChange: (filters: ISearchFilters) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = value ? Number(value) : undefined;
    }

    onFilterChange({ ...filters, [name]: finalValue });
  };

  const handleCustomChange = (name: keyof ISearchFilters, value: any) => {
    onFilterChange({ ...filters, [name]: value });
  };

  const handleReset = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Boolean(
    filters.district || filters.date || filters.skillLevel || filters.maxPrice || filters.availableSlotsOnly
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <div style={{ flex: '1 1 150px' }}>
          <CustomSelect 
            options={[
              { value: '', label: 'Tất cả Quận/Huyện' },
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
            value={filters.district || ''}
            onChange={(val) => handleCustomChange('district', val)}
            placeholder="Quận/huyện"
            size="small"
          />
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <DateSelect 
            value={filters.date || ''}
            onChange={(val) => handleCustomChange('date', val)}
            placeholder="Chọn ngày"
            includeAllOption={true}
            size="small"
          />
        </div>

        <div style={{ flex: '1 1 140px' }}>
          <CustomSelect 
            options={[
              { value: '', label: 'Mọi trình độ' },
              { value: 'Yếu', label: 'Yếu' },
              { value: 'Trung bình', label: 'Trung bình' },
              { value: 'Trung bình khá', label: 'Trung bình khá' },
              { value: 'Khá', label: 'Khá' },
              { value: 'Cứng', label: 'Cứng' },
            ]}
            value={filters.skillLevel || ''}
            onChange={(val) => handleCustomChange('skillLevel', val)}
            placeholder="Trình độ"
            size="small"
          />
        </div>

        <div style={{ flex: '1 1 130px' }}>
          <input 
            type="number" 
            name="maxPrice" 
            placeholder="Giá tối đa (đ)..." 
            value={filters.maxPrice || ''} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px 12px', fontSize: '13px', borderRadius: '12px' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingTop: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="availableSlots" 
            name="availableSlotsOnly" 
            checked={filters.availableSlotsOnly || false} 
            onChange={handleChange} 
            style={{ width: '16px', height: '16px', accentColor: 'var(--blue)', cursor: 'pointer' }} 
          />
          <label htmlFor="availableSlots" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer' }}>
            Chỉ hiển thị kèo còn slot trống
          </label>
        </div>

        {hasActiveFilters && (
          <button 
            type="button" 
            onClick={handleReset}
            style={{ 
              fontSize: '13px', 
              fontWeight: 600, 
              color: 'var(--danger)', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Xóa bộ lọc
          </button>
        )}
      </div>
    </div>
  );
};

