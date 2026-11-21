import { Outlet } from 'react-router-dom'
import SkipToContent from '../components/layout/SkipToContent'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}