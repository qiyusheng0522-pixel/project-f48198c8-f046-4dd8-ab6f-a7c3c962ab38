import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const levels = [
  { name: "高风险", count: 12, tone: "bg-destructive text-destructive-foreground", desc: "每周 ≥ 2 次随访 · 每日数据监测", labels: ["糖尿病并发症", "失控血压", "心血管事件史"] },
  { name: "中风险", count: 34, tone: "bg-warning text-warning-foreground", desc: "每周 1 次随访 · 双日数据监测", labels: ["指标轻度异常", "用药调整期"] },
  { name: "低风险", count: 140, tone: "bg-success text-success-foreground", desc: "每月 1 次随访 · 周数据汇总", labels: ["指标稳定", "亚健康"] },
];

const GradingView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="分级管理" onBack={pop}>
      <div className="space-y-3">
        {levels.map((l) => (
          <div key={l.name} className="bg-card rounded-2xl shadow-card p-4">
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-0.5 rounded ${l.tone}`}>{l.name}</span>
              <span className="text-lg font-bold text-foreground">{l.count} 人</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{l.desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {l.labels.map((t) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export default GradingView;
