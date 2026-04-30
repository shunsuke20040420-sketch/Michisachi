import { formatJapaneseDate } from "../lib/date";

export default function GrowthLogList({ logs }) {
  return (
    <section className="reveal-item">
      <h3 className="mb-2 text-[16px] font-semibold">保存した成長ログ</h3>
      {logs.length === 0 ? (
        <div className="rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] p-3 text-[12px] font-medium leading-[1.7] text-[#69716C]">
          まだ保存されたログはありません。
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <article key={log.id} className="interactive-card rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] p-3 shadow-[0_3px_10px_rgba(47,52,50,.035)]">
              <h4 className="text-[13px] font-semibold">{formatJapaneseDate(log.date)}</h4>
              <dl className="mt-2 space-y-1.5 text-[11px] leading-[1.55]">
                <div>
                  <dt className="font-semibold text-[#69716C]">今日やったこと</dt>
                  <dd className="font-medium text-[#2F3432]">{log.done || "未入力"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#69716C]">気づき</dt>
                  <dd className="font-medium text-[#2F3432]">{log.insight || "未入力"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#69716C]">明日やること</dt>
                  <dd className="font-medium text-[#2F3432]">{log.nextAction || "未入力"}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
