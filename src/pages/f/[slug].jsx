import { useState, useRef } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import styles from '../../styles/formView.module.scss'

const isProd = process.env.NEXT_PUBLIC_PAYMENT_PROD === 'true'

export default function PublicFormPage({ form, error }) {
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [paymentToken, setPaymentToken] = useState(null)
  const startTime = useRef(Date.now())

  if (error || !form) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Form not found</h1>
          <p>This form may have been removed or the link is incorrect.</p>
          <Link href="/"><button className="btn btn-primary">Go home</button></Link>
        </div>
      </div>
    )
  }

  if (!form.settings?.isPublished) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Form unavailable</h1>
          <p>This form is not currently accepting responses.</p>
          <Link href="/"><button className="btn btn-secondary">Go home</button></Link>
        </div>
      </div>
    )
  }

  const contentFields = form.fields?.filter(f => f.type !== 'payment') || []
  const paymentField = form.fields?.find(f => f.type === 'payment')
  const hasPayment = !!paymentField && form.payment?.enabled !== false

  const setAnswer = (fieldId, value) => {
    setAnswers(a => ({ ...a, [fieldId]: value }))
    if (errors[fieldId]) setErrors(e => { const n = { ...e }; delete n[fieldId]; return n })
  }

  const validate = () => {
    const errs = {}
    form.fields?.forEach(f => {
      if (f.type === 'payment' || f.type === 'divider' || f.type === 'heading' || f.type === 'paragraph') return
      if (f.required && !answers[f.id]) {
        errs[f.id] = `${f.label || 'This field'} is required`
      }
    })
    return errs
  }

  const processPayment = async () => {
    setPaymentProcessing(true)
    try {
      if (!isProd) {
        const res = await fetch('/api/payments/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: paymentField.settings?.amount,
            currency: paymentField.settings?.currency || 'USD',
            description: form.title,
          }),
        })
        const data = await res.json()
        if (data.success) {
          setPaymentToken(data.transactionId)
          setPaymentDone(true)
          toast.success('Demo payment processed!')
          return data.transactionId
        }
      }
      return null
    } catch {
      toast.error('Payment failed. Please try again.')
      return null
    } finally {
      setPaymentProcessing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    let token = paymentToken
    if (hasPayment && !paymentDone) {
      toast.error('Please complete payment before submitting')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: form._id,
          answers,
          paymentToken: token,
          completionTime: Math.round((Date.now() - startTime.current) / 1000),
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
        if (data.redirectUrl) {
          setTimeout(() => window.location.href = data.redirectUrl, 2000)
        }
      } else {
        toast.error(data.error || 'Submission failed')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.formCard}>
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 32, height: 32 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>{form.settings?.successMessage || 'Thank you!'}</h2>
            <p>Your response has been recorded successfully.</p>
            {hasPayment && <span className="badge badge-green">Payment confirmed</span>}
          </div>
        </div>
        <div className={styles.footer}>
          Powered by <Link href="/"><a><span>Paid</span>Form</a></Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1>{form.title}</h1>
          {form.description && <p>{form.description}</p>}
        </div>

        <form onSubmit={handleSubmit} className={styles.formBody}>
          {contentFields.map(field => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={answers[field.id]}
              onChange={val => setAnswer(field.id, val)}
              error={errors[field.id]}
            />
          ))}

          {hasPayment && paymentField && (
            <div className={styles.paymentSection}>
              {!isProd && (
                <div className={styles.demoBadge}>
                  Test mode — no real payment
                </div>
              )}
              <div className={styles.payHead}>Payment required</div>
              <div className={styles.payAmount}>
                {paymentField.settings?.currency || 'USD'} {Number(paymentField.settings?.amount || 0).toFixed(2)}
              </div>
              <div className={styles.payGateway}>
                {isProd
                  ? `Secured via ${paymentField.settings?.paymentGateway || 'Stripe'}`
                  : 'Demo payment — no real charges'}
              </div>
              {!paymentDone ? (
                <button
                  type="button"
                  className={styles.payBtn}
                  onClick={processPayment}
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? <span className="spinner" /> : null}
                  {paymentProcessing ? 'Processing...' : isProd ? 'Pay now' : 'Simulate Payment'}
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: '#24A148', fontWeight: 600, fontSize: '0.875rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 18, height: 18 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Payment confirmed
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting || (hasPayment && !paymentDone)}
          >
            {submitting ? <span className="spinner" /> : null}
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      <div className={styles.footer}>
        Powered by <Link href="/">
          <span style={{ cursor: 'pointer', color: '#0F62FE', fontWeight: 600 }}>
            PaidForm
          </span>
        </Link>
      </div>
    </div>
  )
}

function FieldRenderer({ field, value, onChange, error }) {
  const { type, label, placeholder, helpText, required, options = [], settings = {} } = field

  if (type === 'divider') return <hr className={styles.divider} />
  if (type === 'heading') return <h2 className={styles.sectionHeading}>{placeholder || label}</h2>
  if (type === 'paragraph') return <p className={styles.paragraph}>{placeholder || label}</p>

  const inputClass = error ? `${styles.error}` : ''

  return (
    <div className={styles.fieldWrap}>
      {label && (
        <label>
          {label}
          {required && <span className={styles.req}>*</span>}
        </label>
      )}

      {(type === 'text' || type === 'email' || type === 'phone' || type === 'number') && (
        <input
          type={type === 'phone' ? 'tel' : type}
          placeholder={placeholder}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
          required={required}
        />
      )}

      {type === 'textarea' && (
        <textarea
          placeholder={placeholder}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
          required={required}
        />
      )}

      {type === 'date' && (
        <input type="date" value={value || ''} onChange={e => onChange(e.target.value)} className={inputClass} required={required} />
      )}

      {type === 'time' && (
        <input type="time" value={value || ''} onChange={e => onChange(e.target.value)} className={inputClass} required={required} />
      )}

      {type === 'select' && (
        <select value={value || ''} onChange={e => onChange(e.target.value)} className={inputClass} required={required}>
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
        </select>
      )}

      {type === 'radio' && (
        <div className={styles.radioGroup}>
          {options.map((o, i) => (
            <label key={i} className={`${styles.radioOpt} ${value === o.value ? styles.selected : ''}`}>
              <input type="radio" name={field.id} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      )}

      {type === 'checkbox' && (
        <div className={styles.checkGroup}>
          {options.map((o, i) => {
            const checked = Array.isArray(value) && value.includes(o.value)
            const toggle = () => {
              const arr = Array.isArray(value) ? value : []
              onChange(checked ? arr.filter(v => v !== o.value) : [...arr, o.value])
            }
            return (
              <label key={i} className={`${styles.checkOpt} ${checked ? styles.selected : ''}`}>
                <input type="checkbox" checked={checked} onChange={toggle} />
                <span>{o.label}</span>
              </label>
            )
          })}
        </div>
      )}

      {type === 'rating' && (
        <div className={styles.ratingGroup}>
          {Array.from({ length: settings.maxRating || 5 }, (_, i) => (
            <span
              key={i}
              className={`${styles.star} ${value && i < value ? styles.filled : ''}`}
              onClick={() => onChange(i + 1)}
            >★</span>
          ))}
        </div>
      )}

      {type === 'scale' && (
        <div className={styles.scaleGroup}>
          <div className={styles.scaleTrack}>
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={value === i + 1 ? styles.active : ''}
                onClick={() => onChange(i + 1)}
              >{i + 1}</button>
            ))}
          </div>
          <div className={styles.scaleLabels}><span>Not at all</span><span>Extremely</span></div>
        </div>
      )}

      {type === 'file' && (
        <label className={styles.fileInput}>
          <input type="file" onChange={e => onChange(e.target.files[0])} accept={settings.acceptedTypes?.join(',')} />
          {value ? (
            <div className={styles.fileName}>{value.name}</div>
          ) : (
            <>
              <svg className={styles.fileIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 32, height: 32 }}>
                <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
              </svg>
              <p>Click to upload or drag and drop</p>
              <span className={styles.fileSize}>Max {settings.maxFileSize || 10} MB</span>
            </>
          )}
        </label>
      )}

      {helpText && <p className={styles.help}>{helpText}</p>}
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params
  try {
    const connectDB = (await import('../../lib/mongodb')).default
    const Form = (await import('../../models/Form')).default
    await connectDB()
    const form = await Form.findOne({ slug }).lean()
    if (!form) return { props: { form: null, error: 'Not found' } }
    return {
      props: {
        form: JSON.parse(JSON.stringify(form)),
        error: null,
      },
    }
  } catch (err) {
    return { props: { form: null, error: 'Server error' } }
  }
}
