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
    <div className="card flex-col gap-4">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-bold">District</label>
        <select name="district" value={filters.district || ''} onChange={handleChange}>
          <option value="">All Districts</option>
          <option value="District 1">District 1</option>
          <option value="District 11">District 11</option>
          <option value="Tan Binh">Tan Binh</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-bold">Date</label>
        <input type="date" name="date" value={filters.date || ''} onChange={handleChange} />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-bold">Skill Level</label>
        <select name="skillLevel" value={filters.skillLevel || ''} onChange={handleChange}>
          <option value="">All Levels</option>
          <option value="yếu">Yếu</option>
          <option value="trung bình">Trung bình</option>
          <option value="khá">Khá</option>
          <option value="cứng">Cứng</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm font-bold">Max Price (VND)</label>
        <input type="number" name="maxPrice" placeholder="e.g. 100000" value={filters.maxPrice || ''} onChange={handleChange} />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="availableSlots" name="availableSlotsOnly" checked={filters.availableSlotsOnly || false} onChange={handleChange} />
        <label htmlFor="availableSlots" className="text-sm cursor-pointer">Available slots only</label>
      </div>
    </div>
  );
};
