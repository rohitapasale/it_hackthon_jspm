'use client';

import React, { useState } from 'react';
import { Entrepreneur } from '@/types';
import { 
  User, 
  MapPin, 
  Scissors, 
  Award, 
  Calendar, 
  Landmark, 
  Check, 
  Plus, 
  Trash2, 
  Save, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  entrepreneur: Entrepreneur;
  onUpdate: (updated: Partial<Entrepreneur>) => void;
  language: 'en' | 'hi';
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  entrepreneur,
  onUpdate,
  language,
}) => {
  // Local editable form states
  const [name, setName] = useState(entrepreneur.name);
  const [trade, setTrade] = useState(entrepreneur.trade);
  const [bio, setBio] = useState(entrepreneur.bio);
  const [phone, setPhone] = useState(entrepreneur.phone);
  const [area, setArea] = useState(entrepreneur.location.area);
  const [city, setCity] = useState(entrepreneur.location.city);
  const [travelRadius, setTravelRadius] = useState(entrepreneur.location.travelRadiusKm);
  const [workspaceType, setWorkspaceType] = useState(entrepreneur.workspaceType);
  const [weeklyCapacity, setWeeklyCapacity] = useState(entrepreneur.weeklyCapacity);
  const [workingHours, setWorkingHours] = useState(entrepreneur.workingHoursPerDay || 6);
  const [isVacation, setIsVacation] = useState(entrepreneur.isVacationMode || false);

  // Machinery state
  const [machinery, setMachinery] = useState<string[]>(entrepreneur.machinery);
  const [newMachineInput, setNewMachineInput] = useState('');

  // Bank & Payout state
  const [bankAcc, setBankAcc] = useState('XXXX-XXXX-8921');
  const [ifsc, setIfsc] = useState('SBIN0001234');
  const [upiId, setUpiId] = useState('sunitadevi@okaxis');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddMachine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMachineInput.trim()) return;
    setMachinery([...machinery, newMachineInput.trim()]);
    setNewMachineInput('');
  };

  const handleRemoveMachine = (idx: number) => {
    setMachinery(machinery.filter((_, i) => i !== idx));
  };

  const handleSaveProfile = () => {
    onUpdate({
      name,
      trade,
      bio,
      phone,
      location: {
        ...entrepreneur.location,
        area,
        city,
        travelRadiusKm: travelRadius,
      },
      workspaceType,
      weeklyCapacity,
      workingHoursPerDay: workingHours,
      isVacationMode: isVacation,
      machinery,
    });

    setSavedSuccess(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 text-zinc-900 dark:text-zinc-100 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative group cursor-pointer">
            <img
              src={entrepreneur.avatar}
              alt={entrepreneur.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover grayscale border-2 border-zinc-300 dark:border-zinc-700 shadow-sm group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
              <Camera className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-black dark:border-white">
                Verified Maker Profile
              </span>
            </div>
            <p className="text-zinc-500 text-xs sm:text-sm font-medium mt-1">
              {trade} • {area}, {city}
            </p>
            <span className="text-[11px] font-mono text-zinc-400 mt-2 block">
              Udyam Assist Reg: <strong>UAP-DL-07-009124</strong> • Aadhaar e-KYC Linked
            </span>
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition-all shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? 'Profile Saved!' : 'Save All Changes'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <Check className="w-4 h-4" />
          <span>Profile, job description, machinery, and capacity have been updated across the network.</span>
        </div>
      )}

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Personal & Job Description */}
        <div className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-900">
            <User className="w-4 h-4" />
            <h3 className="font-bold text-sm">Personal & Job Description</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Trade & Job Title
              </label>
              <input
                type="text"
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Artisan Bio / Job Description
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium leading-relaxed"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Workshop Location & Hyperlocal Radius */}
        <div className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-900">
            <MapPin className="w-4 h-4" />
            <h3 className="font-bold text-sm">Workshop Location & Radius</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Local Area / Sector
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Workspace Setup Type
              </label>
              <input
                type="text"
                value={workspaceType}
                onChange={(e) => setWorkspaceType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-zinc-600 dark:text-zinc-400">
                  Service / Local Delivery Radius:
                </span>
                <span className="font-bold">{travelRadius} km</span>
              </div>
              <input
                type="range"
                min={2}
                max={25}
                value={travelRadius}
                onChange={(e) => setTravelRadius(Number(e.target.value))}
                className="w-full accent-black dark:accent-white"
              />
              <p className="text-[11px] text-zinc-400 mt-1">
                Buyers and consortium partners within {travelRadius} km can discover and group with you.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Verified Machinery Registry */}
        <div className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              <h3 className="font-bold text-sm">Machinery & Equipment Registry</h3>
            </div>
            <span className="text-[11px] text-zinc-400">{machinery.length} Tools Audited</span>
          </div>

          <div className="space-y-2 text-xs">
            {machinery.map((mach, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                  <span className="font-medium">{mach}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMachine(idx)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddMachine} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="e.g., Jack F4 Commercial Sewing Machine..."
              value={newMachineInput}
              onChange={(e) => setNewMachineInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs bg-zinc-50 dark:bg-zinc-900"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Tool
            </button>
          </form>
        </div>

        {/* Section 4: Bank Details & Escrow Payout (DBT) */}
        <div className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-900">
            <Landmark className="w-4 h-4" />
            <h3 className="font-bold text-sm">Direct Bank Payout (Escrow Account)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Bank Account Number
              </label>
              <input
                type="text"
                value={bankAcc}
                onChange={(e) => setBankAcc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-mono font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-mono font-medium"
                />
              </div>
              <div>
                <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  UPI ID (VPA)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-mono font-medium"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
              🔒 Programmatic Escrow settlements and 35% raw material advances disburse automatically to this verified account without delay.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
