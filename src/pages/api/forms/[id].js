import connectDB from '../../../lib/mongodb'
import Form from '../../../models/Form'
import { requireAuth } from '../../../lib/auth'

export default async function handler(req, res) {
  const { id } = req.query
  await connectDB()

  if (req.method === 'GET') {
    const form = await Form.findOne({ _id: id })
    if (!form) return res.status(404).json({ error: 'Form not found' })
    return res.status(200).json({ form })
  }

  const decoded = await requireAuth(req, res)
  if (!decoded) return

  const form = await Form.findOne({ _id: id, userId: decoded.userId })
  if (!form) return res.status(404).json({ error: 'Form not found' })

  if (req.method === 'PUT') {
    const updates = req.body
    const allowed = ['title', 'description', 'fields', 'settings', 'design', 'payment']
    allowed.forEach(key => {
      if (updates[key] !== undefined) form[key] = updates[key]
    })
    await form.save()
    return res.status(200).json({ form })
  }

  if (req.method === 'DELETE') {
    await Form.deleteOne({ _id: id, userId: decoded.userId })
    return res.status(200).json({ message: 'Form deleted' })
  }

  return res.status(405).end()
}
