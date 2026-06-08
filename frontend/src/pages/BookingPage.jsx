import React, { useEffect, useState } from 'react'
import BookingForm from '../components/BookingForm'

export default function BookingPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/api/bookings')
      .then(res => res.json())
      .then(setBookings)
      .catch(console.error)
  }, [])

  return (
    <main className="mt-12 max-w-6xl mx-auto px-6 pb-20 relative z-10">
      <div className="glass rounded-2xl p-4 md:p-10 shadow-xl animate-fadeUp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Book a Repair</h2>
            <p className="text-sm text-gray-600 mb-4">Fill out the form and our technician will contact you to confirm the booking.</p>
            <BookingForm onCreated={b => setBookings([b, ...bookings])} />
          </div>

          <aside>
            <h3 className="text-lg font-medium mb-3">Why choose us</h3>
            <div className="feature-list mb-6 stagger">
              <div className="feature-item card-hover">
                <div className="feature-icon">💡</div>
                <div>
                  <div className="font-medium">Certified technicians</div>
                  <div className="text-sm text-gray-600">Trained, verified and fully equipped.</div>
                </div>
              </div>
              <div className="feature-item card-hover">
                <div className="feature-icon">⚡</div>
                <div>
                  <div className="font-medium">Quick response</div>
                  <div className="text-sm text-gray-600">Same-day or next-day appointments.</div>
                </div>
              </div>
              <div className="feature-item card-hover">
                <div className="feature-icon">🔒</div>
                <div>
                  <div className="font-medium">Transparent pricing</div>
                  <div className="text-sm text-gray-600">No hidden fees — upfront estimates.</div>
                </div>
              </div>
              <div className="feature-item card-hover">
                <div className="feature-icon">⭐</div>
                <div>
                  <div className="font-medium">Reliable service</div>
                  <div className="text-sm text-gray-600">High customer satisfaction rates.</div>
                </div>
              </div>
            </div>

            <h4 className="text-sm font-semibold mb-2">Recent Bookings</h4>
            <div className="space-y-3 max-h-72 sm:max-h-80 overflow-auto pr-2">
              {bookings.map(b => (
                <div key={b._id} className="p-3 border rounded-md hover:shadow-sm bg-white card-transition hover:-translate-y-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-sm text-gray-600">{b.phone}</div>
                    </div>
                    <div className="text-sm text-gray-700">{b.date}</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">{(b.city || b.landmark || b.district || b.pincode) ? [b.city, b.landmark, b.district, b.pincode].filter(Boolean).join(', ') : b.address}</div>
                </div>
              ))}
              {bookings.length === 0 && <div className="text-sm text-gray-500">No bookings yet.</div>}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
