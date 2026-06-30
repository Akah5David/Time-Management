import type { Task, Project, Label, Subtask, Reminder, Attachment, Comment, Activity, User, DashboardStats, AnalyticsData, PaginatedResponse } from '../../types';

const STORAGE_KEYS = {
  tasks: 'mock_tasks',
  projects: 'mock_projects',
  labels: 'mock_labels',
  activities: 'mock_activities',
  users: 'mock_users',
};

function getItem<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
}

function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function initMockData() {
  if (localStorage.getItem(STORAGE_KEYS.tasks)) return;

  const now = new Date().toISOString();
  const tomorrow = new Date(Date.now() + 86400000).toISOString();
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString();

  const labels: Label[] = [
    { id: 'l1', name: 'Bug', color: '#ef4444', userId: '1' },
    { id: 'l2', name: 'Feature', color: '#22c55e', userId: '1' },
    { id: 'l3', name: 'Design', color: '#a855f7', userId: '1' },
    { id: 'l4', name: 'Urgent', color: '#f97316', userId: '1' },
  ];

  const projects: Project[] = [
    { id: 'p1', name: 'Platform v2', description: 'Major platform upgrade', color: '#3b82f6', status: 'Active', startDate: now, dueDate: nextWeek, userId: '1', taskCount: 3, completedTaskCount: 1, createdAt: now, updatedAt: now },
    { id: 'p2', name: 'Marketing Campaign', description: 'Q3 marketing push', color: '#22c55e', status: 'Active', startDate: now, dueDate: nextWeek, userId: '1', taskCount: 2, completedTaskCount: 0, createdAt: now, updatedAt: now },
    { id: 'p3', name: 'Mobile App', description: 'iOS and Android app', color: '#a855f7', status: 'Not Started', startDate: now, dueDate: nextWeek, userId: '1', taskCount: 0, completedTaskCount: 0, createdAt: now, updatedAt: now },
  ];

  const tasks: Task[] = [
    {
      id: 't1', title: 'Review Q3 marketing strategy', description: 'Analyze current marketing performance and plan Q3 initiatives', dueDate: tomorrow, priority: 'High', status: 'In Progress', userId: '1', projectId: 'p1', labels: [labels[3]],
      subtasks: [
        { id: 'st1', title: 'Gather performance data', completed: true, taskId: 't1' },
        { id: 'st2', title: 'Draft strategy document', completed: false, taskId: 't1' },
        { id: 'st3', title: 'Schedule review meeting', completed: false, taskId: 't1' },
      ],
      reminders: [], attachments: [], comments: [], published: true, createdAt: now, updatedAt: now,
    },
    {
      id: 't2', title: 'Update user authentication flow', description: 'Implement OAuth2 and refresh token support', dueDate: tomorrow, priority: 'Urgent', status: 'Pending', userId: '1', projectId: 'p1', labels: [labels[0]],
      subtasks: [], reminders: [], attachments: [], comments: [], published: true, createdAt: now, updatedAt: now,
    },
    {
      id: 't3', title: 'Prepare sprint retrospective slides', description: 'Create presentation for team retrospective', dueDate: tomorrow, priority: 'Medium', status: 'Pending', userId: '1', projectId: 'p2', labels: [labels[2]],
      subtasks: [], reminders: [], attachments: [], comments: [], published: true, createdAt: now, updatedAt: now,
    },
    {
      id: 't4', title: 'Client meeting preparation', description: 'Prepare demo and talking points', dueDate: nextWeek, priority: 'Low', status: 'Completed', completedAt: now, userId: '1', projectId: 'p2', labels: [],
      subtasks: [], reminders: [], attachments: [], comments: [], published: true, createdAt: now, updatedAt: now,
    },
    {
      id: 't5', title: 'Design system documentation', description: 'Document all design tokens and components', dueDate: nextWeek, priority: 'Medium', status: 'Pending', userId: '1', labels: [labels[2]],
      subtasks: [], reminders: [], attachments: [], comments: [], published: false, createdAt: now, updatedAt: now,
    },
  ];

  const activities: Activity[] = [
    { id: 'a1', action: 'created', entityType: 'task', entityId: 't1', entityTitle: 'Review Q3 marketing strategy', userId: '1', userName: 'demo_user', createdAt: now },
    { id: 'a2', action: 'updated', entityType: 'task', entityId: 't1', entityTitle: 'Review Q3 marketing strategy', userId: '1', userName: 'demo_user', createdAt: now },
    { id: 'a3', action: 'created', entityType: 'project', entityId: 'p1', entityTitle: 'Platform v2', userId: '1', userName: 'demo_user', createdAt: now },
    { id: 'a4', action: 'completed', entityType: 'task', entityId: 't4', entityTitle: 'Client meeting preparation', userId: '1', userName: 'demo_user', createdAt: now },
  ];

  setItem(STORAGE_KEYS.tasks, tasks);
  setItem(STORAGE_KEYS.projects, projects);
  setItem(STORAGE_KEYS.labels, labels);
  setItem(STORAGE_KEYS.activities, activities);
}

initMockData();

function paginate<T>(items: T[], page: number, pageSize: number): PaginatedResponse<T> {
  const total = items.length;
  const pageCount = Math.ceil(total / pageSize) || 1;
  const start = (page - 1) * pageSize;
  const data = items.slice(start, start + pageSize);
  return { data, meta: { pagination: { page, pageSize, pageCount, total } } };
}

function logActivity(action: string, entityType: Activity['entityType'], entity: { id: string; title?: string; name?: string }) {
  const activities = getItem<Activity[]>(STORAGE_KEYS.activities, []);
  activities.unshift({
    id: generateId(),
    action,
    entityType,
    entityId: entity.id,
    entityTitle: entity.title || entity.name || '',
    userId: '1',
    userName: 'demo_user',
    createdAt: new Date().toISOString(),
  });
  setItem(STORAGE_KEYS.activities, activities.slice(0, 100));
}

export const mockAuthApi = {
  login: async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 500));
    const user: User = { id: '1', username: 'demo_user', email, avatar: undefined, role: 'user', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return { data: { user, jwt: 'mock-jwt-token' } };
  },
  register: async (username: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 500));
    const user: User = { id: '1', username, email, avatar: undefined, role: 'user', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return { data: { user, jwt: 'mock-jwt-token' } };
  },
  me: async () => {
    const user: User = { id: '1', username: 'demo_user', email: 'demo@example.com', avatar: undefined, role: 'user', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    return { data: user };
  },
};

export const mockTaskApi = {
  getAll: async (params?: Record<string, unknown>) => {
    await new Promise(r => setTimeout(r, 300));
    let tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const page = Number(params?.page) || 1;
    const pageSize = Number(params?.pageSize) || 20;

    if (params?.search) {
      const q = String(params.search).toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q));
    }
    if (params?.status) {
      const statuses = Array.isArray(params.status) ? params.status : [params.status];
      tasks = tasks.filter(t => statuses.includes(t.status));
    }
    if (params?.priority) {
      const priorities = Array.isArray(params.priority) ? params.priority : [params.priority];
      tasks = tasks.filter(t => priorities.includes(t.priority));
    }

    return { data: paginate(tasks, page, pageSize) };
  },
  getById: async (id: string) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === id);
    return { data: task };
  },
  create: async (data: Partial<Task>) => {
    await new Promise(r => setTimeout(r, 300));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task: Task = {
      id: generateId(),
      title: data.title || 'Untitled',
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority || 'Medium',
      status: data.status || 'Pending',
      userId: '1',
      projectId: data.projectId,
      labels: data.labels || [],
      subtasks: data.subtasks || [],
      reminders: data.reminders || [],
      attachments: data.attachments || [],
      comments: [],
      published: data.published ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(task);
    setItem(STORAGE_KEYS.tasks, tasks);
    logActivity('created', 'task', task);
    return { data: task };
  },
  update: async (id: string, data: Partial<Task>) => {
    await new Promise(r => setTimeout(r, 300));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    tasks[index] = { ...tasks[index], ...data, updatedAt: new Date().toISOString() };
    setItem(STORAGE_KEYS.tasks, tasks);
    logActivity('updated', 'task', tasks[index]);
    return { data: tasks[index] };
  },
  delete: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === id);
    const filtered = tasks.filter(t => t.id !== id);
    setItem(STORAGE_KEYS.tasks, filtered);
    if (task) logActivity('deleted', 'task', task);
    return { data: null };
  },
  bulkUpdate: async (ids: string[], data: Partial<Task>) => {
    await new Promise(r => setTimeout(r, 300));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    tasks.forEach(t => {
      if (ids.includes(t.id)) Object.assign(t, data, { updatedAt: new Date().toISOString() });
    });
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: null };
  },
  bulkDelete: async (ids: string[]) => {
    await new Promise(r => setTimeout(r, 300));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const filtered = tasks.filter(t => !ids.includes(t.id));
    setItem(STORAGE_KEYS.tasks, filtered);
    return { data: null };
  },
};

export const mockProjectApi = {
  getAll: async (params?: Record<string, unknown>) => {
    await new Promise(r => setTimeout(r, 300));
    const projects = getItem<Project[]>(STORAGE_KEYS.projects, []);
    const page = Number(params?.page) || 1;
    const pageSize = Number(params?.pageSize) || 20;
    return { data: paginate(projects, page, pageSize) };
  },
  getById: async (id: string) => {
    await new Promise(r => setTimeout(r, 200));
    const projects = getItem<Project[]>(STORAGE_KEYS.projects, []);
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const project = projects.find(p => p.id === id);
    if (project) {
      project.tasks = tasks.filter(t => t.projectId === id);
      project.taskCount = project.tasks.length;
      project.completedTaskCount = project.tasks.filter(t => t.status === 'Completed').length;
    }
    return { data: project };
  },
  create: async (data: Partial<Project>) => {
    await new Promise(r => setTimeout(r, 300));
    const projects = getItem<Project[]>(STORAGE_KEYS.projects, []);
    const project: Project = {
      id: generateId(),
      name: data.name || 'Untitled',
      description: data.description,
      color: data.color || '#3b82f6',
      status: data.status || 'Not Started',
      startDate: data.startDate,
      dueDate: data.dueDate,
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.push(project);
    setItem(STORAGE_KEYS.projects, projects);
    logActivity('created', 'project', project);
    return { data: project };
  },
  update: async (id: string, data: Partial<Project>) => {
    await new Promise(r => setTimeout(r, 300));
    const projects = getItem<Project[]>(STORAGE_KEYS.projects, []);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    projects[index] = { ...projects[index], ...data, updatedAt: new Date().toISOString() };
    setItem(STORAGE_KEYS.projects, projects);
    logActivity('updated', 'project', projects[index]);
    return { data: projects[index] };
  },
  delete: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    const projects = getItem<Project[]>(STORAGE_KEYS.projects, []);
    const project = projects.find(p => p.id === id);
    const filtered = projects.filter(p => p.id !== id);
    setItem(STORAGE_KEYS.projects, filtered);
    if (project) logActivity('deleted', 'project', project);
    return { data: null };
  },
};

export const mockLabelApi = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 200));
    return { data: getItem<Label[]>(STORAGE_KEYS.labels, []) };
  },
  create: async (data: Partial<Label>) => {
    await new Promise(r => setTimeout(r, 300));
    const labels = getItem<Label[]>(STORAGE_KEYS.labels, []);
    const label: Label = { id: generateId(), name: data.name || '', color: data.color || '#3b82f6', userId: '1' };
    labels.push(label);
    setItem(STORAGE_KEYS.labels, labels);
    logActivity('created', 'label', label);
    return { data: label };
  },
  update: async (id: string, data: Partial<Label>) => {
    await new Promise(r => setTimeout(r, 300));
    const labels = getItem<Label[]>(STORAGE_KEYS.labels, []);
    const index = labels.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Label not found');
    labels[index] = { ...labels[index], ...data };
    setItem(STORAGE_KEYS.labels, labels);
    return { data: labels[index] };
  },
  delete: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    const labels = getItem<Label[]>(STORAGE_KEYS.labels, []);
    const filtered = labels.filter(l => l.id !== id);
    setItem(STORAGE_KEYS.labels, filtered);
    return { data: null };
  },
};

export const mockSubtaskApi = {
  create: async (data: Partial<Subtask>) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === data.taskId);
    if (!task) throw new Error('Task not found');
    const subtask: Subtask = { id: generateId(), title: data.title || '', completed: false, taskId: data.taskId! };
    task.subtasks = [...(task.subtasks || []), subtask];
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: subtask };
  },
  update: async (id: string, data: Partial<Subtask>) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    tasks.forEach(t => {
      const st = t.subtasks?.find(s => s.id === id);
      if (st) Object.assign(st, data);
    });
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: null };
  },
  delete: async (id: string) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    tasks.forEach(t => {
      t.subtasks = t.subtasks?.filter(s => s.id !== id);
    });
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: null };
  },
};

export const mockReminderApi = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const reminders = tasks.flatMap(t => t.reminders || []);
    return { data: reminders };
  },
  create: async (data: Partial<Reminder>) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === data.taskId);
    if (!task) throw new Error('Task not found');
    const reminder: Reminder = { id: generateId(), remindAt: data.remindAt || new Date().toISOString(), sent: false, message: data.message || '', taskId: data.taskId! };
    task.reminders = [...(task.reminders || []), reminder];
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: reminder };
  },
  update: async (id: string, data: Partial<Reminder>) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    tasks.forEach(t => {
      const r = t.reminders?.find(rm => rm.id === id);
      if (r) Object.assign(r, data);
    });
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: null };
  },
  delete: async (id: string) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    tasks.forEach(t => {
      t.reminders = t.reminders?.filter(r => r.id !== id);
    });
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: null };
  },
};

export const mockAttachmentApi = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    return { data: tasks.flatMap(t => t.attachments || []) };
  },
  upload: async (taskId: string, file: File) => {
    await new Promise(r => setTimeout(r, 500));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    const attachment: Attachment = {
      id: generateId(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
      taskId,
    };
    task.attachments = [...(task.attachments || []), attachment];
    setItem(STORAGE_KEYS.tasks, tasks);
    logActivity('uploaded', 'attachment', { id: attachment.id, title: attachment.name });
    return { data: attachment };
  },
  delete: async (id: string) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    tasks.forEach(t => {
      t.attachments = t.attachments?.filter(a => a.id !== id);
    });
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: null };
  },
};

export const mockCommentApi = {
  getByTask: async (taskId: string) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === taskId);
    return { data: task?.comments || [] };
  },
  create: async (taskId: string, content: string) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');
    const comment: Comment = {
      id: generateId(),
      content,
      author: { id: '1', username: 'demo_user', email: 'demo@example.com', role: 'user', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      taskId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    task.comments = [...(task.comments || []), comment];
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: comment };
  },
  delete: async (taskId: string, commentId: string) => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const task = tasks.find(t => t.id === taskId);
    if (task) task.comments = task.comments?.filter(c => c.id !== commentId);
    setItem(STORAGE_KEYS.tasks, tasks);
    return { data: null };
  },
};

export const mockActivityApi = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 200));
    return { data: getItem<Activity[]>(STORAGE_KEYS.activities, []) };
  },
};

export const mockDashboardApi = {
  getStats: async () => {
    await new Promise(r => setTimeout(r, 200));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const projects = getItem<Project[]>(STORAGE_KEYS.projects, []);
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const weekFromNow = new Date(now.getTime() + 7 * 86400000).toISOString().split('T')[0];

    const stats: DashboardStats = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'Completed').length,
      pendingTasks: tasks.filter(t => t.status === 'Pending' || t.status === 'In Progress').length,
      overdueTasks: tasks.filter(t => t.dueDate && t.dueDate < now.toISOString() && t.status !== 'Completed').length,
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'Active').length,
      tasksDueToday: tasks.filter(t => t.dueDate?.startsWith(today)).length,
      tasksDueThisWeek: tasks.filter(t => t.dueDate && t.dueDate <= weekFromNow && t.dueDate >= now.toISOString()).length,
    };
    return { data: stats };
  },
  getActivity: async () => {
    return mockActivityApi.getAll();
  },
};

export const mockAnalyticsApi = {
  getData: async (): Promise<{ data: AnalyticsData }> => {
    await new Promise(r => setTimeout(r, 300));
    const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
    const projects = getItem<Project[]>(STORAGE_KEYS.projects, []);

    const statusCounts: Record<string, number> = {};
    const priorityCounts: Record<string, number> = {};
    tasks.forEach(t => {
      statusCounts[t.status] = (statusCounts[t.status] || 0) + 1;
      priorityCounts[t.priority] = (priorityCounts[t.priority] || 0) + 1;
    });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const productivityByDay = days.map(day => ({
      day,
      completed: Math.floor(Math.random() * 8),
      created: Math.floor(Math.random() * 5),
    }));

    const data: AnalyticsData = {
      tasksByStatus: Object.entries(statusCounts).map(([status, count]) => ({ status, count })),
      tasksByPriority: Object.entries(priorityCounts).map(([priority, count]) => ({ priority, count })),
      tasksCompletedOverTime: [
        { date: '2024-01-01', count: 5 }, { date: '2024-01-08', count: 8 },
        { date: '2024-01-15', count: 12 }, { date: '2024-01-22', count: 7 },
        { date: '2024-01-29', count: 15 },
      ],
      productivityByDay,
      projectProgress: projects.map(p => ({
        name: p.name,
        total: p.taskCount || 0,
        completed: p.completedTaskCount || 0,
      })),
      weeklyTrend: [
        { week: 'W1', tasks: 12 }, { week: 'W2', tasks: 18 },
        { week: 'W3', tasks: 15 }, { week: 'W4', tasks: 22 },
      ],
    };
    return { data };
  },
};
