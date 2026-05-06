import { Switch } from "@/components/ui/switch";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

export const ProfileEditView = () => {
  const { pop } = useNav();
  const fields = [
    { label: "姓名", value: "林雨晴" },
    { label: "工号", value: "HM2024" },
    { label: "性别", value: "女" },
    { label: "手机号", value: "138****8888" },
    { label: "执业资质", value: "健康管理师 · 中级" },
    { label: "服务年限", value: "3 年" },
  ];
  return (
    <SubPage title="个人资料" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {fields.map((f, i) => (
          <div key={f.label} className={`flex items-center px-4 py-3 ${i !== fields.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-xs text-muted-foreground w-20">{f.label}</span>
            <span className="text-sm text-foreground flex-1">{f.value}</span>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export const CertificatesView = () => {
  const { pop } = useNav();
  const certs = [
    { name: "健康管理师 · 中级", date: "2023-06" },
    { name: "慢病管理认证", date: "2024-03" },
    { name: "心理咨询基础", date: "2024-09" },
  ];
  return (
    <SubPage title="我的证书" onBack={pop}>
      <div className="space-y-2">
        {certs.map((c) => (
          <div key={c.name} className="bg-card rounded-2xl shadow-soft p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{c.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">取得时间 {c.date}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-success/10 text-success">有效</span>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export const ServiceHistoryView = () => {
  const { pop } = useNav();
  const records = [
    { date: "05-05", title: "张丽华 · 电话随访" },
    { date: "05-05", title: "李建国 · 用药提醒" },
    { date: "05-04", title: "周文斌 · 数据复核" },
    { date: "05-03", title: "王秀梅 · 饮食指导" },
    { date: "05-02", title: "孙阿姨 · 运动方案" },
  ];
  return (
    <SubPage title="服务记录" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {records.map((r, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 ${i !== records.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-xs text-primary font-bold">{r.date}</span>
            <span className="text-xs text-foreground flex-1">{r.title}</span>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export const NotifySettingsView = () => {
  const { pop } = useNav();
  const opts = ["预警通知", "任务提醒", "用户消息", "系统公告", "营销推送"];
  return (
    <SubPage title="消息通知" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {opts.map((o, i) => (
          <div key={o} className={`flex items-center justify-between px-4 py-3 ${i !== opts.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-sm text-foreground">{o}</span>
            <Switch defaultChecked={i < 4} />
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export const PrivacyView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="隐私安全" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {["修改密码", "指纹/面容登录", "登录设备管理", "数据加密说明", "隐私政策"].map((o, i, arr) => (
          <div key={o} className={`flex items-center justify-between px-4 py-3 ${i !== arr.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-sm text-foreground">{o}</span>
            <span className="text-muted-foreground text-xs">›</span>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export const GeneralSettingsView = () => {
  const { pop } = useNav();
  const items: [string, string][] = [
    ["语言", "简体中文"],
    ["字体大小", "标准"],
    ["夜间模式", "跟随系统"],
    ["缓存清理", "12.4 MB"],
    ["关于", "v2.4.1"],
  ];
  return (
    <SubPage title="通用设置" onBack={pop}>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {items.map(([k, v], i, arr) => (
          <div key={k} className={`flex items-center justify-between px-4 py-3 ${i !== arr.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-sm text-foreground">{k}</span>
            <span className="text-xs text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export const HelpView = () => {
  const { pop } = useNav();
  const faqs = [
    "如何为用户创建健康档案？",
    "预警等级的划分标准是什么？",
    "如何使用 AI 一键话术？",
    "团队抽查规则说明",
  ];
  return (
    <SubPage title="帮助与反馈" onBack={pop}>
      <p className="text-xs font-semibold text-muted-foreground px-1 mb-2">常见问题</p>
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {faqs.map((f, i) => (
          <div key={f} className={`flex items-center justify-between px-4 py-3 ${i !== faqs.length - 1 ? "border-b border-border" : ""}`}>
            <span className="text-xs text-foreground flex-1">{f}</span>
            <span className="text-muted-foreground text-xs">›</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-3 rounded-2xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-card">
        提交反馈
      </button>
    </SubPage>
  );
};
