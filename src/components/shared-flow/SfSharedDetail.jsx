import { ArrowRight, BookOpen, BookmarkPlus, Check, Droplet, Pencil, Sprout, Sun } from 'lucide-react';
import { SfPanel, SfUserRow } from './SfComponents.jsx';
import { sfTowns } from '../../data/sharedFlowData.js';

const town = sfTowns[0];
const detailRoutePills = [
  { Icon: Sun, label: '起きる', className: 'is-wake' },
  { Icon: Droplet, label: '水を飲む', className: 'is-water' },
  { Icon: BookOpen, label: '英語を開く', className: 'is-book' },
  { Icon: Pencil, label: '1問だけ', className: 'is-pencil' },
];
const detailTownLabels = ['最低条件', '通常行動', '伸ばす行動', '環境準備', '困難ログ'];

function WeeklyChart({ data }) {
  const max = Math.max(...data, 1);
  return (
    <div className="sf-bar-chart" aria-label="曜日別の達成状況" role="img">
      {['月', '火', '水', '木', '金', '土', '日'].map((day, i) => (
        <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div
            className={`sf-bar-chart__bar${data[i] >= 3 ? ' is-active' : ''}`}
            style={{ '--i': i, height: `${(data[i] / max) * 100}%`, width: '100%' }}
            aria-label={`${day}: ${data[i]}`}
          />
          <span style={{ fontSize: 10, color: 'var(--sf-muted)' }}>{day}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressRow({ items }) {
  return (
    <div className="sf-progress-row">
      {items.map((item) => (
        <div key={item.label} className="sf-progress-item">
          <div className="sf-progress-item__label">
            <span>{item.label}</span>
            <span>{item.pct}%</span>
          </div>
          <div className="sf-progress-item__bar">
            <div className="sf-progress-item__fill" style={{ width: `${item.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SfSharedDetail() {
  return (
    <div className="sf-content-wrap">
      <div className="sf-two-col">
        {/* 左メイン */}
        <div className="sf-col-main">
          <a href="#shared-profile" style={{ textDecoration: 'none', marginBottom: 16, display: 'block' }}>
            <SfUserRow user={town.user} />
          </a>

          {/* 大ビジュアル */}
          <div
            className="sf-detail-illustration"
            style={{
              borderRadius: 'var(--sf-radius)',
              overflow: 'hidden',
              border: '1px solid var(--sf-border)',
              marginBottom: 28,
              background: 'var(--sf-green-soft)',
            }}
          >
            <img
              src={town.image}
              alt={`${town.title}のビジュアル`}
              className="sf-float-anim"
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
              width={800}
              height={450}
            />
            <div className="sf-detail-illustration__town-labels" aria-hidden="true">
              {detailTownLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            {detailRoutePills.map(({ Icon, label, className }) => (
              <span className={`sf-library-hero-pill sf-detail-illustration__route ${className}`} key={label}>
                <Icon aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          {/* 6週間達成率 */}
          <section aria-labelledby="achievement-title" style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
              <h2 id="achievement-title" style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--sf-ink)' }}>
                6週間の達成率
              </h2>
              <span style={{ fontSize: 32, fontWeight: 950, color: 'var(--sf-green)', lineHeight: 1 }}>
                {town.sixWeekRate}%
              </span>
            </div>
            <WeeklyChart data={town.weeklyData} />
          </section>

          {/* 止まった場所 */}
          <section aria-labelledby="stuck-title" style={{ marginBottom: 28 }}>
            <h2 id="stuck-title" style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 900, color: 'var(--sf-ink)' }}>
              止まりやすかった場所
            </h2>
            <ProgressRow items={town.stuckPoints} />
          </section>

          {/* 直した工夫 */}
          <section aria-labelledby="fixes-title">
            <h2 id="fixes-title" style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 900, color: 'var(--sf-ink)' }}>
              直した工夫
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
              {town.fixes.map((fix, i) => (
                <li
                  key={i}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--sf-ink)', lineHeight: 1.6 }}
                >
                  <Check aria-hidden="true" style={{ width: 16, height: 16, color: 'var(--sf-green)', flexShrink: 0, marginTop: 2 }} />
                  {fix}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 右サイドバー */}
        <aside className="sf-col-aside" aria-label="街の詳細と操作">
          {/* 見えるもの */}
          <SfPanel title="見えるもの">
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 900, color: 'var(--sf-soft)' }}>チェーン</p>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--sf-ink)', lineHeight: 1.6 }}>{town.chain}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 900, color: 'var(--sf-soft)' }}>最低条件</p>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--sf-ink)', lineHeight: 1.6 }}>{town.minAction}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {town.tags.map((tag) => (
                  <span key={tag} className="sf-town-card__tag">{tag}</span>
                ))}
              </div>
            </div>
          </SfPanel>

          {/* CTA */}
          <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
            <a href="#shared-adapt" className="sf-btn-primary" style={{ width: '100%' }}>
              この街を参考にする
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="#shared-saved" className="sf-btn-secondary" style={{ width: '100%' }}>
              <BookmarkPlus aria-hidden="true" style={{ width: 16, height: 16 }} />
              保存した街へ追加
            </a>
          </div>

          {/* 取り入れポイント */}
          <SfPanel title="取り入れポイント" style={{ marginTop: 14 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              {town.adaptPoints.map((point, i) => (
                <div key={i}>
                  <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 900, color: 'var(--sf-ink)' }}>
                    {point.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--sf-muted)', lineHeight: 1.7 }}>
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </SfPanel>
        </aside>
      </div>
    </div>
  );
}
