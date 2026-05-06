# Shared Town Flow Implementation Plan

## Goal

Create the destination shown after the LP's 「共有の街を見る」 CTA. The implementation should use the newly generated shared-town mockups as the visual contract and keep the existing landing page intact.

The first destination remains `#shared-library`, and that destination becomes a small shared-town flow:

- `#shared-library`: 街を探す
- `#shared-popular`: 人気の街
- `#shared-saved`: 保存した街
- `#shared-detail`: haru さんの街の詳細
- `#shared-adapt`: この街を参考にする
- `#shared-imported`: 取り入れ確認
- `#shared-profile`: haru さんの街
- `#shared-category-english`: 英語の街

The existing 「自分の街を作る」 affordance should keep leading to the existing MVP page (`/mvp`), as requested.

## Reference Images

Use these generated mockups as references and final raster artboards for pixel fidelity:

- `shared-town-detail.png`: generated `ig_04606c4ffa61d2b30169f3cc0f9a54819197fc6b00f3b6c38d.png`
- `shared-town-adapt.png`: generated `ig_04606c4ffa61d2b30169f3cc88186881919f5988caf9cf0431.png`
- `shared-town-popular.png`: generated `ig_04606c4ffa61d2b30169f3cffc0f7c819186238473f41ca1da.png`
- `shared-town-saved.png`: generated `ig_04606c4ffa61d2b30169f3d06aae748191a383f97a5b273092.png`
- `shared-town-profile.png`: generated `ig_04606c4ffa61d2b30169f3d0e859d88191901bc0497adb775d.png`
- `shared-town-category-english.png`: generated `ig_04606c4ffa61d2b30169f3d15ca4ac8191a962ac030ee9cafa.png`
- `shared-town-imported.png`: generated `ig_04606c4ffa61d2b30169f3d1d8a58c8191b1a8015491ea203c.png`

Existing reference:

- `mockup-05-share-library-updated.png`: current `#shared-library` image.

## Technical Approach

The current app already uses React + Tailwind CSS, with global CSS and full-image artboards for pixel-accurate LP sections. For this flow, preserve that proven pattern:

1. Copy all generated mockups into `public/mockups/shared-flow/`.
2. Keep the LP `sections` array limited to visible LP sections only.
3. Add a separate `sharedFlowPages` collection in `src/App.jsx` for the shared-town flow pages.
4. Render `sharedFlowPages` as standalone hash destinations when the current hash is `#shared-library` or another `#shared-*` page.
5. Use each generated mockup as a full artboard with exact `imageWidth`, `imageHeight`, and `fullImage: true`.
4. Add transparent hotspots for tabs, cards, CTAs, and back links.
6. Keep the top LP nav unchanged; the new pages are reachable from the shared CTA and in-flow controls only.
7. Add subtle animation classes to shared-flow artboards without shifting their final layout.

This is intentionally raster-first. Rebuilding the entire generated UI as DOM would reduce pixel fidelity because the generated isometric illustrations and Japanese text are baked into the mockups.

## Visual Contract

- Match the generated images at a glance: scale, crop, warm ivory background, green/orange accents, soft borders, and dense app-like layout.
- Preserve current LP header behavior on the LP, but do not show the LP header or LP sections on shared-flow standalone pages.
- Full image artboards should retain their native aspect ratios.
- Hotspots must be invisible at rest but keyboard focusable.
- CTA hover/focus may show a very subtle warm outline and glow, without changing layout.
- No new nav item should appear in the LP header, and shared-flow pages should not appear while scrolling the LP.

## Hotspot Map

`#share`

- 「共有の街を見る」 -> `#shared-library`

`#shared-library`

- top tabs: 街を探す -> `#shared-library`, 人気の街 -> `#shared-popular`, 保存した街 -> `#shared-saved`
- first town card/details area -> `#shared-detail`
- right CTA 「この街を参考にする」 -> `#shared-adapt`
- right top 「自分の街を作る」 -> `/mvp`
- tag/chip 英語 -> `#shared-category-english`
- user name haru -> `#shared-profile`

`#shared-popular`

- tab 街を探す -> `#shared-library`
- tab 保存した街 -> `#shared-saved`
- first card -> `#shared-detail`
- CTA/create town -> `/mvp`

`#shared-saved`

- tab 街を探す -> `#shared-library`
- tab 人気の街 -> `#shared-popular`
- first card -> `#shared-detail`
- orange CTA -> `#shared-adapt`
- CTA/create town -> `/mvp`

`#shared-detail`

- primary CTA -> `#shared-adapt`
- save CTA -> `#shared-saved`
- profile/nav/user context -> `#shared-profile`
- header/create town -> `/mvp`

`#shared-adapt`

- primary CTA -> `#shared-imported`
- detail/back -> `#shared-detail`
- create/view own town -> `/mvp`

`#shared-imported`

- primary CTA -> `/mvp`
- secondary CTA -> `/mvp`

`#shared-profile`

- featured card CTA -> `#shared-detail`
- all towns/list CTA -> `#shared-library`
- create town -> `/mvp`

`#shared-category-english`

- first card -> `#shared-detail`
- bottom CTA -> `#shared-adapt`
- tab links -> shared library tabs

## Animation Map

- `.scroll-section.is-shared-flow .scroll-artboard`: short fade and 6px settle on entry.
- `.shared-flow-glow`: soft ambient radial glow behind shared artboards via pseudo-element.
- `.hotspot:hover`: subtle orange focus ring and translucent fill.
- `.hotspot:focus-visible`: visible keyboard outline.
- Respect `prefers-reduced-motion: reduce`.

## TODO List

### TODO 1: Asset Stabilization

Owner: Worker A

Files:

- `public/mockups/shared-flow/*`

Tasks:

- Copy generated mockups into `public/mockups/shared-flow/` with descriptive names.
- Confirm dimensions via `sips` or `file`.
- Do not delete originals in `.codex/generated_images`.

Acceptance:

- All referenced files exist under `public/mockups/shared-flow/`.
- Dimensions are recorded in the worker final note.

### TODO 2: Shared Flow Sections and Hotspots

Owner: Worker B

Files:

- `src/App.jsx`

Tasks:

- Add standalone shared flow page objects outside the LP `sections` array.
- Update `#shared-library` hotspots to connect to the new pages.
- Keep `navItems` unchanged.
- Keep `/mvp` and `/pro` standalone routing intact.

Acceptance:

- All new hash destinations are recognized by shared-flow hash handling.
- `#share` CTA reaches `#shared-library`.
- In-flow hotspots reach the intended standalone shared-flow pages or `/mvp`.
- LP scrolling does not include `section[id^="shared-"]`.
- No `#create-town` page is reintroduced.

### TODO 3: Shared Flow Animation CSS

Owner: Worker C

Files:

- `src/styles/index.css`

Tasks:

- Add shared-flow artboard animation and hotspot focus/hover styling.
- Keep existing LP and real sections visually unchanged.
- Add reduced-motion overrides.

Acceptance:

- No layout shift.
- No horizontal overflow caused by the new styles.
- Hover/focus feedback is subtle and does not obscure the mockup.

### TODO 4: Verification

Owner: Orchestrator

Tasks:

- Run `npm run build`.
- Use Browser Use on `http://127.0.0.1:5174/#share`.
- Verify `#share` -> `#shared-library`.
- Verify representative in-flow pages: `#shared-detail`, `#shared-adapt`, `#shared-imported`, `#shared-popular`, `#shared-saved`.
- Capture or inspect desktop view and confirm images are not broken.

Acceptance:

- Build passes.
- Browser shows the expected pages.
- The CTA and in-flow links are present in DOM.
- No console-level blocker is observed.

## Known Limits

Pixel-level fidelity is maximized by using generated mockups as artboards. The tradeoff is that internal mockup text is not independently selectable. Transparent hotspots provide interaction without altering the visual image.
