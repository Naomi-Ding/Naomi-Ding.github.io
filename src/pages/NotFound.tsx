import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="container page-stack">
      <article className="card">
        <div className="card-body">
          <h1 className="card-title">Page not found</h1>
          <p className="card-text">
            The page you requested does not exist.
          </p>
          <Link className="button button-primary" to="/home">
            Return home
          </Link>
        </div>
      </article>
    </div>
  )
}