import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { KioskMessage } from '../../types';
import { 
  Clock, 
  CheckCircle2, 
  Printer, 
  Search, 
  FileText, 
  Eye, 
  Calendar,
  Layers
} from 'lucide-react';

interface MessageTrackerProps {
  onOpenPreview: (msg: KioskMessage) => void;
}

export const MessageTracker: React.FC<MessageTrackerProps> = ({ onOpenPreview }) => {
  const { currentParent, messages, students } = useKiosk();
  const [filter, setFilter] = useState<'ALL' | 'READY_TO_PRINT' | 'PRINTED_COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Messages sent by this parent or linked to this parent's children
  const parentMessages = messages.filter(m => 
    m.parentId === currentParent?.id || currentParent?.studentIds.includes(m.studentId)
  );

  const filteredMessages = parentMessages.filter(msg => {
    if (filter !== 'ALL' && msg.status !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const student = students.find(s => s.id === msg.studentId);
      const studentMatch = student?.name.toLowerCase().includes(q) || msg.studentId.toLowerCase().includes(q);
      const contentMatch = msg.content.toLowerCase().includes(q);
      const authMatch = msg.authCode.toLowerCase().includes(q);
      return studentMatch || contentMatch || authMatch;
    }
    return true;
  });

  const readyCount = parentMessages.filter(m => m.status === 'READY_TO_PRINT').length;
  const completedCount = parentMessages.filter(m => m.status === 'PRINTED_COMPLETED').length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-pink-400" />
            LIVE DISPATCH TRACKER
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Monitor real-time status of thermal slips at SBP Integrasi Kuantan Kiosk
          </p>
        </div>

        {/* Status Metrics */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Ready to Print: <strong>{readyCount}</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Printed & Completed: <strong>{completedCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-pink-500 text-white shadow-neon-pink'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({parentMessages.length})
          </button>
          <button
            onClick={() => setFilter('READY_TO_PRINT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              filter === 'READY_TO_PRINT'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ready to Print ({readyCount})
          </button>
          <button
            onClick={() => setFilter('PRINTED_COMPLETED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              filter === 'PRINTED_COMPLETED'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Printed & Completed ({completedCount})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student, token, content..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-pink-500"
          />
        </div>
      </div>

      {/* Message Cards List */}
      {filteredMessages.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-slate-500 font-mono text-xs">
          No dispatch messages match the selected filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => {
            const student = students.find(s => s.id === msg.studentId);
            const isPrinted = msg.status === 'PRINTED_COMPLETED';

            return (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border transition-all ${
                  isPrinted
                    ? 'bg-slate-950/70 border-emerald-900/40 hover:border-emerald-500/50'
                    : 'bg-slate-950/90 border-amber-900/50 hover:border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    {/* Live Status Badge */}
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-black uppercase flex items-center gap-1.5 ${
                      isPrinted
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/60'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/60 animate-pulse'
                    }`}>
                      {isPrinted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          PRINTED & COMPLETED
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          READY TO PRINT (PENDING DISPATCH)
                        </>
                      )}
                    </span>

                    <span className="text-xs font-mono text-slate-400">
                      Child: <strong className="text-white">{student?.name || msg.studentId}</strong> ({msg.studentId})
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <span>Token:</span>
                    <span className="font-bold text-cyan-400">{msg.authCode}</span>
                  </div>
                </div>

                <p className="text-sm font-mono text-slate-300 mb-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                  {msg.content}
                </p>

                {/* Footer Meta */}
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2 pt-1">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Sent: {msg.createdAt}
                    </span>
                    {isPrinted && msg.printedAt && (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Printer className="w-3.5 h-3.5" />
                        Printed: {msg.printedAt} ({msg.terminalId || 'KIOSK-INTEK-01'})
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenPreview(msg)}
                    className="flex items-center gap-1 text-pink-400 hover:text-pink-300 font-bold underline transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Thermal Slip Format
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
