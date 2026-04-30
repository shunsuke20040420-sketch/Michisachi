import { useEffect, useState } from "react";
import { Save } from "lucide-react";

const emptyFields = {
  done: "",
  insight: "",
  nextAction: "",
};

export default function GrowthLogForm({ todaysLog, onSave }) {
  const [fields, setFields] = useState(emptyFields);

  useEffect(() => {
    setFields(
      todaysLog
        ? {
            done: todaysLog.done,
            insight: todaysLog.insight,
            nextAction: todaysLog.nextAction,
          }
        : emptyFields,
    );
  }, [todaysLog]);

  function updateField(name, value) {
    setFields((currentFields) => ({ ...currentFields, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(fields);
  }

  return (
    <form className="reveal-item space-y-2" onSubmit={handleSubmit}>
      <h3 className="text-[14px] font-semibold">今日の成長ログ</h3>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold text-[#69716C]">今日やったこと</span>
        <textarea
          className="min-h-[52px] w-full resize-none rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-3 py-2 text-[12px] leading-[1.5] outline-none focus:border-[#2F7F75]"
          value={fields.done}
          onChange={(event) => updateField("done", event.target.value)}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold text-[#69716C]">気づき</span>
        <textarea
          className="min-h-[52px] w-full resize-none rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-3 py-2 text-[12px] leading-[1.5] outline-none focus:border-[#2F7F75]"
          value={fields.insight}
          onChange={(event) => updateField("insight", event.target.value)}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold text-[#69716C]">明日やること</span>
        <textarea
          className="min-h-[52px] w-full resize-none rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-3 py-2 text-[12px] leading-[1.5] outline-none focus:border-[#2F7F75]"
          value={fields.nextAction}
          onChange={(event) => updateField("nextAction", event.target.value)}
        />
      </label>
      <button className="primary-action flex h-10 w-full items-center justify-center gap-2 rounded-[7px] bg-[#2F7F75] text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(47,127,117,.2)]">
        <Save className="h-4 w-4" strokeWidth={1.9} />
        {todaysLog ? "今日のログを更新" : "今日のログを保存"}
      </button>
    </form>
  );
}
