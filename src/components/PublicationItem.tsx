import { useState } from 'react'
import { Link } from 'react-router-dom'
import { splitKeywords } from '../lib/content'
import type { Publication } from '../types/content'

interface PublicationItemProps {
  publication: Publication
  showAbstractToggle?: boolean
}

export function PublicationItem({
  publication,
  showAbstractToggle = false
}: PublicationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayStatus = publication.status_category === 'accepted' ? publication.status : ''
  const keywords = splitKeywords(publication.topic)
  const metaParts = [
    publication.authors,
    publication.venue,
    publication.year ? String(publication.year) : ''
  ].filter(Boolean)
  const hasActions = Boolean(
    publication.paper_url || publication.code_url || publication.slug || publication.abstract_text
  )

  return (
    <article className="card publication-item">
      <div className="card-body">
        <div className="publication-header">
          <h3 className="publication-title">{publication.title}</h3>
          {displayStatus ? <span className="status-pill">{displayStatus}</span> : null}
        </div>

        {metaParts.length > 0 ? <p className="publication-meta">{metaParts.join(' | ')}</p> : null}

        {keywords.length > 0 ? (
          <ul className="tag-list" aria-label="Publication keywords">
            {keywords.map((keyword) => (
              <li key={keyword} className="tag-pill">
                {keyword}
              </li>
            ))}
          </ul>
        ) : null}

        {publication.notes ? <p className="card-text">{publication.notes}</p> : null}

        {hasActions ? (
          <div className="button-row">
            <Link className="button button-secondary" to={`/publications/${publication.slug}`}>
              Details
            </Link>

            {showAbstractToggle && publication.abstract_text ? (
              <button
                type="button"
                className="button button-ghost"
                onClick={() => setIsExpanded((value) => !value)}
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Hide abstract' : 'Abstract preview'}
              </button>
            ) : null}

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

        {showAbstractToggle && isExpanded && publication.abstract_text ? (
          <div className="publication-preview">
            <p className="publication-preview-label">Abstract preview</p>
            <p className="card-text publication-preview-text">{publication.abstract_text}</p>
          </div>
        ) : null}
      </div>
    </article>
  )
}
