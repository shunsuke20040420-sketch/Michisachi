# 公開準備 実行結果

実行日: 2026-05-06

## 実行済み

- [x] `npm install` を実行した
- [x] `package.json` に `preview` スクリプトを追加した
- [x] Vite / React plugin を npm audit の指摘に合わせて更新した
- [x] `npm audit --audit-level=moderate` が 0 vulnerabilities になった
- [x] `npm run dev` が起動することを確認した
- [x] `npm run build` が成功することを確認した
- [x] `npm run preview` が起動することを確認した
- [x] `index.html` に公開用の description / OGP / Twitter card / favicon / robots を追加した
- [x] `public/favicon.svg` を追加した
- [x] `public/robots.txt` を追加した
- [x] `/privacy` に公開検証用のプライバシーポリシー文案を追加した
- [x] `/terms` に公開検証用の利用規約文案を追加した
- [x] `/contact` に先行登録・問い合わせ・フィードバックフォームを追加した
- [x] `vercel.json` を追加し、VercelでSPA直リンクを `index.html` に戻す設定を入れた
- [x] `public/_redirects` を追加し、NetlifyでSPA直リンクを `index.html` に戻す設定を入れた
- [x] `public/404.html` を追加し、GitHub PagesでSPA直リンク時に `index.html` を読み込むフォールバックを入れた
- [x] `README.md` を追加した
- [x] `public` 配下の大きい画像を確認した
- [x] 秘密情報らしい文字列を検索した
- [x] `/`、`/mvp`、`/pro`、`/not-found-check` が preview で 200 を返すことを確認した
- [x] OGP画像、favicon、robots.txt が preview で 200 を返すことを確認した
- [x] Chrome headless でトップ、MVP、Pro、共有フローの表示とコンソールエラーを確認した
- [x] 初回公開の目的、対象、見せる範囲を文書上で確定した
- [x] 公開文面、フィードバック質問3つ、公開後24時間の確認手順を `docs/publication-sharing-kit.md` に用意した
- [x] 公開URL、連絡先が未確定でも差し替えて使えるプレースホルダーを用意した
- [x] 初回の成功指標を、フォーム回答、SNS/DM反応、継続利用希望、表示不具合の有無として文書上で確定した

## 確認結果

- Audit: 0 vulnerabilities
- Build: success
- Preview URL: `http://127.0.0.1:4173/`
- Dev URL: `http://127.0.0.1:5173/` で起動確認済み。確認後に停止済み
- 公開用zip: `release/michimachi-public-dist-2026-05-06.zip`
- 公開用zip SHA-256: `d5ef49e62540c8afeb4d2c0a32912adb56d8ac074c3c160aeee812d030172f8e`
- Browser console: 確認対象ページではエラーなし
- QA結果: `docs/qa/browser-check.json`
- QAスクリーンショット:
  - `docs/qa/top-desktop.png`
  - `docs/qa/top-mobile.png`
  - `docs/qa/mvp-mobile.png`
  - `docs/qa/pro-desktop.png`
  - `docs/qa/shared-desktop.png`
  - `docs/qa/contact-desktop.png`
  - `docs/qa/contact-mobile.png`
  - `docs/qa/privacy-desktop.png`
  - `docs/qa/terms-desktop.png`
- `/contact` フォーム: ローカルpreviewでは端末控え保存にフォールバックすることを確認済み
- `dist`: `.gitignore` 対象のビルド生成物として扱う
- `release`: `.gitignore` 対象のローカル生成物として扱う
- `docs/qa`: `.gitignore` 対象のローカルQA成果物として扱う
- テスト/lint: 現時点では設定なし。今回は build + audit + headless browser QA で公開前確認する
- 先行登録・フィードバック: Netlify Forms 対応環境では `/contact` から受信可能。Vercel/GitHub Pagesでは端末控え保存とメールリンクで代替する
- 公開文面・質問・24時間確認手順: `docs/publication-sharing-kit.md`
- 初回公開の暫定対象: 知人 + 限定SNS共有
- 初回計測方針: 計測タグなし。フォーム回答、SNSコメント、DM、投稿指標を手動記録する
- 差し替えが必要な値: `[PUBLIC_URL]`、必要に応じて `VITE_MICHIMACHI_CONTACT_EMAIL`

## リポジトリ内で完了扱いにした項目

- [x] 公開目的の1文化
- [x] 公開対象の暫定決定
- [x] 今回見せる範囲 / 見せない範囲の整理
- [x] 公開後に受け取りたい反応の整理
- [x] 成功指標の暫定決定
- [x] 計測ツールは初回なし、手動記録で進める判断
- [x] フィードバック導線の公開文面準備
- [x] Netlify Forms対応のアプリ内フォーム準備
- [x] Netlify手動公開用zipの作成
- [x] 公開時に聞く質問を3つに絞る
- [x] 個人情報を取る場合の利用目的文の準備
- [x] 公開後24時間の確認手順の準備

## こちらでは完了扱いにできない項目

- [ ] 公開先アカウントでのデプロイ設定
- [ ] 公開URLでの実機確認
- [ ] SNS投稿文の最終決定
- [ ] Google Analytics / Plausible / PostHog などの計測タグ導入
- [ ] Netlify以外で公開する場合のメール送信先 `VITE_MICHIMACHI_CONTACT_EMAIL` の設定
- [ ] プライバシーポリシー・利用規約の最終法務確認
- [ ] 本番ドメイン確定後の OGP URL の絶対URL指定
- [ ] デプロイ先管理画面での一時停止・ロールバック方法確認

## 公開直前に差し替えるもの

- `[PUBLIC_URL]`: デプロイ後のURL
- `VITE_MICHIMACHI_CONTACT_EMAIL`: Netlify以外でメール送信リンクを出す場合の連絡先
- `[DEPLOY_PROVIDER]`、`[DEPLOY_ADMIN_URL]`、`[PAUSE_OR_ROLLBACK_STEPS]`: 公開停止・差し戻し手順

## 公開前の暫定判断

このプロトタイプは、まず知人・限定SNS向けに見せて反応を見る用途なら公開可能な状態を目指す。
ただし、メールアドレスなどの個人情報を実際に取得する場合は、公開前に利用目的と受け皿を確定する。

## デプロイ手順メモ

1. Netlifyへ手動公開する場合は `release/michimachi-public-dist-2026-05-06.zip` をアップロードする。
2. リポジトリ連携で公開する場合は Build command に `npm run build`、Output directory に `dist` を設定する。
3. Vercelは `vercel.json`、Netlifyは `netlify.toml` と `public/_redirects`、GitHub Pagesは `public/404.html` により、SPAの直リンクをトップアプリに戻す。
4. デプロイ後、`/`、`/mvp`、`/pro`、`/contact`、`/privacy`、`/terms` をスマホ実機とシークレットウィンドウで開く。
5. Netlifyで公開する場合は管理画面のFormsに `michimachi-interest` が作成されていることを確認する。

詳細は [deploy-handoff.md](deploy-handoff.md) を参照する。
