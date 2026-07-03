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
      path: "/labels/:documentId",
      handler: "label.fetchLabel",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "PUT",
      path: "/labels/:documentId",
      handler: "label.updateLabel",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/labels/:documentId",
      handler: "label.deleteLabel",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/labels/delete",
      handler: "label.deleteAllLabels",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
