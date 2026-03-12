import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'
import { profile, projects } from '../lib/content'

function getProjectYear(value: number | string | undefined): number {
  if (typeof value === 'number') return value
  const parsed = Number.parseInt(String(value || ''), 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function Research() {
  const sortedProjects = [...projects].sort((a, b) => {
    const yearDifference = getProjectYear(b.year) - getProjectYear(a.year)
    if (yearDifference !== 0) return yearDifference
    return (a.sort_order || 0) - (b.sort_order || 0)
  })

  return (
    <div className="container page-stack">
      <SectionHeader eyebrow="Research" title="Research program" />

      <section className="grid grid-2">
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">Research focus</h2>
            <p className="card-text">
              {profile.short_bio ||
                'Research overview will appear here once the public profile content is populated.'}
            </p>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <h2 className="card-title">Methodological cores</h2>
            {profile.research_interests.length > 0 ? (
              <ul className="tag-list">
                {profile.research_interests.map((interest) => (
                  <li key={interest} className="tag-pill">
                    {interest}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="card-text">Public research-interest metadata has not been added yet.</p>
            )}
          </div>
        </article>
      </section>

      <section className="stack">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  )
}
