import { ProjectCard } from './ProjectCard'
import type { Project } from '../types/content'

interface ResearchThemeSectionProps {
  title: string
  description: string
  projects: Project[]
}

export function ResearchThemeSection({
  title,
  description,
  projects
}: ResearchThemeSectionProps) {
  if (projects.length === 0) return null

  return (
    <section className="theme-section">
      <div className="theme-header">
        <p className="card-kicker">Theme</p>
        <h2 className="theme-title">{title}</h2>
        <p className="theme-description">{description}</p>
      </div>

      <div className="grid grid-1">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
