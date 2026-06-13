import React, { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'https://ac-repairing-booking.onrender.com'

export default function TechDashboard() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [expanded, setExpanded] = useState({})
  const [actionForm, setActionForm] = useState({ openId: null, action: null, message: '' })

  useEffect(() => {
    let mounted = true
    const headers = {}
    const token = localStorage.getItem('tech_token')
    if (token) headers['Authorization'] = `Bearer ${token}`
    fetch(`${API_URL}/api/bookings`, { headers })
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
      const res = await fetch(`${API_URL}/api/bookings/${id}`, {
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

  async function deleteBooking(id) {
    if (!id) return
    if (!confirm('Delete this booking? This cannot be undone.')) return
    setUpdatingId(id)
    try {
      const headers = {}
      const token = localStorage.getItem('tech_token')
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`${API_URL}/api/bookings/${id}`, { method: 'DELETE', headers })
      if (!res.ok) {
        let msg = `Delete failed: ${res.status}`
        try {
          const body = await res.json()
          if (body && body.error) msg += ` - ${body.error}`
        } catch (e) {
          // ignore
        }
        throw new Error(msg)
      }
      // success
      setAppointments(prev => prev.filter(a => a._id !== id))
    } catch (err) {
      console.error('deleteBooking error', err)
      alert(err.message || 'Failed to delete booking')
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

  function toggleExpand(id) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function openActionForm(id, action) {
    setActionForm({ openId: id, action, message: '' })
  }

  function closeActionForm() {
    setActionForm({ openId: null, action: null, message: '' })
  }

  async function submitActionForm() {
    const { openId, action, message } = actionForm
    if (!openId || !action) return
    setUpdatingId(openId)
    try {
      await updateStatus(openId, action, message || (action === 'cancelled' ? 'Cancelled by technician' : action === 'approved' ? 'Approved by technician' : 'Completed'))
    } catch (err) {
      console.error(err)
      alert('Failed to perform action')
    } finally {
      setUpdatingId(null)
      closeActionForm()
    }
  }

  function formatAddress(a) {
    const parts = [a.address, a.landmark, a.city, a.district, a.pincode].filter(Boolean)
    return parts.join(', ')
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
          <div className="space-y-4">
            {appointments.length === 0 && <div className="text-sm text-gray-600">No appointments found.</div>}

            {appointments.map(a => (
              <article key={a._id} className="p-4 bg-white/90 rounded-md flex flex-col md:flex-row md:items-start gap-4 shadow-sm">
                <div className="w-full md:w-40 flex-shrink-0">
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={`booking-${a._id}`} className="w-full h-28 object-cover rounded-md shadow-inner" />
                  ) : (
                    <div className="w-full h-28 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{a.name || '—'}</div>
                      <div className="text-sm text-gray-600">{a.phone} {a.email ? `· ${a.email}` : ''}</div>
                    </div>

                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${a.status==='approved' ? 'bg-amber-100 text-amber-900' : a.status==='done' ? 'bg-green-100 text-green-900' : a.status==='cancelled' ? 'bg-red-100 text-red-900' : 'bg-gray-100 text-gray-800'}`}>{a.status || 'pending'}</div>
                      <div className="text-sm text-gray-500 mt-1">{a.date} · {a.time}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-700">
                    <div className="font-medium">Service:</div>
                    <div className="text-gray-600">{a.service || a.repairType || 'General repair'}</div>

                    <div className="mt-2 font-medium">Address:</div>
                    <div className="text-gray-600">{formatAddress(a) || 'No address provided'}</div>

                    {a.message && (
                      <div className="mt-2">
                        <div className="font-medium">Customer message:</div>
                        <div className="text-gray-600">{a.message}</div>
                      </div>
                    )}
                  </div>

                  {expanded[a._id] && (
                    <div className="mt-3 text-sm bg-gray-50 p-3 rounded">
                      <div className="text-gray-700">Booking ID: <span className="font-mono text-xs text-gray-800">{a._id}</span></div>
                      {a.note && <div className="mt-2 text-black">Technician note: {a.note}</div>}
                      {a.createdAt && <div className="mt-2 text-gray-500">Created: {new Date(a.createdAt).toLocaleString()}</div>}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-stretch gap-2 md:items-end">
                  <div className="flex gap-2">
                    <button onClick={() => toggleExpand(a._id)} className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-700">{expanded[a._id] ? 'Hide' : 'Details'}</button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <button onClick={() => openActionForm(a._id, 'approved')} disabled={updatingId===a._id} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Approve</button>
                    <button onClick={() => openActionForm(a._id, 'done')} disabled={updatingId===a._id} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Done</button>
                    <button onClick={() => openActionForm(a._id, 'cancelled')} disabled={updatingId===a._id} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Cancel</button>
                    <button onClick={() => deleteBooking(a._id)} disabled={updatingId===a._id} className="px-3 py-1 bg-gray-100 text-red-600 border border-red-200 rounded text-sm">Delete</button>
                  </div>

                  {actionForm.openId === a._id && (
                    <div className="mt-3 w-full">
                      <div className="text-sm text-gray-700 mb-1">Provide a message to the customer (optional)</div>
                      <textarea value={actionForm.message} onChange={e => setActionForm(s => ({ ...s, message: e.target.value }))} rows={3} className="w-full p-2 border rounded-md text-sm" />
                      <div className="mt-2 flex gap-2">
                        <button onClick={submitActionForm} disabled={updatingId===a._id} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Send</button>
                        <button onClick={closeActionForm} className="px-3 py-1 border rounded text-sm">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
