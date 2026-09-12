import React from 'react';
import { useKiosk } from '../context/KioskContext';
import { X, Award, Shield, FileText, Cpu, Printer, Lock } from 'lucide-react';

export const ResearchPosterModal: React.FC = () => {
  const { isPosterModalOpen, setIsPosterModalOpen } = useKiosk();

  if (!isPosterModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#120a24] border border-cyan-500/50 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#170e2e] border-b border-purple-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-cyan-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0e071e] rounded-[10px] flex items-center justify-center">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                RESEARCH POSTER &amp; INNOVATION SPECIFICATIONS
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                Sekolah Berasrama Penuh Integrasi Kuantan (INTEK) &bull; Innovation Showcase
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPosterModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-[#1e133a] hover:bg-[#2c1b54] text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Poster Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          
          {/* Main Title Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-[#180e30] to-cyan-950/80 border border-purple-800/60 text-center space-y-2">
            <div className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">
              NATIONAL BOARDING SCHOOL INNOVATION COMPETITION
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              HOMEBridge: Zero-Screen Privacy Communication Kiosk
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              A secure, single-use POS thermal slip terminal enabling confidential parent-student communication under zero-smartphone boarding school protocols.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            {/* Pillar 1 */}
            <div className="p-4 rounded-2xl bg-[#170e2d] border border-pink-500/30 space-y-2">
              <div className="flex items-center gap-2 text-pink-400 font-bold">
                <Lock className="w-4 h-4" />
                <span>1. Problem Statement</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Full boarding school students (SBP) are prohibited from possessing smartphones to preserve academic focus. However, urgent notices, pocket money confirmations, and clinic updates often faced delays or public loudspeaker exposure.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-2xl bg-[#170e2d] border border-cyan-500/30 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Shield className="w-4 h-4" />
                <span>2. Zero-Screen Protocol</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Unlike regular screens where peers can read over a student's shoulder, HOMEBridge keeps message payloads encrypted on-screen. Content is exclusively transferred onto a high-contrast thermal receipt slip.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-2xl bg-[#170e2d] border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Printer className="w-4 h-4" />
                <span>3. POS Thermal Medium</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Leveraging standard 58mm/80mm thermal receipt printer hardware. No expensive screens or ink required. Server immediately wipes the memory buffer upon print completion (<code className="text-cyan-400">window.onafterprint</code>).
              </p>
            </div>
          </div>

          {/* System Architecture Diagram */}
          <div className="p-5 rounded-2xl bg-[#0d071a] border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-slate-400 uppercase font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Technical Workflow Architecture
            </div>
            <div className="p-4 rounded-xl bg-[#120924] border border-purple-950 text-slate-300 leading-relaxed">
              <div className="text-cyan-400 font-bold mb-1">[Parent Portal]</div>
              &rarr; Composes message with preset templates (Urgent Family Notice, Outing Schedule, Allowance)<br/>
              &rarr; Dispatches payload via HTTPS with AES-256 token (<span className="text-pink-400">MSG-MSG-XX</span>)<br/><br/>
              <div className="text-cyan-400 font-bold mb-1">[Student Kiosk Terminal]</div>
              &rarr; Student taps 4-digit PIN on tactile keypad<br/>
              &rarr; Zero-Screen privacy buffer stages incoming dispatch in memory<br/>
              &rarr; Student presses <span className="text-white bg-pink-600 px-1 py-0.5 rounded">Print Slip (Single-Use)</span><br/>
              &rarr; Physical POS slip dispenses &bull; Transient screen buffer is irreversibly purged!
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#170e2e] border-t border-purple-900/60 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">SBP Integrasi Kuantan &copy; Innovation Hub</span>
          <button
            onClick={() => setIsPosterModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono transition-all shadow-md"
          >
            Close Specs Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
