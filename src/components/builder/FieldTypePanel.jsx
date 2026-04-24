import { v4 as uuidv4 } from 'uuid'
import styles from '../../styles/builder.module.scss'

const fieldGroups = [
  {
    label: 'Basic',
    types: [
      { type: 'text', label: 'Text', icon: IconText },
      { type: 'textarea', label: 'Long Text', icon: IconTextarea },
      { type: 'email', label: 'Email', icon: IconEmail },
      { type: 'phone', label: 'Phone', icon: IconPhone },
      { type: 'number', label: 'Number', icon: IconHash },
      { type: 'date', label: 'Date', icon: IconCalendar },
    ],
  },
  {
    label: 'Choice',
    types: [
      { type: 'select', label: 'Dropdown', icon: IconSelect },
      { type: 'radio', label: 'Single Choice', icon: IconRadio },
      { type: 'checkbox', label: 'Multi Choice', icon: IconCheck },
    ],
  },
  {
    label: 'Advanced',
    types: [
      { type: 'rating', label: 'Rating', icon: IconStar },
      { type: 'scale', label: 'Scale', icon: IconSlider },
      { type: 'file', label: 'File Upload', icon: IconUpload },
      { type: 'time', label: 'Time', icon: IconClock },
    ],
  },
  {
    label: 'Layout',
    types: [
      { type: 'heading', label: 'Heading', icon: IconH },
      { type: 'paragraph', label: 'Text Block', icon: IconPara },
      { type: 'divider', label: 'Divider', icon: IconDivider },
    ],
  },
  {
    label: 'Payment',
    types: [
      { type: 'payment', label: 'Payment', icon: IconCard },
    ],
  },
]

const defaultField = (type) => ({
  id: uuidv4(),
  type,
  label: type === 'divider' ? '' : type === 'heading' ? 'Section Heading' : type === 'paragraph' ? '' : `${type.charAt(0).toUpperCase() + type.slice(1)} field`,
  placeholder: '',
  helpText: '',
  required: false,
  options: ['select', 'radio', 'checkbox'].includes(type)
    ? [{ label: 'Option 1', value: 'option_1' }, { label: 'Option 2', value: 'option_2' }]
    : [],
  validation: {},
  settings: type === 'payment'
    ? { amount: 10, currency: 'USD', paymentGateway: 'demo' }
    : type === 'rating'
    ? { maxRating: 5 }
    : {},
  style: { width: 'full' },
})

export default function FieldTypePanel({ onAdd }) {
  return (
    <div>
      <div className={styles.fieldPanelHead}>
        <h3>Add Field</h3>
      </div>
      {fieldGroups.map(group => (
        <div key={group.label} className={styles.fieldGroup}>
          <div className={styles.fieldGroupLabel}>{group.label}</div>
          <div className={styles.fieldGroupGrid}>
            {group.types.map(ft => (
              <button
                key={ft.type}
                className={styles.fieldType}
                onClick={() => onAdd(defaultField(ft.type))}
                title={`Add ${ft.label} field`}
              >
                <ft.icon className={styles.fieldTypeIcon} />
                <span className={styles.fieldTypeLabel}>{ft.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { defaultField }

function IconText({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
}
function IconTextarea({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="9" x2="18" y2="9"/><line x1="6" y1="13" x2="14" y2="13"/></svg>
}
function IconEmail({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function IconPhone({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44A2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9A16 16 0 0 0 15 16.09l1.95-1.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 24 16.92z"/></svg>
}
function IconHash({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
}
function IconCalendar({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function IconSelect({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><polyline points="8 10 12 14 16 10"/></svg>
}
function IconRadio({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></svg>
}
function IconCheck({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="14" height="14" rx="2"/><polyline points="7 12 10 15 14 9"/></svg>
}
function IconStar({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function IconSlider({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12"/><circle cx="10" cy="12" r="3" fill="white"/></svg>
}
function IconUpload({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
}
function IconClock({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function IconH({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 4 4 20"/><polyline points="20 4 20 20"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
}
function IconPara({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="15" y2="14"/></svg>
}
function IconDivider({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="2" y1="12" x2="22" y2="12"/></svg>
}
function IconCard({ className }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
}
