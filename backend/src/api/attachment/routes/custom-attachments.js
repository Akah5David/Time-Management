module.exports = {
  routes: [
    {
      method: "POST",
      path: "/attachments/create",
      handler: "attachment.createAttachment",
    },
    {
      method: "GET",
      path: "/attachments",
      handler: "attachment.fetchAttachments",
    },
    {
      method: "GET",
      path: "/attachments/:documentId",
      handler: "attachment.fetchAttachment",
    },
    {
      method: "PUT",
      path: "/attachments/actions/update/:documentId",
      handler: "attachment.updateAttachment",
    },
    {
      method: "DELETE",
      path: "/attachments/actions/delete/:documentId",
      handler: "attachment.deleteAttachment",
    },
    {
      method: "DELETE",
      path: "/attachments/actions/delete-all",
      handler: "attachment.deleteAllAttachments",
    },
  ],
};