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
      path: "/tasks/:id",
      handler: "task.fetchTask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
