import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav, { TabKey } from "@/components/health/BottomNav";
import Workbench from "@/components/health/Workbench";
import UsersPage from "@/components/health/UsersPage";
import AlertsPage from "@/components/health/AlertsPage";
import PerformancePage from "@/components/health/PerformancePage";
import MePage from "@/components/health/MePage";
import { NavProvider, SubView } from "@/components/health/nav-context";
import NotificationsView from "@/components/health/subviews/NotificationsView";
import AIAssistantView from "@/components/health/subviews/AIAssistantView";
import TaskDetailView from "@/components/health/subviews/TaskDetailView";
import TaskBoardView from "@/components/health/subviews/TaskBoardView";
import DispatchView from "@/components/health/subviews/DispatchView";
import SmartFollowupView from "@/components/health/subviews/SmartFollowupView";
import AIScriptView from "@/components/health/subviews/AIScriptView";
import SendMessageView from "@/components/health/subviews/SendMessageView";
import StandardPathView from "@/components/health/subviews/StandardPathView";
import FollowupRecordView from "@/components/health/subviews/FollowupRecordView";
import UserDetailView from "@/components/health/subviews/UserDetailView";
import UserPortraitView from "@/components/health/subviews/UserPortraitView";
import GradingView from "@/components/health/subviews/GradingView";
import AlertDetailView from "@/components/health/subviews/AlertDetailView";
import ReportDetailView from "@/components/health/subviews/ReportDetailView";
import TeamMemberView from "@/components/health/subviews/TeamMemberView";
import {
  ProfileEditView,
  CertificatesView,
  ServiceHistoryView,
  NotifySettingsView,
  PrivacyView,
  GeneralSettingsView,
  HelpView,
} from "@/components/health/subviews/SimplePages";

const Index = () => {
  const [tab, setTab] = useState<TabKey>("workbench");
  const [stack, setStack] = useState<{ view: SubView; payload?: any }[]>([]);
  const top = stack[stack.length - 1];

  const nav = {
    push: (view: SubView, payload?: any) => setStack((s) => [...s, { view, payload }]),
    pop: () => setStack((s) => s.slice(0, -1)),
  };

  const renderSub = () => {
    if (!top) return null;
    switch (top.view) {
      case "notifications": return <NotificationsView />;
      case "ai-assistant": return <AIAssistantView />;
      case "task-detail": return <TaskDetailView payload={top.payload} />;
      case "task-board": return <TaskBoardView />;
      case "dispatch": return <DispatchView />;
      case "smart-followup": return <SmartFollowupView />;
      case "ai-script": return <AIScriptView />;
      case "send-message": return <SendMessageView />;
      case "standard-path": return <StandardPathView />;
      case "followup-record": return <FollowupRecordView />;
      case "user-detail": return <UserDetailView payload={top.payload} />;
      case "user-portrait": return <UserPortraitView />;
      case "grading": return <GradingView />;
      case "alert-detail": return <AlertDetailView payload={top.payload} />;
      case "alert-handle": return <AlertDetailView payload={top.payload} />;
      case "report-detail": return <ReportDetailView payload={top.payload} />;
      case "team-member": return <TeamMemberView payload={top.payload} />;
      case "profile-edit": return <ProfileEditView />;
      case "certificates": return <CertificatesView />;
      case "service-history": return <ServiceHistoryView />;
      case "settings-notify": return <NotifySettingsView />;
      case "settings-privacy": return <PrivacyView />;
      case "settings-general": return <GeneralSettingsView />;
      case "help": return <HelpView />;
    }
  };

  return (
    <NavProvider value={nav}>
      <PhoneFrame>
        <div className="flex-1 overflow-hidden relative">
          {top ? (
            <div className="absolute inset-0 bg-background animate-in slide-in-from-right duration-200">
              {renderSub()}
            </div>
          ) : (
            <>
              {tab === "workbench" && <Workbench />}
              {tab === "users" && <UsersPage />}
              {tab === "alerts" && <AlertsPage />}
              {tab === "performance" && <PerformancePage />}
              {tab === "me" && <MePage />}
            </>
          )}
        </div>
        <BottomNav active={tab} onChange={(t) => { setStack([]); setTab(t); }} />
      </PhoneFrame>
    </NavProvider>
  );
};

export default Index;
