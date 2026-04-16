import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { DrugInteraction } from "../../types";

interface DrugInteractionAlertProps {
  interactions: DrugInteraction[];
}

export function DrugInteractionAlert({ interactions }: DrugInteractionAlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<DrugInteraction | null>(null);

  if (interactions.length === 0 || isDismissed) return null;

  return (
    <>
      <div
        onClick={() => setSelectedInteraction(interactions[0])}
        className="mt-4 bg-[var(--color-danger-light)] border border-[var(--color-danger)]/20 rounded-xl p-3 flex items-start gap-3 cursor-pointer active:scale-[0.98] transition-transform"
      >
        <AlertTriangle className="w-5 h-5 text-[var(--color-danger)] shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-[var(--color-danger)]">
            Drug Interaction Detected
          </h3>
          <p className="text-xs text-[var(--color-danger)]/80 mt-0.5">
            {interactions.length} potential interaction{interactions.length > 1 ? "s" : ""} found in your active medications. Tap to review.
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="p-1 text-[var(--color-danger)]/60 hover:text-[var(--color-danger)] rounded-full hover:bg-[var(--color-danger)]/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <Modal
        isOpen={!!selectedInteraction}
        onClose={() => setSelectedInteraction(null)}
        title="Interaction Alert"
      >
        {selectedInteraction && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="px-3 py-1.5 bg-gray-100 rounded-lg font-medium text-sm capitalize">
                {selectedInteraction.drug1}
              </div>
              <AlertTriangle className="w-5 h-5 text-[var(--color-danger)]" />
              <div className="px-3 py-1.5 bg-gray-100 rounded-lg font-medium text-sm capitalize">
                {selectedInteraction.drug2}
              </div>
            </div>
            
            <div className="bg-[var(--color-danger-light)] p-4 rounded-xl">
              <h4 className="font-semibold text-[var(--color-danger)] mb-1">Risk Description</h4>
              <p className="text-sm text-[var(--color-danger)]/90 leading-relaxed">
                {selectedInteraction.description}
              </p>
            </div>

            <p className="text-xs text-center text-gray-500 italic">
              Generated from predefined interaction database — not AI-generated
            </p>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setSelectedInteraction(null)}
              >
                Dismiss
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setSelectedInteraction(null);
                  setIsDismissed(true);
                }}
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
