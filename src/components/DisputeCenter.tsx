'use client';

import React, { useState } from 'react';
import { EscrowDispute } from '@/types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Plus, 
  HelpCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DisputeCenterProps {
  language: 'en' | 'hi';
}

export const DisputeCenter: React.FC<DisputeCenterProps> = ({
  language,
}) => {
  const [disputes, setDisputes] = useState<EscrowDispute[]>([
    {
      id: 'disp-8812',
      orderId: 'rfq-greenwood-300',
      raisedBy: 'Sunita Devi (Pod Lead)',
      respondent: 'Rohini Wholesale Fabric Depot',
      reason: 'DEFECTIVE_RAW_MATERIAL',
      description: 'Roll #3 of poly-cotton navy fabric had irregular dye shades on 40 meters. Replacement fabric requested immediately.',
      amountInDispute: 4800,
      status: 'IN_REVIEW',
      suggestedResolution: 'Mill depot to dispatch 40m replacement roll via Porter within 4 hours; no penalty to maker.',
      evidenceDocsCount: 2,
      createdAt: 'Today, 10:15 AM'
    }
  ]);

  const [isFilingNew, setIsFilingNew] = useState(false);
  const [newReason, setNewReason] = useState<EscrowDispute['reason']>('SPECIFICATION_MISMATCH');
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState(2500);

  const handleResolve = (id: string) => {
    setDisputes(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: 'MEDIATED_RESOLVED', suggestedResolution: 'Resolved via automated platform mediation.' }
          : d
      )
    );
    confetti({ particleCount: 40, spread: 50 });
  };

  const handleFileDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    setDisputes([
      {
        id: `disp-${Date.now().toString().slice(-4)}`,
        orderId: 'rfq-greenwood-300',
        raisedBy: 'Sunita Devi',
        respondent: 'Greenwood International School',
        reason: newReason,
        description: newDesc.trim(),
        amountInDispute: newAmount,
        status: 'OPEN',
        evidenceDocsCount: 1,
        createdAt: 'Just now'
      },
      ...disputes
    ]);
    setIsFilingNew(false);
    setNewDesc('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 text-zinc-900 dark:text-zinc-100 animate-fade-in">
      {/* Header */}
      <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <ShieldAlert className="w-5 h-5 text-black dark:text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Escrow Protection & Fairness
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Dispute & Issue Resolution Hub
              </h1>
            </div>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Protects small home creators if a fabric supplier sends defective materials or if a buyer changes specifications mid-way. Funds in escrow remain locked safely.
          </p>
        </div>

        <button
          onClick={() => setIsFilingNew(!isFilingNew)}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Report an Issue</span>
        </button>
      </div>

      {/* New Dispute Modal/Form */}
      {isFilingNew && (
        <form onSubmit={handleFileDispute} className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border border-zinc-300 dark:border-zinc-700 shadow-sm space-y-4 animate-fade-in text-xs">
          <h3 className="font-bold text-sm">File a Neutral Escrow Mediation Request</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Type of Issue
              </label>
              <select
                value={newReason}
                onChange={(e) => setNewReason(e.target.value as EscrowDispute['reason'])}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
              >
                <option value="DEFECTIVE_RAW_MATERIAL">Defective Fabric / Raw Material from Mill</option>
                <option value="SPECIFICATION_MISMATCH">Buyer Changed Size / Cut Specifications</option>
                <option value="DELAYED_INSPECTION">Buyer Delaying Milestone Signoff</option>
                <option value="PAYMENT_HOLD">Escrow Advance Delay</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                Disputed Value (₹)
              </label>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
              Detailed Description & Problem
            </label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Explain exactly what happened..."
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-medium"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFilingNew(false)}
              className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold"
            >
              Submit Mediation Request
            </button>
          </div>
        </form>
      )}

      {/* Active Disputes List */}
      <div className="space-y-4">
        {disputes.map((d) => (
          <div
            key={d.id}
            className="bg-white dark:bg-[#121215] rounded-[28px] p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-zinc-400 text-[10px] uppercase">
                  {d.id}
                </span>
                <span className="font-bold text-sm">
                  {d.reason.replace(/_/g, ' ')}
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                d.status === 'MEDIATED_RESOLVED'
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-zinc-400 text-zinc-500'
              }`}>
                {d.status === 'MEDIATED_RESOLVED' ? 'Resolved' : 'Active 48-Hour Mediation'}
              </span>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {d.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-zinc-500">Raised By: <strong>{d.raisedBy}</strong></span>
                <span className="text-zinc-500">Target Party: <strong>{d.respondent}</strong></span>
                <span className="font-bold">Held Amount: ₹{d.amountInDispute.toLocaleString('en-IN')}</span>
              </div>

              {d.suggestedResolution && (
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span><strong>Platform Compromise:</strong> {d.suggestedResolution}</span>
                </div>
              )}
            </div>

            {d.status !== 'MEDIATED_RESOLVED' && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleResolve(d.id)}
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accept Solution & Release Adjusted Funds</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
