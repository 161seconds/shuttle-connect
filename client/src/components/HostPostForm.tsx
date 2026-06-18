import React from 'react';

export const HostPostForm: React.FC = () => {
  return (
    <div className="card">
      <h3 className="font-bold text-xl mb-4">Create Game Post Manually</h3>
      <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Court Name</label>
            <input type="text" placeholder="e.g. Phu Tho Stadium" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">District</label>
            <select>
              <option>District 1</option>
              <option>District 11</option>
              <option>Tan Binh</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Address</label>
          <input type="text" placeholder="Full address" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Date</label>
            <input type="date" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Start Time</label>
            <input type="time" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">End Time</label>
            <input type="time" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Skill Level</label>
            <select>
              <option>Yếu</option>
              <option>Trung bình</option>
              <option>Khá</option>
              <option>Cứng</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Slots Needed</label>
            <input type="number" min="1" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Price (VND)</label>
            <input type="number" step="1000" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Contact Info</label>
          <input type="text" placeholder="Phone or Zalo link" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Description</label>
          <textarea rows={3} placeholder="Additional details..." />
        </div>

        <button type="submit" className="btn-primary mt-2">Publish Game</button>
      </form>
    </div>
  );
};
