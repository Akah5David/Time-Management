module.exports = {
  routes: [
    {
      method: "POST",
      path: "/labels/actions/create",
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
      path: "/labels/actions/update/:documentId",
      handler: "label.updateLabel",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/labels/actions/delete/:documentId",
      handler: "label.deleteLabel",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "DELETE",
      path: "/labels/actions/delete-all",
      handler: "label.deleteAllLabels",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
