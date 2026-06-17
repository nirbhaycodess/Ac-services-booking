import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const bg = 'https://shiptons.ca/wp-content/uploads/2023/05/Air-Conditioning-Maintenance-Service.webp'
  const mobileBg = 'https://img.magnific.com/premium-photo/service-man-maintenance-air-conditioner_255667-47923.jpg?w=1480'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update)
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', update); else mq.removeListener(update) }
  }, [])

  const bgToUse = isMobile ? mobileBg : bg

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative home-bg" style={{ backgroundImage: `url(${bgToUse})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative w-full max-w-6xl mx-auto p-8 bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl text-center text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Welcome to AC Repair Booking</h2>
            <p className="text-sm md:text-base text-white/90 mb-6 drop-shadow">Fast, reliable AC repairs, installations and preventive maintenance. Book online or let our certified technicians come to you.</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/booking" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 ring-1 ring-white/20">Book a Service</Link>
              <Link to="/tech-login" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 ring-1 ring-white/20">Technician Login</Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-lg shadow-md">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"/><path d="M5 8v8a7 7 0 0 0 14 0V8"/></svg>
              <div className="text-left">
                <div className="font-semibold text-white">Same-day Repairs</div>
                <div className="text-sm text-white/85">Quick response and priority scheduling for urgent issues.</div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-lg shadow-md">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6"/><path d="M5 12h14"/></svg>
              <div className="text-left">
                <div className="font-semibold text-white">Transparent Pricing</div>
                <div className="text-sm text-white/85">No hidden fees — you get clear estimates before we start.</div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-black/40 p-4 rounded-lg shadow-md">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h4l3 8 4-16 3 8h4"/></svg>
              <div className="text-left">
                <div className="font-semibold text-white">Certified Technicians</div>
                <div className="text-sm text-white/85">Insured, trained professionals with years of field experience.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/35 rounded-lg shadow-sm text-left">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4"/><path d="M5 21h14"/></svg>
              <div className="font-semibold">Maintenance Plans</div>
            </div>
            <div className="text-sm text-white/85">Keep your system running efficiently with scheduled tune-ups and priority service scheduling.</div>
          </div>

          <div className="p-4 bg-black/35 rounded-lg shadow-sm text-left">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>
              <div className="font-semibold">Parts & Warranty</div>
            </div>
            <div className="text-sm text-white/85">Genuine parts with warranty coverage on repairs performed by us.</div>
          </div>

          <div className="p-4 bg-black/35 rounded-lg shadow-sm text-left">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5-5 5 5"/></svg>
              <div className="font-semibold">24/7 Support</div>
            </div>
            <div className="text-sm text-white/85">Emergency assistance and phone support any time of day.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
