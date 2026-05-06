import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Coffee,
  Dumbbell,
  Droplet,
  Flag,
  Leaf,
  Link2,
  Pencil,
  RotateCcw,
  Search,
  Sprout,
  Sun,
} from 'lucide-react';
import { sfTowns } from '../../data/sharedFlowData.js';

const HERO_ACTIONS = [
  { Icon: Sun, label: '起きる', className: 'is-wake' },
  { Icon: Droplet, label: '水を飲む', className: 'is-water' },
  { Icon: BookOpen, label: '英語を開く', className: 'is-book' },
  { Icon: Pencil, label: '1問だけ', className: 'is-pencil' },
];

const PREVIEW_TOWNS = sfTowns.slice(0, 3);

const townMeta = {
  'town-haru-english': {
    target: '英語を習慣にする',
    icons: [Sun, Droplet, BookOpen, Pencil],
    time: '約57分',
    badge: '低負荷',
  },
  'town-mika-gym': {
    target: '週4回の運動習慣',
    icons: [Sun, Droplet, Coffee, Dumbbell],
    time: '約45分',
    badge: '運動',
  },
  'town-sota-license': {
    target: '資格試験に合格する',
    icons: [Sun, Coffee, BookOpen, Pencil],
    time: '約4時間26分',
    badge: '資格',
  },
};

const visibleRows = [
  { Icon: Link2, label: 'チェーン', text: '起きる → 水を飲む → 英語を開く → 1問だけ', tone: 'amber' },
  { Icon: Flag, label: '最低条件', text: '英語アプリを開くだけ', tone: 'green' },
  { Icon: Sprout, label: '環境準備', text: 'アプリをホーム画面1ページ目に置く', tone: 'leaf' },
  { Icon: ArrowRight, label: '困難ログ', text: '夜に寝るのが遅い日は止まりやすい', tone: 'coral' },
  { Icon: RotateCcw, label: '修正履歴', text: '夜の学習から、朝コーヒー後に変更', tone: 'coral' },
];

function LibraryTownCard({ town }) {
  const meta = townMeta[town.id] ?? {
    target: town.category,
    icons: [Sun, BookOpen, Pencil],
    time: `${town.stats.avgTime}分`,
    badge: town.category,
  };

  return (
    <article className="sf-library-card">
      <a href="#shared-detail" className="sf-library-card__image-link" aria-label={`${town.title}の詳細を見る`}>
        <img src={town.image} alt={town.title} width="360" height="220" loading="lazy" />
      </a>
      <div className="sf-library-card__body">
        <div className="sf-library-card__owner">
          <span className="sf-library-avatar" aria-hidden="true">{town.user.initial}</span>
          <strong>{town.user.name}</strong>
          <span>|</span>
          <b>{town.title}</b>
        </div>
        <p>目標：{meta.target}</p>
        <div className="sf-library-chain" aria-label={`${town.title}のチェーン`}>
          {meta.icons.map((Icon, index) => (
            <span className="sf-library-chain__step" key={`${town.id}-${index}`}>
              <Icon aria-hidden="true" />
              {index < meta.icons.length - 1 && <i aria-hidden="true">→</i>}
            </span>
          ))}
        </div>
        <div className="sf-library-card__footer">
          <span>
            <Clock3 aria-hidden="true" />
            所要時間　{meta.time}
          </span>
          <span className="sf-library-card__badge">{meta.badge}</span>
        </div>
      </div>
    </article>
  );
}

export default function SfSharedLibrary() {
  return (
    <div className="sf-library-page">
      <section className="sf-library-hero" aria-labelledby="sf-library-title">
        <div className="sf-library-hero__copy sf-reveal">
          <h1 id="sf-library-title">成功例だけでなく、<br />“直し方”まで見える。</h1>
          <p>
            他人の街では、どんなチェーンを組み、どこで止まり、
            どう修正したかまで見られます。自分に合う道づくりのヒントを持ち帰れます。
          </p>
          <a className="sf-btn-primary sf-library-hero__cta" href="#shared-popular">
            共有の街を見てみる
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="sf-library-hero__visual sf-reveal" aria-label="共有の街のルート例">
          <img src="/assets/michimachi/hero-town.png" alt="" aria-hidden="true" />
          {HERO_ACTIONS.map(({ Icon, label, className }) => (
            <span className={`sf-library-hero-pill ${className}`} key={label}>
              <Icon aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="sf-library-showcase" aria-label="共有の街ライブラリ">
        <div className="sf-library-panel sf-library-panel--cards sf-reveal">
          <div className="sf-library-panel__head">
            <div>
              <h2>みんなの街をのぞいてみる</h2>
              <p>実際の工夫や調整の過程を見て、自分の朝に活かしましょう。</p>
            </div>
            <label className="sf-library-mini-search">
              <Search aria-hidden="true" />
              <span className="sr-only">街を検索</span>
              <input type="search" placeholder="目標や習慣で検索" />
            </label>
          </div>

          <div className="sf-library-card-row">
            {PREVIEW_TOWNS.map((town) => (
              <LibraryTownCard key={town.id} town={town} />
            ))}
          </div>

          <a className="sf-library-more" href="#shared-popular">
            もっと見る
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <aside className="sf-library-panel sf-library-panel--insight sf-reveal" aria-label="haruさんの街で見えるもの">
          <h2>見えるもの <span>|</span> <strong>haru</strong> さんの街</h2>
          <div className="sf-library-insight-list">
            {visibleRows.map(({ Icon, label, text, tone }) => (
              <div className="sf-library-insight-row" key={label}>
                <span className={`sf-library-insight-icon is-${tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <strong>{label}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <a className="sf-btn-primary sf-library-reference" href="#shared-adapt">
            <CheckCircle2 aria-hidden="true" />
            この街を参考にする
          </a>
          <p className="sf-library-note">
            <Leaf aria-hidden="true" />
            比べる場所ではなく、取り入れる場所。
          </p>
        </aside>
      </section>
    </div>
  );
}
