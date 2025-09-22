import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // For demo purposes, handle both plain text and hashed passwords
  if (hashedPassword.startsWith('$2a$') || hashedPassword.startsWith('$2b$')) {
    return bcrypt.compare(password, hashedPassword)
  }
  // For demo: also accept direct password comparison
  return password === hashedPassword || 
         (password === 'admin123' && hashedPassword.includes('admin123')) ||
         (password === 'teacher123' && hashedPassword.includes('teacher123'))
}

export function generateToken(payload: Record<string, unknown>): string {
  return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, { expiresIn: '7d' })
}

export function verifyToken(token: string): Record<string, unknown> | null {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!) as Record<string, unknown>
  } catch {
    return null
  }
}