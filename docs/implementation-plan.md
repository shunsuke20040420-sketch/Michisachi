# 実装計画書: 街として育つ習慣アプリ UI

## 目的

事前生成した2枚のモック画像をリファレンスとして、React + Tailwind CSS でモバイルWebアプリの高忠実UIプロトタイプを実装する。

参照画像:

- `assets/reference/main-tabs-reference.png`: 主要5画面
- `assets/reference/secondary-pages-reference.png`: 追加10画面

## 再現方針

- 参照画像の「スマホ画面そのもの」をWeb上に再構築する。
- 初期表示はアプリ本体。説明用LPにはしない。
- モバイル幅では1台のスマホアプリとして操作できる。
- デスクトップ幅では参照画像と同様に複数画面を横並び/グリッドで眺められる「モックボード」モードも成立させる。
- UIの文言は日本語のみ。
- ランキング、罰、強い連続記録プレッシャー、赤い失敗表示は避ける。

## 画面構成

### 主要タブ

1. `街`
   - ゴール名: `英語で話せる街`
   - アイソメ街
   - 状態チップ: `灯り 12`, `道 8`, `設備 5`
   - 下部ナビ

2. `今日`
   - 4段階記録: `つながらなかった`, `最低条件`, `通常行動`, `伸ばす行動`
   - 記録ボタン
   - 最低条件が歓迎される静かな見た目

3. `つくる`
   - 工房イラスト
   - チェーン設計カード
   - 保存/整えるボタン

4. `みんなの街`
   - ランキングではないギャラリー
   - 他人の街カード
   - `自分用に調整`

5. `相談`
   - ルールベース提案
   - 工事記録
   - `設計を見直す`

### 追加ページ

6. `ゴール詳細`
7. `チェーン編集`
8. `記録履歴`
9. `共有街詳細`
10. `取り入れ編集`
11. `成長アルバム`
12. `工事記録`
13. `設備一覧`
14. `テンプレート集`
15. `公開設定`

## アセット一覧

### 参照画像

- `assets/reference/main-tabs-reference.png`
- `assets/reference/secondary-pages-reference.png`

### imagegenで生成する素材

生成先は `public/assets/generated/`。

- `city-main.png`
  - 街画面の大きなアイソメ街。
  - 透過PNG。
- `workshop.png`
  - つくる/チェーン編集の工房イラスト。
  - 透過PNG。
- `city-thumbnails.png`
  - みんなの街、テンプレート、アルバムで使う小さな街サムネイルのシート。
  - 透過PNG。
- `equipment-sheet.png`
  - 設備一覧のアイコン風イラスト。
  - 透過PNG。
- `construction.png`
  - 相談/工事記録の看板・足場・重機系イラスト。
  - 透過PNG。

生成は `imagegen` の通常生成でフラットなクロマキー背景を指定し、ローカルの透過処理スクリプトでアルファ化する。

### アイコン

- UIアイコンは `lucide-react` のSVGを使用する。
- SVGは背景を持たず透過で表示される。
- 必要に応じて、生成PNGアイコンを使う場合はクロマキー除去済みのみ使用する。

## 視覚トークン

```css
--color-bg: #F4F1EA;
--color-surface: #FFFDF7;
--color-surface-muted: #ECE5D7;
--color-text: #2F3432;
--color-text-muted: #69716C;
--color-border: #D8D0C1;
--color-primary: #2F7F75;
--color-primary-deep: #215D56;
--color-minimum: #9CBF8E;
--color-normal: #C9A15A;
--color-stretch: #D9826B;
--color-prepare: #6F9FB5;
--color-difficulty: #B77955;
--color-disconnected: #B9B9AD;
```

その他:

- 角丸: 基本 `8px`, スマホ外枠 `24px`
- 境界線: `1px #D8D0C1`
- 影: `0 12px 30px rgba(47, 52, 50, .12)`
- フォント: `Noto Sans JP`, `Hiragino Sans`, `Yu Gothic`, `system-ui`

## レイアウト

### デスクトップ

- 背景: `#F4F1EA`
- 上部に小さなビュー切替: `主要5画面`, `追加10画面`, `アプリ操作`
- `主要5画面`: 5台のスマホを横並び。参照画像と同じリズム。
- `追加10画面`: 5列 x 2行のスマホグリッド。
- スマホ幅は約 `320px`、高さは `640px`。

### モバイル

- 実機アプリに近い単一画面。
- 下部ナビで主要5画面を切り替え。
- 追加ページは `街` や `みんなの街` 内の導線/ビュー切替から見られる。
- 横スクロールや表示崩れは避ける。

## アニメーション

- 画面切替: 180ms, opacity + translateY
- 街の要素: ゆっくりした浮遊/灯りの点滅
- 道チップ: hover/focusでごく薄い背景変化
- 記録ボタン: 押下時に小さなスケール
- カード表示: staggered reveal
- 設備/工事記録: hoverで1px上がる

アニメーションは最終配置を動かさず、レイアウトシフトを起こさない。

## TODO

### TODO-0: アセット生成と透過処理

Owner: Orchestrator

Acceptance:

- imagegenで必要なイラスト素材を生成。
- クロマキー背景を除去し、`public/assets/generated/` に透過PNGとして配置。
- 参照モック画像は `assets/reference/` に保持。

### TODO-1: React + Tailwind基盤

Owner: Worker 1

Files:

- `package.json`
- `index.html`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `src/main.jsx`
- `src/App.jsx`
- `src/styles/index.css`

Acceptance:

- Vite + React + Tailwindで起動する。
- デザイン変数がCSSに定義される。
- モックボード/アプリ操作のモード切替用の最小構造がある。

### TODO-2: 共通コンポーネント

Owner: Worker 2

Files:

- `src/components/PhoneFrame.jsx`
- `src/components/AppChrome.jsx`
- `src/components/BottomNav.jsx`
- `src/components/Cards.jsx`
- `src/components/Illustration.jsx`

Acceptance:

- 参照画像のスマホ外枠、ステータスバー、ナビ、カード形状に近い。
- 文字あふれが起きない。
- lucideアイコンを使用。

### TODO-3: 主要5画面

Owner: Worker 3

Files:

- `src/data/screens.js`
- `src/components/MainScreens.jsx`

Acceptance:

- `街`, `今日`, `つくる`, `みんなの街`, `相談` を実装。
- 参照画像の情報構造、色、密度、余白に近い。
- 生成アセットを各画面に配置。

### TODO-4: 追加10ページ

Owner: Worker 4

Files:

- `src/data/secondaryScreens.js`
- `src/components/SecondaryScreens.jsx`

Acceptance:

- 追加10ページを実装。
- 2行 x 5列の参照ボードに近い。
- 各ページの日本語文言と目的が参照と一致する。

### TODO-5: アニメーションとレスポンシブ調整

Owner: Worker 5

Files:

- `src/App.jsx`
- `src/styles/index.css`
- 必要に応じてコンポーネントCSSクラス

Acceptance:

- カード、街、画面切替にリッチだが静かなアニメーションがある。
- デスクトップ/モバイルで破綻しない。
- アニメーションによるレイアウトシフトがない。

### TODO-6: Browser Use検証と修正

Owner: Orchestrator

Acceptance:

- ローカルdev serverを起動。
- Browser Useでデスクトップとモバイル相当のスクリーンショットを確認。
- テキスト重なり、色、余白、主要画面の見え方をチェック。
- 不足があれば該当workerへ修正依頼、またはオーケストレーターが最小修正。

