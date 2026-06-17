import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'https://ac-repairing-booking.onrender.com'

function StatusBadge({ status }) {
  const map = {
    pending: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    approved: { text: 'Approved', color: 'bg-blue-100 text-blue-800' },
    done: { text: 'Completed', color: 'bg-green-100 text-green-800' },
    cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-800' }
  }
  const s = map[status] || { text: status || 'Unknown', color: 'bg-gray-100 text-gray-800' }
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.text}</span>
}

export default function MyBookings() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = async e => {
    e && e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (phone) params.set('phone', phone)
      if (email) params.set('email', email)
      const res = await fetch(`${API_URL}/api/bookings?${params.toString()}`)
      if (!res.ok) throw new Error('Lookup failed')
      const data = await res.json()
      setBookings(data)
    } catch (err) {
      setError(err.message)
      setBookings(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Track your bookings</h2>
      <form onSubmit={search} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input placeholder="Phone (e.g. +919876543210)" value={phone} onChange={e => setPhone(e.target.value)} className="p-2 border rounded" />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded" />
        <div className="flex gap-2">
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
          <button type="button" onClick={() => { setPhone(''); setEmail(''); setBookings(null); setError(null) }} className="px-4 py-2 bg-gray-200 rounded">Clear</button>
        </div>
      </form>

      {loading && <div className="text-sm text-gray-500">Searching…</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {bookings && bookings.length === 0 && <div className="text-sm text-gray-600">No bookings found.</div>}

      {bookings && bookings.length > 0 && (
        <div className="space-y-3">
          {bookings.map(b => (
            <div key={b._id} className="p-3 border rounded flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="font-medium">Service: {b.service || '—'}</div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="text-sm text-gray-700">When: {b.date} {b.time}</div>
                {b.repairType && <div className="text-sm text-gray-700">Type: {b.repairType}</div>}
                {b.note && <div className="text-sm text-gray-700">Technician note: {b.note}</div>}
                <div className="text-xs text-gray-500">Requested: {new Date(b.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
