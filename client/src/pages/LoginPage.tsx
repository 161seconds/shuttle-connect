import { ArrowLeft, ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import type { UserRole } from '../types';

const roles: Array<{ role: UserRole; title: string; note: string; icon: typeof UserRound }> = [
  { role: 'PLAYER', title: 'Player', note: 'Xem và liên hệ các kèo đang mở.', icon: UserRound },
  { role: 'HOST', title: 'Host', note: 'Đăng kèo, import bài và quản lý bài của bạn.', icon: UsersRound },
  { role: 'ADMIN', title: 'Admin', note: 'Duyệt bài import và kiểm tra dữ liệu.', icon: ShieldCheck },
];

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const choose = (role: UserRole) => { login(role); navigate(role === 'ADMIN' ? '/admin' : role === 'HOST' ? '/host' : '/explore'); };
  return <main className="login-page"><div className="login-brand"><Link to="/"><ArrowLeft size={18} />Shuttle Connect</Link><h1>CHỌN VAI.<br /><em>VÀO SÂN.</em></h1><p>Mock login dành cho frontend MVP. Không mật khẩu. Không tài khoản thật.</p></div><section className="role-panel"><p className="eyebrow">Bắt đầu</p><h2>Bạn đến đây để làm gì?</h2><div className="role-list">{roles.map(({ role, title, note, icon: Icon }) => <button key={role} onClick={() => choose(role)}><Icon size={24} /><span><b>{title}</b><small>{note}</small></span><strong>→</strong></button>)}</div></section></main>;
}
