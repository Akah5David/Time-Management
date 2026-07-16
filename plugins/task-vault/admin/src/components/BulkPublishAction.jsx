const BulkPublishAction = ({ documents }) => ({
    label: "Bulk publish",
    onClick: () => {
        console.log(documents);
    },
});

export default BulkPublishAction;