import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function TechLogin() {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const update = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = e => {
    e.preventDefault()
    setLoading(true)
    axios.post('http://localhost:4000/api/auth/tech-login', { email: form.email, password: form.password })
      .then(res => {
        const { token } = res.data
        localStorage.setItem('tech_token', token)
        setLoading(false)
        navigate('/tech/dashboard')
      })
      .catch(err => {
        setLoading(false)
        alert(err.response?.data?.error || 'Login failed')
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="hidden md:flex flex-col justify-center p-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white shadow-lg">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold">Technician Portal</h2>
              <p className="mt-2 opacity-90">Sign in to view your assigned service requests and manage tasks.</p>
          </div>
          <div className="mt-4">
            <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="20" width="144" height="88" rx="12" fill="rgba(255,255,255,0.12)" />
              <circle cx="40" cy="60" r="12" fill="rgba(255,255,255,0.18)" />
              <rect x="64" y="48" width="72" height="8" rx="4" fill="rgba(255,255,255,0.14)" />
              <rect x="64" y="64" width="48" height="8" rx="4" fill="rgba(255,255,255,0.14)" />
            </svg>
          </div>
        </div>

        <form onSubmit={submit} className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-1 text-gray-900">Sign in to Technician</h3>
          <p className="text-sm text-gray-600 mb-6">Use your technician credentials to access assignments.</p>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-800">Email</span>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M22 6l-10 7L2 6" /></svg>
              </span>
              <input name="email" value={form.email} onChange={update} className="w-full pl-10 mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400" placeholder="you@company.com" required />
            </div>
          </label>

          <label className="block mb-3">
            <span className="text-sm font-medium text-gray-800">Password</span>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
              <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} className="w-full pl-10 pr-10 mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400" placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.35 2.72-4.27 4.68-5.53"/><path d="M1 1l22 22"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input type="checkbox" name="remember" checked={form.remember} onChange={update} className="form-checkbox h-4 w-4 text-indigo-600" />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
          </div>

          <button className="w-full py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            Back to <Link to="/" className="text-indigo-600 hover:underline">Home</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
