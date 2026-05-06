import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav, { TabKey } from "@/components/health/BottomNav";
import Workbench from "@/components/health/Workbench";
import UsersPage from "@/components/health/UsersPage";
import AlertsPage from "@/components/health/AlertsPage";
import PerformancePage from "@/components/health/PerformancePage";
import MePage from "@/components/health/MePage";

const Index = () => {
  const [tab, setTab] = useState<TabKey>("workbench");
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-hidden">
        {tab === "workbench" && <Workbench />}
        {tab === "users" && <UsersPage />}
        {tab === "alerts" && <AlertsPage />}
        {tab === "performance" && <PerformancePage />}
        {tab === "me" && <MePage />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </PhoneFrame>
  );
};

export default Index;
