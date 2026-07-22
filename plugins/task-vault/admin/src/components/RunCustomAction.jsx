const RunCustomAction = ({ documentId }) => ({
  label: 'Run custom action',
  onClick: () => {
    console.log(documentId);
  },
});

export default RunCustomAction;
