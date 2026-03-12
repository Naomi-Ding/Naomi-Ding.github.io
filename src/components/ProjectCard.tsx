import { withBase } from '../lib/content'
import type { Project } from '../types/content'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasFigure = Boolean(project.figure)
  const metaParts = [project.year ? String(project.year) : '', project.theme].filter(Boolean)
  const hasActions = Boolean(project.paper_url || project.code_url)

  return (
    <article className="card project-card">
      {hasFigure ? (
        <figure className="project-figure">
          <img
            src={withBase(project.figure)}
            alt={project.figure_alt || `${project.title} figure`}
            className="project-image"
          />
          {project.figure_caption ? (
            <figcaption className="project-caption">{project.figure_caption}</figcaption>
          ) : null}
        </figure>
      ) : (
        <div className="project-placeholder" aria-hidden="true">
          <span>Representative figure unavailable</span>
        </div>
      )}

      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        {metaParts.length > 0 ? <p className="muted-text">{metaParts.join(' | ')}</p> : null}

        {project.summary ? <p className="card-text">{project.summary}</p> : null}

        {project.related_publication_title ? (
          <p className="muted-text">Related publication: {project.related_publication_title}</p>
        ) : null}

        {hasActions ? (
          <div className="button-row">
            {project.paper_url ? (
              <a
                className="button button-secondary"
                href={project.paper_url}
                target="_blank"
                rel="noreferrer"
              >
                Paper
              </a>
            ) : null}

            {project.code_url ? (
              <a
                className="button button-secondary"
                href={project.code_url}
                target="_blank"
                rel="noreferrer"
              >
                Code
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
