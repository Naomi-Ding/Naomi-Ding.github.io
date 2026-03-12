interface SectionHeaderProps {
  title: string
  intro?: string
  eyebrow?: string
}

export function SectionHeader({ title, intro, eyebrow }: SectionHeaderProps) {
  return (
    <div className="section-header">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h1 className="section-title">{title}</h1>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  )
}