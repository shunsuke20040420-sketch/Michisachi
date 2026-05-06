# Pro Detail Page TODO

## Scope

Build a new `/pro` detail page from the existing React/Tailwind LP, using the tall reference mockup as the visual guide:

`/Users/fujimotoshunsuke/Desktop/ig_0cfe920acc22a4450169f2e2c3ffa881918c52f2f4e487825f.png`

Only Worker A has edited this TODO. Other workers should not revert unrelated work in the repository.

## 1. Route and Entry

- [x] In `src/App.jsx`, add a small path state such as `currentPath`.
- [x] Initialize it from `window.location.pathname`.
- [x] Listen for `popstate` and update path state.
- [x] Render `ProDetailPage` when `currentPath === '/pro'`.
- [x] Render the existing LP for all other paths.
- [x] Keep current hash normalization and hash-scroll behavior scoped to the LP render path.
- [x] Add a helper such as `navigateToPath(path)` only if client-side path changes need to avoid full reloads.
- [x] Confirm direct `/pro` works in Vite dev.

## 2. Existing CTA Wiring

- [x] Find the current Pro section entry in `sections`.
- [x] Update the transparent CTA hotspot for 「Proの内容を見る」 to `href: '/pro'`.
- [x] If the current raster Pro mockup does not expose that exact CTA as a hotspot, add a hotspot with measured percentages over the CTA area.
- [x] Keep the existing Pro nav item as `#pro`; it should still scroll to the LP Pro section.
- [x] Do not change unrelated pricing/top/route hotspots.

## 3. Component Structure

- [x] Create `ProDetailPage` in `src/App.jsx` or a new component file if Worker B prefers.
- [x] Break visible sections into small components:
  - [x] `ProDetailHeader`
  - [x] `ProHero`
  - [x] `ProFeaturePanel`
  - [x] `ProBenefitCards`
  - [x] `ProComparison`
  - [x] `ProPricing`
  - [x] `ProFaq`
  - [x] `ProFooterTown`
- [x] Keep repeated text/data in arrays near the component or in `src/data`.
- [x] Use semantic landmarks: one `main`, section IDs, table markup for comparison.
- [x] Add accessible labels for icon-only or decorative controls.

## 4. Visual Contract

- [x] Match the reference page rhythm: warm top hero, product panel, three benefits, comparison, pricing, FAQ, footer town strip.
- [x] Reuse existing CSS variables: `--paper`, `--surface`, `--green`, `--green-deep`, `--amber`, `--border`, `--radius`.
- [x] Keep radius at 8px or less for cards/buttons.
- [x] Use green for Pro/status/checks, amber/orange for primary CTAs and Pro chips.
- [x] Avoid extra explanatory text that is not visible in the reference.
- [x] Do not place cards inside cards.
- [x] Use stable dimensions for product panel, benefit art, pricing art, and footer art.

## 5. Hero Section

- [x] Header nav labels: `Proでできること`, `比較`, `料金`, `FAQ`.
- [x] Brand: `みちまち`, link to `/`.
- [x] Login button: `ログイン`.
- [x] H1: `Proで、街を何度でも育て直す。`
- [x] Supporting copy: `複数の目標、無制限ルート、詳細な週次AIレビューで、次の6週間を迷わず決められます。`
- [x] Primary CTA: `先行登録する`.
- [x] Gift note: `リリース前登録なら、ずっと ¥6,800 /年`.
- [x] Free-start note: `無料で始めて、必要になったらいつでもProへ。`
- [x] Build the product panel as DOM, not a screenshot.
- [x] Include panel content:
  - [x] `あなたの次のスプリント`
  - [x] `Pro機能`
  - [x] `詳細な週次AIレビュー`
  - [x] `GO / PIVOT / KILL 提案`
  - [x] `KPI・詰まりポイント分析`
  - [x] `次の6週間を一緒に決める`
  - [x] KPI card with `週5日、朝に英語へ触れる`
  - [x] OBL checklist with `読書`, `リスニング`, `過去問`

## 6. Benefit Cards

- [x] Card 1 heading: `複数の街`.
- [x] Card 1 copy: multiple goals can each grow as separate towns.
- [x] Card 1 art: use or create town cluster art.
- [x] Card 2 heading: `ルート無制限`.
- [x] Card 2 copy: users can create and retry routes repeatedly.
- [x] Card 2 art: use or create route/signpost art.
- [x] Card 3 heading: `自分用にAI調整`.
- [x] Card 3 copy: AI updates the next step from user records.
- [x] Card 3 art: use or create robot/dashboard art.
- [x] Add `Pro特典` chip to each card.

## 7. Comparison Table

- [x] Use an actual table with a sticky-looking header only if it does not complicate mobile.
- [x] Columns: blank feature label, `無料`, crown/icon + `Pro`.
- [x] Rows:
  - [x] `作れる街`: free `1つ`, pro `複数`
  - [x] `6週間ルート`: free `1つ`, pro `無制限`
  - [x] `毎日の記録`: free `○`, pro `○`
  - [x] `週次AIレビュー`: free `簡単レビュー`, pro `詳細レビュー`
  - [x] `KPI・詰まり分析`: free `-`, pro `○`
  - [x] `次スプリント提案`: free `-`, pro `○`
  - [x] `共有の街を見る`: free `○`, pro `○`
  - [x] `共有の街を参考にする`: free `○`, pro `○`
  - [x] `自分用にAI調整`: free `-`, pro `○`
  - [x] `似ている街の推薦`: free `-`, pro `○`
- [x] On mobile, keep columns readable; if needed, reduce padding before changing content.

## 8. Pricing

- [x] Section heading: `料金`.
- [x] Monthly card: `月額プラン`, `¥980 /月`.
- [x] Yearly card: `年額プラン`, `¥9,800 /年`, `通常価格`.
- [x] Featured early card: `先行登録者価格`, `¥6,800 /年`, `リリース前限定`.
- [x] Featured CTA: `先行登録者価格を受け取る`.
- [x] Note: `先行登録は無料です。登録した情報は課金に使われません。`
- [x] Include short check-list benefits under each card.
- [x] Use existing or new small isometric art in each pricing card.

## 9. FAQ

- [x] Section heading: `よくある質問`.
- [x] FAQ cards:
  - [x] `無料でも使えますか？`
  - [x] `先行登録すると課金されますか？`
  - [x] `先行登録者価格は続きますか？`
  - [x] `いつでも解約できますか？`
- [x] Use compact card layout on desktop and single column on mobile.
- [x] Keep answers short enough to avoid card overflow.

## 10. Assets

- [x] Audit whether existing assets can cover the hero town, three benefit cards, pricing cards, and footer strip.
- [x] Prefer:
  - [x] `/assets/michimachi/hero-town.png`
  - [x] `/assets/michimachi/city-main-clean.png`
  - [x] `/assets/michimachi/city-hill-clean.png`
  - [x] `/assets/michimachi/workshop.png`
  - [x] `/assets/generated/*`
- [x] If missing, ask Worker D to generate project-local PNG assets:
  - [x] `/assets/michimachi/pro-hero-town-route.png`
  - [x] `/assets/michimachi/pro-multiple-towns.png`
  - [x] `/assets/michimachi/pro-unlimited-route.png`
  - [x] `/assets/michimachi/pro-ai-robot.png`
  - [x] `/assets/michimachi/pro-footer-town-strip.png`
- [x] Keep all new asset references rooted at `/assets/...`.

## 11. CSS and Motion

- [x] Add a `.pro-detail-page` root class so styles do not leak into the current LP.
- [x] Use full-width bands with constrained inner content, not floating page-section cards.
- [x] Add responsive breakpoints for desktop, tablet, and 390px mobile.
- [x] Add reveal classes with reduced-motion fallback.
- [x] Ensure hover/focus states do not shift layout.
- [x] Add visible focus styles for header links and CTAs.
- [x] Check CSS color balance so the page does not become one-note orange/brown or green-only.

## 12. Validation

- [x] Run `npm run build`.
- [x] Start Vite dev server.
- [x] Visit `/`.
- [x] Confirm existing LP sections still render.
- [x] Click/activate the Pro CTA and confirm it opens `/pro`.
- [x] Directly visit `/pro`.
- [x] Test `/pro` header anchors.
- [x] Check desktop around `1440x1000` or wider.
- [x] Check mobile around `390x844`.
- [x] Confirm no horizontal overflow.
- [x] Confirm no broken images.
- [x] Confirm no obvious text overlap.
- [x] Confirm reduced motion does not leave elements hidden or shifted.

## Key Risks

- The reference mockup includes art not currently separated into assets.
- The existing LP uses raster artboards, while `/pro` should be maintainable DOM; exact pixel parity is not realistic.
- Static deployment needs SPA fallback for direct `/pro` refresh.
- The CTA location may need percentage measurement if the current Pro section raster has no existing hotspot over 「Proの内容を見る」.
