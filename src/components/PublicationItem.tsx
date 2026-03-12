import type { Publication } from '../types/content'

interface PublicationItemProps {
  publication: Publication
}

export function PublicationItem({ publication }: PublicationItemProps) {
  const metaParts = [
    publication.authors,
    publication.venue,
    publication.year ? String(publication.year) : ''
  ].filter(Boolean)
  const hasLinks = Boolean(publication.paper_url || publication.code_url)

  return (
    <article className="card publication-item">
      <div className="card-body">
        <div className="publication-header">
          <h3 className="publication-title">{publication.title}</h3>
          {publication.status ? <span className="status-pill">{publication.status}</span> : null}
        </div>

        {metaParts.length > 0 ? <p className="publication-meta">{metaParts.join(' · ')}</p> : null}

        {publication.topic ? <p className="tag">{publication.topic}</p> : null}

        {publication.notes ? <p className="card-text">{publication.notes}</p> : null}

        {hasLinks ? (
          <div className="button-row">
            {publication.paper_url ? (
              <a
                className="button button-secondary"
                href={publication.paper_url}
                target="_blank"
                rel="noreferrer"
              >
                Paper
              </a>
            ) : null}

            {publication.code_url ? (
              <a
                className="button button-secondary"
                href={publication.code_url}
                target="_blank"
                rel="noreferrer"
              >
                Code
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
