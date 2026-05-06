import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const DispatchView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="服务派单" onBack={pop} variant="primary">
      <div className="bg-card rounded-2xl shadow-card p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-foreground">服务对象</label>
          <div className="mt-2 bg-muted rounded-xl px-3 py-2.5 text-xs text-foreground">张丽华 · 58岁 · 高风险</div>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">服务类型</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {["电话随访", "上门服务", "线上咨询", "数据复核", "用药指导", "饮食方案"].map((s, i) => (
              <button key={s} className={`text-[11px] py-2 rounded-xl ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">指派给</label>
          <div className="mt-2 space-y-2">
            {[
              { name: "我自己", tag: "在线" },
              { name: "陈雨欣", tag: "空闲" },
              { name: "刘思琪", tag: "繁忙" },
            ].map((m, i) => (
              <label key={m.name} className="flex items-center gap-3 bg-muted rounded-xl p-2.5">
                <input type="radio" name="assignee" defaultChecked={i === 0} className="accent-primary" />
                <div className="w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{m.name[0]}</div>
                <span className="text-xs text-foreground flex-1">{m.name}</span>
                <span className="text-[10px] text-muted-foreground">{m.tag}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-foreground">备注</label>
          <textarea className="mt-2 w-full bg-muted rounded-xl p-3 text-xs outline-none" rows={3} placeholder="补充说明…" />
        </div>
      </div>
      <button onClick={pop} className="w-full mt-4 py-3 rounded-2xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-card">
        确认派单
      </button>
    </SubPage>
  );
};

export default DispatchView;
