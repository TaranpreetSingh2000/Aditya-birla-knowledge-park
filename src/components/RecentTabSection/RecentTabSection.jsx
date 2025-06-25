"use client";
import React, { useState } from "react";
import { RECENT_CARDS_DATA } from "@/constants/recentTabData.js";

const RecentTabSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  console.log(RECENT_CARDS_DATA)
  // const currentTabData = RECENT_CARDS_DATA.tabs[activeTab]


  debugger
  const currentTabData = RECENT_CARDS_DATA.tabs.find((item, index) => index === activeTab);

  console.log('1---', currentTabData)

  return (
    <div className="w-full p-4">
      <div className="w-full flex">
        {RECENT_CARDS_DATA.tabs.map((tab, index) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-2 text-sm font-semibold rounded-tl-2xl rounded-tr-2xl transition-colors ${activeTab === index
              ? "bg-[#C7222A] text-white text-center"
              : "border border-gray-300 bg-gray-50 text-gray-600 hover:text-red-500"
              }`}
            style={{ width: `${RECENT_CARDS_DATA.tabs.length * 100}%` }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {currentTabData.cards.map((item, index) => (
          <div key={index} className="bg-white">
            <img src={item.image.src} className="w-full mb-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTabSection;