'use client';

import React, { useState } from 'react';
import { 
  PackageCheck, 
  Wallet, 
  Award, 
  Repeat, 
  CheckCircle2, 
  Printer, 
  Sliders, 
  Calendar, 
  Video, 
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BuyerToolsProps {
  language: 'en' | 'hi';
}

export const BuyerTools: React.FC<BuyerToolsProps> = ({
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'SAMPLE' | 'SIZE_MATRIX' | 'STAGGERED' | 'ESCROW_SPLIT' | 'TAX_EXEMPTION' | 'REORDER'>('SIZE_MATRIX');

  // Sample piece state
  const [sampleStatus, setSampleStatus] = useState<'NOT_REQUESTED' | 'DISPATCHED' | 'APPROVED'>('APPROVED');
  const [sampleFeedback, setSampleFeedback] = useState('Fabric quality is durable; twin seam stitch verified.');

  // Function 1: Size Distribution Matrix
  const [smallUnits, setSmallUnits] = useState(80);
  const [mediumUnits, setMediumUnits] = useState(140);
  const [largeUnits, setLargeUnits] = useState(80);
  const totalMatrixUnits = smallUnits + mediumUnits + largeUnits;

  // Function 2: Staggered Delivery Schedule
  const [batches, setBatches] = useState([
    { id: 1, units: 100, date: 'Oct 15, 2026', status: 'COMPLETED' },
    { id: 2, units: 100, date: 'Oct 20, 2026', status: 'IN_TRANSIT' },
    { id: 3, units: 100, date: 'Oct 25, 2026', status: 'SCHEDULED' }
  ]);

  // Escrow milestone releases
  const [milestone1Paid, setMilestone1Paid] = useState(true);
  const [milestone2Paid, setMilestone2Paid] = useState(false);
  const [milestone3Paid, setMilestone3Paid] = useState(false);

  const handleApproveSample = () => {
    setSampleStatus('APPROVED');
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleReleaseMilestone2 = () => {
    setMilestone2Paid(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  const handleReleaseMilestone3 = () => {
    setMilestone3Paid(true);
    confetti({ particleCount: 90, spread: 80 });
  };

  return (
    <div className="bg-white dark:bg-[#121215] rounded-[28px] border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-6 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-900">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Institutional Procurement Utilities
          </span>
          <h3 className="text-base font-extrabold mt-0.5">
            Buyer Trust & Batch Customization Suite
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full flex-wrap">
          <button
            onClick={() => setActiveTab('SIZE_MATRIX')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'SIZE_MATRIX'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Size Matrix
          </button>

          <button
            onClick={() => setActiveTab('STAGGERED')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'STAGGERED'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Delivery Batches
          </button>

          <button
            onClick={() => setActiveTab('SAMPLE')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'SAMPLE'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Sample Check
          </button>

          <button
            onClick={() => setActiveTab('ESCROW_SPLIT')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'ESCROW_SPLIT'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Payment Stages
          </button>

          <button
            onClick={() => setActiveTab('TAX_EXEMPTION')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'TAX_EXEMPTION'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            CSR Certificate
          </button>
        </div>
      </div>

      {/* Function 1: Size Distribution Matrix Builder */}
      {activeTab === 'SIZE_MATRIX' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Define exact student size breakdown. The consortium tailors will receive synchronized cutting templates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
              <span className="font-bold block">Small Size (Grade 1-2)</span>
              <p className="text-[11px] text-zinc-400">Chest 26-28 inch, Waist 22-24</p>
              <input
                type="number"
                value={smallUnits}
                onChange={(e) => setSmallUnits(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black font-bold text-sm"
              />
            </div>

            <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
              <span className="font-bold block">Medium Size (Grade 3-4)</span>
              <p className="text-[11px] text-zinc-400">Chest 30-32 inch, Waist 26-28</p>
              <input
                type="number"
                value={mediumUnits}
                onChange={(e) => setMediumUnits(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black font-bold text-sm"
              />
            </div>

            <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2">
              <span className="font-bold block">Large Size (Grade 5)</span>
              <p className="text-[11px] text-zinc-400">Chest 34-36 inch, Waist 30-32</p>
              <input
                type="number"
                value={largeUnits}
                onChange={(e) => setLargeUnits(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black font-bold text-sm"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold">
            <span>Total Units Configured:</span>
            <span className="font-mono text-base font-bold">{totalMatrixUnits} / 300 Uniforms</span>
          </div>
        </div>
      )}

      {/* Function 2: Staggered Multi-Batch Delivery Schedule */}
      {activeTab === 'STAGGERED' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Receive your bulk order in staggered phases rather than storing 300 items at once.
          </p>

          <div className="space-y-3 text-xs">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-zinc-400">
                    Phase 0{batch.id} Delivery
                  </span>
                  <h4 className="font-bold text-sm">{batch.units} Uniform Sets</h4>
                  <span className="text-zinc-500 font-mono text-[11px]">Target: {batch.date}</span>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold border border-zinc-300 dark:border-zinc-700">
                  {batch.status === 'COMPLETED' ? 'Delivered' : batch.status === 'IN_TRANSIT' ? 'In Transit' : 'Scheduled'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Function 3: Sample Piece Quality Inspection */}
      {activeTab === 'SAMPLE' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Review single prototype piece before approving 300 bulk batch.
          </p>

          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <span className="text-zinc-500">Sample Piece Spec:</span>
              <span className="font-bold">Uniform Set (Grade 3 Medium)</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <span className="text-zinc-500">Inspection Status:</span>
              <span className="font-bold text-black dark:text-white flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Sample Approved
              </span>
            </div>

            <button
              onClick={handleApproveSample}
              className="w-full py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs"
            >
              Sign Off Quality & Authorize Remaining 299 Sets
            </button>
          </div>
        </div>
      )}

      {/* Function 4: 3-Stage Milestone Payment */}
      {activeTab === 'ESCROW_SPLIT' && (
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-zinc-400">STAGE 1 (35%)</span>
              <h4 className="font-bold text-sm">Raw Material Advance (₹52,500)</h4>
            </div>
            <span className="font-bold">✓ Disbursed</span>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-zinc-400">STAGE 2 (40%)</span>
              <h4 className="font-bold text-sm">Mid-Production Check (₹60,000)</h4>
            </div>
            {milestone2Paid ? (
              <span className="font-bold">✓ Disbursed</span>
            ) : (
              <button
                onClick={handleReleaseMilestone2}
                className="px-3 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold"
              >
                Release ₹60k
              </button>
            )}
          </div>

          <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-zinc-400">STAGE 3 (25%)</span>
              <h4 className="font-bold text-sm">Final Delivery Handover (₹37,500)</h4>
            </div>
            {milestone3Paid ? (
              <span className="font-bold">✓ Finalized</span>
            ) : (
              <button
                onClick={handleReleaseMilestone3}
                className="px-3 py-1.5 rounded-full border border-black dark:border-white font-bold"
              >
                Release ₹37.5k
              </button>
            )}
          </div>
        </div>
      )}

      {/* Function 5: Tax Exemption & Ethical Procurement Certificate */}
      {activeTab === 'TAX_EXEMPTION' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 font-serif text-xs space-y-3">
            <h4 className="font-bold text-sm text-center">
              CERTIFICATE OF ETHICAL MICRO-ENTERPRISE PROCUREMENT
            </h4>
            <p className="font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Certified that <strong>Greenwood International School</strong> sourced 300 uniforms directly from verified women-led home micro-enterprises under Government Priority Sector Lending regulations.
            </p>
            <button
              onClick={() => window.print()}
              className="font-sans px-4 py-2 rounded-xl border border-black dark:border-white font-bold block mx-auto text-xs"
            >
              Print Official Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
