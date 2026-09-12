export type MessageCategory = 
  | 'Urgent Family Notice'
  | 'Outing Schedule'
  | 'Allowance / Pocket Money'
  | 'Exam Encouragement'
  | 'Health & Well-being'
  | 'General Reminder';

export type PriorityLevel = 'NORMAL' | 'IMPORTANT' | 'URGENT';

export type MessageStatus = 'READY_TO_PRINT' | 'PRINTED_COMPLETED';

export type ParentRelationship = 'Father' | 'Mother' | 'Guardian' | 'Ibu' | 'Bapa' | 'Penjaga';

export interface Student {
  id: string;              // e.g. "TEST01", "TEST02"
  name: string;            // e.g. "Ahmad Daniel Bin Razali"
  shortName: string;       // e.g. "Ahmad"
  pin: string;             // 4-digit PIN e.g. "0000"
  formClass: string;       // e.g. "Form 4 Al-Khawarizmi"
  dormRoom: string;        // e.g. "Boys Dorm Block A (Room 104)"
  parentId: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  avatarEmoji?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: ParentRelationship;
  studentIds: string[];
}

export interface KioskMessage {
  id: string;
  studentId: string;
  parentId: string;
  parentName: string;
  relationship: string;
  parentPhone?: string;
  category: MessageCategory;
  priority: PriorityLevel;
  content: string;
  status: MessageStatus;
  createdAt: string;
  printedAt?: string;
  terminalId?: string;
  authCode: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  category: 'OUTING' | 'ACADEMIC' | 'DORMITORY' | 'EMERGENCY' | 'GENERAL';
  content: string;
  author: string;
  createdAt: string;
  isPinned: boolean;
  priority: 'HIGH' | 'NORMAL';
}

export interface AuditLogItem {
  id: string;
  action: 'SLIP_PRINTED' | 'MESSAGE_SENT' | 'STUDENT_REGISTERED' | 'BUFFER_PURGED' | 'KIOSK_LOGIN';
  timestamp: string;
  details: string;
  studentId?: string;
  studentName?: string;
  authCode?: string;
  terminalId?: string;
}

export type ViewMode = 'landing' | 'kiosk' | 'parent' | 'admin';
export type KioskStep = 'idle' | 'keypad' | 'authenticated';

