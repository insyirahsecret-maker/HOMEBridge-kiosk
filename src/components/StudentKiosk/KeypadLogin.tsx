import React, { useState, useEffect } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { soundEngine } from '../../utils/audio';
import { Delete, ArrowLeft } from 'lucide-react';

export const KeypadLogin: React.FC = () => {
  const {
    students,
    selectedStudentId,
    setSelectedStudentId,
    pinInput,
    setPinInput,
    pinError,
    authenticateStudent,
    setKioskScreen
  } = useKiosk();

  const [isShaking, setIsShaking] = useState(false);

  // Default to TEST01 if not set
  useEffect(() => {
    if (!selectedStudentId && students.length > 0) {
      setSelectedStudentId(students[0].id);
    }
  }, [students, selectedStudentId, setSelectedStudentId]);

  const handleKeypadPress = (val: string) => {
    soundEngine.playKeypadBeep();

    if (val === 'CLEAR') {
      setPinInput('');
      return;
    }

    if (val === 'BACK') {
      setPinInput(pinInput.slice(0, -1));
      return;
    }

    if (pinInput.length < 4) {
      const nextPin = pinInput + val;
      setPinInput(nextPin);

      // Auto-submit when 4th digit is entered
      if (nextPin.length === 4) {
        setTimeout(() => {
          const success = authenticateStudent(nextPin);
          if (!success) {
            triggerShake();
          }
        }, 120);
      }
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleSubmit = () => {
    if (pinInput.length !== 4) return;
    const success = authenticateStudent(pinInput);
    if (!success) {
      triggerShake();
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeypadPress(e.key);
      } else if (e.key === 'Backspace') {
        handleKeypadPress('BACK');
      } else if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key.toLowerCase() === 'c') {
        handleKeypadPress('CLEAR');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pinInput, selectedStudentId]);

  return (
    <div className="max-w-md mx-auto py-4 px-4">
      {/* Back button */}
      <div className="mb-2">
        <button
          onClick={() => { soundEngine.playKeypadBeep(); setKioskScreen('idle'); }}
          className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Kiosk Welcome</span>
        </button>
      </div>

      {/* Title */}
      <p className="text-center text-xs sm:text-sm font-semibold text-slate-300 mb-4">
        Enter your Student ID and PIN
      </p>

      {/* Select / Enter Student ID section */}
      <div className="text-center mb-4">
        <div className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-2.5">
          SELECT / ENTER STUDENT ID:
        </div>

        {/* Quick select pills (2x2) */}
        <div className="grid grid-cols-2 gap-2 mb-3">
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
                className={`py-2 px-3 rounded-full text-xs font-bold font-mono transition-all ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] scale-102'
                    : 'bg-[#18112d] text-slate-300 hover:text-white border border-purple-900/50'
                }`}
              >
                {s.id} ({s.shortName || s.name.split(' ')[0]})
              </button>
            );
          })}
        </div>

        {/* Selected Student ID input display */}
        <div className="w-full py-2.5 px-4 rounded-xl bg-[#140b28] border border-purple-900/60 text-center font-mono font-black text-lg tracking-widest text-white shadow-inner">
          {selectedStudentId}
        </div>
      </div>

      {/* 4 PIN Slot Indicators */}
      <div className={`flex justify-center items-center gap-3 my-5 ${isShaking ? 'animate-bounce' : ''}`}>
        {[0, 1, 2, 3].map((index) => {
          const hasDigit = pinInput.length > index;
          return (
            <div
              key={index}
              className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                hasDigit
                  ? 'border-pink-500 bg-[#1e0f38] shadow-[0_0_15px_rgba(244,63,94,0.5)] scale-105'
                  : 'border-pink-500/40 bg-[#120a24]'
              }`}
            >
              {hasDigit && (
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff] animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Error message */}
      {pinError && (
        <div className="text-center text-xs font-mono text-rose-400 mb-3 animate-pulse">
          {pinError}
        </div>
      )}

      {/* Tactile Keypad */}
      <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto mb-5">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
          <button
            key={num}
            onClick={() => handleKeypadPress(num)}
            className="h-12 rounded-xl bg-[#18112e] hover:bg-[#231842] active:bg-cyan-500/30 border border-purple-900/40 text-cyan-300 font-mono font-bold text-xl flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            {num}
          </button>
        ))}

        {/* Clear Key */}
        <button
          onClick={() => handleKeypadPress('CLEAR')}
          className="h-12 rounded-xl bg-[#18112e] hover:bg-rose-950/40 border border-purple-900/40 text-slate-300 hover:text-rose-400 font-sans text-xs font-bold flex items-center justify-center transition-all active:scale-95"
        >
          Clear
        </button>

        {/* 0 Key */}
        <button
          onClick={() => handleKeypadPress('0')}
          className="h-12 rounded-xl bg-[#18112e] hover:bg-[#231842] active:bg-cyan-500/30 border border-purple-900/40 text-cyan-300 font-mono font-bold text-xl flex items-center justify-center transition-all shadow-md active:scale-95"
        >
          0
        </button>

        {/* Backspace Key */}
        <button
          onClick={() => handleKeypadPress('BACK')}
          className="h-12 rounded-xl bg-[#18112e] hover:bg-amber-950/40 border border-purple-900/40 text-cyan-300 hover:text-amber-400 font-mono flex items-center justify-center transition-all active:scale-95"
        >
          <Delete className="w-5 h-5" />
        </button>
      </div>

      {/* Large Gradient Log In Button */}
      <div className="max-w-[280px] mx-auto mb-4">
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 text-white font-bold text-base shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-98 transition-all cursor-pointer"
        >
          Log In
        </button>
      </div>

      {/* Demo Credentials Footer Hint */}
      <div className="text-center text-[11px] font-mono text-cyan-400">
        Demo Login: <span className="text-slate-400">ID:</span> <strong className="text-cyan-300">{selectedStudentId}</strong> | <span className="text-slate-400">PIN:</span> <strong className="text-cyan-300">0000</strong>
      </div>

    </div>
  );
};
