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
  ],
};