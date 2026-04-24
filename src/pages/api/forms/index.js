import connectDB from '../../../lib/mongodb'
import Form from '../../../models/Form'
import User from '../../../models/User'
import { requireAuth } from '../../../lib/auth'

export default async function handler(req, res) {
  const decoded = await requireAuth(req, res)
  if (!decoded) return

  await connectDB()

  if (req.method === 'GET') {
    const { page = 1, limit = 20, archived } = req.query
    const filter = {
      userId: decoded.userId,
      isArchived: archived === 'true',
    }

    const total = await Form.countDocuments(filter)
    const forms = await Form.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-fields')

    return res.status(200).json({ forms, total, page: Number(page), limit: Number(limit) })
  }

  if (req.method === 'POST') {
    const { title = 'Untitled Form', description = '', fields = [] } = req.body

    const form = await Form.create({
      userId: decoded.userId,
      title,
      description,
      fields,
    })

    await User.findByIdAndUpdate(decoded.userId, { $inc: { formCount: 1 } })

    return res.status(201).json({ form })
  }

  return res.status(405).end()
}
