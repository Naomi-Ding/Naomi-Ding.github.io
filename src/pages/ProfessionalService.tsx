import { SectionHeader } from '../components/SectionHeader'
import { professionalService } from '../lib/content'
import type { ServiceEntry } from '../types/content'

function getServiceYear(value: number | string | undefined): number {
  if (typeof value === 'number') return value
  const matched = String(value || '').match(/\d{4}/)
  return matched ? Number.parseInt(matched[0], 10) : 0
}

function sortServiceEntries(items: ServiceEntry[]): ServiceEntry[] {
  return [...items].sort((a, b) => getServiceYear(b.year || b.date) - getServiceYear(a.year || a.date))
}

function usesGenericTitle(title: string): boolean {
  return /^(invited session|research talk|research poster|student paper presentation)$/i.test(
    title.trim()
  )
}

function ReviewingSection({ items }: { items: ServiceEntry[] }) {
  if (items.length === 0) return null

  const peerReviewedJournals = items
    .filter((item) => !/conference/i.test(item.organization || '') && !/conference/i.test(item.title))
    .sort((a, b) => a.title.localeCompare(b.title))
  const conferences = items
    .filter((item) => /conference/i.test(item.organization || '') || /conference/i.test(item.title))
    .sort((a, b) => a.title.localeCompare(b.title))

  const groupedItems = [
    { title: 'Peer-reviewed journals', items: peerReviewedJournals },
    { title: 'Conferences', items: conferences }
  ].filter((group) => group.items.length > 0)

  return (
    <section className="service-section">
      <h2 className="service-heading">Reviewing</h2>
      <article className="card">
        <div className="card-body">
          <div className="service-review-grid">
            {groupedItems.map((group) => (
              <section key={group.title} className="service-review-group">
                <p className="card-kicker">Peer review</p>
                <h3 className="card-title">{group.title}</h3>
                <ul className="service-item-list">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.title}`}>{item.title}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </article>
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

  const sortedItems = sortServiceEntries(items)

  return (
    <section className="service-section">
      <h2 className="service-heading">{title}</h2>
      <article className="card">
        <div className="card-body">
          <ul className="service-entry-list">
            {sortedItems.map((item) => {
              const useOrganizationAsTitle = Boolean(item.organization && usesGenericTitle(item.title))
              const displayTitle = useOrganizationAsTitle ? item.organization || item.title : item.title
              const metaParts = [
                useOrganizationAsTitle ? '' : item.organization,
                item.location,
                item.date || (item.year ? String(item.year) : '')
              ].filter(Boolean)

              return (
                <li
                  key={`${title}-${item.role}-${item.title}-${item.organization}`}
                  className="service-entry"
                >
                  <p className="card-kicker service-entry-kicker">{item.role}</p>
                  <h3 className="service-entry-title">{displayTitle}</h3>
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
                </li>
              )
            })}
          </ul>
        </div>
      </article>
    </section>
  )
}

export function ProfessionalService() {
  const sections = [
    { title: 'Mentorship', items: professionalService.mentorship },
    { title: 'Organizing', items: professionalService.organizing },
    { title: 'Editorial / Committee', items: professionalService.editorial_and_committee },
    { title: 'Selected talks and presentations', items: professionalService.talks_and_presentations }
  ].filter((section) => section.items.length > 0)

  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Professional Service"
        title="Professional Service"
        intro="Selected reviewing, organizing, mentorship, and invited presentation activities."
      />

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
