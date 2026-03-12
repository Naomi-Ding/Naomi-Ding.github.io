import { load } from 'js-yaml'
import type {
  EducationEntry,
  Profile,
  ProfessionalServiceCollection,
  Publication,
  PublicationCollection,
  Project,
  ProjectCollection,
  ServiceEntry,
  TeachingCollection,
  TeachingEntry
} from '../types/content'

import profileRaw from '../../content/profile.generated.yaml?raw'
import publicationsRaw from '../../content/publications.generated.yaml?raw'
import professionalServiceRaw from '../../content/professional_service.generated.yaml?raw'
import projectsRaw from '../../content/projects.generated.yaml?raw'
import teachingRaw from '../../content/teaching.generated.yaml?raw'

function safeLoad<T>(raw: string, fallback: T): T {
  try {
    const parsed = load(raw) as T | undefined
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function asTrimmedString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() || fallback : fallback
}

function asOptionalNumberOrString(value: unknown): number | string | undefined {
  if (typeof value === 'number' || typeof value === 'string') return value
  return undefined
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function normalizeEducationEntry(value: unknown): EducationEntry | null {
  if (typeof value !== 'object' || value === null) return null

  const record = value as Record<string, unknown>

  return {
    degree: asTrimmedString(record.degree, 'Degree'),
    field: asTrimmedString(record.field),
    institution: asTrimmedString(record.institution, 'Institution'),
    location: asTrimmedString(record.location),
    period: asTrimmedString(record.period),
    note: asTrimmedString(record.note)
  }
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
        title: asTrimmedString(record.title, 'Research area'),
        description: asTrimmedString(record.description),
        image: asTrimmedString(record.image),
        image_alt: asTrimmedString(record.image_alt)
      }
    })

  const education = Array.isArray(parsed.education)
    ? parsed.education
        .map((item) => normalizeEducationEntry(item))
        .filter((item): item is EducationEntry => item !== null)
    : []

  return {
    name: asTrimmedString(parsed.name, 'Shengxian Ding'),
    headline: asTrimmedString(parsed.headline, 'Academic website in preparation'),
    location: asTrimmedString(parsed.location),
    email: asTrimmedString(parsed.email),
    github_url: asTrimmedString(parsed.github_url),
    google_scholar_url: asTrimmedString(parsed.google_scholar_url),
    orcid_url: asTrimmedString(parsed.orcid_url),
    linkedin_url: asTrimmedString(parsed.linkedin_url),
    department_url: asTrimmedString(parsed.department_url),
    short_bio:
      asTrimmedString(parsed.short_bio) ||
      'This website is being generated from local source materials. Profile details will appear here after content generation.',
    research_interests: asStringArray(parsed.research_interests),
    featured_topics: featuredTopics,
    education
  }
}

function normalizePublications(): Publication[] {
  const parsed = safeLoad<PublicationCollection>(publicationsRaw, {
    publications: []
  })

  if (!Array.isArray(parsed.publications)) return []

  return parsed.publications
    .filter((item): item is Publication => typeof item === 'object' && item !== null)
    .map((item, index) => {
      const statusCategory =
        item.status_category === 'published' ||
        item.status_category === 'accepted' ||
        item.status_category === 'forthcoming' ||
        item.status_category === 'in press'
          ? item.status_category
          : undefined

      return {
        slug: asTrimmedString(item.slug, `publication-${index + 1}`),
        title: asTrimmedString(item.title, 'Untitled work'),
        authors: asTrimmedString(item.authors),
        year: asOptionalNumberOrString(item.year) ?? '',
        venue: asTrimmedString(item.venue),
        status: asTrimmedString(item.status),
        status_category: statusCategory,
        authorship_role: asTrimmedString(item.authorship_role),
        topic: asTrimmedString(item.topic),
        paper_url: asTrimmedString(item.paper_url),
        code_url: asTrimmedString(item.code_url),
        abstract_text: asTrimmedString(item.abstract_text),
        graphical_abstract: asTrimmedString(item.graphical_abstract),
        notes: asTrimmedString(item.notes)
      }
    })
}

function normalizeProjects(): Project[] {
  const parsed = safeLoad<ProjectCollection>(projectsRaw, { projects: [] })

  if (!Array.isArray(parsed.projects)) return []

  return parsed.projects
    .filter((item): item is Project => typeof item === 'object' && item !== null)
    .map((item, index) => ({
      slug: asTrimmedString(item.slug, `project-${index + 1}`),
      title: asTrimmedString(item.title, `Project ${index + 1}`),
      year: asOptionalNumberOrString(item.year) ?? '',
      theme: asTrimmedString(item.theme),
      authorship_role: asTrimmedString(item.authorship_role),
      project_type:
        item.project_type === 'paper' ||
        item.project_type === 'project' ||
        item.project_type === 'software'
          ? item.project_type
          : 'paper',
      featured_on_home: Boolean(item.featured_on_home),
      sort_order: typeof item.sort_order === 'number' ? item.sort_order : index,
      summary: asTrimmedString(item.summary),
      related_publication_slug: asTrimmedString(item.related_publication_slug),
      related_publication_title: asTrimmedString(item.related_publication_title),
      paper_url: asTrimmedString(item.paper_url),
      code_url: asTrimmedString(item.code_url),
      figure: asTrimmedString(item.figure),
      figure_alt: asTrimmedString(item.figure_alt),
      figure_caption: asTrimmedString(item.figure_caption)
    }))
}

function normalizeTeaching(): TeachingEntry[] {
  const parsed = safeLoad<TeachingCollection>(teachingRaw, { teaching: [] })

  if (!Array.isArray(parsed.teaching)) return []

  return parsed.teaching
    .filter((item): item is TeachingEntry => typeof item === 'object' && item !== null)
    .map((item) => ({
      role: asTrimmedString(item.role),
      course_title: asTrimmedString(item.course_title),
      course_number: asTrimmedString(item.course_number),
      institution: asTrimmedString(item.institution),
      term: asTrimmedString(item.term),
      year: asOptionalNumberOrString(item.year) ?? '',
      summary: asTrimmedString(item.summary),
      materials_url: asTrimmedString(item.materials_url)
    }))
    .filter((item) => item.role || item.course_title || item.institution)
}

function normalizeServiceEntries(value: unknown): ServiceEntry[] {
  if (!Array.isArray(value)) return []

  return value
    .filter((item): item is ServiceEntry => typeof item === 'object' && item !== null)
    .map((item) => ({
      role: asTrimmedString(item.role),
      title: asTrimmedString(item.title),
      organization: asTrimmedString(item.organization),
      location: asTrimmedString(item.location),
      year: asOptionalNumberOrString(item.year) ?? '',
      date: asTrimmedString(item.date),
      summary: asTrimmedString(item.summary),
      url: asTrimmedString(item.url)
    }))
    .filter((item) => item.role || item.title || item.organization)
}

function normalizeProfessionalService() {
  const parsed = safeLoad<ProfessionalServiceCollection>(professionalServiceRaw, {
    professional_service: {}
  })

  const sections = parsed.professional_service ?? {}

  return {
    mentorship: normalizeServiceEntries(sections.mentorship),
    reviewing: normalizeServiceEntries(sections.reviewing),
    organizing: normalizeServiceEntries(sections.organizing),
    editorial_and_committee: normalizeServiceEntries(sections.editorial_and_committee),
    talks_and_presentations: normalizeServiceEntries(sections.talks_and_presentations)
  }
}

export const profile = normalizeProfile()
export const publications = normalizePublications()
export const projects = normalizeProjects()
export const teaching = normalizeTeaching()
export const professionalService = normalizeProfessionalService()

export function withBase(path?: string): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = path.replace(/^\/+/, '')

  return `${normalizedBase}${normalizedPath}`
}

export function splitKeywords(value?: string): string[] {
  if (!value) return []

  return value
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function groupPublicationsByYear(items: Publication[]): Record<string, Publication[]> {
  return items.reduce<Record<string, Publication[]>>((acc, item) => {
    const year = String(item.year || 'Other')
    acc[year] ??= []
    acc[year].push(item)
    return acc
  }, {})
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((item) => item.slug === slug)
}
