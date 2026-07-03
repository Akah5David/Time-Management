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
      path: "/subtasks/:documentId",
      handler: "subtask.fetchSubTask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/subtasks/:documentId",
      handler: "subtask.updateSubtask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/subtasks/:documentId",
      handler: "subtask.deleteSubtask",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/subtasks",
      handler: "subtask.deleteAllSubtasks",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
