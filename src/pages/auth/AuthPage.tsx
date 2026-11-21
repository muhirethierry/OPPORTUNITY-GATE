import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { SITE_NAME } from '../../lib/constants'
import './AuthPage.css'

type AuthPageProps = {
  mode: 'login' | 'register'
}

const CURRENT_YEAR = new Date().getFullYear()

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
      <path d="M9.9 5.2A10.7 10.7 0 0112 5c5.5 0 9 7 9 7a15 15 0 01-3 3.8M6.2 6.2C3.6 8 2 12 2 12s3.5 7 10 7a10 10 0 004-.8" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function AuthArtwork() {
  return (
    <section className="auth-art" aria-label="Discover opportunities that move you forward">
      <div className="auth-art-glow auth-art-glow-one" />
      <div className="auth-art-glow auth-art-glow-two" />
      <div className="auth-art-content">
        <div className="auth-pill">
          <span className="auth-pill-dot" />
          Your next chapter starts here
        </div>
        <h1>
          Big dreams.
          <br />
          <span>Real opportunities.</span>
        </h1>
        <p className="auth-art-copy">
          Find the scholarships, careers, and experiences that bring your future closer.
        </p>

        <div className="auth-illustration" aria-hidden="true">
          <div className="auth-orbit auth-orbit-one" />
          <div className="auth-orbit auth-orbit-two" />
          <div className="auth-sun" />
          <div className="auth-mountain auth-mountain-back" />
          <div className="auth-mountain auth-mountain-front" />
          <div className="auth-path" />
          <div className="auth-art-card auth-art-card-top">
            <span className="auth-card-icon auth-card-icon-lilac">✦</span>
            <span>
              <strong>Scholarships</strong>
              <small>Make learning possible</small>
            </span>
          </div>
          <div className="auth-art-card auth-art-card-bottom">
            <span className="auth-card-icon auth-card-icon-yellow">↗</span>
            <span>
              <strong>New possibilities</strong>
              <small>One good match away</small>
            </span>
            <span className="auth-match">NEW</span>
          </div>
        </div>

        <div className="auth-proof">
          <div className="auth-proof-avatars" aria-hidden="true">
            <span>T</span>
            <span>A</span>
            <span>M</span>
            <span>+</span>
          </div>
          <p>
            <strong>Made for your ambition</strong>
            <span>Explore what’s possible across Rwanda.</span>
          </p>
        </div>
      </div>
      <span className="auth-art-decoration auth-decoration-a" />
      <span className="auth-art-decoration auth-decoration-b" />
    </section>
  )
}

export default function AuthPage({ mode }: AuthPageProps) {
  const isRegister = mode === 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [feedback, setFeedback] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (isRegister && formData.get('password') !== formData.get('confirmPassword')) {
      setFeedback('Those passwords don’t match. Please check and try again.')
      return
    }

    setFeedback(
      'This form is ready for an account service, but authentication is not connected yet. Your details have not been sent.',
    )
  }

  return (
    <div className="auth-page">
      <a className="auth-skip" href="#auth-form">
        Skip to form
      </a>
      <div className="auth-shell">
        <header className="auth-header">
          <Link className="auth-brand" to="/" aria-label={`${SITE_NAME} home`}>
            <span className="auth-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M7 23.5L15.8 6l9.1 17.5h-5.2L15.8 14l-3.5 9.5H7z" />
                <path d="M19.2 19.7h7.1" />
              </svg>
            </span>
            <span>
              <strong>Opportunity</strong>
              <small>GATE RWANDA</small>
            </span>
          </Link>
          <p className="auth-header-prompt">
            {isRegister ? 'Already a member?' : 'New to Opportunity Gate?'}
            <Link to={isRegister ? '/login' : '/register'}>
              {isRegister ? ' Log in' : ' Create account'}
            </Link>
          </p>
        </header>

        <main className="auth-main">
          <AuthArtwork />
          <section className="auth-form-panel" aria-labelledby="auth-title">
            <div className="auth-form-wrap">
              <div className="auth-mobile-greeting">
                <span className="auth-mobile-sparkle" aria-hidden="true">✦</span>
                <p>Find your next opportunity</p>
              </div>
              <div className="auth-form-heading">
                <span className="auth-eyebrow">{isRegister ? 'YOUR FUTURE, UNLOCKED' : 'WELCOME BACK'}</span>
                <h2 id="auth-title">
                  {isRegister ? 'Create your account' : 'Good to see you again'}
                </h2>
                <p>
                  {isRegister
                    ? 'Join a community moving forward, one opportunity at a time.'
                    : 'Log in to pick up where your next big thing begins.'}
                </p>
              </div>

              <form id="auth-form" className="auth-form" onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="auth-field">
                    <label htmlFor="full-name">Full name</label>
                    <input
                      autoComplete="name"
                      id="full-name"
                      name="name"
                      placeholder="e.g. Aline Uwimana"
                      required
                    />
                  </div>
                )}

                <div className="auth-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    autoComplete="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>

                <div className="auth-field">
                  <div className="auth-label-row">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="auth-password-wrap">
                    <input
                      autoComplete={isRegister ? 'new-password' : 'current-password'}
                      id="password"
                      minLength={isRegister ? 8 : undefined}
                      name="password"
                      placeholder="Enter your password"
                      required
                      type={showPassword ? 'text' : 'password'}
                    />
                    <button
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="auth-password-toggle"
                      onClick={() => setShowPassword((value) => !value)}
                      type="button"
                    >
                      <EyeIcon hidden={!showPassword} />
                    </button>
                  </div>
                </div>

                {isRegister && (
                  <>
                    <div className="auth-field">
                      <label htmlFor="confirm-password">Confirm password</label>
                      <div className="auth-password-wrap">
                        <input
                          autoComplete="new-password"
                          id="confirm-password"
                          minLength={8}
                          name="confirmPassword"
                          placeholder="Enter your password again"
                          required
                          type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <button
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          className="auth-password-toggle"
                          onClick={() => setShowConfirmPassword((value) => !value)}
                          type="button"
                        >
                          <EyeIcon hidden={!showConfirmPassword} />
                        </button>
                      </div>
                    </div>
                    <div className="auth-check">
                      <input
                        aria-label="I agree to the Terms and Privacy Policy."
                        id="terms"
                        name="terms"
                        required
                        type="checkbox"
                      />
                      <div>
                        <label htmlFor="terms">I agree to the</label>{' '}
                        <Link to="/terms">Terms</Link> and{' '}
                        <Link to="/privacy">Privacy Policy</Link>.
                      </div>
                    </div>
                  </>
                )}

                {!isRegister && (
                  <div className="auth-remember-row">
                    <label className="auth-check">
                      <input name="remember" type="checkbox" />
                      <span>Remember me</span>
                    </label>
                    <span className="auth-label-hint">Forgot password? Contact support</span>
                  </div>
                )}

                <button className="auth-submit" type="submit">
                  <span>{isRegister ? 'Create my account' : 'Log in to my account'}</span>
                  <span aria-hidden="true">→</span>
                </button>
                {feedback && (
                  <p aria-live="polite" className="auth-feedback" role="status">
                    {feedback}
                  </p>
                )}
              </form>

              <div className="auth-divider">
                <span />
                <p>MADE FOR YOUR NEXT STEP</p>
                <span />
              </div>
              <p className="auth-secure-note">
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2.5l6 2.2v4.7c0 3.7-2.5 6.6-6 8.1-3.5-1.5-6-4.4-6-8.1V4.7L10 2.5z" />
                  <path d="M7.5 9.8l1.7 1.7 3.5-3.6" />
                </svg>
                Your details stay yours. Review our{' '}
                <Link to="/privacy">Privacy Policy</Link> to learn how account data is handled.
              </p>
              <p className="auth-mobile-switch">
                {isRegister ? 'Already have an account?' : 'Don’t have an account?'}
                <Link to={isRegister ? '/login' : '/register'}>
                  {isRegister ? ' Log in' : ' Sign up free'}
                </Link>
              </p>
            </div>
          </section>
        </main>
        <footer className="auth-footer">
          <span>© {CURRENT_YEAR} {SITE_NAME}</span>
          <span>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </span>
        </footer>
      </div>
    </div>
  )
}
