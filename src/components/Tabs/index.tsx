import React, { useState } from "react";
import "./style.scss";

interface Tab {
  id: string | number;
  label: string;
  tooltip?: string;
  icon?: React.ReactNode;

  /**
   * @example
  * tabs={[
  *   { id: 1, label: "Tüm Ürünler", icon: <HomeIcon /> },
  *   { id: 2, label: "Önerilen" },
  *   { id: 3, label: "Popüler" },
  ]}
   */
}

interface TabsProps {
  tabs: Tab[];
  activeTabId?: string | number;
  onTabChange?: (tabId: string | number) => void;
  className?: string;
  variant?: "transparent";
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId: initialActiveTabId,
  onTabChange,
  className,
  variant,
}) => {
  const [activeTabId, setActiveTabId] = useState(
    initialActiveTabId || tabs[0]?.id
  );
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);
  const indicatorLeft = (activeIndex / tabs.length) * 100;

  const handleTabClick = (tabId: string | number) => {
    setActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className={`sorting-box ${className || ""} ${variant ? variant : ""}`}>
      <ul className="sorting-box-list">
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={tab.id === activeTabId ? "active" : ""}
            data-tooltip={tab.tooltip}
            data-index={index}
            onClick={() => handleTabClick(tab.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleTabClick(tab.id);
              }
            }}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            {tab.label}
          </li>
        ))}
      </ul>
      <div
        className={`indicator count_${tabs.length}`}
        style={{ left: `${indicatorLeft}%` }}
      />
    </div>
  );
};

export default Tabs;
