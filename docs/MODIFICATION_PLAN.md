# Modification Plan

## Scope
This plan covers the minimum-change path for redesigning the current academic website in place. The existing Vite, React, React Router, YAML-content, and CSS architecture should be preserved.

## Current Site Structure

### Stack and deployment
- Frontend: Vite + React 19 + TypeScript
- Routing: `HashRouter` in `src/main.tsx`
- Route table: `src/App.tsx`
- Styling: single shared stylesheet in `src/index.css`
- Content loading: `src/lib/content.ts` imports committed YAML files with `?raw` and normalizes them with `js-yaml`
- GitHub Pages compatibility: already configured through `HashRouter` and `base: './'` in `vite.config.ts`

### Current routes
- `/` -> `Home`
- `/home` -> redirect to `/`
- `/research` -> `Research`
- `/publications` -> `Publications`
- `/cv` -> `CV`
- `/contact` -> `Contact`
- `*` -> `NotFound`

### Current shared components
- `Layout` handles navigation, header, footer, and route outlet
- `SectionHeader` provides consistent page/section headings
- `PublicationItem` renders publication cards
- `ProjectCard` renders figure-backed research cards

### Current content pipeline
- Loaded today:
  - `content/profile.generated.yaml`
  - `content/publications.generated.yaml`
  - `content/projects.generated.yaml`
- Present but not wired into the app:
  - `content/teaching.generated.yaml`
  - `content/professional_service.generated.yaml`
  - `content/missing_items.md`

### Current content observations
- Home currently includes count badges and a CV button.
- Publications currently displays all entries, including `under review / submitted`.
- Publications schema is very shallow: title, authors, year, venue, status, topic, paper URL, code URL, notes.
- Research currently renders every project in `projects.generated.yaml` as a flat archive.
- `projects.generated.yaml` does not currently include DSQRM and includes projects that should likely be removed from the public research page under the new rules.
- Teaching and Professional Service content files exist but are effectively placeholders.
- Profile content does not currently include structured education data.

## Minimum-Change Implementation Strategy

### Keep as-is
- Vite + React app shell
- `HashRouter`
- Current visual language, card system, button styles, and Yale-blue palette
- YAML-first content workflow
- Existing `Layout`, `SectionHeader`, `PublicationItem`, and `ProjectCard` as starting points

### Change incrementally
- Remove the CV tab from primary navigation instead of replacing the whole header layout.
- Extend the existing content loader instead of introducing a CMS or new storage format.
- Add a small number of new page components and lightweight reusable components instead of replacing page structure wholesale.
- Keep publication list rendering on the current Publications page, then layer detail pages and optional accordion previews on top.

## Proposed Route Changes

### Navigation target
- Home
- Research
- Publications
- Teaching
- Professional Service
- Contact

### Route table changes
- Keep:
  - `/`
  - `/home` redirect
  - `/research`
  - `/publications`
  - `/contact`
- Add:
  - `/publications/:slug`
  - `/teaching`
  - `/professional-service`
- Remove from navigation:
  - `/cv`

### CV handling
- Remove the dedicated `CV` tab.
- Minimum-change option:
  - replace the `/cv` page route with a redirect to `/contact` or `/`
  - keep a conditional CV button on Home and/or Contact only when `public/cv/cv.public.pdf` exists
- Reason:
  - this preserves compatibility with old links while satisfying the no-CV-tab requirement

## Proposed Content Model Changes

### 1. Profile / Home
Current gap:
- `profile.generated.yaml` has no structured education block.

Recommended extension:
- add `education` to the profile model, for example:
  - institution
  - degree
  - field
  - year or year range
  - optional note

Why:
- Education belongs naturally on Home and does not justify a full new top-level content file.

Source dependency:
- needs to be derived from the local CV or official academic profile because it is not present in committed content today

### 2. Publications
Current gap:
- the current schema is enough for a compact list, but not enough for filtered detail pages with abstracts and graphical abstracts.

Recommended extension:
- add `slug`
- add normalized status support:
  - either `status_category`
  - or a stricter status whitelist derived in code from the existing `status` values
- add `abstract`
- add `keywords` or reuse `topic` as a list
- add `graphical_abstract`
- add `graphical_abstract_alt`
- optionally add:
  - `short_citation`
  - `related_project_slug`
  - `is_first_or_cofirst`

Display rule:
- only render items whose status is clearly one of:
  - published
  - accepted
  - forthcoming / in press

Implementation note:
- the current freeform `status` strings are brittle for filtering.
- minimum-change path:
  - keep `status` for display
  - add a normalized status category for logic

### 3. Projects / Research
Current gap:
- `projects.generated.yaml` is a flat list and is not aligned to the new curation rules.

Recommended extension:
- add fields such as:
  - `theme`
  - `featured_on_research`
  - `authorship_role`
  - `project_type` or `highlight_type`
  - optional `media` array for software showcase items

Why:
- this lets the existing Research page continue to draw from `projects.generated.yaml`
- it avoids introducing a brand-new research-specific content file unless later needed

Research curation target:
- include only:
  - first-authored work
  - co-first-authored work
  - LMFE
- exclude general co-authored items that do not meet that rule
- group the remaining items into a small number of research themes

### 4. Teaching
Current state:
- `content/teaching.generated.yaml` exists but is an empty placeholder.

Recommended approach:
- keep the existing file name
- add TypeScript types and a loader in `src/lib/content.ts`
- render a new `Teaching` page from this file

Likely fields are already sufficient:
- role
- course_title
- course_number
- institution
- term
- year
- summary
- materials_url

Source dependency:
- content likely needs to be inferred from the CV or official course/department sources

### 5. Professional Service
Current state:
- `content/professional_service.generated.yaml` exists but is empty.

Recommended approach:
- keep the existing file name and sectioned structure
- add TypeScript types and a loader
- render a new `Professional Service` page from this file

Source dependency:
- content likely needs to be inferred from the CV or official public sources

## Components That Can Be Reused
- `Layout`
  - update nav items only
- `SectionHeader`
  - reusable for Teaching, Professional Service, publication detail pages, and Home education block
- `PublicationItem`
  - can remain the compact in-list card if extended to support a detail link and optional accordion preview
- `ProjectCard`
  - reusable for research highlights with modest prop expansion
- existing card/grid/button CSS
  - sufficient for new pages and lightweight interactive elements

## New Components / Pages / Routes Needed

### New pages
- `src/pages/Teaching.tsx`
- `src/pages/ProfessionalService.tsx`
- `src/pages/PublicationDetail.tsx`

### Likely new components
- `PublicationAccordion` or an expanded `PublicationItem`
  - optional abstract preview on the list page
- `PublicationDetailLayout` or similar
  - title, citation metadata, verified links, abstract, graphical abstract
- `EducationSection`
  - concise Home-only block
- `ResearchThemeSection`
  - groups curated projects into a few themes
- `SoftwareShowcase`
  - DSQRM media panel, screenshot carousel, or slideshow
- optional shared helper:
  - CV-availability hook if the Home and Contact pages both need the same public CV check

## DSQRM Asset Audit

### What exists now in this repo
- DSQRM is referenced in `content/publications.generated.yaml` as the code URL for:
  - `Distribution-on-scalar Single-index Quantile Regression Model for Handling Tumor Heterogeneity.`
- There is no DSQRM entry in `content/projects.generated.yaml`.
- There are no committed DSQRM GIF, MP4, WebM, screenshot, or other showcase assets in `public/`.
- A likely related local source paper exists at:
  - `inputs/project_papers/BMSQRM.pdf`

### Current conclusion
- DSQRM assets do not currently live in the public site repo as reusable media.
- The redesign should assume DSQRM showcase media must be obtained from the linked GitHub repository or generated from real screenshots/assets found there during the implementation phase.
- If no real media can be recovered, the safe fallback is a clean static carousel or screenshot grid built only from verified assets.

## Missing Source Content That Must Be Inferred Later
- Education entries for Home
- Teaching roles and course metadata
- Professional Service entries
- Publication abstracts for detail pages where not already available in local generated content
- Graphical abstracts for publications
- DSQRM interface screenshots or motion assets

Primary expected sources:
- `inputs/raw_cv/ShengxianDing_CV_202603.pdf`
- linked official profile pages
- linked code repositories for display-eligible publications only

Constraint observed during audit:
- PDF extraction from the local CV is not currently usable in this sandbox because MiKTeX poppler tools fail during first-run setup. That does not block planning, but it does mean some structured content still needs a later extraction path.

## Risks and Edge Cases
- Publication filtering is currently dependent on freeform status strings.
  - Without normalization, future content updates could accidentally expose submitted work.
- Publication detail routes need stable slugs.
  - Slugs should be generated once and stored, not recomputed ad hoc from titles in multiple places.
- Publication detail pages must not assume abstracts or graphical abstracts exist.
  - all abstract/media blocks need null-safe rendering
- `HashRouter` means the effective public URL will be `#/publications/<slug>`.
  - this is compatible with GitHub Pages and should not be changed unless deployment strategy changes
- The current `PublicationItem` meta separator renders as `Â·`.
  - this encoding issue should be corrected while touching publication UI
- Teaching and Professional Service pages may initially render sparse content if the CV extraction step is incomplete.
  - the pages should include graceful empty states
- DSQRM showcase quality depends on real assets.
  - do not fabricate interface screens from paper text alone
- Home CV button logic currently lives only on the dedicated CV page.
  - if a Home/Contact CV button remains, the file-existence check should be shared or simplified

## Recommended Next Files To Change

### First pass: routing and content wiring
- `src/App.tsx`
- `src/components/Layout.tsx`
- `src/lib/content.ts`
- `src/types/content.ts`

### New pages/components
- `src/pages/Teaching.tsx`
- `src/pages/ProfessionalService.tsx`
- `src/pages/PublicationDetail.tsx`
- `src/components/PublicationItem.tsx`
- optional new components for education, publication detail, research themes, and DSQRM showcase

### Content files
- `content/profile.generated.yaml`
- `content/publications.generated.yaml`
- `content/projects.generated.yaml`
- `content/teaching.generated.yaml`
- `content/professional_service.generated.yaml`
- `content/missing_items.md`

### Styling
- `src/index.css`

## Recommended Implementation Order
1. Extend types and loaders for teaching, professional service, education, and publication-detail fields.
2. Update routing and navigation to remove CV from the nav and add Teaching, Professional Service, and publication detail routes.
3. Filter Publications to display only accepted/forthcoming/published entries.
4. Add publication detail pages and optional list-page accordion previews.
5. Refactor Research to use curated themed entries only, including LMFE and a dedicated DSQRM software showcase.
6. Add Home education block and remove count badges.
7. Add CV button only as a conditional action on Home and/or Contact if the public PDF exists.
