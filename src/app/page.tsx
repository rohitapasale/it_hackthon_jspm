'use client';

import React, { useState, useEffect } from 'react';
import { LeftSidebar, NavTab } from '@/components/LeftSidebar';
import { TopNav } from '@/components/TopNav';
import { DashboardOverview } from '@/components/DashboardOverview';
import { ProfileView } from '@/components/ProfileView';
import { BuyerView } from '@/components/BuyerView';
import { LogisticsView } from '@/components/LogisticsView';
import { MakerTools } from '@/components/MakerTools';
import { DisputeCenter } from '@/components/DisputeCenter';
import { DpiInspectorView } from '@/components/DpiInspectorView';
import { LoginModal, DEMO_USERS } from '@/components/LoginModal';
import { PlatformGuideModal } from '@/components/PlatformGuideModal';
import { VoiceOnboardingModal } from '@/components/VoiceOnboardingModal';
import { SEED_ENTREPRENEURS, INITIAL_B2B_ORDERS } from '@/data/seedData';
import { Entrepreneur, RFQOrder, AuthUser } from '@/types';

export default function Home() {
  // Navigation & Theme States (Default is White / Light Mode as requested!)
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Auth User Session State
  const [currentUser, setCurrentUser] = useState<AuthUser>(DEMO_USERS.MAKER);

  // Core Data States
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>(SEED_ENTREPRENEURS);
  const [orders, setOrders] = useState<RFQOrder[]>(INITIAL_B2B_ORDERS);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    if (user.role === 'BUYER') {
      setActiveTab('buyer');
    } else if (user.role === 'MAKER') {
      setActiveTab('dashboard');
    } else if (user.role === 'SUPPLIER') {
      setActiveTab('logistics');
    } else if (user.role === 'GOVT_OFFICER') {
      setActiveTab('dpi');
    }
  };

  const handleUpdateSunita = (updatedData: Partial<Entrepreneur>) => {
    setEntrepreneurs(prev =>
      prev.map(ent =>
        ent.id === 'ent-sunita'
          ? {
              ...ent,
              ...updatedData,
            }
          : ent
      )
    );
  };

  const handleOrderUpdated = (updatedOrder: RFQOrder) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === updatedOrder.id ? updatedOrder : ord))
    );
  };

  const sunita = entrepreneurs.find(e => e.id === 'ent-sunita') || entrepreneurs[0];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 p-2 sm:p-5 flex gap-3 sm:gap-5 transition-colors duration-300 font-sans antialiased overflow-x-hidden`}>
      {/* Left Floating Pill Sidebar (Matching Image 2 with solid black borders) */}
      <LeftSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Full-Screen Application Canvas */}
      <div className="flex-1 flex flex-col min-w-0 space-y-5">
        {/* Top Header Navigation (Search, Center Pills, Profile Switch) */}
        <TopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Dynamic Route View */}
        <main className="flex-1 pb-10">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              entrepreneur={sunita}
              orders={orders}
              currentUser={currentUser}
              setActiveTab={setActiveTab}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              language={language}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              entrepreneur={sunita}
              onUpdate={handleUpdateSunita}
              language={language}
            />
          )}

          {activeTab === 'buyer' && (
            <BuyerView
              entrepreneurs={entrepreneurs}
              orders={orders}
              onOrderUpdated={handleOrderUpdated}
              language={language}
            />
          )}

          {activeTab === 'logistics' && (
            <LogisticsView
              entrepreneurs={entrepreneurs}
              language={language}
            />
          )}

          {activeTab === 'tools' && (
            <div className="max-w-5xl mx-auto py-2">
              <MakerTools
                entrepreneurName={sunita.name}
                language={language}
              />
            </div>
          )}

          {activeTab === 'disputes' && (
            <DisputeCenter
              language={language}
            />
          )}

          {activeTab === 'dpi' && (
            <DpiInspectorView
              language={language}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
      />

      <PlatformGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        language={language}
      />

      <VoiceOnboardingModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onComplete={handleUpdateSunita}
        language={language}
      />
    </div>
  );
}
