import connectDB from '../../../lib/mongodb'
import User from '../../../models/User'
import { requireAuth } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const decoded = await requireAuth(req, res)
  if (!decoded) return

  try {
    await connectDB()
    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json({ user: user.toSafeObject() })
  } catch (err) {
    console.error('Me error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
