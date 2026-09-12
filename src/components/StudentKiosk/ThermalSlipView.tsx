import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { KioskMessage } from '../../types';
import { 
  Printer, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Clock, 
  EyeOff, 
  CheckCircle2, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ThermalSlipViewProps {
  onOpenPreview: (message: KioskMessage) => void;
}

export const ThermalSlipView: React.FC<ThermalSlipViewProps> = ({ onOpenPreview }) => {
  const { 
    currentStudent, 
    messages, 
    triggerPrint, 
    logoutStudent, 
    isPurged 
  } = useKiosk();

  const studentMessages = messages.filter(m => m.studentId === currentStudent?.id);
  const pendingMessages = studentMessages.filter(m => m.status === 'READY_TO_PRINT');

  const handlePrintClick = (msg: KioskMessage) => {
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch {}
    // Open the thermal slip modal directly as shown in Image 4!
    onOpenPreview(msg);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 px-4">
      {/* Student Profile Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Student Avatar */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-950 border border-purple-700/50 flex items-center justify-center text-2xl shadow-md">
            {currentStudent?.avatarEmoji || '👨‍🎓'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {currentStudent?.name || 'Ahmad Daniel Bin Razali'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#3b1236] text-pink-400 border border-pink-500/40">
                {currentStudent?.id || 'TEST01'}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              {currentStudent?.formClass || 'Form 4 Al-Khawarizmi'} &bull; {currentStudent?.dormRoom || 'Boys Dorm Block A (Room 104)'}
            </div>
          </div>
        </div>

        {/* Log Out Button */}
        <button
          onClick={logoutStudent}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#150d26] hover:bg-[#20143a] border border-purple-800/60 text-slate-300 hover:text-white text-xs font-semibold transition-all active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-400" />
          <span>Log Out</span>
        </button>
      </div>

      {/* ZERO-SCREEN MESSAGE EXPOSURE PROTOCOL Banner */}
      <div className="p-4 rounded-2xl bg-[#140b28]/80 border border-purple-800/50 flex items-start gap-3.5 shadow-md">
        <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-black text-pink-400 flex items-center gap-1 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-pink-400" />
              ZERO-SCREEN MESSAGE EXPOSURE PROTOCOL
            </span>
            <span className="px-2 py-0.2 rounded text-[9px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700 uppercase">
              SINGLE-USE PRINT
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            For complete student privacy, message contents are <strong className="text-white">NEVER displayed on this screen</strong>. Details are printed exclusively on your physical thermal receipt slip once.
          </p>
        </div>
      </div>

      {/* Message Status Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
            Your Message Status
          </h3>
          {pendingMessages.length > 0 && !isPurged && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#3d1235] text-pink-300 border border-pink-500/40">
              {pendingMessages.length} Pending
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-purple-300/70 font-mono">
          <EyeOff className="w-3.5 h-3.5 text-purple-400" />
          <span>Content hidden (Print to read)</span>
        </div>
      </div>

      {/* Main Status Container: Pending Cards vs "No Pending Messages" */}
      {pendingMessages.length > 0 && !isPurged ? (
        <div className="space-y-4">
          {pendingMessages.map((msg) => (
            <div
              key={msg.id}
              className="p-5 sm:p-6 rounded-3xl bg-[#140b28]/90 border border-purple-800/60 shadow-[0_0_25px_rgba(244,63,94,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="space-y-3 flex-1">
                {/* Sender & Status */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">
                    Message From: <span className="text-pink-300">{msg.parentName}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#11261e] text-emerald-300 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Ready to Print
                  </span>
                </div>

                {/* Encrypted payload box */}
                <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-950/80 font-mono text-xs text-slate-300 flex items-center gap-2 max-w-xl">
                  <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    [MESSAGE CONTENT ENCRYPTED] - Press Print to dispense your physical thermal receipt slip.
                  </span>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400/80">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Received: {msg.createdAt}</span>
                </div>
              </div>

              {/* Print Slip Button */}
              <div className="shrink-0">
                <button
                  onClick={() => handlePrintClick(msg)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 text-white font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip (Single-Use)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Image 5: "No Pending Messages" Screen */
        <div className="p-12 sm:p-16 rounded-3xl bg-[#140b28]/60 border border-purple-900/40 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Check className="w-7 h-7 text-cyan-400 stroke-[2.5]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            No Pending Messages
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            You have no pending messages. All prior messages have been printed and permanently cleared from the kiosk terminal.
          </p>
        </div>
      )}

    </div>
  );
};
