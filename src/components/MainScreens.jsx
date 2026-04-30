import {
  Bell,
  GripVertical,
  MoveRight,
} from "lucide-react";
import DashboardStats from "./DashboardStats";
import GrowthLogForm from "./GrowthLogForm";
import GrowthLogList from "./GrowthLogList";
import HabitList from "./HabitList";
import HabitManager from "./HabitManager";
import { useHabitGrowthApp } from "../lib/useHabitGrowthApp";
import {
  adviceScreen,
  assetPaths,
  buildScreen,
  cityScreen,
  communityScreen,
  mainTabs,
  todayScreen,
} from "../data/screens";

const toneStyles = {
  primary: "bg-[#2F7F75] text-white border-[#2F7F75]",
  minimum: "bg-[#EFF5E9] text-[#3F6F42] border-[#CADDBC]",
  normal: "bg-[#FFF4DC] text-[#9A6E20] border-[#E4C786]",
  stretch: "bg-[#FFF0EA] text-[#C35D45] border-[#E8B5A4]",
  prepare: "bg-[#EAF3F5] text-[#3D7186] border-[#C5DDE4]",
  difficulty: "bg-[#F2E7DD] text-[#915D3F] border-[#D8BCA6]",
  disconnected: "bg-[#F1F0EA] text-[#6E716B] border-[#D7D5C9]",
};

function PhoneShell({ tabId, children, activeTabId = tabId, onTabChange }) {
  const current = mainTabs.find((tab) => tab.id === tabId);

  return (
    <section className="app-phone mx-auto flex h-[640px] w-[320px] shrink-0 flex-col overflow-hidden rounded-[24px] border border-[#2F3432]/80 bg-[#FFFDF7] text-[#2F3432] shadow-[0_12px_30px_rgba(47,52,50,.12)]">
      <div className="flex h-8 items-center justify-between px-5 pt-3 text-[13px] font-semibold leading-none">
        <span>9:41</span>
        <span className="flex items-center gap-1 text-[11px]">▮▮▮ ᯤ ▰</span>
      </div>
      <header className="relative flex h-14 items-center justify-center px-5">
        <h2 className="text-[17px] font-semibold tracking-[0]">{current?.title}</h2>
        {tabId === "city" ? (
          <Bell className="absolute right-5 h-5 w-5 text-[#69716C]" strokeWidth={1.8} />
        ) : null}
      </header>
      <main className="min-h-0 flex-1 overflow-hidden px-4 pb-3">{children}</main>
      <nav className="grid h-[64px] grid-cols-5 border-t border-[#D8D0C1] bg-[#FFFDF7]/95 px-2 pb-1 pt-2">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className={`flex min-w-0 flex-col items-center gap-1 text-[11px] leading-none ${
                active ? "font-semibold text-[#2F7F75]" : "text-[#777B73]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={`h-[22px] w-[22px] ${active ? "fill-[#2F7F75]/15" : ""}`}
                strokeWidth={active ? 2.25 : 1.7}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}

function Pill({ children, tone = "minimum" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-[8px] border px-2 py-1 text-[11px] ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}

function CityScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="reveal-item rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-3 py-3 text-center shadow-[0_4px_16px_rgba(47,52,50,.05)]">
        <h3 className="text-[21px] font-semibold leading-tight">英語で話せる街</h3>
        <div className="mt-3 flex justify-center gap-2">
          {cityScreen.stats.map((stat) => (
            <Pill key={stat.label} tone={stat.tone}>
              <span>{stat.label}</span>
              <strong className="text-[12px]">{stat.value}</strong>
            </Pill>
          ))}
        </div>
      </div>
      <div className="city-float relative -mx-2 mt-2 min-h-0 flex-1">
        <img
          src={assetPaths.cityMain}
          alt=""
          className="h-full w-full object-cover object-center"
          draggable="false"
        />
      </div>
    </div>
  );
}

function TodayScreen() {
  const habitApp = useHabitGrowthApp();

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto pb-3 pr-1 pt-3">
      <p className="reveal-item text-center text-[15px] font-semibold">{todayScreen.prompt}</p>
      <DashboardStats stats={habitApp.stats} today={habitApp.today} />
      <HabitList
        habits={habitApp.habits}
        completedIds={habitApp.todayCompletedIds}
        onToggle={habitApp.actions.toggleHabit}
      />
      <GrowthLogForm todaysLog={habitApp.todaysLog} onSave={habitApp.actions.saveLog} />
    </div>
  );
}

function BuildScreen() {
  const habitApp = useHabitGrowthApp();

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto pb-3 pr-1">
      <div className="city-float -mx-2 h-[150px]">
        <img src={assetPaths.workshop} alt="" className="h-full w-full object-contain" />
      </div>
      <div className="space-y-2">
        {buildScreen.chain.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="reveal-item interactive-card grid h-[50px] grid-cols-[42px_1fr_24px] items-center rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-2 shadow-[0_3px_10px_rgba(47,52,50,.035)]">
              <span className={`flex h-9 w-9 items-center justify-center rounded-[7px] border ${toneStyles[item.tone]}`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[13px] font-semibold">{item.label}</span>
                <span className="mt-1 block truncate text-[13px]">{item.text}</span>
              </span>
              <GripVertical className="h-5 w-5 text-[#8A8D86]" strokeWidth={1.8} />
            </div>
          );
        })}
      </div>
      <button className="primary-action h-11 rounded-[7px] bg-[#2F7F75] text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(47,127,117,.2)]">
        チェーンを整える
      </button>
      <HabitManager
        habits={habitApp.habits}
        onAdd={habitApp.actions.addHabit}
        onDelete={habitApp.actions.deleteHabit}
      />
    </div>
  );
}

function CommunityScreen() {
  return (
    <div className="flex h-full flex-col pt-3">
      <p className="mb-4 text-[14px] font-semibold">{communityScreen.lead}</p>
      <div className="space-y-3">
        {communityScreen.towns.map((town) => (
          <article key={town.name} className="reveal-item interactive-card grid h-[126px] grid-cols-[124px_1fr] gap-3 rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] p-2 shadow-[0_4px_14px_rgba(47,52,50,.04)]">
            <img src={town.image} alt="" className="h-[110px] w-[124px] rounded-[7px] object-cover" />
            <div className="flex min-w-0 flex-col py-1">
              <h3 className="text-[15px] font-semibold leading-tight">{town.name}</h3>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {town.tags.map((tag, index) => (
                  <span key={tag} className={`rounded-[7px] border px-2 py-1 text-[10px] ${index === 1 ? toneStyles.prepare : toneStyles.disconnected}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <button className="mt-3 inline-flex items-center gap-2 self-start text-[12px] font-semibold text-[#2F7F75]">
                自分用に調整 <MoveRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AdviceScreen() {
  const habitApp = useHabitGrowthApp();

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto pb-3 pr-1 pt-3">
      <section>
        <h3 className="mb-3 text-[16px] font-semibold">{adviceScreen.memoTitle}</h3>
        <div className="space-y-3">
          {adviceScreen.memos.map((memo) => (
            <article key={memo.title} className="reveal-item interactive-card grid min-h-[104px] grid-cols-[88px_1fr] gap-3 rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] p-3 shadow-[0_4px_14px_rgba(47,52,50,.04)]">
              <img src={memo.image} alt="" className="h-[78px] w-[82px] object-contain" />
              <p className="pt-1 text-[12px] font-medium leading-[1.7]">
                <span className="font-semibold">{memo.title}</span>
                <br />
                <span className="font-semibold text-[#2F7F75]">{memo.highlight}</span>
                {memo.body.replace(memo.highlight, "")}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[16px] font-semibold">工事記録</h3>
          <img src={assetPaths.construction} alt="" className="h-12 w-16 object-contain" />
        </div>
        <div className="space-y-2">
          {adviceScreen.records.map((record) => {
            const Icon = record.icon;
            return (
              <article key={record.text} className="reveal-item interactive-card grid h-[58px] grid-cols-[40px_1fr_42px] items-center rounded-[8px] border border-[#D8D0C1] bg-[#FFFDF7] px-3">
                <Icon className="h-7 w-7 text-[#B77955]" strokeWidth={1.8} />
                <span className="text-[13px] font-semibold">{record.text}</span>
                <span className="text-right text-[12px] text-[#69716C]">{record.date}</span>
              </article>
            );
          })}
        </div>
      </section>
      <GrowthLogList logs={habitApp.logs} />
      <button className="primary-action h-11 rounded-[7px] bg-[#2F7F75] text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(47,127,117,.2)]">
        設計を見直す
      </button>
    </div>
  );
}

export function MainScreen({ screenId = "city", activeTabId = screenId, onTabChange }) {
  const screens = {
    city: <CityScreen />,
    today: <TodayScreen />,
    build: <BuildScreen />,
    community: <CommunityScreen />,
    advice: <AdviceScreen />,
  };

  return (
    <PhoneShell tabId={screenId} activeTabId={activeTabId} onTabChange={onTabChange}>
      {screens[screenId] ?? screens.city}
    </PhoneShell>
  );
}

export function MainScreensBoard() {
  return (
    <div className="main-screens-board flex min-h-screen gap-5 overflow-x-auto bg-[#F4F1EA] p-6">
      {mainTabs.map((tab) => (
        <MainScreen key={tab.id} screenId={tab.id} activeTabId={tab.id} />
      ))}
    </div>
  );
}

export {
  AdviceScreen,
  BuildScreen,
  CityScreen,
  CommunityScreen,
  TodayScreen,
};

export default MainScreensBoard;
