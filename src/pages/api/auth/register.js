import connectDB from '../../../lib/mongodb'
import User from '../../../models/User'
import { signToken, setAuthCookie } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }

  try {
    await connectDB()

    const existing = await User.findOne({ email: email.toLowerCase().trim() })
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }

    const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password })

    const token = signToken({ userId: user._id.toString(), email: user.email })
    setAuthCookie(res, token)

    return res.status(201).json({ user: user.toSafeObject() })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ error: 'Registration failed. Please try again.' })
  }
}
