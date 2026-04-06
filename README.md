# Etma'en — Unified Healthcare Record System

**Etma'en** is a mobile-first React web application designed to centralize patient medical records across hospitals, clinics, pharmacies, and labs. It empowers patients to manage their health data securely in one place and share it with healthcare providers.

---

## 🎓 Academic Information
* **Course:** SE411 · Software Construction
* **Section:** 1383
* **Academic Year:** 2025–2026
* **Team Members:**
  * Mira Kasem (222411027)
  * Leen Hashem (222410967)

---

## ✨ Features

* **Dashboard:** A comprehensive overview of active medications, medical files, active doctor access grants, and drug interaction alerts.
* **Medications Management:** Track active and past medications, including dosages and schedules. Includes an edit mode to update medication details.
* **Medical Records:** Upload, categorize, and manage medical documents (e.g., Lab Results, Prescriptions, Imaging).
* **Doctor Access Control:** Securely grant temporary, read-only access to healthcare providers (e.g., 6 hours, 24 hours) and revoke access at any time.
* **AI Health Assistant:** An integrated AI chatbot powered by the Google Gemini API to help answer questions based on the user's medical records and medications.
* **Drug Interaction Alerts:** Automated warnings for potential interactions between active medications.

---

## 🛠️ Tech Stack

* **Framework:** React 18 with Vite
* **Routing:** React Router v6
* **State Management:** React Context API + `useReducer` (persisted via `localStorage`)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **AI Integration:** Google Gemini API (`@google/genai`)
* **Date Formatting:** `date-fns`
* **ID Generation:** `uuid`

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd etmaen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Visit `http://localhost:3000` in your browser.

---

## 📱 Design System

* **Typography:** Sora (Headings) & DM Sans (Body)
* **Primary Color:** Teal (`#1A6B6B`)
* **Layout:** Mobile-first design, optimized for a maximum width of `430px` (standard mobile screen size), centered on desktop displays.

---

## 📁 Project Structure

```text
/
├── public/             # Static assets (e.g., logo.png)
├── src/
│   ├── components/     # Reusable UI components (Cards, Modals, Layout)
│   ├── context/        # React Context for global state management
│   ├── data/           # Seed data and hardcoded interactions
│   ├── lib/            # Utility functions (e.g., Tailwind class merging)
│   ├── pages/          # Main application pages (Home, Meds, Records, AI, Profile)
│   ├── types/          # TypeScript interfaces and types
│   ├── App.tsx         # Main application component and routing
│   ├── index.css       # Global styles and Tailwind configuration
│   └── main.tsx        # Application entry point
├── .env.example        # Example environment variables
├── package.json        # Project dependencies and scripts
└── vite.config.ts      # Vite configuration
```
