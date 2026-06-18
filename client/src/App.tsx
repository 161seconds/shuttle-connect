import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { HostDashboardPage } from './pages/HostDashboardPage';
import { AdminReviewPage } from './pages/AdminReviewPage';
import { AboutPage } from './pages/AboutPage';
import { LoginModal } from './components/LoginModal';
import type { UserRole } from './types';
import './styles/global.css';

function App() {
  const [role, setRole] = useState<UserRole>('Player');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    localStorage.setItem('userRole', selectedRole);
    setLoginModalOpen(false);
  };

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar role={role} onLoginClick={() => setLoginModalOpen(true)} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected Routes Mock */}
            <Route 
              path="/host" 
              element={['Host', 'Admin'].includes(role) ? <HostDashboardPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin" 
              element={role === 'Admin' ? <AdminReviewPage /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setLoginModalOpen(false)} 
          onSelectRole={handleRoleSelect} 
        />
      </div>
    </Router>
  );
}

export default App;
