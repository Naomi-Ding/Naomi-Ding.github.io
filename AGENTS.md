# AGENTS.md

## Project goal
Build and maintain a personal academic website for Shengxian Ding, suitable for postdoc applications. The site should be static, professional, minimal, and deployable on GitHub Pages.

## Critical privacy rule
This repository uses LOCAL PRIVATE INPUTS for content generation.

Codex may read local files in the working directory, including ignored files, but ignored files must NOT be added, committed, or pushed unless explicitly instructed.

Never stage or commit files that match `.gitignore`.

## Local private source files
These files may exist locally and may be used for generation, but they are private by default:
- `inputs/site_seed.local.yaml`
- `inputs/raw_cv/cv.pdf`
- `inputs/project_papers/*`

These are source materials only. They should not be committed unless the user explicitly requests it.

## Public / commit-allowed outputs
These files are intended to be committed if they are public-facing:
- `content/profile.generated.yaml`
- `content/publications.generated.yaml`
- `content/projects.generated.yaml`
- `content/missing_items.md`
- `public/figures/*` chosen for the website
- `public/cv/cv.public.pdf` only if the user wants a public downloadable CV
- website source code and deployment files

## Source priority
Use source materials in this order:
1. `inputs/site_seed.local.yaml` if present
2. `inputs/raw_cv/cv.pdf` if present
3. local paper PDFs in `inputs/project_papers/`
4. existing generated content in `content/`
5. web search only to verify or supplement missing public metadata and public links

## Publication-status policy
Classify publications into these buckets whenever possible:
- published
- accepted / forthcoming
- preprint
- under review / submitted
- in preparation / unpublished

Use CV section headers and keywords to infer status conservatively.

## Link-resolution policy
Web search is allowed ONLY for entries that are clearly:
- published, or
- accepted / forthcoming with a public venue page, DOI, or clearly public paper page

For those entries, use web search to verify or supplement:
- official paper URLs
- official code URLs
- venue metadata when missing

Do NOT use web search to infer missing paper/code links for:
- under review
- submitted
- in preparation
- unpublished manuscripts

Exception:
- If the user already provided a public URL for an under-review or preprint item, preserve it exactly.
- If the CV explicitly contains a public arXiv / bioRxiv / project / GitHub link, preserve it exactly.
- Do not "hunt" for missing links for unpublished items.

Preferred paper link priority:
1. DOI landing page
2. official publisher page
3. arXiv page
4. PubMed or institutional repository

Preferred code link priority:
1. author's GitHub repository
2. lab / organization GitHub repository
3. official project page

Never hallucinate a URL.

## Content generation rules
Generate:
- `content/profile.generated.yaml`
- `content/publications.generated.yaml`
- `content/projects.generated.yaml`
- `content/missing_items.md`

Do not invent:
- titles
- authors
- venues
- years
- URLs
- repositories
- project claims

If uncertain, leave blank and log the issue in `content/missing_items.md`.

## Figure rules
Preferred figure sources:
1. local paper PDFs in `inputs/project_papers/`
2. existing images already in `public/figures/`
3. public figure assets only if clearly appropriate and reusable

If a representative figure is extracted or prepared for the site, save it in `public/figures/`.

When choosing figures:
- prefer clear main-paper figures over dense supplements
- prefer method overviews, workflow diagrams, or crisp result figures
- avoid tables as figures unless they are especially informative
- write concise alt text and captions

If no reliable figure is available:
- leave the figure blank
- keep layout graceful
- log the missing item

## CV rules
Never assume the raw CV PDF should be public.

If the website includes a downloadable CV:
- use `public/cv/cv.public.pdf`
- only reference that public file in the built site

If `public/cv/cv.public.pdf` does not exist:
- render the CV page with a graceful fallback
- do not break the build

## Design requirements
- professional academic
- postdoc-ready
- restrained Yale-inspired palette centered on `#00356b`
- clean typography
- generous whitespace
- no flashy animations
- no Yale logo or official marks unless explicitly provided

## Site sections
- Home
- Research
- Publications
- CV
- Contact

## Technical requirements
- React + TypeScript + Vite
- static only
- mobile responsive
- accessible
- GitHub Pages deployment
- build must succeed with `npm run build`

## Definition of done
The project is complete when:
1. private local sources were used without being committed
2. generated content files exist
3. public site assets are separated from private inputs
4. the site builds successfully
5. the website is ready for GitHub Pages