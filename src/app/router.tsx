import { createBrowserRouter } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import HomePage from '../pages/public/HomePage'
import ExplorePage from '../pages/public/ExplorePage'
import OpportunityDetailsPage from '../pages/public/OpportunityDetailsPage'
import AboutPage from '../pages/public/AboutPage'
import ContactPage from '../pages/public/ContactPage'
import FaqPage from '../pages/public/FaqPage'
import PrivacyPage from '../pages/public/PrivacyPage'
import TermsPage from '../pages/public/TermsPage'
import SafetyPage from '../pages/public/SafetyPage'
import NotFoundPage from '../pages/public/NotFoundPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/opportunities/:id', element: <OpportunityDetailsPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '/safety', element: <SafetyPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])