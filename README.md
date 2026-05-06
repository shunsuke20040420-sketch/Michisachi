# みちまち プロトタイプ

みちまちは、目標達成の前にまず「毎日進めるルート」を作るための6週間習慣設計プロトタイプです。

このリポジトリは Vite + React で構成された公開検証用フロントエンドです。

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

## 本番ビルド

```bash
npm run build
```

## 本番ビルドのローカル確認

```bash
npm run preview
```

## デプロイ設定

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 24系で確認済み
- Vercel: `vercel.json` のrewriteでSPA直リンクを `index.html` に戻す
- Netlify: `public/_redirects` をビルド後に配布してSPA直リンクを `index.html` に戻す
- GitHub Pages: `public/404.html` をビルド後に配布し、直リンク時に `index.html` を読み込む
- 手動公開用zip: `release/michimachi-public-dist-2026-05-06.zip`
  - `release` はローカル生成物のためGitには含めません

詳しい公開手順は [docs/deploy-handoff.md](docs/deploy-handoff.md) を参照してください。

## 公開前チェック

公開前の確認項目は [docs/publication-readiness-checklist.md](docs/publication-readiness-checklist.md) を参照してください。

## 法務・問い合わせページ

公開検証用の最低限のページをアプリ内ルートとして用意しています。

- `/privacy`: プライバシーポリシー
- `/terms`: 利用規約
- `/contact`: 先行登録・フィードバック

`/contact` は Netlify Forms 対応環境ではそのままフォーム送信できます。
VercelやGitHub Pagesでは送信内容を端末に控えとして保存し、`VITE_MICHIMACHI_CONTACT_EMAIL` を設定している場合はメール送信リンクも表示します。
設定例は [.env.example](.env.example) を参照してください。
