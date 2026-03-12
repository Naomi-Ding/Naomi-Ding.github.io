# Final Modification Review

## What changed
- Reworked the site navigation to center the public-facing structure around Home, Research, Publications, Teaching, Professional Service, and Contact.
- Rebuilt the publications experience around a display-eligible publication file, with per-publication detail pages and optional in-list abstract previews.
- Added a local graphical-abstract generation pipeline and generated SVG graphical abstracts for all current display-eligible publications.
- Added Teaching and Professional Service pages backed by the generated YAML content files.
- Refocused the Research page around first-authored and co-first-authored work plus LMFE, and added a dedicated DSQRM software case-study block.
- Removed Home-page count badges and added a concise Education section.
- Removed the CV tab from navigation while keeping the `/cv` route as a fallback page that only shows download controls if a public CV PDF exists.

## Routes and pages added
- `/publications/:slug`
- `/teaching`
- `/professional-service`

The `/cv` route remains as a fallback page but is no longer part of the top-level navigation.

## Publication logic now enforced
- The public site publication file includes only items that are clearly display-eligible:
  - published
  - accepted
  - forthcoming / in press
- Under-review, submitted, and unpublished items are excluded from `content/publications.generated.yaml`, so they do not appear on the site.
- Each displayed publication now has:
  - a stable slug
  - citation metadata
  - abstract text
  - a dedicated detail route
  - a graphical abstract path

## Graphical abstract status
- Missing graphical abstracts: none
- Current state: all 12 display-eligible publications have generated SVG graphical abstracts under `public/graphical-abstracts/`

## Manual user review still recommended
- Confirm whether a public paper URL should be exposed for the accepted Annals of Applied Statistics manuscript.
- Confirm whether the preserved DSQRM code URL resolves to the intended public repository, or replace it with the correct public link.
- Add exact course numbers and term-by-term assignments if you want the Teaching page to be more specific than the CV currently supports.
- Add talk titles, talk links, or session abstracts if you want the Professional Service page to carry richer presentation detail.
- Add `public/cv/cv.public.pdf` if a public-facing CV download should appear on Home and Contact.

## Where to edit content
- Teaching content: `content/teaching.generated.yaml`
- Professional Service content: `content/professional_service.generated.yaml`
- Publication metadata and public display logic inputs: `content/publications.generated.yaml`
- Publication graphical-abstract blueprints: `content/graphical_abstracts.generated.yaml`

## Where to edit DSQRM media and showcase behavior
- DSQRM metadata: `content/projects.generated.yaml`
- DSQRM showcase UI and workflow viewer: `src/components/SoftwareShowcase.tsx`
- Generated publication graphical abstract for the DSQRM paper: `public/graphical-abstracts/distribution-on-scalar-single-index-quantile-regression.svg`

## Validation summary
- Navigation now exposes Home, Research, Publications, Teaching, Professional Service, and Contact.
- The CV tab is gone from navigation.
- Home has no count badges.
- Publication detail pages are wired by slug and degrade cleanly when optional fields are absent.
- The project builds successfully with `npm run build`.
