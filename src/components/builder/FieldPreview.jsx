import styles from '../../styles/builder.module.scss'

export default function FieldPreview({ field }) {
  const { type, label, placeholder, helpText, required, options = [], settings = {} } = field

  if (type === 'divider') {
    return <div style={{ height: 1, background: '#E0E0E0', margin: '8px 0' }} />
  }

  if (type === 'heading') {
    return (
      <div style={{ padding: '16px 0 8px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#161616', letterSpacing: '-0.3px' }}>
          {placeholder || label || 'Section heading'}
        </h2>
      </div>
    )
  }

  if (type === 'paragraph') {
    return (
      <p style={{ fontSize: '0.875rem', color: '#525252', lineHeight: 1.6 }}>
        {placeholder || label || 'Paragraph text...'}
      </p>
    )
  }

  if (type === 'payment') {
    const isProd = process.env.NEXT_PUBLIC_PAYMENT_PROD === 'true'
    return (
      <div className={styles.paymentField}>
        <div className={styles.payIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
            <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>
        <div className={styles.payInfo}>
          <div className={styles.payAmount}>
            {settings.currency || 'USD'} {(settings.amount || 0).toFixed(2)}
          </div>
          <div className={styles.payGateway}>
            {isProd
              ? `via ${settings.paymentGateway || 'stripe'}`
              : 'Demo payment (test mode)'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {label && (
        <div className={styles.fieldLabel}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </div>
      )}

      <div className={styles.fieldPreview}>
        {type === 'text' && (
          <input type="text" placeholder={placeholder || 'Short answer'} readOnly />
        )}
        {type === 'email' && (
          <input type="email" placeholder={placeholder || 'email@example.com'} readOnly />
        )}
        {type === 'phone' && (
          <input type="tel" placeholder={placeholder || '+1 (555) 000-0000'} readOnly />
        )}
        {type === 'number' && (
          <input type="number" placeholder={placeholder || '0'} readOnly />
        )}
        {type === 'textarea' && (
          <textarea placeholder={placeholder || 'Long answer...'} readOnly />
        )}
        {type === 'date' && (
          <input type="date" readOnly />
        )}
        {type === 'time' && (
          <input type="time" readOnly />
        )}
        {type === 'select' && (
          <select disabled>
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
          </select>
        )}
        {type === 'radio' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(options.length ? options : [{ label: 'Option 1', value: 'opt1' }]).map((o, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: '#525252', cursor: 'default' }}>
                <input type="radio" disabled /> {o.label}
              </label>
            ))}
          </div>
        )}
        {type === 'checkbox' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(options.length ? options : [{ label: 'Option 1', value: 'opt1' }]).map((o, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: '#525252', cursor: 'default' }}>
                <input type="checkbox" disabled /> {o.label}
              </label>
            ))}
          </div>
        )}
        {type === 'rating' && (
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: settings.maxRating || 5 }, (_, i) => (
              <span key={i} style={{ fontSize: '1.5rem', color: '#E0E0E0' }}>★</span>
            ))}
          </div>
        )}
        {type === 'scale' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.75rem', color: '#8D8D8D' }}>1</span>
            <div style={{ flex: 1, height: 6, background: '#E0E0E0', borderRadius: 3 }} />
            <span style={{ fontSize: '0.75rem', color: '#8D8D8D' }}>10</span>
          </div>
        )}
        {type === 'file' && (
          <div style={{ border: '2px dashed #C6C6C6', borderRadius: 8, padding: '24px', textAlign: 'center', color: '#8D8D8D', fontSize: '0.875rem' }}>
            Click to upload or drag and drop
          </div>
        )}
      </div>

      {helpText && (
        <p style={{ fontSize: '0.75rem', color: '#8D8D8D', marginTop: 4 }}>{helpText}</p>
      )}
    </div>
  )
}
