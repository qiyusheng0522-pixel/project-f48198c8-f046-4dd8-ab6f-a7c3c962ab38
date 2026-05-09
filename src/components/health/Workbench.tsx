import { Bell, Send, ClipboardList, MessageCircle, CheckCircle2, ArrowRight, Users, Sparkles, Clock } from "lucide-react";
import { useNav } from "./nav-context";

const statsData = [
  { label: "待处理服务", value: 24, icon: ClipboardList, tone: "bg-info/10 text-info", view: "task-board" as const },
  { label: "待沟通客户", value: 12, icon: MessageCircle, tone: "bg-success/10 text-success", view: "task-board" as const },
  { label: "今日已完成", value: 36, icon: CheckCircle2, tone: "bg-warning/10 text-warning", view: "task-board" as const },
];

// 今日 SOP 待办：每条 = 一个时间点 × 一个话术 × 一组同状态患者
const sopTasks = [
  { time: "08:00", day: 1, title: "第 1 天 · 早餐打卡提醒", count: 4, tone: "bg-destructive/10 text-destructive", urgent: true },
  { time: "10:00", day: 2, title: "第 2 天 · 控糖小知识推送", count: 6, tone: "bg-warning/10 text-warning" },
  { time: "10:00", day: 4, title: "第 4 天 · 维生素 B 族科普", count: 7, tone: "bg-info/10 text-info" },
  { time: "11:00", day: 1, title: "第 1 天 · 午餐准备提醒", count: 4, tone: "bg-info/10 text-info" },
  { time: "13:00", day: 3, title: "第 3 天 · 饮水提醒（300ml）", count: 5, tone: "bg-info/10 text-info" },
  { time: "15:00", day: 1, title: "第 1 天 · 下午饮水提醒", count: 4, tone: "bg-warning/10 text-warning" },
  { time: "15:00", day: 5, title: "第 5 天 · 询问饥饿感", count: 2, tone: "bg-success/10 text-success" },
  { time: "17:00", day: 1, title: "第 1 天 · 晚餐五六分饱提醒", count: 4, tone: "bg-success/10 text-success" },
  { time: "17:00", day: 6, title: "第 6 天 · 晚餐量控提醒", count: 2, tone: "bg-primary-soft text-primary" },
];

const Workbench = () => {
  const { push } = useNav();
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="px-5 pt-3 pb-8 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80">早上好 · 周三</p>
            <h1 className="text-xl font-bold mt-0.5">健康管理师 林医生</h1>
          </div>
          <button onClick={() => push("notifications")} className="relative w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-warning" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-5">
        {/* Stats */}
        <section className="bg-card rounded-2xl p-3 shadow-card grid grid-cols-3 gap-2">
          {statsData.map((s) => (
            <button key={s.label} onClick={() => push(s.view)} className="flex flex-col items-center text-center">
              <div className={`w-9 h-9 rounded-xl ${s.tone} flex items-center justify-center mb-1.5`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-foreground leading-none">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
            </button>
          ))}
        </section>

        {/* Service dispatch CTA */}
        <button
          onClick={() => push("dispatch")}
          className="w-full mt-3 bg-gradient-primary rounded-2xl p-3 shadow-card flex items-center gap-3 text-primary-foreground text-left active:scale-[0.99] transition"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Send className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">服务派单</p>
            <p className="text-[11px] opacity-85 mt-0.5">为团队成员分配新患者跟进任务</p>
          </div>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Today's SOP-based tasks */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h2 className="text-sm font-bold text-foreground">今日任务 · SOP 跟进</h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">按时间节点 × 话术 × 同状态患者分组 · 共 36 位在管用户</p>
            </div>
            <button onClick={() => push("task-board")} className="text-xs text-primary flex items-center gap-0.5">
              全部 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {sopTasks.map((s, i) => (
              <button
                key={i}
                onClick={() => push("sop-stage", s)}
                className={`w-full text-left flex items-center gap-3 p-3 ${i !== sopTasks.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className={`w-12 h-12 rounded-xl ${s.tone} flex flex-col items-center justify-center shrink-0`}>
                  <Clock className="w-3 h-3 mb-0.5" />
                  <span className="text-[11px] font-bold leading-none">{s.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-foreground truncate">{s.title}</p>
                    {s.urgent && <span className="text-[9px] px-1 py-0.5 rounded bg-destructive text-destructive-foreground shrink-0">优先</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-primary">
                    <Users className="w-3 h-3" />
                    <span>{s.count} 位待发</span>
                    <Sparkles className="w-3 h-3 ml-1.5" />
                    <span>AI 话术已就绪 · 一键群发</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Workbench;
