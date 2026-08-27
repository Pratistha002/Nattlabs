import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { BackToTop } from './components/BackToTop'
import { CursorGlow } from './components/CursorGlow'
import { HomePage } from './pages/HomePage'
import { ContentPage } from './pages/ContentPage'
import { SuccessStoriesPage } from './pages/SuccessStoriesPage'
import { ContactPage } from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <CursorGlow />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/transformation" element={<ContentPage slug="transformation" />} />
              <Route path="/solution" element={<ContentPage slug="solution" />} />
              <Route path="/services" element={<ContentPage slug="services" />} />
              <Route path="/industries" element={<ContentPage slug="industries" />} />
              <Route path="/values" element={<ContentPage slug="values" />} />
              <Route path="/careers" element={<ContentPage slug="careers" />} />
              <Route path="/about" element={<ContentPage slug="about" />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/achievements" element={<Navigate to="/success-stories" replace />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
