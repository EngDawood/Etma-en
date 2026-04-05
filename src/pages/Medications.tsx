import { useState, useMemo } from "react";
import { Plus, QrCode, Pill, MoreVertical, AlertTriangle, Edit2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../context/AppContext";
import { PageHeader } from "../components/layout/PageHeader";
import { SearchBar } from "../components/ui/SearchBar";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Medication } from "../types";
import { INTERACTIONS } from "../data/interactions";
import { X } from "lucide-react";

export function Medications() {
  const { medications, setMedications } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const activeInteractions = useMemo(() => {
    const activeMeds = medications.filter((m) => m.status === "active").map((m) => m.name.toLowerCase());
    return INTERACTIONS.filter(
      (interaction) => activeMeds.includes(interaction.drug1) && activeMeds.includes(interaction.drug2)
    );
  }, [medications]);

  const filteredMeds = useMemo(() => {
    return medications.filter((med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [medications, searchQuery]);

  const activeCount = medications.filter((m) => m.status === "active").length;

  const handleAddMed = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const timings = [];
    if (formData.get("morning")) timings.push("morning");
    if (formData.get("evening")) timings.push("evening");
    if (formData.get("night")) timings.push("night");

    const newMed: Medication = {
      id: uuidv4(),
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      prescriber: formData.get("prescriber") as string,
      timing: timings,
      startDate: formData.get("startDate") as string,
      status: "active",
      notes: formData.get("notes") as string,
    };

    setMedications([...medications, newMed]);
    setIsAddModalOpen(false);
  };

  const handleEditMed = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedMed) return;

    const formData = new FormData(e.currentTarget);
    const timings = [];
    if (formData.get("morning")) timings.push("morning");
    if (formData.get("evening")) timings.push("evening");
    if (formData.get("night")) timings.push("night");

    const updatedMed: Medication = {
      ...selectedMed,
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      prescriber: formData.get("prescriber") as string,
      timing: timings,
      startDate: formData.get("startDate") as string,
      notes: formData.get("notes") as string,
    };

    setMedications(medications.map((m) => (m.id === updatedMed.id ? updatedMed : m)));
    setSelectedMed(updatedMed);
    setIsEditMode(false);
  };

  const handleDelete = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
    setSelectedMed(null);
    setIsEditMode(false);
  };

  return (
    <div className="pb-6">
      <PageHeader
        title="Medications"
        subtitle={`${activeCount} active · ${activeInteractions.length} interaction`}
        rightElement={
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        }
      />

      <div className="px-4 mt-4">
        <SearchBar
          placeholder="Search by name or ingredient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 mt-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors gap-2"
        >
          <Plus className="w-6 h-6 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Enter manually</span>
        </button>
        <button
          onClick={() => setIsScannerOpen(true)}
          className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors gap-2"
        >
          <QrCode className="w-6 h-6 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">Scan barcode</span>
        </button>
      </div>

      <div className="px-4 mt-6 space-y-3">
        {filteredMeds.map((med) => {
          const hasInteraction = activeInteractions.some(
            (i) => i.drug1 === med.name.toLowerCase() || i.drug2 === med.name.toLowerCase()
          );

          return (
            <Card key={med.id} onClick={() => setSelectedMed(med)} className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  hasInteraction ? "bg-[var(--color-danger-light)] text-[var(--color-danger)]" : "bg-teal-50 text-[var(--color-primary)]"
                }`}
              >
                <Pill className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{med.name}</h3>
                  {hasInteraction ? (
                    <Badge variant="danger" className="shrink-0 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Interaction
                    </Badge>
                  ) : (
                    <Badge variant="success" className="shrink-0">
                      Active
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-0.5">{med.dosage}</div>
                <div className="text-xs text-gray-500 mt-2 flex items-center justify-between">
                  <span>{med.prescriber || "No prescriber"}</span>
                  <span className="capitalize">{med.timing.join(" & ")}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Medication Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Medication">
        <form onSubmit={handleAddMed} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
            <input required name="name" type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g., Metformin" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
            <input required name="dosage" type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g., 500mg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prescriber</label>
            <input name="prescriber" type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g., Dr. Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timing</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="morning" className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" /> Morning
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="evening" className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" /> Evening
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="night" className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" /> Night
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input required name="startDate" type="date" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea name="notes" rows={2} className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="Optional notes..."></textarea>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" fullWidth onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" fullWidth>Save</Button>
          </div>
        </form>
      </Modal>

      {/* Medication Detail Modal */}
      <Modal isOpen={!!selectedMed} onClose={() => { setSelectedMed(null); setIsEditMode(false); }} title={isEditMode ? "Edit Medication" : "Medication Details"}>
        {selectedMed && !isEditMode && (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-4 relative">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-[var(--color-primary)]">
                <Pill className="w-8 h-8" />
              </div>
              <button onClick={() => setIsEditMode(true)} className="absolute right-0 top-0 p-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{selectedMed.name}</h3>
              <p className="text-[var(--color-text-secondary)]">{selectedMed.dosage}</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Prescriber</span>
                <span className="font-medium text-sm">{selectedMed.prescriber || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Timing</span>
                <span className="font-medium text-sm capitalize">{selectedMed.timing.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Start Date</span>
                <span className="font-medium text-sm">{selectedMed.startDate}</span>
              </div>
              {selectedMed.notes && (
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-gray-500 text-sm block mb-1">Notes</span>
                  <p className="text-sm">{selectedMed.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="danger" fullWidth onClick={() => handleDelete(selectedMed.id)}>Delete</Button>
              <Button variant="outline" fullWidth onClick={() => setSelectedMed(null)}>Close</Button>
            </div>
          </div>
        )}

        {selectedMed && isEditMode && (
          <form onSubmit={handleEditMed} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
              <input required name="name" defaultValue={selectedMed.name} type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
              <input required name="dosage" defaultValue={selectedMed.dosage} type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prescriber</label>
              <input name="prescriber" defaultValue={selectedMed.prescriber} type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timing</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="morning" defaultChecked={selectedMed.timing.includes("morning")} className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" /> Morning
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="evening" defaultChecked={selectedMed.timing.includes("evening")} className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" /> Evening
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="night" defaultChecked={selectedMed.timing.includes("night")} className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" /> Night
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input required name="startDate" defaultValue={selectedMed.startDate} type="date" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea name="notes" defaultValue={selectedMed.notes} rows={2} className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"></textarea>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" fullWidth onClick={() => setIsEditMode(false)}>Cancel</Button>
              <Button type="submit" variant="primary" fullWidth>Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Barcode Scanner Overlay */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="p-4 flex justify-between items-center bg-black/50 absolute top-0 left-0 right-0 z-10">
            <h2 className="text-white font-semibold">Scan Barcode</h2>
            <button onClick={() => setIsScannerOpen(false)} className="text-white p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 relative flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-white/50 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)] animate-[scan_2s_ease-in-out_infinite]"></div>
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
            </div>
            <p className="absolute bottom-24 text-white/80 text-sm text-center px-8">
              Align medication barcode within the frame
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Need to import X for scanner
import { X } from "lucide-react";
