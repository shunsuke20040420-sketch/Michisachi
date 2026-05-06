import { ArrowRight, Clock3, LampDesk, Map, Sparkles, Target } from 'lucide-react';
import { useEffect, useLayoutEffect, useState } from 'react';
import LegalPage from './components/LegalPage.jsx';
import MvpAppMockup from './components/MvpAppMockup.jsx';
import ProDetailPage from './components/ProDetailPage.jsx';
import PublicationFormPage from './components/PublicationFormPage.jsx';
import SharedFlowPage from './components/SharedFlowPage.jsx';
import './styles/pro-detail.css';
import './styles/shared-flow.css';

const navItems = [
  { key: 'top', label: 'トップ' },
  { key: 'usage', label: '使い方' },
  { key: 'route', label: '６週間ルート' },
  { key: 'growth', label: '街の成長' },
  { key: 'share', label: '共有の街' },
  { key: 'pro', label: 'Pro' },
  { key: 'pricing', label: '料金' },
];

const sections = [
  {
    key: 'top',
    title: 'みちまち | トップ',
    image: '/mockups/mockup-01-top-free-city.png',
    imageWidth: 1603,
    imageHeight: 981,
    fullImage: true,
    alt: 'みちまちのトップページ',
    hotspots: [
      { label: '最初の街を作る', href: '/mvp', x: 5.4, y: 38.2, width: 17.0, height: 6.0 },
      { label: '６週間ルートへ移動', href: '#route', x: 24.0, y: 38.2, width: 16.4, height: 6.0 },
    ],
  },
  {
    key: 'usage',
    title: 'みちまち | 使い方',
    image: '/mockups/mockup-07-usage-updated.png',
    imageWidth: 1606,
    imageHeight: 979,
    fullImage: true,
    alt: 'みちまちの使い方セクション',
    hotspots: [
      { label: '先行登録する', href: '/contact?type=waitlist', x: 73.0, y: 87.0, width: 17.0, height: 5.8 },
    ],
  },
  {
    key: 'route',
    title: 'みちまち | ６週間ルート',
    image: '/mockups/mockup-04-route-updated.png',
    imageWidth: 1598,
    imageHeight: 984,
    fullImage: true,
    alt: '６週間ルートセクション',
    hotspots: [
      { label: '先行登録する', href: '/contact?type=waitlist', x: 3.8, y: 36.6, width: 17.6, height: 5.8 },
    ],
  },
  {
    key: 'growth',
    title: 'みちまち | 街の成長',
    image: '/mockups/mockup-03-growth.png',
    alt: '街の成長セクション',
    hotspots: [
      { label: '街を作ってみる', href: '/mvp', x: 6.5, y: 46.2, width: 20.5, height: 5.5 },
    ],
  },
  {
    key: 'share',
    title: 'みちまち | 共有の街',
    image: '/mockups/mockup-05-share.png',
    alt: '共有の街セクション',
    hotspots: [
      { label: '共有の街を見る', href: '#shared-library', x: 5.5, y: 35.8, width: 16.0, height: 5.2 },
    ],
  },
  {
    key: 'pro',
    title: 'みちまち | Pro',
    image: '/mockups/mockup-02-pro-lp-destination.png',
    imageWidth: 1536,
    imageHeight: 1024,
    fullImage: true,
    alt: 'Proは街を育て直すための次の6週間',
    hotspots: [
      { label: '先行登録する', href: '/contact?type=pro', x: 5.0, y: 38.5, width: 13.7, height: 5.4 },
      { label: '無料版との違いを見る', href: '/pro', x: 20.2, y: 38.9, width: 12.5, height: 4.8 },
    ],
  },
  {
    key: 'pricing',
    title: 'みちまち | 料金',
    image: '/mockups/mockup-06-pricing-city.png',
    imageWidth: 1593,
    imageHeight: 987,
    fullImage: true,
    alt: '料金と先行登録セクション',
    hotspots: [
      { label: '無料プランで街を作る', href: '/mvp', x: 15.1, y: 58.6, width: 26.9, height: 5.4 },
      { label: 'Proプランを確認する', href: '/pro', x: 51.0, y: 59.2, width: 32.6, height: 4.9 },
      { label: '先行登録する', href: '/contact?type=waitlist', x: 72.7, y: 92.6, width: 17.5, height: 5.2 },
    ],
    formFields: [
      { label: 'メールアドレス', name: 'email', type: 'email', x: 5.4, y: 78.0, width: 22.3, height: 5.4 },
    ],
  },
];

const sharedFlowPages = [
  {
    key: 'shared-library',
    title: 'みちまち | みんなの街',
    image: '/mockups/mockup-05-share-library-updated.png',
    imageWidth: 1586,
    imageHeight: 992,
    fullImage: true,
    custom: 'shared-flow',
    alt: 'みんなの街から朝の道を見つける共有ライブラリ',
    hotspots: [
      { label: '街を探す', href: '#shared-library', x: 35.0, y: 1.0, width: 8.0, height: 5.8 },
      { label: '人気の街', href: '#shared-popular', x: 45.2, y: 1.0, width: 8.4, height: 5.8 },
      { label: '保存した街', href: '#shared-saved', x: 55.7, y: 1.0, width: 9.6, height: 5.8 },
      { label: '自分の街を作る', href: '/mvp', x: 85.0, y: 1.2, width: 12.2, height: 5.2 },
      { label: 'haru さんの街', href: '#shared-profile', x: 78.0, y: 25.0, width: 12.6, height: 5.6 },
      { label: '英語の街を見る', href: '#shared-category-english', x: 49.0, y: 16.7, width: 4.0, height: 4.8 },
      { label: '最初の街の詳細を見る', href: '#shared-detail', x: 3.6, y: 29.0, width: 20.5, height: 39.5 },
      { label: 'この街を参考にする', href: '#shared-adapt', x: 67.8, y: 75.2, width: 27.0, height: 6.0 },
    ],
  },
  {
    key: 'shared-popular',
    title: 'みちまち | 人気の街',
    image: '/mockups/shared-flow/shared-town-popular.png',
    imageWidth: 1536,
    imageHeight: 1024,
    fullImage: true,
    custom: 'shared-flow',
    alt: 'みんなの街の人気一覧',
    hotspots: [
      { label: '街を探す', href: '#shared-library', x: 35.0, y: 1.0, width: 8.0, height: 5.8 },
      { label: '保存した街', href: '#shared-saved', x: 55.7, y: 1.0, width: 9.6, height: 5.8 },
      { label: '人気の街の最初のカードを見る', href: '#shared-detail', x: 3.0, y: 33.8, width: 21.5, height: 28.0 },
      { label: '自分の街を作る', href: '/mvp', x: 85.0, y: 1.2, width: 12.2, height: 5.2 },
    ],
  },
  {
    key: 'shared-saved',
    title: 'みちまち | 保存した街',
    image: '/mockups/shared-flow/shared-town-saved.png',
    imageWidth: 1536,
    imageHeight: 1024,
    fullImage: true,
    custom: 'shared-flow',
    alt: '保存した共有の街一覧',
    hotspots: [
      { label: '街を探す', href: '#shared-library', x: 35.0, y: 1.0, width: 8.0, height: 5.8 },
      { label: '人気の街', href: '#shared-popular', x: 45.2, y: 1.0, width: 8.4, height: 5.8 },
      { label: '保存した最初の街を見る', href: '#shared-detail', x: 3.0, y: 19.2, width: 29.5, height: 30.8 },
      { label: 'この街を参考にする', href: '#shared-adapt', x: 66.0, y: 60.2, width: 28.0, height: 6.0 },
      { label: '自分の街を作る', href: '/mvp', x: 85.0, y: 1.2, width: 12.2, height: 5.2 },
    ],
  },
  {
    key: 'shared-detail',
    title: 'みちまち | haru さんの街の詳細',
    image: '/mockups/shared-flow/shared-town-detail.png',
    imageWidth: 1536,
    imageHeight: 1024,
    fullImage: true,
    custom: 'shared-flow',
    alt: 'haru さんの英語の街の詳細',
    hotspots: [
      { label: '街を探す', href: '#shared-library', x: 35.0, y: 1.0, width: 8.0, height: 5.8 },
      { label: '人気の街', href: '#shared-popular', x: 45.2, y: 1.0, width: 8.4, height: 5.8 },
      { label: '保存した街', href: '#shared-saved', x: 55.7, y: 1.0, width: 9.6, height: 5.8 },
      { label: 'この街を参考にする', href: '#shared-adapt', x: 66.2, y: 51.2, width: 30.0, height: 5.8 },
      { label: '保存した街へ追加', href: '#shared-saved', x: 66.2, y: 58.4, width: 30.0, height: 5.4 },
      { label: 'haru さんのプロフィールを見る', href: '#shared-profile', x: 3.0, y: 10.0, width: 36.0, height: 8.0 },
      { label: '自分の街を作る', href: '/mvp', x: 85.0, y: 1.2, width: 12.2, height: 5.2 },
    ],
  },
  {
    key: 'shared-adapt',
    title: 'みちまち | この街を参考にする',
    image: '/mockups/shared-flow/shared-town-adapt.png',
    imageWidth: 1600,
    imageHeight: 983,
    fullImage: true,
    custom: 'shared-flow',
    alt: '共有の街を自分の街に取り入れる画面',
    hotspots: [
      { label: 'この内容で取り入れる', href: '#shared-imported', x: 28.5, y: 89.0, width: 31.0, height: 7.2 },
      { label: '街の詳細に戻る', href: '#shared-detail', x: 62.0, y: 90.0, width: 14.0, height: 5.4 },
      { label: '自分の街を見る', href: '/mvp', x: 86.0, y: 1.2, width: 12.0, height: 5.2 },
    ],
  },
  {
    key: 'shared-imported',
    title: 'みちまち | 取り入れ確認',
    image: '/mockups/shared-flow/shared-town-imported.png',
    imageWidth: 1536,
    imageHeight: 1024,
    fullImage: true,
    custom: 'shared-flow',
    alt: '共有の街を取り入れた確認画面',
    hotspots: [
      { label: '自分の街を作る', href: '/mvp', x: 85.0, y: 1.2, width: 12.2, height: 5.2 },
      { label: '今日の達成を記録する', href: '/mvp', x: 24.0, y: 87.4, width: 27.5, height: 7.2 },
      { label: '自分の街を見る', href: '/mvp', x: 52.8, y: 87.4, width: 22.2, height: 7.2 },
    ],
  },
  {
    key: 'shared-profile',
    title: 'みちまち | haru さんの街',
    image: '/mockups/shared-flow/shared-town-profile.png',
    imageWidth: 1536,
    imageHeight: 1024,
    fullImage: true,
    custom: 'shared-flow',
    alt: 'haru さんの共有プロフィールと街一覧',
    hotspots: [
      { label: '街を探す', href: '#shared-library', x: 35.0, y: 1.0, width: 8.0, height: 5.8 },
      { label: '人気の街', href: '#shared-popular', x: 45.2, y: 1.0, width: 8.4, height: 5.8 },
      { label: '保存した街', href: '#shared-saved', x: 55.7, y: 1.0, width: 9.6, height: 5.8 },
      { label: 'haru さんの注目の街を見る', href: '#shared-detail', x: 30.0, y: 9.0, width: 67.0, height: 32.0 },
      { label: 'すべての街を見る', href: '#shared-library', x: 3.0, y: 74.2, width: 59.0, height: 4.2 },
      { label: '自分の街を作る', href: '/mvp', x: 85.0, y: 1.2, width: 12.2, height: 5.2 },
    ],
  },
  {
    key: 'shared-category-english',
    title: 'みちまち | 英語の街',
    image: '/mockups/shared-flow/shared-town-category-english.png',
    imageWidth: 1536,
    imageHeight: 1024,
    fullImage: true,
    custom: 'shared-flow',
    alt: '英語カテゴリの共有の街一覧',
    hotspots: [
      { label: '街を探す', href: '#shared-library', x: 35.0, y: 1.0, width: 8.0, height: 5.8 },
      { label: '人気の街', href: '#shared-popular', x: 45.2, y: 1.0, width: 8.4, height: 5.8 },
      { label: '保存した街', href: '#shared-saved', x: 55.7, y: 1.0, width: 9.6, height: 5.8 },
      { label: '英語カテゴリの最初の街を見る', href: '#shared-detail', x: 3.0, y: 54.0, width: 15.0, height: 30.0 },
      { label: 'この街を参考にする', href: '#shared-adapt', x: 59.7, y: 90.0, width: 20.4, height: 5.8 },
    ],
  },
];

const CREATE_TOWN_STORAGE_KEY = 'michimachi:create-town';

const pageMeta = {
  '/': {
    title: 'みちまち | 6週間で毎日進めるルートを作る',
    description:
      'みちまちは、目標達成の前にまず“毎日進めるルート”を作る、6週間の習慣設計プロトタイプです。',
  },
  '/mvp': {
    title: 'みちまち MVP | 最初の街を作る',
    description: '目標を1つに絞り、朝の時間に毎日進める最初のルートを作るMVP体験です。',
  },
  '/pro': {
    title: 'みちまち Pro | 次の6週間を決める',
    description: '複数の目標、無制限ルート、週次レビューで次の6週間を決めるProプランの案内です。',
  },
  '/contact': {
    title: 'みちまち | 先行登録・フィードバック',
    description: 'みちまちの先行登録、利用テスト希望、フィードバックを送るためのフォームです。',
  },
  '/privacy': {
    title: 'みちまち | プライバシーポリシー',
    description: 'みちまちの公開前プロトタイプで扱う情報と利用目的をまとめています。',
  },
  '/terms': {
    title: 'みちまち | 利用規約',
    description: 'みちまちの公開前プロトタイプを利用するときの基本的な条件です。',
  },
};

function getPageMeta(pathname) {
  return pageMeta[pathname] ?? pageMeta['/'];
}

const initialTownForm = {
  goal: '',
  minimumAction: '',
  morningTime: '07:30',
};

function readCreatedTown() {
  if (typeof window === 'undefined') return null;

  try {
    const rawTown = window.localStorage.getItem(CREATE_TOWN_STORAGE_KEY);
    return rawTown ? JSON.parse(rawTown) : null;
  } catch {
    return null;
  }
}

function writeCreatedTown(town) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CREATE_TOWN_STORAGE_KEY, JSON.stringify(town));
}

function Hotspot({ label, href, x, y, width, height }) {
  return (
    <a
      aria-label={label}
      className="hotspot pixel-hotspot"
      href={href}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    />
  );
}

function TransparentField({ field }) {
  return (
    <input
      aria-label={field.label}
      autoComplete={field.type === 'email' ? 'email' : 'off'}
      className="hotspot pixel-hotspot transparent-field appearance-none p-0"
      id={field.name}
      name={field.name}
      placeholder={field.type === 'email' ? 'you@example.com' : undefined}
      style={{
        left: `${field.x}%`,
        top: `${field.y}%`,
        width: `${field.width}%`,
        height: `${field.height}%`,
      }}
      type={field.type}
    />
  );
}

function handleEmbeddedSignupSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = String(data.get('email') ?? '').trim();
  const params = new URLSearchParams({ type: 'waitlist' });
  if (email) params.set('email', email);
  window.location.href = `/contact?${params.toString()}`;
}

function PixelArtboard({ section }) {
  return (
    <div
      className={`scroll-artboard${section.fullImage ? ' is-full-image' : ''}`}
      style={
        section.fullImage
          ? { '--section-ratio': `${section.imageWidth} / ${section.imageHeight}` }
          : undefined
      }
    >
      <div className="scroll-artboard-inner">
        <img
          alt={section.alt}
          className="pixel-image"
          decoding="async"
          draggable="false"
          fetchPriority={section.key === 'top' ? 'high' : 'auto'}
          height={section.imageHeight ?? 1024}
          loading={section.key === 'top' ? 'eager' : 'lazy'}
          src={section.image}
          width={section.imageWidth ?? 1536}
        />

        {(section.hotspots ?? []).map((hotspot) => (
          <Hotspot key={`${section.key}-${hotspot.label}`} {...hotspot} />
        ))}

        {section.formFields ? (
          <form aria-label="先行登録フォーム" onSubmit={handleEmbeddedSignupSubmit}>
            {section.formFields.map((field) => (
              <TransparentField field={field} key={field.name} />
            ))}
            <button className="sr-only" type="submit">
              先行登録フォームへ進む
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

function getCurrentHashKey() {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#\/?/, '');
}

function normalizeLegacyHash() {
  const rawHash = window.location.hash;
  if (!rawHash.startsWith('#/')) return null;

  const key = rawHash.slice(2);
  if (!isSectionKey(key) && !isSharedFlowKey(key)) return null;

  window.history.replaceState(null, '', `#${key}`);
  return key;
}

function isSectionKey(key) {
  return sections.some((section) => section.key === key);
}

function isSharedFlowKey(key) {
  return sharedFlowPages.some((page) => page.key === key);
}

function getSharedFlowPage(key) {
  return sharedFlowPages.find((page) => page.key === key) ?? null;
}

function getHashSectionKey() {
  const key = getCurrentHashKey();
  return isSectionKey(key) ? key : null;
}

function getHashSharedFlowKey() {
  const key = getCurrentHashKey();
  return isSharedFlowKey(key) ? key : null;
}

function normalizeRemovedHash() {
  const key = getCurrentHashKey();
  if (key !== 'create-town') return null;

  window.history.replaceState(null, '', '#pricing');
  return 'pricing';
}

function scrollToSection(key, behavior = 'smooth') {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.getElementById(key)?.scrollIntoView({ behavior, block: 'start' });
    });
  });
}

function scrollToSectionNow(key) {
  document.getElementById(key)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function CreateTownPage() {
  const [createdTown, setCreatedTown] = useState(readCreatedTown);
  const [form, setForm] = useState(() => {
    const savedTown = readCreatedTown();
    return savedTown
      ? {
          goal: savedTown.goal,
          minimumAction: savedTown.minimumAction,
          morningTime: savedTown.morningTime,
        }
      : initialTownForm;
  });
  const [errors, setErrors] = useState({});

  const previewTown = createdTown ?? form;
  const previewGoal = previewTown.goal?.trim() || '英語を話せるようになりたい';
  const previewMinimum = previewTown.minimumAction?.trim() || '1分だけ英語を開く';
  const previewTime = previewTown.morningTime || '7:30';

  function updateField(fieldName, value) {
    setForm((currentForm) => ({ ...currentForm, [fieldName]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [fieldName]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    const goal = form.goal.trim();
    const minimumAction = form.minimumAction.trim();
    const morningTime = form.morningTime || '07:30';

    if (!goal) nextErrors.goal = '目標を1つ入力してください。';
    if (!minimumAction) nextErrors.minimumAction = '最低条件を入力してください。';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const nextTown = {
      goal,
      minimumAction,
      morningTime,
      createdAt: new Date().toISOString(),
    };

    writeCreatedTown(nextTown);
    setCreatedTown(nextTown);
  }

  return (
    <div className="create-town-page">
      <div className="create-town-copy">
        <p className="create-town-kicker">みちまち MVP</p>
        <h1>最初の街を作る</h1>
        <p className="create-town-lead">
          目標を1つに絞り、今日も道を切らさない最低条件を決めます。
        </p>

        <form className="create-town-form" onSubmit={handleSubmit} noValidate>
          <label className="create-town-field">
            <span>
              <Target aria-hidden="true" size={18} />
              目標
            </span>
            <input
              aria-describedby={errors.goal ? 'goal-error' : undefined}
              aria-invalid={Boolean(errors.goal)}
              onChange={(event) => updateField('goal', event.target.value)}
              placeholder="英語を話せるようになりたい"
              type="text"
              value={form.goal}
            />
            {errors.goal ? <strong id="goal-error">{errors.goal}</strong> : null}
          </label>

          <label className="create-town-field">
            <span>
              <LampDesk aria-hidden="true" size={18} />
              最低条件
            </span>
            <input
              aria-describedby={errors.minimumAction ? 'minimum-action-error' : undefined}
              aria-invalid={Boolean(errors.minimumAction)}
              onChange={(event) => updateField('minimumAction', event.target.value)}
              placeholder="1分だけ英語を開く"
              type="text"
              value={form.minimumAction}
            />
            {errors.minimumAction ? (
              <strong id="minimum-action-error">{errors.minimumAction}</strong>
            ) : null}
          </label>

          <label className="create-town-field">
            <span>
              <Clock3 aria-hidden="true" size={18} />
              朝の時間
            </span>
            <input
              onChange={(event) => updateField('morningTime', event.target.value)}
              type="time"
              value={form.morningTime}
            />
          </label>

          <button className="create-town-submit" type="submit">
            最初の街を作る
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </form>
      </div>

      <aside className="first-town-panel" aria-label="最初の街プレビュー">
        <div className="first-town-art">
          <img
            alt=""
            aria-hidden="true"
            className="first-town-bg"
            src="/assets/michimachi/hero-town.png"
          />
          <div className="first-town-island" aria-hidden="true">
            <span className="town-house" />
            <span className="town-lamp" />
            <span className="town-route" />
            <span className="town-route-dot dot-one" />
            <span className="town-route-dot dot-two" />
          </div>
          <div className="town-sign">
            <span>目標の看板</span>
            <strong>{previewGoal}</strong>
          </div>
        </div>

        <div className="first-town-status">
          <div>
            <Sparkles aria-hidden="true" size={22} />
            <span>{createdTown ? '今日の一歩が道になりました' : '入力すると街がここから始まります'}</span>
          </div>
          <dl>
            <div>
              <dt>最低条件</dt>
              <dd>{previewMinimum}</dd>
            </div>
            <div>
              <dt>朝の時間</dt>
              <dd>{previewTime}</dd>
            </div>
          </dl>
        </div>
      </aside>

      <div className="create-town-steps" aria-label="作成後の流れ">
        <article>
          <Map aria-hidden="true" size={24} />
          <h2>小さな道ができる</h2>
          <p>目標までの最初のルートを1本だけ作ります。</p>
        </article>
        <article>
          <LampDesk aria-hidden="true" size={24} />
          <h2>灯りがつく</h2>
          <p>最低条件を達成した日が、道の灯りとして残ります。</p>
        </article>
        <article>
          <Sparkles aria-hidden="true" size={24} />
          <h2>街が育つ</h2>
          <p>続けやすくした準備や記録が、街の設備になります。</p>
        </article>
      </div>
    </div>
  );
}

export { sections };

export default function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [activeSharedFlowKey, setActiveSharedFlowKey] = useState(() =>
    typeof window === 'undefined' ? null : getHashSharedFlowKey(),
  );
  const [currentPath, setCurrentPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );
  const isStandalonePage = ['/pro', '/mvp', '/contact', '/privacy', '/terms'].includes(currentPath);
  const activeSharedFlowPage = !isStandalonePage ? getSharedFlowPage(activeSharedFlowKey) : null;
  const activeNavKey = activeSharedFlowPage ? 'share' : activeSection;

  useLayoutEffect(() => {
    const removedKey = normalizeRemovedHash();
    normalizeLegacyHash();
    const initialSharedKey = getHashSharedFlowKey();

    if (!isStandalonePage && initialSharedKey) {
      setActiveSharedFlowKey(initialSharedKey);
      setActiveSection('share');
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    setActiveSharedFlowKey(null);

    const initialKey = removedKey ?? getHashSectionKey();

    if (!isStandalonePage && initialKey) {
      setActiveSection(initialKey);
      if (removedKey) {
        scrollToSection(initialKey, 'auto');
      } else {
        scrollToSectionNow(initialKey);
      }
    }
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const meta = getPageMeta(window.location.pathname);
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', meta.description);

    const handleHashChange = () => {
      if (window.location.pathname === '/pro' || window.location.pathname === '/mvp') return;
      const removedKey = normalizeRemovedHash();
      const sharedKey = getHashSharedFlowKey();

      if (sharedKey) {
        setActiveSharedFlowKey(sharedKey);
        setActiveSection('share');
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      setActiveSharedFlowKey(null);

      const key = removedKey ?? getHashSectionKey();
      if (!key) return;
      setActiveSection(key);
      scrollToSection(key);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPath]);

  useEffect(() => {
    if (isStandalonePage || activeSharedFlowPage) return undefined;
    let frame = 0;

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      const currentSection = sections.reduce((current, section) => {
        const element = document.getElementById(section.key);
        if (!element) return current;
        return element.offsetTop <= marker ? section.key : current;
      }, 'top');

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSharedFlowPage, isStandalonePage]);

  if (currentPath === '/pro') {
    return <ProDetailPage />;
  }

  if (currentPath === '/mvp') {
    return <MvpAppMockup />;
  }

  if (currentPath === '/contact') {
    return <PublicationFormPage />;
  }

  if (currentPath === '/privacy') {
    return <LegalPage type="privacy" />;
  }

  if (currentPath === '/terms') {
    return <LegalPage type="terms" />;
  }

  if (activeSharedFlowPage) {
    return <SharedFlowPage page={activeSharedFlowPage} />;
  }

  return (
    <div className="lp-scroll-shell">
      <header className="lp-topbar">
        <a className="lp-brand" href="#top" aria-label="みちまち トップへ">
          <span className="lp-brand-mark" aria-hidden="true" />
          <span>みちまち</span>
        </a>

        <nav className="lp-anchor-nav" aria-label="セクションナビゲーション">
          {navItems.map((item) => (
            <a
              className={activeNavKey === item.key ? 'is-active' : ''}
              href={`#${item.key}`}
              key={item.key}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main aria-label="みちまち ランディングページ">
        {sections.map((section) => (
          <section
            aria-label={section.title}
            className={`scroll-section${section.custom ? ` is-${section.custom}` : ''}`}
            id={section.key}
            key={section.key}
          >
            <PixelArtboard section={section} />
          </section>
        ))}
      </main>

      <footer className="lp-publication-footer" aria-label="公開準備リンク">
        <a href="/contact?type=waitlist">先行登録・フィードバック</a>
        <a href="/privacy">プライバシーポリシー</a>
        <a href="/terms">利用規約</a>
      </footer>
    </div>
  );
}
