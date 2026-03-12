# Personal academic website

This repository contains the source code for my personal academic website.

## Privacy-aware workflow

This project is set up so that Codex can read private local source documents without committing them to GitHub.

### Private local source files
These may exist locally and be used for generation, but should remain untracked:
- `inputs/site_seed.local.yaml`
- `inputs/raw_cv/cv.pdf`
- `inputs/project_papers/*`

### Public committed outputs
These are intended to be committed:
- `content/profile.generated.yaml`
- `content/publications.generated.yaml`
- `content/projects.generated.yaml`
- `content/missing_items.md`
- `public/figures/*` selected for the website
- `public/cv/cv.public.pdf` only if I want a public downloadable CV
- website source code

## Local development

```bash
npm install
npm run dev