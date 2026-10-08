'use client';

import React, { useState } from 'react';
import { Cpu, Check, Copy, FileCode } from 'lucide-react';

interface DpiInspectorViewProps {
  language: 'en' | 'hi';
}

export const DpiInspectorView: React.FC<DpiInspectorViewProps> = ({
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'ONDC_BECKN' | 'OCEN_FINANCING'>('ONDC_BECKN');
  const [copied, setCopied] = useState(false);

  // Beckn Protocol Schema (ONDC)
  const becknPayload = {
    context: {
      domain: "nic2004:52110",
      country: "IND",
      city: "std:011",
      action: "on_search",
      core_version: "1.2.0",
      bap_id: "paytm-buyer-app.ondc.org",
      bap_uri: "https://paytm-buyer-app.ondc.org/protocol/v1",
      bpp_id: "samarthya-snp.delhi.ondc.org",
      bpp_uri: "https://samarthya-snp.delhi.ondc.org/bpp",
      transaction_id: "txn_samarthya_98231920",
      message_id: "msg_beckn_search_4812",
      timestamp: "2026-10-08T10:30:00.000Z"
    },
    message: {
      catalog: {
        "bpp/descriptor": {
          name: "Samarthya Seller Network Participant (SNP)",
          symbol: "https://samarthya.in/logo.png"
        },
        "bpp/providers": [
          {
            id: "ent-sunita",
            descriptor: {
              name: "Sunita Devi (Home Studio)",
              short_desc: "Master Tailor & Institutional Garments"
            },
            categories: [
              { id: "cat-tailoring", descriptor: { name: "Institutional Uniforms" } }
            ],
            items: [
              {
                id: "item-uniform-std",
                descriptor: {
                  name: "Custom School Uniform Set (Shirt + Trousers/Skirt)",
                  code: "HSN-6203"
                },
                price: { currency: "INR", value: "500.00" },
                category_id: "cat-tailoring",
                fulfillment_id: "ful-hyperlocal-rohini",
                tags: [
                  { code: "capacity", list: [{ code: "weekly_units", value: "40" }] },
                  { code: "consortium_eligible", list: [{ code: "enabled", value: "true" }] }
                ]
              }
            ]
          }
        ]
      }
    }
  };

  // OCEN Protocol Schema (Open Credit Enablement Network)
  const ocenPayload = {
    ocen_version: "2.0.1",
    request_type: "PURCHASE_ORDER_ESCROW_FINANCING",
    consent_handle: "aa_consent_de39281a-9821-4f10",
    borrower_profile: {
      applicant_name: "Sunita Devi",
      business_structure: "Sole Proprietorship / Informal Home Unit",
      udyam_assist_id: "UAP-DL-07-009124",
      verified_equipment: ["Juki DDL-8700 Industrial Lockstitch", "Interlock Overlock"],
      historical_fulfillment_rate: "98.2%"
    },
    underlying_contract: {
      order_id: "rfq-greenwood-300",
      buyer_institution: "Greenwood International School",
      consortium_pod_id: "POD-300-ROHINI",
      allocated_units: 100,
      contract_value_inr: 50000,
      escrow_locked_inr: 50000,
      escrow_agent: "OCEN Programmatic Trustee Account"
    },
    working_capital_advance: {
      eligible_advance_ratio: "0.35",
      advance_amount_inr: 17500,
      interest_subsidy_scheme: "PM Vishwakarma Section 4",
      net_annualized_interest: "5.0%",
      disbursement_mode: "DIRECT_SUPPLIER_ROHINI_FABRIC_DEPOT",
      status: "APPROVED_AND_DISBURSED"
    }
  };

  const currentJson = activeTab === 'ONDC_BECKN' ? becknPayload : ocenPayload;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 text-zinc-900 dark:text-zinc-100">
      {/* Top Banner - Clean Monochrome */}
      <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-white/30">
              <Cpu className="w-5 h-5 text-black dark:text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Digital Public Infrastructure (DPI)
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ONDC Beckn & OCEN Financing Schemas
              </h1>
            </div>
          </div>
          <p className="text-zinc-500 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Live open network data packets. Broadly syndicates home maker catalogs to nationwide buyer apps (Paytm, Magicpin) and verifies purchase orders for bank micro-lending.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 p-1.5 rounded-full border-2 border-black dark:border-white/30 shadow-2xs">
          <button
            onClick={() => setActiveTab('ONDC_BECKN')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'ONDC_BECKN'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            ONDC Beckn Protocol
          </button>
          <button
            onClick={() => setActiveTab('OCEN_FINANCING')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'OCEN_FINANCING'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            OCEN Advance Finance
          </button>
        </div>
      </div>

      {/* Main Inspector Box */}
      <div className="bg-white dark:bg-[#121215] rounded-[32px] p-6 sm:p-8 border-2 border-black dark:border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-sm">
                {activeTab === 'ONDC_BECKN'
                  ? 'ONDC Beckn Protocol Schema: on_search Broadcast Response'
                  : 'OCEN v2.0 Protocol: Purchase Order Working Capital Advance Payload'}
              </h3>
              <p className="text-xs text-zinc-500">
                {activeTab === 'ONDC_BECKN'
                  ? 'Broadcasts home entrepreneur catalog to buyer apps without vendor commission'
                  : 'Digital lien on confirmed escrow order unlocking 35% advance for raw materials'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-black dark:border-white/30 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied JSON!' : 'Copy Schema'}</span>
          </button>
        </div>

        {/* JSON Code Viewer */}
        <div className="relative rounded-2xl bg-zinc-950 p-4 font-mono text-xs text-zinc-200 border-2 border-black dark:border-zinc-800 overflow-x-auto max-h-[500px] shadow-inner">
          <pre>{JSON.stringify(currentJson, null, 2)}</pre>
        </div>

        {/* Technical Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-4 rounded-2xl border-2 border-black dark:border-white/30 bg-white dark:bg-zinc-900/40">
            <span className="font-bold block">1. Open Interoperability</span>
            <p className="text-zinc-500 mt-1">
              Complies with Beckn v1.2.0 specs, preventing proprietary platform lock-in.
            </p>
          </div>
          <div className="p-4 rounded-2xl border-2 border-black dark:border-white/30 bg-white dark:bg-zinc-900/40">
            <span className="font-bold block">2. Cashflow Lending</span>
            <p className="text-zinc-500 mt-1">
              Collateral-free micro-advances based purely on platform escrow purchase orders.
            </p>
          </div>
          <div className="p-4 rounded-2xl border-2 border-black dark:border-white/30 bg-white dark:bg-zinc-900/40">
            <span className="font-bold block">3. Direct Supplier Escrow</span>
            <p className="text-zinc-500 mt-1">
              Advances route directly to verified fabric mills, guaranteeing zero misuse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
