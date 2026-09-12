import React, { useState } from 'react';
import { KioskMessage } from '../types';
import { useKiosk } from '../context/KioskContext';
import { X, Copy, Check, ArrowLeft, Printer } from 'lucide-react';

interface ThermalPrintPreviewModalProps {
  message: KioskMessage | null;
  onClose: () => void;
}

export const ThermalPrintPreviewModal: React.FC<ThermalPrintPreviewModalProps> = ({
  message,
  onClose
}) => {
  const { students, triggerPrint, completeThermalPrint } = useKiosk();
  const [isCopied, setIsCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  if (!message) return null;

  const targetStudent = students.find(s => s.id === message.studentId);
  const studentDisplayName = targetStudent ? targetStudent.name.toUpperCase() : message.studentId;

  const handlePrint = () => {
    setIsPrinting(true);
    triggerPrint(message);
    setTimeout(() => {
      setIsPrinting(false);
      onClose();
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header with Close and Gradient Title */}
        <div className="relative text-center mb-4">
          <button
            onClick={onClose}
            className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-[#140b28] border border-purple-900/60 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
            Your Thermal Slip
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Print this slip. After printing, it will be cleared from the screen.
          </p>
        </div>

        {/* The White Monospace POS Thermal Receipt (Matching Image 4) */}
        <div className="mx-auto max-w-[320px] bg-white text-black font-mono shadow-2xl rounded-sm relative selection:bg-black selection:text-white">
          
          {/* Jagged / Serrated Top Edge */}
          <div
            className="h-2.5 bg-white w-full"
            style={{
              clipPath: 'polygon(0 100%, 4% 0, 8% 100%, 12% 0, 16% 100%, 20% 0, 24% 100%, 28% 0, 32% 100%, 36% 0, 40% 100%, 44% 0, 48% 100%, 52% 0, 56% 100%, 60% 0, 64% 100%, 68% 0, 72% 100%, 76% 0, 80% 100%, 84% 0, 88% 100%, 92% 0, 96% 100%, 100% 0, 100% 100%)'
            }}
          />

          <div id="thermal-slip" className="px-6 py-4 space-y-3">
            {/* School Header */}
            <div className="text-center space-y-0.5">
              <h3 className="font-extrabold text-base tracking-wider uppercase">
                HOMEBRIDGE
              </h3>
              <div className="text-[11px] font-semibold text-gray-800">
                SBP Integrasi Kuantan, Pahang
              </div>
              <div className="text-[10px] text-gray-600">
                Terminal Kiosk Asrama &bull; ID: {message.studentId}
              </div>
            </div>

            <div className="border-t border-dashed border-gray-400 my-2"></div>

            {/* Recipient & Sender Metadata */}
            <div className="text-xs space-y-1">
              <div className="grid grid-cols-12">
                <span className="col-span-3 text-gray-700">To:</span>
                <strong className="col-span-9 font-black">
                  {studentDisplayName} ({message.studentId})
                </strong>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-3 text-gray-700">From:</span>
                <span className="col-span-9 font-bold">{message.parentName}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-3 text-gray-700">Date:</span>
                <span className="col-span-9">{message.createdAt}</span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-400 my-2"></div>

            {/* Message Body */}
            <div className="py-2 text-[13px] leading-relaxed font-bold whitespace-pre-wrap">
              {message.content}
            </div>

            {/* End of message note */}
            <div className="text-center text-[10px] text-gray-700 py-1 space-y-0.5 border-t border-dashed border-gray-400">
              <div>* * * END OF MESSAGE (SINGLE-USE) * * *</div>
              <div>* *</div>
            </div>

            {/* Barcode representation */}
            <div className="text-center pt-1">
              <div className="flex justify-center items-center py-1">
                {Array.from({ length: 48 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#000000',
                      height: '32px',
                      width: i % 3 === 0 ? '2.5px' : i % 5 === 0 ? '3.5px' : '1.2px',
                      marginRight: (i % 2 === 0) ? '1.5px' : '1px'
                    }}
                  />
                ))}
              </div>
              <div className="text-[10px] tracking-widest font-bold mt-0.5">
                {message.authCode} &bull; SECURE PRIVACY PRINT
              </div>
            </div>

          </div>

          {/* Jagged / Serrated Bottom Edge */}
          <div
            className="h-2.5 bg-white w-full"
            style={{
              clipPath: 'polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)'
            }}
          />

        </div>

        {/* Buttons below slip */}
        <div className="mt-5 space-y-2.5 max-w-[320px] mx-auto">
          {/* Main Print Button */}
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 text-white font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isPrinting ? 'Printing Slip...' : 'Print Slip (Single-Use)'}</span>
          </button>

          {/* Copy Message Text Button */}
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-[#140b28] hover:bg-[#1f113d] border border-purple-900/50 text-slate-300 hover:text-white text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Message Text</span>
              </>
            )}
          </button>

          {/* Close button */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Close</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
