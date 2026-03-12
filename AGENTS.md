# AGENTS.md

## Repository goal
Modify the EXISTING personal academic website in place. Do not rebuild the site from scratch unless a small targeted rewrite is clearly necessary.

The site is for Shengxian Ding and should remain:
- professional
- academic
- postdoc-ready
- visually restrained
- easy to maintain
- GitHub Pages compatible

Preserve the current stack and architecture where practical.

## High-level redesign goals
Implement the following content and navigation changes:

### Navigation
The preferred top-level navigation is:
- Home
- Research
- Publications
- Teaching
- Professional Service
- Contact

Remove:
- CV tab

### Home
- Remove any count badges / metrics such as:
  - total works
  - published count
  - project count
- Keep the hero clean and focused.
- Add or keep a concise Education section on the Home page.
- Do not create a separate Education tab unless the current site structure makes that materially cleaner.
- If a public CV file exists, a CV button may remain on Home or Contact, but there should be no dedicated CV tab.

### Publications
Only DISPLAY publications that are clearly one of:
- published
- accepted
- forthcoming / in press

Do NOT display:
- under review
- submitted
- in preparation
- unpublished

For each displayed publication:
- add a dedicated detail page route if feasible, e.g. `/publications/:slug`
- optionally keep a toggle / accordion summary on the publication list page
- include:
  - citation-style metadata
  - paper link if verified
  - code link if verified
  - text abstract if available from local source materials or an official public source
  - graphical abstract if available or generated
- do not fabricate abstracts, claims, or scientific conclusions

### Graphical abstracts
Goal: each displayed publication may have a graphical abstract.

Allowed strategy order:
1. If the current Codex environment has a working browser / MCP integration that can access NotebookLM or a similar supported external workflow, it may be used to assist with extracting or structuring content.
2. Otherwise, generate graphical abstracts locally using Codex itself.

Default fallback:
- generate a clean, minimal SVG-based graphical abstract from:
  - title
  - abstract
  - 2-4 supported key ideas
  - method / data / outcome structure if clearly supported
- save outputs into a public directory such as:
  - `public/graphical-abstracts/`

Graphical abstract rules:
- never invent scientific content
- keep visuals minimal and professional
- prefer vector SVG when possible
- use text sparingly
- if information is insufficient, skip the graphical abstract and log the reason

### Research
Refocus the Research section so it includes only:
- first-authored papers/projects
- co-first-authored papers/projects
- the LMFE project

Do NOT treat every publication as a standalone research project.

Instead:
- group projects into coherent research themes
- connect related projects across methods / applications where appropriate
- keep the page interpretable and not overcrowded

### DSQRM software showcase
Create a stronger software showcase for DSQRM.

Requirements:
- find the DSQRM app / mlapp materials from the existing linked GitHub repository if available
- inspect the README and example images
- prefer dynamic media in this order:
  1. existing GIF / MP4 / WebM if already available
  2. generate a lightweight animated slideshow from existing screenshots if appropriate
  3. create an interactive screenshot carousel / step-through viewer
- do not fabricate screens that are not supported by repo assets
- explain the software clearly:
  - what it does
  - who it is for
  - what problem it solves
  - what the interface demonstrates

### Teaching
Add a Teaching tab/page.

Content may include:
- teaching assistant roles
- instructor roles
- guest lectures
- mentoring if supported and appropriate
- course names, institution, term, short description

Generate structured content if source data exists in:
- current repo content files
- local CV
- linked public profile / department pages
- other official public sources

### Professional Service
Preferred tab name:
- Professional Service

Do not use:
- Services

Professional Service may include:
- journal reviewing
- conference reviewing
- session organizing
- workshop organizing
- chairing
- committee roles
- editorial roles
- invited talks
- conference presentations if appropriate

Do NOT include generic conference attendance by default.

If there is substantial material on talks / presentations, it is acceptable to create a subsection such as:
- Selected Talks & Presentations
or
- Professional Activities

### Contact
Keep Contact clean and professional.
May include:
- email
- GitHub
- Google Scholar
- ORCID
- LinkedIn
- department / lab page

## Publication-status policy
Be conservative.

Display only entries that are clearly:
- published
- accepted
- forthcoming / in press

Use CV section headers and explicit wording to infer status. When status is ambiguous, do not display the item until resolved.

## Link-resolution policy
Use web search to verify or supplement missing paper/code links ONLY for entries that are clearly display-eligible:
- published
- accepted
- forthcoming / in press

Do NOT use web search to infer missing paper/code links for:
- under review
- submitted
- in preparation
- unpublished

Preserve user-provided public URLs exactly.

Preferred paper link priority:
1. DOI landing page
2. official publisher page
3. arXiv page
4. PubMed or institutional repository

Preferred code link priority:
1. author GitHub repository
2. lab / organization GitHub repository
3. official project page

Never hallucinate a URL.

## Existing-site modification policy
Work from the existing repository state.

Prefer:
- incremental edits
- reusable components
- minimal route churn
- preserving current styling system where sensible

Avoid:
- full project rewrites
- replacing the stack
- introducing heavy new dependencies unless clearly justified

## Content-generation policy
If existing generated content files are present, extend or transform them instead of replacing useful manual edits.

It is acceptable to create or update files such as:
- `content/teaching.generated.yaml`
- `content/professional_service.generated.yaml`
- `content/publications.generated.yaml`
- `content/projects.generated.yaml`
- `content/missing_items.md`

## Accessibility and design
Keep the visual style:
- minimal
- academic
- calm
- high readability
- Yale-inspired blue palette
- no gimmicky metrics or dashboard-style badges
- no flashy animations

Use:
- semantic HTML
- keyboard accessibility
- good contrast
- responsive layouts

## Build and validation
After each substantial modification:
- run the local build
- fix broken routes
- ensure no missing imports
- ensure graceful fallbacks for missing content
- ensure publication pages do not crash when abstracts or graphical abstracts are absent

## Definition of done
The modification is complete when:
1. navigation reflects the new structure
2. CV tab is removed
3. publications page shows only accepted/published/forthcoming items
4. each displayed publication has a detail-page experience or accordion-plus-detail pattern
5. graphical abstracts are included when supported and skipped gracefully otherwise
6. Teaching and Professional Service pages exist
7. Research is refocused around first/co-first work and LMFE
8. DSQRM has a stronger dynamic showcase
9. count badges are removed
10. the site builds cleanly