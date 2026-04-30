# みちまち Pixel-Locked Web Implementation Plan

## Goal

Create a React + Tailwind CSS website from the seven supplied 1536x1024 mockups, preserving the UI at pixel level. The mockups are the visual source of truth. The site must not reinterpret the design, change the page order, or invent a new visual system.

Because the references contain complex isometric art, exact Japanese typography, route paths, card layouts, icon labels, and active navigation states in one raster composition, the implementation uses each mockup as a locked UI artboard for its corresponding page. React supplies routing, accessible click targets, page metadata, and animation layers that settle into the exact static mockup pixels.

## Stack

- Vite
- React
- Tailwind CSS
- lucide-react only for non-visible/accessibility-adjacent helper UI if needed
- Browser Use for visual verification

## Reference Pages

All pages are 1536x1024 PNG references.

| Page key | Route hash | Reference path | Purpose |
| --- | --- | --- | --- |
| top | `#/top` | `/mockups/mockup-01-top.png` | Primary hero |
| route | `#/route` | `/mockups/mockup-04-route.png` | 6-week route |
| usage | `#/usage` | `/mockups/mockup-07-usage.png` | Usage flow |
| growth | `#/growth` | `/mockups/mockup-03-growth.png` | City growth |
| share | `#/share` | `/mockups/mockup-05-share.png` | Shared towns |
| pro | `#/pro` | `/mockups/mockup-02-pro.png` | Pro dashboard |
| pricing | `#/pricing` | `/mockups/mockup-06-pricing.png` | Pricing and beta signup |

The source Downloads files must remain copied into `public/mockups` under the stable names above.

## Asset Audit

Worker A verified the seven stable mockup files are present in `public/mockups`, each is 1536x1024, and each byte-matches one supplied Downloads source:

| Stable mockup | Source Downloads file |
| --- | --- |
| `mockup-01-top.png` | `ig_0331c564cf12d9bc0169f1535839348191a6eb8369028b2ffc.png` |
| `mockup-04-route.png` | `ig_0331c564cf12d9bc0169f15560d0848191ba0f9d32caf6bfde.png` |
| `mockup-07-usage.png` | `ig_0331c564cf12d9bc0169f155f2b50081918faf2d90f6f7aafa.png` |
| `mockup-03-growth.png` | `ig_0331c564cf12d9bc0169f15686b9ec8191b4ef51257b73718b.png` |
| `mockup-05-share.png` | `ig_0331c564cf12d9bc0169f1574deb508191abc3f7294e19fe7b.png` |
| `mockup-02-pro.png` | `ig_0331c564cf12d9bc0169f158209a9c81919cbc429a9c8be0d7.png` |
| `mockup-06-pricing.png` | `ig_0331c564cf12d9bc0169f158e51e4881918ae9d14c1154e4b1.png` |

Generated reusable assets exist in `public/assets/generated` and copied/project-bound assets exist in `public/assets/michimachi`. The non-artboard cutouts in `public/assets/michimachi` have alpha channels for future transparent use.

## Asset Strategy

- Live visual UI: the exact mockup PNG for each page.
- Transparent icons/assets: already available generated PNG cutouts in `public/assets/michimachi` and `public/assets/generated`; keep them as the project-bound imagegen-derived asset library.
- Do not use approximate DOM recreations of the isometric town, handwritten paths, Japanese labels, or card interiors when the mockup already contains them exactly.
- Click targets are transparent overlays, so they do not alter the mockup pixels.
- Animation is applied to page container opacity/transform, ambient light overlays, and hotspot affordances only where it does not obscure or rewrite the reference UI.

## Layout Contract

- Desktop baseline: 1536x1024. At this viewport the artboard should render 1:1.
- Wider desktop: center the 1536px artboard on a warm page background.
- Narrow desktop/tablet/mobile: scale the artboard proportionally to the available width with no horizontal overflow.
- Preserve the 3:2 aspect ratio.
- No extra visible page chrome outside the mockup except an optional subtle background behind the artboard.
- Do not add visible explanatory copy, extra cards, floating controls, or decorative elements.

## Interaction Contract

- Header navigation areas map to routes:
  - トップ -> `#/top`
  - 6週間ルート -> `#/route`
  - 使い方 -> `#/usage`
  - 街の成長 -> `#/growth`
  - 共有の街 -> `#/share`
  - Pro -> `#/pro`
  - 料金 -> `#/pricing`
- Primary CTAs map to `#/pricing` unless the source page implies signup.
- Pricing page email field and questionnaire areas may be transparent form overlays only if they do not change visible pixels.
- Keyboard focus rings can appear only during focus and must not affect the default screenshot.

## Animation Map

- Initial page load: quick fade/settle of the artboard, final state exactly aligned to the reference.
- Page switch: 180-240ms opacity/translate transition, final state exact.
- Ambient route glow: use a transparent overlay with very low opacity and `mix-blend-mode: screen`; it must be subtle enough that screenshots still read as the source UI.
- Reduced motion: disable all transforms and glow, keep only static artboard.

## TODO / Worker Ownership

### Worker A: Asset and Plan Audit

Ownership:

- `IMPLEMENTATION_PLAN.md`
- `public/mockups/*`
- `public/assets/michimachi/*` only for audit or non-destructive additions

Acceptance:

- Confirm all seven mockups exist and are 1536x1024.
- Confirm mockup names match the route map.
- Confirm generated transparent assets exist for future non-artboard use.
- Do not edit `src/App.jsx` or `src/styles/index.css`.

### Worker B: React Structure

Ownership:

- `src/App.jsx`
- optional new files under `src/data/`

Acceptance:

- Implement the seven page definitions.
- Implement hash routing with a safe default to `#/top`.
- Render one page artboard at a time.
- Add transparent navigation and CTA hotspot anchors.
- Preserve accessible labels without adding visible text.
- Do not edit CSS.

### Worker C: Tailwind/CSS Pixel Layer

Ownership:

- `src/styles/index.css`
- optional Tailwind config changes only if needed

Acceptance:

- Render the artboard at 1536x1024 1:1 on matching viewport.
- Scale down proportionally with no horizontal overflow.
- Add stable page transition and restrained ambient animation.
- Ensure default visible pixels are the mockup, not an approximation.
- Keep focus/hover states non-layout-shifting.

### Worker D: Browser Use Validation

Ownership:

- `tmp/screenshots/*`
- focused repairs only after the owning worker result is known

Acceptance:

- Run `npm run build`.
- Start the Vite dev server.
- Use Browser Use to inspect the local site.
- Capture/inspect desktop around 1536x1024 and mobile around 390px width.
- Verify all seven hash routes render the correct reference page.
- Report concrete mismatches or apply tightly scoped fixes.

## Verification Criteria

- `npm run build` passes.
- Browser Use confirms every route renders.
- Desktop `1536x1024` page should visually match the corresponding PNG at a glance and by geometry.
- No broken images.
- No horizontal overflow on mobile.
- No visible extra UI or explanatory content appears over the mockup.
- Animations never leave the page shifted, blurred, transparent, or mis-scaled after settling.

## Known Fidelity Boundary

True pixel-level fidelity is only achievable here by preserving the raster mockups as the final visual artboards. A full DOM reconstruction would be less faithful because the exact generated illustration layers, icon drawings, and Japanese text rendering are not available as separate source files.
