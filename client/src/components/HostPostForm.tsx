import React, { useState } from 'react';
import { api } from '../api';

interface HostPostFormProps {
  onSuccess?: () => void;
}

export const HostPostForm: React.FC<HostPostFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    courtName: '',
    district: 'Quận 1',
    address: '',
    playDate: '',
    startTime: '',
    endTime: '',
    skillLevel: 'Trung bình',
    slotsNeeded: 1,
    price: 50000,
    contactInfo: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createPost({
        ...formData,
        hostName: 'Current Host', // Mock current host
        sourceType: 'MANUAL',
        status: 'OPEN',
        dateLabel: 'Custom Date',
        slotsText: `Còn ${formData.slotsNeeded} slot`,
        slotsNeeded: Number(formData.slotsNeeded),
        price: Number(formData.price)
      });
      alert('Tạo kèo thành công!');
      // Reset form
      setFormData({
        courtName: '', district: 'Quận 1', address: '', playDate: '', startTime: '', endTime: '',
        skillLevel: 'Trung bình', slotsNeeded: 1, price: 50000, contactInfo: '', description: ''
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi tạo kèo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="font-bold text-xl mb-4">Create Game Post Manually</h3>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Court Name</label>
            <input type="text" name="courtName" value={formData.courtName} onChange={handleChange} required placeholder="e.g. Phu Tho Stadium" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">District</label>
            <select name="district" value={formData.district} onChange={handleChange}>
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 2">Quận 2</option>
              <option value="Quận 3">Quận 3</option>
              <option value="Quận 4">Quận 4</option>
              <option value="Quận 5">Quận 5</option>
              <option value="Quận 10">Quận 10</option>
              <option value="Quận 11">Quận 11</option>
              <option value="Tân Bình">Tân Bình</option>
              <option value="Bình Thạnh">Bình Thạnh</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Full address" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Date</label>
            <input type="date" name="playDate" value={formData.playDate} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Start Time</label>
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">End Time</label>
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Skill Level</label>
            <select name="skillLevel" value={formData.skillLevel} onChange={handleChange}>
              <option value="Yếu">Yếu</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Trung bình khá">Trung bình khá</option>
              <option value="Khá">Khá</option>
              <option value="Cứng">Cứng</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Slots Needed</label>
            <input type="number" name="slotsNeeded" value={formData.slotsNeeded} onChange={handleChange} min="1" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Price (VND)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} step="1000" required />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Contact Info</label>
          <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required placeholder="Phone or Zalo link" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Additional details..." />
        </div>

        <button type="submit" disabled={loading} className="btn-primary mt-2">{loading ? 'Submitting...' : 'Publish Game'}</button>
      </form>
    </div>
  );
};
