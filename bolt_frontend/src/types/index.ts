export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' | 'Archived';
export type ProjectStatus = 'Not Started' | 'Active' | 'Completed' | 'On Hold';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  userId: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  taskId: string;
}

export interface Reminder {
  id: string;
  remindAt: string;
  sent: boolean;
  message: string;
  taskId: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  taskId: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  taskId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  action: string;
  entityType: 'task' | 'project' | 'label' | 'reminder' | 'subtask' | 'attachment';
  entityId: string;
  entityTitle: string;
  userId: string;
  userName: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  startDate?: string;
  dueDate?: string;
  status: ProjectStatus;
  userId: string;
  tasks?: Task[];
  taskCount?: number;
  completedTaskCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  status: TaskStatus;
  completedAt?: string;
  estimatedTime?: number;
  reminderDate?: string;
  userId: string;
  projectId?: string;
  project?: Project;
  labels?: Label[];
  subtasks?: Subtask[];
  reminders?: Reminder[];
  attachments?: Attachment[];
  comments?: Comment[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  status?: TaskStatus[];
  priority?: Priority[];
  label?: string[];
  project?: string[];
  dueDate?: string;
  completed?: boolean;
  archived?: boolean;
  search?: string;
}

export interface TaskSort {
  field: 'dueDate' | 'createdAt' | 'updatedAt' | 'priority' | 'title';
  direction: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  totalProjects: number;
  activeProjects: number;
  tasksDueToday: number;
  tasksDueThisWeek: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: 'task' | 'project' | 'reminder' | 'system';
  createdAt: string;
}

export interface AnalyticsData {
  tasksByStatus: { status: string; count: number }[];
  tasksByPriority: { priority: string; count: number }[];
  tasksCompletedOverTime: { date: string; count: number }[];
  productivityByDay: { day: string; completed: number; created: number }[];
  projectProgress: { name: string; total: number; completed: number }[];
  weeklyTrend: { week: string; tasks: number }[];
}
