import { CheckCircle2, Circle } from "lucide-react";

export default function HabitList({ habits, completedIds, onToggle }) {
  return (
    <section className="reveal-item">
      <h3 className="mb-2 text-[14px] font-semibold">今日の習慣</h3>
      <div className="space-y-2">
        {habits.map((habit) => {
          const completed = completedIds.has(habit.id);
          const Icon = completed ? CheckCircle2 : Circle;

          return (
            <button
              key={habit.id}
              type="button"
              onClick={() => onToggle(habit.id)}
              className={`interactive-card flex min-h-[46px] w-full items-center gap-2 rounded-[8px] border bg-[#FFFDF7] px-3 text-left shadow-[0_3px_10px_rgba(47,52,50,.035)] ${
                completed ? "border-[#CADDBC]" : "border-[#D8D0C1]"
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${completed ? "text-[#2F7F75]" : "text-[#8A8D86]"}`} strokeWidth={1.9} />
              <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{habit.name}</span>
              <span className="text-[11px] font-semibold text-[#69716C]">{completed ? "完了" : "未完了"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
