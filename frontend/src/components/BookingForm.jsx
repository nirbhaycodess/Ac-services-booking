import React, { useState, useEffect } from 'react'

export default function BookingForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', landmark: '', district: '', pincode: '', repairType: '', date: '', time: '', message: '' })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState(null)
  const [showToast, setShowToast] = useState(false)

  const update = e => setForm({ ...form, [e.target.name]: e.target.value })

  const [service, setService] = useState('repair')

  const submit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Use FormData when an image is attached, otherwise still send multipart for consistency
      const formData = new FormData()
      Object.keys(form).forEach(key => {
        if (form[key] !== undefined && form[key] !== null) formData.append(key, form[key])
      })
      formData.append('service', service)
      if (imageFile) formData.append('image', imageFile)

      const res = await fetch('http://localhost:4000/api/bookings', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setStatus('success')
      setForm({ name: '', phone: '', email: '', address: '', city: '', landmark: '', district: '', pincode: '', repairType: '', date: '', time: '', message: '' })
      setImageFile(null)
      setPreview(null)
      onCreated && onCreated(data)
      setShowToast(true)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const handleImageChange = e => {
    const f = e.target.files && e.target.files[0]
    if (!f) return setImageFile(null)
    setImageFile(f)
    setPreview(URL.createObjectURL(f))
  }

  useEffect(() => {
    if (!showToast) return
    const t = setTimeout(() => setShowToast(false), 3000)
    return () => clearTimeout(t)
  }, [showToast])

  // Clear issue details when installation service is selected
  useEffect(() => {
    if ((service === 'maintenance' || service === 'installation') && form.message) {
      setForm(prev => ({ ...prev, message: '' }))
    }
  }, [service])

  // Clear repairType when not on repair
  useEffect(() => {
    if (service !== 'repair' && form.repairType) {
      setForm(prev => ({ ...prev, repairType: '' }))
    }
  }, [service])

  const inputClass = 'w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition'

  return (
    <div className="relative">
      <form onSubmit={submit} className="space-y-4 animate-fadeUp">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Full name</span>
            <input name="name" value={form.name} onChange={update} required placeholder="e.g. Abhishek Kumar" className={inputClass} />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Phone</span>
            <input name="phone" value={form.phone} onChange={update} required placeholder="(+91) 98765 43210" className={inputClass} />
          </label>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">City / Town</span>
              <input name="city" value={form.city} onChange={update} placeholder="City or Town" className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Landmark</span>
              <input name="landmark" value={form.landmark} onChange={update} placeholder="e.g. Near Post Office" className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">District</span>
              <input name="district" value={form.district} onChange={update} placeholder="District" className={inputClass} />
            </label>

            <label className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Pincode</span>
              <input name="pincode" value={form.pincode} onChange={update} placeholder="PIN code" className={inputClass} />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Date</span>
            <input name="date" type="date" value={form.date} onChange={update} required className={inputClass} />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Time</span>
            <input name="time" type="time" value={form.time} onChange={update} required className={inputClass} />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          <button type="button" onClick={() => setService('repair')} className={`text-sm px-3 py-1 rounded-full ${service==='repair' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Repair</button>
          <button type="button" onClick={() => setService('installation')} className={`text-sm px-3 py-1 rounded-full ${service==='installation' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Installation</button>
          <button type="button" onClick={() => setService('maintenance')} className={`text-sm px-3 py-1 rounded-full ${service==='maintenance' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Maintenance</button>
        </div>

        {service === 'repair' && (
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Repair type</span>
            <select name="repairType" value={form.repairType} onChange={update} className={inputClass}>
              <option value="">Select repair type</option>
              <option value="not_cooling">Not cooling</option>
              <option value="gas_refill">Gas refill</option>
              <option value="compressor">Compressor issue</option>
              <option value="electrical">Electrical issue</option>
              <option value="other">Other</option>
            </select>
          </label>
        )}

        {service === 'repair' && (
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Issue details (optional)</span>
            <textarea name="message" value={form.message} onChange={update} placeholder="Describe the problem..." className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </label>
        )}

        {service === 'repair' && (
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Attach photo (optional)</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
            {preview && (
              <img src={preview} alt="preview" className="mt-2 w-32 h-24 object-cover rounded-md border" />
            )}
          </label>
        )}

        <div className="flex items-center gap-3">
          {(() => {
            const ctaLabel = service === 'repair' ? 'Book Repair' : service === 'installation' ? 'Book Installation' : service === 'maintenance' ? 'Book Maintenance' : 'Book Service'
            return (
              <button type="submit" className="inline-flex w-full md:w-auto items-center gap-2 btn-cta cta-shadow bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-lg shadow hover:scale-105 transform transition justify-center"> 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                {ctaLabel}
              </button>
            )
          })()}

          {status === 'loading' && <span className="text-sm text-gray-500">Sending...</span>}
          {status === 'error' && <span className="text-sm text-red-600">Failed to submit</span>}
        </div>
        <div className="mt-2 text-xs cta-sub">We’ll call to confirm your slot — no spam, only booking info.</div>
      </form>

      {showToast && (
        <div className="fixed right-6 bottom-6 bg-white border border-gray-200 shadow-lg rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="font-medium">Booking confirmed</div>
            <div className="text-sm text-gray-600">Our technician will contact you soon.</div>
          </div>
        </div>
      )}
    </div>
  )
}
