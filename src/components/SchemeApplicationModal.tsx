'use client';

import React, { useState } from 'react';
import { GovernmentScheme, Entrepreneur } from '@/types';
import { CheckCircle2, ShieldCheck, X, FileText, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SchemeApplicationModalProps {
  scheme: GovernmentScheme | null;
  entrepreneur: Entrepreneur;
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (schemeId: string) => void;
  language: 'en' | 'hi';
}

export const SchemeApplicationModal: React.FC<SchemeApplicationModalProps> = ({
  scheme,
  entrepreneur,
  isOpen,
  onClose,
  onSubmitted,
  language,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen || !scheme) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onSubmitted(scheme.id);
        setIsDone(false);
        onClose();
      }, 1500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="relative w-full max-w-xl bg-white dark:bg-black rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header - Clean B&W */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Award className="w-5 h-5 text-black dark:text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                Direct Benefit Transfer (DBT)
              </span>
              <h3 className="font-bold text-base leading-tight">
                {scheme.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          {isDone ? (
            <div className="py-8 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full border border-black dark:border-white flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-black dark:text-white" />
              </div>
              <h4 className="text-lg font-bold">
                Application Submitted to Ministry
              </h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Reference ID: VISHW-{Date.now().toString().slice(-6)}. Approval arrives within 24 hours via SMS.
              </p>
            </div>
          ) : (
            <>
              {/* Highlight Benefit */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Approved Benefit Entitlement
                </span>
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">
                  {scheme.benefit}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
                  <span className="font-semibold">Grant / Loan Limit: {scheme.maxAmount}</span>
                  {scheme.interestRate && (
                    <span>• Subsidized Rate: <strong>{scheme.interestRate}</strong></span>
                  )}
                </div>
              </div>

              {/* Pre-filled Credentials */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Automated Pre-Filled Profile
                </span>
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Applicant:</span>
                    <span className="font-semibold">{entrepreneur.name} ({entrepreneur.trade})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Aadhaar e-KYC:</span>
                    <span className="font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> XXXX-XXXX-4819 (Verified)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Registered Machine:</span>
                    <span>{entrepreneur.machinery[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Order Track Record:</span>
                    <span className="font-mono">{entrepreneur.fulfilledOrders} orders (98% on-time)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting e-Payload...</span>
                  ) : (
                    <>
                      <span>Submit 1-Click Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
