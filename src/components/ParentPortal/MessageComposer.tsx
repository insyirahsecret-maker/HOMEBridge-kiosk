import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { MessageCategory, PriorityLevel } from '../../types';
import { 
  Send, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Coins, 
  Award, 
  HeartPulse, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

interface TemplateOption {
  category: MessageCategory;
  priority: PriorityLevel;
  icon: React.ReactNode;
  label: string;
  templateText: string;
}

export const MessageComposer: React.FC = () => {
  const { currentParent, students, sendMessage } = useKiosk();

  // Child selector: which student this parent is messaging
  const linkedStudents = students.filter(s => currentParent?.studentIds.includes(s.id));
  const [targetStudentId, setTargetStudentId] = useState<string>(
    linkedStudents[0]?.id || ''
  );

  const [category, setCategory] = useState<MessageCategory>('Allowance / Pocket Money');
  const [priority, setPriority] = useState<PriorityLevel>('IMPORTANT');
  const [content, setContent] = useState<string>('');
  const [justSent, setJustSent] = useState<boolean>(false);

  // Quick templates matching prompt specifications
  const templates: TemplateOption[] = [
    {
      category: 'Urgent Family Notice',
      priority: 'URGENT',
      icon: <AlertCircle className="w-4 h-4 text-rose-400" />,
      label: 'Urgent Family Notice',
      templateText: `Pemberitahuan Kecemasan Keluarga: Sila maklumkan kepada Cikgu Warden dengan segera untuk menghubungi Ibu/Ayah bagi urusan kecemasan keluarga yang mendesak.`
    },
    {
      category: 'Outing Schedule',
      priority: 'NORMAL',
      icon: <Clock className="w-4 h-4 text-cyan-400" />,
      label: 'Outing Schedule',
      templateText: `Jadual Outing Hujung Minggu: Ayah dan Ibu akan tiba di pos pengawal INTEK pada hari Sabtu jam 10:30 pagi untuk outing berjadual. Sila bersiap awal dan bawa kad kebenaran warden.`
    },
    {
      category: 'Allowance / Pocket Money',
      priority: 'IMPORTANT',
      icon: <Coins className="w-4 h-4 text-amber-400" />,
      label: 'Allowance / Pocket Money',
      templateText: `Wang Saku Asrama: Ibu telah masukkan wang saku tambahan sebanyak RM70 ke dalam akaun kad pintar asrama kamu melalui Pejabat Kewangan INTEK. Gunakan sebaiknya untuk buku & dobi.`
    },
    {
      category: 'Exam Encouragement',
      priority: 'NORMAL',
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      label: 'Exam Encouragement',
      templateText: `Selamat Menghadapi Peperiksaan: Seluruh keluarga mendoakan ketenangan dan kecemerlangan anakanda dalam peperiksaan. Terus berusaha, tawakkal dan jaga solat berjemaah.`
    },
    {
      category: 'Health & Well-being',
      priority: 'IMPORTANT',
      icon: <HeartPulse className="w-4 h-4 text-pink-400" />,
      label: 'Health & Well-being',
      templateText: `Peringatan Kesihatan: Jangan lupa makan ubat seperti yang dipesan doktor dan banyakkan minum air suam di asrama. Beritahu warden segera jika berasa tidak sihat.`
    }
  ];

  const handleApplyTemplate = (tmpl: TemplateOption) => {
    setCategory(tmpl.category);
    setPriority(tmpl.priority);
    setContent(tmpl.templateText);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    setJustSent(true);
    setTimeout(() => setJustSent(false), 4000);
  };

  const selectedStudentObj = students.find(s => s.id === targetStudentId);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-pink-400" />
            COMPOSE DISPATCH MESSAGE
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Directly queued into the Student Kiosk zero-screen buffer
          </p>
        </div>

        {justSent && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-xs font-mono animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Dispatched to Kiosk!
          </div>
        )}
      </div>

      {/* Quick Templates Selector */}
      <div className="mb-6">
        <label className="text-xs font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Quick Communication Templates (Click to fill)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {templates.map((tmpl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyTemplate(tmpl)}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-pink-500/40 text-left transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                {tmpl.icon}
                <span className="text-xs font-bold text-slate-200 group-hover:text-pink-300">
                  {tmpl.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono truncate">
                {tmpl.templateText}
              </p>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Target Child & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Child Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
              Target Child / Student
            </label>
            <select
              value={targetStudentId}
              onChange={(e) => setTargetStudentId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none"
            >
              {linkedStudents.length > 0 ? (
                linkedStudents.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id} - {s.formClass})
                  </option>
                ))
              ) : (
                students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id})
                  </option>
                ))
              )}
            </select>
            {selectedStudentObj && (
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Dorm: <span className="text-cyan-400">{selectedStudentObj.dormRoom}</span>
              </div>
            )}
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
              Message Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MessageCategory)}
              className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none"
            >
              <option value="Allowance / Pocket Money">Allowance / Pocket Money</option>
              <option value="Outing Schedule">Outing Schedule</option>
              <option value="Urgent Family Notice">Urgent Family Notice</option>
              <option value="Exam Encouragement">Exam Encouragement</option>
              <option value="Health & Well-being">Health & Well-being</option>
              <option value="General Reminder">General Reminder</option>
            </select>
          </div>
        </div>

        {/* Priority Level */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
            Priority Level
          </label>
          <div className="flex gap-3">
            {(['NORMAL', 'IMPORTANT', 'URGENT'] as PriorityLevel[]).map((p) => {
              const isSelected = priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                    isSelected
                      ? p === 'URGENT'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                        : p === 'IMPORTANT'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                        : 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Area */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-mono uppercase text-slate-300 font-bold">
              Message Content (Monospace POS Print Optimized)
            </label>
            <span className="text-xs font-mono text-slate-500">
              {content.length}/500 chars
            </span>
          </div>
          <textarea
            required
            maxLength={500}
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message here for the boarding school kiosk receipt..."
            className="w-full bg-slate-950 border border-slate-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-xl p-3.5 text-sm text-slate-100 font-mono placeholder:text-slate-600 focus:outline-none resize-none transition-all"
          />
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={!content.trim()}
            className={`px-8 py-3 rounded-xl font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-2 transition-all ${
              content.trim()
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-neon-pink cursor-pointer active:scale-98'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            SEND DISPATCH TO KIOSK
          </button>
        </div>
      </form>
    </div>
  );
};
