import React, { useState } from 'react'
import { loginUser } from '@/lib/auth' // optional: use your auth helper if present

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (typeof loginUser === 'function') {
        await loginUser(form)
      } else {
        await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
          credentials: 'include'
        })
      }
      // on success navigate or update state
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto', padding: 16 }}>
      <h2>Login</h2>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ width: '100%', marginBottom: 8 }} />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required style={{ width: '100%', marginBottom: 12 }} />
      <button type="submit" disabled={loading} style={{ width: '100%' }}>{loading ? 'Logging in...' : 'Login'}</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </form>
  )
}