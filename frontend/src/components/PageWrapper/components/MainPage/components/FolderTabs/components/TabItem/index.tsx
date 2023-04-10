import React, { useMemo } from "react";

interface TabItemProps {
  title: string;
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

const TabItem: React.FC<TabItemProps> = ({
  title,
  activeTab,
  handleTabChange,
}) => {
  const tabClass = useMemo(() => {
    return `email-folders-item ${title} ${activeTab === title ? "active" : ""}`;
  }, [title, activeTab]);

  return (
    <div
      data-testid={title}
      className={tabClass}
      onClick={() => handleTabChange(title)}
    >
      <span className="email-folders-item-text">{title}</span>
    </div>
  );
};

export default TabItem;
