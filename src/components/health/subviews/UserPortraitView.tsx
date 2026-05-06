import { Activity, Heart, Droplet, Moon, Footprints, Pill, Utensils, Scale, Sparkles, Phone, MessageCircle, FileText, AlertTriangle, ClipboardList } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const items = [
  { icon: Droplet, label: "血糖", value: "7.2", unit: "mmol/L", trend: "↑ 较昨日 +0.3", tone: "text-warning bg-warning/10" },
  { icon: Heart, label: "血压", value: "138/86", unit: "mmHg", trend: "→ 平稳", tone: "text-destructive bg-destructive/10" },
  { icon: Activity, label: "心率", value: "78", unit: "bpm", trend: "→ 平稳", tone: "text-info bg-info/10" },
  { icon: Scale, label: "体重", value: "68.5", unit: "kg", trend: "↓ 周减 0.4", tone: "text-success bg-success/10" },
  { icon: Moon, label: "睡眠", value: "6.5", unit: "h", trend: "↓ 偏少", tone: "text-info bg-info/10" },
  { icon: Footprints, label: "运动", value: "5,832", unit: "步", trend: "↑ 达标", tone: "text-success bg-success/10" },
  { icon: Pill, label: "用药", value: "已服", unit: "今日", trend: "依从度 95%", tone: "text-primary bg-primary-soft" },
  { icon: Utensils, label: "饮食", value: "1850", unit: "kcal", trend: "→ 合理", tone: "text-warning bg-warning/10" },
];

const UserPortraitView = () => {
  const { pop, push } = useNav();
  const profile = {
    name: "张丽华",
    gender: "女",
    age: 58,
    phone: "138****6621",
    diagnosis: ["2型糖尿病 6年", "原发性高血压 4年"],
    meds: ["二甲双胍 0.5g 早晚", "缬沙坦 80mg 每日一次"],
    allergy: "青霉素",
    family: "父亲糖尿病史",
    plan: "三月期慢病强化管理 · 第 2 月",
  };
  const aiSuggestions = [
    { type: "随访", text: "近 3 日空腹血糖均 >7.0，建议今日 16:00 电话随访并复核饮食", urgent: true },
    { type: "干预", text: "晚间步数仅 1200 步，可一键推送『饭后慢走 20 分钟』提醒", urgent: false },
    { type: "教育", text: "用户连续查看『糖尿病饮食』内容，AI 已生成个性化食谱草稿", urgent: false },
  ];
  const records = [
    { date: "05-05 14:20", type: "电话随访", text: "血糖 7.2，调整晚餐主食至 75g", by: "本人" },
    { date: "05-02 09:10", type: "数据复核", text: "血压平稳 130/82，继续观察", by: "AI 自动" },
    { date: "04-28 20:00", type: "用药提醒", text: "已确认服药，依从度 100%", by: "AI 自动" },
    { date: "04-25 10:30", type: "建档", text: "完成首次评估，启动三月期管理计划", by: "本人" },
  ];
  return (
    <SubPage title="用户画像 · 张丽华" onBack={pop} variant="primary">
      {/* Patient profile */}
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-xl font-bold">张</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-foreground">{profile.name}</p>
              <span className="text-[10px] text-muted-foreground">{profile.gender} · {profile.age}岁</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">高风险</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">{profile.phone} · {profile.plan}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-0.5">诊断</p>
            <p className="text-foreground leading-snug">{profile.diagnosis.join("；")}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-0.5">长期用药</p>
            <p className="text-foreground leading-snug">{profile.meds.join("；")}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-0.5">过敏史</p>
            <p className="text-foreground">{profile.allergy}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-0.5">家族史</p>
            <p className="text-foreground">{profile.family}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <Phone className="w-4 h-4" /><span className="text-[11px]">电话</span>
          </button>
          <button onClick={() => push("send-message")} className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <MessageCircle className="w-4 h-4" /><span className="text-[11px]">消息</span>
          </button>
          <button onClick={() => push("followup-record")} className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <FileText className="w-4 h-4" /><span className="text-[11px]">随访</span>
          </button>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="mt-3 bg-gradient-primary rounded-2xl shadow-card p-4 text-primary-foreground">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" />
          <p className="text-sm font-bold">AI 个性化服务建议</p>
          <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded-full">省 80% 思考时间</span>
        </div>
        <p className="text-[11px] opacity-90 mb-2.5">基于患者近 30 天指标 + 行为 + 用药数据生成</p>
        <div className="space-y-2">
          {aiSuggestions.map((s, i) => (
            <div key={i} className="bg-white/15 backdrop-blur rounded-xl p-2.5 flex items-start gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${s.urgent ? "bg-destructive text-destructive-foreground" : "bg-white/25"}`}>{s.type}</span>
              <p className="text-[11px] leading-relaxed flex-1">{s.text}</p>
              <button onClick={() => push("ai-script")} className="text-[10px] bg-white text-primary font-bold px-2 py-1 rounded shrink-0">采纳</button>
            </div>
          ))}
        </div>
      </div>

      {/* Health metrics */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-primary" /> 健康指标
          </p>
          <span className="text-[10px] text-muted-foreground">数据来源：智能设备同步</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
        {items.map((p) => (
          <div key={p.label} className="bg-card rounded-2xl shadow-soft p-3">
            <div className={`w-9 h-9 rounded-xl ${p.tone} flex items-center justify-center mb-2`}>
              <p.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-muted-foreground">{p.label}</p>
            <p className="text-base font-bold text-foreground mt-0.5">{p.value} <span className="text-[10px] text-muted-foreground font-normal">{p.unit}</span></p>
            <p className="text-[10px] text-muted-foreground mt-1">{p.trend}</p>
          </div>
        ))}
        </div>
      </div>

      {/* Service Records */}
      <div className="mt-3 bg-card rounded-2xl shadow-soft p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-primary" /> 服务记录
          </p>
          <button onClick={() => push("followup-record")} className="text-xs text-primary">+ 新增</button>
        </div>
        <div className="space-y-2">
          {records.map((r, i) => (
            <div key={i} className="flex items-start gap-2 p-2 border-b border-border last:border-0">
              <span className="text-[10px] text-primary font-bold mt-0.5 w-20 shrink-0">{r.date}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground">{r.type}</span>
                  {r.by === "AI 自动" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-soft text-primary flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> AI
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground mt-1">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI auto draft */}
      <button onClick={() => push("ai-script")} className="mt-3 w-full bg-card border border-dashed border-primary rounded-2xl p-3 flex items-center gap-2 text-left">
        <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-foreground">AI 已生成下次随访话术草稿</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">点击查看 / 一键发送，节省 5 分钟撰写时间</p>
        </div>
        <span className="text-[10px] text-primary font-bold">查看 →</span>
      </button>
    </SubPage>
  );
};

export default UserPortraitView;
