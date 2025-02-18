import { useState, ReactNode } from 'react';

interface ITabs {
    tabs: string[];
    tabsComponents: ReactNode[];
}

const Tabs = ({ tabs, tabsComponents}: ITabs ) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
  
    return (
      <div className="w-full">
        {/* Tabs Header */}
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 w-1/3 text-center cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-blog-up-green text-blog-up-green font-semibold"
                  : "text-blog-up-gray"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
  
        {/* Tabs Content */}
        <div className="pt-4">
            {tabs.map((tab, index) => activeTab === tab && <div key={index}>{tabsComponents[index]}</div>)}
        </div>
      </div>
    );
  };

export default Tabs