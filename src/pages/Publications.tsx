import { SectionHeader } from '../components/SectionHeader'
import { PublicationItem } from '../components/PublicationItem'
import { groupPublicationsByYear, publications } from '../lib/content'

export function Publications() {
  const grouped = groupPublicationsByYear(publications)
  const years = Object.keys(grouped).sort((a, b) => {
    if (a === 'Other') return 1
    if (b === 'Other') return -1
    return Number(b) - Number(a)
  })

  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Publications"
        title="Publications"
        intro="Display-eligible publications are grouped by year. Each entry links to a dedicated detail page, and abstract previews stay optional so the list remains easy to scan."
      />

      {publications.length > 0 ? (
        years.map((year) => (
          <section key={year} className="year-group">
            <h2 className="year-heading">{year}</h2>
            <div className="stack">
              {grouped[year].map((item, idx) => (
                <PublicationItem
                  key={`${year}-${idx}-${item.title}`}
                  publication={item}
                  showAbstractToggle
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">No publications yet</h2>
            <p className="card-text">Public publication content has not been generated yet.</p>
          </div>
        </article>
      )}
    </div>
  )
}
