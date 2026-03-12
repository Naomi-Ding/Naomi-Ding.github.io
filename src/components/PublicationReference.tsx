import { Fragment } from 'react'
import { formatPublicationReferenceParts } from '../lib/content'
import type { Publication } from '../types/content'

const OWN_NAME_PATTERN = /(Ding\*?,\s*S\.?)/g
const OWN_NAME_EXACT = /^Ding\*?,\s*S\.?$/

function HighlightedAuthors({ authors }: { authors: string }) {
  const segments = authors.split(OWN_NAME_PATTERN).filter(Boolean)

  return (
    <>
      {segments.map((segment, index) =>
        OWN_NAME_EXACT.test(segment) ? (
          <strong key={`${segment}-${index}`}>{segment}</strong>
        ) : (
          <Fragment key={`${segment}-${index}`}>{segment}</Fragment>
        )
      )}
    </>
  )
}

interface PublicationReferenceProps {
  publication: Pick<Publication, 'authors' | 'year' | 'venue'>
  className?: string
}

export function PublicationReference({ publication, className }: PublicationReferenceProps) {
  const { authors, year, venue } = formatPublicationReferenceParts(publication)
  const hasReference = Boolean(authors || year || venue)

  if (!hasReference) return null

  return (
    <p className={className}>
      {authors ? <HighlightedAuthors authors={authors} /> : null}
      {authors && year ? ' ' : null}
      {year}
      {(authors || year) && venue ? ' ' : null}
      {venue}
    </p>
  )
}
