import { createContext, useContext, ReactNode } from "react";

export type SubView =
  | "notifications"
  | "ai-assistant"
  | "task-detail"
  | "task-board"
  | "dispatch"
  | "smart-followup"
  | "ai-script"
  | "send-message"
  | "patient-chat"
  | "standard-path"
  | "sop-stage"
  | "followup-record"
  | "user-detail"
  | "user-portrait"
  | "grading"
  | "alert-detail"
  | "alert-handle"
  | "report-detail"
  | "team-member"
  | "profile-edit"
  | "certificates"
  | "service-history"
  | "settings-notify"
  | "settings-privacy"
  | "settings-general"
  | "help";

interface NavContextType {
  push: (view: SubView, payload?: any) => void;
  pop: () => void;
}

const NavContext = createContext<NavContextType>({ push: () => {}, pop: () => {} });

export const NavProvider = ({ value, children }: { value: NavContextType; children: ReactNode }) => (
  <NavContext.Provider value={value}>{children}</NavContext.Provider>
);

export const useNav = () => useContext(NavContext);