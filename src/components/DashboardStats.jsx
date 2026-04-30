import { BookOpenCheck, CheckCircle2, Flame, ListChecks } from "lucide-react";
import { formatJapaneseDate } from "../lib/date";

const statItems = [
  { key: "completionRate", label: "達成率", icon: CheckCircle2, suffix: "%" },
  { key: "habitProgress", label: "完了", icon: ListChecks, suffix: "" },
  { key: "streak", label: "連続", icon: Flame, suffix: "日" },
  { key: "logCount", label: "ログ", icon: BookOpenCheck, suffix: "件" },
];

export default function DashboardStats({ stats, today }) {
  const values = {
    completionRate: stats.completionRate,
    habitProgress: `${stats.completedCount}/${stats.totalHabits}`,
    streak: stats.streak,
    logCount: stats.logCount,
  };

  return (
    <section className="reveal-item rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] p-3 shadow-[0_3px_12px_rgba(47,52,50,.04)]">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[14px] font-semibold leading-none">今日の進み具合</h3>
        <span className="text-[11px] font-semibold text-[#69716C]">{formatJapaneseDate(today)}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="rounded-[7px] border border-[#D8D0C1] bg-[#FFFDF7] px-2 py-2">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#69716C]">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                <span>{item.label}</span>
              </div>
              <p className="mt-1 text-[16px] font-semibold leading-none text-[#2F3432]">
                {values[item.key]}
                {item.key === "habitProgress" ? null : <span className="ml-0.5 text-[11px]">{item.suffix}</span>}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
