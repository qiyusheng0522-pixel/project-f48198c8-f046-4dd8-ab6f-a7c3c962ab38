import { Clock, MapPin, Phone, MessageCircle, FileText, CheckCircle2 } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const TaskDetailView = ({ payload }: { payload?: any }) => {
  const { pop, push } = useNav();
  const task = payload || { time: "09:30", title: "张女士 · 餐后血糖随访", tag: "高优先" };
  const steps = [
    { label: "确认任务", done: true },
    { label: "电话沟通", done: true },
    { label: "记录数据", done: false },
    { label: "生成方案", done: false },
  ];
  return (
    <SubPage title="任务详情" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">{task.tag}</span>
          <span className="text-[10px] text-muted-foreground">单号 #T20260506-018</span>
        </div>
        <h2 className="text-base font-bold text-foreground mt-2">{task.title}</h2>
        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 计划时间 {task.time}</p>
          <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> 远程电话随访</p>
        </div>
      </div>
      <div className="bg-card rounded-2xl shadow-soft p-4 mt-3">
        <p className="text-sm font-bold text-foreground mb-3">执行步骤</p>
        <div className="space-y-2.5">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${s.done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                {s.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px]">{i + 1}</span>}
              </div>
              <span className={`text-xs ${s.done ? "text-muted-foreground line-through" : "text-foreground font-medium"}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <button className="bg-card rounded-xl p-3 shadow-soft flex flex-col items-center gap-1">
          <Phone className="w-4 h-4 text-primary" /><span className="text-[11px]">拨打电话</span>
        </button>
        <button onClick={() => push("send-message")} className="bg-card rounded-xl p-3 shadow-soft flex flex-col items-center gap-1">
          <MessageCircle className="w-4 h-4 text-primary" /><span className="text-[11px]">发消息</span>
        </button>
        <button onClick={() => push("followup-record")} className="bg-card rounded-xl p-3 shadow-soft flex flex-col items-center gap-1">
          <FileText className="w-4 h-4 text-primary" /><span className="text-[11px]">记录</span>
        </button>
      </div>
      <button className="w-full mt-4 py-3 rounded-2xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-card">
        标记为完成
      </button>
    </SubPage>
  );
};

export default TaskDetailView;
