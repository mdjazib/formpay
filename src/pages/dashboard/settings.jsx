import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useAuth } from '../../contexts/AuthContext'
import AppShell from '../../components/layout/AppShell'
import styles from '../../styles/settings.module.scss'

const isProd = process.env.NEXT_PUBLIC_PAYMENT_PROD === 'true'

export default function SettingsPage() {
  const { user, loading, refreshUser } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [paymentKeys, setPaymentKeys] = useState({
    stripe: { publishable: '', secret: '' },
    razorpay: { keyId: '', keySecret: '' },
  })

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    setName(user.name || '')
    const load = async () => {
      const res = await fetch('/api/user/settings')
      if (res.ok) {
        const data = await res.json()
        if (data.paymentKeys) setPaymentKeys(data.paymentKeys)
      }
    }
    load()
  }, [user])

  const saveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        await refreshUser()
        toast.success('Profile updated')
      } else {
        toast.error('Failed to save')
      }
    } finally {
      setSaving(false)
    }
  }

  const savePaymentKeys = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentKeys }),
      })
      if (res.ok) toast.success('Payment keys saved')
      else toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner spinner-lg" />
      </div>
    )
  }

  return (
    <AppShell title="Settings">
      <div className={styles.page}>
        <div className="page-header" style={{ marginBottom: 24 }}>
          <div>
            <div className="page-title">Settings</div>
            <div className="page-subtitle">Manage your account and integrations</div>
          </div>
        </div>

        <div className={styles.sections}>
          <section className={styles.section}>
            <h2>Profile</h2>
            <form onSubmit={saveProfile} className={styles.form}>
              <div className={styles.field}>
                <label>Full name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input value={user.email} disabled />
                <span className={styles.hint}>Email cannot be changed</span>
              </div>
              <div className={styles.field}>
                <label>Plan</label>
                <div className={styles.planBadge}>
                  <span className={`badge ${user.plan === 'free' ? 'badge-gray' : 'badge-green'}`} style={{ fontSize: '0.8125rem' }}>
                    {user.plan?.toUpperCase()} plan
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <span className="spinner" /> : 'Save changes'}
              </button>
            </form>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Payment Integration</h2>
              {!isProd && (
                <span className="badge badge-yellow">Demo mode — no real payments</span>
              )}
            </div>
            <p className={styles.sectionDesc}>
              {isProd
                ? 'Configure your live payment gateway API keys. These are required to collect real payments.'
                : 'Payment mode is set to demo. Real API keys are only used when PAYMENT_PROD=true.'}
            </p>

            {isProd ? (
              <form onSubmit={savePaymentKeys} className={styles.form}>
                <fieldset className={styles.fieldset}>
                  <legend>Stripe</legend>
                  <div className={styles.field}>
                    <label>Publishable key</label>
                    <input
                      type="text"
                      placeholder="pk_live_..."
                      value={paymentKeys.stripe?.publishable || ''}
                      onChange={e => setPaymentKeys(k => ({ ...k, stripe: { ...k.stripe, publishable: e.target.value } }))}
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Secret key</label>
                    <input
                      type="password"
                      placeholder="sk_live_..."
                      value={paymentKeys.stripe?.secret || ''}
                      onChange={e => setPaymentKeys(k => ({ ...k, stripe: { ...k.stripe, secret: e.target.value } }))}
                    />
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend>Razorpay</legend>
                  <div className={styles.field}>
                    <label>Key ID</label>
                    <input
                      type="text"
                      placeholder="rzp_live_..."
                      value={paymentKeys.razorpay?.keyId || ''}
                      onChange={e => setPaymentKeys(k => ({ ...k, razorpay: { ...k.razorpay, keyId: e.target.value } }))}
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Key secret</label>
                    <input
                      type="password"
                      placeholder="Your Razorpay secret"
                      value={paymentKeys.razorpay?.keySecret || ''}
                      onChange={e => setPaymentKeys(k => ({ ...k, razorpay: { ...k.razorpay, keySecret: e.target.value } }))}
                    />
                  </div>
                </fieldset>

                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <span className="spinner" /> : 'Save payment keys'}
                </button>
              </form>
            ) : (
              <div className={styles.demoBox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20, color: '#B07D00' }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#525252' }}>Demo mode active</div>
                  <div style={{ fontSize: '0.8125rem', color: '#8D8D8D', marginTop: 4 }}>
                    No real payments will be processed. Set <code style={{ background: '#E8E8E8', padding: '1px 5px', borderRadius: 4 }}>PAYMENT_PROD=true</code> in your environment to enable live payments.
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  )
}
