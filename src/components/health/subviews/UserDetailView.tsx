import { Phone, MessageCircle, FileText, Heart } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const UserDetailView = ({ payload }: { payload?: any }) => {
  const { pop, push } = useNav();
  const u = payload || { name: "张丽华", age: 58, level: "高风险", tags: ["糖尿病", "高血压"] };
  const records = [
    { date: "05-05", text: "电话随访 · 血糖 7.2，已调整饮食方案" },
    { date: "05-02", text: "数据复核 · 血压平稳" },
    { date: "04-28", text: "用药提醒 · 已确认服药" },
    { date: "04-25", text: "建档完成 · 启动三月期管理" },
  ];
  return (
    <SubPage title="用户详情" onBack={pop} variant="primary">
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-xl font-bold">{u.name[0]}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-foreground">{u.name}</p>
              <span className="text-[10px] text-muted-foreground">{u.age}岁</span>
            </div>
            <div className="flex gap-1 mt-1.5">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">{u.level}</span>
              {u.tags?.map((t: string) => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <button className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <Phone className="w-4 h-4" /><span className="text-[11px]">电话</span>
          </button>
          <button onClick={() => push("send-message")} className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <MessageCircle className="w-4 h-4" /><span className="text-[11px]">消息</span>
          </button>
          <button onClick={() => push("user-portrait")} className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <Heart className="w-4 h-4" /><span className="text-[11px]">画像</span>
          </button>
        </div>
      </div>
      <div className="bg-card rounded-2xl shadow-soft p-4 mt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-foreground">服务记录</p>
          <button onClick={() => push("followup-record")} className="text-xs text-primary flex items-center gap-0.5">
            <FileText className="w-3.5 h-3.5" /> 新增
          </button>
        </div>
        <div className="space-y-2">
          {records.map((r, i) => (
            <div key={i} className="flex items-start gap-3 p-2 border-b border-border last:border-0">
              <span className="text-[11px] text-primary font-bold mt-0.5">{r.date}</span>
              <p className="text-xs text-foreground flex-1">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SubPage>
  );
};

export default UserDetailView;
