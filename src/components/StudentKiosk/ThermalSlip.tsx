import React from 'react';
import { KioskMessage, Student } from '../../types';

interface ThermalSlipProps {
  message: KioskMessage;
  student?: Student | null;
  terminalId?: string;
}

export const ThermalSlip: React.FC<ThermalSlipProps> = ({
  message,
  student,
  terminalId = 'KIOSK-INTEK-01'
}) => {
  const printTime = message.printedAt || new Date().toLocaleString('en-US');
  const studentName = student?.name?.toUpperCase() || message.studentId;

  return (
    <div
      id="thermal-slip"
      className="bg-white text-black font-mono leading-tight w-[48mm] max-w-full p-1 mx-auto"
      style={{
        color: '#000000',
        backgroundColor: '#ffffff',
        fontFamily: "'Courier New', Courier, 'Lucida Console', monospace",
        fontSize: '8pt',
      }}
    >
      {/* Official SBP Integrasi Kuantan Header */}
      <div className="text-center pb-2 border-b-2 border-black">
        <div className="text-[12px] font-black uppercase tracking-tight">
          HOMEBRIDGE
        </div>
        <div className="text-[10px] font-bold text-gray-900">
          SBP Integrasi Kuantan, Pahang
        </div>
        <div className="text-[9px] text-gray-700">
          Boarding Kiosk Terminal &bull; ID: {message.studentId}
        </div>
        <div className="mt-1 text-[9px] font-bold uppercase bg-black text-white px-1 py-0.5 inline-block">
          MAXIMUM PRIVACY THERMAL DISPATCH
        </div>
      </div>

      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ========================================
      </div>

      {/* Dispatch Metadata */}
      <div className="text-[10px] space-y-0.5">
        <div className="flex justify-between">
          <span className="font-semibold">PRINT TIMESTAMP:</span>
          <span>{printTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">TERMINAL ID:</span>
          <span className="font-bold">{terminalId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">TOKEN:</span>
          <span className="font-bold">{message.authCode}</span>
        </div>
      </div>

      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ----------------------------------------
      </div>

      {/* Recipient Details */}
      <div className="text-[10px] space-y-0.5">
        <div className="flex justify-between">
          <span className="font-bold text-gray-700">TO:</span>
          <strong className="text-[11px] font-black">{studentName}</strong>
        </div>
        <div className="flex justify-between">
          <span>STUDENT ID:</span>
          <span className="font-bold">{message.studentId}</span>
        </div>
        {student?.formClass && (
          <div className="flex justify-between">
            <span>CLASS:</span>
            <span>{student.formClass}</span>
          </div>
        )}
        {student?.dormRoom && (
          <div className="flex justify-between">
            <span>DORM:</span>
            <span>{student.dormRoom}</span>
          </div>
        )}
      </div>

      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ----------------------------------------
      </div>

      {/* Sender Details */}
      <div className="text-[10px] space-y-0.5">
        <div className="flex justify-between">
          <span className="font-bold text-gray-700">FROM:</span>
          <strong className="font-bold">{message.parentName} ({message.relationship})</strong>
        </div>
        {message.parentPhone && (
          <div className="flex justify-between">
            <span>TEL:</span>
            <span>{message.parentPhone}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>CATEGORY:</span>
          <span className="font-bold uppercase">[{message.category}]</span>
        </div>
      </div>

      <div className="text-[10px] my-1 text-center font-bold tracking-tighter">
        ================ MESSAGE ================
      </div>

      {/* Confidential Message Payload */}
      <div className="my-2 p-2 border border-black border-dashed bg-gray-50 text-[12px] font-bold leading-normal whitespace-pre-wrap">
        {message.content}
      </div>

      {/* End of message marker */}
      <div className="text-center text-[9px] text-gray-700 py-1 space-y-0.5 border-t border-dashed border-gray-400">
        <div>* * * END OF MESSAGE (SINGLE-USE) * * *</div>
        <div>* *</div>
      </div>

      {/* Barcode Simulation */}
      <div className="text-center pt-2 pb-1 border-t border-black">
        <div className="flex justify-center items-center py-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                backgroundColor: '#000000',
                height: '28px',
                width: i % 3 === 0 ? '2.5px' : i % 5 === 0 ? '3px' : '1px',
                marginRight: (i % 2 === 0) ? '1.5px' : '1px'
              }}
            />
          ))}
        </div>
        <div className="text-[10px] tracking-widest font-bold">
          *{message.authCode}*
        </div>
        <div className="text-[8px] text-gray-600 uppercase mt-0.5">
          SECURE PRIVACY PRINT &bull; BUFFER ZEROED
        </div>
      </div>

      <div className="text-[9px] text-center font-bold pt-1 border-t border-dashed border-gray-600">
        - - - - - [ TEAR HERE ] - - - - -
      </div>
    </div>
  );
};
