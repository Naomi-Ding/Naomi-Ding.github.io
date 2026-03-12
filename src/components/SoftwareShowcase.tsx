import { useState } from 'react'
import { Link } from 'react-router-dom'
import { withBase } from '../lib/content'
import type { Project } from '../types/content'

interface ShowcaseStep {
  label: string
  title: string
  description?: string
  details: string[]
  image?: string
  imageAlt?: string
  imageCaption?: string
}

interface ShowcaseFact {
  label: string
  text: string
}

interface SoftwareShowcaseProps {
  project: Project
  steps: ShowcaseStep[]
  kicker?: string
  title?: string
  summary?: string
  facts?: ShowcaseFact[]
  publicationLabel?: string
  codeLabel?: string
  codeUrl?: string
  showPaper?: boolean
}

export function SoftwareShowcase({
  project,
  steps,
  kicker = 'Software showcase',
  title,
  summary,
  facts,
  publicationLabel = 'Publication detail',
  codeLabel = 'Code',
  codeUrl,
  showPaper = true
}: SoftwareShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex]
  const hasMultipleSteps = steps.length > 1
  const showcaseTitle = title || project.title
  const showcaseSummary = summary || project.summary
  const showcaseCodeUrl = codeUrl || project.code_url
  const showcaseFacts = facts || [
    {
      label: 'Overview',
      text: 'Packages DSQRM for distributional imaging analysis in a standalone interface.'
    },
    {
      label: 'Users',
      text: 'Built for collaborators working with heterogeneous imaging outcomes.'
    },
    {
      label: 'Value',
      text: 'Makes the workflow easier to share, demonstrate, and run outside a script-only prototype.'
    }
  ]

  return (
    <section className="software-showcase card">
      <div className="card-body software-showcase-grid">
        <div className="software-viewer">
          {hasMultipleSteps ? (
            <div className="software-step-nav" role="tablist" aria-label="Software showcase viewer">
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  className={index === activeIndex ? 'software-step software-step-active' : 'software-step'}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  aria-selected={index === activeIndex}
                >
                  <span className="software-step-index">{index + 1}</span>
                  <span>{step.label}</span>
                </button>
              ))}
            </div>
          ) : null}

          <div className="software-panel" role="tabpanel">
            <div className="software-panel-frame">
              <div className="software-panel-rail" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="software-panel-body">
                <p className="software-panel-label">{activeStep.label}</p>
                <h3 className="software-panel-title">{activeStep.title}</h3>
                {activeStep.description ? (
                  <p className="software-panel-text">{activeStep.description}</p>
                ) : null}
                {activeStep.image ? (
                  <figure className="software-panel-figure">
                    <img
                      src={withBase(activeStep.image)}
                      alt={activeStep.imageAlt || activeStep.title}
                      className="software-panel-image"
                    />
                    {activeStep.imageCaption ? (
                      <figcaption className="software-panel-caption">
                        {activeStep.imageCaption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
                <ul className="software-panel-list">
                  {activeStep.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="software-copy">
          <p className="card-kicker">{kicker}</p>
          <h2 className="section-title software-title">{showcaseTitle}</h2>
          {showcaseSummary ? <p className="card-text software-summary">{showcaseSummary}</p> : null}

          <div className="software-facts" aria-label="Software summary">
            {showcaseFacts.map((fact) => (
              <div key={fact.label} className="software-fact-card">
                <p className="software-fact-label">{fact.label}</p>
                <p className="software-fact-text">{fact.text}</p>
              </div>
            ))}
          </div>

          <div className="button-row">
            {project.related_publication_slug ? (
              <Link
                className="button button-secondary"
                to={`/publications/${project.related_publication_slug}`}
              >
                {publicationLabel}
              </Link>
            ) : null}

            {showPaper && project.paper_url ? (
              <a className="button button-primary" href={project.paper_url} target="_blank" rel="noreferrer">
                Paper
              </a>
            ) : null}

            {showcaseCodeUrl ? (
              <a className="button button-secondary" href={showcaseCodeUrl} target="_blank" rel="noreferrer">
                {codeLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
