import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'
import { profile, projects } from '../lib/content'

function getProjectYear(value: number | string | undefined): number {
  if (typeof value === 'number') return value
  const parsed = Number.parseInt(String(value || ''), 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

function themeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function Research() {
  const [searchParams] = useSearchParams()
  const requestedTheme = searchParams.get('theme')
  const orderedThemes = profile.featured_topics.map((topic) => topic.title)
  const groupedProjects = orderedThemes
    .map((title) => ({
      title,
      description: profile.featured_topics.find((topic) => topic.title === title)?.description || '',
      slug: themeSlug(title),
      projects: projects
        .filter((project) => project.theme === title)
        .sort((a, b) => {
          const yearDifference = getProjectYear(b.year) - getProjectYear(a.year)
          if (yearDifference !== 0) return yearDifference
          return (a.sort_order || 0) - (b.sort_order || 0)
        })
    }))
    .filter((group) => group.projects.length > 0)

  useEffect(() => {
    if (!requestedTheme) return

    const section = document.getElementById(`theme-${requestedTheme}`)
    if (!section) return

    window.requestAnimationFrame(() => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [requestedTheme])

  return (
    <div className="container page-stack">
      <SectionHeader title="Research program" />

      <section className="theme-nav-grid">
        {groupedProjects.map((group) => (
          <article key={group.slug} className="card">
            <div className="card-body">
              <h2 className="card-title">{group.title}</h2>
              <p className="card-text">{group.description}</p>
              <div className="button-row">
                <Link className="button button-secondary" to={`/research?theme=${group.slug}`}>
                  Jump to theme
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="stack">
        {groupedProjects.map((group) => (
          <section key={group.slug} id={`theme-${group.slug}`} className="research-domain">
            <div className="research-domain-header">
              <p className="card-kicker">Research theme</p>
              <h2 className="research-domain-title">{group.title}</h2>
              <p className="research-domain-intro">{group.description}</p>
            </div>

            <div className="stack">
              {group.projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  )
}
