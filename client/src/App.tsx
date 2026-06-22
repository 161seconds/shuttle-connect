import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { HostDashboardPage } from './pages/HostDashboardPage';
import { AdminReviewPage } from './pages/AdminReviewPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';

// Protected Route Component for role-based access
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { role } = useAuth();
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return (
      <div className="container py-8 text-center" style={{ marginTop: '100px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: 'var(--danger)' }}>Không đủ quyền</h2>
        <p className="text-muted mb-4">Tài khoản của bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }
  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isLoginPage && <Navbar />}

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage />} />
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

