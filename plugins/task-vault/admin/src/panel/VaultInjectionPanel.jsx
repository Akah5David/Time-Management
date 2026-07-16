import VaultSidePanel from '../components/VaultSidePanel';

const vaultSideInjectionPanel = ({ document, documentId }) => {
  console.log(document);
  console.log(documentId);

  return {
    name: 'task vault',
    Component: <VaultSidePanel />,
  };
};

export default vaultSideInjectionPanel;
