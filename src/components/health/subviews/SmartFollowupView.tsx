import { Bot, Sparkles, AlertTriangle, MessageCircle, CheckCircle2, ArrowRight, Clock, Zap } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const autoRunning = [
  { name: "孙阿姨", action: "季度常规问候", status: "已完成", reply: "回复正常", tone: "text-success" },
  { name: "陈建华", action: "餐后血糖打卡提醒", status: "已完成", reply: "已上传数据", tone: "text-success" },
  { name: "刘志强", action: "运动达标鼓励", status: "进行中", reply: "等待回复", tone: "text-info" },
];

const escalated = [
  {
    name: "张丽华",
    trigger: "空腹血糖 7.4 ↑ 连续 3 日",
    aiAsked: "AI 已问伺：「今天测血糖了吗？感觉怎么样？」",
    aiReply: "用户回复：「头有点晕，血糖比平时高」",
    risk: "高",
    tone: "text-destructive bg-destructive/10",
  },
  {
    name: "李建国",
    trigger: "近 5 日漏服降压药 2 次",
    aiAsked: "AI 已问伺用药情况，发现依从性下降",
    aiReply: "用户回复：「忘记了，最近比较忙」",
    risk: "高",
    tone: "text-destructive bg-destructive/10",
  },
  {
    name: "周文斌",
    trigger: "夜间心率波动 > 15 bpm",
    aiAsked: "AI 已询问睡眠与不适感受",
    aiReply: "用户回复：「最近睡得不好，胸口偶尔发闷」",
    risk: "中",
    tone: "text-warning bg-warning/10",
  },
];

const SmartFollowupView = () => {
  const { pop, push } = useNav();
  return (
    <SubPage title="智能随访" onBack={pop} variant="cool">
      {/* AI engine status */}
      <div className="bg-gradient-cool rounded-2xl shadow-card p-4 text-primary-foreground">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="w-4 h-4" />
          <p className="text-sm font-bold">AI 自动随访引擎 · 运行中</p>
          <span className="ml-auto w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>
        <p className="text-[11px] opacity-90">基于患者档案 + 异常指标 + 周期规则，AI 自动发起问伺；异常时升级为人工任务</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-white/15 rounded-xl py-2 text-center">
            <p className="text-lg font-bold">86</p>
            <p className="text-[10px] opacity-80">今日已问伺</p>
          </div>
          <div className="bg-white/15 rounded-xl py-2 text-center">
            <p className="text-lg font-bold">71</p>
            <p className="text-[10px] opacity-80">回复正常</p>
          </div>
          <div className="bg-white/15 rounded-xl py-2 text-center">
            <p className="text-lg font-bold text-warning-foreground">3</p>
            <p className="text-[10px] opacity-80">需人工介入</p>
          </div>
        </div>
      </div>

      {/* Escalated to manual - main focus */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 mb-2 px-1">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <p className="text-sm font-bold text-foreground">需人工介入</p>
          <span className="text-[10px] text-muted-foreground">AI 检测到异常，已生成今日任务</span>
        </div>
        <div className="space-y-2.5">
          {escalated.map((c) => (
            <div key={c.name} className="bg-card rounded-2xl shadow-card p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-bold text-foreground">{c.name}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${c.tone}`}>{c.risk}风险</span>
                <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Clock className="w-3 h-3" /> 刚刚
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <span className="text-destructive shrink-0 mt-0.5">●</span>
                  <p className="text-foreground"><span className="font-semibold">触发：</span>{c.trigger}</p>
                </div>
                <div className="flex items-start gap-1.5 bg-primary-soft/50 rounded-lg p-2">
                  <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground">{c.aiAsked}</p>
                    <p className="text-muted-foreground mt-1">{c.aiReply}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button
                  onClick={() => push("patient-chat", { name: c.name, age: 58, level: c.risk + "风险", tags: ["糖尿病"] })}
                  className="py-2 rounded-xl bg-gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />立即沟通
                </button>
                <button
                  onClick={() => push("task-detail", { title: `${c.name} · 异常随访`, time: "今日", tag: c.risk + "优先" })}
                  className="py-2 rounded-xl bg-muted text-foreground text-xs font-bold flex items-center justify-center gap-1"
                >
                  查看任务<ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI handled automatically */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 mb-2 px-1">
          <Zap className="w-4 h-4 text-success" />
          <p className="text-sm font-bold text-foreground">AI 自动处理中</p>
          <span className="text-[10px] text-muted-foreground">无需人工操作</span>
        </div>
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          {autoRunning.map((r, i) => (
            <div key={r.name} className={`flex items-center gap-2.5 p-3 ${i !== autoRunning.length - 1 ? "border-b border-border" : ""}`}>
              <CheckCircle2 className={`w-4 h-4 ${r.tone}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{r.name} · {r.action}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{r.reply}</p>
              </div>
              <span className={`text-[10px] ${r.tone}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rules entry */}
      <button className="w-full mt-4 py-3 rounded-2xl bg-card border border-dashed border-primary text-primary text-xs font-bold flex items-center justify-center gap-1.5">
        <Bot className="w-4 h-4" />配置 AI 自动随访规则
      </button>
    </SubPage>
  );
};

export default SmartFollowupView;
