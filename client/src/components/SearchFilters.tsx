import { RotateCcw } from 'lucide-react';
import type { SearchFilters as Filters } from '../types';

const emptyFilters: Filters = {
  district: '', date: '', startTime: '', endTime: '', skillLevel: '', maxPrice: '', availableSlotsOnly: true,
};

export function SearchFilters({ value, onChange }: { value: Filters; onChange: (filters: Filters) => void }) {
  const update = (key: keyof Filters, next: string | boolean) => onChange({ ...value, [key]: next });
  return (
    <section className="filters" aria-label="Bộ lọc tìm kèo">
      <label><span>Khu vực</span><select value={value.district} onChange={(event) => update('district', event.target.value)}>
        <option value="">Tất cả quận</option>
        {['Bình Thạnh', 'Quận 4', 'Quận 10', 'Tân Bình', 'Tân Phú', 'Thủ Đức'].map((item) => <option key={item}>{item}</option>)}
      </select></label>
      <label><span>Ngày chơi</span><input type="date" value={value.date} onChange={(event) => update('date', event.target.value)} /></label>
      <label><span>Từ giờ</span><input type="time" value={value.startTime} onChange={(event) => update('startTime', event.target.value)} /></label>
      <label><span>Đến giờ</span><input type="time" value={value.endTime} onChange={(event) => update('endTime', event.target.value)} /></label>
      <label><span>Trình độ</span><select value={value.skillLevel} onChange={(event) => update('skillLevel', event.target.value)}>
        <option value="">Mọi trình độ</option>
        {['Yếu', 'Trung bình', 'Trung bình khá', 'Khá', 'Cứng', 'Giao lưu'].map((item) => <option key={item}>{item}</option>)}
      </select></label>
      <label><span>Giá tối đa</span><input type="number" min="0" step="10000" placeholder="100000" value={value.maxPrice} onChange={(event) => update('maxPrice', event.target.value)} /></label>
      <label className="check-field"><input type="checkbox" checked={value.availableSlotsOnly} onChange={(event) => update('availableSlotsOnly', event.target.checked)} /><span>Chỉ kèo còn slot</span></label>
      <button className="reset-filter" onClick={() => onChange(emptyFilters)}><RotateCcw size={15} />Đặt lại</button>
    </section>
  );
}
