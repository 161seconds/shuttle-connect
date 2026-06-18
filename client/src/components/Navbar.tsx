import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { UserRole } from '../types';
import { Activity } from 'lucide-react';

interface NavbarProps {
  role: UserRole;
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ role, onLoginClick }) => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Host Dashboard', path: '/host', roles: ['Host', 'Admin'] },
    { name: 'Admin Review', path: '/admin', roles: ['Admin'] },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="layout-container flex items-center justify-between" style={{ height: '70px' }}>
        <Link to="/" className="flex items-center gap-2 font-bold text-xl" style={{ color: 'var(--primary)' }}>
          <Activity size={28} />
          Shuttle Connect
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map(link => {
            if (link.roles && !link.roles.includes(role)) return null;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--primary)' : 'var(--text-main)'
                }}
              >
                {link.name}
              </Link>
            );
          })}
          <button className="btn-outline" onClick={onLoginClick}>
            Login ({role})
          </button>
        </div>
      </div>
    </nav>
  );
};
