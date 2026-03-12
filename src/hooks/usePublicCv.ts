import { useEffect, useMemo, useState } from 'react'
import { withBase } from '../lib/content'

type CvState = 'checking' | 'available' | 'missing'

export function usePublicCv() {
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

  return {
    cvUrl,
    cvState,
    hasPublicCv: cvState === 'available'
  }
}
