import { ArrowRight, Clock3, LampDesk, Map, Sparkles, Target } from 'lucide-react';
import { useEffect, useLayoutEffect, useState } from 'react';
import ProDetailPage from './components/ProDetailPage.jsx';
import './styles/pro-detail.css';

const navItems = [
  { key: 'top', label: 'トップ' },
  { key: 'usage', label: '使い方' },
  { key: 'route', label: '６週間ルート' },
  { key: 'growth', label: '街の成長' },
  { key: 'share', label: '共有の街' },
  { key: 'create-town', label: '街を作る' },
  { key: 'pro', label: 'Pro' },
  { key: 'pricing', label: '料金' },
];

const sections = [
  {
    key: 'top',
    title: 'みちまち | トップ',
    image: '/mockups/mockup-01-top-free-city.png',
    alt: 'みちまちのトップページ',
    hotspots: [
      { label: '最初の街を作る', href: '#create-town', x: 6.4, y: 43.6, width: 17.0, height: 5.4 },
      { label: '６週間ルートへ移動', href: '#route', x: 25.2, y: 43.6, width: 15.2, height: 5.4 },
    ],
  },
  {
    key: 'usage',
    title: 'みちまち | 使い方',
    image: '/mockups/mockup-07-usage.png',
    alt: 'みちまちの使い方セクション',
    hotspots: [
      { label: '先行登録する', href: '#pricing', x: 73.0, y: 87.0, width: 17.0, height: 5.8 },
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
      { label: '先行登録する', href: '#pricing', x: 3.8, y: 36.6, width: 17.6, height: 5.8 },
    ],
  },
  {
    key: 'growth',
    title: 'みちまち | 街の成長',
    image: '/mockups/mockup-03-growth.png',
    alt: '街の成長セクション',
    hotspots: [
      { label: '共有の街へ移動', href: '#share', x: 6.5, y: 46.2, width: 20.5, height: 5.5 },
    ],
  },
  {
    key: 'share',
    title: 'みちまち | 共有の街',
    image: '/mockups/mockup-05-share.png',
    alt: '共有の街セクション',
    hotspots: [
      { label: '共有の街を見る', href: '#pricing', x: 5.5, y: 35.8, width: 16.0, height: 5.2 },
    ],
  },
  {
    key: 'create-town',
    title: 'みちまち | 最初の街を作る',
    custom: 'create-town',
  },
  {
    key: 'pro',
    title: 'みちまち | Pro',
    image: '/mockups/mockup-02-pro-analysis.png',
    alt: 'Proセクション',
    hotspots: [
      { label: 'Proの内容を見る', href: '/pro', x: 5.5, y: 43.3, width: 20.0, height: 6.1 },
    ],
  },
  {
    key: 'pricing',
    title: 'みちまち | 料金',
    image: '/mockups/mockup-06-pricing-city.png',
    imageWidth: 1586,
    imageHeight: 992,
    fullImage: true,
    alt: '料金と先行登録セクション',
    hotspots: [
      { label: '無料プランで街を作る', href: '#create-town', x: 15.1, y: 58.6, width: 26.9, height: 5.4 },
      { label: 'Proプランを確認する', href: '#pricing', x: 51.0, y: 59.2, width: 32.6, height: 4.9 },
      { label: '最初の街を作る', href: '#create-town', x: 72.7, y: 92.6, width: 17.5, height: 5.2 },
    ],
    formFields: [
      { label: 'メールアドレス', name: 'email', type: 'email', x: 5.4, y: 78.0, width: 22.3, height: 5.4 },
    ],
  },
];

const CREATE_TOWN_STORAGE_KEY = 'michimachi:create-town';

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
      className="hotspot pixel-hotspot appearance-none p-0"
      name={field.name}
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

function normalizeLegacyHash() {
  const rawHash = window.location.hash;
  if (!rawHash.startsWith('#/')) return null;

  const key = rawHash.slice(2);
  if (!navItems.some((item) => item.key === key)) return null;

  window.history.replaceState(null, '', `#${key}`);
  return key;
}

function getHashSectionKey() {
  const key = window.location.hash.replace(/^#\/?/, '');
  return navItems.some((item) => item.key === key) ? key : null;
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
  const currentPath = typeof window === 'undefined' ? '/' : window.location.pathname;
  const [activeSection, setActiveSection] = useState('top');

  useLayoutEffect(() => {
    const normalizedKey = normalizeLegacyHash();
    const initialKey = normalizedKey ?? getHashSectionKey();

    if (initialKey) {
      setActiveSection(initialKey);
      scrollToSectionNow(initialKey);
    }
  }, []);

  useEffect(() => {
    document.title = 'みちまち';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', '目標へ毎日進めるルートを作る、みちまちのランディングページ');

    const handleHashChange = () => {
      const key = getHashSectionKey();
      if (!key) return;
      setActiveSection(key);
      scrollToSection(key);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
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
  }, []);

  if (currentPath === '/pro') {
    return <ProDetailPage />;
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
              className={activeSection === item.key ? 'is-active' : ''}
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
            {section.custom === 'create-town' ? (
              <CreateTownPage />
            ) : (
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
                    draggable="false"
                    height={section.imageHeight ?? 1024}
                    src={section.image}
                    width={section.imageWidth ?? 1536}
                  />

                  {(section.hotspots ?? []).map((hotspot) => (
                    <Hotspot key={`${section.key}-${hotspot.label}`} {...hotspot} />
                  ))}

                  {section.formFields ? (
                    <form aria-label="先行登録フォーム" onSubmit={(event) => event.preventDefault()}>
                      {section.formFields.map((field) => (
                        <TransparentField field={field} key={field.name} />
                      ))}
                    </form>
                  ) : null}
                </div>
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
