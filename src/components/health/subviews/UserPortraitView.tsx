import { Activity, Heart, Droplet, Moon, Footprints, Pill, Utensils, Scale } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

const items = [
  { icon: Droplet, label: "血糖", value: "7.2", unit: "mmol/L", trend: "↑ 较昨日 +0.3", tone: "text-warning bg-warning/10" },
  { icon: Heart, label: "血压", value: "138/86", unit: "mmHg", trend: "→ 平稳", tone: "text-destructive bg-destructive/10" },
  { icon: Activity, label: "心率", value: "78", unit: "bpm", trend: "→ 平稳", tone: "text-info bg-info/10" },
  { icon: Scale, label: "体重", value: "68.5", unit: "kg", trend: "↓ 周减 0.4", tone: "text-success bg-success/10" },
  { icon: Moon, label: "睡眠", value: "6.5", unit: "h", trend: "↓ 偏少", tone: "text-info bg-info/10" },
  { icon: Footprints, label: "运动", value: "5,832", unit: "步", trend: "↑ 达标", tone: "text-success bg-success/10" },
  { icon: Pill, label: "用药", value: "已服", unit: "今日", trend: "依从度 95%", tone: "text-primary bg-primary-soft" },
  { icon: Utensils, label: "饮食", value: "1850", unit: "kcal", trend: "→ 合理", tone: "text-warning bg-warning/10" },
];

const UserPortraitView = () => {
  const { pop } = useNav();
  return (
    <SubPage title="用户画像 · 张丽华" onBack={pop}>
      <div className="grid grid-cols-2 gap-2">
        {items.map((p) => (
          <div key={p.label} className="bg-card rounded-2xl shadow-soft p-3">
            <div className={`w-9 h-9 rounded-xl ${p.tone} flex items-center justify-center mb-2`}>
              <p.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-muted-foreground">{p.label}</p>
            <p className="text-base font-bold text-foreground mt-0.5">{p.value} <span className="text-[10px] text-muted-foreground font-normal">{p.unit}</span></p>
            <p className="text-[10px] text-muted-foreground mt-1">{p.trend}</p>
          </div>
        ))}
      </div>
    </SubPage>
  );
};

export default UserPortraitView;
