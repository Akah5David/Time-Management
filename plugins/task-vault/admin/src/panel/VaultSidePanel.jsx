import VaultSidePanel from '../components/VaultSidePanel';

const vaultSidePanel = ({ document, documentId, activeTab }) => {
    return {
    title: 'task vault',
    content: <VaultSidePanel />,
  };
};

export default vaultSidePanel;
