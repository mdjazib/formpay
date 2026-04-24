import connectDB from '../../../lib/mongodb'
import User from '../../../models/User'
import { requireAuth } from '../../../lib/auth'

export default async function handler(req, res) {
  const decoded = await requireAuth(req, res)
  if (!decoded) return

  await connectDB()
  const user = await User.findById(decoded.userId)
  if (!user) return res.status(404).json({ error: 'User not found' })

  if (req.method === 'GET') {
    return res.status(200).json({
      paymentKeys: user.paymentKeys,
      plan: user.plan,
    })
  }

  if (req.method === 'PUT') {
    const { name, paymentKeys } = req.body
    if (name) user.name = name.trim()
    if (paymentKeys) user.paymentKeys = paymentKeys
    await user.save()
    return res.status(200).json({ user: user.toSafeObject() })
  }

  return res.status(405).end()
}
