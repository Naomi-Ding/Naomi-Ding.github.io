import { Link, useParams } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { getPublicationBySlug, withBase } from '../lib/content'

export function PublicationDetail() {
  const { slug = '' } = useParams()
  const publication = getPublicationBySlug(slug)

  if (!publication) {
    return (
      <div className="container page-stack">
        <article className="card">
          <div className="card-body">
            <h1 className="card-title">Publication not found</h1>
            <p className="card-text">
              The requested publication slug is not part of the current public publication list.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/publications">
                Back to publications
              </Link>
              <Link className="button button-secondary" to="/">
                Return home
              </Link>
            </div>
          </div>
        </article>
      </div>
    )
  }

  const metaParts = [
    publication.authors,
    publication.venue,
    publication.year ? String(publication.year) : '',
    publication.status
  ].filter(Boolean)

  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Publication"
        title={publication.title}
        intro="Citation metadata, verified links, and supporting public materials for the selected publication."
      />

      <article className="card publication-detail-card">
        <div className="card-body publication-detail-stack">
          {metaParts.length > 0 ? (
            <p className="publication-detail-meta">{metaParts.join(' · ')}</p>
          ) : null}

          {publication.topic ? <p className="tag">{publication.topic}</p> : null}

          {publication.notes ? <p className="card-text">{publication.notes}</p> : null}

          <div className="button-row">
            <Link className="button button-secondary" to="/publications">
              Back to publications
            </Link>

            {publication.paper_url ? (
              <a
                className="button button-primary"
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
        </div>
      </article>

      {publication.graphical_abstract ? (
        <section className="publication-detail-section">
          <article className="card">
            <div className="card-body">
              <p className="card-kicker">Graphical abstract</p>
              <figure className="publication-graphic">
                <img
                  src={withBase(publication.graphical_abstract)}
                  alt={`Graphical abstract for ${publication.title}`}
                />
              </figure>
            </div>
          </article>
        </section>
      ) : null}

      {publication.abstract_text ? (
        <section className="publication-detail-section">
          <article className="card">
            <div className="card-body">
              <p className="card-kicker">Abstract</p>
              <p className="card-text publication-detail-abstract">{publication.abstract_text}</p>
            </div>
          </article>
        </section>
      ) : null}
    </div>
  )
}
