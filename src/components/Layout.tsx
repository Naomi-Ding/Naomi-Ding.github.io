import { NavLink, Outlet } from 'react-router-dom'
import { profile } from '../lib/content'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
  { to: '/teaching', label: 'Teaching' },
  { to: '/professional-service', label: 'Professional Activities' },
  { to: '/contact', label: 'Contact' }
]

export function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="brand" aria-label="Go to home page">
            <span className="brand-mark">SD</span>
            <span className="brand-lockup">
              <span className="brand-text">{profile.name}</span>
              <span className="brand-subtext">{profile.headline}</span>
            </span>
          </NavLink>

          <nav className="site-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-column">
            <p className="footer-name">{profile.name}</p>
            <p className="footer-meta">{profile.headline}</p>
          </div>

          <div className="footer-column">
            {profile.location ? <p className="footer-meta">{profile.location}</p> : null}
            {profile.email ? (
              <p className="footer-meta">
                <a href={`mailto:${profile.email}`} className="footer-link">
                  {profile.email}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  )
}
