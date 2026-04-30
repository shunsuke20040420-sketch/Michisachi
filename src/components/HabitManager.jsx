import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function HabitManager({ habits, onAdd, onDelete }) {
  const [habitName, setHabitName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(habitName);
    setHabitName("");
  }

  return (
    <section className="reveal-item space-y-3">
      <div>
        <h3 className="text-[16px] font-semibold">習慣管理</h3>
        <p className="mt-1 text-[12px] font-medium leading-[1.6] text-[#69716C]">今日のチェックに出す習慣を整えます。</p>
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="min-w-0 flex-1 rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-3 text-[13px] font-medium outline-none focus:border-[#2F7F75]"
          value={habitName}
          onChange={(event) => setHabitName(event.target.value)}
          placeholder="習慣名"
        />
        <button
          type="submit"
          className="primary-action flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] bg-[#2F7F75] text-white shadow-[0_8px_18px_rgba(47,127,117,.2)]"
          aria-label="習慣を追加"
        >
          <Plus className="h-5 w-5" strokeWidth={2} />
        </button>
      </form>
      <div className="space-y-2">
        {habits.map((habit) => (
          <div key={habit.id} className="interactive-card flex min-h-[46px] items-center gap-2 rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-3 shadow-[0_3px_10px_rgba(47,52,50,.035)]">
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{habit.name}</span>
            <button
              type="button"
              onClick={() => onDelete(habit.id)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[7px] text-[#69716C] hover:bg-[#F8F4EA]"
              aria-label={`${habit.name}を削除`}
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
