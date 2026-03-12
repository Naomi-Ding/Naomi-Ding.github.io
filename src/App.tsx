import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Research } from './pages/Research'
import { Publications } from './pages/Publications'
import { PublicationDetail } from './pages/PublicationDetail'
import { Teaching } from './pages/Teaching'
import { ProfessionalService } from './pages/ProfessionalService'
import { CV } from './pages/CV'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="research" element={<Research />} />
        <Route path="publications" element={<Publications />} />
        <Route path="publications/:slug" element={<PublicationDetail />} />
        <Route path="teaching" element={<Teaching />} />
        <Route path="professional-service" element={<ProfessionalService />} />
        <Route path="cv" element={<CV />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
