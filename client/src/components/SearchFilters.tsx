import React from 'react';
import type { SearchFilters as ISearchFilters } from '../types';
import { CustomSelect } from './CustomSelect';

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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <div style={{ flex: '1 1 140px' }}>
        <CustomSelect 
          options={[
            { value: '', label: 'Tất cả Quận/Huyện' },
            { value: 'District 1', label: 'Quận 1' },
            { value: 'District 11', label: 'Quận 11' },
            { value: 'Tan Binh', label: 'Tân Bình' },
          ]}
          value={filters.district || ''}
          onChange={(val) => handleCustomChange('district', val)}
          placeholder="Quận/huyện"
        />
      </div>

      <div style={{ flex: '1 1 160px' }}>
        <input type="date" name="date" value={filters.date || ''} onChange={handleChange} style={{ width: '100%', padding: '10px 16px', fontSize: '14px', borderRadius: '12px' }} />
      </div>

      <div style={{ flex: '1 1 140px' }}>
        <CustomSelect 
          options={[
            { value: '', label: 'Mọi trình độ' },
            { value: 'yếu', label: 'Yếu' },
            { value: 'trung bình', label: 'Trung bình' },
            { value: 'khá', label: 'Khá' },
            { value: 'cứng', label: 'Cứng' },
          ]}
          value={filters.skillLevel || ''}
          onChange={(val) => handleCustomChange('skillLevel', val)}
          placeholder="Trình độ"
        />
      </div>

      <div style={{ flex: '1 1 120px' }}>
        <input type="number" name="maxPrice" placeholder="Giá tối đa..." value={filters.maxPrice || ''} onChange={handleChange} style={{ width: '100%', padding: '10px 16px', fontSize: '14px', borderRadius: '12px' }} />
      </div>

      <div style={{ flex: '1 1 100%', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <input type="checkbox" id="availableSlots" name="availableSlotsOnly" checked={filters.availableSlotsOnly || false} onChange={handleChange} style={{ width: '16px', height: '16px' }} />
        <label htmlFor="availableSlots" className="text-sm cursor-pointer font-bold">Chỉ hiển thị sân còn slot trống</label>
      </div>
    </div>
  );
};
