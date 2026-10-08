'use client';

import React, { useState } from 'react';
import { AuthUser, UserRole } from '@/types';
import { X, Check, ArrowRight, ShieldCheck, User, Building, Truck, Landmark } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onLogin: (user: AuthUser) => void;
}

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  MAKER: {
    id: 'user-sunita',
    name: 'Sunita Devi',
    role: 'MAKER',
    identifier: '+91 98765 43210',
    businessName: 'Sunita Tailoring Studio',
    location: 'Rohini Sector 7, Delhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    memberSince: 'March 2025'
  },
  BUYER: {
    id: 'user-school',
    name: 'Dr. Arvind Mehta',
    role: 'BUYER',
    identifier: 'procurement@greenwoodschool.edu.in',
    businessName: 'Greenwood International School',
    location: 'Rohini Sector 9, Delhi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    memberSince: 'January 2025'
  },
  SUPPLIER: {
    id: 'user-supplier',
    name: 'Kailash Singhania',
    role: 'SUPPLIER',
    identifier: '+91 98111 55667',
    businessName: 'Rohini Wholesale Fabric Depot',
    location: 'Rohini Sector 3, Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    memberSince: 'February 2025'
  },
  GOVT_OFFICER: {
    id: 'user-govt',
    name: 'R. S. Sharma',
    role: 'GOVT_OFFICER',
    identifier: 'desk.officer@msme.gov.in',
    businessName: 'Ministry of MSME (PM Vishwakarma Desk)',
    location: 'Udyog Bhawan, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isVerified: true,
    memberSince: 'October 2024'
  }
};

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('MAKER');
  const [inputVal, setInputVal] = useState(DEMO_USERS.MAKER.identifier);
  const [otpVal, setOtpVal] = useState('4819');
  const [step, setStep] = useState<'SELECT' | 'ENTER_CODE'>('SELECT');

  if (!isOpen) return null;

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setInputVal(DEMO_USERS[role].identifier);
  };

  const handleQuickLogin = (role: UserRole) => {
    onLogin(DEMO_USERS[role]);
    onClose();
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'SELECT') {
      setStep('ENTER_CODE');
    } else {
      onLogin(DEMO_USERS[selectedRole]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-black rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-zinc-900 dark:text-zinc-100">
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg tracking-tight">Account Login</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Choose your profile to test with real permissions
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* 4 Clean Monochrome Role Selectors */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectRole('MAKER')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === 'MAKER'
                    ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5" />
                  <span className="text-xs">Home Maker</span>
                </div>
                <p className="text-[10px] text-zinc-500 truncate">Sunita Devi (Tailor)</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('BUYER')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === 'BUYER'
                    ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Building className="w-3.5 h-3.5" />
                  <span className="text-xs">Bulk Buyer</span>
                </div>
                <p className="text-[10px] text-zinc-500 truncate">Greenwood School</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('SUPPLIER')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === 'SUPPLIER'
                    ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span className="text-xs">Supplier / Hub</span>
                </div>
                <p className="text-[10px] text-zinc-500 truncate">Rohini Fabric Mill</p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectRole('GOVT_OFFICER')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedRole === 'GOVT_OFFICER'
                    ? 'border-black dark:border-white bg-zinc-100 dark:bg-zinc-900 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Landmark className="w-3.5 h-3.5" />
                  <span className="text-xs">Govt Officer</span>
                </div>
                <p className="text-[10px] text-zinc-500 truncate">MSME Desk Officer</p>
              </button>
            </div>
          </div>

          {/* Quick Login Form */}
          <form onSubmit={handleDirectSubmit} className="space-y-4">
            {step === 'SELECT' ? (
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Mobile Number or Email
                </label>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  placeholder="Enter phone or email"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Enter 4-Digit Security Code / OTP
                </label>
                <input
                  type="password"
                  value={otpVal}
                  onChange={(e) => setOtpVal(e.target.value)}
                  maxLength={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  required
                />
                <span className="text-[11px] text-zinc-500 block text-center mt-1">
                  Demo code: <strong>4819</strong> (Auto-filled)
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span>{step === 'SELECT' ? 'Continue with OTP' : 'Verify & Enter Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* 1-Click Instant Profile Switcher */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2 text-center">
              Instant Profile Switcher
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleQuickLogin('MAKER')}
                className="text-[11px] px-3 py-1.5 rounded-full border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold transition-all"
              >
                Sunita Devi (Maker)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('BUYER')}
                className="text-[11px] px-3 py-1.5 rounded-full border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold transition-all"
              >
                Greenwood School (Buyer)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
