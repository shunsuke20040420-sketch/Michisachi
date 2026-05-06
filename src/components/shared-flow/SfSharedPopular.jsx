import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import SfTownCard from './SfTownCard.jsx';
import { SfFilterChips, SfPanel } from './SfComponents.jsx';
import { sfPopularSidebarItems, sfPopularTowns } from '../../data/sharedFlowData.js';

const FILTER_CHIPS = [
  { key: 'recommend', label: 'おすすめ順' },
  { key: 'streak', label: '継続率が高い順' },
  { key: 'reach', label: '参考にされた順' },
];

export default function SfSharedPopular() {
  const [activeFilter, setActiveFilter] = useState('recommend');

  return (
    <div className="sf-content-wrap">
      <div className="sf-two-col">
        {/* メインカラム */}
        <div className="sf-col-main">
          <h1 className="sf-page-heading sf-reveal">人気の街</h1>
          <p className="sf-page-subheading sf-reveal">今週最も参考にされた街</p>

          <div className="sf-reveal" style={{ marginBottom: 20 }}>
            <SfFilterChips chips={FILTER_CHIPS} activeKey={activeFilter} onSelect={setActiveFilter} />
          </div>

          <div className="sf-town-grid">
            {sfPopularTowns.map((town) => (
              <SfTownCard key={town.id} town={town} rank={town.rank} />
            ))}
          </div>
        </div>

        {/* サイドバー */}
        <aside className="sf-col-aside">
          <SfPanel title="今週伸びている街">
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
              {sfPopularSidebarItems.map((item) => (
                <li key={item.rank} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 950, fontSize: 13, color: 'var(--sf-green-deep)', minWidth: 20 }}>
                    {item.rank}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--sf-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </p>
                    <span style={{ fontSize: 11, color: 'var(--sf-muted)' }}>{item.user.name}</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 11, color: 'var(--sf-green)', fontWeight: 900, flexShrink: 0 }}>
                    <TrendingUp aria-hidden="true" style={{ width: 12, height: 12 }} />
                    +{item.growth}
                  </span>
                </li>
              ))}
            </ol>
          </SfPanel>

          <SfPanel title="人気の理由" style={{ marginTop: 14 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
              {['チェーンが明確で分かりやすい', '最低条件がシンプル', '直した工夫が具体的'].map((r) => (
                <li key={r} style={{ fontSize: 13, color: 'var(--sf-muted)', paddingLeft: 14, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--sf-green)' }}>›</span>
                  {r}
                </li>
              ))}
            </ul>
          </SfPanel>
        </aside>
      </div>
    </div>
  );
}
