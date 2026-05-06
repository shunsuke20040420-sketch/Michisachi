import { ArrowRight, Calendar, Users } from 'lucide-react';
import { SfPanel, SfUserRow } from './SfComponents.jsx';
import { sfSavedTowns } from '../../data/sharedFlowData.js';

function SavedCard({ town }) {
  return (
    <article className="sf-saved-card sf-card-in">
      <a href="#shared-detail" className="sf-saved-card__image" aria-label={`${town.title}の詳細を見る`}>
        <img src={town.image} alt={town.title} loading="lazy" />
        <span className="sf-saved-card__badge">{town.savedDate}に保存</span>
      </a>
      <div className="sf-saved-card__body">
        <span className="sf-chip">{town.category}</span>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 950, color: 'var(--sf-ink)', lineHeight: 1.4 }}>
          {town.title}
        </h3>
        <SfUserRow user={town.user} />
        <div className="sf-town-card__tags">
          {town.tags.map((tag) => <span key={tag} className="sf-town-card__tag">{tag}</span>)}
        </div>
        <div className="sf-town-card__stats">
          <span><Users aria-hidden="true" style={{ width: 13, height: 13 }} />参考 {town.stats.reach}</span>
          <span><Calendar aria-hidden="true" style={{ width: 13, height: 13 }} />継続 {town.stats.days}日</span>
        </div>
        <a href="#shared-adapt" className="sf-town-card__cta">
          この街を参考にする <ArrowRight aria-hidden="true" style={{ width: 13, height: 13 }} />
        </a>
      </div>
    </article>
  );
}

export default function SfSharedSaved() {
  return (
    <div className="sf-content-wrap">
      <div className="sf-two-col">
        <div className="sf-col-main">
          <h1 className="sf-page-heading sf-reveal">保存した街</h1>
          <p className="sf-page-subheading sf-reveal">参考にしようと思って保存した街</p>
          <div className="sf-saved-grid">
            {sfSavedTowns.map((town) => <SavedCard key={town.id} town={town} />)}
          </div>
        </div>

        <aside className="sf-col-aside">
          <SfPanel title="保存した街の使い方">
            <p style={{ fontSize: 13, color: 'var(--sf-muted)', margin: 0, lineHeight: 1.7 }}>
              気に入った工夫をひとつだけ選んで、自分の街に取り入れてみましょう。
              全部真似しなくて大丈夫です。
            </p>
          </SfPanel>
          <div style={{ marginTop: 14 }}>
            <a href="#shared-adapt" className="sf-btn-primary" style={{ width: '100%' }}>
              この街を参考にする
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
