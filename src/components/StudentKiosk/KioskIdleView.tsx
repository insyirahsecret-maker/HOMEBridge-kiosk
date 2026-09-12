import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { soundEngine } from '../../utils/audio';
import { MessageSquare, Lock, ShieldCheck, BookOpen, Monitor } from 'lucide-react';

export const KioskIdleView: React.FC = () => {
  const { setKioskScreen, messages, setIsPosterModalOpen } = useKiosk();

  const pendingMessages = messages.filter(m => m.status === 'READY_TO_PRINT');
  const pendingCount = pendingMessages.length;

  const handleCardClick = () => {
    soundEngine.playKeypadBeep();
    setKioskScreen('keypad');
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
      
      {/* Top Floating Kiosk Device Icon */}
      <div className="mb-4 relative">
        <div className="w-16 h-16 rounded-2xl bg-[#140b27] border border-cyan-500/40 p-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center">
          <Monitor className="w-9 h-9 text-cyan-400" />
        </div>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899] animate-ping"></span>
      </div>

      {/* Brand Title */}
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
        <span className="text-pink-500">HOME</span>
        <span className="text-cyan-400">Bridge</span>
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
        Boarding School Kiosk Terminal - Tap below to enter your Student ID &amp; PIN to dispense your physical message slip
      </p>

      {/* Big Central Interactive Card */}
      <div
        onClick={handleCardClick}
        className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-[#140b28]/80 border-2 border-pink-500/40 hover:border-pink-400 shadow-[0_0_35px_rgba(236,72,153,0.25)] hover:shadow-[0_0_50px_rgba(236,72,153,0.4)] transition-all cursor-pointer group active:scale-98"
      >
        {/* Message bubble icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/30 border border-pink-500/50 flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(236,72,153,0.3)] group-hover:scale-105 transition-transform">
          <MessageSquare className="w-8 h-8 text-pink-400" />
        </div>

        {/* Card Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          Tap to Login &amp; Check Messages
        </h2>

        {/* Card Instruction */}
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Authenticate with your Student ID &amp; 4-Digit PIN on the touch keypad
        </p>

        {/* Protocol Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-950/80 text-pink-300 border border-pink-500/40">
            <Lock className="w-3.5 h-3.5 text-pink-400" />
            ZERO-SCREEN PRIVACY
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            SINGLE-USE THERMAL SLIP
          </span>
        </div>

        {/* Pending Messages Indicator Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#240e3a] border border-pink-500/30 text-xs font-mono text-pink-200">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
          <span>{pendingCount} Pending Message(s) Available</span>
        </div>
      </div>

      {/* Footer link to research specs & poster */}
      <button
        onClick={() => setIsPosterModalOpen(true)}
        className="mt-8 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
      >
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span>View Research Poster &amp; Innovation Specs &gt;</span>
      </button>

    </div>
  );
};
