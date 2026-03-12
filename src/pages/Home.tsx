import { Link } from 'react-router-dom'
import { PublicationItem } from '../components/PublicationItem'
import { SectionHeader } from '../components/SectionHeader'
import { profile, projects, publications, withBase } from '../lib/content'

function getNumericYear(year: number | string | undefined): number {
  if (typeof year === 'number') return year
  const parsed = Number.parseInt(String(year || ''), 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function Home() {
  const featuredTopics =
    profile.featured_topics.length > 0
      ? profile.featured_topics
      : profile.research_interests.slice(0, 4).map((interest) => ({
          title: interest,
          description: ''
        }))

  const highlightedProjects = [...projects]
    .sort((a, b) => Number(Boolean(b.figure)) - Number(Boolean(a.figure)))
    .slice(0, 3)

  const recentPublications = [...publications]
    .sort((a, b) => getNumericYear(b.year) - getNumericYear(a.year))
    .slice(0, 3)

  const overviewStats = [
    { label: 'Publications', value: String(publications.length) },
    { label: 'Projects', value: String(projects.length) },
    {
      label: 'Projects with figures',
      value: String(projects.filter((project) => Boolean(project.figure)).length)
    }
  ]

  return (
    <div className="container page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="section-eyebrow">Biostatistics, Bayesian methods, and neuroimaging</p>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subtitle">{profile.headline}</p>

          {profile.short_bio ? <p className="hero-text">{profile.short_bio}</p> : null}

          <div className="button-row">
            <Link to="/research" className="button button-primary">
              Explore Research
            </Link>
            <Link to="/publications" className="button button-secondary">
              View Publications
            </Link>
            <Link to="/cv" className="button button-secondary">
              CV
            </Link>

            {profile.google_scholar_url ? (
              <a
                className="button button-secondary"
                href={profile.google_scholar_url}
                target="_blank"
                rel="noreferrer"
              >
                Google Scholar
              </a>
            ) : null}
          </div>
        </div>

        <aside className="hero-panel card">
          <div className="card-body stack">
            <div>
              <p className="card-kicker">Profile</p>
              <h2 className="card-title">Current appointment</h2>
              {profile.location ? <p className="muted-text">Based in {profile.location}</p> : null}
              {profile.department_url ? (
                <p className="card-text">
                  <a href={profile.department_url} target="_blank" rel="noreferrer">
                    Yale Biostatistics
                  </a>
                </p>
              ) : null}
            </div>

            {profile.research_interests.length > 0 ? (
              <>
                <h2 className="card-title">Research interests</h2>
                <ul className="tag-list">
                  {profile.research_interests.map((item) => (
                    <li key={item} className="tag-pill">
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2 className="card-title">Research interests</h2>
                <p className="card-text">Public research-interest metadata has not been added yet.</p>
              </>
            )}
          </div>
        </aside>
      </section>

      <section className="stats-grid" aria-label="Site summary">
        {overviewStats.map((item) => (
          <article key={item.label} className="card stat-card">
            <div className="card-body">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          </article>
        ))}
      </section>

      <section>
        <SectionHeader
          eyebrow="Research Themes"
          title="Current areas of emphasis"
          intro="Research interests and thematic summaries are drawn directly from the generated public profile content."
        />

        <div className="grid grid-2">
          {featuredTopics.length > 0 ? (
            featuredTopics.map((topic) => (
              <article key={topic.title} className="card">
                <div className="card-body">
                  <h2 className="card-title">{topic.title}</h2>
                  {topic.description ? (
                    <p className="card-text">{topic.description}</p>
                  ) : (
                    <p className="card-text">This theme is listed in the public profile content.</p>
                  )}
                </div>
              </article>
            ))
          ) : (
            <article className="card">
              <div className="card-body">
                <h2 className="card-title">Content unavailable</h2>
                <p className="card-text">Public profile content has not been generated yet.</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Selected Research"
          title="Project highlights"
          intro="Representative projects and figures from the generated research portfolio."
        />

        {highlightedProjects.length > 0 ? (
          <div className="spotlight-grid">
            {highlightedProjects.map((project) => (
              <article key={project.slug} className="card spotlight-card">
                {project.figure ? (
                  <img
                    src={withBase(project.figure)}
                    alt={project.figure_alt || `${project.title} figure`}
                    className="spotlight-image"
                  />
                ) : (
                  <div className="spotlight-placeholder" aria-hidden="true">
                    Figure unavailable
                  </div>
                )}

                <div className="card-body">
                  <h2 className="card-title">{project.title}</h2>
                  {project.summary ? <p className="card-text">{project.summary}</p> : null}

                  <div className="button-row">
                    <Link to="/research" className="button button-secondary">
                      Research page
                    </Link>
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
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="card">
            <div className="card-body">
              <h2 className="card-title">Project highlights unavailable</h2>
              <p className="card-text">Public project content has not been generated yet.</p>
            </div>
          </article>
        )}
      </section>

      <section>
        <SectionHeader
          eyebrow="Recent Publications"
          title="Recent work"
          intro="Paper and code links are shown only when public URLs were verified in the generated metadata."
        />

        {recentPublications.length > 0 ? (
          <div className="stack">
            {recentPublications.map((publication, index) => (
              <PublicationItem key={`${publication.title}-${index}`} publication={publication} />
            ))}
          </div>
        ) : (
          <article className="card">
            <div className="card-body">
              <h2 className="card-title">Recent work unavailable</h2>
              <p className="card-text">Public publication content has not been generated yet.</p>
            </div>
          </article>
        )}
      </section>
    </div>
  )
}
