import { SectionHeader } from '../components/SectionHeader'
import { PublicationItem } from '../components/PublicationItem'
import { groupPublicationsByYear, publications } from '../lib/content'

export function Publications() {
  const grouped = groupPublicationsByYear(publications)
  const publishedCount = publications.filter((item) => item.status === 'published').length
  const forthcomingCount = publications.filter(
    (item) => item.status === 'accepted / forthcoming'
  ).length
  const reviewCount = publications.filter(
    (item) => item.status === 'under review / submitted'
  ).length
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
        intro="Entries are grouped by year, and paper or code buttons appear only when the generated public metadata contains verified URLs."
      />

      <section className="stats-grid" aria-label="Publication summary">
        <article className="card stat-card">
          <div className="card-body">
            <p className="stat-value">{publications.length}</p>
            <p className="stat-label">Total works</p>
          </div>
        </article>

        <article className="card stat-card">
          <div className="card-body">
            <p className="stat-value">{publishedCount + forthcomingCount}</p>
            <p className="stat-label">Published or forthcoming</p>
          </div>
        </article>

        <article className="card stat-card">
          <div className="card-body">
            <p className="stat-value">{reviewCount}</p>
            <p className="stat-label">Under review or submitted</p>
          </div>
        </article>
      </section>

      {publications.length > 0 ? (
        years.map((year) => (
          <section key={year} className="year-group">
            <h2 className="year-heading">{year}</h2>
            <div className="stack">
              {grouped[year].map((item, idx) => (
                <PublicationItem key={`${year}-${idx}-${item.title}`} publication={item} />
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
