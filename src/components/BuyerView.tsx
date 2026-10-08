'use client';

import React, { useState } from 'react';
import { RFQOrder, Entrepreneur } from '@/types';
import { 
  evaluateSellerMatch, 
  solveConsortiumSplit, 
  MatchResult 
} from '@/lib/matchingEngine';
import { 
  Building2, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Wallet, 
  Sliders, 
  Cpu, 
  Clock, 
  Users,
  Search
} from 'lucide-react';
import { BuyerTools } from './BuyerTools';
import confetti from 'canvas-confetti';

interface BuyerViewProps {
  entrepreneurs: Entrepreneur[];
  orders: RFQOrder[];
  onOrderUpdated: (updatedOrder: RFQOrder) => void;
  language: 'en' | 'hi';
}

export const BuyerView: React.FC<BuyerViewProps> = ({
  entrepreneurs,
  orders,
  onOrderUpdated,
  language,
}) => {
  // RFQ Input State
  const [rfqTitle, setRfqTitle] = useState('Annual School Uniform Sets (300 Custom Tailored Pairs)');
  const [rfqCategory, setRfqCategory] = useState('Tailoring');
  const [rfqQuantity, setRfqQuantity] = useState(300);
  const [rfqUnitBudget, setRfqUnitBudget] = useState(500);
  const [rfqLocation, setRfqLocation] = useState('Rohini Sector 9, Delhi');
  const [buyerCoords] = useState({ lat: 28.7120, lng: 77.1150 });

  // Matching states
  const [isMatchingRunning, setIsMatchingRunning] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult[] | null>(null);
  const [consortiumResult, setConsortiumResult] = useState<ReturnType<typeof solveConsortiumSplit> | null>(null);

  const handleRunMatching = () => {
    setIsMatchingRunning(true);
    setTimeout(() => {
      const results = entrepreneurs.map((ent) =>
        evaluateSellerMatch(rfqCategory, rfqQuantity, ent, buyerCoords)
      );
      results.sort((a, b) => b.totalScore - a.totalScore);
      setMatchResults(results);

      const split = solveConsortiumSplit(rfqQuantity, rfqUnitBudget, results);
      setConsortiumResult(split);
      setIsMatchingRunning(false);

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 text-zinc-900 dark:text-zinc-100">
      {/* Top Buyer Banner - Clean Monochrome */}
      <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Building2 className="w-5 h-5 text-black dark:text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Institutional Buyer Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Greenwood International School
              </h1>
            </div>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Order directly from verified local women tailors and artisans. When you need 300+ units, our system organizes them into a cooperative team with unified quality and one single contract.
          </p>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs">
          <span className="text-zinc-400">Current Order Contract:</span>
          <p className="font-extrabold text-base mt-0.5">₹1,50,000 (300 Units)</p>
          <span className="text-zinc-500 font-semibold flex items-center gap-1 mt-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Escrow Protected
          </span>
        </div>
      </div>

      {/* Main Grid: RFQ Form + Team Split Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): RFQ Order Creator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                <span>Create Bulk Order Request</span>
              </h3>
              <span className="text-[11px] text-zinc-400">Easy Step-by-Step</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  What do you want to order?
                </label>
                <input
                  type="text"
                  value={rfqTitle}
                  onChange={(e) => setRfqTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Trade Category
                  </label>
                  <select
                    value={rfqCategory}
                    onChange={(e) => setRfqCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
                  >
                    <option value="Tailoring">Tailoring & Uniforms</option>
                    <option value="Food & Bakery">Bakery & Snacks</option>
                    <option value="Handicrafts">Handicrafts & Gifts</option>
                    <option value="Repair & Electronics">Electronics Repair</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Number of Units Needed
                  </label>
                  <input
                    type="number"
                    value={rfqQuantity}
                    onChange={(e) => setRfqQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Target Price per Unit (₹)
                  </label>
                  <input
                    type="number"
                    value={rfqUnitBudget}
                    onChange={(e) => setRfqUnitBudget(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Total Estimated Contract
                  </label>
                  <div className="px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 font-bold text-sm">
                    ₹{(rfqQuantity * rfqUnitBudget).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  School / Delivery Address
                </label>
                <input
                  type="text"
                  value={rfqLocation}
                  onChange={(e) => setRfqLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
                />
              </div>

              <button
                onClick={handleRunMatching}
                disabled={isMatchingRunning}
                className="w-full py-3 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 flex items-center justify-center gap-2 transition-all"
              >
                {isMatchingRunning ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>Finding & Grouping Nearby Makers...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Find Verified Makers & Form Team</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simple Explanation Note */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
              How the Team Matching Works:
            </span>
            <p className="text-zinc-500 leading-relaxed text-[11px]">
              Single home tailors have a limit of ~35 uniforms per week. Since you need 300 uniforms, our engine clusters 3 nearby verified tailors who have matching commercial machines so they can deliver together on time.
            </p>
          </div>
        </div>

        {/* Right Column (7 cols): Team Pod Solution & Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Formed Cooperative Pod
                  </span>
                  <h3 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">
                    Fulfillment Team: 3 Verified Tailors
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold border border-black dark:border-white">
                300 / 300 Units Allocated
              </span>
            </div>

            {/* 3 Pod Members Cards */}
            <div className="space-y-3">
              {/* Sunita Devi */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                    alt="Sunita Devi"
                    className="w-12 h-12 rounded-xl object-cover grayscale border border-zinc-300 dark:border-zinc-700"
                  />
                  <div>
                    <h4 className="font-bold text-sm">Sunita Devi (Pod Lead)</h4>
                    <p className="text-zinc-500">Rohini Sector 7 (1.2 km away) • Juki DDL-8700 Industrial Machine</p>
                    <span className="text-[10px] text-zinc-400 font-mono mt-0.5 block">
                      Score: 94% Compatibility
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-zinc-400 block text-[11px]">Allocated Work:</span>
                  <p className="text-base font-extrabold">100 units</p>
                  <span className="text-[11px] text-zinc-500 font-medium">₹50,000 Share</span>
                </div>
              </div>

              {/* Priya Sharma */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Priya Sharma"
                    className="w-12 h-12 rounded-xl object-cover grayscale border border-zinc-300 dark:border-zinc-700"
                  />
                  <div>
                    <h4 className="font-bold text-sm">Priya Sharma</h4>
                    <p className="text-zinc-500">Pitampura (3.4 km away) • Singer Heavy Duty + Fabric Cutter</p>
                    <span className="text-[10px] text-zinc-400 font-mono mt-0.5 block">
                      Score: 89% Compatibility
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-zinc-400 block text-[11px]">Allocated Work:</span>
                  <p className="text-base font-extrabold">100 units</p>
                  <span className="text-[11px] text-zinc-500 font-medium">₹50,000 Share</span>
                </div>
              </div>

              {/* Meena Kumari */}
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80"
                    alt="Meena Kumari"
                    className="w-12 h-12 rounded-xl object-cover grayscale border border-zinc-300 dark:border-zinc-700"
                  />
                  <div>
                    <h4 className="font-bold text-sm">Meena Kumari (Embroiderer)</h4>
                    <p className="text-zinc-500">Shalimar Bagh (4.1 km away) • Jack F4 Lockstitch + Crest Frame</p>
                    <span className="text-[10px] text-zinc-400 font-mono mt-0.5 block">
                      Score: 91% Compatibility
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-zinc-400 block text-[11px]">Allocated Work:</span>
                  <p className="text-base font-extrabold">100 units</p>
                  <span className="text-[11px] text-zinc-500 font-medium">₹50,000 Share</span>
                </div>
              </div>
            </div>
          </div>

          {/* New Startup Buyer Utilities (Sample Inspection, Escrow Stages, Tax Certificate, Reorder) */}
          <BuyerTools language={language} />
        </div>
      </div>
    </div>
  );
};
