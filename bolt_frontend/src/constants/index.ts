export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api';

export const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'] as const;
export const TASK_STATUSES = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Archived'] as const;
export const PROJECT_STATUSES = ['Not Started', 'Active', 'Completed', 'On Hold'] as const;

export const PRIORITY_COLORS: Record<string, string> = {
  Low: 'bg-priority-low/10 text-priority-low border-priority-low/20',
  Medium: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20',
  High: 'bg-priority-high/10 text-priority-high border-priority-high/20',
  Urgent: 'bg-priority-urgent/10 text-priority-urgent border-priority-urgent/20',
};

export const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-status-pending/10 text-status-pending border-status-pending/20',
  'In Progress': 'bg-status-inprogress/10 text-status-inprogress border-status-inprogress/20',
  Completed: 'bg-status-completed/10 text-status-completed border-status-completed/20',
  Cancelled: 'bg-status-cancelled/10 text-status-cancelled border-status-cancelled/20',
  Archived: 'bg-status-archived/10 text-status-archived border-status-archived/20',
};

export const PROJECT_STATUS_COLORS: Record<string, string> = {
  'Not Started': 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400',
  Active: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
  Completed: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400',
  'On Hold': 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400',
};

export const DEFAULT_PAGE_SIZE = 20;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  TASK_DETAIL: '/tasks/:id',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/:id',
  LABELS: '/labels',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;
