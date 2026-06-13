import React from 'react'
import BookingForm from '../components/BookingForm'

export default function BookingPage() {
  return (
    <main className="mt-12 max-w-6xl mx-auto px-6 pb-20 relative z-10">
      <div className="glass rounded-2xl p-4 md:p-10 shadow-xl animate-fadeUp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Request a Repair</h2>
            <p className="text-sm text-gray-600 mb-4">Fill out the form and our technician will contact you to confirm the service.</p>
            <BookingForm />
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
