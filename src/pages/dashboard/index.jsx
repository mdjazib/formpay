import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'
import AppShell from '../../components/layout/AppShell'
import styles from '../../styles/dashboard.module.scss'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [forms, setForms] = useState([])
  const [stats, setStats] = useState({ forms: 0, responses: 0, payments: 0 })
  const [formsLoading, setFormsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      try {
        const res = await fetch('/api/forms?limit=5')
        if (res.ok) {
          const data = await res.json()
          setForms(data.forms)
          setStats(s => ({ ...s, forms: data.total }))
        }
      } finally {
        setFormsLoading(false)
      }
    }
    load()
  }, [user])

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner spinner-lg" />
      </div>
    )
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <AppShell title="Dashboard">
      <div className={styles.dashboard}>
        <div className={styles.greet}>
          <h1>{greeting}, {user.name.split(' ')[0]}.</h1>
          <p>Here&apos;s what&apos;s happening with your forms.</p>
        </div>

        <div className={styles.statsGrid}>
          <StatCard label="Total Forms" value={stats.forms} icon={IconFile} color="blue" />
          <StatCard label="Responses" value={user.responseCount || 0} icon={IconInbox} color="green" />
          <StatCard label="Payments Collected" value="$0" icon={IconDollar} color="amber" />
          <StatCard label="Conversion Rate" value="—" icon={IconTrend} color="gray" />
        </div>

        <div className={styles.twoCol}>
          <div className={styles.recentForms}>
            <div className={styles.sectionHead}>
              <h2>Recent Forms</h2>
              <Link href="/dashboard/forms" className="btn btn-ghost btn-sm">View all</Link>
            </div>

            {formsLoading ? (
              <div style={{ padding: 32, textAlign: 'center' }}><span className="spinner" /></div>
            ) : forms.length === 0 ? (
              <div className={styles.emptyForms}>
                <IconFile style={{ width: 40, height: 40, color: '#C6C6C6' }} />
                <p>No forms yet. Create your first form!</p>
                <Link href="/dashboard/forms/new">
                  <button className="btn btn-primary btn-sm">Create Form</button>
                </Link>
              </div>
            ) : (
              <div className={styles.formList}>
                {forms.map(form => (
                  <FormRow key={form._id} form={form} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.quickActions}>
            <div className={styles.sectionHead}>
              <h2>Quick Actions</h2>
            </div>
            <div className={styles.actions}>
              <ActionCard
                href="/dashboard/forms/new"
                icon={IconPlus}
                label="New Form"
                desc="Start from scratch"
              />
              <ActionCard
                href="/dashboard/forms"
                icon={IconFile}
                label="My Forms"
                desc="Manage all forms"
              />
              <ActionCard
                href="/dashboard/responses"
                icon={IconInbox}
                label="Responses"
                desc="View submissions"
              />
              <ActionCard
                href="/dashboard/settings"
                icon={IconSettings}
                label="Settings"
                desc="Keys & preferences"
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function StatCard({ label, value, icon: Icon, color }) {
  const colors = {
    blue: { bg: '#EFF4FF', color: '#0F62FE' },
    green: { bg: '#DEFBE6', color: '#24A148' },
    amber: { bg: '#FFF8E1', color: '#B07D00' },
    gray: { bg: '#F4F4F4', color: '#525252' },
  }
  const c = colors[color] || colors.gray
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ background: c.bg, color: c.color }}>
        <Icon style={{ width: 20, height: 20 }} />
      </div>
      <div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  )
}

function FormRow({ form }) {
  return (
    <Link href={`/dashboard/forms/${form._id}`} className={styles.formRow}>
      <div className={styles.formRowIcon}>
        <IconFile style={{ width: 16, height: 16 }} />
      </div>
      <div className={styles.formRowInfo}>
        <div className={styles.formRowTitle}>{form.title}</div>
        <div className={styles.formRowMeta}>
          {form.responseCount || 0} responses
          {form.settings?.isPublished ? (
            <span className="badge badge-green" style={{ marginLeft: 8 }}>Live</span>
          ) : (
            <span className="badge badge-gray" style={{ marginLeft: 8 }}>Draft</span>
          )}
        </div>
      </div>
      <IconChevron style={{ width: 16, height: 16, color: '#8D8D8D', flexShrink: 0 }} />
    </Link>
  )
}

function ActionCard({ href, icon: Icon, label, desc }) {
  return (
    <Link href={href} className={styles.actionCard}>
      <div className={styles.actionIcon}>
        <Icon style={{ width: 18, height: 18 }} />
      </div>
      <div>
        <div className={styles.actionLabel}>{label}</div>
        <div className={styles.actionDesc}>{desc}</div>
      </div>
    </Link>
  )
}

function IconFile({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
}
function IconInbox({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
}
function IconDollar({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}
function IconTrend({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
}
function IconPlus({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
function IconSettings({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}
function IconChevron({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
}
