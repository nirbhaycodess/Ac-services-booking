import React, { useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL || 'https://ac-repairing-booking.onrender.com'
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
    axios.post(`${API_URL}/api/auth/tech-login`, { email: form.email, password: form.password })
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
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col justify-center p-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 text-white shadow-2xl">
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

        <form onSubmit={submit} className="bg-white rounded-2xl p-8 md:p-10 shadow-xl ring-1 ring-gray-100">
          <h3 className="text-2xl font-semibold mb-1 text-gray-900">Sign in to Technician</h3>
          <p className="text-sm text-gray-600 mb-6">Use your technician credentials to access assignments.</p>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-800">Email</span>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="M22 6l-10 7L2 6" /></svg>
              </span>
              <input name="email" value={form.email} onChange={update} className="w-full pl-10 mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-900 placeholder-gray-400" placeholder="you@company.com" required />
            </div>
          </label>

          <label className="block mb-3">
            <span className="text-sm font-medium text-gray-800">Password</span>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </span>
              <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} className="w-full pl-10 pr-10 mt-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-gray-900 placeholder-gray-400" placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-600 focus:outline-none">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7C7.523 19 3.732 16.057 2.458 12z" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input type="checkbox" name="remember" checked={form.remember} onChange={update} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 transition disabled:opacity-50" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
