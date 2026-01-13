
import React from 'react';
import { Language } from '../types';
import { translations } from '../locales';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
}

const Navigation: React.FC<NavProps> = ({ activeTab, setActiveTab, lang }) => {
  const t = translations[lang];
  
  const tabs = [
    { id: 'home', label: t.explore, icon: '🧭' },
    { id: 'planner', label: t.planner, icon: '📅' },
    { id: 'food', label: t.food, icon: '🍲' },
    { id: 'guide', label: t.guide, icon: '📖' }
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-[6000] bg-white/95 backdrop-blur-2xl border-t border-slate-100 pb-safe shadow-[0_-8px_25px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 px-2">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(tab.id);
            }}
            className={`flex flex-col items-center justify-center w-full transition-all duration-300 ${
              activeTab === tab.id ? 'text-red-600 scale-105' : 'text-slate-300'
            }`}
          >
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className={`text-[8px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
