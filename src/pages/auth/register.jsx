import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'
import styles from '../../styles/auth.module.scss'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.visual}>
        <div className={styles.visualGrid} />
        <div className={styles.visualContent}>
          <div className={styles.visualTag}>
            <span className={styles.dot} />
            Free to start
          </div>
          <h2>Your forms. Your payments. One platform.</h2>
          <p>Start building professional forms with payment collection in minutes. No credit card required to get started.</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>Free</div>
              <div className={styles.statLabel}>Forever plan</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>5 min</div>
              <div className={styles.statLabel}>Setup time</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>Multi</div>
              <div className={styles.statLabel}>Gateways</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.formInner}>
          <div className={styles.header}>
            <Link href="/" className={styles.logoLink}>
              <span className={styles.mark}>PF</span>
              <span className={styles.name}>Paid<span>Form</span></span>
            </Link>
            <h1>Create your account</h1>
            <p>Join thousands of creators building smarter forms.</p>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.fields} style={{ marginTop: error ? 16 : 0 }}>
            <div className={styles.field}>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Alex Johnson"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                autoFocus
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className="spinner" /> : 'Create account'}
            </button>
          </form>

          <div className={styles.footer}>
            Already have an account?{' '}
            <Link href="/auth/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
