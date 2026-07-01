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
      path: "/projects/:id",
      handler: "project.fetchProject",
      config: {
        auth: false,
      },
    },
  ],
};
