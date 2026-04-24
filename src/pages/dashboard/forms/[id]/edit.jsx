import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { useAuth } from '../../../../contexts/AuthContext'
import FieldTypePanel, { defaultField } from '../../../../components/builder/FieldTypePanel'
import FieldEditor from '../../../../components/builder/FieldEditor'
import FieldPreview from '../../../../components/builder/FieldPreview'
import styles from '../../../../styles/builder.module.scss'

export default function FormBuilderPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { id } = router.query

  const [form, setForm] = useState(null)
  const [fields, setFields] = useState([])
  const [selectedFieldId, setSelectedFieldId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [activeTab, setActiveTab] = useState('build') // 'build' | 'settings'
  const saveTimer = useRef(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const res = await fetch(`/api/forms/${id}`)
      if (res.ok) {
        const data = await res.json()
        setForm(data.form)
        setFields(data.form.fields || [])
      } else {
        toast.error('Form not found')
        router.push('/dashboard/forms')
      }
    }
    load()
  }, [id, router])

  const autoSave = useCallback((updatedFields, updatedForm) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      try {
        await fetch(`/api/forms/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: updatedFields,
            title: updatedForm?.title,
            description: updatedForm?.description,
            settings: updatedForm?.settings,
          }),
        })
      } finally {
        setSaving(false)
      }
    }, 800)
  }, [id])

  const updateField = (fieldId, updated) => {
    const next = fields.map(f => f.id === fieldId ? updated : f)
    setFields(next)
    autoSave(next, form)
  }

  const addField = (field) => {
    const next = [...fields, field]
    setFields(next)
    setSelectedFieldId(field.id)
    autoSave(next, form)
  }

  const removeField = (fieldId) => {
    const next = fields.filter(f => f.id !== fieldId)
    setFields(next)
    if (selectedFieldId === fieldId) setSelectedFieldId(null)
    autoSave(next, form)
  }

  const duplicateField = (fieldId) => {
    const src = fields.find(f => f.id === fieldId)
    if (!src) return
    const copy = { ...src, id: uuidv4(), label: `${src.label} (copy)` }
    const idx = fields.findIndex(f => f.id === fieldId)
    const next = [...fields.slice(0, idx + 1), copy, ...fields.slice(idx + 1)]
    setFields(next)
    setSelectedFieldId(copy.id)
    autoSave(next, form)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex(f => f.id === active.id)
      const newIndex = fields.findIndex(f => f.id === over.id)
      const next = arrayMove(fields, oldIndex, newIndex)
      setFields(next)
      autoSave(next, form)
    }
  }

  const updateFormMeta = (key, value) => {
    const next = { ...form, [key]: value }
    setForm(next)
    autoSave(fields, next)
  }

  const togglePublish = async () => {
    setPublishing(true)
    const isPublished = !form?.settings?.isPublished
    const res = await fetch(`/api/forms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: { ...form?.settings, isPublished } }),
    })
    if (res.ok) {
      const data = await res.json()
      setForm(data.form)
      toast.success(isPublished ? 'Form published!' : 'Form unpublished')
    }
    setPublishing(false)
  }

  const copyLink = () => {
    const url = `${window.location.origin}/f/${form?.slug}`
    navigator.clipboard.writeText(url)
    toast.success('Link copied!')
  }

  const selectedField = fields.find(f => f.id === selectedFieldId) || null

  if (!form) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner spinner-lg" />
      </div>
    )
  }

  return (
    <div className={styles.builderPage}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Link href="/dashboard/forms" className={styles.backBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Forms
          </Link>
          <input
            className={styles.formTitleInput}
            value={form.title || ''}
            onChange={e => updateFormMeta('title', e.target.value)}
            placeholder="Untitled Form"
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className={`${styles.publishBadge} ${form.settings?.isPublished ? styles.live : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'default' }}
          >
            <span className={styles.dot} />
            {saving ? 'Saving...' : form.settings?.isPublished ? 'Live' : 'Draft'}
          </button>
        </div>

        <div className={styles.topbarRight}>
          {form.settings?.isPublished && (
            <button className="btn btn-secondary btn-sm" onClick={copyLink}>
              <IconLink style={{ width: 14, height: 14 }} />
              Copy link
            </button>
          )}
          <Link href={`/f/${form.slug}`} target="_blank">
            <button className="btn btn-secondary btn-sm">
              <IconEye style={{ width: 14, height: 14 }} />
              Preview
            </button>
          </Link>
          <button
            className={`btn btn-sm ${form.settings?.isPublished ? 'btn-secondary' : 'btn-primary'}`}
            onClick={togglePublish}
            disabled={publishing}
          >
            {publishing ? <span className="spinner" /> : (form.settings?.isPublished ? 'Unpublish' : 'Publish')}
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.fieldPanel}>
          <FieldTypePanel onAdd={addField} />
        </aside>

        <main className={styles.canvas}>
          <div className={styles.formCanvas}>
            <div className={styles.canvasHeader}>
              <input
                className={styles.titleInput}
                value={form.title || ''}
                onChange={e => updateFormMeta('title', e.target.value)}
                placeholder="Form title"
              />
              <textarea
                className={styles.descInput}
                value={form.description || ''}
                onChange={e => updateFormMeta('description', e.target.value)}
                placeholder="Add a description (optional)"
                rows={2}
              />
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                <div className={styles.fieldsList}>
                  {fields.map(field => (
                    <SortableField
                      key={field.id}
                      field={field}
                      isSelected={selectedFieldId === field.id}
                      onSelect={() => setSelectedFieldId(selectedFieldId === field.id ? null : field.id)}
                      onRemove={() => removeField(field.id)}
                      onDuplicate={() => duplicateField(field.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <button
              className={styles.addFieldBtn}
              onClick={() => addField(defaultField('text'))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 16, height: 16 }}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add a field
            </button>
          </div>
        </main>

        <aside className={styles.editorPanel}>
          <div className={styles.editorPanelHead}>
            <h3>{selectedField ? `Edit: ${selectedField.type}` : 'Field properties'}</h3>
          </div>
          <FieldEditor
            field={selectedField}
            onChange={(updated) => updateField(selectedField?.id, updated)}
          />
        </aside>
      </div>
    </div>
  )
}

function SortableField({ field, isSelected, onSelect, onRemove, onDuplicate }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.fieldItem} ${isSelected ? styles.selected : ''} ${isDragging ? styles.dragging : ''}`}
      onClick={onSelect}
    >
      <div className={styles.fieldDragHandle} {...attributes} {...listeners} onClick={e => e.stopPropagation()}>
        <IconGrip style={{ width: 16, height: 16 }} />
      </div>
      <div className={styles.fieldContent}>
        <FieldPreview field={field} />
      </div>
      <div className={styles.fieldActions}>
        <button className={styles.actionBtn} onClick={e => { e.stopPropagation(); onDuplicate() }}>
          <IconCopy style={{ width: 12, height: 12 }} />
          Duplicate
        </button>
        <div className={styles.spacer} />
        <button className={`${styles.actionBtn} ${styles.danger}`} onClick={e => { e.stopPropagation(); onRemove() }}>
          <IconTrash style={{ width: 12, height: 12 }} />
          Remove
        </button>
      </div>
    </div>
  )
}

function IconGrip({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="19" r="1" fill="currentColor"/><circle cx="15" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/></svg>
}
function IconCopy({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
}
function IconTrash({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
}
function IconEye({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function IconLink({ style }) {
  return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
}
