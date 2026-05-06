import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Droplet,
  Home,
  Pencil,
  Sun,
} from 'lucide-react';
import { sfAdaptItems, sfAdaptSteps, sfTowns } from '../../data/sharedFlowData.js';
import { SfPanel, SfUserRow } from './SfComponents.jsx';

const town = sfTowns[0];

const chainSteps = [
  { label: '起きる', Icon: Sun },
  { label: '水を飲む', Icon: Droplet },
  { label: '英語を開く', Icon: BookOpen },
  { label: '1問だけ', Icon: Pencil },
];

const tuneItems = [
  { title: '時間を短くする', text: '朝のルートを37分から12分に圧縮します。' },
  { title: '最低条件を残す', text: '忙しい日も道を切らさないよう、1問だけを残します。' },
  { title: '環境準備を足す', text: 'アプリをホーム画面1ページ目に置きます。' },
];

function StepBar() {
  return (
    <div className="sf-step-bar sf-reveal" aria-label="取り入れステップ">
      {sfAdaptSteps.map((step, index) => (
        <div className={`sf-step-bar__item${index === 1 ? ' is-active' : index === 0 ? ' is-done' : ''}`} key={step.label}>
          <span className="sf-step-bar__num">{index + 1}</span>
          <span>
            <strong>{step.label}</strong>
            <small>{step.desc}</small>
          </span>
          {index < sfAdaptSteps.length - 1 ? <span className="sf-step-bar__connector" /> : null}
        </div>
      ))}
    </div>
  );
}

export default function SfSharedAdapt() {
  return (
    <div className="sf-content-wrap">
      <div className="sf-reveal">
        <a className="sf-back-link" href="#shared-detail">
          <ArrowLeft aria-hidden="true" />
          街の詳細に戻る
        </a>
      </div>

      <div className="sf-adapt-hero">
        <div>
          <h1 className="sf-page-heading sf-reveal">この街の工夫を、自分の道に変える。</h1>
          <p className="sf-page-subheading sf-reveal">
            haru さんの英語ルートから、今日の朝に使える要素だけを取り入れます。
          </p>
        </div>
        <SfUserRow user={town.user} size="lg" />
      </div>

      <StepBar />

      <div className="sf-adapt-grid">
        <SfPanel title="取り入れるもの" className="sf-card-in">
          <img className="sf-adapt-town-image" src={town.image} alt="haru さんの朝の英語ルート" />
          <div className="sf-chain-row" aria-label="取り入れるチェーン">
            {chainSteps.map(({ label, Icon }, index) => (
              <span className="sf-chain-pill" key={label}>
                <Icon aria-hidden="true" />
                {label}
                {index < chainSteps.length - 1 ? <ArrowRight aria-hidden="true" className="sf-chain-arrow" /> : null}
              </span>
            ))}
          </div>

          <ul className="sf-check-list" aria-label="取り入れる項目">
            {sfAdaptItems.map((item) => (
              <li key={item.key}>
                <span className={item.checked ? 'is-checked' : ''}>
                  {item.checked ? <Check aria-hidden="true" /> : null}
                </span>
                <strong>{item.label}</strong>
              </li>
            ))}
          </ul>
        </SfPanel>

        <SfPanel title="自分用に調整" className="sf-card-in">
          <div className="sf-tune-list">
            {tuneItems.map((item, index) => (
              <article key={item.title}>
                <span>{index + 1}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="sf-segmented" aria-label="行動サイズ">
            <button className="is-active" type="button">最低条件</button>
            <button type="button">通常</button>
            <button type="button">伸ばす</button>
          </div>
        </SfPanel>

        <SfPanel title="あなたの街に入る道" className="sf-card-in">
          <div className="sf-own-town-preview">
            <img src="/assets/michimachi/hero-town.png" alt="あなたの街に追加される道" />
            <span className="sf-route-glow" aria-hidden="true" />
          </div>
          <div className="sf-import-summary">
            <CheckCircle2 aria-hidden="true" />
            <div>
              <strong>明日の朝から使える形に調整済み</strong>
              <p>「起きる → 水を飲む → 英語を開く → 1問だけ」を、あなたの街の最初の道として追加します。</p>
            </div>
          </div>
        </SfPanel>
      </div>

      <div className="sf-cta-row sf-reveal">
        <a className="sf-btn-primary" href="#shared-imported">
          この内容で取り入れる
          <ArrowRight aria-hidden="true" />
        </a>
        <a className="sf-btn-secondary" href="#shared-detail">
          <Home aria-hidden="true" />
          詳細に戻る
        </a>
      </div>
    </div>
  );
}
