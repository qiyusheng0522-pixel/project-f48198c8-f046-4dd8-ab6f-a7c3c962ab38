import { Bell, Send, ClipboardList, MessageCircle, CheckCircle2, ArrowRight, Route, Users, Sparkles } from "lucide-react";
import { useNav } from "./nav-context";

const statsData = [
  { label: "待处理服务", value: 24, icon: ClipboardList, tone: "bg-info/10 text-info", view: "task-board" as const },
  { label: "待沟通客户", value: 12, icon: MessageCircle, tone: "bg-success/10 text-success", view: "task-board" as const },
  { label: "今日已完成", value: 36, icon: CheckCircle2, tone: "bg-warning/10 text-warning", view: "task-board" as const },
];

// SOP 一周跟进阶段（出院/入组第 X 天）
const sopStages = [
  { day: 1, title: "出院第 1 天", focus: "建档启动 · 4 步曲 + 三餐打卡督促", count: 8, tone: "bg-destructive/10 text-destructive", urgent: true },
  { day: 2, title: "出院第 2 天", focus: "211 饮食结构 + 控糖知识", count: 6, tone: "bg-warning/10 text-warning" },
  { day: 3, title: "出院第 3 天", focus: "蛋白质摄入 + 喝水点评", count: 5, tone: "bg-info/10 text-info" },
  { day: 4, title: "出院第 4 天", focus: "维生素 B 族 + 蔬菜先行", count: 7, tone: "bg-info/10 text-info" },
  { day: 5, title: "出院第 5 天", focus: "细嚼慢咽 + 晚餐时间管理", count: 4, tone: "bg-success/10 text-success" },
  { day: 6, title: "出院第 6 天", focus: "餐盘法则 + 饮水量复盘", count: 3, tone: "bg-success/10 text-success" },
  { day: 7, title: "出院第 7 天", focus: "周复盘 + 小餐具策略", count: 3, tone: "bg-primary-soft text-primary" },
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
              <p className="text-[10px] text-muted-foreground mt-0.5">按出院后阶段分组 · 共 36 位在管用户</p>
            </div>
            <button onClick={() => push("task-board")} className="text-xs text-primary flex items-center gap-0.5">
              全部 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {sopStages.map((s, i) => (
              <button
                key={s.day}
                onClick={() => push("sop-stage", s)}
                className={`w-full text-left flex items-center gap-3 p-3 ${i !== sopStages.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className={`w-11 h-11 rounded-xl ${s.tone} flex flex-col items-center justify-center shrink-0`}>
                  <span className="text-[9px] leading-none">DAY</span>
                  <span className="text-base font-bold leading-tight">{s.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-foreground">{s.title}</p>
                    {s.urgent && <span className="text-[9px] px-1 py-0.5 rounded bg-destructive text-destructive-foreground">优先</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{s.focus}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-primary">
                    <Users className="w-3 h-3" />
                    <span>在管 {s.count} 位</span>
                    <Sparkles className="w-3 h-3 ml-1.5" />
                    <span>AI 话术已就绪</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </section>

        {/* Standard path */}
        <button onClick={() => push("standard-path")} className="w-full text-left mt-4 bg-gradient-cool rounded-2xl p-4 text-primary-foreground shadow-card block">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs opacity-90">服务标准路径</p>
              <h3 className="text-base font-bold mt-1">糖尿病 · 三月期管理</h3>
              <p className="text-[11px] opacity-85 mt-1">第 6 周 / 12 周 · 进度 50%</p>
            </div>
            <span onClick={(e) => { e.stopPropagation(); push("followup-record"); }} className="bg-white/20 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium">记录</span>
          </div>
          <div className="mt-3 h-1.5 bg-white/25 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-white rounded-full" />
          </div>
        </button>
        <div className="flex items-center gap-2 mt-2">
          <Route className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">点击任务可查看 SOP 标准话术与一键发送</span>
        </div>
      </div>
    </div>
  );
};

export default Workbench;
