import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function NewFormPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }
    if (!loading && user) {
      const create = async () => {
        try {
          const res = await fetch('/api/forms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Untitled Form', fields: [] }),
          })
          const data = await res.json()
          if (res.ok) {
            router.replace(`/dashboard/forms/${data.form._id}/edit`)
          } else {
            toast.error(data.error || 'Failed to create form')
            router.replace('/dashboard/forms')
          }
        } catch {
          toast.error('Failed to create form')
          router.replace('/dashboard/forms')
        }
      }
      create()
    }
  }, [user, loading, router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="spinner spinner-lg" />
    </div>
  )
}
