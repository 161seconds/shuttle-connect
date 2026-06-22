import React from 'react';
import type { SearchFilters as ISearchFilters } from '../types';

interface SearchFiltersProps {
  filters: ISearchFilters;
  onFilterChange: (filters: ISearchFilters) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;
    
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = value ? Number(value) : undefined;
    }

    onFilterChange({ ...filters, [name]: finalValue });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <div style={{ flex: '1 1 120px' }}>
        <select name="district" value={filters.district || ''} onChange={handleChange} style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}>
          <option value="">Quận/huyện</option>
          <option value="District 1">Quận 1</option>
          <option value="District 11">Quận 11</option>
          <option value="Tan Binh">Tân Bình</option>
        </select>
      </div>

      <div style={{ flex: '1 1 140px' }}>
        <input type="date" name="date" value={filters.date || ''} onChange={handleChange} style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }} />
      </div>

      <div style={{ flex: '1 1 120px' }}>
        <select name="skillLevel" value={filters.skillLevel || ''} onChange={handleChange} style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}>
          <option value="">Trình độ</option>
          <option value="yếu">Yếu</option>
          <option value="trung bình">Trung bình</option>
          <option value="khá">Khá</option>
          <option value="cứng">Cứng</option>
        </select>
      </div>

      <div style={{ flex: '1 1 120px' }}>
        <input type="number" name="maxPrice" placeholder="Giá tối đa..." value={filters.maxPrice || ''} onChange={handleChange} style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }} />
      </div>

      <div style={{ flex: '1 1 100%', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <input type="checkbox" id="availableSlots" name="availableSlotsOnly" checked={filters.availableSlotsOnly || false} onChange={handleChange} style={{ width: '16px', height: '16px' }} />
        <label htmlFor="availableSlots" className="text-sm cursor-pointer font-bold">Chỉ sân còn slot</label>
      </div>
    </div>
  );
};
