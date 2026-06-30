import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { LandingLayout } from '../layouts/LandingLayout';
import { Spinner } from '../components/ui/Spinner';

// Lazy load pages
const LandingPage = lazy(() => import('../pages/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmailPage').then(m => ({ default: m.VerifyEmailPage })));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TasksPage = lazy(() => import('../pages/tasks/TasksPage').then(m => ({ default: m.TasksPage })));
const TaskDetailPage = lazy(() => import('../features/tasks/components/TaskDetail').then(m => ({ default: m.TaskDetail })));
const ProjectsPage = lazy(() => import('../pages/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('../pages/projects/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const LabelsPage = lazy(() => import('../pages/labels/LabelsPage').then(m => ({ default: m.LabelsPage })));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));
const RemindersPage = lazy(() => import('../pages/reminders/RemindersPage').then(m => ({ default: m.RemindersPage })));
const SubtasksPage = lazy(() => import('../pages/subtasks/SubtasksPage').then(m => ({ default: m.SubtasksPage })));
const AttachmentsPage = lazy(() => import('../pages/attachments/AttachmentsPage').then(m => ({ default: m.AttachmentsPage })));
const AnalyticsPage = lazy(() => import('../pages/analytics/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const ActivityPage = lazy(() => import('../pages/activity/ActivityPage').then(m => ({ default: m.ActivityPage })));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    }>
      {children}
    </Suspense>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Landing */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PageWrapper><PublicRoute><LoginPage /></PublicRoute></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><PublicRoute><RegisterPage /></PublicRoute></PageWrapper>} />
        <Route path="/forgot-password" element={<PageWrapper><PublicRoute><ForgotPasswordPage /></PublicRoute></PageWrapper>} />
        <Route path="/reset-password" element={<PageWrapper><PublicRoute><ResetPasswordPage /></PublicRoute></PageWrapper>} />
        <Route path="/verify-email" element={<PageWrapper><PublicRoute><VerifyEmailPage /></PublicRoute></PageWrapper>} />
      </Route>

      {/* Dashboard - All authenticated users */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
        <Route path="/tasks" element={<PageWrapper><TasksPage /></PageWrapper>} />
        <Route path="/tasks/:id" element={<PageWrapper><TaskDetailPage /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/projects/:id" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
        <Route path="/labels" element={<PageWrapper><LabelsPage /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
      </Route>

      {/* Admin-only routes */}
      <Route element={<AdminRoute><DashboardLayout /></AdminRoute>}>
        <Route path="/analytics" element={<PageWrapper><AnalyticsPage /></PageWrapper>} />
        <Route path="/reminders" element={<PageWrapper><RemindersPage /></PageWrapper>} />
        <Route path="/subtasks" element={<PageWrapper><SubtasksPage /></PageWrapper>} />
        <Route path="/attachments" element={<PageWrapper><AttachmentsPage /></PageWrapper>} />
        <Route path="/activity" element={<PageWrapper><ActivityPage /></PageWrapper>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
