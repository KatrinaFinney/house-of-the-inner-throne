export type DedicationStatus = "preparing" | "open" | "complete";

export type DailyDedication = {
  status: DedicationStatus;
  eyebrow: string;
  intention: string;
  offering: string;
  petitionWindow: string;
  note: string;
};

// This single object is the public source of truth for the current rite.
// Update it when a new dedication is appointed; every Shrine surface will follow.
export const currentDedication: DailyDedication = {
  status: "preparing",
  eyebrow: "Founding Intention",
  intention: "Protection, clear passage, and guarded movement",
  offering: "Appointed ancestor currency",
  petitionWindow: "Petitions open when announced",
  note: "The public rhythm is being prepared. Founding-list members will receive the first appointed date and official social channel.",
};

