import { Search, Filter, Activity, Heart, Droplet, Moon, Footprints, Pill, Utensils, Scale, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNav } from "./nav-context";

const overview = [
  { label: "负责用户", value: "186" },
  { label: "高风险", value: "12", tone: "text-destructive" },
  { label: "中风险", value: "34", tone: "text-warning" },
  { label: "低风险", value: "140", tone: "text-success" },
];

const conditions = ["全部", "糖尿病", "高血压", "冠心病", "高血脂", "亚健康", "肥胖症"];

const users = [
  { name: "张丽华", age: 58, level: "高风险", levelTone: "bg-destructive text-destructive-foreground", tags: ["糖尿病", "高血压"], status: "血糖偏高", color: "bg-destructive" },
  { name: "李建国", age: 64, level: "中风险", levelTone: "bg-warning text-warning-foreground", tags: ["高血压"], status: "需用药提醒", color: "bg-warning" },
  { name: "王秀梅", age: 52, level: "低风险", levelTone: "bg-success text-success-foreground", tags: ["亚健康"], status: "状态良好", color: "bg-success" },
  { name: "周文斌", age: 70, level: "高风险", levelTone: "bg-destructive text-destructive-foreground", tags: ["冠心病", "糖尿病"], status: "心率异常", color: "bg-destructive" },
];

const portrait = [
  { icon: Droplet, label: "血糖", value: "7.2", unit: "mmol/L", tone: "text-warning bg-warning/10" },
  { icon: Heart, label: "血压", value: "138/86", unit: "mmHg", tone: "text-destructive bg-destructive/10" },
  { icon: Activity, label: "心率", value: "78", unit: "bpm", tone: "text-info bg-info/10" },
  { icon: Scale, label: "体重", value: "68.5", unit: "kg", tone: "text-success bg-success/10" },
  { icon: Moon, label: "睡眠", value: "6.5", unit: "h", tone: "text-info bg-info/10" },
  { icon: Footprints, label: "运动", value: "5,832", unit: "步", tone: "text-success bg-success/10" },
  { icon: Pill, label: "用药", value: "已服", unit: "今日", tone: "text-primary bg-primary-soft" },
  { icon: Utensils, label: "饮食", value: "1850", unit: "kcal", tone: "text-warning bg-warning/10" },
];

const UsersPage = () => {
  const { push } = useNav();
  const [activeCondition, setActiveCondition] = useState("全部");
  const filteredUsers = activeCondition === "全部" ? users : users.filter((u) => u.tags.includes(activeCondition));
  return (
    <div className="flex flex-col h-full">
      <header className="px-5 pt-3 pb-3 bg-card border-b border-border">
        <h1 className="text-lg font-bold text-foreground mb-3">用户管理</h1>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="flex-1 bg-transparent text-xs outline-none" placeholder="搜索姓名 / 标签 / 病种" />
          </div>
          <button className="w-9 h-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Overview */}
        <section className="bg-card rounded-2xl shadow-card p-3">
          <div className="grid grid-cols-4 gap-2">
            {overview.map((o) => (
              <button key={o.label} onClick={() => push("grading")} className="text-center">
                <p className={`text-xl font-bold ${o.tone || "text-foreground"}`}>{o.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{o.label}</p>
              </button>
            ))}
          </div>
        </section>

        {/* AI Insight */}
        <button
          onClick={() => push("ai-assistant")}
          className="w-full mt-4 bg-gradient-primary text-primary-foreground rounded-2xl shadow-card p-3 flex items-center gap-3 text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold">AI 智能分群 · 已为你预筛 12 位需优先随访</p>
            <p className="text-[10px] opacity-90 mt-0.5">基于近 7 天指标波动 + 依从度自动分析，节省 2.5 小时/天</p>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full">查看</span>
        </button>

        {/* Condition filter */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-foreground">病症筛选</h2>
            <span className="text-[10px] text-muted-foreground">共 {filteredUsers.length} 人</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
            {conditions.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCondition(c)}
                className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${
                  activeCondition === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* User list */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-foreground">分级管理</h2>
            <div className="flex gap-1">
              {["全部", "风险", "等级", "类型"].map((t, i) => (
                <button
                  key={t}
                  className={`text-[11px] px-2 py-0.5 rounded-full ${i === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {filteredUsers.map((u, i) => (
              <button key={i} onClick={() => push("user-detail", u)} className="w-full text-left bg-card rounded-2xl shadow-soft p-3 flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {u.name[0]}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${u.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{u.name}</p>
                    <span className="text-[10px] text-muted-foreground">{u.age}岁</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${u.levelTone}`}>{u.level}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {u.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground">{u.status}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Portrait */}
        <section className="mt-4">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-foreground">用户画像 · 张丽华</h2>
            <button onClick={() => push("user-portrait")} className="text-xs text-primary">详情</button>
          </div>
          <button onClick={() => push("user-portrait")} className="w-full bg-card rounded-2xl shadow-card p-3 grid grid-cols-4 gap-3">
            {portrait.map((p) => (
              <div key={p.label} className="flex flex-col items-center text-center">
                <div className={`w-9 h-9 rounded-xl ${p.tone} flex items-center justify-center mb-1`}>
                  <p.icon className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-foreground">{p.value}</p>
                <p className="text-[9px] text-muted-foreground">{p.label}·{p.unit}</p>
              </div>
            ))}
          </button>
        </section>
      </div>
    </div>
  );
};

export default UsersPage;