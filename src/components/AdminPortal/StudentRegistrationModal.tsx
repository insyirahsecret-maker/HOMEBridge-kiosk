import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { UserPlus, Sparkles, CheckCircle2, ShieldCheck, X } from 'lucide-react';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({ isOpen, onClose }) => {
  const { registerStudent, setSelectedStudentId } = useKiosk();

  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [formClass, setFormClass] = useState('Tingkatan 1 Al-Khawarizmi');
  const [dormRoom, setDormRoom] = useState('Asrama Bilal (Blok A - Kamar 101)');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('+60 1');
  const [relationship, setRelationship] = useState<'Ibu' | 'Bapa' | 'Penjaga'>('Ibu');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !name.trim() || pin.length !== 4 || !parentName.trim() || !parentEmail.trim()) {
      alert('Please fill all required fields correctly (PIN must be 4 digits).');
      return;
    }

    const success = registerStudent({
      id: studentId.trim(),
      name: name.trim(),
      pin: pin.trim(),
      formClass: formClass.trim(),
      dormRoom: dormRoom.trim(),
      parentName: parentName.trim(),
      parentEmail: parentEmail.trim(),
      parentPhone: parentPhone.trim(),
      relationship
    });

    if (success) {
      setSelectedStudentId(studentId.trim().toUpperCase());
      setSuccessMsg(`Student ${name} (${studentId}) & Parent ${parentName} registered successfully!`);
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1800);
    }
  };

  const handleAutoFillDemo = () => {
    const randomNum = Math.floor(10 + Math.random() * 90);
    setStudentId(`TEST0${randomNum}`);
    setName(`Ahmad Farhan bin Shukri`);
    setPin('4321');
    setFormClass('Tingkatan 3 Ibnu Rusyd');
    setDormRoom('Asrama Bilal (Blok B - Kamar 205)');
    setParentName('Encik Shukri bin Abdullah');
    setParentEmail(`shukri.${randomNum}@example.com`);
    setParentPhone('+60 17-987 1122');
    setRelationship('Bapa');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.25)] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-neon-cyan">
              <UserPlus className="w-5 h-5 text-slate-950 font-black" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-tight">
                WARDEN PORTAL: STUDENT & PARENT ENROLLMENT
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Auto-creates linked accounts and updates kiosk registers dynamically
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Demo Fill Bar */}
        <div className="px-5 py-2.5 bg-cyan-950/30 border-b border-cyan-900/40 flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Need sample test data?
          </span>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="text-[11px] font-mono font-bold text-cyan-300 hover:text-cyan-100 bg-cyan-900/50 px-2.5 py-1 rounded border border-cyan-700 transition-all hover:bg-cyan-800"
          >
            Auto-Fill Sample Record
          </button>
        </div>

        {/* Success alert */}
        {successMsg && (
          <div className="m-5 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Section: Student Info */}
          <div>
            <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Student Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Student ID * (e.g. TEST04)
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                  placeholder="TEST04"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ahmad Farhan bin Shukri"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  4-Digit Kiosk PIN *
                </label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="4321"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs font-mono text-white tracking-widest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Form / Class *
                </label>
                <input
                  type="text"
                  required
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  placeholder="Tingkatan 4 Ibnu Sina"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Dormitory / Kamar *
                </label>
                <input
                  type="text"
                  required
                  value={dormRoom}
                  onChange={(e) => setDormRoom(e.target.value)}
                  placeholder="Asrama Bilal (Blok A-204)"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Parent Info */}
          <div className="pt-3 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase text-pink-400 font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              Linked Parent / Guardian (Auto Account Creation)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Parent Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Encik Shukri bin Abdullah"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-pink-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Parent Email (Login Credential) *
                </label>
                <input
                  type="email"
                  required
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="shukri@example.com"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-pink-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="+60 12-345 6789"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-pink-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  Relationship
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as 'Ibu' | 'Bapa' | 'Penjaga')}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-pink-400 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
                >
                  <option value="Ibu">Ibu (Mother)</option>
                  <option value="Bapa">Bapa (Father)</option>
                  <option value="Penjaga">Penjaga (Guardian)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Direct injection to localStorage
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-black uppercase tracking-wider shadow-neon-cyan active:scale-95 transition-all"
              >
                Register & Sync Accounts
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
