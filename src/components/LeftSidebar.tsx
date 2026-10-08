'use client';

import React from 'react';
import { 
  Home, 
  User, 
  ShoppingBag, 
  MapPin, 
  Sliders, 
  ShieldAlert, 
  Cpu, 
  Sun, 
  Moon 
} from 'lucide-react';

export type NavTab = 'dashboard' | 'profile' | 'buyer' | 'logistics' | 'tools' | 'disputes' | 'dpi';

interface LeftSidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard Overview', icon: Home },
    { id: 'profile' as NavTab, label: 'Maker Profile & Specialization', icon: User },
    { id: 'buyer' as NavTab, label: 'Bulk Institutional Orders', icon: ShoppingBag },
    { id: 'logistics' as NavTab, label: 'Hyperlocal Hubs & Delivery', icon: MapPin },
    { id: 'tools' as NavTab, label: 'Maker Operations Suite', icon: Sliders },
    { id: 'disputes' as NavTab, label: 'Issue & Escrow Dispute Hub', icon: ShieldAlert },
    { id: 'dpi' as NavTab, label: 'ONDC & DPI Protocols', icon: Cpu },
  ];

  return (
    <aside className="w-16 sm:w-20 flex flex-col items-center justify-between py-5 bg-white dark:bg-[#121215] rounded-[32px] border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] shrink-0 transition-all duration-300">
      {/* Brand Squircle Logo */}
      <div className="flex flex-col items-center gap-5">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="w-12 h-12 rounded-[22px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xl shadow-md hover:scale-105 active:scale-95 transition-all border border-black dark:border-white"
          title="Samarthya Enterprise Network"
        >
          S
        </button>

        {/* Vertical Icon Pill Nav with Crisp Black Borders */}
        <div className="flex flex-col items-center gap-1.5 p-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-full border-2 border-black dark:border-white/30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md scale-105'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200/80 dark:hover:bg-zinc-800'
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                {isActive && (
                  <span className="sr-only">Active</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sun / Moon Switcher Pill (Matching Image 2 with White/Black Outlines) */}
      <div className="flex flex-col items-center p-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-full border-2 border-black dark:border-white/30">
        <button
          onClick={!isDarkMode ? undefined : toggleDarkMode}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            !isDarkMode
              ? 'bg-black text-white shadow-md'
              : 'text-zinc-400 hover:text-zinc-800'
          }`}
          title="Switch to Main Light Theme"
        >
          <Sun className="w-4 h-4" />
        </button>

        <button
          onClick={isDarkMode ? undefined : toggleDarkMode}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isDarkMode
              ? 'bg-white text-black shadow-md'
              : 'text-zinc-500 hover:text-black'
          }`}
          title="Switch to Dark Mode"
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
