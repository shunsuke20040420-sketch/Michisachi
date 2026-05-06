import { ArrowRight, Calendar, History, Users } from 'lucide-react';
import { sfHaruProfile } from '../../data/sharedFlowData.js';
import { SfPanel, SfUserRow } from './SfComponents.jsx';
import SfTownCard from './SfTownCard.jsx';

export default function SfSharedProfile() {
  const profile = sfHaruProfile;
  const featured = profile.featuredTown;

  return (
    <div className="sf-content-wrap">
      <section className="sf-profile-hero">
        <SfPanel className="sf-profile-card sf-reveal">
          <SfUserRow user={profile.user} size="lg" />
          <h1>{profile.user.name} さんの街</h1>
          <p>{profile.user.bio}</p>
          <dl className="sf-profile-stats">
            <div>
              <dt>公開中</dt>
              <dd>{profile.stats.public}</dd>
            </div>
            <div>
              <dt>継続</dt>
              <dd>{profile.stats.streak}日</dd>
            </div>
            <div>
              <dt>参考</dt>
              <dd>{profile.stats.followers}</dd>
            </div>
          </dl>
        </SfPanel>

        <article className="sf-featured-town sf-reveal">
          <a href="#shared-detail" aria-label={`${featured.title}の詳細を見る`}>
            <img src={featured.image} alt={featured.title} />
          </a>
          <div>
            <span className="sf-chip sf-chip--amber">注目の街</span>
            <h2>{featured.title}</h2>
            <p>{featured.chain}</p>
            <a className="sf-town-card__cta" href="#shared-detail">
              詳細を見る
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </article>
      </section>

      <div className="sf-profile-grid">
        <section>
          <h2 className="sf-section-title">公開している街</h2>
          <div className="sf-town-grid">
            {profile.otherTowns.map((town) => (
              <SfTownCard key={town.id} town={town} />
            ))}
          </div>
        </section>

        <aside>
          <SfPanel title="haru さんから学べること">
            <div className="sf-lesson-list">
              {profile.lessons.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </SfPanel>

          <SfPanel title="プロフィール" style={{ marginTop: 14 }}>
            <dl className="sf-profile-meta">
              {Object.entries(profile.about).map(([key, value]) => (
                <div key={key}>
                  <dt>{key === 'role' ? '属性' : key === 'learning' ? '学習' : '目標'}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </SfPanel>
        </aside>
      </div>

      <section className="sf-profile-history">
        <div>
          <h2 className="sf-section-title">修正履歴</h2>
          <p>止まった場所を責めずに、道を直してきた記録です。</p>
        </div>

        <div className="sf-timeline">
          {profile.history.map((item) => (
            <article className="sf-timeline__item" key={item.date}>
              <span className="sf-timeline__dot" aria-hidden="true">
                <History />
              </span>
              <div className="sf-timeline__body">
                <p className="sf-timeline__date">{item.date}</p>
                <h3 className="sf-timeline__action">{item.action}</h3>
                <p className="sf-timeline__detail">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="sf-cta-row sf-reveal">
        <a className="sf-btn-primary" href="#shared-library">
          みんなの街へ戻る
          <Users aria-hidden="true" />
        </a>
        <a className="sf-btn-secondary" href="#shared-saved">
          <Calendar aria-hidden="true" />
          保存した街を見る
        </a>
      </div>
    </div>
  );
}
