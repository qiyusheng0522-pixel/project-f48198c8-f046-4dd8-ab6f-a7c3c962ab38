import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const ReportDetailView = ({ payload }: { payload?: any }) => {
  const { pop } = useNav();
  const period = payload?.period || "周报";
  const data = [
    { label: "服务用户", value: "186" },
    { label: "完成任务", value: "218" },
    { label: "新增预警", value: "42" },
    { label: "处理预警", value: "39" },
    { label: "随访次数", value: "96" },
    { label: "改善人数", value: "47" },
  ];
  return (
    <SubPage title={`${period}详情`} onBack={pop} variant="cool">
      <div className="bg-card rounded-2xl shadow-card p-4">
        <p className="text-xs text-muted-foreground">2026 年 5 月 · 第 19 周</p>
        <p className="text-base font-bold text-foreground mt-1">综合评分 96 / 100</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {data.map((d) => (
          <div key={d.label} className="bg-card rounded-2xl shadow-soft p-3">
            <p className="text-[11px] text-muted-foreground">{d.label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{d.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-2xl shadow-soft p-4 mt-3">
        <p className="text-sm font-bold text-foreground mb-2">本{period[0]}总结</p>
        <p className="text-xs text-muted-foreground leading-relaxed">高风险用户管理到位，预警处理及时率达 95%；下{period[0]}重点关注 5 位心率异常用户的复测安排。</p>
      </div>
    </SubPage>
  );
};

export default ReportDetailView;
