import React from 'react';

import TabItem from './components/TabItem';

import './styles.css';

interface FolderTabsProps {
  activeTab: string;
  setComposeEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: (tab: string) => void;
}

const FolderTabs: React.FC<FolderTabsProps> = ({
  activeTab,
  setComposeEmail,
  setActiveTab,
}) => {
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="main-page-container-menu">
      <div className="email-compose">
        <button
          onClick={() => setComposeEmail(true)}
          className="email-compose-button"
        >
          <span className="email-compose-button-text">Compose</span>
        </button>
      </div>

      <div className="email-folders">
        <TabItem
          title="inbox"
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <TabItem
          title="sent"
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <TabItem
          title="trash"
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default FolderTabs;
