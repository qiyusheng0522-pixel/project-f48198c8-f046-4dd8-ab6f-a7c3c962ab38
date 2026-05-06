import { Sparkles, Send } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const suggestions = [
  "今日有 3 位用户血糖偏高，建议优先安排随访",
  "李建国连续 2 天未按时服药，可发送用药提醒话术",
  "本周 5 位用户睡眠时长低于 6 小时，建议生活方式干预",
  "周文斌心率持续偏高，建议上传心电图进一步评估",
];

const AIAssistantView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="AI 健康助理" onBack={pop} variant="primary">
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">智能洞察</p>
            <p className="text-[11px] text-muted-foreground">基于 186 位用户数据生成</p>
          </div>
        </div>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="bg-primary-soft text-foreground text-xs p-3 rounded-xl leading-relaxed">{s}</div>
          ))}
        </div>
      </div>
      <div className="mt-4 bg-card rounded-2xl shadow-soft p-2 flex items-center gap-2">
        <input className="flex-1 bg-transparent text-xs px-2 py-2 outline-none" placeholder="向 AI 提问，例如：本周高风险用户" />
        <button className="w-9 h-9 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </SubPage>
  );
};

export default AIAssistantView;