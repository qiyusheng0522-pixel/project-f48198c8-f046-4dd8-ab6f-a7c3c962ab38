import { Stethoscope, Sparkles, ChevronRight } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const candidates = [
  { name: "张丽华", reason: "餐后血糖偏高 · 7 天未沟通", priority: "高", tone: "text-destructive" },
  { name: "李建国", reason: "用药依从度下降", priority: "高", tone: "text-destructive" },
  { name: "周文斌", reason: "心率波动较大", priority: "中", tone: "text-warning" },
  { name: "王秀梅", reason: "进入复诊周期", priority: "中", tone: "text-warning" },
  { name: "孙阿姨", reason: "常规季度回访", priority: "低", tone: "text-info" },
];

const SmartFollowupView = () => {
  const { pop, push } = useNav();
  return (
    <SubPage title="智能随访" onBack={pop} variant="cool">
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-bold text-foreground">AI 推荐随访名单</p>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">基于风险等级、上次沟通时间、指标趋势综合排序</p>
      </div>
      <div className="mt-3 space-y-2">
        {candidates.map((c) => (
          <button key={c.name} onClick={() => push("task-detail", { title: `${c.name} · 智能随访`, time: "建议今日", tag: `${c.priority}优先` })} className="w-full bg-card rounded-2xl shadow-soft p-3 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-gradient-cool flex items-center justify-center text-primary-foreground">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{c.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{c.reason}</p>
            </div>
            <span className={`text-[10px] font-bold ${c.tone}`}>{c.priority}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </SubPage>
  );
};

export default SmartFollowupView;
