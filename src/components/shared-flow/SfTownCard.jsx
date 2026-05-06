import { ArrowRight, Calendar, Users } from 'lucide-react';
import { SfUserRow } from './SfComponents.jsx';

export default function SfTownCard({
  town,
  rank,
  savedDate,
  detailHref = '#shared-detail',
  adaptHref = '#shared-adapt',
  className = '',
}) {
  const rankClass =
    rank === 1 ? 'is-gold' : rank === 2 ? 'is-silver' : rank === 3 ? 'is-bronze' : '';

  return (
    <article className={`sf-town-card sf-card-in ${className}`}>
      <a
        href={detailHref}
        className="sf-town-card__image-wrap"
        aria-label={`${town.title}の詳細を見る`}
        tabIndex={0}
      >
        <img
          src={town.image}
          alt={town.title}
          loading="lazy"
          width={480}
          height={300}
        />
        {rank != null && (
          <span className={`sf-town-card__rank ${rankClass}`} aria-label={`${rank}位`}>
            {rank}
          </span>
        )}
        {savedDate && (
          <span className="sf-saved-card__badge">{savedDate}に保存</span>
        )}
      </a>

      <div className="sf-town-card__body">
        <span className="sf-town-card__category">
          {town.categoryIcon && <town.categoryIcon aria-hidden="true" style={{ width: 11, height: 11 }} />}
          {town.category}
        </span>

        <h3 className="sf-town-card__title">{town.title}</h3>

        <SfUserRow user={town.user} />

        <div className="sf-town-card__tags">
          {town.tags.map((tag) => (
            <span key={tag} className="sf-town-card__tag">{tag}</span>
          ))}
        </div>

        <div className="sf-town-card__stats">
          <span>
            <Users aria-hidden="true" />
            参考 {town.stats.reach}
          </span>
          <span>
            <Calendar aria-hidden="true" />
            継続 {town.stats.days}日
          </span>
        </div>

        <a href={adaptHref} className="sf-town-card__cta">
          この街を参考にする
          <ArrowRight aria-hidden="true" style={{ width: 13, height: 13 }} />
        </a>
      </div>
    </article>
  );
}
