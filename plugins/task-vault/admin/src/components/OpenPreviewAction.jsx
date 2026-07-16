import { Eye } from '@strapi/icons';

const OpenPreviewAction = ({ document, collectionType, activeTab, documentId, meta, model}) => ({
  label: 'Open preview',
  icon: <Eye />,
  onClick: () => {
    console.log(document);
    console.log(collectionType)
    console.log(activeTab)
    console.log(documentId)
    console.log(meta)
    console.log(model)
  },
});

export default OpenPreviewAction;