import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { soundEngine } from '../../utils/audio';
import { 
  Tv, 
  Lock, 
  ShieldCheck, 
  Printer, 
  LogOut, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles, 
  Delete,
  MailCheck,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const KioskTerminal: React.FC = () => {
  const {
    students,
    selectedStudentId,
    setSelectedStudentId,
    pinInput,
    setPinInput,
    pinError,
    authenticateStudent,
    logoutStudent,
    currentStudent,
    kioskStep,
    setKioskStep,
    setKioskScreen,
    messages,
    triggerThermalPrint,
    completeThermalPrint,
    isPurged,
    goToLanding
  } = useKiosk();

  const [isShaking, setIsShaking] = useState(false);

  // Messages for currently logged in student
  const studentMessages = messages.filter(m => m.studentId === currentStudent?.id);
  const pendingMessages = studentMessages.filter(m => m.status === 'READY_TO_PRINT');
  const activePendingMessage = pendingMessages[0] || null;

  // Keypad press handler
  const handleKeypadPress = (val: string) => {
    soundEngine.playKeypadBeep();

    if (val === 'CLEAR') {
      setPinInput('');
      return;
    }

    if (val === 'BACK') {
      setPinInput(prev => prev.slice(0, -1));
      return;
    }

    if (pinInput.length < 4) {
      const nextPin = pinInput + val;
      setPinInput(nextPin);

      if (nextPin.length === 4) {
        setTimeout(() => {
          const success = authenticateStudent(nextPin);
          if (!success) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
          }
        }, 120);
      }
    }
  };

  const handlePrintClick = () => {
    if (!activePendingMessage) return;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    triggerThermalPrint(activePendingMessage);
  };

  const handleSimulatePrint = () => {
    if (!activePendingMessage) return;
    completeThermalPrint(activePendingMessage.id);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      
      {/* Top Bar with Navigation Back to Home */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-900/40">
        <button
          onClick={goToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#140b28] hover:bg-[#201240] border border-purple-800/50 text-slate-300 hover:text-white text-xs font-mono transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>KIOSK TERMINAL #01 &bull; SBP INTEGRASI KUANTAN</span>
        </div>
      </div>

      {/* STEP 0: IDLE SCREEN – Welcome & Touch to Continue */}
      {kioskStep === 'idle' && (
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
          <h2 className="text-2xl font-black text-white tracking-tight text-center">
            Boarding Kiosk Terminal
          </h2>
          <p className="text-sm text-slate-400 text-center max-w-sm">
            Touch the screen to begin login. Your messages will be printed securely on a private receipt.
          </p>
          <button
            onClick={() => {
              // Move to keypad login step
              setKioskStep('keypad');
              setKioskScreen('keypad');
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:from-pink-400 hover:to-cyan-300 transition-all"
          >
            Touch to Login
          </button>
        </div>
      )}

      {/* STEP 1: KEYPAD LOGIN */}
      {kioskStep === 'keypad' && (
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-bold uppercase">
              <Tv className="w-3.5 h-3.5" />
              Touch Keypad Login
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Select Student ID &amp; Enter PIN
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Select your name card below and enter your 4-digit security PIN
            </p>
          </div>

          {/* Student Selector Pills */}
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            {students.map((s) => {
              const isSelected = s.id === selectedStudentId;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    soundEngine.playKeypadBeep();
                    setSelectedStudentId(s.id);
                    setPinInput('');
                  }}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold font-mono transition-all text-left flex items-center justify-between border ${
                    isSelected
                      ? 'bg-pink-500 border-pink-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-102'
                      : 'bg-[#140b28] border-purple-900/50 text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="truncate">{s.id} ({s.shortName || s.name.split(' ')[0]})</span>
                  <span className="text-[10px] opacity-75">{s.avatarEmoji || '🎓'}</span>
                </button>
              );
            })}
          </div>

          {/* Active ID Display */}
          <div className="w-full max-w-[300px] mx-auto py-2 px-4 rounded-xl bg-[#0e071e] border border-cyan-500/50 text-center font-mono font-black text-lg tracking-widest text-cyan-300 shadow-inner">
            {selectedStudentId}
          </div>

          {/* 4 PIN Slot Indicators */}
          <div className={`flex justify-center items-center gap-3.5 ${isShaking ? 'animate-bounce' : ''}`}>
            {[0, 1, 2, 3].map((index) => {
              const hasDigit = pinInput.length > index;
              return (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                    hasDigit
                      ? 'border-pink-500 bg-[#1e0f38] shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105'
                      : 'border-purple-800/60 bg-[#120a24]'
                  }`}
                >
                  {hasDigit && (
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff] animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          {/* PIN Error feedback */}
          {pinError && (
            <div className="text-center text-xs font-mono text-rose-400 animate-pulse">
              {pinError}
            </div>
          )}

          {/* Tactile Keypad (3x4) */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                key={num}
                onClick={() => handleKeypadPress(num)}
                className="h-12 rounded-2xl bg-[#18112e] hover:bg-[#231842] active:bg-cyan-500/30 border border-purple-900/50 text-cyan-300 font-mono font-bold text-xl flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handleKeypadPress('CLEAR')}
              className="h-12 rounded-2xl bg-[#18112e] hover:bg-rose-950/40 border border-purple-900/50 text-slate-300 hover:text-rose-400 font-sans text-xs font-bold flex items-center justify-center transition-all active:scale-95"
            >
              Clear
            </button>

            <button
              onClick={() => handleKeypadPress('0')}
              className="h-12 rounded-2xl bg-[#18112e] hover:bg-[#231842] active:bg-cyan-500/30 border border-purple-900/50 text-cyan-300 font-mono font-bold text-xl flex items-center justify-center transition-all shadow-md active:scale-95"
            >
              0
            </button>

            <button
              onClick={() => handleKeypadPress('BACK')}
              className="h-12 rounded-2xl bg-[#18112e] hover:bg-amber-950/40 border border-purple-900/50 text-cyan-300 hover:text-amber-400 font-mono flex items-center justify-center transition-all active:scale-95"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Login Button */}
          <div className="max-w-[280px] mx-auto">
            <button
              onClick={() => {
                if (pinInput.length === 4) {
                  authenticateStudent(pinInput);
                }
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 text-white font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-98 transition-all cursor-pointer"
            >
              Log In to Kiosk
            </button>
          </div>

          <div className="text-center text-[11px] font-mono text-cyan-400 pt-1">
            Demo PIN: <span className="text-white font-bold tracking-widest">0000</span> (or <span className="text-white font-bold">1234</span>)
          </div>
        </div>
      )}

      {/* STEP 2: MAXIMUM PRIVACY PROTOCOL (AUTHENTICATED STUDENT SCREEN) */}
      {/* NO MESSAGE PREVIEW ON PUBLIC SCREEN - STRICTLY AS REQUESTED */}
      {kioskStep === 'authenticated' && currentStudent && (
        <div className="space-y-6">
          
          {/* Student Header Bar */}
          <div className="p-4 rounded-2xl bg-[#140b28] border border-purple-800/60 flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-950 border border-purple-700/50 flex items-center justify-center text-2xl shadow-inner">
                {currentStudent.avatarEmoji || '👨‍🎓'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {currentStudent.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#3b1236] text-pink-400 border border-pink-500/40">
                    {currentStudent.id}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {currentStudent.formClass} &bull; {currentStudent.dormRoom}
                </div>
              </div>
            </div>

            <button
              onClick={logoutStudent}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1d1038] hover:bg-[#2c1854] border border-purple-800/60 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Maximum Privacy Protocol Banner */}
          <div className="p-4 rounded-2xl bg-[#130926]/90 border border-pink-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-start gap-3">
            <div className="p-2 rounded-xl bg-pink-950/60 border border-pink-500/40 text-pink-400 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-pink-400 tracking-wider uppercase">
                  MAXIMUM PRIVACY PROTOCOL &bull; ZERO-SCREEN EXPOSURE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                To protect student privacy, <strong>message content is NOT displayed on the public kiosk screen</strong>. Messages are printed exclusively onto your private physical thermal receipt slip.
              </p>
            </div>
          </div>

          {/* Main Status Container */}
          {pendingMessages.length > 0 && !isPurged ? (
            /* IF THERE ARE PENDING MESSAGES: ONLY SHOW STATUS INDICATOR & PRINT BUTTON */
            <div className="p-8 sm:p-10 rounded-3xl bg-[#140b28] border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.2)] text-center space-y-6">
              
              {/* Glowing Mail Indicator */}
              <div className="w-20 h-20 rounded-3xl bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35)] animate-pulse">
                <MailCheck className="w-10 h-10" />
              </div>

              {/* Status Indicator Title */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/50 text-xs font-mono font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  STATUS: MESSAGE READY TO PRINT
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  You Have <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">[{pendingMessages.length}] New Message(s)</span> Ready
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  (You have {pendingMessages.length} new message(s) sent by your family)
                </p>
              </div>

              {/* Privacy Notice */}
              <div className="p-3 rounded-xl bg-[#0c0618] border border-purple-900/50 text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
                <EyeOff className="w-4 h-4 text-purple-400" />
                <span>Message content is fully protected &amp; hidden from the screen display.</span>
              </div>

              {/* THE SOLE PRIMARY BUTTON: Print Slip (Single-Use) */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
                <button
                  onClick={handlePrintClick}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 text-white font-black text-base font-mono uppercase tracking-wider shadow-[0_0_30px_rgba(244,63,94,0.5)] active:scale-98 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Printer className="w-6 h-6" />
                  <span>Print Slip (Single-Use)</span>
                </button>

                {/* Secondary quick-test button */}
                <button
                  onClick={handleSimulatePrint}
                  className="text-xs font-mono text-slate-400 hover:text-cyan-300 underline transition-colors"
                >
                  [ Simulate Print &amp; Auto-Clear Test ]
                </button>
              </div>

            </div>
          ) : (
            /* IF NO PENDING MESSAGES (OR JUST PURGED): "No Pending Messages" */
            <div className="p-10 sm:p-14 rounded-3xl bg-[#140b28]/70 border border-purple-900/50 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(6,182,212,0.25)] text-cyan-400">
                <CheckCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                No Pending Messages
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-sans">
                No pending messages found. All messages have been successfully printed to a physical receipt slip and <strong className="text-slate-200">immediately cleared from kiosk screen memory</strong>.
              </p>

              <div className="pt-4">
                <button
                  onClick={logoutStudent}
                  className="px-6 py-2.5 rounded-xl bg-[#1c1038] hover:bg-[#291752] border border-purple-800 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all"
                >
                  Done &amp; Log Out
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
