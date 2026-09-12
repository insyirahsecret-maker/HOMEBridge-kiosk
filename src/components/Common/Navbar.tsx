import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { 
  X, 
  Tv, 
  Smartphone, 
  Columns, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Home
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isMuted, 
    toggleSound, 
    language, 
    toggleLanguage,
    isFullscreen,
    toggleFullscreen,
    resetToDefaults,
    setIsPosterModalOpen,
    kioskScreen,
    setKioskScreen,
    logoutStudent
  } = useKiosk();

  const handleResetKiosk = () => {
    if (window.confirm('Reset terminal to default home screen?')) {
      logoutStudent();
      setKioskScreen('idle');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0816]/90 backdrop-blur-md border-b border-pink-900/30 px-3 sm:px-6 py-2.5 no-print transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Close icon + School Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleResetKiosk}
            className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            title="Reset to Idle Screen"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('kiosk'); setKioskScreen('idle'); }}>
            {/* Glowing House / Bridge Icon */}
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 to-cyan-400 p-[1.5px] shadow-[0_0_12px_rgba(244,63,94,0.4)]">
              <div className="w-full h-full bg-[#0d091a] rounded-[6.5px] flex items-center justify-center">
                <Home className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline font-bold tracking-tight">
                <span className="text-pink-500 font-extrabold text-base">HOME</span>
                <span className="text-cyan-400 font-extrabold text-base">Bridge</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono leading-none">
                <span className="text-cyan-300 font-semibold tracking-wider uppercase">SBP INTEGRASI KUANTAN</span>
                <span className="text-slate-500 hidden sm:inline">&bull; One-Way School Kiosk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Module Navigation Pills */}
        <nav className="flex items-center bg-[#130d24]/90 p-1 rounded-full border border-purple-900/40 shadow-inner">
          {/* Student Kiosk */}
          <button
            onClick={() => setActiveTab('kiosk')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'kiosk'
                ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Student Kiosk</span>
          </button>

          {/* Parent Portal */}
          <button
            onClick={() => setActiveTab('parent')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'parent'
                ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Parent Portal</span>
          </button>

          {/* Live Dual Demo */}
          <button
            onClick={() => setActiveTab('dual_demo')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'dual_demo'
                ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Dual Demo</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/50 text-[9px] font-black uppercase tracking-wider">
              LIVE
            </span>
          </button>

          {/* Poster & Admin */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Poster &amp; Admin</span>
          </button>
        </nav>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language selector */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#140e26] border border-purple-900/40 text-xs text-slate-300 hover:text-white hover:border-pink-500/40 font-mono transition-all"
            title="Toggle Language"
          >
            <span>{language === 'EN' ? '🇬🇧 EN' : '🇲🇾 BM'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-rose-950/40 border-rose-900 text-rose-400'
                : 'bg-[#140e26] border-purple-900/40 text-cyan-400 hover:text-cyan-300'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset Demo State */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demo messages, students, and dispatches to factory defaults?')) {
                resetToDefaults();
              }
            }}
            className="w-8 h-8 rounded-lg bg-[#140e26] border border-purple-900/40 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 flex items-center justify-center transition-all"
            title="Reset All Demo Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-lg bg-[#140e26] border border-purple-900/40 text-slate-400 hover:text-pink-400 hover:border-pink-500/40 flex items-center justify-center transition-all"
            title="Toggle Fullscreen Kiosk Mode"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </header>
  );
};
