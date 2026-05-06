# 共有の街フロー 全8ページ React実装計画

## Context

「共有の街」CTAを押した後の遷移先として、現在は PNG モックアップ画像 + 透明ホットスポットで実装されている 8ページを、ProDetailPage と同等の本物の React/Tailwind コンポーネントに置き換える。ピクセルレベルでモック画像に忠実に再現し、リッチな CSS アニメーションを加える。

---

## 対象ページ（全8ページ）

| hash key | ページ名 |
|---|---|
| `#shared-library` | みんなの街（メインライブラリ） |
| `#shared-popular` | 人気の街 |
| `#shared-saved` | 保存した街 |
| `#shared-detail` | haru さんの街の詳細 |
| `#shared-adapt` | この街を参考にする |
| `#shared-imported` | 取り入れ確認 |
| `#shared-profile` | haru さんのプロフィール |
| `#shared-category-english` | 英語カテゴリ |

---

## ファイル構成

### 新規作成

```
src/
  components/
    SharedFlowPage.jsx          ← ページルーター（App.jsx のインライン定義を置き換え）
    shared-flow/
      SfLayout.jsx              ← 共通ヘッダー + ページ背景ラッパー
      SfTownCard.jsx            ← 汎用タウンカード（全ページ共用）
      SfComponents.jsx          ← SfSearchBar / SfFilterChips / SfUserRow / SfPanel 等
      SfSharedLibrary.jsx       ← shared-library ページ
      SfSharedPopular.jsx       ← shared-popular ページ
      SfSharedSaved.jsx         ← shared-saved ページ
      SfSharedDetail.jsx        ← shared-detail ページ
      SfSharedAdapt.jsx         ← shared-adapt ページ
      SfSharedImported.jsx      ← shared-imported ページ
      SfSharedProfile.jsx       ← shared-profile ページ
      SfCategoryEnglish.jsx     ← shared-category-english ページ
  data/
    sharedFlowData.js           ← 全ページのデータ定数
  styles/
    shared-flow.css             ← 専用 CSS（.sf-page スコープ）
public/assets/shared-flow/     ← image-gen で生成したアバター画像等
```

### 変更ファイル

- `src/App.jsx`：既存の `SharedFlowPage` 関数を削除し `import SharedFlowPage` + `import './styles/shared-flow.css'` を追加（2行変更のみ）

---

## コンポーネント設計

```
SharedFlowPage
  └── SfLayout (SfHeader + 背景)
        └── [page.key でスイッチ]
              ├── SfSharedLibrary  ← SfTownCard × 6、SfSearchBar、SfFilterTabs、サイドバー
              ├── SfSharedPopular  ← ランク番号付き SfTownCard、サイドバー
              ├── SfSharedSaved    ← 横向き大型カード 2col、サイドバー
              ├── SfSharedDetail   ← 大ビジュアル + CSSバーチャート(81%) + 直した工夫 | サイドバー
              ├── SfSharedAdapt    ← 3カラムフロー（選択→調整→プレビュー）+ ステップバー
              ├── SfSharedImported ← before/after 2街並び + 今日の一歩カード + CTA×2
              ├── SfSharedProfile  ← アバター/stats + featured town | 他の街グリッド + 履歴
              └── SfCategoryEnglish← ヒーロー + 工夫パネル + 横スクロールグリッド
```

**SfHeader props**: `pageKey: string` → `tabMap` で `activeTab('library'|'popular'|'saved'|null)` を計算。タブクリックは通常 `<a href="#shared-*">` で App.jsx の `hashchange` ハンドラに委ねる。

**SfTownCard props**:
```js
{ image, title, user:{name,avatar}, category, tags:[], stats:{reach,days},
  href, rank?, savedDate? }
```

---

## CSS 設計（shared-flow.css）

```css
.sf-page {
  --sf-max: 1280px;
  --sf-gutter: clamp(20px, 4vw, 48px);
  --sf-paper: var(--paper, #fffaf0);
  --sf-ink: var(--ink, #1f252b);
  --sf-green: var(--green, #5f8f54);
  --sf-amber: var(--amber, #eda11a);
  /* ... 既存 CSS 変数を sf-* プレフィックスで参照 */
}
```

全ルールを `.sf-page` スコープ内に閉じ、既存 CSS との衝突を防ぐ。

主要クラス群: `.sf-header`、`.sf-two-col`、`.sf-town-grid`、`.sf-town-card`、`.sf-saved-card`、`.sf-detail`、`.sf-adapt`、`.sf-imported`、`.sf-profile__*`、`.sf-category`、`.sf-btn-primary`、`.sf-btn-secondary`、`.sf-panel`、`.sf-user-row`、`.sf-avatar`、`.sf-bar-chart`、`.sf-step-bar`

---

## アニメーション設計（CSS keyframes のみ）

```css
@keyframes sf-reveal    /* ページ見出し・リード文のフェードイン（Y:18px → 0） */
@keyframes sf-card-in   /* カードのスタガー入場（Y:12px + scale 0.985 → 1） */
@keyframes sf-float     /* detail ビジュアルのフロート（無限ループ Y±8px） */
@keyframes sf-bar-fill  /* CSSバーチャートのフィル（height 0 → var(--h)） */
@keyframes sf-imported-pop /* imported 成功画面のポップイン */
```

| 要素 | keyframe | delay |
|---|---|---|
| ページ見出し | sf-reveal | 0ms |
| フィルターチップ行 | sf-reveal | 120ms |
| カード1枚目 | sf-card-in | 150ms |
| カード2枚目 | sf-card-in | 210ms |
| カード3枚目 | sf-card-in | 270ms |
| detail ビジュアル | sf-float (∞) | 0ms |
| imported ヘッダー | sf-imported-pop | 0ms |

`@media (prefers-reduced-motion: reduce)` 内ですべて `animation-duration: 0.001ms`。

---

## 画像アセット

### 既存流用（変更不要）

| 用途 | アセットパス |
|---|---|
| haruの英語ルート（メイン画像） | `/assets/michimachi/city-main-display.png` |
| mikaの運動ルート | `/assets/michimachi/city-harbor-display.png` |
| sotaの資格ルート | `/assets/michimachi/city-hill-clean.png` |
| その他カード | `/assets/generated/city-thumb-*.png` |
| imported before/after | city-harbor-display / city-main-display |

### image-gen で生成（/image-gen スキル使用）

```
public/assets/shared-flow/
  avatar-haru.png  avatar-mika.png  avatar-sota.png
  avatar-nana.png  avatar-ren.png   avatar-yui.png
```
スタイル: 200×200px、円形クロップ前提、みちまちの暖色調、シンプルな日本人キャラクターアイコン。モック画像の対応するアバターをリファレンスとして image-to-image で生成。

---

## Worker 割り当て（TODO 単位）

### Phase 0 — 基盤整備（Worker A）
- [ ] `src/styles/shared-flow.css` 作成（CSS変数・ヘッダー・共通パーツ・アニメーション・レスポンシブ）
- [ ] `src/data/sharedFlowData.js` 作成（sfUsers, sfTowns, sfSavedTowns, sfPopularTowns, sfEnglishTowns, sfHaruProfile, sfImportedData, sfAdaptItems）
- [ ] `src/components/SharedFlowPage.jsx` 骨格作成（SfLayout + SfHeader + pageKey スイッチ）
- [ ] `src/components/shared-flow/SfLayout.jsx` 作成
- [ ] `src/App.jsx` 修正（既存 SharedFlowPage 削除・新 import 追加）
- [ ] 動作確認：`#shared-library` でヘッダーが表示されタブ切り替えが機能する

### Phase 1A — ライブラリページ（Worker B）
- [ ] `SfComponents.jsx`（SfSearchBar / SfFilterTabs / SfChip / SfUserRow / SfPanel）
- [ ] `SfTownCard.jsx` 完全実装
- [ ] `SfSharedLibrary.jsx` 実装（2カラム：タウングリッド | サイドバー）
- [ ] 動作確認：6枚カード表示・CTAクリックで `#shared-adapt` 遷移

### Phase 1B — ポピュラー・セーブドページ（Worker C）※Phase 0 完了後並行
- [ ] `SfSharedPopular.jsx`（ランク番号付きカード・サイドバー）
- [ ] `SfSharedSaved.jsx`（横向き大型カード 2col・サイドバー）

### Phase 2A — 詳細ページ（Worker D）※Phase 0 完了後並行
- [ ] `SfSharedDetail.jsx`（大ビジュアル・CSS棒グラフ・止まり分析・直した工夫 | サイドバー）

### Phase 2B — アダプト・インポートページ（Worker E）※Phase 0 完了後並行
- [ ] `SfSharedAdapt.jsx`（3カラムフロー・チェックリスト・フォーム・ステップバー）
- [ ] `SfSharedImported.jsx`（before/after・今日の一歩・CTA×2）

### Phase 3 — プロフィール・カテゴリページ（Worker F）※Phase 1A 完了後
- [ ] `SfSharedProfile.jsx`（アバター/stats・featured town・グリッド・履歴タイムライン）
- [ ] `SfCategoryEnglish.jsx`（ヒーロー・工夫パネル・横スクロールグリッド）

### Phase 4 — アセット生成・統合品質（Worker G）
- [ ] /image-gen でアバター画像を image-to-image 生成・配置
- [ ] 全ページのレスポンシブ確認（390px / 768px / 1280px / 1536px）
- [ ] フォーカス/キーボードナビ確認
- [ ] `prefers-reduced-motion` 確認
- [ ] `npm run build` パス確認

---

## 実装順序（依存グラフ）

```
Phase 0
  ├─→ Phase 1A ─→ Phase 3
  ├─→ Phase 1B
  ├─→ Phase 2A
  └─→ Phase 2B
        ↓（全 Phase 完了後）
      Phase 4
```

---

## 検証方法

| チェック項目 | 手順 |
|---|---|
| ページ遷移 | LP 上の「共有の街を見る」CTAクリック → `#shared-library` が React コンポーネントで表示される |
| タブナビ | ヘッダータブで library / popular / saved を切り替え |
| 詳細フロー | library カードクリック → detail → adapt → imported の全遷移 |
| プロフィール | detail のユーザー名クリック → profile |
| カテゴリ | library の英語タグクリック → category-english |
| レスポンシブ | 各ページを 390px / 768px / 1280px で目視確認 |
| LP 不変 | `#top` `#share` 等の既存 LP セクションが壊れていないこと |
| ビルド | `npm run build` がエラーなし |

---

## 再利用すべき既存コード

- `src/components/ProDetailPage.jsx` — コンポーネント分割パターン・データ駆動型 UI の参照実装
- `src/data/proDetailPage.js` — データファイルの構造パターン
- `src/styles/pro-detail.css` — スコープド CSS 変数・アニメーション定義のパターン
- `src/App.jsx:SharedFlowPage` — `page.key` スイッチの参考（→削除対象だが構造は参照）
- `src/App.jsx:Hotspot` — 透明リンクの実装（不要になるが既存ページとの整合のため確認）
