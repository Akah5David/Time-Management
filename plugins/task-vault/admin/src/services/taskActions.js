function runCustomAction(documentId) {
  console.log(documentId);
}

function openPreview(document) {
  console.log(document);
}

function bulkPublish(documentIds) {
  console.log(documentIds);
}

export const taskActions = {
  runCustomAction,
  openPreview,
  bulkPublish,
};


