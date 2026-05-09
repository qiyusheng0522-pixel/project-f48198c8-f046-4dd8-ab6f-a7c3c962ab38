import { useState } from "react";
import { Sparkles, Send, Clock, Users, Check, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import SubPage from "../SubPage";
import { useNav } from "../nav-context";

type Patient = { name: string; tag: string; status: string; tone: string };

// SOP 话术库（按出院第 X 天）
const sopLibrary: Record<number, { time: string; title: string; text: string }[]> = {
  1: [
    { time: "08:00", title: "早餐打卡提醒", text: "早安～别忘了今天的 4 步曲：排便 → 空腹称重 + 围度（胳膊/大腿/腰围）→ 200-300ml 温水 → 营养早餐。记得发早餐打卡哦~" },
    { time: "11:00", title: "午餐准备", text: "您好，咱们吃饭的时间点在 11:30-13:00 之间最好，良好的进餐顺序：蔬菜 → 肉蛋类 → 主食类，细嚼慢咽，期待您的午餐打卡。" },
    { time: "15:00", title: "提醒喝水", text: "您好，咱们今天饮水喝了多少了呀？现在可以小口慢饮 300 毫升温水 ☕" },
    { time: "17:00", title: "晚餐提醒", text: "准备吃晚餐喽，记得打卡，晚餐五六分饱，睡前带着饥饿入睡的效果最好，如果吃饱了记得散散步~" },
  ],
  2: [
    { time: "08:00", title: "早晨 4 步曲", text: "新的一天，记得：排便 → 空腹称重 + 围度 → 200-300ml 温水 → 早餐。打卡走起！" },
    { time: "10:00", title: "控糖小知识", text: "少吃糖对健康更有益：每日添加糖最好控制在 25g 以下（最多 50g）。WHO 建议：游离糖 ≤ 总摄入 5%（约 25g/2000kcal）。" },
    { time: "11:00", title: "211 饮食结构", text: "推荐 211 饮食：蔬菜 : 蛋白质 : 主食 = 2 : 1 : 1，可以参照这个结构准备午餐哦~" },
    { time: "15:00", title: "喝水 + 加餐", text: "饮水达标了吗？现在 300ml 温水。若有饥饿感可加餐：1 杯酸奶 / 3 颗核桃 / 一拳头水果。久坐请记得『三个一』：每小时起来 1 次，活动 1 分钟。" },
    { time: "17:00", title: "晚餐提醒", text: "准备晚餐喽，记得打卡，晚餐五六分饱，吃饱了散散步~" },
  ],
  3: [
    { time: "10:00", title: "蛋白质小知识", text: "少喝肉汤汁～汤的营养远不如原料本身，上层白色油脂不如吃几块肉实在。补足蛋白质，身体才能更好地工作生活，我们不仅要吃好更要吃对！" },
    { time: "11:00", title: "211 饮食", text: "11:30-13:00 用餐最好。推荐 211 结构：蔬菜 : 蛋白质 : 主食 = 2 : 1 : 1。" },
    { time: "13:00", title: "提醒喝水", text: "你好，现在开始要喝水了哦，小口慢饮 300 毫升温水。" },
    { time: "15:00", title: "询问饥饿感", text: "现在有饥饿感吗？需要的话可以加餐一份酸奶 / 坚果 / 低糖水果。" },
  ],
  4: [
    { time: "08:00", title: "早安提醒", text: "早安呀！记得空腹测量数据，再来一份营养满满的早餐，元气满满迎接新一天~" },
    { time: "10:00", title: "维生素 B 族", text: "维生素 B 是水溶性维生素，多余的不会储存，需每日补充。它能帮助打开代谢通路、促进脂肪代谢，并帮助拥有愉悦心情。" },
    { time: "11:00", title: "蔬菜先行", text: "上午水喝了吗？又到午餐时间，外餐或在家就餐第一口一定要吃蔬菜，可平衡餐后血糖、减少波动哦。" },
    { time: "15:30", title: "询问饥饿感", text: "现在有明显饥饿感吗？坚果、酸奶、低糖水果都是很好的加餐选择。" },
    { time: "17:00", title: "晚餐提醒", text: "准备晚餐喽，记得打卡，五六分饱最佳，吃饱了散散步。" },
  ],
  5: [
    { time: "08:00", title: "代谢启动键", text: "早餐别敷衍，它是代谢的『启动键』；久坐别太久，每小时起来活动 2 分钟。别忘了常规发数据~" },
    { time: "10:00", title: "细嚼慢咽", text: "每一口食物缓慢咀嚼 30 次以上再吞下，完全咽下后再夹下口。这个简单动作对健康减脂非常有帮助。" },
    { time: "11:00", title: "午餐搭配", text: "午餐要『有荤有素、有粗有细』——杂粮饭 + 瘦肉 + 绿叶菜，提供饱腹感同时让血糖平稳。好好吃饭，才是高效工作的底气~" },
    { time: "17:00", title: "晚餐时间", text: "晚餐尽量在睡前 3 小时吃完（如 10 点睡，7 点前结束）。如易饿，睡前 1 小时可喝温牛奶或半根香蕉。" },
  ],
  6: [
    { time: "08:00", title: "小复盘", text: "早安，给自己一个『小复盘』：昨天饮水量达标了吗？睡眠够 7 小时了吗？健康就是在这样的微调中越来越好的~" },
    { time: "10:00", title: "夏季食安", text: "1.饭前/烹饪前洗手；2.剩饭剩菜及时密封冷藏，食用前充分加热；3.生熟分开；4.挑保质期内食物；5.肉禽蛋海产彻底做熟。" },
    { time: "11:00", title: "餐盘法则", text: "推荐『餐盘法则』：1/2 蔬菜（深色最佳）+ 1/4 蛋白质（鱼虾/瘦肉/豆腐）+ 1/4 主食（粗细搭配）。" },
    { time: "13:00", title: "提醒喝水", text: "现在开始要喝水了哦，小口慢饮 300 毫升温水。" },
    { time: "15:00", title: "饮水复盘", text: "今天喝水了吗？饮水量有没有达标呀？" },
    { time: "17:00", title: "晚餐量控", text: "晚餐的『量』比『种类』更重要。哪怕是简单的蔬菜鸡蛋面，控制好分量，也比过量的『健康餐』更有益。" },
  ],
  7: [
    { time: "08:00", title: "周 7 提醒", text: "早安，健康藏在每个微小的坚持里。今天也要为身体多花一点点心~ 别忘测量腰围、体重、血糖等指标。" },
    { time: "10:00", title: "小餐具策略", text: "用小一号餐具能更好控制分量，视觉上显得更满。研究显示：与 30cm 餐盘相比，25cm 餐盘可少吃 22% 的食物！" },
    { time: "11:00", title: "外卖提醒", text: "尽量避开高油高盐外卖（炸鸡、麻辣香锅）。如必须点，记得备注『少盐少酱』，搭配一份凉拌菜或水果。" },
    { time: "17:00", title: "晚餐提醒", text: "准备晚餐喽，五六分饱，吃完散散步~" },
  ],
};

// 各阶段在管患者（按 SOP 阶段分级）
const patientsByDay: Record<number, Patient[]> = {
  1: [
    { name: "张丽华", tag: "新入组", status: "未打卡早餐", tone: "bg-destructive/10 text-destructive" },
    { name: "李建国", tag: "新入组", status: "已称重未发数据", tone: "bg-warning/10 text-warning" },
    { name: "王秀梅", tag: "新入组", status: "已完成 4 步曲", tone: "bg-success/10 text-success" },
    { name: "周文斌", tag: "新入组", status: "未打卡早餐", tone: "bg-destructive/10 text-destructive" },
  ],
  2: [
    { name: "陈美玲", tag: "稳定", status: "等待午餐打卡", tone: "bg-info/10 text-info" },
    { name: "黄志强", tag: "需关注", status: "昨日饮水不足", tone: "bg-warning/10 text-warning" },
    { name: "赵雪", tag: "稳定", status: "依从度 95%", tone: "bg-success/10 text-success" },
  ],
  3: [
    { name: "孙建华", tag: "稳定", status: "正常", tone: "bg-success/10 text-success" },
    { name: "吴敏", tag: "需关注", status: "蛋白质摄入低", tone: "bg-warning/10 text-warning" },
  ],
  4: [
    { name: "刘洋", tag: "稳定", status: "正常", tone: "bg-success/10 text-success" },
    { name: "杨梅", tag: "稳定", status: "正常", tone: "bg-success/10 text-success" },
    { name: "胡军", tag: "需关注", status: "蔬菜摄入不足", tone: "bg-warning/10 text-warning" },
  ],
  5: [
    { name: "马丽", tag: "稳定", status: "依从度良好", tone: "bg-success/10 text-success" },
    { name: "朱建", tag: "稳定", status: "正常", tone: "bg-success/10 text-success" },
  ],
  6: [
    { name: "高峰", tag: "复盘期", status: "本周减重 0.6kg", tone: "bg-success/10 text-success" },
    { name: "林芳", tag: "复盘期", status: "饮水未达标", tone: "bg-warning/10 text-warning" },
  ],
  7: [
    { name: "邓涛", tag: "结业准备", status: "周报已生成", tone: "bg-primary-soft text-primary" },
    { name: "曾丽", tag: "结业准备", status: "周报已生成", tone: "bg-primary-soft text-primary" },
  ],
};

// 按状态分级，便于一键群发
const groupPatients = (list: Patient[]) => {
  const groups: Record<string, Patient[]> = {};
  list.forEach((p) => {
    groups[p.tag] = groups[p.tag] || [];
    groups[p.tag].push(p);
  });
  return groups;
};

const SopStageView = ({ payload }: { payload?: any }) => {
  const { pop, push } = useNav();
  const day: number = payload?.day || 1;
  const stageTitle: string = payload?.title || `出院第 ${day} 天`;
  const focus: string = payload?.focus || "";

  const templates = sopLibrary[day] || [];
  const patients = patientsByDay[day] || [];
  const groups = groupPatients(patients);

  const [sentIdx, setSentIdx] = useState<Record<string, boolean>>({});
  const [showAllPatients, setShowAllPatients] = useState(false);

  const sendTo = (key: string) => {
    setSentIdx((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setSentIdx((prev) => ({ ...prev, [key]: false })), 1800);
  };

  return (
    <SubPage title={stageTitle} onBack={pop} variant="primary">
      {/* Stage summary */}
      <div className="bg-gradient-primary text-primary-foreground rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">SOP DAY {day}</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Users className="w-3 h-3" /> 在管 {patients.length} 位
          </span>
        </div>
        <p className="text-sm font-bold mt-2">今日重点：{focus}</p>
        <p className="text-[11px] opacity-90 mt-1">AI 已根据 SOP 节奏为你准备好 {templates.length} 条话术，可一键群发或单发</p>
      </div>

      {/* Patients in this stage */}
      <div className="mt-3 bg-card rounded-2xl shadow-soft p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" /> 患者列表（按状态分级）
          </p>
          <button onClick={() => setShowAllPatients((v) => !v)} className="text-[11px] text-primary flex items-center gap-0.5">
            {showAllPatients ? <>收起 <ChevronUp className="w-3 h-3" /></> : <>展开 <ChevronDown className="w-3 h-3" /></>}
          </button>
        </div>
        {Object.entries(groups).map(([tag, list]) => (
          <div key={tag} className="mb-2 last:mb-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-foreground">
                {tag} <span className="text-muted-foreground">· {list.length} 人</span>
              </span>
              <button
                onClick={() => sendTo(`group-${tag}`)}
                className="text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded-full flex items-center gap-1"
              >
                {sentIdx[`group-${tag}`] ? <><Check className="w-3 h-3" /> 已发送</> : <><Send className="w-3 h-3" /> 一键群发本组</>}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(showAllPatients ? list : list.slice(0, 6)).map((p, i) => (
                <button
                  key={i}
                  onClick={() => push("patient-chat", p)}
                  className={`text-[11px] px-2 py-1 rounded-full ${p.tone} flex items-center gap-1`}
                >
                  {p.name}
                  <span className="opacity-60">· {p.status}</span>
                </button>
              ))}
              {!showAllPatients && list.length > 6 && (
                <span className="text-[11px] text-muted-foreground px-2 py-1">+{list.length - 6}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Templates */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" /> AI 提示话术 · 一键发送
          </p>
          <span className="text-[10px] text-muted-foreground">按 SOP 时间节奏</span>
        </div>
        <div className="space-y-2">
          {templates.map((t, i) => {
            const key = `tpl-${i}`;
            const sent = sentIdx[key];
            return (
              <div key={i} className="bg-card rounded-2xl shadow-soft p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] bg-primary-soft text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {t.time}
                  </span>
                  <span className="text-xs font-semibold text-foreground">{t.title}</span>
                </div>
                <p className="text-[12px] text-foreground leading-relaxed bg-muted/40 rounded-lg p-2.5">{t.text}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => sendTo(key)}
                    className={`flex-1 text-[12px] py-2 rounded-xl font-medium flex items-center justify-center gap-1 ${
                      sent ? "bg-success text-success-foreground" : "bg-gradient-primary text-primary-foreground"
                    }`}
                  >
                    {sent ? <><Check className="w-3.5 h-3.5" /> 已发送至 {patients.length} 位</> : <><Send className="w-3.5 h-3.5" /> 一键群发本组</>}
                  </button>
                  <button
                    onClick={() => push("send-message", t)}
                    className="px-3 text-[12px] py-2 rounded-xl border border-border text-foreground flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> 选择对象
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SubPage>
  );
};

export default SopStageView;
