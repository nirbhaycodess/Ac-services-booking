import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import BookingPage from './pages/BookingPage'
import TechLogin from './pages/TechLogin'
import TechDashboard from './pages/TechDashboard'

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-12 shadow-2xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"> 
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 8v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8"/><path d="M9 3v4"/><path d="M15 3v4"/></svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow text-white">AC Services</h1>
                <p className="mt-1 text-sm md:text-base font-medium opacity-95">Schedule a technician visit — fast, reliable, and affordable.</p>
              </div>
            </div>
            <div className="mt-3 flex gap-3 items-center">
              <span className="badge bg-white/10 text-white px-2 py-0.5 rounded-full">✓ Trusted</span>
              <span className="text-sm text-white font-medium">Serving your area</span>
            </div>
          </div>
          
          {location.pathname !== '/tech-login' && (
            <div className="absolute right-6 top-6">
              <Link to="/" aria-label="Home" className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-md hover:bg-white/20 transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 4l9 5.5" /><path d="M9 22V12h6v10" /></svg>
              </Link>
            </div>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/tech-login" element={<TechLogin />} />
        <Route path="/tech/dashboard" element={<TechDashboard />} />
      </Routes>
      {/* Decorative blobs */}
      <svg className="hidden md:block absolute -z-0 right-[-120px] top-20 opacity-30 floaty" width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="210" cy="210" r="210" fill="#6366F1" />
      </svg>

      <footer className="mt-12 bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">© {new Date().getFullYear()} AC Repair Booking — All rights reserved.</div>
          <div className="flex gap-4 text-sm opacity-90">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
