import { ArrowRight, Leaf } from 'lucide-react';

const tabMap = {
  'shared-library': 'library',
  'shared-popular': 'popular',
  'shared-saved':   'saved',
};

export default function SfLayout({ pageKey, children }) {
  const activeTab = tabMap[pageKey] ?? null;

  return (
    <>
      <header className="sf-header">
        <a className="sf-header__brand" href="/" aria-label="みちまち トップへ">
          <span className="sf-header__brand-mark" aria-hidden="true">
            <Leaf />
          </span>
          <span>みちまち</span>
        </a>

        <nav className="sf-header__nav" aria-label="共有の街ナビゲーション">
          <a
            className={`sf-header__nav-item${activeTab === 'library' ? ' is-active' : ''}`}
            href="#shared-library"
          >
            街を探す
          </a>
          <a
            className={`sf-header__nav-item${activeTab === 'popular' ? ' is-active' : ''}`}
            href="#shared-popular"
          >
            人気の街
          </a>
          <a
            className={`sf-header__nav-item${activeTab === 'saved' ? ' is-active' : ''}`}
            href="#shared-saved"
          >
            保存した街
          </a>
        </nav>

        <a className="sf-header__cta" href="/mvp">
          自分の街を作る
          <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <main className="sf-main" id={`sf-main-${pageKey}`}>
        {children}
      </main>
    </>
  );
}
