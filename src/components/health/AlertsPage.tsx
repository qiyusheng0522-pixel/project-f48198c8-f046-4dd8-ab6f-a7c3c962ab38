import { Activity, UserX, Wifi, ClipboardX, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNav } from "./nav-context";

const categories = [
  { key: "health", label: "健康指标", icon: Activity, count: 7, tone: "from-destructive/80 to-destructive" },
  { key: "behavior", label: "行为依从", icon: UserX, count: 4, tone: "from-warning/80 to-warning" },
  { key: "device", label: "设备数据", icon: Wifi, count: 2, tone: "from-info/80 to-info" },
  { key: "service", label: "服务任务", icon: ClipboardX, count: 3, tone: "from-success/80 to-success" },
];

const alerts = [
  { user: "张丽华", level: "紧急", levelTone: "bg-destructive text-destructive-foreground", title: "空腹血糖 11.8 mmol/L", desc: "连续 3 日超过阈值，建议立即沟通", time: "10 分钟前", icon: Activity },
  { user: "周文斌", level: "重要", levelTone: "bg-warning text-warning-foreground", title: "心率持续 > 110", desc: "可穿戴设备实时数据异常", time: "32 分钟前", icon: Activity },
  { user: "李建国", level: "提醒", levelTone: "bg-info text-info-foreground", title: "未按时服药", desc: "已连续 2 天未确认", time: "1 小时前", icon: UserX },
  { user: "陈淑芬", level: "提醒", levelTone: "bg-info text-info-foreground", title: "血压计离线 24h", desc: "建议联系核实", time: "2 小时前", icon: Wifi },
];

const AlertsPage = () => {
  const [active, setActive] = useState("health");
  const { push } = useNav();
  return (
    <div className="flex flex-col h-full">
      <header className="px-5 pt-3 pb-3 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">预警中心</h1>
          <span className="text-[11px] text-muted-foreground">今日新增 16</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Category cards */}
        <section className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={cn(
                "rounded-2xl p-3 text-left bg-gradient-to-br shadow-card text-primary-foreground transition-all",
                c.tone,
                active === c.key ? "ring-2 ring-offset-2 ring-foreground/40 scale-[1.02]" : "opacity-90"
              )}
            >
              <div className="flex items-center justify-between">
                <c.icon className="w-5 h-5" />
                <span className="text-2xl font-bold">{c.count}</span>
              </div>
              <p className="text-xs mt-2 opacity-95">{c.label}预警</p>
            </button>
          ))}
        </section>

        {/* Alert list */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-foreground">待处理预警</h2>
            <button className="text-xs text-primary">全部处理</button>
          </div>
          <div className="space-y-2">
            {alerts.map((a, i) => (
              <div key={i} className="bg-card rounded-2xl shadow-soft p-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-soft flex items-center justify-center text-primary shrink-0">
                    <a.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{a.user}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${a.levelTone}`}>{a.level}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{a.time}</span>
                    </div>
                    <p className="text-xs font-medium text-foreground mt-1">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <button className="flex-1 text-xs py-1.5 rounded-lg bg-muted text-foreground">忽略</button>
                  <button onClick={() => push("send-message")} className="flex-1 text-xs py-1.5 rounded-lg bg-primary-soft text-primary font-medium">沟通</button>
                  <button onClick={() => push("alert-detail", a)} className="flex-1 text-xs py-1.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium flex items-center justify-center gap-0.5">
                    处理 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlertsPage;