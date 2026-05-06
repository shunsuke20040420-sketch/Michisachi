import { ArrowRight, BookOpen, Headphones, Search } from 'lucide-react';
import { sfCategoryTags, sfEnglishTips, sfEnglishTowns, sfTowns } from '../../data/sharedFlowData.js';
import { SfPanel } from './SfComponents.jsx';
import SfTownCard from './SfTownCard.jsx';

const fallbackEnglishTowns = [
  ...sfEnglishTowns,
  ...sfTowns
    .filter((town) => town.category !== '英語')
    .slice(0, 2)
    .map((town, index) => ({
      ...town,
      id: `english-sample-${town.id}`,
      title: index === 0 ? '聞くだけ英語ルート' : '単語1つ朝ルート',
      category: '英語',
      tags: ['英語', ...town.tags.slice(0, 2)],
    })),
];

export default function SfCategoryEnglish() {
  return (
    <div className="sf-content-wrap">
      <section className="sf-category-hero">
        <div className="sf-reveal">
          <span className="sf-chip sf-chip--amber">
            <BookOpen aria-hidden="true" style={{ width: 13, height: 13 }} />
            英語カテゴリ
          </span>
          <h1 className="sf-page-heading">英語の街から、朝の道を探す。</h1>
          <p className="sf-page-subheading">
            リスニング、単語、アプリ学習。続いた人のチェーンと直し方を見ながら選べます。
          </p>
        </div>

        <SfPanel className="sf-category-search sf-reveal">
          <Search aria-hidden="true" />
          <span>英語 / リスニング / 1問だけ / 朝活</span>
        </SfPanel>
      </section>

      <div className="sf-category-tags sf-reveal" aria-label="カテゴリ">
        {sfCategoryTags.map((tag) => (
          <span className={`sf-chip${tag.active ? ' is-active' : ''}`} key={tag.label}>
            {tag.label}
          </span>
        ))}
      </div>

      <div className="sf-category-layout">
        <section>
          <h2 className="sf-section-title">おすすめの英語の街</h2>
          <div className="sf-town-grid">
            {fallbackEnglishTowns.map((town) => (
              <SfTownCard key={town.id} town={town} />
            ))}
          </div>
        </section>

        <aside>
          <SfPanel title="英語で続いた工夫">
            <div className="sf-lesson-list">
              {sfEnglishTips.map(({ icon: Icon, label, text }) => (
                <article key={label}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{label}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </SfPanel>

          <SfPanel title="最初に見るなら" style={{ marginTop: 14 }}>
            <div className="sf-recommend-mini">
              <Headphones aria-hidden="true" />
              <div>
                <strong>聞くだけから始める街</strong>
                <p>開くだけ、聞くだけ、1問だけ。量より入口を小さくします。</p>
              </div>
            </div>
            <a className="sf-btn-primary" href="#shared-adapt" style={{ width: '100%', marginTop: 14 }}>
              この街を参考にする
              <ArrowRight aria-hidden="true" />
            </a>
          </SfPanel>
        </aside>
      </div>
    </div>
  );
}
