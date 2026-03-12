import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../types/content'

interface ShowcaseStep {
  label: string
  title: string
  description: string
  details: string[]
}

interface SoftwareShowcaseProps {
  project: Project
  steps: ShowcaseStep[]
}

export function SoftwareShowcase({ project, steps }: SoftwareShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex]

  return (
    <section className="software-showcase card">
      <div className="card-body software-showcase-grid">
        <div className="software-copy">
          <p className="card-kicker">Software showcase</p>
          <h2 className="section-title software-title">{project.title}</h2>
          {project.summary ? <p className="card-text software-summary">{project.summary}</p> : null}

          <div className="software-facts">
            <p className="software-fact">
              <strong>What it does:</strong> Models heterogeneous imaging responses with a
              distribution-on-scalar single-index quantile regression framework.
            </p>
            <p className="software-fact">
              <strong>Who it is for:</strong> Researchers working with tumor imaging studies where
              distributional outcomes remain misaligned after preprocessing.
            </p>
            <p className="software-fact">
              <strong>What problem it solves:</strong> Avoids collapsing tumor heterogeneity into a
              few scalar features when the full response distribution carries the relevant signal.
            </p>
            <p className="software-fact">
              <strong>What this viewer shows:</strong> Verified workflow stages described in the paper
              and CV. No public interface screenshots were recoverable during this pass.
            </p>
          </div>

          <div className="button-row">
            {project.related_publication_slug ? (
              <Link
                className="button button-secondary"
                to={`/publications/${project.related_publication_slug}`}
              >
                Publication detail
              </Link>
            ) : null}

            {project.paper_url ? (
              <a className="button button-primary" href={project.paper_url} target="_blank" rel="noreferrer">
                Paper
              </a>
            ) : null}

            {project.code_url ? (
              <a className="button button-secondary" href={project.code_url} target="_blank" rel="noreferrer">
                Code
              </a>
            ) : null}
          </div>
        </div>

        <div className="software-viewer">
          <div className="software-step-nav" role="tablist" aria-label="DSQRM workflow viewer">
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
                <p className="software-panel-text">{activeStep.description}</p>
                <ul className="software-panel-list">
                  {activeStep.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
