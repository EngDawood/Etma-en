import { useState } from "react";
import { User, Shield, Clock, Trash2, Plus, Info } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../context/AppContext";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { DoctorAccessGrant } from "../types";
import { format, formatDistanceToNow } from "date-fns";

export function Profile() {
  const { userProfile, doctorAccess, setDoctorAccess } = useAppContext();
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);

  const handleGrantAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const durationHours = parseInt(formData.get("duration") as string, 10);
    
    const newGrant: DoctorAccessGrant = {
      id: uuidv4(),
      doctorName: formData.get("doctorName") as string,
      specialty: formData.get("specialty") as string,
      grantedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + durationHours * 60 * 60 * 1000).toISOString(),
      status: "active",
    };

    setDoctorAccess([newGrant, ...doctorAccess]);
    setIsGrantModalOpen(false);
  };

  const handleRevoke = (id: string) => {
    setDoctorAccess(
      doctorAccess.map((grant) =>
        grant.id === id ? { ...grant, status: "revoked" } : grant
      )
    );
  };

  return (
    <div className="pb-6">
      <PageHeader title="Profile" />

      {/* User Card */}
      <div className="px-4 mt-6">
        <Card className="flex items-center gap-4 p-5 bg-gradient-to-br from-[var(--color-primary)] to-teal-800 border-none">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold border-2 border-white/30">
            {userProfile.initials}
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold">{userProfile.name}</h2>
            <p className="text-white/80 text-sm mt-0.5">{userProfile.email}</p>
          </div>
        </Card>
      </div>

      {/* Doctor Access Management */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--color-primary)]" />
            Doctor Access
          </h3>
          <Button size="sm" variant="outline" onClick={() => setIsGrantModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Grant
          </Button>
        </div>

        <div className="space-y-3">
          {doctorAccess.map((grant) => {
            const isExpired = new Date(grant.expiresAt) < new Date();
            const isActive = grant.status === "active" && !isExpired;

            return (
              <Card key={grant.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[var(--color-text-primary)]">{grant.doctorName}</h4>
                    <p className="text-sm text-[var(--color-text-secondary)]">{grant.specialty}</p>
                  </div>
                  {isActive ? (
                    <Badge variant="success">Active</Badge>
                  ) : grant.status === "revoked" ? (
                    <Badge variant="danger">Revoked</Badge>
                  ) : (
                    <Badge variant="neutral">Expired</Badge>
                  )}
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {isActive ? (
                      <span>Expires in {formatDistanceToNow(new Date(grant.expiresAt))}</span>
                    ) : (
                      <span>Expired {format(new Date(grant.expiresAt), "MMM d, yyyy")}</span>
                    )}
                  </div>
                  {isActive && (
                    <button
                      onClick={() => handleRevoke(grant.id)}
                      className="text-xs font-medium text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] px-2 py-1 rounded transition-colors"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
          {doctorAccess.length === 0 && (
            <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              No active access grants.
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 mt-8 mb-4">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-[var(--color-primary)]" />
          About App
        </h3>
        <Card className="bg-gray-50 border-none space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-gray-500 text-sm">App Name</span>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
              <span className="font-semibold text-[var(--color-primary)]">Etma'en</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-gray-500 text-sm">Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-gray-500 text-sm">Course</span>
            <span className="font-medium text-sm text-right">SE411 · Sec 1383<br/>Software Construction</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-gray-500 text-sm">Academic Year</span>
            <span className="font-medium text-sm">2025–2026</span>
          </div>
          <div>
            <span className="text-gray-500 text-sm block mb-2">Team Members</span>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span className="font-medium text-sm">Mira Kasem</span>
                <span className="text-xs text-gray-500 font-mono">222411027</span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                <span className="font-medium text-sm">Leen Hashem</span>
                <span className="text-xs text-gray-500 font-mono">222410967</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Grant Access Modal */}
      <Modal isOpen={isGrantModalOpen} onClose={() => setIsGrantModalOpen(false)} title="Grant Doctor Access">
        <form onSubmit={handleGrantAccess} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
            <input required name="doctorName" type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g., Dr. Ahmed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <input required name="specialty" type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g., General Practice" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select required name="duration" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none bg-white">
              <option value="6">6 Hours</option>
              <option value="24">24 Hours</option>
              <option value="48">48 Hours</option>
              <option value="168">1 Week</option>
            </select>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl flex gap-2 items-start mt-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-800 leading-relaxed">
              This doctor will have read-only access to your medical records and active medications until the access expires.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" fullWidth onClick={() => setIsGrantModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" fullWidth>Grant Access</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
