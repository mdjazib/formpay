import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import { useAuth } from '../../../contexts/AuthContext'
import AppShell from '../../../components/layout/AppShell'
import styles from '../../../styles/forms.module.scss'

export default function FormsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [forms, setForms] = useState([])
  const [formsLoading, setFormsLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      const res = await fetch('/api/forms?limit=100')
      if (res.ok) {
        const data = await res.json()
        setForms(data.forms)
      }
      setFormsLoading(false)
    }
    load()
  }, [user])

  const createForm = async () => {
    setCreating(true)
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Untitled Form' }),
      })
      const data = await res.json()
      if (res.ok) router.push(`/dashboard/forms/${data.form._id}/edit`)
      else toast.error(data.error)
    } catch {
      toast.error('Failed to create form')
    } finally {
      setCreating(false)
    }
  }

  const deleteForm = async (id) => {
    if (!confirm('Delete this form? This cannot be undone.')) return
    setDeleting(id)
    try {
      await fetch(`/api/forms/${id}`, { method: 'DELETE' })
      setForms(f => f.filter(x => x._id !== id))
      toast.success('Form deleted')
    } finally {
      setDeleting(null)
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
    <AppShell title="My Forms">
      <div className={styles.page}>
        <div className="page-header">
          <div>
            <div className="page-title">My Forms</div>
            <div className="page-subtitle">{forms.length} form{forms.length !== 1 ? 's' : ''}</div>
          </div>
          <button className="btn btn-primary" onClick={createForm} disabled={creating}>
            {creating ? <span className="spinner" /> : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
            New Form
          </button>
        </div>

        {formsLoading ? (
          <div style={{ textAlign: 'center', padding: 64 }}><span className="spinner spinner-lg" /></div>
        ) : forms.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <div className="empty-title">No forms yet</div>
            <div className="empty-desc">Create your first form and start collecting responses with payment support.</div>
            <button className="btn btn-primary" onClick={createForm} disabled={creating}>
              {creating ? 'Creating...' : 'Create your first form'}
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {forms.map(form => (
              <FormCard
                key={form._id}
                form={form}
                onDelete={() => deleteForm(form._id)}
                isDeleting={deleting === form._id}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

function FormCard({ form, onDelete, isDeleting }) {
  const copyLink = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.origin}/f/${form.slug}`)
    toast.success('Link copied!')
  }

  return (
    <div className={styles.formCard}>
      <div className={styles.cardTop}>
        <div className={styles.cardIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <div className={styles.cardStatus}>
          {form.settings?.isPublished ? (
            <span className="badge badge-green">Live</span>
          ) : (
            <span className="badge badge-gray">Draft</span>
          )}
        </div>
      </div>

      <h3 className={styles.cardTitle}>{form.title}</h3>
      {form.description && (
        <p className={styles.cardDesc}>{form.description}</p>
      )}

      <div className={styles.cardMeta}>
        <span>{form.responseCount || 0} responses</span>
        <span>{form.fields?.length || 0} fields</span>
        <span>{formatDistanceToNow(new Date(form.updatedAt), { addSuffix: true })}</span>
      </div>

      <div className={styles.cardActions}>
        <Link href={`/dashboard/forms/${form._id}/edit`}>
          <button className="btn btn-secondary btn-sm">Edit</button>
        </Link>
        <Link href={`/dashboard/forms/${form._id}/responses`}>
          <button className="btn btn-ghost btn-sm">Responses</button>
        </Link>
        {form.settings?.isPublished && (
          <button className="btn btn-ghost btn-sm" onClick={copyLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </button>
        )}
        <button
          className="btn btn-ghost btn-sm"
          style={{ marginLeft: 'auto', color: '#DA1E28' }}
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <span className="spinner" /> : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
