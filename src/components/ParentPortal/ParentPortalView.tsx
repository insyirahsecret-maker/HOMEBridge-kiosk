import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { ParentLogin } from './ParentLogin';
import { MessageComposer } from './MessageComposer';
import { MessageTracker } from './MessageTracker';
import { KioskMessage } from '../../types';
import { UserCheck, LogOut, MessageSquarePlus, History, User } from 'lucide-react';

interface ParentPortalViewProps {
  onOpenPreview: (msg: KioskMessage) => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({ onOpenPreview }) => {
  const { currentParent, logoutParent, parents, switchParentAccount } = useKiosk();
  const [subTab, setSubTab] = useState<'compose' | 'history'>('compose');

  if (!currentParent) {
    return <ParentLogin />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Parent Header Profile */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-pink-500/40 shadow-neon-pink flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <User className="w-6 h-6 text-pink-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-pink-400 bg-pink-950/80 px-2 py-0.5 rounded border border-pink-800">
                {currentParent.relationship} Portal
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentParent.email}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white">
              {currentParent.name}
            </h2>
            <div className="text-xs text-slate-400 font-mono">
              Linked Ward: <span className="text-cyan-400 font-bold">{currentParent.studentIds.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Quick Switch Parent Account dropdown & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-pink-400" />
            <select
              value={currentParent.id}
              onChange={(e) => switchParentAccount(e.target.value)}
              className="bg-transparent text-white font-mono focus:outline-none cursor-pointer"
            >
              {parents.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name} ({p.relationship})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={logoutParent}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setSubTab('compose')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
            subTab === 'compose'
              ? 'bg-pink-500 text-white border-pink-400 shadow-neon-pink'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <MessageSquarePlus className="w-4 h-4" />
          Compose New Dispatch
        </button>
        <button
          onClick={() => setSubTab('history')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
            subTab === 'history'
              ? 'bg-pink-500 text-white border-pink-400 shadow-neon-pink'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          Track Dispatches & Status
        </button>
      </div>

      {/* View Router */}
      {subTab === 'compose' ? (
        <MessageComposer />
      ) : (
        <MessageTracker onOpenPreview={onOpenPreview} />
      )}
    </div>
  );
};
