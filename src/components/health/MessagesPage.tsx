import { Search, Sparkles, Pin, Users } from "lucide-react";
import { useNav } from "./nav-context";

const filters = ["全部", "未回复", "高风险", "新入组", "群聊"];

const conversations = [
  { name: "张丽华", last: "好的，午餐我会按 211 结构准备", time: "刚刚", unread: 2, tag: "高风险", tone: "bg-destructive/10 text-destructive", pin: true, ai: true },
  { name: "李建国", last: "[语音 12'']", time: "10 分前", unread: 1, tag: "新入组", tone: "bg-warning/10 text-warning", ai: true },
  { name: "出院第 1 天 · 群聊", last: "AI: 早餐打卡提醒已群发", time: "08:00", unread: 0, tag: "群聊", tone: "bg-info/10 text-info", group: true, ai: true },
  { name: "周文斌", last: "今天血糖测了 6.8", time: "昨天", unread: 0, tag: "稳定", tone: "bg-success/10 text-success" },
  { name: "王秀梅", last: "谢谢林老师 ❤️", time: "昨天", unread: 0, tag: "稳定", tone: "bg-success/10 text-success" },
  { name: "出院第 2 天 · 群聊", last: "AI: 211 饮食结构建议已发送", time: "昨天", unread: 0, tag: "群聊", tone: "bg-info/10 text-info", group: true, ai: true },
  { name: "陈美玲", last: "还没吃午饭", time: "周一", unread: 0, tag: "需关注", tone: "bg-warning/10 text-warning" },
];

const MessagesPage = () => {
  const { push } = useNav();
  return (
    <div className="flex flex-col h-full">
      <header className="px-5 pt-3 pb-3 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-foreground">沟通</h1>
          <span className="text-[11px] text-muted-foreground">3 条未读</span>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input className="flex-1 bg-transparent text-xs outline-none" placeholder="搜索患者 / 群聊 / 关键词" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* AI assist banner */}
        <button
          onClick={() => push("ai-script")}
          className="w-full mx-4 mt-3 bg-gradient-primary text-primary-foreground rounded-2xl shadow-card p-3 flex items-center gap-3 text-left"
          style={{ width: "calc(100% - 2rem)" }}
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold">AI 已为 7 位患者生成回复草稿</p>
            <p className="text-[10px] opacity-90 mt-0.5">点击查看 / 一键采纳，节省 30 分钟</p>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full">查看</span>
        </button>

        {/* Filters */}
        <div className="flex gap-1.5 overflow-x-auto px-4 mt-3 pb-1 no-scrollbar">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <ul className="mt-2 px-2 pb-4">
          {conversations.map((c, i) => (
            <li key={i}>
              <button
                onClick={() => push("patient-chat", c)}
                className="w-full flex items-center gap-3 px-2.5 py-3 rounded-xl active:bg-muted/60"
              >
                <div className="relative shrink-0">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    c.group ? "bg-gradient-cool text-primary-foreground" : "bg-gradient-primary text-primary-foreground"
                  }`}>
                    {c.group ? <Users className="w-5 h-5" /> : c.name[0]}
                  </div>
                  {c.unread > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    {c.pin && <Pin className="w-3 h-3 text-warning shrink-0" />}
                    <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${c.tone} shrink-0`}>{c.tag}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {c.ai && <Sparkles className="w-3 h-3 text-primary shrink-0" />}
                    <p className="text-[11px] text-muted-foreground truncate">{c.last}</p>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 self-start mt-1">{c.time}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagesPage;
