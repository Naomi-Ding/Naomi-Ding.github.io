import { Link } from 'react-router-dom'
import { profile } from '../lib/content'
import { SectionHeader } from '../components/SectionHeader'

export function Home() {
  const featuredTopics =
    profile.featured_topics.length > 0
      ? profile.featured_topics
      : profile.research_interests.slice(0, 4).map((interest) => ({
          title: interest,
          description: ''
        }))

  return (
    <div className="container page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="section-eyebrow">Academic website</p>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subtitle">{profile.headline}</p>

          {profile.short_bio ? <p className="hero-text">{profile.short_bio}</p> : null}

          <div className="button-row">
            <Link to="/cv" className="button button-primary">
              View CV
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

            {profile.github_url ? (
              <a
                className="button button-secondary"
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : null}

            {profile.email ? (
              <a className="button button-secondary" href={`mailto:${profile.email}`}>
                Email
              </a>
            ) : null}
          </div>
        </div>

        <aside className="hero-panel card">
          <div className="card-body">
            {profile.location ? <p className="muted-text">Based in {profile.location}</p> : null}

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
                <p className="card-text">
                  These will be generated from the CV and local source materials.
                </p>
              </>
            )}
          </div>
        </aside>
      </section>

      <section>
        <SectionHeader
          eyebrow="Featured areas"
          title="Selected research themes"
          intro="These topics will be refined automatically from the generated content files."
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
                    <p className="card-text">
                      Summary will appear here after content generation.
                    </p>
                  )}
                </div>
              </article>
            ))
          ) : (
            <article className="card">
              <div className="card-body">
                <h2 className="card-title">Content in progress</h2>
                <p className="card-text">
                  Run the Codex content-generation prompt to populate this section.
                </p>
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  )
}