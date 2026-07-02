exports.default = {
  routes: [
    {
      method: "POST",
      path: "/attachments/create",
      handler: "attachment.createAttachment",
      config: {
        auth: false,
        policies: [],
        middleware: [],
      },
    },
    {
      method: "GET",
      path: "/attachments",
      handler: "attachment.fetchAttachments",
      config: {
        auth: false,
        policies: [],
        middleware: [],
      },
    },
    {
      method: "GET",
      path: "/attachments/:id",
      handler: "attachment.fetchAttachment",
      config: {
        auth: false,
        policies: [],
        middleware: [],
      },
    },
  ],
};
