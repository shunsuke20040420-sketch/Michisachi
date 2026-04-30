import { ArrowLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { secondaryScreens } from "../data/secondaryScreens";

const iconMap = {
  goal: "◇",
  chain: "⌁",
  sprout: "♧",
  tool: "⚒",
  record: "▧",
  cup: "◴",
  lamp: "◉",
  path: "⌇",
  growth: "↗",
  setup: "✣",
  note: "□",
  moon: "◐",
  book: "▣",
  pen: "✎",
  wrench: "⚙",
};

const pathTone = {
  "つながらず": "bg-[#b9b9ad]",
  最低条件: "bg-[#9cbf8e]",
  通常: "bg-[#c9a15a]",
  伸ばす: "bg-[#d9826b]",
};

const tagTone = {
  修正: "bg-[#dcae58] text-white",
  困難: "bg-[#c9846c] text-white",
};

function StatusBar() {
  return (
    <div className="flex h-6 items-center justify-between px-4 pt-2 text-[10px] font-medium text-[#2f3432]">
      <span>9:41</span>
      <span className="flex items-center gap-1 text-[9px]">▮▮▮ ◒ ▰</span>
    </div>
  );
}

function PhoneShell({ screen, children }) {
  return (
    <article className="app-phone relative h-[640px] w-[320px] overflow-hidden rounded-[24px] border border-[#b9ad98] bg-[#fffdf7] shadow-[0_12px_30px_rgba(47,52,50,.12)]">
      <StatusBar />
      <header className="flex h-12 items-center justify-between px-3">
        <button className="grid h-8 w-8 place-items-center rounded-full text-[#2f3432]" aria-label="戻る">
          <ArrowLeft size={18} strokeWidth={1.8} />
        </button>
        <div className="min-w-0 text-center">
          <h3 className="truncate text-[15px] font-semibold tracking-[0] text-[#2f3432]">{screen.appTitle}</h3>
          {screen.subtitle ? <p className="text-[10px] text-[#69716c]">{screen.subtitle}</p> : null}
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-full text-[#2f3432]" aria-label="その他">
          <MoreHorizontal size={18} strokeWidth={1.8} />
        </button>
      </header>
      <div className="h-[558px] overflow-hidden px-4 pb-4">{children}</div>
    </article>
  );
}

function BoardBadge({ screen }) {
  return (
    <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded-[8px] bg-[#327c75] px-3 py-1 text-[15px] font-bold text-white shadow-sm">
      {screen.number}. {screen.title}
    </div>
  );
}

function ActionList({ blocks }) {
  return (
    <div className="space-y-2">
      {blocks.map((block) => (
        <div key={`${block.title}-${block.body}`} className="reveal-item interactive-card flex min-h-[48px] items-center gap-3 rounded-[8px] border border-[#d8d0c1] bg-[#fffdf7]/85 px-3 py-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[7px] border border-[#d8d0c1] bg-[#f4f1ea] text-[14px] text-[#327c75]">
            {iconMap[block.icon] || "•"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-[#2f3432]">{block.title}</p>
            <p className="truncate text-[11px] text-[#2f3432]">{block.body}</p>
          </div>
          <ChevronRight size={15} className="shrink-0 text-[#69716c]" />
        </div>
      ))}
    </div>
  );
}

function Cta({ children, blue = false }) {
  return (
    <button className={`primary-action mt-3 h-10 w-full rounded-[8px] text-[13px] font-bold text-white shadow-sm ${blue ? "bg-[#4c91a3]" : "bg-[#258274]"}`}>
      {children}
    </button>
  );
}

function GoalDetail({ screen }) {
  return (
    <>
      <img className="h-[190px] w-full object-contain" src={screen.hero} alt={screen.heroAlt} />
      <div className="-mt-1 grid grid-cols-3 gap-2">
        {screen.metrics.map((metric) => (
          <div key={metric.label} className="rounded-[8px] border border-[#d8d0c1] bg-[#fffdf7] py-2 text-center">
            <p className="text-[10px] text-[#69716c]">{metric.label}</p>
            <p className="text-[17px] font-bold text-[#2f3432]">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <ActionList blocks={screen.blocks} />
      </div>
      <Cta>{screen.cta}</Cta>
    </>
  );
}

function ChainEdit({ screen }) {
  return (
    <>
      <img className="h-[126px] w-full object-contain" src={screen.hero} alt={screen.heroAlt} />
      <ActionList blocks={screen.blocks} />
      <Cta>{screen.cta}</Cta>
    </>
  );
}

function History({ screen }) {
  return (
    <>
      <div className="mx-auto mb-3 flex h-8 w-[220px] rounded-full border border-[#d8d0c1] bg-[#f4f1ea] p-0.5">
        {screen.modeTabs.map((tab, index) => (
          <button key={tab} className={`flex-1 rounded-full text-[12px] font-semibold ${index === 0 ? "bg-[#258274] text-white" : "text-[#69716c]"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="mb-2 text-[12px] font-medium text-[#2f3432]">{screen.week}</div>
      <div className="mb-1 grid grid-cols-7 text-center text-[10px] text-[#69716c]">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="relative mx-auto mb-3 h-[164px] w-[236px]">
        <div className="absolute left-2 top-16 h-1 w-[54px] rotate-[-22deg] rounded-full bg-[#d8d0c1]" />
        <div className="absolute left-56 top-20 h-1 w-[50px] rotate-[-28deg] rounded-full bg-[#d8d0c1]" />
        {screen.path.map((tone, index) => (
          <span
            key={`${tone}-${index}`}
            className={`absolute h-7 w-7 rounded-[8px] border border-white/70 ${pathTone[tone]}`}
            style={{ left: `${12 + (index % 6) * 38}px`, top: `${28 + Math.sin(index * 0.9) * 28 + Math.floor(index / 6) * 58}px` }}
          />
        ))}
      </div>
      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-[#69716c]">
        {screen.legend.map((item) => <span key={item.label}>■ {item.label}</span>)}
      </div>
      <ActionList blocks={screen.notes} />
    </>
  );
}

function SharedCity({ screen }) {
  return (
    <>
      <img className="h-[190px] w-full object-contain" src={screen.hero} alt={screen.heroAlt} />
      <ActionList blocks={screen.blocks} />
      <Cta>{screen.cta}</Cta>
    </>
  );
}

function ImportEdit({ screen }) {
  return (
    <>
      <div className="mb-3 grid grid-cols-[1fr_24px_1fr] gap-2 text-center text-[11px] font-semibold text-[#2f3432]">
        <span className="rounded-full bg-[#ece5d7] py-2">元の設計</span>
        <span />
        <span className="rounded-full bg-[#258274] py-2 text-white">自分用</span>
      </div>
      <div className="space-y-2">
        {screen.compare.map((item) => (
          <div key={item.from} className="grid grid-cols-[1fr_24px_1fr] items-center gap-2">
            <p className="rounded-[8px] border border-[#d8d0c1] bg-[#fffdf7] px-2 py-2 text-[11px] text-[#2f3432]">{item.from}</p>
            <span className="text-center text-[#69716c]">→</span>
            <p className="rounded-[8px] border border-[#b9d4cc] bg-[#f7fbf8] px-2 py-2 text-[11px] text-[#2f3432]">{item.to}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between">
        {screen.heroPair.map((image, index) => (
          <img key={image} className="h-[120px] w-[132px] object-contain" src={image} alt={index === 0 ? "元の街" : "自分用の街"} />
        ))}
      </div>
      <Cta>{screen.cta}</Cta>
    </>
  );
}

function GrowthAlbum({ screen }) {
  return (
    <>
      <div className="relative space-y-3 pl-5 before:absolute before:left-2 before:top-2 before:h-[390px] before:w-px before:bg-[#327c75]">
        {screen.timeline.map((item) => (
          <div key={item.day} className="relative rounded-[8px] border border-[#d8d0c1] bg-[#fffdf7] p-3">
            <span className="absolute -left-[23px] top-4 h-3 w-3 rounded-full bg-[#327c75]" />
            <div className="flex gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-[#69716c]">{item.day}</p>
                <p className="text-[13px] font-bold text-[#2f3432]">{item.title}</p>
                <p className="mt-1 text-[11px] leading-5 text-[#2f3432]">{item.body}</p>
              </div>
              <img className="h-[76px] w-[98px] shrink-0 object-contain" src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
      <Cta>{screen.cta}</Cta>
    </>
  );
}

function ConstructionLog({ screen }) {
  return (
    <>
      <img className="absolute right-6 top-14 h-[92px] w-[130px] object-contain" src={screen.hero} alt={screen.heroAlt} />
      <div className="mb-4 mt-14 flex gap-2">
        {screen.filters.map((filter, index) => (
          <button key={filter} className={`h-7 rounded-full px-4 text-[11px] font-semibold ${index === 0 ? "bg-[#258274] text-white" : "bg-[#ece5d7] text-[#69716c]"}`}>
            {filter}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[8px] border border-[#d8d0c1]">
        {screen.logs.map((log) => (
          <div key={`${log.date}-${log.title}`} className="grid grid-cols-[42px_44px_1fr_18px] items-center border-b border-[#d8d0c1] bg-[#fffdf7] px-2 py-3 last:border-b-0">
            <span className="text-[11px] text-[#2f3432]">{log.date}</span>
            <span className={`mr-2 rounded-full px-2 py-1 text-center text-[10px] font-bold ${tagTone[log.tag]}`}>{log.tag}</span>
            <span className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#2f3432]">{log.title}</p>
              <p className="truncate text-[10px] text-[#69716c]">{log.body}</p>
            </span>
            <ChevronRight size={14} className="text-[#69716c]" />
          </div>
        ))}
      </div>
      <Cta>{screen.cta}</Cta>
    </>
  );
}

function EquipmentList({ screen }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {screen.equipment.map((item) => (
          <div key={item.title} className="h-[128px] rounded-[8px] border border-[#b8c6c9] bg-[#fbfcf8] p-2">
            <img className="mx-auto h-[58px] w-full object-contain" src={item.image} alt={item.title} />
            <p className="mt-1 text-[12px] font-bold leading-4 text-[#3c7b8c]">{item.title}</p>
            <p className="text-[10px] leading-4 text-[#69716c]">{item.body}</p>
          </div>
        ))}
      </div>
      <Cta blue>{screen.cta}</Cta>
    </>
  );
}

function Templates({ screen }) {
  return (
    <>
      <div className="mb-3 flex gap-1 overflow-hidden">
        {screen.categories.map((category, index) => (
          <button key={category} className={`h-7 shrink-0 rounded-full px-3 text-[11px] font-semibold ${index === 0 ? "bg-[#4c91a3] text-white" : "bg-[#ece5d7] text-[#69716c]"}`}>
            {category}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {screen.templates.map((template) => (
          <div key={template.title} className="flex h-[118px] gap-2 rounded-[8px] border border-[#d8d0c1] bg-[#fffdf7] p-3">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-[#2f3432]">{template.title}</p>
              <p className="mt-1 text-[11px] text-[#69716c]">{template.body}</p>
              <button className="mt-4 h-8 rounded-[7px] bg-[#4c91a3] px-4 text-[11px] font-bold text-white">型を見る</button>
            </div>
            <img className="h-[88px] w-[118px] shrink-0 object-contain" src={template.image} alt={template.title} />
          </div>
        ))}
      </div>
    </>
  );
}

function PublishSettings({ screen }) {
  return (
    <>
      <div className="relative mb-3">
        <img className="h-[150px] w-full object-contain" src={screen.hero} alt={screen.heroAlt} />
        <div className="absolute right-6 top-7 rotate-6 rounded-[8px] border border-[#b9ad98] bg-[#fffdf7] px-3 py-2 text-center text-[12px] font-bold text-[#2f3432]">
          公開範囲を<br />選べます
        </div>
      </div>
      <div className="space-y-2">
        {screen.toggles.map((toggle) => (
          <div key={toggle.title} className="flex items-center justify-between rounded-[8px] border border-[#d8d0c1] bg-[#fffdf7] px-3 py-2">
            <span>
              <p className="text-[12px] font-semibold text-[#2f3432]">{toggle.title}</p>
              <p className="text-[10px] text-[#69716c]">{toggle.body}</p>
            </span>
            <span className={`flex h-6 w-11 items-center rounded-full p-1 ${toggle.enabled ? "justify-end bg-[#258274]" : "justify-start bg-[#b9b9ad]"}`}>
              <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-[8px] border border-[#d8d0c1] bg-[#fffdf7] p-3">
        <p className="flex-1 text-[11px] leading-5 text-[#2f3432]">{screen.disclosure}</p>
        <ChevronRight size={15} className="text-[#69716c]" />
      </div>
      <Cta>{screen.cta}</Cta>
    </>
  );
}

const renderers = {
  "goal-detail": GoalDetail,
  "chain-edit": ChainEdit,
  history: History,
  "shared-city-detail": SharedCity,
  "import-edit": ImportEdit,
  "growth-album": GrowthAlbum,
  "construction-log": ConstructionLog,
  "equipment-list": EquipmentList,
  templates: Templates,
  "publish-settings": PublishSettings,
};

export function SecondaryPhone({ screen }) {
  const Content = renderers[screen.id];

  return (
    <div className="secondary-phone-wrap relative pt-0">
      <BoardBadge screen={screen} />
      <PhoneShell screen={screen}>
        <Content screen={screen} />
      </PhoneShell>
    </div>
  );
}

export function SecondaryScreensBoard({ screens = secondaryScreens }) {
  return (
    <section className="secondary-screens-board min-h-screen bg-[#f4f1ea] px-6 py-12">
      <div className="secondary-screens-grid mx-auto grid max-w-[1720px] grid-cols-1 justify-items-center gap-x-7 gap-y-14 sm:grid-cols-2 xl:grid-cols-5">
        {screens.map((screen) => (
          <SecondaryPhone key={screen.id} screen={screen} />
        ))}
      </div>
    </section>
  );
}

export default SecondaryScreensBoard;
