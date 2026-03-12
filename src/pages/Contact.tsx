import { SectionHeader } from '../components/SectionHeader'
import { profile } from '../lib/content'

const contactItems = [
  { label: 'Email', value: 'email' as const, kind: 'email' as const },
  { label: 'Personal website', value: 'website_url' as const, kind: 'link' as const },
  { label: 'Google Scholar', value: 'google_scholar_url' as const, kind: 'link' as const },
  { label: 'ORCID', value: 'orcid_url' as const, kind: 'link' as const },
  { label: 'LinkedIn', value: 'linkedin_url' as const, kind: 'link' as const },
  { label: 'Lab website', value: 'department_url' as const, kind: 'link' as const }
]

export function Contact() {
  const visibleItems = contactItems.filter((item) => Boolean(profile[item.value]))

  return (
    <div className="container page-stack">
      <SectionHeader title="Contact" />

      {visibleItems.length > 0 ? (
        <div className="contact-grid">
          {visibleItems.map((item) => {
            const value = profile[item.value]
            if (!value) return null

            return (
              <article key={item.label} className="card">
                <div className="card-body">
                  <h2 className="card-title">{item.label}</h2>

                  {item.kind === 'email' ? (
                    <a className="inline-link" href={`mailto:${value}`}>
                      {value}
                    </a>
                  ) : (
                    <a className="inline-link" href={value} target="_blank" rel="noreferrer">
                      {value}
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">No public contact details yet</h2>
            <p className="card-text">Public contact metadata has not been added yet.</p>
          </div>
        </article>
      )}
    </div>
  )
}
