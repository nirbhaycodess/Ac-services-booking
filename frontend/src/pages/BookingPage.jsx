import React, { useState, useEffect } from 'react'
import BookingForm from '../components/BookingForm'

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

function BookingStatus({ bookingId }) {
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!bookingId) return
    let mounted = true
    const fetchOne = async () => {
      try {
        const res = await fetch(`${API_URL}/api/bookings/${bookingId}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (mounted) {
          setBooking(data)
          setError(null)
        }
      } catch (err) {
        if (mounted) setError(err.message)
      }
    }

    fetchOne()
    const id = setInterval(fetchOne, 5000)
    return () => { mounted = false; clearInterval(id) }
  }, [bookingId])

  if (!bookingId) return null

  return (
    <div className="mt-6 bg-white border border-gray-100 rounded-lg p-4">
      <h4 className="text-sm font-medium mb-2">Booking status</h4>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {!booking && !error && <div className="text-sm text-gray-500">Loading status…</div>}
      {booking && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <StatusBadge status={booking.status} />
            <div className="text-sm text-gray-600">Requested on {new Date(booking.createdAt).toLocaleString()}</div>
          </div>
          {booking.note && <div className="text-sm text-gray-700">Technician note: {booking.note}</div>}
          <div className="text-xs text-gray-500">Last updated: {new Date(booking.updatedAt || booking.createdAt).toLocaleString()}</div>
        </div>
      )}
    </div>
  )
}

export default function BookingPage() {
  const [lastCreated, setLastCreated] = useState(null)

  return (
    <main className="mt-12 max-w-6xl mx-auto px-6 pb-20 relative z-10">
      <div className="glass rounded-2xl p-4 md:p-10 shadow-xl animate-fadeUp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Request a Repair</h2>
            <p className="text-sm text-gray-600 mb-4">Fill out the form and our technician will contact you to confirm the service.</p>
            <BookingForm onCreated={(data) => {
              // backend returns the created booking object
              // if API returns booking under different key adjust accordingly
              const id = data && (data._id || data.id || (data.booking && data.booking._id))
              setLastCreated(id)
            }} />

            {/* Live status panel for the latest booking created in this session */}
            <BookingStatus bookingId={lastCreated} />
          </div>

          <aside>
            <h3 className="text-lg font-medium mb-3">Why choose us</h3>
            <div className="feature-list mb-6 stagger">
              <div className="feature-item card-hover">
                <div className="feature-icon">💡</div>
                <div>
                  <div className="font-medium text-black">Certified technicians</div>
                  <div className="text-sm text-gray-600">Trained, verified and fully equipped.</div>
                </div>
              </div>
              <div className="feature-item card-hover">
                <div className="feature-icon">⚡</div>
                <div>
                  <div className="font-medium text-black">Quick response</div>
                  <div className="text-sm text-gray-600">Same-day or next-day appointments.</div>
                </div>
              </div>
              <div className="feature-item card-hover">
                <div className="feature-icon">🔒</div>
                <div>
                  <div className="font-medium text-black">Transparent pricing</div>
                  <div className="text-sm text-gray-600">No hidden fees — upfront estimates.</div>
                </div>
              </div>
              <div className="feature-item card-hover">
                <div className="feature-icon">⭐</div>
                <div>
                  <div className="font-medium text-black">Reliable service</div>
                  <div className="text-sm text-gray-600">High customer satisfaction rates.</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
