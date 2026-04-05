import { DoctorAccessGrant, MedicalRecord, Medication, UserProfile } from "../types";

export const initialMedications: Medication[] = [
  {
    id: "1",
    name: "Metformin",
    dosage: "500mg",
    prescriber: "Dr. K. Al-Rashid",
    timing: ["morning", "evening"],
    startDate: "2025-01-01",
    status: "active",
    notes: "",
  },
  {
    id: "2",
    name: "Warfarin",
    dosage: "5mg",
    prescriber: "Dr. S. Al-Otaibi",
    timing: ["evening"],
    startDate: "2025-02-15",
    status: "active",
    notes: "",
  },
  {
    id: "3",
    name: "Aspirin",
    dosage: "100mg",
    prescriber: "",
    timing: ["morning"],
    startDate: "2025-03-01",
    status: "active",
    notes: "",
  },
  {
    id: "4",
    name: "Lisinopril",
    dosage: "10mg",
    prescriber: "Dr. K. Al-Rashid",
    timing: ["morning"],
    startDate: "2024-11-20",
    status: "active",
    notes: "",
  },
];

export const initialRecords: MedicalRecord[] = [
  {
    id: "1",
    name: "Blood Test Results.pdf",
    category: "lab",
    uploadDate: "2025-03-12",
    size: "2.3 MB",
    notes: "",
  },
  {
    id: "2",
    name: "Chest X-Ray.jpg",
    category: "imaging",
    uploadDate: "2025-02-20",
    size: "4.1 MB",
    notes: "",
  },
  {
    id: "3",
    name: "Cardiology Report.docx",
    category: "report",
    uploadDate: "2025-01-09",
    size: "1.2 MB",
    notes: "",
  },
  {
    id: "4",
    name: "ECG Reading.pdf",
    category: "imaging",
    uploadDate: "2024-12-15",
    size: "3.5 MB",
    notes: "",
  },
  {
    id: "5",
    name: "Prescription History.xlsx",
    category: "prescription",
    uploadDate: "2024-11-30",
    size: "0.8 MB",
    notes: "",
  },
];

export const initialDoctorAccess: DoctorAccessGrant[] = [
  {
    id: "1",
    doctorName: "Dr. Khalid Al-Rashid",
    specialty: "Cardiology",
    grantedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(), // 18 hours from now
    status: "active",
  },
];

export const initialUserProfile: UserProfile = {
  name: "Layla Al-Farsi",
  initials: "LA",
  email: "layla.alfarsi@example.com",
};
