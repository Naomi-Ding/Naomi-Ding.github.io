import { SectionHeader } from '../components/SectionHeader'
import { ProjectCard } from '../components/ProjectCard'
import { profile, projects } from '../lib/content'

export function Research() {
  const thematicAreas =
    profile.featured_topics.length > 0
      ? profile.featured_topics
      : profile.research_interests.map((interest) => ({
          title: interest,
          description: ''
        }))

  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Research"
        title="Research program"
        intro="Projects, figures, and themes are loaded from the generated public content files and remain easy to update."
      />

      <section className="overview-grid">
        <article className="card">
          <div className="card-body">
            <p className="card-kicker">Overview</p>
            <h2 className="card-title">Research focus</h2>
            <p className="card-text">
              {profile.short_bio ||
                'Research overview will appear here once the public profile content is populated.'}
            </p>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <p className="card-kicker">Methods</p>
            <h2 className="card-title">Core methodological areas</h2>
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

        <article className="card">
          <div className="card-body">
            <p className="card-kicker">Portfolio</p>
            <h2 className="card-title">Figure-backed project archive</h2>
            <p className="card-text">
              {projects.filter((project) => Boolean(project.figure)).length} of {projects.length}{' '}
              projects currently include representative public-facing figures.
            </p>
          </div>
        </article>
      </section>

      {thematicAreas.length > 0 ? (
        <section>
          <SectionHeader
            eyebrow="Themes"
            title="Research themes"
            intro="These themes summarize the main directions represented across the project and publication content."
          />

          <div className="grid grid-2">
            {thematicAreas.map((topic) => (
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
            ))}
          </div>
        </section>
      ) : null}

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
            <p className="card-text">Public project content has not been generated yet.</p>
          </div>
        </article>
      )}
    </div>
  )
}
