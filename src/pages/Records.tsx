import React, { useState, useMemo } from "react";
import { Upload, FileText, Image as ImageIcon, FileSpreadsheet, ShieldCheck, MoreVertical, Edit2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../context/AppContext";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { MedicalRecord } from "../types";
import { format } from "date-fns";

export function Records() {
  const { records, setRecords } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const tabs = [
    { id: "all", label: "All" },
    { id: "lab", label: "Lab" },
    { id: "imaging", label: "Imaging" },
    { id: "report", label: "Report" },
    { id: "prescription", label: "Prescription" },
  ];

  const filteredRecords = useMemo(() => {
    if (activeTab === "all") return records;
    return records.filter((r) => r.category === activeTab);
  }, [records, activeTab]);

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRecord: MedicalRecord = {
      id: uuidv4(),
      name: formData.get("name") as string,
      category: formData.get("category") as MedicalRecord["category"],
      uploadDate: new Date().toISOString().split("T")[0],
      size: "1.5 MB", // Simulated
      notes: formData.get("notes") as string,
    };

    setRecords([newRecord, ...records]);
    setIsUploadModalOpen(false);
  };

  const handleEditRecord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRecord) return;

    const formData = new FormData(e.currentTarget);
    
    const updatedRecord: MedicalRecord = {
      ...selectedRecord,
      name: formData.get("name") as string,
      category: formData.get("category") as MedicalRecord["category"],
      notes: formData.get("notes") as string,
    };

    setRecords(records.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)));
    setSelectedRecord(updatedRecord);
    setIsEditMode(false);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
    setSelectedRecord(null);
    setIsEditMode(false);
  };

  const getFileIcon = (category: string) => {
    switch (category) {
      case "imaging": return <ImageIcon className="w-5 h-5" />;
      case "prescription": return <FileSpreadsheet className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="pb-6">
      <PageHeader
        title="Medical Records"
        subtitle={
          <div className="flex items-center gap-1 text-[var(--color-success)]">
            <ShieldCheck className="w-4 h-4" /> Encrypted storage
          </div>
        }
      />

      <div className="px-4 md:px-8 mt-6">
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="w-full flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Upload className="w-6 h-6" />
          </div>
          <div className="text-center">
            <span className="text-sm font-semibold text-[var(--color-text-primary)] block">Upload Medical File</span>
            <span className="text-xs text-gray-500 mt-1 block">PDF, Word, Excel, Images, DICOM</span>
          </div>
        </button>
      </div>

      <div className="mt-6 px-4 md:px-8">
        <div className="flex overflow-x-auto hide-scrollbar pb-2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                record.category === 'lab' ? 'bg-blue-50 text-blue-600' :
                record.category === 'imaging' ? 'bg-purple-50 text-purple-600' :
                record.category === 'report' ? 'bg-green-50 text-green-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                {getFileIcon(record.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{record.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={record.category as any} className="uppercase text-[10px] tracking-wider">
                    {record.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{record.uploadDate}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setSelectedRecord(record)}>
                View
              </Button>
            </Card>
          ))}
        </div>
        {filteredRecords.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No records found in this category.
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload Record">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
            <input required name="name" type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="e.g., Blood Test Results" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select required name="category" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none bg-white">
              <option value="lab">Lab Result</option>
              <option value="imaging">Imaging (X-Ray, MRI)</option>
              <option value="report">Medical Report</option>
              <option value="prescription">Prescription</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea name="notes" rows={2} className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="Add any notes here..."></textarea>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" fullWidth onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" fullWidth>Upload</Button>
          </div>
        </form>
      </Modal>

      {/* Record Detail Modal */}
      <Modal isOpen={!!selectedRecord} onClose={() => { setSelectedRecord(null); setIsEditMode(false); }} title={isEditMode ? "Edit Record" : "Record Details"}>
        {selectedRecord && !isEditMode && (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-6 relative">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                {getFileIcon(selectedRecord.category)}
              </div>
              <button onClick={() => setIsEditMode(true)} className="absolute right-0 top-0 p-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] break-words">{selectedRecord.name}</h3>
              <Badge variant={selectedRecord.category as any} className="uppercase text-[10px] tracking-wider mt-2">
                {selectedRecord.category}
              </Badge>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Upload Date</span>
                <span className="font-medium text-sm">{selectedRecord.uploadDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">File Size</span>
                <span className="font-medium text-sm">{selectedRecord.size}</span>
              </div>
              {selectedRecord.notes && (
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-gray-500 text-sm block mb-1">Notes</span>
                  <p className="text-sm">{selectedRecord.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="danger" fullWidth onClick={() => handleDelete(selectedRecord.id)}>Delete</Button>
              <Button variant="primary" fullWidth onClick={() => setSelectedRecord(null)}>Close</Button>
            </div>
          </div>
        )}

        {selectedRecord && isEditMode && (
          <form onSubmit={handleEditRecord} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
              <input required name="name" defaultValue={selectedRecord.name} type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select required name="category" defaultValue={selectedRecord.category} className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none bg-white">
                <option value="lab">Lab Result</option>
                <option value="imaging">Imaging (X-Ray, MRI)</option>
                <option value="report">Medical Report</option>
                <option value="prescription">Prescription</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea name="notes" defaultValue={selectedRecord.notes} rows={2} className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"></textarea>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" fullWidth onClick={() => setIsEditMode(false)}>Cancel</Button>
              <Button type="submit" variant="primary" fullWidth>Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
