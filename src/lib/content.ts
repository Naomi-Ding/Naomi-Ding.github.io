import { load } from 'js-yaml'
import type {
  Profile,
  Publication,
  PublicationCollection,
  Project,
  ProjectCollection
} from '../types/content'

import profileRaw from '../../content/profile.generated.yaml?raw'
import publicationsRaw from '../../content/publications.generated.yaml?raw'
import projectsRaw from '../../content/projects.generated.yaml?raw'

function safeLoad<T>(raw: string, fallback: T): T {
  try {
    const parsed = load(raw) as T | undefined
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function normalizeProfile(): Profile {
  const parsed = safeLoad<Partial<Profile>>(profileRaw, {})
  const rawFeaturedTopics = Array.isArray(parsed.featured_topics)
    ? (parsed.featured_topics as unknown[])
    : []

  const featuredTopics = rawFeaturedTopics
    .filter((item) => typeof item === 'object' && item !== null)
    .map((item) => {
      const record = item as Record<string, unknown>

      return {
        title: typeof record.title === 'string' ? record.title.trim() || 'Research area' : 'Research area',
        description: typeof record.description === 'string' ? record.description.trim() : ''
      }
    })

  return {
    name: parsed.name?.trim() || 'Shengxian Ding',
    headline: parsed.headline?.trim() || 'Academic website in preparation',
    location: parsed.location?.trim() || '',
    email: parsed.email?.trim() || '',
    github_url: parsed.github_url?.trim() || '',
    google_scholar_url: parsed.google_scholar_url?.trim() || '',
    orcid_url: parsed.orcid_url?.trim() || '',
    linkedin_url: parsed.linkedin_url?.trim() || '',
    department_url: parsed.department_url?.trim() || '',
    short_bio:
      parsed.short_bio?.trim() ||
      'This website is being generated from local source materials. Profile details will appear here after content generation.',
    research_interests: asStringArray(parsed.research_interests),
    featured_topics: featuredTopics
  }
}

function normalizePublications(): Publication[] {
  const parsed = safeLoad<PublicationCollection>(publicationsRaw, {
    publications: []
  })

  if (!Array.isArray(parsed.publications)) return []

  return parsed.publications
    .filter((item): item is Publication => typeof item === 'object' && item !== null)
    .map((item) => ({
      title: item.title?.trim() || 'Untitled work',
      authors: item.authors?.trim() || '',
      year: item.year ?? '',
      venue: item.venue?.trim() || '',
      status: item.status?.trim() || '',
      topic: item.topic?.trim() || '',
      paper_url: item.paper_url?.trim() || '',
      code_url: item.code_url?.trim() || '',
      notes: item.notes?.trim() || ''
    }))
}

function normalizeProjects(): Project[] {
  const parsed = safeLoad<ProjectCollection>(projectsRaw, { projects: [] })

  if (!Array.isArray(parsed.projects)) return []

  return parsed.projects
    .filter((item): item is Project => typeof item === 'object' && item !== null)
    .map((item, index) => ({
      slug: item.slug?.trim() || `project-${index + 1}`,
      title: item.title?.trim() || `Project ${index + 1}`,
      summary: item.summary?.trim() || '',
      related_publication_title: item.related_publication_title?.trim() || '',
      paper_url: item.paper_url?.trim() || '',
      code_url: item.code_url?.trim() || '',
      figure: item.figure?.trim() || '',
      figure_alt: item.figure_alt?.trim() || '',
      figure_caption: item.figure_caption?.trim() || ''
    }))
}

export const profile = normalizeProfile()
export const publications = normalizePublications()
export const projects = normalizeProjects()

export function withBase(path?: string): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = path.replace(/^\/+/, '')

  return `${normalizedBase}${normalizedPath}`
}

export function groupPublicationsByYear(items: Publication[]): Record<string, Publication[]> {
  return items.reduce<Record<string, Publication[]>>((acc, item) => {
    const year = String(item.year || 'Other')
    acc[year] ??= []
    acc[year].push(item)
    return acc
  }, {})
}
