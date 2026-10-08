'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Users, 
  Mic, 
  Layers, 
  Wallet, 
  Globe2,
  ShieldCheck
} from 'lucide-react';
import { NavTab } from './LeftSidebar';

interface PlatformGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavTab) => void;
  language: 'en' | 'hi';
}

export const PlatformGuideModal: React.FC<PlatformGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  language,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Platform Architecture: Empowering Micro-Makers',
      subtitle: 'Solving the capacity and upfront capital bottleneck',
      icon: Users,
      tabTarget: 'dashboard' as const,
      narrative: `Samarthya unifies skilled home-based creators (tailors, bakers, artisans, technicians) into bankable micro-enterprises.
Instead of passive classified ads, our active matching engine coordinates bulk B2B demand, provides raw material purchasing power, and connects directly to national digital public infrastructure.`,
      actionHint: 'View the live dashboard overview and production progress.'
    },
    {
      title: 'Multilingual Voice Onboarding Engine',
      subtitle: 'Zero typing required — low-literacy accessibility',
      icon: Mic,
      tabTarget: 'dashboard' as const,
      narrative: `Home entrepreneurs speak in their native tongue:
"I make uniforms in Rohini, I have 2 sewing machines and can make 40 uniform sets weekly."
Our entity extraction engine identifies hardware equipment, verifies weekly capacity, and launches their digital storefront in seconds.`,
      actionHint: 'Tap "AI Voice Assistant" on the dashboard to test speech capture.'
    },
    {
      title: 'Cooperative Consortium Order Pooling',
      subtitle: 'Transforming competitors into cooperative fulfillment pods',
      icon: Layers,
      tabTarget: 'buyer' as const,
      narrative: `When an institution (like Greenwood High School) orders 300 uniforms, our multi-factor clustering engine groups verified local tailors (Sunita, Priya, Meena) into a unified pod.
The buyer receives a single invoice with unified quality, while each maker gets a manageable production share.`,
      actionHint: 'Switch to the Bulk Orders tab to inspect the team split.'
    },
    {
      title: 'Smart Milestone Escrow & Capital Advance',
      subtitle: '35% upfront liquidity for raw materials via OCEN',
      icon: Wallet,
      tabTarget: 'profile' as const,
      narrative: `Buyer funds lock securely into an escrow account. Upon order confirmation, 35% advance is immediately unlocked to makers specifically for verified raw materials at local wholesale mill depots.
Remaining funds disburse in milestones: 40% mid-check, 25% final delivery.`,
      actionHint: 'Check the Maker Profile for bank and escrow settlement details.'
    },
    {
      title: 'Hyperlocal Hubs & ONDC Distribution',
      subtitle: 'Direct local dispatch and nationwide catalog syndication',
      icon: Globe2,
      tabTarget: 'logistics' as const,
      narrative: `Orders deliver point-to-point within 2–7 km via integrated courier APIs (Porter, Dunzo).
Catalogs are broadcast across the Open Network for Digital Commerce (ONDC), making home makers discoverable on Paytm, Magicpin, and Mystore with zero commission.`,
      actionHint: 'Explore Local Hubs & Delivery to view cluster spatial routing.'
    },
    {
      title: 'Enterprise Trust & Dispute Protection',
      subtitle: 'Fair 48-hour neutral mediation & priority sector compliance',
      icon: ShieldCheck,
      tabTarget: 'disputes' as const,
      narrative: `If raw fabric arrives defective or specifications change mid-way, our neutral 48-hour mediation center safeguards both parties.
Purchases qualify under Government Priority Sector Lending (PSL) and corporate CSR ethical procurement mandates.`,
      actionHint: 'Check the Issues & Claims center to view the dispute resolution process.'
    }
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  const handleGoToScreen = () => {
    onNavigateTab(current.tabTarget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121215] rounded-[32px] shadow-2xl border-2 border-black dark:border-white/30 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 border-b-2 border-black dark:border-white/20 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                Samarthya Platform Guide
              </span>
              <h3 className="font-extrabold text-sm sm:text-base">
                Module {currentStep + 1} of {steps.length}: {current.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-black dark:border-white/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl border-2 border-black dark:border-white/40 bg-zinc-50 dark:bg-zinc-900">
              <Icon className="w-6 h-6 text-black dark:text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black tracking-tight">
                {current.title}
              </h4>
              <p className="text-xs text-zinc-500 font-semibold">
                {current.subtitle}
              </p>
            </div>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed font-normal shadow-inner">
            {current.narrative}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-700 text-xs">
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              👉 {current.actionHint}
            </span>
            <button
              onClick={handleGoToScreen}
              className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs shrink-0 flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <span>Explore This Screen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="pt-3 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-500 disabled:opacity-30"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentStep === idx
                      ? 'w-6 bg-black dark:bg-white'
                      : 'w-2 bg-zinc-300 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
