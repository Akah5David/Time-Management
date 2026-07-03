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
      path: "/attachments/:documentId",
      handler: "attachment.fetchAttachment",
      config: {
        auth: false,
        policies: [],
        middleware: [],
      },
    },
    {
      method: "PUT",
      path: "/attachments/:documentId",
      handler: "attachment.updateAttachment",
      config: {
        auth: false,
        policies: [],
        middleware: [],
      },
    },
    {
      method: "DELETE",
      path: "/attachments/:documentId",
      handler: "attachment.deleteAttachment",
      config: {
        auth: false,
        policies: [],
        middleware: [],
      },
    },
    {
      method: "DELETE",
      path: "/attachments",
      handler: "attachment.deleteAllAttachments",
      config: {
        auth: false,
        policies: [],
        middleware: [],
      },
    },
  ],
};
