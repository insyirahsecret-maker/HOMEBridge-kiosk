# 🏠 HOMEBridge — Boarding School Communication Kiosk
### SBP Integrasi Kuantan (INTEK) | Zero-Screen Privacy Protocol

![HOMEBridge Kiosk](https://img.shields.io/badge/HOMEBridge-Kiosk%20v1.0-ff3b94?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss)

---

## 📋 Overview

**HOMEBridge** is a secure parent-to-student communication kiosk system designed for SBP Integrasi Kuantan boarding school. It enables parents to send messages to their children, which are then printed as **single-use thermal receipts** on POS 58mm/80mm printers — with **zero message preview** on the public kiosk screen (Maximum Privacy Protocol).

---

## ✨ Features

### 🖥️ Student Kiosk (Maximum Privacy Protocol)
- **Touchscreen Keypad Login** — Select Student ID + 4-digit PIN
- **Zero-Screen Exposure** — Message content is NEVER displayed on screen
- **Status Indicator Only** — Shows "You have [X] New Message(s) Ready"
- **Single-Use Thermal Slip** — `Print Slip` button triggers `window.print()`
- **Auto-Purge on Print** — Message deleted from memory after printing (`window.onafterprint`)

### 👨‍👩‍👧 Parent Portal
- Email-based login (no password required for demo)
- Compose messages with quick-fill templates
- **Live Print Status Tracking** — Pending → Printed & Completed
- Switch between multiple children

### 🛡️ Admin / Warden Portal
- Register new students with enrollment form
- Manage school announcements
- View audit logs

### 🧾 58mm POS Thermal Print
- `@page { size: 58mm auto; }` — calibrated for 58mm paper rolls
- Usable width: 54mm (2mm margin each side)
- High-contrast black monospace receipt with school header, sender info, message body, and barcode
- Auto-clears message from kiosk memory post-print

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ ([download](https://nodejs.org))
- npm v9+

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/homebridge-kiosk.git
cd homebridge-kiosk
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Demo Credentials

| Role | ID / Email | PIN / Password |
|------|-----------|----------------|
| Student | `TEST01` (Ahmad Zulkifli) | `0000` or `1234` |
| Student | `TEST02` (Nur Hidayah) | `0000` |
| Student | `TEST03` (Muhammad Hafizuddin) | `0000` |
| Parent | `parent1@demo.com` | *(any)* |
| Parent | `parent2@demo.com` | *(any)* |

---

## 🖨️ Thermal Printer Setup

Tested with standard **58mm POS receipt printers**. In your browser print dialog:
- Paper size: `58mm × Custom`
- Margins: `None`
- Scale: `100%`
- Uncheck "Headers and footers"

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Effects | Canvas Confetti |
| State | React Context API |
| Storage | localStorage (demo mode) |

---

## 📁 Project Structure

```
homebridge-kiosk/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx          # 2-card landing (Student Kiosk & Parent Portal)
│   │   ├── StudentKiosk/
│   │   │   ├── KioskTerminal.tsx    # Keypad login + Maximum Privacy Protocol screen
│   │   │   └── ThermalSlip.tsx      # 58mm thermal print target (#thermal-slip)
│   │   ├── ParentPortal/
│   │   │   └── ParentPortal.tsx     # Login + compose + live status tracker
│   │   └── AdminPortal/
│   │       └── AdminPortal.tsx      # Student registration + audit logs
│   ├── context/
│   │   └── KioskContext.tsx         # Global state & navigation (goToKiosk, goToParent, etc.)
│   ├── data/
│   │   └── mockData.ts              # Demo students, parents, messages
│   ├── types.ts                     # TypeScript interfaces
│   └── index.css                    # Tailwind + @media print for 58mm thermal
├── index.html
├── vite.config.ts
└── tailwind.config.js
```

---

## 📜 License

MIT — SBP Integrasi Kuantan Research Project

---

*Built with 💜 for SBP Integrasi Kuantan boarding school students and their families.*
