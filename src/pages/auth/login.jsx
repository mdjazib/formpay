import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'
import styles from '../../styles/auth.module.scss'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
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
            Advanced Form Builder
          </div>
          <h2>Build forms that actually get paid.</h2>
          <p>Create powerful forms with integrated payments, collect responses, and get paid — all in one place.</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>10k+</div>
              <div className={styles.statLabel}>Forms created</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>98%</div>
              <div className={styles.statLabel}>Payment success</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>4.9★</div>
              <div className={styles.statLabel}>User rating</div>
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
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue.</p>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.fields} style={{ marginTop: error ? 16 : 0 }}>
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
                autoFocus
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className="spinner" /> : 'Sign in'}
            </button>
          </form>

          <div className={styles.footer}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register">Create one free</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
