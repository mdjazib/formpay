import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export function useForms() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchForms = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const qs = new URLSearchParams(params).toString()
      const res = await fetch(`/api/forms?${qs}`)
      if (!res.ok) throw new Error('Failed to load forms')
      const data = await res.json()
      setForms(data.forms)
      setTotal(data.total)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createForm = async (payload = {}) => {
    const res = await fetch('/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to create form')
    return data.form
  }

  const deleteForm = async (id) => {
    const res = await fetch(`/api/forms/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete form')
    setForms(prev => prev.filter(f => f._id !== id))
    toast.success('Form deleted')
  }

  return { forms, loading, total, fetchForms, createForm, deleteForm }
}
