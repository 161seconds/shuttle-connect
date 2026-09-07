import { FileInput, Plus, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { postsApi } from '../api';
import { useAuth } from '../contexts/auth-context';
import type { GamePost, ParsedFacebookPost, SkillLevel } from '../types';
import { parseFacebookPost } from '../utils/postParser';

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const locations: Record<string, [number, number]> = {
  'Bình Thạnh': [10.811, 106.71], 'Quận 4': [10.76, 106.7], 'Quận 10': [10.773, 106.667],
  'Tân Bình': [10.801, 106.652], 'Tân Phú': [10.79, 106.625], 'Thủ Đức': [10.85, 106.76],
};

interface ManualForm {
  courtName: string; address: string; district: string; playDate: string; startTime: string; endTime: string;
  skillLevel: SkillLevel; slotsNeeded: string; price: string; contactInfo: string; description: string;
}

const blankForm = (): ManualForm => ({
  courtName: '', address: '', district: 'Bình Thạnh', playDate: today(), startTime: '19:00', endTime: '21:00',
  skillLevel: 'Trung bình', slotsNeeded: '2', price: '80000', contactInfo: '', description: '',
});

export function HostDashboardPage() {
  const { userId } = useAuth();
  const [tab, setTab] = useState<'manual' | 'import'>('manual');
  const [form, setForm] = useState(blankForm);
  const [facebookText, setFacebookText] = useState('');
  const [preview, setPreview] = useState<ParsedFacebookPost>();
  const [posts, setPosts] = useState(() => postsApi.listByOwner(userId));
  const [message, setMessage] = useState('');
  const refresh = () => setPosts(postsApi.listByOwner(userId));
  const update = <K extends keyof ManualForm>(key: K, value: ManualForm[K]) => setForm((current) => ({ ...current, [key]: value }));

  const submitManual = (event: FormEvent) => {
    event.preventDefault();
    if (!form.courtName.trim() || !form.contactInfo.trim()) return setMessage('Nhập tên sân và thông tin liên hệ.');
    if (form.endTime <= form.startTime) return setMessage('Giờ kết thúc phải sau giờ bắt đầu.');
    const [lat, lng] = locations[form.district] ?? [10.78, 106.68];
    postsApi.create({
      ownerId: userId, courtName: form.courtName.trim(), address: form.address.trim() || `${form.courtName}, ${form.district}`,
      district: form.district, playDate: form.playDate, startTime: form.startTime, endTime: form.endTime,
      skillLevel: form.skillLevel, slotsNeeded: Number(form.slotsNeeded), price: Number(form.price), hostName: 'Nam Nguyễn',
      contactInfo: form.contactInfo.trim(), description: form.description.trim() || 'Kèo giao lưu, vui lòng đến đúng giờ.',
      sourceType: 'MANUAL', status: 'OPEN', lat, lng,
    });
    setForm(blankForm()); setMessage('Đã đăng kèo.'); refresh();
  };

  const parseImport = () => {
    if (!facebookText.trim()) return setMessage('Dán nội dung bài Facebook trước.');
    setPreview(parseFacebookPost(facebookText)); setMessage('Đã trích xuất. Kiểm tra dữ liệu trước khi tạo nháp.');
  };

  const createDraft = () => {
    if (!preview) return;
    const [lat, lng] = locations[preview.district ?? ''] ?? [10.78, 106.68];
    postsApi.create({
      ownerId: userId, courtName: preview.courtName ?? 'Chưa xác định', address: preview.address ?? 'Chưa xác định',
      district: preview.district ?? 'Chưa xác định', playDate: preview.playDate ?? '', startTime: preview.startTime ?? '',
      endTime: preview.endTime ?? '', skillLevel: preview.skillLevel ?? 'Giao lưu', slotsNeeded: preview.slotsNeeded ?? 0,
      price: preview.price ?? 0, hostName: 'Nam Nguyễn', contactInfo: preview.contactInfo ?? 'Chưa xác định',
      description: facebookText, sourceType: 'FACEBOOK_IMPORT', status: 'PENDING', lat, lng,
      originalText: facebookText, confidenceScore: preview.confidenceScore, missingFields: preview.missingFields,
    });
    setFacebookText(''); setPreview(undefined); setMessage('Đã tạo bản nháp và gửi Admin duyệt.'); refresh();
  };

  const toggle = (post: GamePost) => {
    if (post.status !== 'OPEN' && post.status !== 'FULL') return;
    postsApi.updateStatus(post.id, post.status === 'OPEN' ? 'FULL' : 'OPEN'); refresh();
  };

  const remove = (id: string) => {
    if (!window.confirm('Xóa bài đăng này?')) return;
    postsApi.remove(id, userId); refresh();
  };

  return <main className="page-shell dashboard-page">
    <div className="page-intro compact"><p className="eyebrow">Host console</p><h1>Đăng kèo.<br />Lấp đầy sân.</h1><p>Chỉ bài thuộc tài khoản mock hiện tại xuất hiện tại đây.</p></div>
    <div className="dashboard-grid">
      <section className="form-card">
        <div className="tabs"><button className={tab === 'manual' ? 'active' : ''} onClick={() => setTab('manual')}><Plus size={16} />Đăng thủ công</button><button className={tab === 'import' ? 'active' : ''} onClick={() => setTab('import')}><FileInput size={16} />Import Facebook</button></div>
        {message && <p className="form-message">{message}</p>}
        {tab === 'manual' ? <form className="post-form" onSubmit={submitManual}>
          <label><span>Tên sân *</span><input required value={form.courtName} onChange={(e) => update('courtName', e.target.value)} /></label>
          <div className="form-row"><label><span>Quận/Huyện *</span><select value={form.district} onChange={(e) => update('district', e.target.value)}>{Object.keys(locations).map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Ngày chơi *</span><input required type="date" value={form.playDate} onChange={(e) => update('playDate', e.target.value)} /></label></div>
          <label><span>Địa chỉ</span><input value={form.address} onChange={(e) => update('address', e.target.value)} /></label>
          <div className="form-row"><label><span>Bắt đầu</span><input required type="time" value={form.startTime} onChange={(e) => update('startTime', e.target.value)} /></label><label><span>Kết thúc</span><input required type="time" value={form.endTime} onChange={(e) => update('endTime', e.target.value)} /></label></div>
          <div className="form-row"><label><span>Trình độ</span><select value={form.skillLevel} onChange={(e) => update('skillLevel', e.target.value as SkillLevel)}>{['Yếu', 'Trung bình', 'Trung bình khá', 'Khá', 'Cứng', 'Giao lưu'].map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Số slot</span><input required min="1" max="20" type="number" value={form.slotsNeeded} onChange={(e) => update('slotsNeeded', e.target.value)} /></label></div>
          <div className="form-row"><label><span>Chi phí/người</span><input required min="0" step="5000" type="number" value={form.price} onChange={(e) => update('price', e.target.value)} /></label><label><span>Điện thoại/Zalo *</span><input required value={form.contactInfo} onChange={(e) => update('contactInfo', e.target.value)} /></label></div>
          <label><span>Mô tả</span><textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} /></label>
          <button className="button button-primary full-button" type="submit">Đăng kèo ngay</button>
        </form> : <div className="import-form"><label><span>Nội dung bài Facebook</span><textarea rows={8} value={facebookText} onChange={(e) => { setFacebookText(e.target.value); setPreview(undefined); }} placeholder="Tối nay sân TADA Bình Thạnh 19-21h cần 2 vãng lai trình TB khá, 80k/người, ib mình..." /></label><button className="button button-dark full-button" onClick={parseImport}>Trích xuất dữ liệu</button>{preview && <div className="parse-preview"><div className="score"><b>{preview.confidenceScore}%</b><span>độ tin cậy</span></div><dl><div><dt>Sân</dt><dd>{preview.courtName ?? '—'}</dd></div><div><dt>Khu vực</dt><dd>{preview.district ?? '—'}</dd></div><div><dt>Ngày · giờ</dt><dd>{preview.playDate ?? '—'} · {preview.startTime ?? '—'}–{preview.endTime ?? '—'}</dd></div><div><dt>Slot · giá</dt><dd>{preview.slotsNeeded ?? '—'} · {preview.price === undefined ? '—' : preview.price === 0 ? 'Miễn phí' : `${preview.price.toLocaleString('vi-VN')}đ`}</dd></div></dl>{preview.missingFields.length > 0 && <p className="missing">Thiếu: {preview.missingFields.join(', ')}</p>}<button className="button button-primary full-button" onClick={createDraft}>Tạo bản nháp chờ duyệt</button></div>}</div>}
      </section>
      <section className="host-posts"><div className="panel-heading"><div><p className="eyebrow">Bài của bạn</p><h2>{posts.length} bài đăng</h2></div></div>{posts.length === 0 ? <div className="empty-state"><b>Chưa có bài.</b><span>Tạo kèo đầu tiên ở biểu mẫu bên cạnh.</span></div> : posts.map((post) => <article className="manage-row" key={post.id}><div><span className={`status status-${post.status.toLowerCase()}`}>{post.status}</span><h3>{post.courtName}</h3><p>{post.playDate} · {post.startTime}–{post.endTime} · {post.slotsNeeded} slot</p></div><div className="manage-actions">{(post.status === 'OPEN' || post.status === 'FULL') && <button onClick={() => toggle(post)}>{post.status === 'OPEN' ? 'Đánh dấu đủ' : 'Mở lại'}</button>}<button className="danger-action" onClick={() => remove(post.id)} aria-label={`Xóa ${post.courtName}`}><Trash2 size={16} /></button></div></article>)}</section>
    </div>
  </main>;
}
