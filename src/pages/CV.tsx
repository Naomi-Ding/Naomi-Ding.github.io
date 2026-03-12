import { useEffect, useMemo, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { profile, withBase } from '../lib/content'

type CvState = 'checking' | 'available' | 'missing'

export function CV() {
  const cvUrl = useMemo(() => withBase('cv/cv.public.pdf'), [])
  const [cvState, setCvState] = useState<CvState>('checking')

  useEffect(() => {
    let isMounted = true

    async function checkCv() {
      try {
        const response = await fetch(cvUrl, {
          method: 'HEAD',
          cache: 'no-store'
        })

        if (!isMounted) return
        setCvState(response.ok ? 'available' : 'missing')
      } catch {
        if (!isMounted) return
        setCvState('missing')
      }
    }

    void checkCv()

    return () => {
      isMounted = false
    }
  }, [cvUrl])

  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Curriculum vitae"
        title="CV"
        intro="This page uses only the public CV asset when it exists and otherwise falls back cleanly."
      />

      {cvState === 'checking' ? (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">Checking for public CV</h2>
            <p className="card-text">
              The page is looking for <code>public/cv/cv.public.pdf</code>.
            </p>
          </div>
        </article>
      ) : null}

      {cvState === 'available' ? (
        <>
          <article className="card">
            <div className="card-body">
              <h2 className="card-title">Public CV</h2>
              <p className="card-text">
                A public-facing PDF is available for download and embedded preview below.
              </p>
            </div>
          </article>

          <div className="button-row">
            <a className="button button-primary" href={cvUrl} target="_blank" rel="noreferrer">
              Open CV
            </a>
            <a className="button button-secondary" href={cvUrl} download>
              Download CV
            </a>
          </div>

          <div className="cv-frame-wrapper">
            <iframe src={cvUrl} title="Curriculum Vitae" className="cv-frame" />
          </div>
        </>
      ) : null}

      {cvState === 'missing' ? (
        <article className="card">
          <div className="card-body">
            <h2 className="card-title">Public CV not added yet</h2>
            <p className="card-text">
              This site is configured to work even when a public CV file is absent. To publish one
              later, add a public-facing PDF at <code>public/cv/cv.public.pdf</code>.
            </p>

            <div className="button-row">
              {profile.email ? (
                <a className="button button-primary" href={`mailto:${profile.email}`}>
                  Request CV by email
                </a>
              ) : null}

              {profile.github_url ? (
                <a
                  className="button button-secondary"
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              ) : null}

              {profile.google_scholar_url ? (
                <a
                  className="button button-secondary"
                  href={profile.google_scholar_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Scholar
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ) : null}
    </div>
  )
}
