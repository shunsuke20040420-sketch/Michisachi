import { ArrowRight, Check, CheckCircle2, Map, Sparkles } from 'lucide-react';
import { sfImportedData } from '../../data/sharedFlowData.js';
import { SfPanel } from './SfComponents.jsx';

export default function SfSharedImported() {
  return (
    <div className="sf-content-wrap">
      <section className="sf-imported-hero sf-imported-pop" aria-labelledby="imported-title">
        <span className="sf-success-mark" aria-hidden="true">
          <CheckCircle2 />
        </span>
        <p className="sf-imported-kicker">共有の街から取り入れ完了</p>
        <h1 className="sf-page-heading" id="imported-title">
          この工夫を、あなたの街に取り入れました。
        </h1>
        <p className="sf-page-subheading">
          比べる場所ではなく、今日から進むための道に変わりました。
        </p>
      </section>

      <div className="sf-town-compare">
        <SfPanel title={sfImportedData.beforeTown.label} className="sf-card-in">
          <div className="sf-compare-town">
            <img src={sfImportedData.beforeTown.image} alt="参考にしたharuさんの街" />
          </div>
          <p className="sf-compare-caption">続いた工夫を観察して、必要なところだけを選びます。</p>
        </SfPanel>

        <div className="sf-transfer-arrow sf-card-in" aria-hidden="true">
          <ArrowRight />
        </div>

        <SfPanel title={sfImportedData.afterTown.label} className="sf-card-in">
          <div className="sf-compare-town">
            <img src={sfImportedData.afterTown.image} alt="工夫を取り入れたあなたの街" />
          </div>
          <p className="sf-compare-caption">明日の朝に使う道として、あなたの街に灯りがつきます。</p>
        </SfPanel>
      </div>

      <div className="sf-imported-grid">
        <SfPanel title="取り入れたもの" className="sf-card-in">
          <ul className="sf-feature-list">
            {sfImportedData.addedFeatures.map((feature) => (
              <li key={feature}>
                <Check aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </SfPanel>

        <SfPanel title="自分用に変えたもの" className="sf-card-in">
          <ul className="sf-feature-list">
            {['朝12分で終わるサイズ', '最低条件は1問だけ', 'アプリをホーム画面へ配置'].map((feature) => (
              <li key={feature}>
                <Sparkles aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </SfPanel>

        <SfPanel title="今日の一歩" className="sf-card-in sf-today-step">
          <Map aria-hidden="true" />
          <div>
            <strong>{sfImportedData.todayStep.label}</strong>
            <p>{sfImportedData.todayStep.detail}</p>
          </div>
        </SfPanel>
      </div>

      <div className="sf-cta-row sf-reveal">
        <a className="sf-btn-primary" href="/mvp">
          今日の達成を記録する
          <ArrowRight aria-hidden="true" />
        </a>
        <a className="sf-btn-secondary" href="/mvp">
          自分の街を見る
        </a>
      </div>
    </div>
  );
}
