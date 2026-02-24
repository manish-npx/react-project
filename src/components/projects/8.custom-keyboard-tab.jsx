import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";

function CustomKeyboardTab() {
  const tabs = [
    {
      id: "tab1",
      title: "Dashboard",
      content: "Admin Dashboard",
    },
    {
      id: "tab2",
      title: "Products",
      content: "Admin Products",
    },
    {
      id: "tab3",
      title: "Settings",
      content: "Admin Settings",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const tabListRef = useRef(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();

        setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : prev));

        break;

      case "ArrowLeft":
        event.preventDefault();
        setActiveTab((prev) => (prev > 0 ? prev - 1 : prev));

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const tabButtons = tabListRef.current?.querySelectorAll('[role="tab"]');

    if (tabButtons && tabButtons[activeTab]) {
      tabButtons[activeTab].focus();
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col pt-[150px] justify-center bg-gray-50">
      <h1>Custom Tabs With Keyboard Interaction</h1>
      <Card className={"w-full max-w-2xl mx-auto"}>
        <CardContent className={"p-6"}>
          <div
            ref={tabListRef}
            role="tablist"
            aria-orientation="horizontal"
            className="flex border-b"
            onKeyDown={handleKeyDown}
          >
            {tabs.map((currentTabItem, index) => (
              <button
                key={currentTabItem.id}
                role="tab"
                id={`tab-${currentTabItem.id}`}
                aria-selected={activeTab === index}
                aria-controls={`panel-${currentTabItem.id}`}
                tabIndex={activeTab === index ? 0 : -1}
                className={`px-4 py-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  activeTab === index
                    ? "border-b-2 border-blue-900 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {currentTabItem.title}
              </button>
            ))}
          </div>
          <div className="mt-5">
            {tabs.map((currentTabItem, index) => (
              <div
                key={currentTabItem.id}
                role="tabpanel"
                id={`tab-${currentTabItem.id}`}
                aria-labelledby={`tab-${currentTabItem.id}`}
                hidden={activeTab !== index}
                className={`p-5 bg-gray-100 ${
                  activeTab === index ? "block" : "hidden"
                }`}
              >
                {currentTabItem.content}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomKeyboardTab;
