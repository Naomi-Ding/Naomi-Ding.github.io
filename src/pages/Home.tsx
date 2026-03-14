import { Link } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { usePublicCv } from '../hooks/usePublicCv'
import { profile, projects, withBase } from '../lib/content'

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

export function Home() {
  const featuredTopics =
    profile.featured_topics.length > 0
      ? profile.featured_topics
      : profile.research_interests.slice(0, 4).map((interest) => ({
          title: interest,
          description: '',
          image: '',
          image_alt: ''
        }))
  const themeCards = featuredTopics.map((topic) => {
    const representativeProject = [...projects]
      .filter((project) => project.theme === topic.title && project.figure)
      .sort((a, b) => {
        const yearDifference = getProjectYear(b.year) - getProjectYear(a.year)
        if (yearDifference !== 0) return yearDifference
        return (a.sort_order || 0) - (b.sort_order || 0)
      })[0]

    return {
      ...topic,
      image: topic.image || representativeProject?.figure || '',
      image_alt:
        topic.image_alt ||
        representativeProject?.figure_alt ||
        `${topic.title} representative figure`
    }
  })

  const { cvUrl, hasPublicCv } = usePublicCv()
  const externalLinks = [
    { label: 'Google Scholar', href: profile.google_scholar_url },
    { label: 'GitHub', href: profile.github_url },
    { label: 'ORCID', href: profile.orcid_url }
  ].filter((item) => Boolean(item.href))

  return (
    <div className="container page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="section-eyebrow">Probabilistic modeling, Bayesian computation, and complex biomedical data</p>
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
            {hasPublicCv ? (
              <a className="button button-secondary" href={cvUrl} target="_blank" rel="noreferrer">
                CV
              </a>
            ) : null}
          </div>

          {externalLinks.length > 0 ? (
            <div className="hero-inline-links" aria-label="Selected links">
              {externalLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="hero-inline-link">
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="hero-panel card">
          {profile.portrait_image ? (
            <div className="hero-portrait-frame">
              <img
                src={withBase(profile.portrait_image)}
                alt={profile.portrait_alt || `Portrait of ${profile.name}`}
                className="hero-portrait-image"
              />
            </div>
          ) : null}
        </aside>
      </section>

      <section>
        <SectionHeader title="Research themes" />

        <div className="theme-nav-grid">
          {themeCards.length > 0 ? (
            themeCards.map((topic) => (
              <article key={topic.title} className="card theme-card">
                {topic.image ? (
                  <div className="theme-card-media">
                    <img
                      src={withBase(topic.image)}
                      alt={topic.image_alt || `${topic.title} representative figure`}
                      className="theme-card-image"
                    />
                  </div>
                ) : (
                  <div className="theme-card-placeholder" aria-hidden="true">
                    <span>Representative figure unavailable</span>
                  </div>
                )}
                <div className="card-body">
                  <h2 className="card-title">{topic.title}</h2>
                  {topic.description ? (
                    <p className="card-text">{topic.description}</p>
                  ) : (
                    <p className="card-text">This theme is listed in the public profile content.</p>
                  )}
                  <div className="button-row">
                    <Link
                      className="button button-secondary"
                      to={`/research?theme=${themeSlug(topic.title)}`}
                    >
                      View on Research page
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <article className="card">
              <div className="card-body">
                <h2 className="card-title">Research themes are being prepared</h2>
                <p className="card-text">Public profile metadata has not been populated yet.</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <section>
        <SectionHeader title="Education" />

        {profile.education.length > 0 ? (
          <div className="grid grid-3">
            {profile.education.map((entry) => (
              <article
                key={`${entry.degree}-${entry.institution}-${entry.period}`}
                className="card education-card"
              >
                <div className="card-body">
                  <p className="card-kicker education-degree">{entry.degree}</p>
                  <h2 className="card-title education-title">{entry.field || entry.degree}</h2>
                  <p className="education-institution">{entry.institution}</p>
                  {entry.location ? <p className="muted-text education-location">{entry.location}</p> : null}
                  {entry.period ? <p className="education-period">{entry.period}</p> : null}
                  {entry.note ? <p className="card-text education-note">{entry.note}</p> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="card">
            <div className="card-body">
              <h2 className="card-title">Education details are being prepared</h2>
              <p className="card-text">No public education entries are available yet.</p>
            </div>
          </article>
        )}
      </section>
    </div>
  )
}
