import React, { createContext, useContext, ReactNode } from "react";
import { DoctorAccessGrant, MedicalRecord, Medication, UserProfile } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialDoctorAccess, initialMedications, initialRecords, initialUserProfile } from "../data/seedData";

interface AppContextType {
  medications: Medication[];
  setMedications: (meds: Medication[]) => void;
  records: MedicalRecord[];
  setRecords: (records: MedicalRecord[]) => void;
  doctorAccess: DoctorAccessGrant[];
  setDoctorAccess: (access: DoctorAccessGrant[]) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [medications, setMedications] = useLocalStorage<Medication[]>("etmaen_medications", initialMedications);
  const [records, setRecords] = useLocalStorage<MedicalRecord[]>("etmaen_records", initialRecords);
  const [doctorAccess, setDoctorAccess] = useLocalStorage<DoctorAccessGrant[]>("etmaen_doctor_access", initialDoctorAccess);
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>("etmaen_user_profile", initialUserProfile);

  return (
    <AppContext.Provider
      value={{
        medications,
        setMedications,
        records,
        setRecords,
        doctorAccess,
        setDoctorAccess,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
