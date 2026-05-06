import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  CircleMinus,
  ClipboardCheck,
  Dumbbell,
  Leaf,
  Lightbulb,
  Map,
  Search,
  Sparkles,
  Sun,
  Target,
} from 'lucide-react';

const featureItems = [
  {
    title: '目標を1つに絞る',
    text: 'やることを減らし、最も大切な1つの目標に集中します。',
    icon: Target,
  },
  {
    title: '最低条件から始める',
    text: '小さく始めることで、毎日無理なく積み重ねられる仕組みを作ります。',
    icon: Sun,
  },
  {
    title: '週ごとに見直す',
    text: '1週間ごとに振り返り、改善しながら現実的にアップデートします。',
    icon: CalendarCheck,
  },
];

const processItems = [
  { step: '1', title: '目標', caption: '1つに絞る', icon: Target },
  { step: '2', title: 'やらないこと', caption: 'を決める', icon: CircleMinus },
  { step: '3', title: 'if-then', caption: 'を設定する', icon: ClipboardCheck },
  { step: '4', title: '環境設計', caption: 'を整える', icon: Leaf },
  { step: '5', title: '週次レビュー', caption: 'で振り返る', icon: Search },
  { step: '6', title: 'GO / PIVOT / KILL', caption: 'で次を決める', icon: Sparkles },
];

const routeCallouts = [
  { className: 'callout-wake', icon: Sun, text: '起きる' },
  { className: 'callout-water', icon: Lightbulb, text: '水を飲む' },
  { className: 'callout-book', icon: BookOpen, text: '英語を開く' },
  { className: 'callout-minute', icon: Dumbbell, text: '1問だけ' },
];

export default function TopLandingSection() {
  return (
    <div className="real-top-section">
      <section className="real-top-hero" aria-label="みちまち トップ">
        <div className="real-top-copy">
          <h1>目標達成の前に、まず“毎日進めるルート”を作る。</h1>
          <p>
            みちまちは、朝の時間で自分を高めたい人のための6週間ルート設計アプリです。
            目標を1つに絞り、最低条件から始め、週ごとに見直しながら、続けられる朝の行動を作ります。
          </p>

          <div className="real-top-actions" aria-label="トップページの主要アクション">
            <a className="real-top-button real-top-button-primary" href="/contact?type=waitlist">
              先行登録する
            </a>
            <a className="real-top-button real-top-button-secondary" href="#route">
              6週間の流れを見る
            </a>
          </div>

          <div className="real-top-note">
            <CheckCircle2 aria-hidden="true" size={20} />
            <span>
              <strong>最初の街を無料で作る</strong>
              <small>1つの目標から、今日の一歩を設計</small>
            </span>
          </div>
        </div>

        <div className="real-top-town" aria-label="朝のルートで育つ街のイメージ">
          <img src="/assets/michimachi/hero-town.png" alt="ルートで育つ朝の街" />

          {routeCallouts.map((callout) => {
            const Icon = callout.icon;
            return (
              <div className={`real-top-callout ${callout.className}`} key={callout.text}>
                <Icon aria-hidden="true" size={18} />
                <span>{callout.text}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="real-top-principles" aria-label="続く人の仕組み">
        <h2>続く人は、意志が強いのではなく、行動が生活に組み込まれている。</h2>
        <div className="real-top-feature-grid">
          {featureItems.map((item) => {
            const Icon = item.icon;
            return (
              <article className="real-top-feature" key={item.title}>
                <div className="real-top-feature-icon">
                  <Icon aria-hidden="true" size={34} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="real-top-process" aria-label="6週間ルートのプロセス">
        <div className="real-top-process-label">
          6週間ルートの
          <br />
          プロセス
        </div>
        <ol>
          {processItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.step}>
                <span className="real-top-step">{item.step}</span>
                <Icon aria-hidden="true" size={34} />
                <strong>{item.title}</strong>
                <small>{item.caption}</small>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
