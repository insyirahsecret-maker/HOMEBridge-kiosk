import React, { useState } from 'react';
import { useKiosk } from '../context/KioskContext';
import { MessageComposer } from './ParentPortal/MessageComposer';
import { KeypadLogin } from './StudentKiosk/KeypadLogin';
import { ThermalSlipView } from './StudentKiosk/ThermalSlipView';
import { KioskIdleView } from './StudentKiosk/KioskIdleView';
import { KioskMessage } from '../types';
import { Smartphone, Tv, Sparkles, Radio } from 'lucide-react';

interface LiveDualDemoViewProps {
  onOpenPreview: (msg: KioskMessage) => void;
}

export const LiveDualDemoView: React.FC<LiveDualDemoViewProps> = ({ onOpenPreview }) => {
  const { 
    currentParent, 
    currentStudent, 
    kioskScreen, 
    messages, 
    students 
  } = useKiosk();

  const [activeParentTab, setActiveParentTab] = useState<'compose' | 'sent'>('compose');

  const pendingMessages = messages.filter(m => m.status === 'READY_TO_PRINT');

  return (
    <div className="max-w-7xl mx-auto space-y-4 px-2 sm:px-4">
      {/* Top Dual Demo Banner */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#140b28] border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-cyan-400 p-0.5">
            <div className="w-full h-full bg-[#0e071e] rounded-[6px] flex items-center justify-center">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">LIVE DUAL DEMO ENVIRONMENT</span>
              <span className="px-2 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/50 text-[10px] font-mono font-bold">
                REAL-TIME SYNC
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Compose on Parent Portal (Left) &bull; Watch immediate reception &amp; thermal print on Student Kiosk (Right)
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Buffer Queue: <strong>{pendingMessages.length} Pending</strong></span>
        </div>
      </div>

      {/* Side-by-Side Dual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Parent Portal */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-pink-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                1. Parent Portal (Sender)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded border border-pink-800">
              Mobile View Simulation
            </span>
          </div>

          <div className="bg-[#120a24]/90 border border-pink-500/30 rounded-3xl p-5 shadow-lg">
            <MessageComposer />
          </div>
        </div>

        {/* Right Column: Student Kiosk Terminal */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-900/40">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                2. Student Kiosk Terminal (Receiver)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
              Terminal Screen Simulation
            </span>
          </div>

          <div className="bg-[#120a24]/90 border border-cyan-500/30 rounded-3xl p-5 shadow-lg min-h-[500px] flex flex-col justify-center">
            {kioskScreen === 'idle' && <KioskIdleView />}
            {kioskScreen === 'keypad' && <KeypadLogin />}
            {kioskScreen === 'authenticated' && <ThermalSlipView onOpenPreview={onOpenPreview} />}
          </div>
        </div>

      </div>
    </div>
  );
};
