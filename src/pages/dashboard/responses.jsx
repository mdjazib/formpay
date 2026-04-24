import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '../../contexts/AuthContext'
import AppShell from '../../components/layout/AppShell'

export default function AllResponsesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [forms, setForms] = useState([])
  const [formsLoading, setFormsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      const res = await fetch('/api/forms?limit=100')
      if (res.ok) {
        const data = await res.json()
        setForms(data.forms.filter(f => f.responseCount > 0))
      }
      setFormsLoading(false)
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

  return (
    <AppShell title="Responses">
      <div style={{ maxWidth: 800 }}>
        <div className="page-header">
          <div>
            <div className="page-title">Responses</div>
            <div className="page-subtitle">Forms with submissions</div>
          </div>
        </div>

        {formsLoading ? (
          <div style={{ textAlign: 'center', padding: 64 }}><span className="spinner spinner-lg" /></div>
        ) : forms.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
            <div className="empty-title">No responses yet</div>
            <div className="empty-desc">Publish and share your forms to start collecting responses.</div>
            <Link href="/dashboard/forms"><button className="btn btn-primary">Go to Forms</button></Link>
          </div>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: 12, overflow: 'hidden' }}>
            {forms.map((form, i) => (
              <Link key={form._id} href={`/dashboard/forms/${form._id}/responses`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px',
                  borderBottom: i < forms.length - 1 ? '1px solid #E0E0E0' : 'none',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F4F4F4'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  <div style={{ width: 36, height: 36, background: '#EFF4FF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F62FE', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 500, fontSize: '0.9375rem', color: '#161616', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#8D8D8D', marginTop: 2 }}>
                      Updated {formatDistanceToNow(new Date(form.updatedAt), { addSuffix: true })}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#161616' }}>{form.responseCount}</div>
                      <div style={{ fontSize: '0.75rem', color: '#8D8D8D' }}>responses</div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, color: '#8D8D8D' }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
