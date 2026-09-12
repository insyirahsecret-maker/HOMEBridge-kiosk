import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { soundEngine } from '../../utils/audio';
import { LogIn, UserCircle, Shield, Sparkles, Mail, Lock } from 'lucide-react';

export const ParentLogin: React.FC = () => {
  const { parents, loginParent } = useKiosk();
  const [emailInput, setEmailInput] = useState('noraini@example.com');
  const [passwordInput, setPasswordInput] = useState('parent123');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setError('Please enter your registered email address');
      return;
    }

    const success = loginParent(emailInput);
    if (!success) {
      setError(`Email "${emailInput}" is not registered in the system.`);
      soundEngine.playError();
    } else {
      setError(null);
    }
  };

  const handleQuickSelect = (email: string) => {
    setEmailInput(email);
    setPasswordInput('parent123');
    loginParent(email);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-pink-500/30 shadow-[0_0_25px_rgba(244,63,94,0.15)] backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-neon-pink">
            <UserCircle className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            PARENT & GUARDIAN PORTAL
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            SBP Integrasi Kuantan &bull; Direct Boarding Dispatch Service
          </p>
        </div>

        {/* Quick select demo parent */}
        <div className="mb-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Quick Demo Accounts (Click to Auto-fill)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {parents.slice(0, 3).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleQuickSelect(p.email)}
                className="p-2.5 rounded-lg bg-slate-800/70 hover:bg-pink-950/40 hover:border-pink-500/50 border border-slate-700 text-left transition-all"
              >
                <div className="text-xs font-bold text-white truncate">{p.name}</div>
                <div className="text-[10px] text-pink-400 font-mono">{p.relationship} ({p.studentIds.join(', ')})</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none transition-all"
              />
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Default demo password: <span className="text-slate-400">parent123</span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/50 text-xs font-mono text-rose-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-bold text-sm uppercase tracking-wider shadow-neon-pink transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            ENTER PARENT PORTAL
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500 font-mono flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          Protected by SBP Integrasi Kuantan Central Authentication
        </div>
      </div>
    </div>
  );
};
