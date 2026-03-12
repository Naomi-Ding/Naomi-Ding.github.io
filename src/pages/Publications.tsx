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
        title="Selected papers"
        intro="Paper and code links appear only when they are available in the generated content."
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
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">No publications yet</h2>
            <p className="card-text">
              Run the content-generation prompt to extract publications from your CV.
            </p>
          </div>
        </article>
      )}
    </div>
  )
}