import { LayoutGrid, Users, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabKey = "workbench" | "users" | "messages" | "me";

const tabs: { key: TabKey; label: string; icon: typeof LayoutGrid }[] = [
  { key: "workbench", label: "工作台", icon: LayoutGrid },
  { key: "users", label: "用户管理", icon: Users },
  { key: "messages", label: "沟通", icon: MessageCircle },
  { key: "me", label: "我的", icon: User },
];

interface Props {
  active: TabKey;
  onChange: (k: TabKey) => void;
}

const BottomNav = ({ active, onChange }: Props) => {
  return (
    <nav className="shrink-0 border-t border-border bg-card/95 backdrop-blur-md px-2 pt-2 pb-5">
      <ul className="flex items-center justify-between">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.key;
          return (
            <li key={t.key} className="flex-1">
              <button
                onClick={() => onChange(t.key)}
                className={cn(
                  "w-full flex flex-col items-center gap-1 py-1.5 transition-all",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "p-1.5 rounded-xl transition-all",
                    isActive && "bg-primary-soft scale-110"
                  )}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.4 : 2} />
                </div>
                <span className={cn("text-[10px]", isActive && "font-semibold")}>{t.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;