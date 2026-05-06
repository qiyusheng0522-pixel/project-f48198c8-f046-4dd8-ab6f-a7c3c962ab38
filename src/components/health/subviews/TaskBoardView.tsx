import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const columns = [
  { title: "待处理", tone: "bg-warning/10 text-warning", items: ["张女士 · 血糖随访", "刘先生 · 用药提醒", "陈阿姨 · 复诊预约"] },
  { title: "进行中", tone: "bg-info/10 text-info", items: ["李建国 · 沟通中", "周文斌 · 数据复核"] },
  { title: "已完成", tone: "bg-success/10 text-success", items: ["王秀梅 · 饮食指导", "赵叔 · 睡眠评估", "孙阿姨 · 运动方案"] },
];

const TaskBoardView = () => {
  const { pop, push } = useNav();
  return (
    <SubPage title="任务看板" onBack={pop}>
      <div className="space-y-4">
        {columns.map((c) => (
          <section key={c.title}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.tone}`}>{c.title} · {c.items.length}</span>
            </div>
            <div className="space-y-2">
              {c.items.map((t, i) => (
                <button key={i} onClick={() => push("task-detail", { title: t, time: "10:00", tag: c.title })} className="w-full text-left bg-card rounded-xl shadow-soft p-3 text-xs text-foreground">
                  {t}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SubPage>
  );
};

export default TaskBoardView;
