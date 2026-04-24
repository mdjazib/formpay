import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { useAuth } from '../../../../contexts/AuthContext'
import AppShell from '../../../../components/layout/AppShell'
import styles from '../../../../styles/responses.module.scss'

export default function FormResponsesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { id } = router.query

  const [form, setForm] = useState(null)
  const [responses, setResponses] = useState([])
  const [total, setTotal] = useState(0)
  const [loadingData, setLoadingData] = useState(true)
  const [selectedResponse, setSelectedResponse] = useState(null)

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!id || !user) return
    const load = async () => {
      const [formRes, respRes] = await Promise.all([
        fetch(`/api/forms/${id}`),
        fetch(`/api/responses?formId=${id}&limit=100`),
      ])
      if (formRes.ok) setForm((await formRes.json()).form)
      if (respRes.ok) {
        const d = await respRes.json()
        setResponses(d.responses)
        setTotal(d.total)
      }
      setLoadingData(false)
    }
    load()
  }, [id, user])

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner spinner-lg" />
      </div>
    )
  }

  return (
    <AppShell title={form?.title || 'Responses'}>
      <div className={styles.page}>
        <div className="page-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Link href="/dashboard/forms" style={{ fontSize: '0.875rem', color: '#525252' }}>
                Forms
              </Link>
              <span style={{ color: '#C6C6C6' }}>/</span>
              <span style={{ fontSize: '0.875rem', color: '#161616', fontWeight: 500 }}>{form?.title || '...'}</span>
            </div>
            <div className="page-title">Responses</div>
            <div className="page-subtitle">{total} total submission{total !== 1 ? 's' : ''}</div>
          </div>
          <Link href={`/dashboard/forms/${id}/edit`}>
            <button className="btn btn-secondary">Edit Form</button>
          </Link>
        </div>

        {loadingData ? (
          <div style={{ textAlign: 'center', padding: 64 }}><span className="spinner spinner-lg" /></div>
        ) : responses.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
            <div className="empty-title">No responses yet</div>
            <div className="empty-desc">Share your form link to start collecting responses.</div>
            {form?.settings?.isPublished && (
              <button className="btn btn-primary" onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/f/${form.slug}`)
                alert('Link copied!')
              }}>
                Copy form link
              </button>
            )}
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.responseList}>
              {responses.map((resp, i) => (
                <div
                  key={resp._id}
                  className={`${styles.responseItem} ${selectedResponse?._id === resp._id ? styles.active : ''}`}
                  onClick={() => setSelectedResponse(selectedResponse?._id === resp._id ? null : resp)}
                >
                  <div className={styles.responseNum}>#{total - i}</div>
                  <div className={styles.responseInfo}>
                    <div className={styles.responseDate}>
                      {format(new Date(resp.submittedAt || resp.createdAt), 'MMM d, yyyy HH:mm')}
                    </div>
                    <div className={styles.responseMeta}>
                      {Object.keys(resp.answers || {}).length} answers
                      {resp.payment?.status === 'completed' && (
                        <span className="badge badge-green" style={{ marginLeft: 6 }}>Paid</span>
                      )}
                      {resp.payment?.status === 'demo' && (
                        <span className="badge badge-blue" style={{ marginLeft: 6 }}>Demo</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.responseDetail}>
              {selectedResponse ? (
                <ResponseDetail response={selectedResponse} form={form} />
              ) : (
                <div style={{ padding: 40, textAlign: 'center', color: '#8D8D8D', fontSize: '0.875rem' }}>
                  Select a response to view details
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}

function ResponseDetail({ response, form }) {
  const answers = response.answers instanceof Map
    ? Object.fromEntries(response.answers)
    : response.answers || {}

  const getFieldLabel = (fieldId) => {
    const field = form?.fields?.find(f => f.id === fieldId)
    return field?.label || fieldId
  }

  return (
    <div className={styles.detail}>
      <div className={styles.detailHeader}>
        <h3>Response details</h3>
        <div style={{ fontSize: '0.75rem', color: '#8D8D8D' }}>
          Submitted {format(new Date(response.submittedAt || response.createdAt), 'PPpp')}
        </div>
      </div>

      {response.payment?.status && response.payment.status !== 'pending' && (
        <div className={styles.paymentBanner}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
              {response.payment.status === 'demo' ? 'Demo payment' : `Payment ${response.payment.status}`}
            </div>
            {response.payment.amount && (
              <div style={{ fontSize: '0.75rem', color: '#525252' }}>
                {response.payment.currency} {response.payment.amount?.toFixed(2)}
                {response.payment.transactionId && ` · ${response.payment.transactionId}`}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.answers}>
        {Object.entries(answers).map(([fieldId, value]) => (
          <div key={fieldId} className={styles.answerRow}>
            <div className={styles.answerLabel}>{getFieldLabel(fieldId)}</div>
            <div className={styles.answerValue}>
              {Array.isArray(value) ? value.join(', ') : String(value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
