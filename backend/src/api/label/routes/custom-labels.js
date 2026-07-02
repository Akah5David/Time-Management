exports.default = {
  routes: [
    {
      method: "POST",
      path: "/labels/create",
      handler: "label.createLabel",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/labels",
      handler: "label.fetchLabels",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/labels/:id",
      handler: "label.fetchLabel",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
