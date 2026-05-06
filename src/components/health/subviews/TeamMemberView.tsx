import { Award, Phone, MessageCircle } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const TeamMemberView = ({ payload }: { payload?: any }) => {
  const { pop } = useNav();
  const m = payload || { name: "陈雨欣", score: 91, rank: 2 };
  const users = [
    { name: "刘奶奶", level: "高风险" },
    { name: "吴先生", level: "中风险" },
    { name: "黄阿姨", level: "低风险" },
    { name: "钱大爷", level: "中风险" },
  ];
  return (
    <SubPage title="组员详情" onBack={pop} variant="primary">
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-xl font-bold">{m.name[0]}</div>
          <div className="flex-1">
            <p className="text-base font-bold text-foreground">{m.name}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">健康管理师 · 团队排名 {m.rank}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{m.score}</p>
            <p className="text-[10px] text-muted-foreground">综合分</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <button className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <Phone className="w-4 h-4" /><span className="text-[11px]">联系</span>
          </button>
          <button className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <MessageCircle className="w-4 h-4" /><span className="text-[11px]">私信</span>
          </button>
          <button className="bg-primary-soft text-primary rounded-xl py-2 flex flex-col items-center gap-0.5">
            <Award className="w-4 h-4" /><span className="text-[11px]">点赞</span>
          </button>
        </div>
      </div>
      <div className="bg-card rounded-2xl shadow-soft p-4 mt-3">
        <p className="text-sm font-bold text-foreground mb-2">负责用户 · 抽查样本</p>
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.name} className="flex items-center justify-between p-2 border-b border-border last:border-0">
              <span className="text-xs text-foreground">{u.name}</span>
              <span className="text-[10px] text-muted-foreground">{u.level}</span>
            </div>
          ))}
        </div>
      </div>
    </SubPage>
  );
};

export default TeamMemberView;
