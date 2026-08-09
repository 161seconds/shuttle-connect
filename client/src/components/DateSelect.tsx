import React, { useMemo } from 'react';
import { CustomSelect } from './CustomSelect';

interface DateSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'default' | 'large';
  daysToGenerate?: number;
  includeAllOption?: boolean;
}

export const DateSelect: React.FC<DateSelectProps> = ({
  value,
  onChange,
  placeholder = 'Chọn ngày',
  style,
  size = 'default',
  daysToGenerate = 30,
  includeAllOption = false
}) => {
  const options = useMemo(() => {
    const dates = [];
    if (includeAllOption) {
      dates.push({ value: '', label: 'Mọi thời gian' });
    }
    
    const today = new Date();
    for (let i = 0; i < daysToGenerate; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      let label = '';
      if (i === 0) label = `Hôm nay, ${day}/${month}`;
      else if (i === 1) label = `Ngày mai, ${day}/${month}`;
      else {
        const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        label = `${dayNames[d.getDay()]}, ${day}/${month}`;
      }
      dates.push({ value: dateString, label });
    }
    return dates;
  }, [daysToGenerate, includeAllOption]);

  return (
    <CustomSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      size={size}
    />
  );
};
