import { useState } from "react";
import { Sparkles, Send, Clock, Users, Check, MessageSquare, Edit3 } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

type Patient = { name: string; status: string; tone: string };

// 任务话术与对应患者列表（key = `${day}-${time}`）
const taskMap: Record<string, { text: string; patients: Patient[] }> = {
  "1-08:00": {
    text: "早安～别忘了今天的 4 步曲：排便 → 空腹称重 + 围度（胳膊/大腿/腰围）→ 200-300ml 温水 → 营养早餐。记得发早餐打卡哦~",
    patients: [
      { name: "张丽华", status: "未打卡早餐", tone: "bg-destructive/10 text-destructive" },
      { name: "李建国", status: "已称重未发数据", tone: "bg-warning/10 text-warning" },
      { name: "王秀梅", status: "已完成 4 步曲", tone: "bg-success/10 text-success" },
      { name: "周文斌", status: "未打卡早餐", tone: "bg-destructive/10 text-destructive" },
    ],
  },
  "1-11:00": {
    text: "您好，咱们吃饭的时间点在 11:30-13:00 之间最好，良好的进餐顺序：蔬菜 → 肉蛋类 → 主食类，细嚼慢咽，期待您的午餐打卡。",
    patients: [
      { name: "张丽华", status: "未打卡午餐", tone: "bg-warning/10 text-warning" },
      { name: "李建国", status: "未打卡午餐", tone: "bg-warning/10 text-warning" },
      { name: "王秀梅", status: "等待打卡", tone: "bg-info/10 text-info" },
      { name: "周文斌", status: "未打卡午餐", tone: "bg-warning/10 text-warning" },
    ],
  },
  "1-15:00": {
    text: "您好，咱们今天饮水喝了多少了呀？现在可以小口慢饮 300 毫升温水 ☕",
    patients: [
      { name: "张丽华", status: "饮水 600ml / 1500ml", tone: "bg-warning/10 text-warning" },
      { name: "李建国", status: "饮水 400ml / 1500ml", tone: "bg-destructive/10 text-destructive" },
      { name: "王秀梅", status: "饮水 900ml / 1500ml", tone: "bg-info/10 text-info" },
      { name: "周文斌", status: "饮水 500ml / 1500ml", tone: "bg-warning/10 text-warning" },
    ],
  },
  "1-17:00": {
    text: "准备吃晚餐喽，记得打卡，晚餐五六分饱，睡前带着饥饿入睡的效果最好，如果吃饱了记得散散步~",
    patients: [
      { name: "张丽华", status: "等待晚餐打卡", tone: "bg-info/10 text-info" },
      { name: "李建国", status: "等待晚餐打卡", tone: "bg-info/10 text-info" },
      { name: "王秀梅", status: "等待晚餐打卡", tone: "bg-info/10 text-info" },
      { name: "周文斌", status: "等待晚餐打卡", tone: "bg-info/10 text-info" },
    ],
  },
  "2-10:00": {
    text: "少吃糖对健康更有益：每日添加糖最好控制在 25g 以下（最多 50g）。WHO 建议：游离糖 ≤ 总摄入 5%（约 25g/2000kcal）。",
    patients: [
      { name: "陈美玲", status: "稳定", tone: "bg-success/10 text-success" },
      { name: "黄志强", status: "需关注", tone: "bg-warning/10 text-warning" },
      { name: "赵雪", status: "稳定", tone: "bg-success/10 text-success" },
      { name: "孙慧", status: "稳定", tone: "bg-success/10 text-success" },
      { name: "吴峰", status: "稳定", tone: "bg-success/10 text-success" },
      { name: "钱亮", status: "需关注", tone: "bg-warning/10 text-warning" },
    ],
  },
  "3-13:00": {
    text: "你好，现在开始要喝水了哦，小口慢饮 300 毫升温水。",
    patients: [
      { name: "孙建华", status: "饮水 700ml / 1500ml", tone: "bg-warning/10 text-warning" },
      { name: "吴敏", status: "饮水 500ml / 1500ml", tone: "bg-destructive/10 text-destructive" },
      { name: "刘强", status: "饮水 1000ml / 1500ml", tone: "bg-info/10 text-info" },
      { name: "杨晓", status: "饮水 800ml / 1500ml", tone: "bg-warning/10 text-warning" },
      { name: "陈刚", status: "饮水 600ml / 1500ml", tone: "bg-warning/10 text-warning" },
    ],
  },
};

const fallback = (day: number, title: string): { text: string; patients: Patient[] } => ({
  text: `（AI 已根据 ${title} 自动生成话术，可一键发送给本组同状态患者）`,
  patients: Array.from({ length: 4 }).map((_, i) => ({
    name: `患者${i + 1}`,
    status: "等待跟进",
    tone: "bg-info/10 text-info",
  })),
});

const SopStageView = ({ payload }: { payload?: any }) => {
  const { pop, push } = useNav();
  const day: number = payload?.day ?? 1;
  const time: string = payload?.time ?? "08:00";
  const title: string = payload?.title ?? `出院第 ${day} 天 · 跟进任务`;

  const data = taskMap[`${day}-${time}`] || fallback(day, title);
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState(false);
  const [text, setText] = useState(data.text);
  const [editing, setEditing] = useState(false);

  const toggle = (name: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };
  const selectedCount = data.patients.length - excluded.size;
  const send = () => {
    setSent(true);
    setTimeout(() => setSent(false), 1800);
  };

  return (
    <SubPage title={title} onBack={pop} variant="primary">
      {/* Task summary */}
      <div className="bg-gradient-primary text-primary-foreground rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" /> {time}
          </span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">SOP DAY {day}</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" /> {data.patients.length} 位待发
          </span>
        </div>
        <p className="text-sm font-bold mt-2">{title}</p>
        <p className="text-[11px] opacity-90 mt-1">同一阶段、同一状态的患者使用同一条 AI 话术，确认后可批量发送</p>
      </div>

      {/* AI script */}
      <div className="mt-3 bg-card rounded-2xl shadow-soft p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" /> AI 推荐话术
          </p>
          <button onClick={() => setEditing((v) => !v)} className="text-[11px] text-primary flex items-center gap-0.5">
            <Edit3 className="w-3 h-3" /> {editing ? "完成" : "编辑"}
          </button>
        </div>
        {editing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="w-full bg-muted/40 rounded-lg p-2.5 text-[12px] outline-none resize-none"
          />
        ) : (
          <p className="text-[12px] text-foreground leading-relaxed bg-muted/40 rounded-lg p-2.5">{text}</p>
        )}
      </div>

      {/* Patient list */}
      <div className="mt-3 bg-card rounded-2xl shadow-soft p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" /> 接收患者
          </p>
          <span className="text-[11px] text-muted-foreground">
            已选 <span className="text-primary font-semibold">{selectedCount}</span> / {data.patients.length}
          </span>
        </div>
        <div className="space-y-1.5">
          {data.patients.map((p) => {
            const isOn = !excluded.has(p.name);
            return (
              <button
                key={p.name}
                onClick={() => toggle(p.name)}
                className={`w-full flex items-center gap-2 p-2 rounded-xl border ${
                  isOn ? "border-primary/30 bg-primary-soft/30" : "border-border bg-muted/30 opacity-60"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                    isOn ? "bg-primary border-primary" : "border-muted-foreground"
                  }`}
                >
                  {isOn && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-semibold text-foreground">{p.name}</p>
                  <p className={`text-[10px] mt-0.5 inline-block px-1.5 py-0.5 rounded ${p.tone}`}>{p.status}</p>
                </div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    push("patient-chat", p);
                  }}
                  className="text-[11px] text-primary flex items-center gap-0.5 px-2"
                >
                  <MessageSquare className="w-3 h-3" /> 单聊
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky send */}
      <button
        onClick={send}
        disabled={selectedCount === 0}
        className={`w-full mt-4 py-3 rounded-2xl text-sm font-semibold shadow-card flex items-center justify-center gap-2 ${
          sent ? "bg-success text-success-foreground" : "bg-gradient-primary text-primary-foreground"
        } ${selectedCount === 0 ? "opacity-50" : ""}`}
      >
        {sent ? (
          <><Check className="w-4 h-4" /> 已批量发送至 {selectedCount} 位</>
        ) : (
          <><Send className="w-4 h-4" /> 一键批量发送（{selectedCount} 位）</>
        )}
      </button>
    </SubPage>
  );
};

export default SopStageView;
