'use client';

import React, { useState } from 'react';
import { Entrepreneur, GovernmentScheme, RFQOrder } from '@/types';
import { 
  Mic, 
  CheckCircle2, 
  Wallet, 
  Award, 
  Share2, 
  Globe2, 
  Layers, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Scissors,
  Check
} from 'lucide-react';
import { VoiceOnboardingModal } from './VoiceOnboardingModal';
import { SchemeApplicationModal } from './SchemeApplicationModal';
import { MakerTools } from './MakerTools';

interface EntrepreneurViewProps {
  entrepreneur: Entrepreneur;
  onUpdateEntrepreneur: (data: Partial<Entrepreneur>) => void;
  activeOrders: RFQOrder[];
  schemes: GovernmentScheme[];
  language: 'en' | 'hi';
}

export const EntrepreneurView: React.FC<EntrepreneurViewProps> = ({
  entrepreneur,
  onUpdateEntrepreneur,
  activeOrders,
  schemes,
  language,
}) => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);

  // Active consortium order
  const consortiumOrder = activeOrders.find(o => 
    o.consortiumSplit?.some(m => m.entrepreneurId === entrepreneur.id)
  );
  const myAllocation = consortiumOrder?.consortiumSplit?.find(m => m.entrepreneurId === entrepreneur.id);

  const handleOpenScheme = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    setIsSchemeModalOpen(true);
  };

  const handleSchemeSubmitted = (schemeId: string) => {
    console.log('Submitted scheme:', schemeId);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 text-zinc-900 dark:text-zinc-100">
      {/* Modals */}
      <VoiceOnboardingModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onComplete={onUpdateEntrepreneur}
        language={language}
      />

      <SchemeApplicationModal
        isOpen={isSchemeModalOpen}
        onClose={() => setIsSchemeModalOpen(false)}
        scheme={selectedScheme}
        entrepreneur={entrepreneur}
        onSubmitted={handleSchemeSubmitted}
        language={language}
      />

      {/* Top Profile Card - Clean Black & White */}
      <div className="bg-white dark:bg-black rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={entrepreneur.avatar}
              alt={entrepreneur.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover grayscale border border-zinc-300 dark:border-zinc-700 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {entrepreneur.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-black dark:border-white text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Maker
                </span>
              </div>
              <p className="text-zinc-500 text-sm font-medium mt-0.5">
                {entrepreneur.trade} • {entrepreneur.location.area}, {entrepreneur.location.city}
              </p>
              <div className="flex items-center gap-3 text-xs text-zinc-400 mt-2 font-mono">
                <span>Rating: {entrepreneur.rating} / 5.0</span>
                <span>•</span>
                <span>{entrepreneur.fulfilledOrders} Orders Completed</span>
                <span>•</span>
                <span>{entrepreneur.onTimeRate}% On-Time Delivery</span>
              </div>
            </div>
          </div>

          {/* Simple Voice Assistant Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition-all shadow-sm"
            >
              <Mic className="w-4 h-4" />
              <span>{language === 'hi' ? 'बोलकर प्रोफाइल अपडेट करें' : 'Update Store by Voice'}</span>
            </button>
          </div>
        </div>

        {/* 4 Simple Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-900">
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold block">Weekly Capacity</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold">{entrepreneur.weeklyCapacity}</span>
              <span className="text-xs text-zinc-400">items/week</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-0.5 block">10 booked • 30 free</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold block">Advance Money in Hand</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold">₹17,500</span>
              <span className="text-xs text-zinc-400">cash</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-0.5 block">Raw material advance received</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold block">Free Government Help</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold">3 Grants</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-0.5 block">PM Vishwakarma Toolkit</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold block">Online Presence</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold">ONDC Live</span>
            </div>
            <span className="text-[10px] text-zinc-500 mt-0.5 block">Active on Paytm & Magicpin</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Active Team Work & Escrow Advance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Team Work Order */}
          {consortiumOrder && myAllocation && (
            <div className="bg-white dark:bg-black rounded-3xl p-6 border-2 border-black dark:border-white shadow-sm space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Team Order (Cooperative Pod #POD-300)
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {consortiumOrder.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold border border-zinc-300 dark:border-zinc-700">
                  {consortiumOrder.buyerName}
                </span>
              </div>

              {/* Simple Team Split Details */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <div>
                    <span className="text-zinc-500">Total Bulk Order Size:</span>
                    <p className="font-bold text-sm">
                      {consortiumOrder.requiredUnits} Uniforms (Total Contract: ₹{consortiumOrder.totalBudget.toLocaleString('en-IN')})
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-zinc-500">Your Share:</span>
                    <p className="font-extrabold text-sm">
                      {myAllocation.allocatedUnits} units • ₹{myAllocation.totalPayout.toLocaleString('en-IN')} Payout
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Your Partners Working on this Order
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                    {consortiumOrder.consortiumSplit?.map((member, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-xs ${
                          member.entrepreneurId === entrepreneur.id
                            ? 'border-black dark:border-white bg-white dark:bg-black font-bold'
                            : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{member.entrepreneurName} {member.entrepreneurId === entrepreneur.id && '(You)'}</span>
                          <span className="font-mono font-bold">{member.allocatedUnits} u</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 block truncate mt-0.5">
                          {member.equipmentMatched.split('(')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Simple Payment Stages */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    <span className="font-bold text-xs">
                      Payment Protection: 3 Stages
                    </span>
                  </div>
                  <span className="text-[11px] font-bold">Stage 1: Advance Unlocked</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-black dark:border-white">
                    <span className="text-[10px] uppercase font-bold text-zinc-500">1. Advance (35%)</span>
                    <p className="font-bold text-black dark:text-white mt-0.5">₹17,500</p>
                    <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 block mt-0.5">
                      ✓ In Your Hand
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">2. Half-way (40%)</span>
                    <p className="font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">₹20,000</p>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Mid-Check</span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">3. Finish (25%)</span>
                    <p className="font-bold text-zinc-600 dark:text-zinc-400 mt-0.5">₹12,500</p>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* New Startup Tools Suite (Profit Calc, Delivery Slip, Hours, Tasks) */}
          <MakerTools
            entrepreneurName={entrepreneur.name}
            language={language}
          />
        </div>

        {/* Right Column (1 col): Proactive Govt Schemes & Machine List */}
        <div className="space-y-6">
          {/* Government Help / Grants */}
          <div className="bg-white dark:bg-black rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {language === 'hi' ? 'मुफ़्त सरकारी सहायता व योजनाएँ' : 'Free Government Grants & Loans'}
                </h3>
                <p className="text-[11px] text-zinc-500">
                  Automatically matched to your tailoring trade
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {schemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:border-black dark:hover:border-white transition-all text-xs space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-zinc-500">
                      {scheme.code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
                      Eligible
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {scheme.title}
                  </h4>

                  <p className="text-[11px] text-zinc-500 line-clamp-2">
                    {scheme.benefit}
                  </p>

                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <span className="font-bold">Max: {scheme.maxAmount}</span>
                    <button
                      onClick={() => handleOpenScheme(scheme)}
                      className="font-bold text-black dark:text-white underline text-xs"
                    >
                      1-Click Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Machinery Inventory */}
          <div className="bg-white dark:bg-black rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              <span>Verified Machines & Workshop</span>
            </h3>

            <div className="space-y-2 text-xs">
              {entrepreneur.machinery.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex items-center justify-between"
                >
                  <span className="font-medium">{m}</span>
                  <Check className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
