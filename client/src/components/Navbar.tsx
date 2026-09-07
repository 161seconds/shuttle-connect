import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export function Navbar() {
  const { role, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('shuttle_connect_theme') === 'dark');

  const setTheme = (nextDark: boolean) => {
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    localStorage.setItem('shuttle_connect_theme', nextDark ? 'dark' : 'light');
    setDark(nextDark);
  };

  const links = [
    ['/', 'Trang chủ'], ['/explore', 'Tìm kèo'],
    ...(role === 'HOST' || role === 'ADMIN' ? [['/host', 'Khu Host']] : []),
    ...(role === 'ADMIN' ? [['/admin', 'Duyệt bài']] : []),
    ['/about', 'Về dự án'],
  ];

  return (
    <header className="site-header">
      <div className="nav-shell">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">SC</span>
          <span>SHUTTLE CONNECT</span>
        </NavLink>
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Điều hướng chính">
          {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
          {role ? (
            <button className="nav-account" onClick={() => { logout(); setOpen(false); }}>Thoát · {role}</button>
          ) : <NavLink to="/login" className="nav-account" onClick={() => setOpen(false)}>Chọn vai trò</NavLink>}
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => setTheme(!dark)} aria-label="Đổi giao diện màu">
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Mở menu" aria-expanded={open}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
