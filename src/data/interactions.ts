import { DrugInteraction } from "../types";

export const INTERACTIONS: DrugInteraction[] = [
  {
    drug1: "warfarin",
    drug2: "aspirin",
    severity: "high",
    description: "Concurrent use significantly increases bleeding risk. Consult your prescribing physician before continuing this combination.",
  },
  {
    drug1: "warfarin",
    drug2: "ibuprofen",
    severity: "high",
    description: "Increases bleeding risk.",
  },
  {
    drug1: "metformin",
    drug2: "alcohol",
    severity: "medium",
    description: "Risk of lactic acidosis.",
  },
];
