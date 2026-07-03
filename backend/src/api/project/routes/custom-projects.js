module.exports = {
  routes: [
    {
      method: "POST",
      path: "/projects/create",
      handler: "project.createNewProject",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/projects",
      handler: "project.fetchProjects", //controller_filename.action
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/projects/:documentId",
      handler: "project.fetchProject",
      config: {
        auth: false,
      },
    },
    {
      method: "PUT",
      path: "/projects/:documentId",
      handler: "project.updateProject",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/projects/:documentId",
      handler: "project.deleteProject",
      config: {
        auth: false,
      },
    },
    {
      method: "DELETE",
      path: "/projects",
      handler: "project.deleteAllProjects",
      config: {
        auth: false,
      },
    },
  ],
};
