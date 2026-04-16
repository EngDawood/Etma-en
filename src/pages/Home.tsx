import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Bell, Plus, Upload, Shield, Bot, CheckCircle2, Circle } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { DrugInteractionAlert } from "../components/shared/DrugInteractionAlert";
import { INTERACTIONS } from "../data/interactions";
import { format, differenceInDays } from "date-fns";

export function Home() {
  const { userProfile, medications, records, doctorAccess } = useAppContext();

  const activeInteractions = useMemo(() => {
    const activeMeds = medications.filter((m) => m.status === "active").map((m) => m.name.toLowerCase());
    return INTERACTIONS.filter(
      (interaction) => activeMeds.includes(interaction.drug1) && activeMeds.includes(interaction.drug2)
    );
  }, [medications]);

  const activeAccessCount = doctorAccess.filter(
    (a) => a.status === "active" && new Date(a.expiresAt) > new Date()
  ).length;

  const lastUploadDays = useMemo(() => {
    if (records.length === 0) return null;
    const latest = new Date(Math.max(...records.map((r) => new Date(r.uploadDate).getTime())));
    return differenceInDays(new Date(), latest);
  }, [records]);

  const todayMeds = medications.filter((m) => m.status === "active");

  return (
    <div className="pb-6">
      <PageHeader
        title={
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Etma'en Logo" className="w-8 h-8 object-contain" />
            <span>Etma'en</span>
          </div>
        }
        rightElement={
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-6 h-6" />
              {activeInteractions.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[var(--color-danger)] rounded-full border-2 border-[var(--color-bg)]"></span>
              )}
            </button>
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
              {userProfile.initials}
            </div>
          </div>
        }
      />

      <div className="px-4 mt-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Good morning, {userProfile.name.split(" ")[0]}
        </h2>
        <p className="text-[var(--color-text-secondary)] mt-1">
          {format(new Date(), "EEEE, MMMM d")} · System online
        </p>
      </div>

      <DrugInteractionAlert interactions={activeInteractions} />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 mt-6">
        <Card className="bg-[var(--color-primary-light)] border-none">
          <div className="text-3xl font-bold text-[var(--color-primary)]">{medications.length}</div>
          <div className="text-sm font-medium text-[var(--color-primary)]/80 mt-1">Medications</div>
          {activeInteractions.length > 0 && (
            <Badge variant="danger" className="mt-2 inline-block">
              {activeInteractions.length} interaction
            </Badge>
          )}
        </Card>
        <Card>
          <div className="text-3xl font-bold text-[var(--color-text-primary)]">{records.length}</div>
          <div className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">Medical Files</div>
          {lastUploadDays !== null && (
            <div className="text-xs text-gray-500 mt-2">Last upload {lastUploadDays === 0 ? "today" : `${lastUploadDays}d ago`}</div>
          )}
        </Card>
        <Card>
          <div className="text-3xl font-bold text-[var(--color-text-primary)]">{activeAccessCount}</div>
          <div className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">Doctor Access</div>
          {activeAccessCount > 0 && (
            <div className="text-xs text-[var(--color-success)] mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></span> Active
            </div>
          )}
        </Card>
        <Card>
          <div className="text-3xl font-bold text-[var(--color-text-primary)]">12</div>
          <div className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">AI Queries</div>
          <div className="text-xs text-[var(--color-primary)] mt-2">Your records only</div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Today's Schedule</h3>
          <Link to="/meds" className="text-sm font-medium text-[var(--color-primary)]">View all</Link>
        </div>
        <div className="space-y-3">
          {todayMeds.slice(0, 3).map((med, idx) => (
            <Card key={med.id} className="flex items-center gap-4 p-3">
              <button className="text-gray-300 hover:text-[var(--color-success)] transition-colors">
                {idx === 0 ? <CheckCircle2 className="w-6 h-6 text-[var(--color-success)]" /> : <Circle className="w-6 h-6" />}
              </button>
              <div className="flex-1">
                <div className="font-semibold text-[var(--color-text-primary)]">{med.name}</div>
                <div className="text-sm text-[var(--color-text-secondary)]">{med.dosage} · {med.timing.join(", ")}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-8">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/meds" className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 gap-2 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[var(--color-primary)]">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Med</span>
          </Link>
          <Link to="/records" className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 gap-2 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700">Upload File</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 gap-2 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700">Doctor Access</span>
          </Link>
          <Link to="/ai" className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-200 gap-2 active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700">Ask AI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
