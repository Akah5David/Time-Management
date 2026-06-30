import type { Task, Project, Label, DashboardStats } from '../../types';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:1337/graphql';

async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const token = localStorage.getItem('token');
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

export const graphqlQueries = {
  getTasks: async (filters?: Record<string, unknown>) => {
    const query = `
      query GetTasks($filters: TaskFiltersInput) {
        tasks(filters: $filters) {
          data {
            id
            attributes {
              title
              description
              dueDate
              priority
              status
              completedAt
              estimatedTime
              published
              createdAt
              updatedAt
              project { data { id attributes { name color } } }
              labels { data { id attributes { name color } } }
              subtasks { data { id attributes { title completed } } }
              reminders { data { id attributes { remindAt sent message } } }
              attachments { data { id attributes { name url type size } } }
              comments { data { id attributes { content createdAt author { data { id attributes { username } } } } } }
            }
          }
          meta { pagination { page pageSize pageCount total } }
        }
      }
    `;
    const result = await graphqlRequest<{ tasks: { data: unknown[]; meta: { pagination: unknown } } }>(query, { filters });
    return result.tasks;
  },

  getTaskById: async (id: string) => {
    const query = `
      query GetTask($id: ID!) {
        task(id: $id) {
          data {
            id
            attributes {
              title
              description
              dueDate
              priority
              status
              completedAt
              estimatedTime
              published
              createdAt
              updatedAt
              project { data { id attributes { name color } } }
              labels { data { id attributes { name color } } }
              subtasks { data { id attributes { title completed } } }
              reminders { data { id attributes { remindAt sent message } } }
              attachments { data { id attributes { name url type size } } }
              comments { data { id attributes { content createdAt author { data { id attributes { username } } } } } }
            }
          }
        }
      }
    `;
    const result = await graphqlRequest<{ task: { data: unknown } }>(query, { id });
    return result.task;
  },

  getProjects: async () => {
    const query = `
      query GetProjects {
        projects {
          data {
            id
            attributes {
              name
              description
              color
              startDate
              dueDate
              status
              createdAt
              updatedAt
              tasks { data { id attributes { status } } }
            }
          }
          meta { pagination { page pageSize pageCount total } }
        }
      }
    `;
    const result = await graphqlRequest<{ projects: { data: unknown[]; meta: { pagination: unknown } } }>(query);
    return result.projects;
  },

  getProjectById: async (id: string) => {
    const query = `
      query GetProject($id: ID!) {
        project(id: $id) {
          data {
            id
            attributes {
              name
              description
              color
              startDate
              dueDate
              status
              createdAt
              updatedAt
              tasks { data { id attributes { title status priority dueDate } } }
            }
          }
        }
      }
    `;
    const result = await graphqlRequest<{ project: { data: unknown } }>(query, { id });
    return result.project;
  },

  getLabels: async () => {
    const query = `
      query GetLabels {
        labels {
          data { id attributes { name color } }
        }
      }
    `;
    const result = await graphqlRequest<{ labels: { data: unknown[] } }>(query);
    return result.labels;
  },

  getDashboardStats: async () => {
    const query = `
      query GetDashboardStats {
        tasks {
          meta { pagination { total } }
        }
        completedTasks: tasks(filters: { status: { eq: "Completed" } }) {
          meta { pagination { total } }
        }
        pendingTasks: tasks(filters: { status: { eq: "Pending" } }) {
          meta { pagination { total } }
        }
        inProgressTasks: tasks(filters: { status: { eq: "In Progress" } }) {
          meta { pagination { total } }
        }
        projects {
          meta { pagination { total } }
        }
      }
    `;
    const result = await graphqlRequest<{
      tasks: { meta: { pagination: { total: number } } };
      completedTasks: { meta: { pagination: { total: number } } };
      pendingTasks: { meta: { pagination: { total: number } } };
      inProgressTasks: { meta: { pagination: { total: number } } };
      projects: { meta: { pagination: { total: number } } };
    }>(query);
    return result;
  },
};

export const graphqlMutations = {
  createTask: async (data: Partial<Task>) => {
    const query = `
      mutation CreateTask($data: TaskInput!) {
        createTask(data: $data) {
          data { id attributes { title status priority createdAt } }
        }
      }
    `;
    return graphqlRequest<{ createTask: { data: unknown } }>(query, { data });
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    const query = `
      mutation UpdateTask($id: ID!, $data: TaskInput!) {
        updateTask(id: $id, data: $data) {
          data { id attributes { title status priority updatedAt } }
        }
      }
    `;
    return graphqlRequest<{ updateTask: { data: unknown } }>(query, { id, data });
  },

  deleteTask: async (id: string) => {
    const query = `
      mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
          data { id }
        }
      }
    `;
    return graphqlRequest<{ deleteTask: { data: unknown } }>(query, { id });
  },

  createProject: async (data: Partial<Project>) => {
    const query = `
      mutation CreateProject($data: ProjectInput!) {
        createProject(data: $data) {
          data { id attributes { name color status createdAt } }
        }
      }
    `;
    return graphqlRequest<{ createProject: { data: unknown } }>(query, { data });
  },

  updateProject: async (id: string, data: Partial<Project>) => {
    const query = `
      mutation UpdateProject($id: ID!, $data: ProjectInput!) {
        updateProject(id: $id, data: $data) {
          data { id attributes { name color status updatedAt } }
        }
      }
    `;
    return graphqlRequest<{ updateProject: { data: unknown } }>(query, { id, data });
  },

  deleteProject: async (id: string) => {
    const query = `
      mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
          data { id }
        }
      }
    `;
    return graphqlRequest<{ deleteProject: { data: unknown } }>(query, { id });
  },

  createLabel: async (data: Partial<Label>) => {
    const query = `
      mutation CreateLabel($data: LabelInput!) {
        createLabel(data: $data) {
          data { id attributes { name color } }
        }
      }
    `;
    return graphqlRequest<{ createLabel: { data: unknown } }>(query, { data });
  },

  updateLabel: async (id: string, data: Partial<Label>) => {
    const query = `
      mutation UpdateLabel($id: ID!, $data: LabelInput!) {
        updateLabel(id: $id, data: $data) {
          data { id attributes { name color } }
        }
      }
    `;
    return graphqlRequest<{ updateLabel: { data: unknown } }>(query, { id, data });
  },

  deleteLabel: async (id: string) => {
    const query = `
      mutation DeleteLabel($id: ID!) {
        deleteLabel(id: $id) {
          data { id }
        }
      }
    `;
    return graphqlRequest<{ deleteLabel: { data: unknown } }>(query, { id });
  },
};
