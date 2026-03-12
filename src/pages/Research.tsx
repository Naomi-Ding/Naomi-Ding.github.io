import { SectionHeader } from '../components/SectionHeader'
import { ResearchThemeSection } from '../components/ResearchThemeSection'
import { SoftwareShowcase } from '../components/SoftwareShowcase'
import { profile, projects } from '../lib/content'

export function Research() {
  const sortedProjects = [...projects].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  const dsqrmProject =
    sortedProjects.find((project) => project.slug === 'distribution-on-scalar-single-index-quantile-regression') ||
    null
  const thematicProjects = sortedProjects.filter((project) => project.slug !== dsqrmProject?.slug)

  const themeDescriptions: Record<string, string> = {
    "Bayesian neuroimaging and preclinical Alzheimer's disease":
      "Methods and collaborative studies that link brain structure, function, and disease risk in preclinical Alzheimer's disease and across development.",
    'Functional, shape, and mediation methods':
      'Methodological work on quantile regression, mediation, shape analysis, and heterogeneity-aware biomedical modeling, centered on first-authored and co-first contributions.',
    'Bayesian disease pathways and multimodal risk modeling':
      'Current Bayesian modeling work for large-scale EHR and multimodal biomedical data, emphasizing interpretable latent structure.',
    'Learning systems and applied signal analysis':
      'Applied machine-learning work included because LMFE remains a core project in the portfolio under the requested scope.'
  }

  const groupedThemes = thematicProjects.reduce<Record<string, typeof thematicProjects>>((acc, project) => {
    const key = project.theme || 'Research highlights'
    acc[key] ??= []
    acc[key].push(project)
    return acc
  }, {})

  const dsqrmSteps = [
    {
      label: 'Problem framing',
      title: 'Heterogeneous tumor responses',
      description:
        'The DSQRM workflow is designed for tumor imaging studies where response distributions remain misaligned after standard preprocessing.',
      details: [
        'Treats imaging responses as distributions rather than forcing a single scalar summary.',
        'Targets settings where conventional alignment assumptions do not hold.',
        'Grounded in the tumor-heterogeneity motivation documented in the Technometrics paper.'
      ]
    },
    {
      label: 'Estimation tools',
      title: 'MATLAB estimation and inference',
      description:
        'The paper documents a standalone MATLAB package supporting both estimation and inference for the proposed model.',
      details: [
        'CV notes a MATLAB mlapp implementation.',
        'Paper text describes a user-friendly package for association analysis in GBM studies.',
        'The showcase stays schematic because no public UI screenshots were recoverable.'
      ]
    },
    {
      label: 'Study outputs',
      title: 'Reproducible analysis outputs',
      description:
        'The code bundle is described as reproducing key study outputs for the glioblastoma application.',
      details: [
        'Paper notes code and data for recreating Figure 3-4 and Table 2.',
        'The workflow emphasizes estimation, inference, and heterogeneity-aware interpretation.',
        'This case study is presented separately so the software contribution is not buried inside the publication list.'
      ]
    }
  ]

  return (
    <div className="container page-stack">
      <SectionHeader
        eyebrow="Research"
        title="Research program"
        intro="This page focuses on first-authored and co-first-authored work, alongside the LMFE project, and groups those efforts into a few coherent methodological themes."
      />

      <section className="overview-grid">
        <article className="card">
          <div className="card-body">
            <p className="card-kicker">Overview</p>
            <h2 className="card-title">Research focus</h2>
            <p className="card-text">
              {profile.short_bio ||
                'Research overview will appear here once the public profile content is populated.'}
            </p>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <p className="card-kicker">Curation</p>
            <h2 className="card-title">How this page is organized</h2>
            <p className="card-text">
              The portfolio is limited to first-authored or co-first-authored projects, plus LMFE,
              so the page reads as a research program rather than a publication archive.
            </p>
          </div>
        </article>

        <article className="card">
          <div className="card-body">
            <p className="card-kicker">Methods</p>
            <h2 className="card-title">Core methodological areas</h2>
            {profile.research_interests.length > 0 ? (
              <ul className="tag-list">
                {profile.research_interests.map((interest) => (
                  <li key={interest} className="tag-pill">
                    {interest}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="card-text">Public research-interest metadata has not been added yet.</p>
            )}
          </div>
        </article>
      </section>

      {Object.entries(groupedThemes).map(([theme, themedProjects]) => (
        <ResearchThemeSection
          key={theme}
          title={theme}
          description={themeDescriptions[theme] || 'Current projects grouped under this research theme.'}
          projects={themedProjects}
        />
      ))}

      {dsqrmProject ? <SoftwareShowcase project={dsqrmProject} steps={dsqrmSteps} /> : null}
    </div>
  )
}
