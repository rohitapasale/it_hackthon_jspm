'use client';

import React, { useState, useEffect } from 'react';
import { Entrepreneur, RFQOrder, AuthUser } from '@/types';
import { 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  Bell, 
  Award, 
  Mic 
} from 'lucide-react';
import { NavTab } from './LeftSidebar';

interface DashboardOverviewProps {
  entrepreneur: Entrepreneur;
  orders: RFQOrder[];
  currentUser: AuthUser;
  setActiveTab: (tab: NavTab) => void;
  onOpenVoiceModal: () => void;
  language: 'en' | 'hi';
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  entrepreneur,
  orders,
  currentUser,
  setActiveTab,
  onOpenVoiceModal,
  language,
}) => {
  const [chartView, setChartView] = useState<'Week' | 'Month' | 'Year'>('Month');
  const [greeting, setGreeting] = useState(language === 'hi' ? 'नमस्ते' : 'Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(language === 'hi' ? 'सुप्रभात' : 'Good morning');
    else if (hour < 17) setGreeting(language === 'hi' ? 'नमस्ते' : 'Good afternoon');
    else setGreeting(language === 'hi' ? 'शुभ संध्या' : 'Good evening');
  }, [language]);

  return (
    <div className="space-y-6 text-zinc-900 dark:text-zinc-100 animate-fade-in">
      {/* Top Greeting Header (Matching Image 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {greeting}, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Sunita'}
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1 font-medium">
            {language === 'hi'
              ? 'यहाँ आपके साप्ताहिक ऑर्डर, क्षमता और टीम का विवरण है।'
              : 'Here is your active capacity, team pod status, and production chart.'}
          </p>
        </div>

        {/* AI Voice Assistant Pill */}
        <button
          onClick={onOpenVoiceModal}
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none border-2 border-black dark:border-white"
        >
          <Mic className="w-4 h-4" />
          <span>{language === 'hi' ? 'बोलकर स्टोर अपडेट करें' : 'AI Voice Assistant'}</span>
        </button>
      </div>

      {/* Main Layout Grid - Matching Image 2 Composition with White Main Theme & Black Outlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Big Performance Chart + 2 Subcards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Performance Chart Card */}
          <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-black text-lg tracking-tight">
                  {language === 'hi' ? 'उत्पादन चार्ट' : 'Performance Chart'}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5 font-medium">
                  Track weekly production output and capacity growth.
                </p>
              </div>

              {/* Time Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-white dark:bg-zinc-900 rounded-full border-2 border-black dark:border-white/30 shadow-2xs">
                {(['Week', 'Month', 'Year'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setChartView(view)}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                      chartView === view
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend & Highlight Badge */}
            <div className="flex items-center justify-between flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white inline-block"></span>
                  Stitching
                </span>
                <span className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600 inline-block"></span>
                  Fabric Orders
                </span>
                <span className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 inline-block"></span>
                  Completed Pods
                </span>
              </div>

              {/* Highlight Pill from Image 2 */}
              <div className="px-3.5 py-1.5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-black dark:border-white/30 text-xs shadow-2xs">
                <span className="font-black text-sm block leading-none">+28%</span>
                <span className="text-[10px] text-zinc-500 font-semibold leading-tight">Weekly Output Rise</span>
              </div>
            </div>

            {/* SVG Wave Line Chart */}
            <div className="relative w-full h-48 sm:h-56">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Guidelines */}
                {[50, 150, 250, 350, 450, 550].map((x, idx) => (
                  <line
                    key={idx}
                    x1={x}
                    y1={20}
                    x2={x}
                    y2={180}
                    stroke="currentColor"
                    strokeOpacity={0.08}
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Fill under wave */}
                <path
                  d="M 20 160 Q 90 90, 160 140 T 300 80 T 440 120 T 580 50 L 580 180 L 20 180 Z"
                  className="text-black dark:text-white fill-current opacity-5"
                />

                {/* Primary Trend Wave Line */}
                <path
                  d="M 20 160 Q 90 90, 160 140 T 300 80 T 440 120 T 580 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-black dark:text-white"
                />

                {/* Secondary Trend Wave Line (dashed) */}
                <path
                  d="M 20 175 Q 90 120, 160 155 T 300 110 T 440 145 T 580 85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="text-zinc-400 dark:text-zinc-600"
                />

                <circle cx="300" cy="80" r="5" className="fill-white dark:fill-black stroke-black dark:stroke-white stroke-[2.5]" />
                <circle cx="580" cy="50" r="5" className="fill-black dark:fill-white" />
              </svg>

              {/* Month Markers */}
              <div className="flex justify-between text-[11px] font-mono font-semibold text-zinc-500 pt-2 border-t-2 border-black/10 dark:border-white/10">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>
            </div>
          </div>

          {/* Two Subcards Below Chart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Subcard 1: Production Progress */}
            <div className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm">Order Fulfillment</h4>
                  <p className="text-[11px] text-zinc-400 font-medium">Weekly progress activity</p>
                </div>
                <span className="text-[11px] font-mono font-bold text-zinc-500">This Month</span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between mb-1.5 font-bold">
                    <span>Finished Uniforms</span>
                    <span className="font-mono">65 / 100 units</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden border border-black/20 dark:border-white/20">
                    <div className="bg-black dark:bg-white h-full w-[65%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5 font-bold">
                    <span>Ongoing Stitching</span>
                    <span className="font-mono">35 / 100 units</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden border border-black/20 dark:border-white/20">
                    <div className="bg-zinc-400 dark:bg-zinc-500 h-full w-[35%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subcard 2: Pod Partners Score */}
            <div className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm">Pod Team Scores</h4>
                  <p className="text-[11px] text-zinc-400 font-medium">Fulfillment reliability</p>
                </div>
                <span className="text-[11px] font-mono font-bold text-zinc-500">Last Week</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                      alt="Sunita"
                      className="w-6 h-6 rounded-full object-cover grayscale border border-black dark:border-white"
                    />
                    <span className="font-bold">Sunita Devi (You)</span>
                  </div>
                  <span className="font-mono font-black text-sm">98%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                      alt="Priya"
                      className="w-6 h-6 rounded-full object-cover grayscale border border-black dark:border-white"
                    />
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Priya Sharma</span>
                  </div>
                  <span className="font-mono font-black text-sm">94%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=100&q=80"
                      alt="Meena"
                      className="w-6 h-6 rounded-full object-cover grayscale border border-black dark:border-white"
                    />
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Meena Kumari</span>
                  </div>
                  <span className="font-mono font-black text-sm">99%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Available Orders & Scheme Support */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base tracking-tight">
              {language === 'hi' ? 'सक्रिय थोक अनुबंध' : 'Available Bulk Contracts'}
            </h3>
            <span className="text-[11px] font-bold text-zinc-400 uppercase">Live Pods</span>
          </div>

          {/* Card 1 */}
          <div className="bg-white dark:bg-[#121215] rounded-[28px] p-5 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-3 hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                School Procurement • 300 Units
              </span>
              <Bell className="w-3.5 h-3.5 text-zinc-400" />
            </div>

            <div>
              <h4 className="font-black text-sm">
                Greenwood School Uniform Sets
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Poly-cotton fabric • ₹500/unit fixed • 3-maker pod
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="flex items-center gap-1 text-zinc-500 font-mono text-[11px] font-semibold">
                <Calendar className="w-3.5 h-3.5" /> Due in 10 Days
              </span>
              <button
                onClick={() => setActiveTab('buyer')}
                className="px-4 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center gap-1 hover:opacity-90 transition-opacity border border-black dark:border-white"
              >
                <span>View Pod</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#121215] rounded-[28px] p-5 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-3 hover:translate-y-[-2px] transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                Bakery Gifting • 150 Boxes
              </span>
              <Bell className="w-3.5 h-3.5 text-zinc-400" />
            </div>

            <div>
              <h4 className="font-black text-sm">
                Corporate Millet Snack Hampers
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Artisan baker pod • Ananya Guha lead • ₹450/box
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="flex items-center gap-1 text-zinc-500 font-mono text-[11px] font-semibold">
                <Calendar className="w-3.5 h-3.5" /> Nov 12, 2026
              </span>
              <button
                onClick={() => setActiveTab('buyer')}
                className="px-4 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center gap-1 hover:opacity-90 transition-opacity border border-black dark:border-white"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Free Government Scheme Card */}
          <div className="bg-white dark:bg-[#121215] rounded-[28px] p-5 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <h4 className="font-bold text-xs uppercase tracking-wider">
                PM Vishwakarma Scheme
              </h4>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You are eligible for a <strong>₹15,000 modern toolkit grant</strong> and collateral-free credit at 5% interest.
            </p>

            <button
              onClick={() => setActiveTab('profile')}
              className="w-full py-2 rounded-full border-2 border-black dark:border-white text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Check Pre-Filled Eligibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
