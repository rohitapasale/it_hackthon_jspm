'use client';

import React from 'react';
import { 
  Search, 
  Bell, 
  Languages, 
  BookOpen, 
  ChevronDown 
} from 'lucide-react';
import { AuthUser } from '@/types';
import { NavTab } from './LeftSidebar';

interface TopNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currentUser: AuthUser;
  onOpenLogin: () => void;
  onOpenGuide: () => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  unreadCount?: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenLogin,
  onOpenGuide,
  language,
  setLanguage,
  unreadCount = 2,
}) => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      {/* Search Input Box with Black Outline */}
      <div className="relative w-full sm:w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder={language === 'hi' ? 'ऑर्डर, मशीन या कारीगर खोजें...' : 'Search orders, machines, artisans...'}
          className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-black dark:border-white/30 bg-white dark:bg-[#121215] text-xs font-semibold focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-all placeholder:text-zinc-400"
        />
      </div>

      {/* Right Actions: Language, Platform Guide, Notifications & User Avatar */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border-2 border-black dark:border-white/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
          title="Toggle Language"
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
        </button>

        {/* Platform System Documentation */}
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-black dark:border-white text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{language === 'hi' ? 'सिस्टम विवरण' : 'Startup Docs'}</span>
        </button>

        {/* Notification Bell with Badge */}
        <button
          onClick={() => alert('Notifications:\n1. 35% Advance Escrow payment (₹17,500) confirmed for POD-300.\n2. PM Vishwakarma toolkit grant pre-filled.')}
          className="relative w-9 h-9 rounded-full border-2 border-black dark:border-white/30 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors bg-white dark:bg-[#121215]"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-black dark:text-white" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
          )}
        </button>

        {/* User Profile Avatar Button */}
        <button
          onClick={onOpenLogin}
          className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white dark:bg-[#121215] border-2 border-black dark:border-white/30 hover:shadow-md transition-all"
          title="Switch User / Role"
        >
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'}
            alt={currentUser?.name || 'User'}
            className="w-7 h-7 rounded-full object-cover grayscale border border-black dark:border-white"
          />
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold block leading-none">
              {currentUser?.name ? currentUser.name.split(' ')[0] : 'User'}
            </span>
            <span className="text-[10px] text-zinc-500 block leading-tight font-medium">
              {currentUser?.role === 'MAKER' ? 'Maker' : currentUser?.role === 'BUYER' ? 'Buyer' : 'Staff'}
            </span>
          </div>
          <ChevronDown className="w-3 h-3 text-zinc-500" />
        </button>
      </div>
    </header>
  );
};
