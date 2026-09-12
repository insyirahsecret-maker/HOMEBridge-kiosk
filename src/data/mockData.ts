import { Student, Parent, KioskMessage, SchoolAnnouncement } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'TEST01',
    name: 'Ahmad Daniel Bin Razali',
    shortName: 'Ahmad',
    pin: '0000',
    formClass: 'Form 4 Al-Khawarizmi',
    dormRoom: 'Boys Dorm Block A (Room 104)',
    parentId: 'parent-01',
    parentName: 'Mr. Razali Bin Othman',
    parentEmail: 'razali@example.com',
    parentPhone: '+60 12-345 6789',
    avatarEmoji: '👨‍🎓'
  },
  {
    id: 'TEST02',
    name: 'Nur Aisyah Binti Razali',
    shortName: 'Nur',
    pin: '0000',
    formClass: 'Form 2 Az-Zahrawi',
    dormRoom: 'Girls Dorm Block B (Room 102)',
    parentId: 'parent-01',
    parentName: 'Mr. Razali Bin Othman',
    parentEmail: 'razali@example.com',
    parentPhone: '+60 12-345 6789',
    avatarEmoji: '🧕'
  },
  {
    id: 'TEST03',
    name: 'Muhammad Amir Bin Zulkifli',
    shortName: 'Muhammad',
    pin: '0000',
    formClass: 'Form 5 Ibnu Sina',
    dormRoom: 'Boys Dorm Block C (Room 201)',
    parentId: 'parent-02',
    parentName: 'Dr. Zulkifli Bin Ismail',
    parentEmail: 'zulkifli@example.com',
    parentPhone: '+60 13-222 8844',
    avatarEmoji: '🧑‍🎓'
  },
  {
    id: 'SBPI04',
    name: 'Siti Sarah Binti Hamdan',
    shortName: 'Siti',
    pin: '0000',
    formClass: 'Form 3 Al-Farabi',
    dormRoom: 'Girls Dorm Block B (Room 205)',
    parentId: 'parent-03',
    parentName: 'Puan Noraini Binti Ahmad',
    parentEmail: 'noraini@example.com',
    parentPhone: '+60 19-876 5432',
    avatarEmoji: '👩‍🎓'
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    id: 'parent-01',
    name: 'Mr. Razali Bin Othman',
    email: 'razali@example.com',
    phone: '+60 12-345 6789',
    relationship: 'Father',
    studentIds: ['TEST01', 'TEST02']
  },
  {
    id: 'parent-02',
    name: 'Dr. Zulkifli Bin Ismail',
    email: 'zulkifli@example.com',
    phone: '+60 13-222 8844',
    relationship: 'Father',
    studentIds: ['TEST03']
  },
  {
    id: 'parent-03',
    name: 'Puan Noraini Binti Ahmad',
    email: 'noraini@example.com',
    phone: '+60 19-876 5432',
    relationship: 'Mother',
    studentIds: ['SBPI04']
  }
];

export const INITIAL_MESSAGES: KioskMessage[] = [
  {
    id: 'msg-001',
    studentId: 'TEST01',
    parentId: 'parent-01',
    parentName: 'Mr. Razali Bin Othman',
    relationship: 'Father',
    parentPhone: '+60 12-345 6789',
    category: 'Health & Well-being',
    priority: 'IMPORTANT',
    content: "Don't forget your dental appointment on Saturday morning at 10:30 AM. Father will pick you up at the guardhouse.",
    status: 'READY_TO_PRINT',
    createdAt: '8/26/2026, 2:15:00 PM',
    authCode: 'MSG-MSG-02'
  },
  {
    id: 'msg-002',
    studentId: 'TEST02',
    parentId: 'parent-01',
    parentName: 'Mr. Razali Bin Othman',
    relationship: 'Father',
    parentPhone: '+60 12-345 6789',
    category: 'Outing Schedule',
    priority: 'NORMAL',
    content: 'Aisyah, Ayah will come for the scheduled outing this weekend at 10:30 AM. Please finish your prep homework earlier.',
    status: 'READY_TO_PRINT',
    createdAt: '8/26/2026, 3:30:00 PM',
    authCode: 'MSG-MSG-03'
  },
  {
    id: 'msg-003',
    studentId: 'TEST03',
    parentId: 'parent-02',
    parentName: 'Dr. Zulkifli Bin Ismail',
    relationship: 'Father',
    parentPhone: '+60 13-222 8844',
    category: 'Allowance / Pocket Money',
    priority: 'NORMAL',
    content: 'Amir, pocket money RM80 has been deposited to the finance office for your book purchase. Study hard for trial exams.',
    status: 'READY_TO_PRINT',
    createdAt: '8/26/2026, 4:10:00 PM',
    authCode: 'MSG-MSG-04'
  }
];

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-01',
    title: 'Weekend Outing Permission & Guard Gate Procedure',
    category: 'OUTING',
    content: 'All students with approved outing schedules may leave the campus from 9:00 AM to 6:00 PM. Please bring your matrix card and warden verification slip.',
    author: 'Student Affairs (HEM)',
    createdAt: '8/26/2026, 9:00 AM',
    isPinned: true,
    priority: 'HIGH'
  },
  {
    id: 'ann-02',
    title: 'Dormitory Room Inspection & Cleanliness Discipline (Block A & B)',
    category: 'DORMITORY',
    content: 'Weekly inspection will be conducted by the Warden Council on Saturday night at 9:30 PM. Ensure beds are neatly made and wardrobes locked.',
    author: 'Head Warden',
    createdAt: '8/25/2026, 8:30 PM',
    isPinned: false,
    priority: 'NORMAL'
  }
];
