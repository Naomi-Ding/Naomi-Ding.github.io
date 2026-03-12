import { SectionHeader } from '../components/SectionHeader'
import { teaching } from '../lib/content'

function getSortKey(year: number | string | undefined): number {
  if (typeof year === 'number') return year
  const parsed = Number.parseInt(String(year || ''), 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

function getTeachingGroups() {
  const grouped = new Map<
    string,
    {
      role: string
      institution: string
      years: string[]
      courses: string[]
      materialsUrl?: string
    }
  >()

  teaching.forEach((entry) => {
    const key = `${entry.role}||${entry.institution}`
    const current = grouped.get(key) ?? {
      role: entry.role,
      institution: entry.institution,
      years: [],
      courses: [],
      materialsUrl: ''
    }

    if (entry.year) current.years.push(String(entry.year))
    if (entry.course_title) current.courses.push(entry.course_title)
    if (!current.materialsUrl && entry.materials_url) current.materialsUrl = entry.materials_url

    grouped.set(key, current)
  })

  return [...grouped.values()]
    .map((group) => ({
      ...group,
      years: [...new Set(group.years)],
      courses: [...new Set(group.courses)]
    }))
    .sort((a, b) => {
      const lastA = a.years.map((year) => getSortKey(year)).sort((x, y) => y - x)[0] || 0
      const lastB = b.years.map((year) => getSortKey(year)).sort((x, y) => y - x)[0] || 0
      return lastB - lastA
    })
}

export function Teaching() {
  const groups = getTeachingGroups()

  return (
    <div className="container page-stack">
      <SectionHeader eyebrow="Teaching" title="Teaching" />

      {groups.length > 0 ? (
        <div className="grid grid-2">
          {groups.map((group) => {
            const metaParts = [group.institution, group.years.join(', ')].filter(Boolean)

            return (
              <article key={`${group.role}-${group.institution}`} className="card">
                <div className="card-body">
                  <h2 className="card-title">{group.role}</h2>
                  {metaParts.length > 0 ? (
                    <p className="muted-text teaching-meta">{metaParts.join(' | ')}</p>
                  ) : null}

                  {group.courses.length > 0 ? (
                    <ul className="course-list">
                      {group.courses.map((course) => (
                        <li key={`${group.role}-${course}`}>{course}</li>
                      ))}
                    </ul>
                  ) : null}

                  {group.materialsUrl ? (
                    <div className="button-row">
                      <a
                        className="button button-secondary"
                        href={group.materialsUrl}
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
