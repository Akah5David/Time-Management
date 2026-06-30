import { apiClient } from './client';
import {
  mockAuthApi,
  mockTaskApi,
  mockProjectApi,
  mockLabelApi,
  mockSubtaskApi,
  mockReminderApi,
  mockAttachmentApi,
  mockCommentApi,
  mockDashboardApi,
  mockAnalyticsApi,
} from './mock/mockApi';
import type {
  Task, Project, Label, Subtask, Reminder, Attachment, User,
  TaskFilters, TaskSort, PaginationParams, PaginatedResponse, DashboardStats, AnalyticsData,
} from '../types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || true;

function wrap<T>(promise: Promise<T>): Promise<T> {
  return promise;
}

export const authService = {
  login: (email: string, password: string) =>
    USE_MOCK ? wrap(mockAuthApi.login(email, password)) : apiClient.post('/auth/local', { identifier: email, password }),
  register: (username: string, email: string, password: string) =>
    USE_MOCK ? wrap(mockAuthApi.register(username, email, password)) : apiClient.post('/auth/local/register', { username, email, password }),
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (code: string, password: string, passwordConfirmation: string) =>
    apiClient.post('/auth/reset-password', { code, password, passwordConfirmation }),
  me: () =>
    USE_MOCK ? wrap(mockAuthApi.me()) : apiClient.get('/users/me'),
};

export const taskService = {
  getAll: (params?: Record<string, unknown>) =>
    USE_MOCK ? wrap(mockTaskApi.getAll(params)) : apiClient.get<PaginatedResponse<Task>>('/tasks', { params }),
  getById: (id: string) =>
    USE_MOCK ? wrap(mockTaskApi.getById(id)) : apiClient.get<Task>(`/tasks/${id}`),
  create: (data: Partial<Task>) =>
    USE_MOCK ? wrap(mockTaskApi.create(data)) : apiClient.post<Task>('/tasks', { data }),
  update: (id: string, data: Partial<Task>) =>
    USE_MOCK ? wrap(mockTaskApi.update(id, data)) : apiClient.put<Task>(`/tasks/${id}`, { data }),
  delete: (id: string) =>
    USE_MOCK ? wrap(mockTaskApi.delete(id)) : apiClient.delete(`/tasks/${id}`),
  bulkDelete: (ids: string[]) =>
    USE_MOCK ? wrap(mockTaskApi.bulkDelete(ids)) : apiClient.post('/tasks/bulk-delete', { ids }),
  bulkUpdate: (ids: string[], data: Partial<Task>) =>
    USE_MOCK ? wrap(mockTaskApi.bulkUpdate(ids, data)) : apiClient.post('/tasks/bulk-update', { ids, data }),
};

export const projectService = {
  getAll: (params?: Record<string, unknown>) =>
    USE_MOCK ? wrap(mockProjectApi.getAll(params)) : apiClient.get<PaginatedResponse<Project>>('/projects', { params }),
  getById: (id: string) =>
    USE_MOCK ? wrap(mockProjectApi.getById(id)) : apiClient.get<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) =>
    USE_MOCK ? wrap(mockProjectApi.create(data)) : apiClient.post<Project>('/projects', { data }),
  update: (id: string, data: Partial<Project>) =>
    USE_MOCK ? wrap(mockProjectApi.update(id, data)) : apiClient.put<Project>(`/projects/${id}`, { data }),
  delete: (id: string) =>
    USE_MOCK ? wrap(mockProjectApi.delete(id)) : apiClient.delete(`/projects/${id}`),
};

export const labelService = {
  getAll: () =>
    USE_MOCK ? wrap(mockLabelApi.getAll()) : apiClient.get<Label[]>('/labels'),
  create: (data: Partial<Label>) =>
    USE_MOCK ? wrap(mockLabelApi.create(data)) : apiClient.post<Label>('/labels', { data }),
  update: (id: string, data: Partial<Label>) =>
    USE_MOCK ? wrap(mockLabelApi.update(id, data)) : apiClient.put<Label>(`/labels/${id}`, { data }),
  delete: (id: string) =>
    USE_MOCK ? wrap(mockLabelApi.delete(id)) : apiClient.delete(`/labels/${id}`),
};

export const subtaskService = {
  create: (data: Partial<Subtask>) =>
    USE_MOCK ? wrap(mockSubtaskApi.create(data)) : apiClient.post<Subtask>('/subtasks', { data }),
  update: (id: string, data: Partial<Subtask>) =>
    USE_MOCK ? wrap(mockSubtaskApi.update(id, data)) : apiClient.put<Subtask>(`/subtasks/${id}`, { data }),
  delete: (id: string) =>
    USE_MOCK ? wrap(mockSubtaskApi.delete(id)) : apiClient.delete(`/subtasks/${id}`),
};

export const reminderService = {
  getAll: () =>
    USE_MOCK ? wrap(mockReminderApi.getAll()) : apiClient.get<Reminder[]>('/reminders'),
  create: (data: Partial<Reminder>) =>
    USE_MOCK ? wrap(mockReminderApi.create(data)) : apiClient.post<Reminder>('/reminders', { data }),
  update: (id: string, data: Partial<Reminder>) =>
    USE_MOCK ? wrap(mockReminderApi.update(id, data)) : apiClient.put<Reminder>(`/reminders/${id}`, { data }),
  delete: (id: string) =>
    USE_MOCK ? wrap(mockReminderApi.delete(id)) : apiClient.delete(`/reminders/${id}`),
};

export const attachmentService = {
  getAll: () =>
    USE_MOCK ? wrap(mockAttachmentApi.getAll()) : apiClient.get<Attachment[]>('/attachments'),
  upload: (taskId: string, file: File) =>
    USE_MOCK ? wrap(mockAttachmentApi.upload(taskId, file)) : (() => {
      const formData = new FormData();
      formData.append('files', file);
      formData.append('ref', 'api::task.task');
      formData.append('refId', taskId);
      formData.append('field', 'attachments');
      return apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    })(),
  delete: (id: string) =>
    USE_MOCK ? wrap(mockAttachmentApi.delete(id)) : apiClient.delete(`/upload/files/${id}`),
};

export const commentService = {
  getByTask: (taskId: string) =>
    USE_MOCK ? wrap(mockCommentApi.getByTask(taskId)) : apiClient.get(`/tasks/${taskId}/comments`),
  create: (taskId: string, content: string) =>
    USE_MOCK ? wrap(mockCommentApi.create(taskId, content)) : apiClient.post(`/tasks/${taskId}/comments`, { content }),
  delete: (taskId: string, commentId: string) =>
    USE_MOCK ? wrap(mockCommentApi.delete(taskId, commentId)) : apiClient.delete(`/tasks/${taskId}/comments/${commentId}`),
};

export const userService = {
  update: (id: string, data: Partial<User>) =>
    apiClient.put<User>(`/users/${id}`, data),
  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.post('/auth/change-password', { currentPassword, password: newPassword }),
  deleteAccount: () =>
    apiClient.delete('/users/me'),
};

export const dashboardService = {
  getStats: () =>
    USE_MOCK ? wrap(mockDashboardApi.getStats()) : apiClient.get<DashboardStats>('/dashboard/stats'),
  getActivity: () =>
    USE_MOCK ? wrap(mockDashboardApi.getActivity()) : apiClient.get('/dashboard/activity'),
};

export const analyticsService = {
  getData: () =>
    USE_MOCK ? wrap(mockAnalyticsApi.getData()) : apiClient.get<AnalyticsData>('/analytics'),
};
