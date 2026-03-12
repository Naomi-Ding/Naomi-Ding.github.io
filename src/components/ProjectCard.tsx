import type { Project } from '../types/content'
import { withBase } from '../lib/content'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasFigure = Boolean(project.figure)
  const kickerParts = [project.authorship_role, project.project_type === 'software' ? 'Software' : 'Research']
    .filter(Boolean)
    .map((part) => String(part))

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
        {kickerParts.length > 0 ? <p className="card-kicker">{kickerParts.join(' · ')}</p> : null}
        <h2 className="card-title">{project.title}</h2>

        {project.summary ? <p className="card-text">{project.summary}</p> : null}

        {project.related_publication_title ? (
          <p className="muted-text">
            Related publication: {project.related_publication_title}
          </p>
        ) : null}

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
      </div>
    </article>
  )
}
