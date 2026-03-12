import { NavLink, Outlet } from 'react-router-dom'
import { profile } from '../lib/content'

const navItems = [
  { to: '/home', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' }
]

export function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/home" className="brand" aria-label="Go to home page">
            <span className="brand-mark">SD</span>
            <span className="brand-text">{profile.name}</span>
          </NavLink>

          <nav className="site-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link-active' : 'nav-link'
                }
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
          <p className="footer-name">{profile.name}</p>
          <p className="footer-meta">
            {profile.email ? (
              <a href={`mailto:${profile.email}`} className="footer-link">
                {profile.email}
              </a>
            ) : (
              'Contact information will appear here.'
            )}
          </p>
        </div>
      </footer>
    </div>
  )
}