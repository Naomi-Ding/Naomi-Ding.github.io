import { Fragment, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { SectionHeader } from '../components/SectionHeader'
import { SoftwareShowcase } from '../components/SoftwareShowcase'
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
  const dsqrmProject = projects.find(
    (project) => project.slug === 'distribution-on-scalar-single-index-quantile-regression'
  )
  const dsqrmShowcaseSteps = [
    {
      label: 'Model',
      title: 'Distributional regression workflow',
      description:
        'DSQRM models heterogeneous imaging outcomes without collapsing them into a few scalar summaries or assuming full alignment after preprocessing.',
      details: [
        'Uses a distribution-on-scalar single-index quantile regression formulation.',
        'Targets tumor-imaging settings where heterogeneity remains scientifically meaningful.',
        'Connects the statistical model directly to the published Technometrics paper.'
      ],
      image: 'figures/DSQRM.png',
      imageAlt: 'Representative DSQRM model figure.',
      imageCaption: 'Model overview for distribution-on-scalar single-index quantile regression.'
    },
    {
      label: 'Software',
      title: 'Standalone MATLAB application',
      description:
        'The DSQRM workflow is also packaged as a standalone MATLAB application so the method can be run through a graphical interface rather than code-only scripts.',
      details: [
        'Provides a user-facing interface for configuring and launching the analysis workflow.',
        'Supports method dissemination beyond script-based research prototypes.',
        'Distributed alongside the public GitHub repository for the software.'
      ],
      image: 'figures/DSQRM_interface0.png',
      imageAlt: 'Screenshot of the DSQRM standalone MATLAB software interface.',
      imageCaption: 'Interface view of the standalone MATLAB application built for DSQRM.'
    }
  ]
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
                <Fragment key={project.slug}>
                  <ProjectCard project={project} />
                  {project.slug === 'distribution-on-scalar-single-index-quantile-regression' &&
                  dsqrmProject ? (
                    <SoftwareShowcase project={dsqrmProject} steps={dsqrmShowcaseSteps} />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  )
}
