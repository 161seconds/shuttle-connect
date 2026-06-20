import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FacebookIcon } from './icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  if (!isOpen) return null;

  const handleMockLogin = (role: 'PLAYER' | 'HOST' | 'ADMIN') => {
    login(role);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--soft-bg)',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            zIndex: 10
          }}
        >
          &times;
        </button>

        {/* Header Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          <button 
            onClick={() => setActiveTab('LOGIN')}
            style={{ 
              flex: 1, 
              padding: '20px 0', 
              fontSize: '16px', 
              fontWeight: 700,
              color: activeTab === 'LOGIN' ? 'var(--navy)' : 'var(--muted)',
              borderBottom: activeTab === 'LOGIN' ? '3px solid var(--blue)' : '3px solid transparent',
              backgroundColor: activeTab === 'LOGIN' ? 'white' : 'var(--soft-bg)'
            }}
          >
            Đăng nhập
          </button>
          <button 
            onClick={() => setActiveTab('REGISTER')}
            style={{ 
              flex: 1, 
              padding: '20px 0', 
              fontSize: '16px', 
              fontWeight: 700,
              color: activeTab === 'REGISTER' ? 'var(--navy)' : 'var(--muted)',
              borderBottom: activeTab === 'REGISTER' ? '3px solid var(--blue)' : '3px solid transparent',
              backgroundColor: activeTab === 'REGISTER' ? 'white' : 'var(--soft-bg)'
            }}
          >
            Đăng ký
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>Email</label>
              <input type="email" placeholder="Nhập email của bạn" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '15px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>Mật khẩu</label>
              <input type="password" placeholder="Nhập mật khẩu" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '15px' }} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '8px' }}>
              {activeTab === 'LOGIN' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>HOẶC TIẾP TỤC VỚI</div>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '20px', height: '20px' }} /> Google
            </button>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px' }}>
              <span style={{ color: '#1877f2', display: 'flex' }}><FacebookIcon size={20} /></span> Facebook
            </button>
          </div>

          {/* MVP Mock Login Section */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: '16px', 
            padding: '20px',
            border: '1px dashed #cbd5e1'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px', textAlign: 'center' }}>⚡ Bản Demo (MVP) - Chọn nhanh</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => handleMockLogin('PLAYER')}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--navy)' }}
              >
                Vào vai <span style={{ color: 'var(--blue)' }}>Người chơi</span>
              </button>
              <button 
                onClick={() => handleMockLogin('HOST')}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--navy)' }}
              >
                Vào vai <span style={{ color: 'var(--green)' }}>Host (Người tạo kèo)</span>
              </button>
              <button 
                onClick={() => handleMockLogin('ADMIN')}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'white', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--navy)' }}
              >
                Vào vai <span style={{ color: 'var(--text)' }}>Admin (Kiểm duyệt)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
