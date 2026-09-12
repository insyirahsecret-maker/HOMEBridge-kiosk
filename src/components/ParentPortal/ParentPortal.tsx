import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { MessageCategory, PriorityLevel } from '../../types';
import { 
  Smartphone, 
  Send, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Coins, 
  Award, 
  HeartPulse, 
  ArrowLeft, 
  LogOut, 
  User, 
  Mail, 
  Lock,
  Layers
} from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const { 
    currentParent, 
    loginParent, 
    logoutParent, 
    parents, 
    students, 
    messages, 
    sendMessage, 
    goToLanding 
  } = useKiosk();

  // Login form state
  const [emailInput, setEmailInput] = useState('razali@example.com');
  const [passwordInput, setPasswordInput] = useState('parent123');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Message composition state
  const linkedStudents = students.filter(s => currentParent?.studentIds.includes(s.id));
  const [targetStudentId, setTargetStudentId] = useState<string>(
    linkedStudents[0]?.id || 'TEST01'
  );
  const [category, setCategory] = useState<MessageCategory>('Allowance / Pocket Money');
  const [priority, setPriority] = useState<PriorityLevel>('IMPORTANT');
  const [content, setContent] = useState<string>('');
  const [sentNotice, setSentNotice] = useState<boolean>(false);

  // Quick Templates
  const templates = [
    {
      category: 'Urgent Family Notice' as MessageCategory,
      priority: 'URGENT' as PriorityLevel,
      label: 'Urgent Notice',
      icon: <AlertCircle className="w-4 h-4 text-rose-400" />,
      text: 'Urgent Family Notice: Please inform the Warden immediately to contact your parent/guardian regarding an urgent matter.'
    },
    {
      category: 'Allowance / Pocket Money' as MessageCategory,
      priority: 'IMPORTANT' as PriorityLevel,
      label: 'Pocket Money',
      icon: <Coins className="w-4 h-4 text-amber-400" />,
      text: 'Pocket Money Update: Dad has topped up RM80 to your school smart card account for books and laundry. Please spend wisely.'
    },
    {
      category: 'Outing Schedule' as MessageCategory,
      priority: 'NORMAL' as PriorityLevel,
      label: 'Outing Schedule',
      icon: <Clock className="w-4 h-4 text-cyan-400" />,
      text: 'Weekend Outing: Dad and Mum will pick you up at the INTEK guard post at 10:30 AM on Saturday. Please be ready early.'
    },
    {
      category: 'Exam Encouragement' as MessageCategory,
      priority: 'NORMAL' as PriorityLevel,
      label: 'Exam Encouragement',
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      text: 'Stay calm and focused during your exam. The whole family is cheering for your success at INTEK. We believe in you!'
    }
  ];

  const handleApplyTemplate = (t: typeof templates[0]) => {
    setCategory(t.category);
    setPriority(t.priority);
    setContent(t.text);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginParent(emailInput);
    if (!success) {
      setLoginError(`Email "${emailInput}" is not registered.`);
    } else {
      setLoginError(null);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !targetStudentId || !currentParent) return;

    sendMessage({
      studentId: targetStudentId,
      parentId: currentParent.id,
      parentName: currentParent.name,
      relationship: currentParent.relationship,
      parentPhone: currentParent.phone,
      category,
      priority,
      content: content.trim(),
    });

    setContent('');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3500);
  };

  // IF NOT LOGGED IN: SHOW PARENT LOGIN SCREEN
  if (!currentParent) {
    return (
      <div className="max-w-md mx-auto py-6 px-4">
        {/* Back button */}
        <div className="mb-4">
          <button
            onClick={goToLanding}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-[#140b28] border-2 border-pink-500/40 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
          <div className="w-14 h-14 rounded-2xl bg-pink-950/60 border border-pink-500/50 flex items-center justify-center mx-auto mb-4 text-pink-400 shadow-md">
            <User className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-black text-center text-white tracking-tight">
            Parent Login
          </h2>
          <p className="text-xs text-center text-slate-400 font-mono mt-1 mb-6">
            HOMEBridge &bull; SBP Integrasi Kuantan
          </p>

          {/* Quick Demo Account Pickers */}
          <div className="mb-4 p-3 rounded-xl bg-[#0c0618] border border-purple-900/40">
            <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase mb-2">
              Select Demo Account:
            </div>
            <div className="space-y-1.5">
              {parents.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setEmailInput(p.email);
                    loginParent(p.email);
                  }}
                  className="w-full p-2 rounded-lg bg-[#170e2f] hover:bg-pink-950/50 border border-purple-900/50 text-left text-xs text-slate-200 flex items-center justify-between"
                >
                  <span className="font-bold">{p.name}</span>
                  <span className="text-[10px] text-pink-400 font-mono">({p.studentIds.join(', ')})</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#0c0618] border border-purple-900/60 focus:border-pink-500 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#0c0618] border border-purple-900/60 focus:border-pink-500 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            {loginError && (
              <div className="text-xs font-mono text-rose-400 p-2 rounded-lg bg-rose-950/40 border border-rose-800">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-md active:scale-98 transition-all cursor-pointer"
            >
              Enter Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // IF LOGGED IN: SHOW PARENT DASHBOARD
  const parentMessages = messages.filter(m => 
    m.parentId === currentParent.id || currentParent.studentIds.includes(m.studentId)
  );

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 space-y-6">
      
      {/* Top Header Profile Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-[#140b28] border border-pink-500/40 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={goToLanding}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1f123d] hover:bg-[#2b1954] border border-purple-800/60 text-slate-300 hover:text-white text-xs font-mono transition-all mr-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5">
            <div className="w-full h-full bg-[#0d071a] rounded-[14px] flex items-center justify-center">
              <User className="w-5 h-5 text-pink-400" />
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-black text-white">
              {currentParent.name}
            </h3>
            <div className="text-xs font-mono text-pink-400">
              {currentParent.relationship} &bull; Linked Children: <strong className="text-white">{currentParent.studentIds.join(', ')}</strong>
            </div>
          </div>
        </div>

        <button
          onClick={logoutParent}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1d1038] hover:bg-rose-950/60 border border-purple-800 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Main 2-Column Grid: Composer on Left & Live Tracking on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Message Composer */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#140b28] border border-purple-800/50 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
            <div>
              <h3 className="text-base font-black text-white">
                Write a Message to Your Child
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Message will be sent to the Boarding Kiosk buffer for printing
              </p>
            </div>

            {sentNotice && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500 text-xs font-mono font-bold animate-bounce">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Message Sent!
              </span>
            )}
          </div>

          {/* Quick Templates Bar */}
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase font-bold mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Quick Templates:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyTemplate(t)}
                  className="p-2.5 rounded-xl bg-[#0c0618] hover:bg-[#1a0e36] border border-purple-900/50 hover:border-pink-500/40 text-left transition-all"
                >
                  <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-white">
                    {t.icon}
                    <span>{t.label}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    {t.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4 pt-2">
            {/* Child selector */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
                Select Child (Recipient):
              </label>
              <select
                value={targetStudentId}
                onChange={(e) => setTargetStudentId(e.target.value)}
                className="w-full bg-[#0c0618] border border-purple-900/60 focus:border-pink-500 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
              >
                {linkedStudents.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id} - {s.formClass})
                  </option>
                ))}
              </select>
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MessageCategory)}
                  className="w-full bg-[#0c0618] border border-purple-900/60 focus:border-pink-500 rounded-xl px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                >
                  <option value="Allowance / Pocket Money">Allowance / Pocket Money</option>
                  <option value="Outing Schedule">Outing Schedule</option>
                  <option value="Urgent Family Notice">Urgent Family Notice</option>
                  <option value="Exam Encouragement">Exam Encouragement</option>
                  <option value="Health &amp; Well-being">Health &amp; Well-being</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full bg-[#0c0618] border border-purple-900/60 focus:border-pink-500 rounded-xl px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                >
                  <option value="NORMAL">Normal</option>
                  <option value="IMPORTANT">Important</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
            </div>

            {/* Message Text Area */}
            <div>
              <div className="flex justify-between items-center mb-1 text-[11px] font-mono text-slate-400">
                <span>Message Content:</span>
                <span>{content.length}/500 characters</span>
              </div>
              <textarea
                required
                rows={4}
                maxLength={500}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message here... (will be printed onto the student's receipt slip)"
                className="w-full bg-[#0c0618] border border-purple-900/60 focus:border-pink-500 rounded-xl p-3 text-xs font-mono text-white focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className={`w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                content.trim()
                  ? 'bg-gradient-to-r from-pink-500 to-cyan-400 text-white shadow-md active:scale-98 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Kiosk</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Live Print Status Tracker */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#140b28] border border-purple-800/50 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Live Message Status
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Track your print receipt status in real time
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              {parentMessages.length} Total
            </span>
          </div>

          {/* Messages list */}
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {parentMessages.length === 0 ? (
              <div className="text-center p-8 text-xs font-mono text-slate-500 border border-dashed border-purple-900/40 rounded-2xl">
                No messages sent yet.
              </div>
            ) : (
              parentMessages.map((msg) => {
                const isPrinted = msg.status === 'PRINTED_COMPLETED';
                const targetChild = students.find(s => s.id === msg.studentId);

                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isPrinted
                        ? 'bg-[#0e071e]/90 border-emerald-900/60 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                        : 'bg-[#0e071e]/90 border-amber-900/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    }`}
                  >
                    {/* Status Badge: Pending Print vs Printed & Completed */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase flex items-center gap-1.5 ${
                        isPrinted
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/70'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/70 animate-pulse'
                      }`}>
                        {isPrinted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Printed &amp; Completed
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            Pending Print
                          </>
                        )}
                      </span>

                      <span className="text-[10px] font-mono text-slate-400">
                        {msg.authCode}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white mb-1">
                      To: <span className="text-cyan-300">{targetChild?.name || msg.studentId}</span> ({msg.studentId})
                    </div>

                    <div className="text-xs text-slate-300 font-mono bg-[#140b28] p-2.5 rounded-xl border border-purple-950 my-2">
                      "{msg.content}"
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 flex flex-wrap justify-between gap-1 pt-1 border-t border-purple-950">
                      <span>Sent: {msg.createdAt}</span>
                      {isPrinted && msg.printedAt && (
                        <span className="text-emerald-400 font-bold">
                          Printed: {msg.printedAt}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
