export interface FeaturedTopic {
  title: string
  description: string
  image?: string
  image_alt?: string
}

export interface EducationEntry {
  degree: string
  field?: string
  institution: string
  location?: string
  period?: string
  note?: string
}

export interface Profile {
  name: string
  alternate_names?: string[]
  headline: string
  location?: string
  email?: string
  website_url?: string
  github_url?: string
  google_scholar_url?: string
  orcid_url?: string
  linkedin_url?: string
  department_url?: string
  short_bio?: string
  research_interests: string[]
  featured_topics: FeaturedTopic[]
  education: EducationEntry[]
}

export interface Publication {
  slug: string
  title: string
  authors?: string
  year?: number | string
  venue?: string
  status?: string
  status_category?: 'published' | 'accepted' | 'forthcoming' | 'in press'
  authorship_role?: string
  topic?: string
  paper_url?: string
  code_url?: string
  abstract_text?: string
  graphical_abstract?: string
  notes?: string
}

export interface PublicationCollection {
  publications: Publication[]
}

export interface Project {
  slug: string
  title: string
  year?: number | string
  theme?: string
  authorship_role?: string
  project_type?: 'paper' | 'project' | 'software'
  featured_on_home?: boolean
  sort_order?: number
  summary?: string
  related_publication_slug?: string
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

export interface TeachingEntry {
  role: string
  course_title: string
  course_number?: string
  institution: string
  term?: string
  year?: number | string
  summary?: string
  materials_url?: string
}

export interface TeachingCollection {
  teaching: TeachingEntry[]
}

export interface ServiceEntry {
  role: string
  title: string
  organization?: string
  location?: string
  year?: number | string
  date?: string
  summary?: string
  url?: string
}

export interface ProfessionalServiceCollection {
  professional_service: {
    mentorship?: ServiceEntry[]
    reviewing?: ServiceEntry[]
    organizing?: ServiceEntry[]
    editorial_and_committee?: ServiceEntry[]
    talks_and_presentations?: ServiceEntry[]
  }
}
