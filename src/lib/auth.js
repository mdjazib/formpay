import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me'
const TOKEN_EXPIRY = '7d'
const COOKIE_NAME = 'pf_token'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export function getTokenFromRequest(req) {
  const cookies = parse(req.headers.cookie || '')
  return cookies[COOKIE_NAME] || null
}

export function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie', [
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  ])
}

export function clearAuthCookie(res) {
  res.setHeader('Set-Cookie', [
    `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`,
  ])
}

export async function requireAuth(req, res) {
  const token = getTokenFromRequest(req)
  if (!token) {
    res.status(401).json({ error: 'Authentication required' })
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    res.status(401).json({ error: 'Invalid or expired session' })
    return null
  }

  return decoded
}

export { COOKIE_NAME }
