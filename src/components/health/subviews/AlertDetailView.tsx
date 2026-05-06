import { Activity, Phone, MessageCircle } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const AlertDetailView = ({ payload }: { payload?: any }) => {
  const { pop, push } = useNav();
  const a = payload || { user: "张丽华", title: "空腹血糖 11.8 mmol/L", desc: "连续 3 日超过阈值", level: "紧急" };
  return (
    <SubPage title="预警详情" onBack={pop} variant="warm">
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground">{a.level}</span>
          <span className="text-[10px] text-muted-foreground">触发于 10 分钟前</span>
        </div>
        <h2 className="text-base font-bold text-foreground mt-2">{a.title}</h2>
        <p className="text-xs text-muted-foreground mt-1">用户：{a.user} · {a.desc}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-muted rounded-xl p-2 text-center">
            <p className="text-muted-foreground text-[10px]">触发值</p>
            <p className="font-bold text-destructive mt-0.5">11.8</p>
          </div>
          <div className="bg-muted rounded-xl p-2 text-center">
            <p className="text-muted-foreground text-[10px]">阈值</p>
            <p className="font-bold text-foreground mt-0.5">7.0</p>
          </div>
          <div className="bg-muted rounded-xl p-2 text-center">
            <p className="text-muted-foreground text-[10px]">7日趋势</p>
            <p className="font-bold text-warning mt-0.5">↑</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-2xl shadow-soft p-4 mt-3">
        <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-primary" /> AI 处置建议
        </p>
        <ol className="text-xs text-muted-foreground space-y-1.5 leading-relaxed list-decimal pl-4">
          <li>立即电话沟通，确认是否近期饮食或用药变化</li>
          <li>建议 2 小时后复测血糖并上传</li>
          <li>若持续偏高，安排 24 小时内到院复诊</li>
        </ol>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <button className="py-3 rounded-2xl bg-card text-foreground text-xs shadow-soft flex items-center justify-center gap-1"><Phone className="w-3.5 h-3.5" />电话</button>
        <button onClick={() => push("send-message")} className="py-3 rounded-2xl bg-card text-foreground text-xs shadow-soft flex items-center justify-center gap-1"><MessageCircle className="w-3.5 h-3.5" />消息</button>
        <button onClick={pop} className="py-3 rounded-2xl bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-card">处理完成</button>
      </div>
    </SubPage>
  );
};

export default AlertDetailView;
