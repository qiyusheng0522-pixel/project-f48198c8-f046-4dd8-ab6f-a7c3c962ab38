import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const FollowupRecordView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="随访结果记录" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-foreground">用户</label>
          <div className="mt-2 bg-muted rounded-xl px-3 py-2.5 text-xs">张丽华 · 58岁</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-foreground">空腹血糖</label>
            <input className="mt-2 w-full bg-muted rounded-xl px-3 py-2 text-xs outline-none" placeholder="mmol/L" />
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground">血压</label>
            <input className="mt-2 w-full bg-muted rounded-xl px-3 py-2 text-xs outline-none" placeholder="mmHg" />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">用户主诉</label>
          <textarea rows={3} className="mt-2 w-full bg-muted rounded-xl p-3 text-xs outline-none" placeholder="记录用户当前情况、不适症状等" />
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">干预建议</label>
          <textarea rows={3} className="mt-2 w-full bg-muted rounded-xl p-3 text-xs outline-none" placeholder="饮食、运动、用药建议" />
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">下次随访</label>
          <input type="date" className="mt-2 w-full bg-muted rounded-xl px-3 py-2 text-xs outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button className="py-3 rounded-2xl bg-card text-foreground text-sm shadow-soft">保存草稿</button>
        <button onClick={pop} className="py-3 rounded-2xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-card">提交记录</button>
      </div>
    </SubPage>
  );
};

export default FollowupRecordView;
