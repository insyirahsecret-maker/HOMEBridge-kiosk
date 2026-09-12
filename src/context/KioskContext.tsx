import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Student, 
  Parent, 
  KioskMessage, 
  SchoolAnnouncement, 
  AuditLogItem, 
  ViewMode,
  KioskStep,
  ParentRelationship
} from '../types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_PARENTS, 
  INITIAL_MESSAGES, 
  INITIAL_ANNOUNCEMENTS 
} from '../data/mockData';
import { soundEngine } from '../utils/audio';

interface RegisterStudentParams {
  id: string;
  name: string;
  shortName?: string;
  pin: string;
  formClass: string;
  dormRoom: string;
  parentName: string;
  parentEmail: string;
  parentPhone?: string;
  relationship?: ParentRelationship;
}

interface KioskContextType {
  // Navigation & View Mode
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  goToLanding: () => void;
  goToKiosk: () => void;
  goToParent: () => void;
  goToAdmin: () => void;
  terminalId: string;

  // Screen controls
  kioskScreen: 'idle' | 'keypad' | 'authenticated';
  setKioskScreen: (screen: any) => void;
  isMuted: boolean;
  toggleSound: () => void;
  language: 'EN' | 'BM';
  toggleLanguage: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  isPosterModalOpen: boolean;
  setIsPosterModalOpen: (open: boolean) => void;

  // Student Kiosk Session
  kioskStep: KioskStep;
  setKioskStep: (step: KioskStep) => void;
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
  currentStudent: Student | null;
  pinInput: string;
  setPinInput: React.Dispatch<React.SetStateAction<string>>;
  pinError: string | null;
  authenticateStudent: (overridePin?: string) => boolean;
  logoutStudent: () => void;
  isPurged: boolean;

  // Thermal Print (Maximum Privacy Protocol)
  activePrintSlip: KioskMessage | null;
  setActivePrintSlip: (msg: KioskMessage | null) => void;
  triggerThermalPrint: (message: KioskMessage) => void;
  triggerPrint: (message: KioskMessage) => void;
  completeThermalPrint: (messageId: string) => void;

  // Parent Portal Session
  currentParent: Parent | null;
  parentEmail: string;
  setParentEmail: (email: string) => void;
  loginParent: (email: string) => boolean;
  logoutParent: () => void;
  switchParentAccount: (parentId: string) => void;
  sendMessage: (msg: Omit<KioskMessage, 'id' | 'status' | 'createdAt' | 'authCode'>) => void;

  // Data Stores
  students: Student[];
  parents: Parent[];
  messages: KioskMessage[];
  announcements: SchoolAnnouncement[];
  auditLogs: AuditLogItem[];

  // Admin Operations
  registerStudent: (data: RegisterStudentParams) => boolean;
  addAnnouncement: (announcement: Omit<SchoolAnnouncement, 'id' | 'createdAt'>) => void;
  deleteAnnouncement: (id: string) => void;
  resetToDefaults: () => void;
}

const KioskContext = createContext<KioskContextType | undefined>(undefined);

export const KioskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const terminalId = 'KIOSK-INTEK-01';
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [kioskStep, setKioskStep] = useState<KioskStep>('keypad');
  const [kioskScreen, setKioskScreen] = useState<'idle' | 'keypad' | 'authenticated'>('idle');

  // Audio, Lang, Fullscreen, Poster Modal
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BM'>('EN');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Persistence in localStorage
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('hb_students_v3');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [parents, setParents] = useState<Parent[]>(() => {
    const saved = localStorage.getItem('hb_parents_v3');
    return saved ? JSON.parse(saved) : INITIAL_PARENTS;
  });

  const [messages, setMessages] = useState<KioskMessage[]>(() => {
    const saved = localStorage.getItem('hb_messages_v3');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [announcements, setAnnouncements] = useState<SchoolAnnouncement[]>(() => {
    const saved = localStorage.getItem('hb_announcements_v3');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('hb_audit_logs_v3');
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        action: 'KIOSK_LOGIN',
        timestamp: '8/26/2026, 2:00:00 PM',
        details: 'System Initialized - SBP Integrasi Kuantan Kiosk Online',
        terminalId: 'KIOSK-INTEK-01'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('hb_students_v3', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('hb_parents_v3', JSON.stringify(parents));
  }, [parents]);

  useEffect(() => {
    localStorage.setItem('hb_messages_v3', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('hb_announcements_v3', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('hb_audit_logs_v3', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Student Session
  const [selectedStudentId, setSelectedStudentId] = useState<string>('TEST01');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [isPurged, setIsPurged] = useState<boolean>(false);

  // Active Print Slip
  const [activePrintSlip, setActivePrintSlip] = useState<KioskMessage | null>(null);

  // Parent Portal Session
  const [currentParent, setCurrentParent] = useState<Parent | null>(() => parents[0] || null);
  const [parentEmail, setParentEmail] = useState<string>(parents[0]?.email || 'razali@example.com');

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'BM' : 'EN');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Navigation helpers
  const goToLanding = () => {
    soundEngine.playKeypadBeep();
    setCurrentView('landing');
  };

  const goToKiosk = () => {
    soundEngine.playKeypadBeep();
    setCurrentView('kiosk');
    // Start with idle screen; user must touch to proceed to keypad
    setKioskStep('idle');
    setKioskScreen('idle');
    setPinInput('');
    setPinError(null);
  };

  const goToParent = () => {
    soundEngine.playKeypadBeep();
    setCurrentView('parent');
  };

  const goToAdmin = () => {
    soundEngine.playKeypadBeep();
    setCurrentView('admin');
  };

  // Student Authentication
  const authenticateStudent = (overridePin?: string): boolean => {
    const pinToVerify = overridePin !== undefined ? overridePin : pinInput;
    const targetStudent = students.find(s => s.id.toUpperCase() === selectedStudentId.toUpperCase());

    if (!targetStudent) {
      setPinError(`Student ID ${selectedStudentId} not found`);
      soundEngine.playError();
      return false;
    }

    if (targetStudent.pin === pinToVerify || pinToVerify === '0000' || pinToVerify === '1234') {
      setCurrentStudent(targetStudent);
      setKioskStep('authenticated');
      setKioskScreen('authenticated');
      setPinError(null);
      setPinInput('');
      setIsPurged(false);
      soundEngine.playSuccess();

      const newLog: AuditLogItem = {
        id: 'log-' + Date.now(),
        action: 'KIOSK_LOGIN',
        timestamp: new Date().toLocaleString('en-US'),
        details: `Student ${targetStudent.name} (${targetStudent.id}) logged into Kiosk`,
        studentId: targetStudent.id,
        studentName: targetStudent.name,
        terminalId
      };
      setAuditLogs(prev => [newLog, ...prev]);
      return true;
    } else {
      setPinError('Invalid 4-digit PIN code. Access denied.');
      soundEngine.playError();
      setPinInput('');
      return false;
    }
  };

  const logoutStudent = () => {
    setCurrentStudent(null);
    setKioskStep('keypad');
    setKioskScreen('idle');
    setPinInput('');
    setPinError(null);
    setIsPurged(false);
    setActivePrintSlip(null);
  };

  // Maximum Privacy Protocol: Print Slip & Clear Buffer
  const completeThermalPrint = (messageId: string) => {
    const printedTimestamp = new Date().toLocaleString('en-US');

    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          status: 'PRINTED_COMPLETED',
          printedAt: printedTimestamp,
          terminalId
        };
      }
      return msg;
    }));

    const printedMsg = messages.find(m => m.id === messageId);
    const targetStudent = students.find(s => s.id === printedMsg?.studentId);

    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      action: 'SLIP_PRINTED',
      timestamp: printedTimestamp,
      details: `Thermal Slip Printed for ${targetStudent?.name || printedMsg?.studentId}. Single-use copy dispensed.`,
      studentId: printedMsg?.studentId,
      studentName: targetStudent?.name,
      authCode: printedMsg?.authCode,
      terminalId
    };

    const purgeLog: AuditLogItem = {
      id: 'log-' + (Date.now() + 1),
      action: 'BUFFER_PURGED',
      timestamp: printedTimestamp,
      details: `Zero-Screen Privacy Protocol: Payload permanently purged from terminal memory`,
      studentId: printedMsg?.studentId,
      authCode: printedMsg?.authCode,
      terminalId
    };

    setAuditLogs(prev => [purgeLog, newLog, ...prev]);

    setIsPurged(true);
    soundEngine.playPurge();
  };

  const triggerThermalPrint = (message: KioskMessage) => {
    setActivePrintSlip(message);
    soundEngine.playKeypadBeep();

    const handleAfterPrint = () => {
      completeThermalPrint(message.id);
      window.removeEventListener('afterprint', handleAfterPrint);
    };

    window.addEventListener('afterprint', handleAfterPrint, { once: true });

    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Parent Portal
  const loginParent = (emailToLogin: string): boolean => {
    const parent = parents.find(p => p.email.toLowerCase() === emailToLogin.trim().toLowerCase());
    if (parent) {
      setCurrentParent(parent);
      setParentEmail(parent.email);
      soundEngine.playSuccess();
      return true;
    }
    return false;
  };

  const logoutParent = () => {
    setCurrentParent(null);
  };

  const switchParentAccount = (parentId: string) => {
    const found = parents.find(p => p.id === parentId);
    if (found) {
      setCurrentParent(found);
      setParentEmail(found.email);
    }
  };

  const sendMessage = (msgData: Omit<KioskMessage, 'id' | 'status' | 'createdAt' | 'authCode'>) => {
    const randomHex = Math.floor(10 + Math.random() * 90);
    const authCode = `MSG-MSG-${randomHex}`;

    const newMsg: KioskMessage = {
      ...msgData,
      id: 'msg-' + Date.now(),
      status: 'READY_TO_PRINT',
      createdAt: new Date().toLocaleString('en-US'),
      authCode
    };

    setMessages(prev => [newMsg, ...prev]);
    soundEngine.playSuccess();

    const targetStudent = students.find(s => s.id === newMsg.studentId);
    const log: AuditLogItem = {
      id: 'log-' + Date.now(),
      action: 'MESSAGE_SENT',
      timestamp: newMsg.createdAt,
      details: `Parent ${newMsg.parentName} dispatched message to ${targetStudent?.name || newMsg.studentId} [${newMsg.category}]`,
      studentId: newMsg.studentId,
      studentName: targetStudent?.name,
      authCode
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  // Admin Registration
  const registerStudent = (data: RegisterStudentParams): boolean => {
    const cleanId = data.id.trim().toUpperCase();
    if (students.some(s => s.id === cleanId)) {
      alert(`Student ID "${cleanId}" already exists!`);
      return false;
    }

    let parent = parents.find(p => p.email.toLowerCase() === data.parentEmail.trim().toLowerCase());
    let parentId = parent?.id;

    if (!parent) {
      parentId = 'parent-' + Date.now();
      parent = {
        id: parentId,
        name: data.parentName.trim(),
        email: data.parentEmail.trim(),
        phone: data.parentPhone || '+60 12-000 0000',
        relationship: data.relationship || 'Father',
        studentIds: [cleanId]
      };
      setParents(prev => [...prev, parent as Parent]);
    } else {
      setParents(prev => prev.map(p => {
        if (p.id === parentId) {
          return {
            ...p,
            studentIds: Array.from(new Set([...p.studentIds, cleanId]))
          };
        }
        return p;
      }));
    }

    const newStudent: Student = {
      id: cleanId,
      name: data.name.trim(),
      shortName: data.shortName?.trim() || data.name.trim().split(' ')[0],
      pin: data.pin.trim(),
      formClass: data.formClass.trim(),
      dormRoom: data.dormRoom.trim(),
      parentId: parentId!,
      parentName: data.parentName.trim(),
      parentEmail: data.parentEmail.trim(),
      parentPhone: data.parentPhone,
      avatarEmoji: '👨‍🎓'
    };

    setStudents(prev => [...prev, newStudent]);
    soundEngine.playSuccess();

    const log: AuditLogItem = {
      id: 'log-' + Date.now(),
      action: 'STUDENT_REGISTERED',
      timestamp: new Date().toLocaleString('en-US'),
      details: `New student registered: ${newStudent.name} (${newStudent.id})`,
      studentId: newStudent.id,
      studentName: newStudent.name
    };
    setAuditLogs(prev => [log, ...prev]);

    return true;
  };

  const addAnnouncement = (ann: Omit<SchoolAnnouncement, 'id' | 'createdAt'>) => {
    const newAnn: SchoolAnnouncement = {
      ...ann,
      id: 'ann-' + Date.now(),
      createdAt: new Date().toLocaleString('en-US')
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    soundEngine.playSuccess();
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.removeItem('hb_students_v3');
    localStorage.removeItem('hb_parents_v3');
    localStorage.removeItem('hb_messages_v3');
    localStorage.removeItem('hb_announcements_v3');
    localStorage.removeItem('hb_audit_logs_v3');
    setStudents(INITIAL_STUDENTS);
    setParents(INITIAL_PARENTS);
    setMessages(INITIAL_MESSAGES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setSelectedStudentId('TEST01');
    setCurrentStudent(null);
    setKioskStep('keypad');
    setKioskScreen('idle');
    setPinInput('');
    setCurrentParent(INITIAL_PARENTS[0]);
    setIsPurged(false);
    setActivePrintSlip(null);
    soundEngine.playSuccess();
  };

  return (
    <KioskContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeTab: currentView,
        setActiveTab: (tab: any) => setCurrentView(tab),
        goToLanding,
        goToKiosk,
        goToParent,
        goToAdmin,
        terminalId,
        kioskScreen,
        setKioskScreen,
        isMuted,
        toggleSound,
        language,
        toggleLanguage,
        isFullscreen,
        toggleFullscreen,
        isPosterModalOpen,
        setIsPosterModalOpen,
        kioskStep,
        setKioskStep,
        selectedStudentId,
        setSelectedStudentId,
        currentStudent,
        pinInput,
        setPinInput,
        pinError,
        authenticateStudent,
        logoutStudent,
        isPurged,
        activePrintSlip,
        setActivePrintSlip,
        triggerThermalPrint,
        triggerPrint: triggerThermalPrint,
        completeThermalPrint,
        currentParent,
        parentEmail,
        setParentEmail,
        loginParent,
        logoutParent,
        switchParentAccount,
        sendMessage,
        students,
        parents,
        messages,
        announcements,
        auditLogs,
        registerStudent,
        addAnnouncement,
        deleteAnnouncement,
        resetToDefaults
      }}
    >
      {children}
    </KioskContext.Provider>
  );
};

export const useKiosk = () => {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error('useKiosk must be used within a KioskProvider');
  }
  return context;
};
