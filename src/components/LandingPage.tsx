import React from 'react';
import { useKiosk } from '../context/KioskContext';
import { 
  Tv, 
  Smartphone, 
  ShieldCheck, 
  Lock, 
  Printer, 
  School, 
  ArrowRight, 
  Settings,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { goToKiosk, goToParent, goToAdmin, messages, students } = useKiosk();

  const pendingCount = messages.filter(m => m.status === 'READY_TO_PRINT').length;

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-between py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      
      {/* Corner Navigation: Admin Portal */}
      <div className="flex items-center justify-between w-full pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-cyan-400 p-0.5 shadow-[0_0_12px_rgba(244,63,94,0.4)]">
            <div className="w-full h-full bg-[#0d091a] rounded-[9px] flex items-center justify-center">
              <School className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline font-bold tracking-tight">
              <span className="text-pink-500 font-black text-lg">HOME</span>
              <span className="text-cyan-400 font-black text-lg">Bridge</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider uppercase">
              SBP INTEGRASI KUANTAN (INTEK)
            </div>
          </div>
        </div>

        {/* Small Admin Navigation Button in corner */}
        <button
          onClick={goToAdmin}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160d2e] hover:bg-[#231547] border border-purple-800/60 text-slate-400 hover:text-cyan-300 text-xs font-mono font-medium transition-all shadow-sm"
        >
          <Settings className="w-3.5 h-3.5 text-slate-400" />
          <span>Warden &amp; Admin Portal</span>
        </button>
      </div>

      {/* Main Hero Header */}
      <div className="text-center my-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1b0e38] border border-pink-500/40 text-xs font-mono text-pink-300 shadow-sm">
          <Lock className="w-3.5 h-3.5 text-pink-400" />
          <span>MAXIMUM PRIVACY PROTOCOL &bull; ZERO-SCREEN EXPOSURE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Boarding School <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Communication Terminal</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          A secure communication platform connecting families with boarding students at SBP Integrasi Kuantan. Messages are printed directly onto private single-use thermal receipt slips — with zero on-screen exposure.
        </p>
      </div>

      {/* The 2 Primary Entrance Cards (Student Kiosk & Parent Portal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        
        {/* CARD 1: Student Kiosk */}
        <div
          onClick={goToKiosk}
          className="group relative p-8 rounded-3xl bg-gradient-to-b from-[#160e2e]/90 to-[#0e071e]/90 border-2 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_45px_rgba(6,182,212,0.35)] transition-all cursor-pointer flex flex-col justify-between active:scale-[0.99]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform">
                <Tv className="w-7 h-7" />
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                TERMINAL READY
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                Student Kiosk
              </h2>
              <div className="text-xs font-mono text-cyan-400 font-semibold mb-2">
                BOARDING STUDENT ENTRANCE
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Log in using your <strong>Student ID &amp; 4-Digit PIN</strong>. Check your message status and print your private physical thermal receipt (Single-Use).
              </p>
            </div>

            {/* Privacy Feature Highlights */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-[#0d071a] px-2.5 py-1 rounded-lg border border-purple-900/50">
                <Printer className="w-3 h-3 text-cyan-400" />
                POS 58mm/80mm
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-[#0d071a] px-2.5 py-1 rounded-lg border border-purple-900/50">
                <Lock className="w-3 h-3 text-pink-400" />
                Zero-Screen Privacy
              </span>
            </div>
          </div>

          {/* Action button inside card */}
          <div className="mt-8 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300">
            <span>Open Student Kiosk</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* CARD 2: Parent Portal */}
        <div
          onClick={goToParent}
          className="group relative p-8 rounded-3xl bg-gradient-to-b from-[#1a0c2c]/90 to-[#0e071e]/90 border-2 border-pink-500/40 hover:border-pink-400 shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:shadow-[0_0_45px_rgba(244,63,94,0.35)] transition-all cursor-pointer flex flex-col justify-between active:scale-[0.99]"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-pink-950/60 border border-pink-500/50 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.3)] group-hover:scale-105 transition-transform">
                <Smartphone className="w-7 h-7" />
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-pink-950/80 text-pink-300 border border-pink-500/40">
                <Sparkles className="w-3 h-3 text-pink-400" />
                DISPATCH ONLINE
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-pink-300 transition-colors">
                Parent Portal
              </h2>
              <div className="text-xs font-mono text-pink-400 font-semibold mb-2">
                PARENT &amp; GUARDIAN ENTRANCE
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Log in to select your child, compose a message (or use quick templates), and track live print status in real time.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-[#0d071a] px-2.5 py-1 rounded-lg border border-purple-900/50">
                ⚡ Quick Templates
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-[#0d071a] px-2.5 py-1 rounded-lg border border-purple-900/50">
                🟢 Live Print Tracking
              </span>
            </div>
          </div>

          {/* Action button inside card */}
          <div className="mt-8 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono font-bold text-pink-400 group-hover:text-pink-300">
            <span>Enter Parent Portal</span>
            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-pink-400" />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Info & Protocol Badge */}
      <div className="pt-4 border-t border-purple-950/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>SBP Integrasi Kuantan &bull; Boarding School Communication Kiosk System</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Current Queue: <strong className="text-cyan-400">{pendingCount} Message(s) Ready</strong>
        </div>
      </div>

    </div>
  );
};
