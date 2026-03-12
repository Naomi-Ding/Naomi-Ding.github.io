export interface FeaturedTopic {
  title: string
  description: string
}

export interface Profile {
  name: string
  headline: string
  location?: string
  email?: string
  github_url?: string
  google_scholar_url?: string
  orcid_url?: string
  linkedin_url?: string
  department_url?: string
  short_bio?: string
  research_interests: string[]
  featured_topics: FeaturedTopic[]
}

export interface Publication {
  title: string
  authors?: string
  year?: number | string
  venue?: string
  status?: string
  topic?: string
  paper_url?: string
  code_url?: string
  notes?: string
}

export interface PublicationCollection {
  publications: Publication[]
}

export interface Project {
  slug: string
  title: string
  summary?: string
  related_publication_title?: string
  paper_url?: string
  code_url?: string
  figure?: string
  figure_alt?: string
  figure_caption?: string
}

export interface ProjectCollection {
  projects: Project[]
}