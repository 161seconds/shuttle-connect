import { Check, Copy, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import { postsApi } from '../api';
import type { PostStatus } from '../types';

type ReviewTab = 'PENDING' | 'APPROVED' | 'REJECTED';

export function AdminReviewPage() {
  const [posts, setPosts] = useState(postsApi.listAll);
  const [tab, setTab] = useState<ReviewTab>('PENDING');
  const refresh = () => setPosts(postsApi.listAll());
  const update = (id: string, status: PostStatus) => { postsApi.updateStatus(id, status); refresh(); };
  const filtered = posts.filter((post) => tab === 'PENDING' ? post.status === 'PENDING' : tab === 'APPROVED' ? ['APPROVED', 'OPEN'].includes(post.status) : ['REJECTED', 'DUPLICATE'].includes(post.status));

  return <main className="page-shell dashboard-page">
    <div className="admin-header"><div className="page-intro compact"><p className="eyebrow">Admin review</p><h1>Kiểm dữ liệu.<br />Giữ kèo sạch.</h1></div><button className="button button-ghost" onClick={() => { postsApi.reset(); refresh(); }}><RotateCcw size={16} />Khôi phục mẫu</button></div>
    <div className="review-tabs">{(['PENDING', 'APPROVED', 'REJECTED'] as ReviewTab[]).map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}<span>{posts.filter((post) => item === 'PENDING' ? post.status === 'PENDING' : item === 'APPROVED' ? ['APPROVED', 'OPEN'].includes(post.status) : ['REJECTED', 'DUPLICATE'].includes(post.status)).length}</span></button>)}</div>
    <section className="review-list">{filtered.length === 0 ? <div className="empty-state"><b>Không có bài trong mục này.</b><span>Hàng đợi đã sạch.</span></div> : filtered.map((post) => <article className="review-card" key={post.id}>
      <header><div><span className={`status status-${post.status.toLowerCase()}`}>{post.status}</span><span className="source">{post.sourceType}</span><h2>{post.courtName}</h2><p>{post.address}</p></div>{post.sourceType === 'FACEBOOK_IMPORT' && <div className="confidence"><b>{post.confidenceScore ?? 0}%</b><span>confidence</span></div>}</header>
      {post.originalText && <blockquote>“{post.originalText}”</blockquote>}
      <div className="review-data"><span><small>Ngày · giờ</small>{post.playDate || '—'} · {post.startTime || '—'}–{post.endTime || '—'}</span><span><small>Trình · slot</small>{post.skillLevel} · {post.slotsNeeded}</span><span><small>Giá · liên hệ</small>{post.price === 0 ? '0đ / chưa rõ' : `${post.price.toLocaleString('vi-VN')}đ`} · {post.contactInfo}</span></div>
      {(post.missingFields?.length ?? 0) > 0 && <p className="missing">Thiếu: {post.missingFields?.join(', ')}</p>}
      <footer><button className="approve-action" onClick={() => update(post.id, 'APPROVED')}><Check size={16} />Duyệt</button><button onClick={() => update(post.id, 'DUPLICATE')}><Copy size={15} />Trùng</button><button className="reject-action" onClick={() => update(post.id, 'REJECTED')}><X size={16} />Từ chối</button></footer>
    </article>)}</section>
  </main>;
}
