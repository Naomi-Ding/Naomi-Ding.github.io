import { SectionHeader } from '../components/SectionHeader'
import { professionalService } from '../lib/content'
import type { ServiceEntry } from '../types/content'

function ReviewingSection({ items }: { items: ServiceEntry[] }) {
  if (items.length === 0) return null

  const peerReviewedJournals = items.filter(
    (item) => !/conference/i.test(item.organization || '') && !/conference/i.test(item.title)
  )
  const conferences = items.filter(
    (item) => /conference/i.test(item.organization || '') || /conference/i.test(item.title)
  )

  const groupedItems = [
    { title: 'Peer-reviewed journals', items: peerReviewedJournals },
    { title: 'Conferences', items: conferences }
  ].filter((group) => group.items.length > 0)

  return (
    <section className="service-section">
      <h2 className="service-heading">Reviewing</h2>
      <div className="service-grid">
        {groupedItems.map((group) => (
          <article key={group.title} className="card">
            <div className="card-body">
              <p className="card-kicker">Peer review</p>
              <h3 className="card-title">{group.title}</h3>
              <ul className="service-item-list">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.title}`}>{item.title}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServiceSection({
  title,
  items
}: {
  title: string
  items: ServiceEntry[]
}) {
  if (items.length === 0) return null

  return (
    <section className="service-section">
      <h2 className="service-heading">{title}</h2>
      <div className="service-grid">
        {items.map((item) => {
          const metaParts = [
            item.organization,
            item.location,
            item.date || (item.year ? String(item.year) : '')
          ].filter(Boolean)

          return (
            <article key={`${title}-${item.role}-${item.title}-${item.organization}`} className="card">
              <div className="card-body">
                <p className="card-kicker">{item.role}</p>
                <h3 className="card-title">{item.title}</h3>
                {metaParts.length > 0 ? (
                  <p className="muted-text service-meta">{metaParts.join(' | ')}</p>
                ) : null}
                {item.summary ? <p className="card-text">{item.summary}</p> : null}
                {item.url ? (
                  <div className="button-row">
                    <a
                      className="button button-secondary"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn more
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function ProfessionalService() {
  const sections = [
    { title: 'Mentorship', items: professionalService.mentorship },
    { title: 'Organizing / Chairing', items: professionalService.organizing },
    { title: 'Editorial / Committee', items: professionalService.editorial_and_committee },
    { title: 'Selected Talks & Presentations', items: professionalService.talks_and_presentations }
  ].filter((section) => section.items.length > 0)

  return (
    <div className="container page-stack">
      <SectionHeader eyebrow="Professional Service" title="Professional Service" />

      {sections.length > 0 || professionalService.reviewing.length > 0 ? (
        <div className="stack">
          <ReviewingSection items={professionalService.reviewing} />
          {sections.map((section) => (
            <ServiceSection key={section.title} title={section.title} items={section.items} />
          ))}
        </div>
      ) : (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">Professional service content is being prepared</h2>
            <p className="card-text">
              No public service entries are available yet, but this page is wired to
              `content/professional_service.generated.yaml`.
            </p>
          </div>
        </article>
      )}
    </div>
  )
}
