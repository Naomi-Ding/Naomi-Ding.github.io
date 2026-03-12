import { SectionHeader } from '../components/SectionHeader'
import { teaching } from '../lib/content'

function getSortKey(year: number | string | undefined): number {
  if (typeof year === 'number') return year
  const parsed = Number.parseInt(String(year || ''), 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function Teaching() {
  const entries = [...teaching].sort((a, b) => getSortKey(b.year) - getSortKey(a.year))

  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Teaching"
        title="Teaching"
        intro="Teaching roles are drawn from the current public content files and kept intentionally concise when only CV-level detail is available."
      />

      {entries.length > 0 ? (
        <div className="grid grid-2">
          {entries.map((entry) => {
            const metaParts = [entry.role, entry.institution, entry.term, entry.year ? String(entry.year) : '']
              .filter(Boolean)

            return (
              <article key={`${entry.role}-${entry.course_title}-${entry.year}`} className="card">
                <div className="card-body">
                  <p className="card-kicker">{entry.role}</p>
                  <h2 className="card-title">{entry.course_title}</h2>
                  {metaParts.length > 0 ? (
                    <p className="muted-text teaching-meta">{metaParts.join(' · ')}</p>
                  ) : null}
                  {entry.summary ? <p className="card-text">{entry.summary}</p> : null}

                  {entry.materials_url ? (
                    <div className="button-row">
                      <a
                        className="button button-secondary"
                        href={entry.materials_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Materials
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">Teaching content is being prepared</h2>
            <p className="card-text">
              No public teaching entries are available yet, but this page is wired to
              `content/teaching.generated.yaml`.
            </p>
          </div>
        </article>
      )}
    </div>
  )
}
