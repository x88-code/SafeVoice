import React, { useState } from 'react'

export default function ReportForm(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [contactMethod, setContactMethod] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try{
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, location, contactMethod })
      })
      if(res.ok){
        setStatus('submitted')
        setTitle('')
        setDescription('')
        setLocation('')
        setContactMethod('')
      } else {
        const data = await res.json()
        setStatus(data.message || 'error')
      }
    }catch(err){
      console.error(err)
      setStatus('network error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Brief Title (optional)</label>
        <input 
          value={title} 
          onChange={e=>setTitle(e.target.value)} 
          placeholder="e.g., Incident at workplace"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description of What Happened *</label>
        <textarea 
          value={description} 
          onChange={e=>setDescription(e.target.value)} 
          required 
          placeholder="Please describe the incident in detail. Include date, time, location, and what happened. Your safety and confidentiality are our priority."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition h-40" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Location Where It Happened (optional)</label>
        <input 
          value={location} 
          onChange={e=>setLocation(e.target.value)} 
          placeholder="e.g., City/District or venue name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">How Would You Like to Be Contacted? (optional)</label>
        <input 
          value={contactMethod} 
          onChange={e=>setContactMethod(e.target.value)} 
          placeholder="e.g., email@example.com, phone number, or 'prefer not to be contacted'"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" 
        />
        <p className="text-xs text-gray-500 mt-2">We will only contact you if you provide this information.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        ✓ Your submission is completely anonymous and confidential.
      </div>

      <div className="flex items-center justify-between pt-6">
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Report'}
        </button>
        {status && (
          <span className={`text-sm font-medium ${status === 'submitted' ? 'text-green-600' : status === 'loading' ? 'text-gray-600' : 'text-red-600'}`}>
            {status === 'submitted' ? '✓ Report submitted successfully' : status}
          </span>
        )}
      </div>
    </form>
  )
}
