import React from 'react';
import { KioskMessage, Student } from '../../types';

interface ThermalReceiptSlipProps {
  message: KioskMessage;
  student?: Student | null;
  terminalId?: string;
  isPrintPreview?: boolean;
}

export const ThermalReceiptSlip: React.FC<ThermalReceiptSlipProps> = ({
  message,
  student,
  terminalId = 'KIOSK-INTEK-01',
  isPrintPreview = false,
}) => {
  const printTime = message.printedAt || new Date().toLocaleString('en-GB');

  // Simple pseudo barcode generator for crisp POS thermal printing
  const generateBarcodeLines = (code: string) => {
    const chars = code.split('');
    return chars.map((char, index) => {
      const codeVal = char.charCodeAt(0);
      const isThick = codeVal % 2 === 0;
      const isExtraThick = codeVal % 5 === 0;
      return (
        <span
          key={index}
          style={{
            display: 'inline-block',
            backgroundColor: '#000000',
            height: '42px',
            width: isExtraThick ? '4px' : isThick ? '2.5px' : '1.2px',
            marginRight: (index % 3 === 0) ? '2.5px' : '1px'
          }}
        />
      );
    });
  };

  return (
    <div
      id="thermal-slip"
      className={`bg-white text-black font-mono leading-tight ${
        isPrintPreview 
          ? 'w-[320px] max-w-[80mm] p-4 mx-auto rounded shadow-2xl border border-dashed border-gray-400' 
          : 'w-[76mm] p-2 mx-auto text-black'
      }`}
      style={{
        color: '#000000',
        backgroundColor: '#ffffff'
      }}
    >
      {/* School Header */}
      <div className="text-center pb-2 border-b-2 border-black">
        <div className="text-[12px] font-extrabold tracking-tight uppercase">
          SEKOLAH BERASRAMA PENUH INTEGRASI KUANTAN
        </div>
        <div className="text-[10px] font-bold text-gray-800">
          (SBP INTEGRASI KUANTAN - INTEK)
        </div>
        <div className="text-[9px] text-gray-600">
          Bandar Indera Mahkota, 25200 Kuantan, Pahang
        </div>
        <div className="mt-1 text-[11px] font-black uppercase tracking-widest bg-black text-white px-1 py-0.5 inline-block">
          HOMEBRIDGE KIOSK TERMINAL
        </div>
        <div className="text-[9px] font-semibold mt-0.5">
          ZERO-SCREEN PRIVACY DISPATCH SLIP
        </div>
      </div>

      {/* Divider */}
      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ========================================
      </div>

      {/* Slip Metadata */}
      <div className="text-[10px] space-y-0.5">
        <div className="flex justify-between">
          <span className="font-semibold">PRINT TIMESTAMP:</span>
          <span className="font-bold">{printTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">TERMINAL ID:</span>
          <span className="font-bold">{terminalId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">AUTH TOKEN:</span>
          <span className="font-bold tracking-wider">{message.authCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">PRIORITY:</span>
          <span className={`font-black uppercase ${message.priority === 'URGENT' ? 'underline' : ''}`}>
            [{message.priority}]
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ----------------------------------------
      </div>

      {/* Recipient Student Info */}
      <div className="text-[10px] space-y-0.5">
        <div className="text-[9px] font-bold uppercase text-gray-700">STUDENT RECIPIENT:</div>
        <div className="text-[12px] font-black uppercase">
          {student?.name || message.studentId}
        </div>
        <div className="flex justify-between">
          <span>STUDENT ID:</span>
          <span className="font-bold">{message.studentId}</span>
        </div>
        {student?.formClass && (
          <div className="flex justify-between">
            <span>CLASS:</span>
            <span className="font-semibold">{student.formClass}</span>
          </div>
        )}
        {student?.dormRoom && (
          <div className="flex justify-between">
            <span>DORM:</span>
            <span className="font-semibold">{student.dormRoom}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ----------------------------------------
      </div>

      {/* Sender Info */}
      <div className="text-[10px] space-y-0.5">
        <div className="text-[9px] font-bold uppercase text-gray-700">FROM PARENT / GUARDIAN:</div>
        <div className="text-[11px] font-bold">
          {message.parentName} ({message.relationship})
        </div>
        {message.parentPhone && (
          <div className="text-[9px] text-gray-800">
            TEL: {message.parentPhone}
          </div>
        )}
        <div className="mt-1">
          <span className="bg-black text-white px-1 py-0.5 text-[9px] font-bold uppercase">
            CATEGORY: {message.category}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ================ MESSAGE ================
      </div>

      {/* Message Content */}
      <div className="my-2 p-2 border border-black border-dashed bg-gray-50 text-[11px] font-medium leading-normal whitespace-pre-wrap">
        {message.content}
      </div>

      {/* Security notice */}
      <div className="text-[8.5px] leading-tight text-center my-2 text-gray-800 italic">
        * SINGLE-USE PRIVACY DISPATCH *<br/>
        This message has been permanently wiped from the kiosk display memory upon thermal print completion.
      </div>

      {/* Barcode Simulation */}
      <div className="text-center pt-2 pb-1 border-t border-black">
        <div className="flex justify-center items-center py-1">
          {generateBarcodeLines(message.authCode + message.studentId)}
        </div>
        <div className="text-[10px] tracking-widest font-bold">
          *{message.authCode}*
        </div>
      </div>

      {/* Tear off indicator */}
      <div className="text-[9px] text-center font-bold pt-1 border-t border-dashed border-gray-600">
        - - - - - - - [ TEAR HERE / KOYAK DI SINI ] - - - - - - -
      </div>
      <div className="text-[7.5px] text-center text-gray-600 pt-0.5 uppercase">
        SBP Integrasi Kuantan &copy; HOMEBridge Protocol
      </div>
    </div>
  );
};
