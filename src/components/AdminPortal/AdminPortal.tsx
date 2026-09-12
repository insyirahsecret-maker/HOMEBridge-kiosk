import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { StudentRegistrationModal } from './StudentRegistrationModal';
import { 
  Users, 
  UserPlus, 
  Radio, 
  ShieldCheck, 
  RotateCcw, 
  Search, 
  Trash2, 
  FileText, 
  Sparkles,
  Printer,
  History,
  Lock,
  Megaphone,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { SchoolAnnouncement } from '../../types';

export const AdminPortal: React.FC = () => {
  const {
    students,
    parents,
    messages,
    announcements,
    auditLogs,
    addAnnouncement,
    deleteAnnouncement,
    resetToDefaults,
    triggerPrint,
    goToLanding
  } = useKiosk();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'students' | 'posters' | 'audit'>('students');
  const [studentSearch, setStudentSearch] = useState('');

  // Poster / Announcement creation form state
  const [posterTitle, setPosterTitle] = useState('');
  const [posterCategory, setPosterCategory] = useState<'OUTING' | 'ACADEMIC' | 'DORMITORY' | 'EMERGENCY' | 'GENERAL'>('OUTING');
  const [posterPriority, setPosterPriority] = useState<'HIGH' | 'NORMAL'>('HIGH');
  const [posterContent, setPosterContent] = useState('');
  const [posterAuthor, setPosterAuthor] = useState('Head Warden INTEK');
  const [posterSuccess, setPosterSuccess] = useState(false);

  const filteredStudents = students.filter(s => {
    const q = studentSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.formClass.toLowerCase().includes(q) ||
      s.dormRoom.toLowerCase().includes(q)
    );
  });

  const handleCreatePoster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!posterTitle.trim() || !posterContent.trim()) return;

    addAnnouncement({
      title: posterTitle.trim(),
      category: posterCategory,
      priority: posterPriority,
      content: posterContent.trim(),
      author: posterAuthor.trim(),
      isPinned: posterPriority === 'HIGH'
    });

    setPosterTitle('');
    setPosterContent('');
    setPosterSuccess(true);
    setTimeout(() => setPosterSuccess(false), 3000);
  };

  // Convert an announcement into a printable kiosk bulletin slip
  const handlePrintBulletinSlip = (ann: SchoolAnnouncement) => {
    triggerPrint({
      id: ann.id,
      studentId: 'ALL-INTEK',
      parentId: 'ADMIN',
      parentName: ann.author,
      relationship: 'Pengurusan INTEK',
      category: 'General Reminder',
      priority: ann.priority === 'HIGH' ? 'URGENT' : 'NORMAL',
      content: `[ OFFICIAL SCHOOL BULLETIN ]\n${ann.title}\n\n${ann.content}\n\nIssued by: ${ann.author}`,
      status: 'READY_TO_PRINT',
      createdAt: ann.createdAt,
      authCode: `BUL-${ann.id.slice(-4).toUpperCase()}`
    });
  };

  const completedPrints = messages.filter(m => m.status === 'PRINTED_COMPLETED').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner with Stats */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-neon-cyan backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-700">
                ADMINISTRATION &amp; WARDEN CONSOLE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                SBP INTEGRASI KUANTAN
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              CENTRAL KIOSK DISPATCH HUB
            </h2>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={goToLanding}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-semibold border border-slate-700 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider shadow-neon-cyan active:scale-95 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Enroll Student
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all kiosk data back to default demo state?')) {
                  resetToDefaults();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-semibold border border-slate-700 transition-all"
              title="Reset data to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              Reset Demo
            </button>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-mono text-slate-400">Total Enrolled</div>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
              {students.length}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Active Student Accounts</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-mono text-slate-400">Linked Parents</div>
            <div className="text-2xl font-black text-pink-400 font-mono mt-1">
              {parents.length}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Verified Guardians</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-mono text-slate-400">Pending Slips</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {messages.filter(m => m.status === 'READY_TO_PRINT').length}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">In Kiosk Buffer</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-mono text-slate-400">Thermal Dispatches</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              {completedPrints}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Zero-Screen Purged</div>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setAdminTab('students')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
            adminTab === 'students'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-neon-cyan'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          Student & Parent Registry ({students.length})
        </button>

        <button
          onClick={() => setAdminTab('posters')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
            adminTab === 'posters'
              ? 'bg-pink-500/20 text-pink-300 border-pink-400 shadow-neon-pink'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          Posters & School Bulletins ({announcements.length})
        </button>

        <button
          onClick={() => setAdminTab('audit')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
            adminTab === 'audit'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-neon-emerald'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          Audit Trail &amp; Purge Log ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: Student Registry */}
      {adminTab === 'students' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-mono font-bold uppercase text-slate-300">
              Registered Students (Live Kiosk Roster)
            </h3>
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search name, ID, class, dorm..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">PIN</th>
                  <th className="p-3">Class / Form</th>
                  <th className="p-3">Dormitory</th>
                  <th className="p-3">Linked Parent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-cyan-400">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                        {s.id}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-white">
                      {s.name}
                    </td>
                    <td className="p-3 text-slate-300">
                      <span className="font-mono tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {s.pin}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{s.formClass}</td>
                    <td className="p-3 text-slate-300">{s.dormRoom}</td>
                    <td className="p-3 text-slate-300">
                      <div>{s.parentName}</div>
                      <div className="text-[10px] text-pink-400">{s.parentEmail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Posters & Bulletins */}
      {adminTab === 'posters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Poster Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-pink-400 flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-pink-400" />
              Publish Kiosk Bulletin / Poster
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Announcements broadcast to the terminal idle screen and student bulletin board.
            </p>

            {posterSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Bulletin published successfully!
              </div>
            )}

            <form onSubmit={handleCreatePoster} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Bulletin Title *
                </label>
                <input
                  type="text"
                  required
                  value={posterTitle}
                  onChange={(e) => setPosterTitle(e.target.value)}
                  placeholder="e.g. Mid-Term Holiday Return Date Schedule"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={posterCategory}
                    onChange={(e) => setPosterCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl px-2.5 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="OUTING">Outing &amp; Home Leave</option>
                    <option value="DORMITORY">Dormitory / Room</option>
                    <option value="ACADEMIC">Academic / Examination</option>
                    <option value="EMERGENCY">Emergency / Warden</option>
                    <option value="GENERAL">General Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={posterPriority}
                    onChange={(e) => setPosterPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl px-2.5 py-2 text-xs font-mono text-white focus:outline-none"
                  >
                    <option value="HIGH">High Priority (Pinned)</option>
                    <option value="NORMAL">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Author / Unit
                </label>
                <input
                  type="text"
                  required
                  value={posterAuthor}
                  onChange={(e) => setPosterAuthor(e.target.value)}
                  placeholder="e.g. INTEK Warden Council"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Bulletin Notice Content *
                </label>
                <textarea
                  required
                  rows={4}
                  value={posterContent}
                  onChange={(e) => setPosterContent(e.target.value)}
                  placeholder="Write notice instructions here..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl p-3 text-xs font-mono text-white focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-neon-pink transition-all"
              >
                Broadcast to Kiosk &amp; Bulletin
              </button>
            </form>
          </div>

          {/* Active Posters List */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-mono font-bold uppercase text-slate-300">
              Active Posters &amp; Bulletins ({announcements.length})
            </h3>

            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        ann.priority === 'HIGH'
                          ? 'bg-rose-950 text-rose-300 border border-rose-700'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {ann.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {ann.createdAt}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed mb-3">
                    {ann.content}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Author: <strong className="text-cyan-400">{ann.author}</strong></span>
                  
                  <button
                    onClick={() => handlePrintBulletinSlip(ann)}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold underline"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print as Kiosk Notice Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Audit Trail & Buffer Purges */}
      {adminTab === 'audit' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold uppercase text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Zero-Screen Privacy Protocol Audit Log
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Immutable record of physical dispatches, student logins, and screen memory purges
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {auditLogs.length} events logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Token / Terminal</th>
                  <th className="p-3">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase ${
                        log.action === 'BUFFER_PURGED'
                          ? 'bg-rose-950 text-rose-300 border border-rose-700'
                          : log.action === 'SLIP_PRINTED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : log.action === 'KIOSK_LOGIN'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-white">
                      {log.studentName || log.studentId || '-'}
                    </td>
                    <td className="p-3 text-cyan-400">
                      {log.authCode || log.terminalId || '-'}
                    </td>
                    <td className="p-3 text-slate-300 max-w-md">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <StudentRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};
