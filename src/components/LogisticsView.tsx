'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { Entrepreneur } from '@/types';

interface LogisticsViewProps {
  entrepreneurs: Entrepreneur[];
  language: 'en' | 'hi';
}

export const LogisticsView: React.FC<LogisticsViewProps> = ({
  entrepreneurs,
  language,
}) => {
  const [selectedHub, setSelectedHub] = useState<string>('hub-north-delhi');

  const clusterHubs = [
    {
      id: 'hub-north-delhi',
      name: 'North-West Delhi Apparel & Craft Cluster',
      centerArea: 'Rohini - Pitampura - Shalimar Bagh',
      producersCount: 18,
      activeConsortiums: 2,
      rawMaterialDepot: 'Rohini Sector 3 Central Fabric Wholesale Depot',
      groupBuyingSavings: '28% Wholesale Discount on Bulk Poly-Cotton Fabric',
      dispatchPartners: ['Porter Hyperlocal', 'Dunzo B2B', 'Delhivery Cluster Freight'],
    },
    {
      id: 'hub-west-delhi',
      name: 'West Delhi Culinary & Electronic Service Hub',
      centerArea: 'Dwarka - Janakpuri - Uttam Nagar',
      producersCount: 12,
      activeConsortiums: 1,
      rawMaterialDepot: 'Dwarka Sector 7 Organic Flour & Cold Storage Depot',
      groupBuyingSavings: '22% Wholesale Discount on Packaging & Flour',
      dispatchPartners: ['Porter On-Demand (Under 45 mins)', 'Shadowfax Instant'],
    }
  ];

  const currentHub = clusterHubs.find(h => h.id === selectedHub) || clusterHubs[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 text-zinc-900 dark:text-zinc-100">
      {/* Top Banner - Clean Monochrome */}
      <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-white/30">
              <Navigation className="w-5 h-5 text-black dark:text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Localized Infrastructure
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Nearby Hubs & Group-Buying Depots
              </h1>
            </div>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Eliminates high delivery fees and expensive warehouse middlemen. Tailors and makers group-buy raw materials together and fulfill local orders within 2–7 km.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 p-1.5 rounded-full border-2 border-black dark:border-white/30 shadow-2xs">
          {clusterHubs.map(hub => (
            <button
              key={hub.id}
              onClick={() => setSelectedHub(hub.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedHub === hub.id
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                  : 'text-zinc-500 hover:text-black dark:hover:text-white'
              }`}
            >
              {hub.name.split(' ')[0]} Hub
            </button>
          ))}
        </div>
      </div>

      {/* Cluster Map + Depot Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Local Map Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Hyperlocal Delivery Radius Map (Delhi NCR)</span>
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700 font-semibold">
              Radius: 2 – 7 km
            </span>
          </div>

          {/* Minimalist Monochrome Map Radar */}
          <div className="relative w-full h-80 rounded-2xl bg-zinc-950 border border-zinc-800 p-5 overflow-hidden flex flex-col justify-between text-white">
            <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                ACTIVE LOCAL CLUSTER: {currentHub.centerArea}
              </span>
              <span>GPS: ±5m verified</span>
            </div>

            {/* Interactive Node Markers */}
            <div className="relative z-10 my-auto flex items-center justify-around">
              {/* Sunita Node */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border-2 border-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                  👩🏽‍💼
                </div>
                <span className="mt-1.5 text-xs font-bold text-white">Sunita Devi</span>
                <span className="text-[10px] text-zinc-400">Rohini Sec 7 (Lead)</span>
              </div>

              {/* Central Wholesale Fabric Depot */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white text-black border-2 border-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                  🏭
                </div>
                <span className="mt-1.5 text-xs font-black text-white">Raw Material Depot</span>
                <span className="text-[10px] text-zinc-300">28% Group Buy Point</span>
              </div>

              {/* Priya Node */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-400 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                  🪡
                </div>
                <span className="mt-1.5 text-xs font-bold text-white">Priya Sharma</span>
                <span className="text-[10px] text-zinc-400">Pitampura (3.4 km)</span>
              </div>

              {/* Meena Node */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-400 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                  ✨
                </div>
                <span className="mt-1.5 text-xs font-bold text-white">Meena Kumari</span>
                <span className="text-[10px] text-zinc-400">Shalimar Bagh (4.1 km)</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[11px] pt-2 border-t border-zinc-800 text-zinc-400">
              <span>
                Consolidated Batch to Greenwood School: <strong>1.8 km distance</strong>
              </span>
              <span className="text-white font-bold">Courier: Porter B2B Assigned</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-zinc-500">Integrated Courier APIs:</span>
            <div className="flex items-center gap-2">
              {currentHub.dispatchPartners.map((partner, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-medium"
                >
                  🚚 {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Group-Buying Wholesale Pool (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-white/30">
                <Layers className="w-5 h-5 text-black dark:text-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Wholesale Bulk Purchasing
                </span>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Raw Material Group-Buying Pool
                </h3>
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              When individual home tailors buy fabric alone, they pay expensive shop retail prices. By combining orders as a team, they buy directly from the mill depot.
            </p>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-white/30 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Wholesale Partner Depot:</span>
                <span className="font-bold">{currentHub.rawMaterialDepot.split(' ')[0]} Wholesale Hub</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Discount Obtained:</span>
                <span className="font-extrabold">{currentHub.groupBuyingSavings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Payment Source:</span>
                <span className="font-semibold">Buyer 35% Advance Escrow</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border-2 border-black dark:border-white/30 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold">Active Group Order: 600m Poly-Cotton Navy Fabric</span>
                <span className="font-bold text-[11px]">85% of MOQ</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden border border-black dark:border-white/20">
                <div className="bg-black dark:bg-white h-full w-[85%] rounded-full"></div>
              </div>
              <p className="text-[11px] text-zinc-500">
                Pooled by: Sunita Devi (200m), Priya Sharma (200m), Meena Kumari (200m).
              </p>
            </div>

            <button
              onClick={() => alert('Bulk fabric purchase confirmed! ₹17,500 debited from advance escrow directly to Rohini Mill Depot.')}
              className="w-full py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:scale-102 active:scale-98 transition-all border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none flex items-center justify-center gap-2"
            >
              <span>Confirm Wholesale Group Purchase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
