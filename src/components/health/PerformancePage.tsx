import { TrendingUp, Award, Users, Calendar } from "lucide-react";
import { useNav } from "./nav-context";

const kpis = [
  { label: "任务完成率", value: 92, color: "bg-success" },
  { label: "指标改善率", value: 78, color: "bg-primary" },
  { label: "预警及时率", value: 95, color: "bg-info" },
];

const team = [
  { name: "林雨晴", score: 96, rank: 1, you: true, role: "高级健康管理师" },
  { name: "陈雨欣", score: 91, rank: 2, role: "健康管理师" },
  { name: "刘思琪", score: 88, rank: 3, role: "健康管理师" },
  { name: "赵敏华", score: 84, rank: 4, role: "助理健康管理师" },
];

const reports = [
  { period: "日报", date: "今日", served: 36, alerts: 7 },
  { period: "周报", date: "本周", served: 218, alerts: 42 },
  { period: "月报", date: "本月", served: 856, alerts: 168 },
];

const PerformancePage = () => {
  const { push } = useNav();
  return (
    <div className="flex flex-col h-full">
      <header className="px-5 pt-3 pb-5 bg-gradient-cool text-primary-foreground">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold">绩效看板</h1>
          <button className="bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs">本月</button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs opacity-90">综合得分</p>
            <p className="text-3xl font-bold leading-none mt-1">96<span className="text-base font-normal opacity-80"> / 100</span></p>
            <p className="text-[11px] opacity-85 mt-1">↑ 较上月提升 4 分 · 团队第 1</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-3">
        {/* KPI */}
        <section className="bg-card rounded-2xl shadow-card p-4 space-y-3">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-primary" /> 个人绩效
          </h2>
          {kpis.map((k) => (
            <div key={k.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{k.label}</span>
                <span className="text-xs font-bold text-foreground">{k.value}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${k.color} rounded-full`} style={{ width: `${k.value}%` }} />
              </div>
            </div>
          ))}
        </section>

        {/* Team */}
        <section className="bg-card rounded-2xl shadow-card p-4 mt-4">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5 mb-3">
            <Users className="w-4 h-4 text-primary" /> 团队协作
          </h2>
          <div className="space-y-2">
            {team.map((m) => (
              <button
                key={m.name}
                onClick={() => !m.you && push("team-member", m)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl ${m.you ? "bg-primary-soft" : ""}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${m.rank === 1 ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground"}`}>
                  {m.rank}
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {m.name[0]}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-medium text-foreground">{m.name} {m.you && <span className="text-[10px] text-primary">(我)</span>}</p>
                  <p className="text-[10px] text-muted-foreground">{m.role}</p>
                </div>
                <p className="text-sm font-bold text-primary">{m.score}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Reports */}
        <section className="mt-4">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5 mb-2.5">
            <Calendar className="w-4 h-4 text-primary" /> 数据看板
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {reports.map((r) => (
              <button key={r.period} onClick={() => push("report-detail", { period: r.period })} className="bg-card rounded-2xl shadow-soft p-3 text-center">
                <p className="text-[10px] text-muted-foreground">{r.date}</p>
                <p className="text-xs font-bold text-foreground mt-0.5">{r.period}</p>
                <div className="mt-2 pt-2 border-t border-border space-y-1">
                  <p className="text-base font-bold text-primary leading-none">{r.served}</p>
                  <p className="text-[10px] text-muted-foreground">服务</p>
                  <p className="text-sm font-bold text-warning leading-none mt-1">{r.alerts}</p>
                  <p className="text-[10px] text-muted-foreground">预警</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerformancePage;