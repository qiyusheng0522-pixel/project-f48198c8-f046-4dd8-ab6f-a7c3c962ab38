import { Bell, Send, Sparkles, ClipboardList, MessageCircle, AlertCircle, CheckCircle2, ArrowRight, Mic, Stethoscope, Route } from "lucide-react";

const stats = [
  { label: "待处理服务", value: 24, icon: ClipboardList, tone: "bg-info/10 text-info" },
  { label: "待沟通客户", value: 12, icon: MessageCircle, tone: "bg-success/10 text-success" },
  { label: "待处理预警", value: 7, icon: AlertCircle, tone: "bg-destructive/10 text-destructive" },
  { label: "今日已完成", value: 36, icon: CheckCircle2, tone: "bg-warning/10 text-warning" },
];

const quickActions = [
  { label: "服务派单", icon: Send, gradient: "bg-gradient-primary" },
  { label: "智能随访", icon: Stethoscope, gradient: "bg-gradient-cool" },
  { label: "AI话术", icon: Sparkles, gradient: "bg-gradient-warm" },
  { label: "一键发送", icon: Mic, gradient: "bg-gradient-primary" },
];

const tasks = [
  { time: "09:30", title: "张女士 · 餐后血糖随访", tag: "高优先", tone: "text-destructive bg-destructive/10" },
  { time: "10:15", title: "李先生 · 用药依从性沟通", tag: "中优先", tone: "text-warning bg-warning/10" },
  { time: "14:00", title: "王老 · 血压数据复核", tag: "低优先", tone: "text-info bg-info/10" },
  { time: "16:30", title: "周阿姨 · 饮食方案推送", tag: "常规", tone: "text-muted-foreground bg-muted" },
];

const Workbench = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="px-5 pt-3 pb-5 bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs opacity-80">早上好 · 周三</p>
            <h1 className="text-xl font-bold mt-0.5">健康管理师 林医生</h1>
          </div>
          <button className="relative w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-warning" />
          </button>
        </div>
        <div className="bg-white/15 backdrop-blur rounded-2xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <p className="font-semibold">AI 助理：3 位用户血糖偏高</p>
            <p className="opacity-80">建议优先安排今日随访</p>
          </div>
          <ArrowRight className="w-4 h-4" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-3">
        {/* Stats */}
        <section className="bg-card rounded-2xl p-3 shadow-card grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <div className={`w-9 h-9 rounded-xl ${s.tone} flex items-center justify-center mb-1.5`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-foreground leading-none">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Quick actions */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-foreground">快捷操作</h2>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="bg-card rounded-2xl p-2.5 shadow-soft flex flex-col items-center gap-1.5 active:scale-95 transition"
              >
                <div className={`w-10 h-10 rounded-xl ${a.gradient} flex items-center justify-center text-primary-foreground shadow-soft`}>
                  <a.icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-foreground font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Task list */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-foreground">今日任务</h2>
            <button className="text-xs text-primary flex items-center gap-0.5">
              查看全部 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            {tasks.map((t, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 ${i !== tasks.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground">时间</p>
                  <p className="text-sm font-bold text-primary">{t.time}</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{t.title}</p>
                  <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded ${t.tone}`}>{t.tag}</span>
                </div>
                <Route className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        {/* Standard path */}
        <section className="mt-4 bg-gradient-cool rounded-2xl p-4 text-primary-foreground shadow-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs opacity-90">服务标准路径</p>
              <h3 className="text-base font-bold mt-1">糖尿病 · 三月期管理</h3>
              <p className="text-[11px] opacity-85 mt-1">第 6 周 / 12 周 · 进度 50%</p>
            </div>
            <button className="bg-white/20 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium">记录</button>
          </div>
          <div className="mt-3 h-1.5 bg-white/25 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-white rounded-full" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Workbench;