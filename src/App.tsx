import React from 'react';
import { KioskProvider, useKiosk } from './context/KioskContext';
import { LandingPage } from './components/LandingPage';
import { KioskTerminal } from './components/StudentKiosk/KioskTerminal';
import { ParentPortal } from './components/ParentPortal/ParentPortal';
import { AdminPortal } from './components/AdminPortal/AdminPortal';
import { ThermalSlip } from './components/StudentKiosk/ThermalSlip';
import { Tv, Smartphone, ShieldCheck, Home, RotateCcw } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    currentView, 
    goToLanding, 
    goToKiosk, 
    goToParent, 
    goToAdmin,
    activePrintSlip, 
    students,
    resetToDefaults
  } = useKiosk();

  const printSlipStudent = activePrintSlip 
    ? students.find(s => s.id === activePrintSlip.studentId)
    : null;

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Universal Floating Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0c071d]/90 backdrop-blur-md border-b border-purple-900/30 px-3 sm:px-6 py-2.5 no-print transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          
          {/* Brand Logo & Home Link */}
          <div 
            onClick={goToLanding}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-cyan-400 p-0.5 shadow-[0_0_12px_rgba(244,63,94,0.4)]">
              <div className="w-full h-full bg-[#0d091a] rounded-[9px] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Home className="w-4 h-4 text-cyan-400" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline font-bold tracking-tight">
                <span className="text-pink-500 font-black text-base">HOME</span>
                <span className="text-cyan-400 font-black text-base">Bridge</span>
              </div>
              <div className="text-[9px] font-mono text-cyan-300 font-semibold tracking-wider uppercase">
                SBP INTEGRASI KUANTAN
              </div>
            </div>
          </div>

          {/* Quick Portal Switcher Pills */}
          <nav className="flex items-center bg-[#140b28] p-1 rounded-full border border-purple-900/50 shadow-inner">
            <button
              onClick={goToLanding}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                currentView === 'landing'
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <button
              onClick={goToKiosk}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                currentView === 'kiosk'
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student Kiosk</span>
            </button>

            <button
              onClick={goToParent}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                currentView === 'parent'
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Parent Portal</span>
            </button>
          </nav>

          {/* Right Side: Reset demo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data for SBP Integrasi Kuantan?')) {
                  resetToDefaults();
                }
              }}
              className="p-1.5 rounded-lg bg-[#150c2c] border border-purple-900/40 text-slate-400 hover:text-cyan-300 transition-all text-xs flex items-center gap-1 font-mono"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-6xl mx-auto py-4 sm:py-6 no-print">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'kiosk' && <KioskTerminal />}
        {currentView === 'parent' && <ParentPortal />}
        {currentView === 'admin' && <AdminPortal />}
      </main>

      {/* Dedicated Print Target strictly for POS 58mm/80mm Thermal Receipts (@media print) */}
      {activePrintSlip && (
        <div className="hidden print:block">
          <ThermalSlip
            message={activePrintSlip}
            student={printSlipStudent}
          />
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <KioskProvider>
      <AppContent />
    </KioskProvider>
  );
};

export default App;
