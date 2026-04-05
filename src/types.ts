export interface Medication {
  id: string;
  name: string;
  dosage: string;
  prescriber: string;
  timing: string[];
  startDate: string;
  status: "active" | "inactive";
  notes: string;
}

export interface MedicalRecord {
  id: string;
  name: string;
  category: "lab" | "imaging" | "report" | "prescription" | "other";
  uploadDate: string;
  size: string;
  notes: string;
}

export interface DoctorAccessGrant {
  id: string;
  doctorName: string;
  specialty: string;
  grantedAt: string;
  expiresAt: string;
  status: "active" | "expired" | "revoked";
}

export interface UserProfile {
  name: string;
  initials: string;
  email: string;
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: "high" | "medium" | "low";
  description: string;
}
