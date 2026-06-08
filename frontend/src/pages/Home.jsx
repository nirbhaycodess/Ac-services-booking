import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const bg = 'https://shiptons.ca/wp-content/uploads/2023/05/Air-Conditioning-Maintenance-Service.webp'
  const [techOpen, setTechOpen] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-transparent" />
      <div className="relative max-w-xl mx-auto p-8 bg-white/90 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to AC Repair Booking</h2>
        <p className="text-sm text-gray-600 mb-6">Quick booking for repairs, installations and maintenance. Technicians can log in to view assignments.</p>
        <div className="flex justify-center gap-4 items-start">
          <Link to="/booking" className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:opacity-95">Go to Booking</Link>

          <div className="relative">
            <button onClick={() => setTechOpen(v => !v)} aria-expanded={techOpen} className="px-5 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">Technician</button>

            <div className={`absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 transform transition-all ${techOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <form onSubmit={(e) => { e.preventDefault(); alert('Logged in (demo)'); setTechOpen(false) }}>
                <div className="mb-2 text-sm font-medium text-gray-700">Technician Login</div>
                <input name="email" type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded text-sm" required />
                <input name="password" type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded text-sm" required />
                <div className="flex justify-end">
                  <button className="px-3 py-2 bg-indigo-600 text-white rounded text-sm">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
