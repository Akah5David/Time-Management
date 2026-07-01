module.exports = {
  routes: [
    {
      method: "POST",
      path: "/subtasks/create",
      handler: "subtask.createSubtask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/subtasks",
      handler: "subtask.fetchSubTasks",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/subtasks/:id",
      handler: "subtask.fetchSubTask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
