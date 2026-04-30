import {
  ArrowRight,
  Check,
  ChevronRight,
  Crown,
  Gift,
  Leaf,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import {
  capabilityCards,
  comparisonRows,
  dashboardInsights,
  dashboardNav,
  dashboardTasks,
  faqItems,
  headerLinks,
  pricingPlans,
  proAssets,
  weeklyKpis,
} from "../data/proDetailPage.js";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FeatureValue({ value }) {
  if (value === true) {
    return (
      <span className="pro-feature-value pro-feature-value--yes" aria-label="利用できます">
        <Check className="pro-feature-value__icon" aria-hidden="true" />
        <span>○</span>
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="pro-feature-value pro-feature-value--no" aria-label="利用できません">
        -
      </span>
    );
  }

  return <span className="pro-feature-value">{value}</span>;
}

function Header() {
  return (
    <header className="pro-header">
      <a className="pro-header__brand" href="/" aria-label="みちまち トップへ">
        <span className="pro-header__brand-mark" aria-hidden="true">
          <Leaf className="pro-header__brand-icon" />
        </span>
        <span>みちまち</span>
      </a>

      <nav className="pro-header__nav" aria-label="Pro詳細ページナビゲーション">
        {headerLinks.map((link) => (
          <a className="pro-header__link" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="pro-header__login" href="#pro-pricing">
        ログイン
      </a>
    </header>
  );
}

function DashboardPanel() {
  return (
    <section className="pro-dashboard-panel" aria-label="Pro分析ダッシュボード">
      <aside className="pro-dashboard-panel__rail" aria-label="アプリ内ナビゲーション">
        {dashboardNav.map((item) => {
          const Icon = item.icon;
          return (
            <span
              className={cx("pro-dashboard-panel__rail-item", item.active && "is-active")}
              aria-current={item.active ? "page" : undefined}
              key={item.label}
            >
              <Icon className="pro-dashboard-panel__rail-icon" aria-hidden="true" />
              <span>{item.label}</span>
            </span>
          );
        })}
      </aside>

      <div className="pro-dashboard-panel__main">
        <div className="pro-dashboard-panel__heading">
          <h2>あなたの次のスプリント</h2>
          <span className="pro-dashboard-panel__pill">Pro機能</span>
        </div>

        <div className="pro-dashboard-panel__grid">
          <div className="pro-dashboard-panel__insights">
            {dashboardInsights.map((insight) => {
              const Icon = insight.icon;
              return (
                <article className="pro-insight-card" data-tone={insight.tone} key={insight.title}>
                  <span className="pro-insight-card__icon-wrap" aria-hidden="true">
                    <Icon className="pro-insight-card__icon" />
                  </span>
                  <div className="pro-insight-card__copy">
                    <h3>{insight.title}</h3>
                    <p>{insight.text}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="pro-dashboard-panel__summary" aria-label="今週のKPIと目標">
            <article className="pro-kpi-card">
              <span className="pro-kpi-card__label">North Star KPI</span>
              <strong>週5日、朝に英語へ触れる</strong>
              <ol className="pro-kpi-card__bars" aria-label="曜日別の進捗">
                {weeklyKpis.map((kpi) => (
                  <li className={cx("pro-kpi-card__bar", kpi.active && "is-active")} key={kpi.day}>
                    <span className="pro-kpi-card__bar-fill" aria-hidden="true" />
                    <span>{kpi.day}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="pro-task-card">
              <h3>OBL：英検2級に向けた6週間</h3>
              <ul className="pro-task-card__list">
                {dashboardTasks.map((task) => {
                  const Icon = task.icon ?? Check;
                  return (
                    <li className="pro-task-card__item" key={task.label}>
                      <Icon className="pro-task-card__icon" aria-hidden="true" />
                      <span>{task.label}</span>
                      <small>{task.detail}</small>
                    </li>
                  );
                })}
              </ul>
            </article>
          </aside>
        </div>

        <div className="pro-next-card">
          <div>
            <span className="pro-next-card__icon" aria-hidden="true">
              <Sparkles />
            </span>
            <strong>次の6週間を一緒に決める</strong>
            <p>記録をもとに、次に進む道を一緒に決めます。</p>
          </div>
          <a className="pro-next-card__button" href="#pro-pricing">
            次の6週間を表示
          </a>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="pro-hero" id="pro-detail-top" aria-labelledby="pro-hero-title">
      <div className="pro-hero__copy">
        <h1 id="pro-hero-title">Proで、街を何度でも育て直す。</h1>
        <p>複数の目標、無制限ルート、詳細な週次AIレビューで、次の6週間を迷わず決められます。</p>

        <div className="pro-hero__actions">
          <a className="pro-hero__primary" href="#pro-pricing">
            先行登録する
            <ArrowRight className="pro-hero__primary-icon" aria-hidden="true" />
          </a>
          <p className="pro-hero__note">
            <Gift className="pro-hero__note-icon" aria-hidden="true" />
            リリース前登録なら、ずっと¥6,800 / 年
          </p>
        </div>

      </div>

      <DashboardPanel />

    </section>
  );
}

function Capabilities() {
  return (
    <section className="pro-section pro-section--capabilities" id="pro-capabilities" aria-labelledby="pro-capabilities-title">
      <div className="pro-section__heading">
        <h2 id="pro-capabilities-title">Proでできること</h2>
      </div>

      <div className="pro-capability-grid">
        {capabilityCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="pro-capability-card" key={card.title}>
              <span className="pro-capability-card__badge">{card.badge}</span>
              <div className="pro-capability-card__heading">
                <span className="pro-capability-card__icon-wrap" aria-hidden="true">
                  <Icon className="pro-capability-card__icon" />
                </span>
                <h3>{card.title}</h3>
              </div>
              <p>{card.text}</p>
              <img className="pro-capability-card__image" src={card.image} alt={card.imageAlt} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="pro-section pro-section--compare" id="pro-compare" aria-labelledby="pro-compare-title">
      <div className="pro-section__heading">
        <h2 id="pro-compare-title">無料版とProの違い</h2>
      </div>

      <div className="pro-compare-table" role="table" aria-label="無料版とProの機能比較">
        <div className="pro-compare-table__header" role="row">
          <span role="columnheader">機能</span>
          <span role="columnheader">無料</span>
          <span className="pro-compare-table__pro-heading" role="columnheader">
            <Crown className="pro-compare-table__crown" aria-hidden="true" />
            Pro
          </span>
        </div>

        {comparisonRows.map((row) => {
          const Icon = row.icon;
          return (
            <div className="pro-compare-table__row" role="row" key={row.label}>
              <span className="pro-compare-table__feature" role="cell">
                <Icon className="pro-compare-table__feature-icon" aria-hidden="true" />
                {row.label}
              </span>
              <span role="cell">
                <FeatureValue value={row.free} />
              </span>
              <span role="cell">
                <FeatureValue value={row.pro} />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="pro-section pro-section--pricing" id="pro-pricing" aria-labelledby="pro-pricing-title">
      <div className="pro-section__heading">
        <h2 id="pro-pricing-title">料金</h2>
      </div>

      <div className="pro-pricing-grid">
        {pricingPlans.map((plan) => (
          <article className={cx("pro-pricing-card", plan.featured && "is-featured")} key={plan.title}>
            {plan.label ? <span className="pro-pricing-card__label">{plan.label}</span> : null}
            <div className="pro-pricing-card__copy">
              <h3>{plan.title}</h3>
              <p className="pro-pricing-card__price">
                <span>¥</span>
                <strong>{plan.price}</strong>
                <span>{plan.unit}</span>
              </p>
            </div>

            <img className="pro-pricing-card__image" src={plan.image} alt={plan.imageAlt} />

            <ul className="pro-pricing-card__features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check className="pro-pricing-card__check" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.cta ? (
              <a className="pro-pricing-card__cta" href="#pro-faq">
                {plan.cta}
                <ChevronRight className="pro-pricing-card__cta-icon" aria-hidden="true" />
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <p className="pro-pricing-note">
        <Gift className="pro-pricing-note__icon" aria-hidden="true" />
        先行登録は無料です。登録した情報は課金に使われません。
      </p>
    </section>
  );
}

function Faq() {
  return (
    <section className="pro-section pro-section--faq" id="pro-faq" aria-labelledby="pro-faq-title">
      <div className="pro-section__heading">
        <h2 id="pro-faq-title">よくある質問</h2>
      </div>

      <div className="pro-faq-grid">
        {faqItems.map((item) => {
          const Icon = item.icon;
          return (
            <article className="pro-faq-card" key={item.question}>
              <Icon className="pro-faq-card__icon" aria-hidden="true" />
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          );
        })}
      </div>

      <div className="pro-footer-town" aria-hidden="true">
        <img src={proAssets.workshop} alt="" className="pro-footer-town__workshop" />
        <img src={proAssets.townStrip} alt="" className="pro-footer-town__main" />
        <img src={proAssets.station} alt="" className="pro-footer-town__station" />
      </div>
    </section>
  );
}

export default function ProDetailPage() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
        });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="pro-detail-page">
      <Header />
      <main className="pro-detail__main" aria-label="みちまち Pro 詳細ページ">
        <Hero />
        <Capabilities />
        <Compare />
        <Pricing />
        <Faq />
      </main>
    </div>
  );
}
