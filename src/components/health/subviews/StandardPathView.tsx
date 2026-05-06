import { CheckCircle2, Circle } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const phases = [
  { week: "第 1-2 周", title: "建档与基线评估", done: true, items: ["健康档案建立", "基线指标采集", "生活方式问卷"] },
  { week: "第 3-5 周", title: "干预方案制定", done: true, items: ["饮食方案", "运动处方", "用药指导"] },
  { week: "第 6-8 周", title: "执行与监测", done: false, current: true, items: ["每周随访 2 次", "数据复核", "异常预警处理"] },
  { week: "第 9-12 周", title: "评估与复盘", done: false, items: ["效果评估", "方案调整", "结案报告"] },
];

const StandardPathView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="服务标准路径" onBack={pop} variant="cool">
      <div className="bg-card rounded-2xl shadow-card p-4">
        <p className="text-xs text-muted-foreground">糖尿病 · 三月期管理</p>
        <p className="text-base font-bold text-foreground mt-1">总进度 50%</p>
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-cool rounded-full" />
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {phases.map((p, i) => (
          <div key={i} className={`bg-card rounded-2xl shadow-soft p-3 ${p.current ? "ring-2 ring-primary" : ""}`}>
            <div className="flex items-center gap-2">
              {p.done ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Circle className={`w-4 h-4 ${p.current ? "text-primary" : "text-muted-foreground"}`} />}
              <p className="text-sm font-semibold text-foreground">{p.title}</p>
              <span className="text-[10px] text-muted-foreground ml-auto">{p.week}</span>
            </div>
            <ul className="mt-2 ml-6 space-y-1">
              {p.items.map((it) => (
                <li key={it} className="text-[11px] text-muted-foreground">· {it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export default StandardPathView;
