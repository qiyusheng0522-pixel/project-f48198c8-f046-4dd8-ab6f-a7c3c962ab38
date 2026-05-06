import { Copy, Sparkles } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const scripts = [
  { tag: "血糖偏高", text: "您好，注意到您今日空腹血糖偏高，建议清淡饮食并于 2 小时后复测，如不适请及时就医。" },
  { tag: "用药提醒", text: "提醒您今日按时服用降压药，按医嘱坚持用药对血压稳定非常重要。" },
  { tag: "情绪关怀", text: "您好，最近您的睡眠数据有些波动，注意休息，遇到压力可以与家人或我沟通。" },
  { tag: "复诊通知", text: "您本周期管理已进入复诊节点，建议本周到院复查相关指标。" },
];

const AIScriptView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="AI 一键话术" onBack={pop} variant="warm">
      <div className="bg-card rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-warning" />
          <p className="text-sm font-bold text-foreground">推荐话术</p>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">点击复制，可直接发送给用户</p>
      </div>
      <div className="mt-3 space-y-2">
        {scripts.map((s, i) => (
          <div key={i} className="bg-card rounded-2xl shadow-soft p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-soft text-primary">{s.tag}</span>
              <button className="text-primary"><Copy className="w-3.5 h-3.5" /></button>
            </div>
            <p className="text-xs text-foreground mt-2 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export default AIScriptView;
