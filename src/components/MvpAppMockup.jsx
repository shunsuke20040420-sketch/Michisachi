import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Circle,
  CheckCircle2,
  Flame,
  GlassWater,
  Home,
  Lightbulb,
  Map,
  Menu,
  Pencil,
  Route,
  Signal,
  Sprout,
  SquarePen,
  Sun,
  Wifi,
} from "lucide-react";

const ASSET_BASE = "/assets/mvp";

const setupFields = [
  { label: "目標", value: "英語を話せるようになりたい" },
  { label: "最低条件", value: "1分だけ英語を開く" },
  { label: "朝の時間", value: "7:30" },
];

const routeSteps = [
  { label: "起きる", icon: Sun, status: "complete" },
  { label: "水を飲む", icon: GlassWater, status: "complete" },
  { label: "英語を開く", icon: BookOpen, status: "current" },
  { label: "記録する", icon: Pencil, status: "todo" },
];

const growthStats = [
  { label: "連続", value: "3日", icon: Flame },
  { label: "灯り", value: "3つ", icon: Lightbulb },
  { label: "設備", value: "1つ", icon: Sprout },
];

const navItems = [
  { id: "home", label: "ホーム", icon: Home },
  { id: "route", label: "今日のルート", icon: Route },
  { id: "growth", label: "街の成長", icon: Sprout },
  { id: "record", label: "記録", icon: SquarePen },
  { id: "menu", label: "メニュー", icon: Menu },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StatusBar() {
  return (
    <div className="mvp-status-bar" aria-label="9:41">
      <span className="mvp-status-bar__time">9:41</span>
      <span className="mvp-status-bar__icons" aria-hidden="true">
        <Signal className="mvp-status-bar__icon" />
        <Wifi className="mvp-status-bar__icon" />
        <span className="mvp-status-bar__battery" />
      </span>
    </div>
  );
}

function PhoneShell({ children, label, activeNav }) {
  return (
    <article className="mvp-phone" aria-label={label}>
      <div className="mvp-phone__bezel">
        <div className="mvp-phone__screen">
          <StatusBar />
          <div className="mvp-phone__body">{children}</div>
          <BottomNavigation activeId={activeNav} />
        </div>
      </div>
    </article>
  );
}

function ScreenHeader({ title, showBack = false, trailingIcon: TrailingIcon }) {
  return (
    <header className="mvp-screen-header">
      <button
        className={cx("mvp-icon-button", !showBack && "mvp-icon-button--placeholder")}
        type="button"
        aria-label={showBack ? "戻る" : undefined}
        aria-hidden={showBack ? undefined : "true"}
        tabIndex={showBack ? 0 : -1}
      >
        {showBack ? <ArrowLeft className="mvp-icon-button__icon" /> : null}
      </button>
      <h2 className="mvp-screen-header__title">{title}</h2>
      <button className="mvp-icon-button" type="button" aria-label="通知">
        {TrailingIcon ? <TrailingIcon className="mvp-icon-button__icon" /> : <Bell className="mvp-icon-button__icon" />}
      </button>
    </header>
  );
}

function BottomNavigation({ activeId }) {
  return (
    <nav className="mvp-bottom-nav" aria-label="MVP画面ナビゲーション">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.id === activeId;

        return (
          <button
            className={cx("mvp-bottom-nav__item", active && "mvp-bottom-nav__item--active")}
            type="button"
            key={item.id}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="mvp-bottom-nav__icon" aria-hidden="true" />
            <span className="mvp-bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function CreateTownScreen() {
  return (
    <PhoneShell label="最初の街を作る" activeNav="home">
      <ScreenHeader title="最初の街を作る" showBack />

      <section className="mvp-form-card" aria-label="最初の街の条件">
        {setupFields.map((field) => (
          <div className="mvp-form-card__row" key={field.label}>
            <span className="mvp-form-card__label">{field.label}</span>
            <span className="mvp-form-card__value">{field.value}</span>
          </div>
        ))}
      </section>

      <section className="mvp-town-preview mvp-town-preview--first" aria-label="街のプレビュー">
        <img
          className="mvp-town-preview__image"
          src={`${ASSET_BASE}/first-town-island.png`}
          alt="最初の街の小さな島"
        />
      </section>

      <button className="mvp-primary-button" type="button">
        最初の街を作る
      </button>
    </PhoneShell>
  );
}

function TodayRouteScreen() {
  return (
    <PhoneShell label="今日のルート" activeNav="route">
      <ScreenHeader title="今日のルート" trailingIcon={Map} />

      <section className="mvp-goal-card" aria-label="今日の目標">
        <div className="mvp-goal-card__copy">
          <span className="mvp-goal-card__eyebrow">目標</span>
          <p className="mvp-goal-card__title">英語を話せるようになりたい</p>
        </div>
        <img
          className="mvp-goal-card__image"
          src={`${ASSET_BASE}/goal-house-mini.png`}
          alt="目標の家"
        />
      </section>

      <ol className="mvp-route-steps" aria-label="今日のルートステップ">
        {routeSteps.map((step, index) => {
          const StepIcon = step.icon;
          const complete = step.status === "complete";
          const current = step.status === "current";

          return (
            <li
              className={cx(
                "mvp-route-steps__item",
                complete && "is-complete",
                current && "is-current",
                step.status === "todo" && "is-todo",
              )}
              key={step.label}
            >
              <span className="mvp-route-steps__icon-wrap" aria-hidden="true">
                <StepIcon className="mvp-route-steps__icon" />
              </span>
              <span className="mvp-route-steps__label">{step.label}</span>
              <span className="mvp-route-steps__state" aria-label={complete ? "完了" : current ? "現在地点" : "未完了"}>
                {complete ? (
                  <CheckCircle2 className="mvp-route-steps__state-icon" aria-hidden="true" />
                ) : current ? (
                  <span className="mvp-route-steps__current-dot" aria-hidden="true" />
                ) : (
                  <Circle className="mvp-route-steps__state-icon" aria-hidden="true" />
                )}
              </span>
              {index < routeSteps.length - 1 ? (
                <span className="mvp-route-steps__line" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>

      <section className="mvp-minimum-card" aria-label="最低条件">
        <CheckCircle2 className="mvp-minimum-card__icon" aria-hidden="true" />
        <p className="mvp-minimum-card__text">最低条件：1分だけ英語を開く</p>
      </section>

      <button className="mvp-primary-button" type="button">
        今日の一歩を記録
      </button>
    </PhoneShell>
  );
}

function GrowthTownScreen() {
  return (
    <PhoneShell label="街の成長" activeNav="growth">
      <ScreenHeader title="街の成長" trailingIcon={Sprout} />

      <section className="mvp-town-preview mvp-town-preview--growth" aria-label="成長した街のプレビュー">
        <img
          className="mvp-town-preview__image"
          src={`${ASSET_BASE}/growth-town-island.png`}
          alt="成長した街の島"
        />
      </section>

      <section className="mvp-stats-grid" aria-label="街の成長ステータス">
        {growthStats.map((stat) => {
          const StatIcon = stat.icon;

          return (
            <div className="mvp-stat-card" key={stat.label}>
              <StatIcon className="mvp-stat-card__icon" aria-hidden="true" />
              <span className="mvp-stat-card__label">{stat.label}</span>
              <strong className="mvp-stat-card__value">{stat.value}</strong>
            </div>
          );
        })}
      </section>

      <section className="mvp-log-card" aria-label="今日のログ">
        <div className="mvp-log-card__copy">
          <p className="mvp-log-card__text">今日の一歩が道になりました</p>
          <time className="mvp-log-card__time" dateTime="07:32">
            7:32
          </time>
        </div>
        <img
          className="mvp-log-card__thumbnail"
          src={`${ASSET_BASE}/first-town-island.png`}
          alt="今日の一歩で育った小さな街"
        />
      </section>
    </PhoneShell>
  );
}

export default function MvpAppMockup() {
  return (
    <main className="mvp-page-shell" aria-label="みちまちMVP">
      <div className="mvp-page-actions">
        <a className="mvp-waitlist-link" href="/#pricing">
          先行登録する
          <ArrowRight className="mvp-waitlist-link__icon" aria-hidden="true" />
        </a>
      </div>

      <div className="mvp-app-mockup" aria-label="みちまちMVPアプリ画面">
        <CreateTownScreen />
        <TodayRouteScreen />
        <GrowthTownScreen />
      </div>
    </main>
  );
}
