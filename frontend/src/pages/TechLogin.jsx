import React, { useState } from 'react'

export default function TechLogin() {
  const [form, setForm] = useState({ email: '', password: '' })

  const update = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = e => {
    e.preventDefault()
    // Placeholder — in a real app you'd POST to an auth endpoint
    alert('Logged in (demo)')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-4">Technician Login</h3>
        <label className="flex flex-col mb-3">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input name="email" value={form.email} onChange={update} className="mt-1 p-2 border rounded" required />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-sm font-medium text-gray-700">Password</span>
          <input name="password" type="password" value={form.password} onChange={update} className="mt-1 p-2 border rounded" required />
        </label>
        <button className="w-full py-2 bg-indigo-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
