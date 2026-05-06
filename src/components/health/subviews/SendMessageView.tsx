import { Send, Users } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const SendMessageView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="一键发送" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-foreground">发送对象</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {["全部用户", "高风险用户", "糖尿病用户", "本周复诊"].map((g, i) => (
              <button key={g} className={`text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 ${i === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                <Users className="w-3.5 h-3.5" /> {g}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">消息模板</label>
          <select className="mt-2 w-full bg-muted rounded-xl px-3 py-2.5 text-xs outline-none">
            <option>血糖偏高提醒</option>
            <option>每日健康打卡</option>
            <option>复诊通知</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">消息内容</label>
          <textarea defaultValue="您好，注意到近期您的指标有所波动，请按时上传健康数据，如有不适及时联系。" className="mt-2 w-full bg-muted rounded-xl p-3 text-xs outline-none" rows={4} />
        </div>
      </div>
      <button onClick={pop} className="w-full mt-4 py-3 rounded-2xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-card flex items-center justify-center gap-2">
        <Send className="w-4 h-4" /> 立即发送 (12 人)
      </button>
    </SubPage>
  );
};

export default SendMessageView;
