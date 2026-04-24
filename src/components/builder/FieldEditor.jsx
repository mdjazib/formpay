import { useState } from 'react'
import styles from '../../styles/builder.module.scss'

export default function FieldEditor({ field, onChange }) {
  const [tab, setTab] = useState('content')

  if (!field) {
    return (
      <div className={styles.emptyEditor}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        <p>Select a field to edit its properties</p>
      </div>
    )
  }

  const update = (key, value) => {
    onChange({ ...field, [key]: value })
  }

  const updateSettings = (key, value) => {
    onChange({ ...field, settings: { ...field.settings, [key]: value } })
  }

  const updateValidation = (key, value) => {
    onChange({ ...field, validation: { ...field.validation, [key]: value } })
  }

  const isLayout = ['heading', 'paragraph', 'divider'].includes(field.type)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={styles.editorTabs}>
        <button className={tab === 'content' ? styles.active : ''} onClick={() => setTab('content')}>Content</button>
        {!isLayout && (
          <>
            <button className={tab === 'validation' ? styles.active : ''} onClick={() => setTab('validation')}>Validation</button>
            <button className={tab === 'style' ? styles.active : ''} onClick={() => setTab('style')}>Style</button>
          </>
        )}
      </div>

      <div className={styles.editorBody}>
        {tab === 'content' && <ContentTab field={field} update={update} updateSettings={updateSettings} />}
        {tab === 'validation' && !isLayout && <ValidationTab field={field} update={update} updateValidation={updateValidation} />}
        {tab === 'style' && !isLayout && <StyleTab field={field} update={update} />}
      </div>
    </div>
  )
}

function ContentTab({ field, update, updateSettings }) {
  const { type } = field
  const hasOptions = ['select', 'radio', 'checkbox'].includes(type)

  return (
    <>
      {!['divider'].includes(type) && (
        <div className={styles.editorGroup}>
          <label>Label</label>
          <input
            value={field.label || ''}
            onChange={e => update('label', e.target.value)}
            placeholder="Field label"
          />
        </div>
      )}

      {['heading', 'paragraph'].includes(type) && (
        <div className={styles.editorGroup}>
          <label>Content</label>
          <textarea
            value={field.placeholder || ''}
            onChange={e => update('placeholder', e.target.value)}
            placeholder={type === 'heading' ? 'Heading text...' : 'Paragraph text...'}
          />
        </div>
      )}

      {!['heading', 'paragraph', 'divider', 'rating', 'scale', 'payment', 'file'].includes(type) && (
        <div className={styles.editorGroup}>
          <label>Placeholder</label>
          <input
            value={field.placeholder || ''}
            onChange={e => update('placeholder', e.target.value)}
            placeholder="Placeholder text"
          />
        </div>
      )}

      <div className={styles.editorGroup}>
        <label>Help text</label>
        <input
          value={field.helpText || ''}
          onChange={e => update('helpText', e.target.value)}
          placeholder="Optional help text"
        />
      </div>

      {hasOptions && (
        <div className={styles.editorGroup}>
          <label>Options</label>
          <OptionsEditor options={field.options || []} onChange={opts => update('options', opts)} />
        </div>
      )}

      {type === 'rating' && (
        <div className={styles.editorGroup}>
          <label>Max rating</label>
          <select value={field.settings?.maxRating || 5} onChange={e => updateSettings('maxRating', Number(e.target.value))}>
            {[3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n} stars</option>
            ))}
          </select>
        </div>
      )}

      {type === 'payment' && (
        <>
          <div className={styles.editorGroup}>
            <label>Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={field.settings?.amount || ''}
              onChange={e => updateSettings('amount', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </div>
          <div className={styles.editorGroup}>
            <label>Currency</label>
            <select value={field.settings?.currency || 'USD'} onChange={e => updateSettings('currency', e.target.value)}>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="INR">INR — Indian Rupee</option>
              <option value="PKR">PKR — Pakistani Rupee</option>
              <option value="BDT">BDT — Bangladeshi Taka</option>
            </select>
          </div>
          <div className={styles.editorGroup}>
            <label>Payment gateway</label>
            <select value={field.settings?.paymentGateway || 'demo'} onChange={e => updateSettings('paymentGateway', e.target.value)}>
              <option value="demo">Demo (test mode)</option>
              <option value="stripe">Stripe</option>
              <option value="razorpay">Razorpay</option>
            </select>
          </div>
        </>
      )}

      {type === 'file' && (
        <>
          <div className={styles.editorGroup}>
            <label>Max file size (MB)</label>
            <input
              type="number"
              min="1"
              max="50"
              value={field.settings?.maxFileSize || 10}
              onChange={e => updateSettings('maxFileSize', Number(e.target.value))}
            />
          </div>
        </>
      )}
    </>
  )
}

function ValidationTab({ field, update, updateValidation }) {
  return (
    <>
      <label className={styles.switchWrap} onClick={() => update('required', !field.required)}>
        <span className={styles.switchLabel}>Required field</span>
        <span className={`${styles.switch} ${field.required ? styles.on : ''}`} />
      </label>

      {['text', 'textarea', 'email', 'phone'].includes(field.type) && (
        <>
          <div className={styles.editorGroup}>
            <label>Min length</label>
            <input
              type="number"
              min="0"
              value={field.validation?.minLength || ''}
              onChange={e => updateValidation('minLength', Number(e.target.value) || undefined)}
              placeholder="No minimum"
            />
          </div>
          <div className={styles.editorGroup}>
            <label>Max length</label>
            <input
              type="number"
              min="0"
              value={field.validation?.maxLength || ''}
              onChange={e => updateValidation('maxLength', Number(e.target.value) || undefined)}
              placeholder="No maximum"
            />
          </div>
        </>
      )}

      {field.type === 'number' && (
        <>
          <div className={styles.editorGroup}>
            <label>Min value</label>
            <input
              type="number"
              value={field.validation?.min ?? ''}
              onChange={e => updateValidation('min', e.target.value !== '' ? Number(e.target.value) : undefined)}
              placeholder="No minimum"
            />
          </div>
          <div className={styles.editorGroup}>
            <label>Max value</label>
            <input
              type="number"
              value={field.validation?.max ?? ''}
              onChange={e => updateValidation('max', e.target.value !== '' ? Number(e.target.value) : undefined)}
              placeholder="No maximum"
            />
          </div>
        </>
      )}
    </>
  )
}

function StyleTab({ field, update }) {
  return (
    <div className={styles.editorGroup}>
      <label>Width</label>
      <select
        value={field.style?.width || 'full'}
        onChange={e => update('style', { ...field.style, width: e.target.value })}
      >
        <option value="full">Full width</option>
        <option value="half">Half width</option>
        <option value="third">One third</option>
      </select>
    </div>
  )
}

function OptionsEditor({ options, onChange }) {
  const add = () => onChange([...options, { label: `Option ${options.length + 1}`, value: `option_${options.length + 1}` }])
  const remove = (i) => onChange(options.filter((_, idx) => idx !== i))
  const update = (i, val) => {
    const next = [...options]
    next[i] = { label: val, value: val.toLowerCase().replace(/\s+/g, '_') }
    onChange(next)
  }

  return (
    <>
      <div className={styles.optionsList}>
        {options.map((opt, i) => (
          <div key={i} className={styles.optionItem}>
            <input value={opt.label} onChange={e => update(i, e.target.value)} placeholder={`Option ${i + 1}`} />
            <button onClick={() => remove(i)} title="Remove">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button className={styles.addOptionBtn} onClick={add}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add option
      </button>
    </>
  )
}
