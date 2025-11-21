import React, { useState } from 'react';
import { registerUser } from '@/lib/auth';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(form);
      console.log('registered', data);
      // navigate or show success
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign up'}</button>
      {error && <div>{error}</div>}
    </form>
  );
}