import React, { useEffect, useState } from 'react'

export default function TechDashboard() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    let mounted = true
    const headers = {}
    const token = localStorage.getItem('tech_token')
    if (token) headers['Authorization'] = `Bearer ${token}`
    fetch('http://localhost:4000/api/bookings', { headers })
      .then(r => r.json())
      .then(data => { if (mounted) setAppointments(data) })
      .catch(console.error)
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  async function updateStatus(id, status, note) {
    if (!id) return
    setUpdatingId(id)
    try {
      const headers = { 'Content-Type': 'application/json' }
      const token = localStorage.getItem('tech_token')
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`http://localhost:4000/api/bookings/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status, note })
      })
      if (!res.ok) throw new Error('update failed')
      const updated = await res.json()
      setAppointments(prev => prev.map(a => a._id === id ? updated : a))
    } catch (err) {
      console.error(err)
      alert('Failed to update appointment status')
    } finally {
      setUpdatingId(null)
    }
  }

  function handleApprove(a) {
    if (!confirm('Approve this appointment?')) return
    updateStatus(a._id, 'approved', 'Approved by technician')
  }

  function handleDone(a) {
    if (!confirm('Mark this appointment as done?')) return
    updateStatus(a._id, 'done', 'Completed')
  }

  function handleCancel(a) {
    const msg = prompt('Cancellation message (optional)', 'Customer unavailable')
    if (msg === null) return
    updateStatus(a._id, 'cancelled', msg)
  }

  return (
    <main className="mt-12 max-w-6xl mx-auto px-6 pb-20 relative z-10">
      <div className="glass rounded-2xl p-6 shadow-xl animate-fadeUp">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Technician Dashboard</h2>
          <div className="text-sm text-gray-500">Manage appointments — approve, complete or cancel</div>
        </div>

        {loading && <div className="text-sm text-gray-600">Loading appointments…</div>}

        {!loading && (
          <div className="space-y-3">
            {appointments.length === 0 && <div className="text-sm text-gray-600">No appointments found.</div>}

            {appointments.map(a => (
              <div key={a._id} className="p-4 bg-white/80 rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{a.name || '—'}</div>
                    <div className="text-sm text-gray-600">{a.phone}</div>
                    <div className="ml-4 text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800">{a.service || a.repairType || 'Service'}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{a.date} {a.time}</div>
                  <div className="mt-1 text-sm text-gray-600">{(a.city || a.landmark || a.district || a.pincode) ? [a.city, a.landmark, a.district, a.pincode].filter(Boolean).join(', ') : a.address}</div>
                  {a.note && <div className="mt-2 text-sm text-gray-600">Note: {a.note}</div>}
                </div>

                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-sm ${a.status==='approved' ? 'bg-amber-100 text-amber-900' : a.status==='done' ? 'bg-green-100 text-green-900' : a.status==='cancelled' ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-800'}`}>{a.status || 'pending'}</div>
                  <button onClick={() => handleApprove(a)} disabled={updatingId===a._id} className="px-3 py-1 bg-blue-600 text-white rounded">Approve</button>
                  <button onClick={() => handleDone(a)} disabled={updatingId===a._id} className="px-3 py-1 bg-green-600 text-white rounded">Done</button>
                  <button onClick={() => handleCancel(a)} disabled={updatingId===a._id} className="px-3 py-1 bg-red-600 text-white rounded">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
