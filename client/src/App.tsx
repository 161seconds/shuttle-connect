import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './contexts/AuthProvider';
import { useAuth } from './contexts/auth-context';
import { AboutPage } from './pages/AboutPage';
import { AdminReviewPage } from './pages/AdminReviewPage';
import { ExplorePage } from './pages/ExplorePage';
import { HomePage } from './pages/HomePage';
import { HostDashboardPage } from './pages/HostDashboardPage';
import { LoginPage } from './pages/LoginPage';
import type { UserRole } from './types';

function ProtectedRoute({ roles, children }: { roles: UserRole[]; children: React.ReactNode }) {
  const { role } = useAuth();
  return role && roles.includes(role) ? children : <Navigate to="/login" replace />;
}

function Shell() {
  return <><Navbar /><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/host" element={<ProtectedRoute roles={['HOST', 'ADMIN']}><HostDashboardPage /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']}><AdminReviewPage /></ProtectedRoute>} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></>;
}

export default function App() {
  return <BrowserRouter><AuthProvider><Shell /></AuthProvider></BrowserRouter>;
}
