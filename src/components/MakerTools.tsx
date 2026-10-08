'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  FileText, 
  Calendar, 
  CheckSquare, 
  Check, 
  Plus, 
  Printer, 
  QrCode, 
  Scissors, 
  ShieldAlert, 
  Clock, 
  Users
} from 'lucide-react';
import { PodTask, EquipmentRentalListing } from '@/types';

interface MakerToolsProps {
  entrepreneurName: string;
  language: 'en' | 'hi';
}

export const MakerTools: React.FC<MakerToolsProps> = ({
  entrepreneurName,
  language,
}) => {
  const [activeTool, setActiveTool] = useState<'CALCULATOR' | 'RENTAL' | 'QR_KHATA' | 'INVOICE' | 'CAPACITY' | 'TASKS'>('CALCULATOR');

  // 1. Profit & Cost Calculator State
  const [fabricMeters, setFabricMeters] = useState(2.2);
  const [ratePerMeter, setRatePerMeter] = useState(120);
  const [accessoryCost, setAccessoryCost] = useState(45);
  const [laborHours, setLaborHours] = useState(2.5);
  const [hourlyWage, setHourlyWage] = useState(80);
  const [packagingCost, setPackagingCost] = useState(20);
  const [sellingPrice, setSellingPrice] = useState(500);

  const rawMaterialCost = fabricMeters * ratePerMeter + accessoryCost;
  const totalLaborCost = laborHours * hourlyWage;
  const totalItemCost = rawMaterialCost + totalLaborCost + packagingCost;
  const netProfitPerUnit = sellingPrice - totalItemCost;
  const profitMarginPercent = Math.round((netProfitPerUnit / sellingPrice) * 100);

  // 2. Equipment Sharing & Rental Listings State
  const [rentalListings] = useState<EquipmentRentalListing[]>([
    {
      id: 'eq-1',
      ownerName: 'Priya Sharma',
      ownerId: 'ent-priya',
      machineTitle: 'Singer Heavy Duty 4423 + Rotary Cutter',
      hourlyRate: 50,
      area: 'Pitampura (3.4 km)',
      availableHours: '9:00 AM - 2:00 PM',
      isAvailableNow: true
    },
    {
      id: 'eq-2',
      ownerName: 'Meena Kumari',
      ownerId: 'ent-meena',
      machineTitle: 'Jack F4 Computerized Embroidery Crest Frame',
      hourlyRate: 80,
      area: 'Shalimar Bagh (4.1 km)',
      availableHours: '3:00 PM - 8:00 PM',
      isAvailableNow: true
    }
  ]);

  // 3. Khata / Customer Ledger State
  const [khataEntries, setKhataEntries] = useState([
    { id: 1, customer: 'Mrs. Sharma (Parent)', items: '2 School Skirts', dueAmount: 900, status: 'PAID' },
    { id: 2, customer: 'Mr. Gupta (Teacher)', items: 'Blazer Alteration', dueAmount: 350, status: 'PENDING' }
  ]);
  const [newCustName, setNewCustName] = useState('');
  const [newCustAmt, setNewCustAmt] = useState(500);

  // 4. Hours & Capacity Planner
  const [dailyHours, setDailyHours] = useState(6);
  const [workingDays, setWorkingDays] = useState(6);
  const [isVacation, setIsVacation] = useState(false);

  // 5. Tasks Board State
  const [tasks, setTasks] = useState<PodTask[]>([
    { id: 't1', taskTitle: 'Procure 600m navy fabric from Rohini Mill Depot', assignedTo: 'Sunita Devi', status: 'COMPLETED', dueDate: 'Day 2' },
    { id: 't2', taskTitle: 'Cut patterns for 300 uniform sets using rotary cutter', assignedTo: 'Priya Sharma', status: 'IN_PROGRESS', dueDate: 'Day 5' },
    { id: 't3', taskTitle: 'Stitch 100 shirts on Juki Lockstitch', assignedTo: 'Sunita Devi', status: 'IN_PROGRESS', dueDate: 'Day 8' },
    { id: 't4', taskTitle: 'Embroider Greenwood Crest on 300 pocket monograms', assignedTo: 'Meena Kumari', status: 'TODO', dueDate: 'Day 10' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED' }
          : t
      )
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        taskTitle: newTaskTitle.trim(),
        assignedTo: entrepreneurName,
        status: 'TODO',
        dueDate: 'Day 12'
      }
    ]);
    setNewTaskTitle('');
  };

  const handleAddKhata = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) return;
    setKhataEntries([
      ...khataEntries,
      {
        id: Date.now(),
        customer: newCustName.trim(),
        items: 'Custom Stitching',
        dueAmount: newCustAmt,
        status: 'PENDING'
      }
    ]);
    setNewCustName('');
  };

  return (
    <div className="bg-white dark:bg-[#121215] rounded-[28px] border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm space-y-6 text-zinc-900 dark:text-zinc-100">
      {/* Tool Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-900">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Maker Studio Utilities
          </span>
          <h3 className="text-base font-extrabold mt-0.5">
            Operational Growth Tools
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full flex-wrap">
          <button
            onClick={() => setActiveTool('CALCULATOR')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTool === 'CALCULATOR'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Profit Calc
          </button>

          <button
            onClick={() => setActiveTool('RENTAL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTool === 'RENTAL'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Machine Rental
          </button>

          <button
            onClick={() => setActiveTool('QR_KHATA')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTool === 'QR_KHATA'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            UPI & Ledger
          </button>

          <button
            onClick={() => setActiveTool('INVOICE')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTool === 'INVOICE'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Delivery Slip
          </button>

          <button
            onClick={() => setActiveTool('TASKS')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTool === 'TASKS'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Team Tasks
          </button>
        </div>
      </div>

      {/* Tool 1: Profit Calculator */}
      {activeTool === 'CALCULATOR' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Enter material expenses to see your net margin before quoting a customer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Fabric (Meters)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={fabricMeters}
                    onChange={(e) => setFabricMeters(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Rate / Meter (₹)</label>
                  <input
                    type="number"
                    value={ratePerMeter}
                    onChange={(e) => setRatePerMeter(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Buttons & Threads (₹)</label>
                  <input
                    type="number"
                    value={accessoryCost}
                    onChange={(e) => setAccessoryCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Stitching Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={laborHours}
                    onChange={(e) => setLaborHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Hourly Labor Pay (₹)</label>
                  <input
                    type="number"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400">Net Take-Home Calculation</span>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between text-zinc-500">
                    <span>Fabric + Accessories:</span>
                    <span className="font-mono">₹{Math.round(rawMaterialCost)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Labor Cost:</span>
                    <span className="font-mono">₹{Math.round(totalLaborCost)}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between font-bold">
                    <span>Total Cost:</span>
                    <span className="font-mono">₹{Math.round(totalItemCost)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-500 text-[11px]">Net Profit per Piece:</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black">₹{Math.round(netProfitPerUnit)}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-black dark:border-white">
                    {profitMarginPercent}% Margin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: Equipment Sharing & Machine Rental Network */}
      {activeTool === 'RENTAL' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Borrow specialized machinery from nearby verified creators by the hour, or rent out your idle tools.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {rentalListings.map((rent) => (
              <div
                key={rent.id}
                className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">{rent.machineTitle}</span>
                  <span className="font-mono font-bold">₹{rent.hourlyRate}/hr</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Owner: {rent.ownerName} • {rent.area}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-zinc-400">Slots: {rent.availableHours}</span>
                  <button
                    onClick={() => alert(`Requested 2-hour rental slot for ${rent.machineTitle} from ${rent.ownerName}!`)}
                    className="px-3 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tool 3: Instant Micro-Payment UPI QR & Khata Customer Ledger */}
      {activeTool === 'QR_KHATA' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Accept direct UPI payments and maintain a simple customer ledger for your local clients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Direct UPI QR Card */}
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center space-y-2">
              <div className="w-32 h-32 rounded-xl border-2 border-black dark:border-white p-2 flex items-center justify-center bg-white">
                <QrCode className="w-24 h-24 text-black" />
              </div>
              <h4 className="font-bold text-sm">Sunita Devi Official UPI</h4>
              <p className="text-[11px] font-mono text-zinc-500">sunitadevi@okaxis</p>
              <span className="text-[10px] text-zinc-400">Zero transaction fees • Instant bank deposit</span>
            </div>

            {/* Customer Ledger */}
            <div className="space-y-3">
              <span className="font-bold block">Customer Balance Ledger (Khata)</span>
              <div className="space-y-2">
                {khataEntries.map((k) => (
                  <div
                    key={k.id}
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center"
                  >
                    <div>
                      <h5 className="font-bold">{k.customer}</h5>
                      <span className="text-[10px] text-zinc-500">{k.items}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold block">₹{k.dueAmount}</span>
                      <span className="text-[10px] uppercase font-semibold">{k.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddKhata} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Customer Name..."
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs"
                >
                  Add Entry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tool 4: Printable Delivery Slip */}
      {activeTool === 'INVOICE' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-zinc-500">Official printable delivery slip for buyer handoff.</p>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black dark:border-white text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-300 dark:border-zinc-700 font-mono text-xs space-y-3">
            <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <span className="font-bold">SAMARTHYA COOPERATIVE DISPATCH SLIP</span>
              <span>SLIP #DS-9912</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>From: Sunita Devi (Rohini Sec 7)</span>
              <span>To: Greenwood School (Rohini Sec 9)</span>
            </div>
            <div className="py-2 border-t border-b border-zinc-200 dark:border-zinc-800 flex justify-between">
              <span>Uniform Sets (Grade 1-5 Poly-Cotton) x 100</span>
              <span className="font-bold">₹50,000</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Delivery Verification OTP: <strong>* * 8 9</strong></span>
              <span>Authorized Signature: __________________</span>
            </div>
          </div>
        </div>
      )}

      {/* Tool 5: Team Tasks */}
      {activeTool === 'TASKS' && (
        <div className="space-y-3 text-xs">
          <p className="text-zinc-500">Shared tasks with your pod co-creators (Priya & Meena).</p>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                  task.status === 'COMPLETED'
                    ? 'border-zinc-200 dark:border-zinc-800 text-zinc-400 line-through'
                    : 'border-zinc-300 dark:border-zinc-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                    task.status === 'COMPLETED' ? 'bg-black dark:bg-white text-white dark:text-black' : ''
                  }`}>
                    {task.status === 'COMPLETED' && <Check className="w-3 h-3" />}
                  </div>
                  <span>{task.taskTitle}</span>
                </div>
                <span className="text-[11px] text-zinc-400">{task.assignedTo}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddTask} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs"
            >
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
