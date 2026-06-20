import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { HostDashboardPage } from './pages/HostDashboardPage';
import { AdminReviewPage } from './pages/AdminReviewPage';
import { AboutPage } from './pages/AboutPage';

// Protected Route Component for role-based access
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { role } = useAuth();
  if (!role) {
    // If not logged in, just show nothing or redirect to home. For MVP, we can redirect to home.
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route 
            path="/host" 
            element={
              <ProtectedRoute allowedRoles={['HOST', 'ADMIN']}>
                <HostDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminReviewPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

