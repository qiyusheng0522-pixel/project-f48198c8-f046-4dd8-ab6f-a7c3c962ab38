import { ChevronRight, Settings, Shield, Bell, HelpCircle, FileText, LogOut, Award, Edit3 } from "lucide-react";
import { useNav, SubView } from "./nav-context";

const stats = [
  { label: "服务用户", value: "186" },
  { label: "累计随访", value: "2.4k" },
  { label: "工龄", value: "3年" },
];

const groups = [
  {
    title: "个人资料",
    items: [
      { icon: Edit3, label: "基本信息", desc: "姓名 / 工号 / 资质", view: "profile-edit" as SubView },
      { icon: Award, label: "我的证书", desc: "健康管理师中级", view: "certificates" as SubView },
      { icon: FileText, label: "服务记录", desc: "查看历史服务", view: "service-history" as SubView },
    ],
  },
  {
    title: "设置",
    items: [
      { icon: Bell, label: "消息通知", desc: "已开启", view: "settings-notify" as SubView },
      { icon: Shield, label: "隐私安全", desc: "", view: "settings-privacy" as SubView },
      { icon: Settings, label: "通用设置", desc: "", view: "settings-general" as SubView },
      { icon: HelpCircle, label: "帮助与反馈", desc: "", view: "help" as SubView },
    ],
  },
];

const MePage = () => {
  const { push } = useNav();
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="px-5 pt-3 pb-12 bg-gradient-primary text-primary-foreground relative">
        <h1 className="text-lg font-bold">我的</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-10">
        {/* Profile card */}
        <button onClick={() => push("profile-edit")} className="w-full text-left bg-card rounded-2xl shadow-card p-4 block">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              林
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-foreground">林雨晴</p>
              <p className="text-xs text-muted-foreground mt-0.5">健康管理师 · 工号 HM2024</p>
              <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-gradient-warm text-primary-foreground">
                ⭐ 金牌服务师
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-3 mt-4 pt-4 border-t border-border">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-base font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </button>

        {/* Groups */}
        {groups.map((g) => (
          <section key={g.title} className="mt-4">
            <h2 className="text-xs font-semibold text-muted-foreground px-1 mb-2">{g.title}</h2>
            <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
              {g.items.map((it, i) => (
                <button
                  key={it.label}
                  onClick={() => push(it.view)}
                  className={`w-full flex items-center gap-3 p-3 ${i !== g.items.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                    <it.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-foreground">{it.label}</p>
                  </div>
                  {it.desc && <p className="text-[11px] text-muted-foreground">{it.desc}</p>}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <button className="w-full mt-5 py-3 rounded-2xl bg-card text-destructive shadow-soft text-sm font-medium flex items-center justify-center gap-2">
          <LogOut className="w-4 h-4" /> 退出登录
        </button>
      </div>
    </div>
  );
};

export default MePage;