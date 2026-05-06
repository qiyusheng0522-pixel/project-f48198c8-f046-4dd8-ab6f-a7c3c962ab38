import { useState } from "react";
import { Phone, Video, Mic, Sparkles, Send, Plus, Image as ImageIcon, FileText, Activity, Heart, Droplet, ChevronDown, ChevronUp, AlertTriangle, Pill } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

interface Msg {
  id: number;
  from: "me" | "user" | "ai";
  text: string;
  time: string;
  type?: "text" | "voice" | "ai-draft";
  duration?: number;
}

const PatientChatView = ({ payload }: { payload?: any }) => {
  const { pop, push } = useNav();
  const patient = payload || { name: "张丽华", age: 58, level: "高风险", tags: ["糖尿病", "高血压"] };
  const [profileOpen, setProfileOpen] = useState(false);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);

  const messages: Msg[] = [
    { id: 1, from: "user", text: "林老师，今天早上空腹血糖 7.4，比昨天高了一些", time: "09:12", type: "text" },
    { id: 2, from: "user", text: "", time: "09:13", type: "voice", duration: 8 },
    { id: 3, from: "me", text: "收到，您昨晚几点睡的？晚餐吃了什么？", time: "09:18", type: "text" },
    { id: 4, from: "user", text: "11 点多睡，晚餐吃了米饭和红烧肉", time: "09:20", type: "text" },
  ];

  const aiDrafts = [
    "建议晚餐主食控制在 75g 以内，红烧肉换成清蒸鱼，今晚 10 点前入睡。",
    "我帮您预约明天上午的复诊好吗？现在可以一键预约。",
    "为您推送『糖尿病晚餐食谱』，请查收。",
  ];

  return (
    <SubPage
      title=""
      onBack={pop}
      variant="primary"
      right={
        <div className="flex items-center gap-1.5">
          <button onClick={() => alert("拨号中…")} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </button>
          <button onClick={() => alert("视频通话邀请已发送")} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Video className="w-4 h-4" />
          </button>
          <button onClick={() => push("user-portrait")} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
            档案
          </button>
        </div>
      }
    >
      <div className="-mx-4 -my-4 flex flex-col h-full">
        {/* Patient header (collapsible) */}
        <div className="bg-gradient-primary text-primary-foreground px-4 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-base font-bold">{patient.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold">{patient.name}</p>
                <span className="text-[10px] bg-destructive/90 px-1.5 rounded">{patient.level}</span>
              </div>
              <p className="text-[10px] opacity-90 mt-0.5">{patient.age}岁 · {patient.tags?.join(" / ")} · 在线</p>
            </div>
            <button onClick={() => setProfileOpen((v) => !v)} className="text-[10px] flex items-center gap-0.5 bg-white/20 px-2 py-1 rounded-full">
              {profileOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              档案
            </button>
          </div>

          {profileOpen && (
            <div className="mt-3 bg-white/15 backdrop-blur rounded-xl p-3 space-y-2 text-[11px]">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/15 rounded-lg p-1.5">
                  <div className="flex items-center gap-1 opacity-80"><Droplet className="w-3 h-3" />空腹血糖</div>
                  <p className="font-bold mt-0.5">7.4 <span className="font-normal opacity-80">mmol/L</span></p>
                </div>
                <div className="bg-white/15 rounded-lg p-1.5">
                  <div className="flex items-center gap-1 opacity-80"><Heart className="w-3 h-3" />血压</div>
                  <p className="font-bold mt-0.5">138/86</p>
                </div>
                <div className="bg-white/15 rounded-lg p-1.5">
                  <div className="flex items-center gap-1 opacity-80"><Activity className="w-3 h-3" />心率</div>
                  <p className="font-bold mt-0.5">78</p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                <p>就医：2025-04-20 三甲内分泌科复诊 · HbA1c 7.8%</p>
              </div>
              <div className="flex items-start gap-1.5">
                <Pill className="w-3 h-3 mt-0.5 shrink-0" />
                <p>用药：二甲双胍 0.5g 早晚 / 缬沙坦 80mg qd</p>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                <p>当前状态：近 3 日空腹血糖均偏高 ⚠️</p>
              </div>
              <button onClick={() => push("user-portrait")} className="w-full mt-1 py-1.5 rounded-lg bg-white text-primary text-[11px] font-bold">
                查看完整档案
              </button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-muted/30 px-3 py-3 space-y-3">
          <p className="text-center text-[10px] text-muted-foreground">今天 09:00</p>
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2 ${m.from === "me" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${m.from === "me" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                {m.from === "me" ? "我" : patient.name[0]}
              </div>
              <div className={`max-w-[70%] rounded-2xl px-3 py-2 ${m.from === "me" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card rounded-tl-sm shadow-soft"}`}>
                {m.type === "voice" ? (
                  <div className="flex items-center gap-2 text-xs">
                    <Mic className="w-3.5 h-3.5" />
                    <div className="flex gap-0.5 items-end">
                      {[6, 10, 14, 8, 12, 6, 10].map((h, i) => (
                        <div key={i} className="w-0.5 bg-current rounded" style={{ height: h }} />
                      ))}
                    </div>
                    <span>{m.duration}"</span>
                    <span className="text-[10px] opacity-70 ml-1">AI 转写: "今天有点头晕…"</span>
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed">{m.text}</p>
                )}
                <p className="text-[9px] opacity-60 mt-0.5">{m.time}</p>
              </div>
            </div>
          ))}

          {/* AI Draft suggestion bubble */}
          <div className="bg-gradient-primary/10 border border-primary/30 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <p className="text-[11px] font-bold text-primary">AI 已基于患者档案生成回复草稿</p>
              <span className="ml-auto text-[9px] text-muted-foreground">点击下方采纳</span>
            </div>
            <div className="space-y-1.5">
              {aiDrafts.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setInput(d)}
                  className="w-full text-left bg-card rounded-xl p-2.5 text-[11px] text-foreground shadow-soft active:scale-[0.99]"
                >
                  {d}
                  <span className="text-primary text-[10px] font-bold ml-1">采纳 →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="bg-card border-t border-border px-2 py-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRecording((v) => !v)}
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${recording ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground"}`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={recording ? "按住说话…" : "输入消息"}
              className="flex-1 bg-muted rounded-full px-3 py-2 text-xs outline-none"
            />
            <button onClick={() => push("ai-script")} className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </button>
            {input ? (
              <button onClick={() => setInput("")} className="px-3 h-9 rounded-full bg-primary text-primary-foreground flex items-center gap-1 text-xs font-bold shrink-0">
                <Send className="w-3.5 h-3.5" />发送
              </button>
            ) : (
              <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 mt-2 px-1">
            <button className="text-[10px] text-muted-foreground flex items-center gap-1"><ImageIcon className="w-3 h-3" />图片</button>
            <button className="text-[10px] text-muted-foreground flex items-center gap-1"><FileText className="w-3 h-3" />教育资料</button>
            <button className="text-[10px] text-muted-foreground flex items-center gap-1"><Activity className="w-3 h-3" />指标卡片</button>
          </div>
        </div>
      </div>
    </SubPage>
  );
};

export default PatientChatView;