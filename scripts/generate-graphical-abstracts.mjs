import fs from 'node:fs'
import path from 'node:path'
import { load } from 'js-yaml'

const repoRoot = process.cwd()
const publicationsPath = path.join(repoRoot, 'content', 'publications.generated.yaml')
const blueprintsPath = path.join(repoRoot, 'content', 'graphical_abstracts.generated.yaml')
const outputDir = path.join(repoRoot, 'public', 'graphical-abstracts')

const publicationsRaw = fs.readFileSync(publicationsPath, 'utf8')
const blueprintsRaw = fs.readFileSync(blueprintsPath, 'utf8')

const publicationsDoc = load(publicationsRaw) ?? { publications: [] }
const blueprintsDoc = load(blueprintsRaw) ?? { graphical_abstracts: [] }

const publications = Array.isArray(publicationsDoc.publications) ? publicationsDoc.publications : []
const blueprints = Array.isArray(blueprintsDoc.graphical_abstracts)
  ? blueprintsDoc.graphical_abstracts
  : []

fs.mkdirSync(outputDir, { recursive: true })

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function wrapText(value, maxChars, maxLines = 4) {
  const words = String(value).split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars) {
      current = candidate
      continue
    }

    if (current) lines.push(current)
    current = word
  }

  if (current) lines.push(current)

  if (lines.length <= maxLines) return lines

  const clipped = lines.slice(0, maxLines)
  const lastLine = clipped[maxLines - 1]
  clipped[maxLines - 1] = `${lastLine.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`
  return clipped
}

function renderTextLines(lines, x, y, lineHeight, cssClass) {
  return `<text x="${x}" y="${y}" class="${cssClass}">${lines
    .map((line, index) =>
      `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('')}</text>`
}

function chipWidth(label) {
  return 36 + label.length * 7.2
}

function renderChips(chips) {
  let currentX = 64
  return chips
    .slice(0, 4)
    .map((chip) => {
      const width = chipWidth(chip)
      const markup = `
        <g transform="translate(${currentX}, 600)">
          <rect width="${width}" height="36" rx="18" fill="#E9F0F7" stroke="#C9D8E8" />
          <text x="${width / 2}" y="23" class="chip-text" text-anchor="middle">${escapeXml(chip)}</text>
        </g>
      `
      currentX += width + 14
      return markup
    })
    .join('')
}

function renderPanel(panel, index) {
  const panels = [
    { key: 'problem', label: 'Problem', x: 64, color: '#F4F7FB' },
    { key: 'method', label: 'Method', x: 350, color: '#EDF3F9' },
    { key: 'data', label: 'Application', x: 636, color: '#F4F7FB' },
    { key: 'contribution', label: 'Contribution', x: 922, color: '#EDF3F9' }
  ]

  const config = panels[index]
  const lines = wrapText(panel[config.key], 25, 7)

  return `
    <g>
      <rect x="${config.x}" y="208" width="250" height="300" rx="22" fill="${config.color}" stroke="#C9D8E8" />
      <text x="${config.x + 24}" y="244" class="panel-label">${config.label}</text>
      ${renderTextLines(lines, config.x + 24, 282, 28, 'panel-text')}
    </g>
  `
}

function renderConnectors() {
  return `
    <line x1="314" y1="358" x2="350" y2="358" stroke="#7A9ABE" stroke-width="3" stroke-linecap="round" />
    <line x1="600" y1="358" x2="636" y2="358" stroke="#7A9ABE" stroke-width="3" stroke-linecap="round" />
    <line x1="886" y1="358" x2="922" y2="358" stroke="#7A9ABE" stroke-width="3" stroke-linecap="round" />
  `
}

function createSvg(publication, blueprint) {
  const titleLines = wrapText(blueprint.title_short || publication.title, 34, 2)
  const topicLine = publication.topic ? wrapText(publication.topic, 60, 1) : []
  const chips = Array.isArray(blueprint.tags) ? blueprint.tags.map(String) : []

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="680" viewBox="0 0 1200 680" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="${publication.slug}-title ${publication.slug}-desc">
  <title id="${publication.slug}-title">${escapeXml(publication.title)}</title>
  <desc id="${publication.slug}-desc">Graphical abstract summarizing the problem, method, application, and contribution for ${escapeXml(publication.title)}.</desc>
  <defs>
    <linearGradient id="headerGradient" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00356B" />
      <stop offset="1" stop-color="#335D8A" />
    </linearGradient>
  </defs>
  <rect width="1200" height="680" rx="28" fill="#FFFFFF" />
  <rect width="1200" height="164" rx="28" fill="url(#headerGradient)" />
  <rect y="164" width="1200" height="516" rx="0" fill="#FBFCFE" />
  <style>
    .kicker { font: 700 16px 'Aptos', 'Segoe UI', sans-serif; letter-spacing: 0.14em; text-transform: uppercase; fill: #D6E3F1; }
    .title { font: 700 34px 'Iowan Old Style', 'Palatino Linotype', serif; fill: #FFFFFF; }
    .subtitle { font: 500 16px 'Aptos', 'Segoe UI', sans-serif; fill: #D6E3F1; }
    .panel-label { font: 700 16px 'Aptos', 'Segoe UI', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; fill: #00356B; }
    .panel-text { font: 500 22px 'Aptos', 'Segoe UI', sans-serif; fill: #1B2430; }
    .chip-text { font: 600 16px 'Aptos', 'Segoe UI', sans-serif; fill: #00356B; }
  </style>
  <text x="64" y="54" class="kicker">Graphical abstract</text>
  ${renderTextLines(titleLines, 64, 98, 40, 'title')}
  ${topicLine.length > 0 ? renderTextLines(topicLine, 64, 148, 20, 'subtitle') : ''}
  ${renderConnectors()}
  ${[0, 1, 2, 3].map((index) => renderPanel(blueprint, index)).join('')}
  ${renderChips(chips)}
</svg>
`
}

const blueprintBySlug = new Map(
  blueprints
    .filter((item) => typeof item === 'object' && item !== null && item.slug)
    .map((item) => [item.slug, item])
)

const generated = []
const skipped = []

for (const publication of publications) {
  const blueprint = blueprintBySlug.get(publication.slug)
  if (!blueprint) {
    skipped.push(publication.slug)
    continue
  }

  const outputPath = path.join(outputDir, `${publication.slug}.svg`)
  fs.writeFileSync(outputPath, createSvg(publication, blueprint))
  generated.push(publication.slug)
}

console.log(`Generated ${generated.length} graphical abstracts.`)

if (skipped.length > 0) {
  console.log(`Skipped ${skipped.length} publications without blueprints: ${skipped.join(', ')}`)
}
