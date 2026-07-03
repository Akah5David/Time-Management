module.exports = {
  routes: [
    {
      method: "POST",
      path: "/tasks/create",
      handler: "task.createTask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/tasks",
      handler: "task.fetchTasks",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/tasks/:documentId",
      handler: "task.fetchTask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/tasks/:documentId",
      handler: "task.updateTask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/tasks/:documentId",
      handler: "task.deleteTask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/tasks",
      handler: "task.deleteAllTasks",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
