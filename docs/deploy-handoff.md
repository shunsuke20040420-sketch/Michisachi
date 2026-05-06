# 公開ハンドオフ

実行日: 2026-05-06

## 公開用ファイル

- ビルド済みディレクトリ: `dist`
- アップロード用zip: `release/michimachi-public-dist-2026-05-06.zip`
- SHA-256: `d5ef49e62540c8afeb4d2c0a32912adb56d8ac074c3c160aeee812d030172f8e`

`dist` と `release` はローカル生成物としてGitには含めない。
必要な場合は `npm run build` のあと、以下で再生成する。

```bash
mkdir -p release
rm -f release/michimachi-public-dist-2026-05-06.zip
cd dist
zip -qr ../release/michimachi-public-dist-2026-05-06.zip .
```

## 推奨公開先

初回公開は Netlify を推奨する。
理由は `/contact` の先行登録・フィードバックフォームが Netlify Forms に対応しているため。

## Netlify 手動公開手順

1. Netlify にログインする
2. Sites の manual deploy / deploy drop に `release/michimachi-public-dist-2026-05-06.zip` をアップロードする
3. 発行されたURLを開く
4. 以下を確認する
   - `/`
   - `/mvp`
   - `/pro`
   - `/contact`
   - `/privacy`
   - `/terms`
5. `/contact` からテスト送信する
6. Netlify 管理画面の Forms に `michimachi-interest` が表示されることを確認する
7. 問題なければ [publication-sharing-kit.md](publication-sharing-kit.md) の `[PUBLIC_URL]` を発行URLに差し替えて共有する

## リポジトリ連携で公開する場合

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 24系で確認済み
- Netlify: `netlify.toml` と `public/_redirects` を使用
- Vercel: `vercel.json` を使用
- GitHub Pages: `public/404.html` を使用

## 公開後に必ず見るもの

- OGPプレビューでタイトル、説明、画像が出る
- スマホ実機でトップと `/contact` が開く
- `/contact` の送信が届く
- 主要導線から戻れなくなる箇所がない
- 反応や不具合を `docs/publication-sharing-kit.md` の24時間確認手順に沿って記録する
