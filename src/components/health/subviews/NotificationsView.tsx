import { Bell, AlertCircle, MessageSquare, CheckCircle2, Calendar } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const items = [
  { icon: AlertCircle, tone: "bg-destructive/10 text-destructive", title: "高风险预警", desc: "张丽华血糖 11.8 mmol/L，建议立即跟进", time: "10 分钟前", unread: true },
  { icon: MessageSquare, tone: "bg-info/10 text-info", title: "用户消息", desc: "李建国：今天忘记吃药了…", time: "32 分钟前", unread: true },
  { icon: Calendar, tone: "bg-primary-soft text-primary", title: "随访提醒", desc: "10:15 周阿姨电话随访", time: "1 小时前", unread: true },
  { icon: CheckCircle2, tone: "bg-success/10 text-success", title: "任务已完成", desc: "本周服务标准任务全部完成", time: "昨天" },
  { icon: Bell, tone: "bg-warning/10 text-warning", title: "系统公告", desc: "新版随访话术模板已上线", time: "2 天前" },
];

const NotificationsView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="通知中心" onBack={pop} right={<button className="text-xs text-primary mr-1">全部已读</button>}>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="bg-card rounded-2xl shadow-soft p-3 flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl ${it.tone} flex items-center justify-center shrink-0`}>
              <it.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{it.title}</p>
                {it.unread && <span className="w-1.5 h-1.5 rounded-full bg-destructive" />}
                <span className="text-[10px] text-muted-foreground ml-auto">{it.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export default NotificationsView;