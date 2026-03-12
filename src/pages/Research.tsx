import { SectionHeader } from '../components/SectionHeader'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../lib/content'

export function Research() {
  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Research"
        title="Projects"
        intro="Representative projects and selected figures from my research."
      />

      {projects.length > 0 ? (
        <div className="grid grid-1">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">No projects yet</h2>
            <p className="card-text">
              Run the project-generation prompt to populate this page from your CV and local paper PDFs.
            </p>
          </div>
        </article>
      )}
    </div>
  )
}