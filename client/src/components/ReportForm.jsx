import React, { useState } from 'react'
import { submitReport } from '../api'

export default function ReportForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [contactMethod, setContactMethod] = useState('')
  const [status, setStatus] = useState(null)
  const [agreePrivacy, setAgreePrivacy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!agreePrivacy) {
      setStatus('Please acknowledge our privacy commitment')
      return
    }

    setStatus('loading')
    try {
      const { ok } = await submitReport({ title, description, location, contactMethod, category })
      if (ok) {
        setStatus('submitted')
        setTitle('')
        setDescription('')
        setLocation('')
        setCategory('')
        setContactMethod('')
        setAgreePrivacy(false)
        
        // Clear success message after 5 seconds
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('network error')
    }
  }

  const categories = [
    '🚨 Harassment',
    '⚠️ Safety Concern',
    '👥 Discrimination',
    '💼 Workplace Issue',
    '🏫 Educational',
    '🏥 Health-Related',
    '🌐 Online',
    '📍 Other'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Privacy Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-6 sm:p-8">
        <div className="flex gap-3">
          <span className="text-2xl flex-shrink-0">🔐</span>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Your Privacy is Protected</h3>
            <p className="text-gray-700 text-sm">
              Everything you share is completely confidential. We don't collect or store any personal identifying information. Your report will be reviewed by trained professionals who care about your safety.
            </p>
          </div>
        </div>
      </div>

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-bold text-gray-900 mb-2">
          📌 Brief Title <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Incident at workplace or online harassment"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
        />
        <p className="text-xs text-gray-500 mt-1">A short summary helps us categorize your report</p>
      </div>

      {/* Category Selection */}
      <div>
        <label htmlFor="category" className="block text-sm font-bold text-gray-900 mb-3">
          📂 Report Category <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-bold text-gray-900 mb-2">
          📝 What Happened? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Please share what happened. Include as much detail as you're comfortable with:
• What happened?
• When did it occur?
• Where were you?
• Who was involved?
• How did it make you feel?

Take your time—there's no rush."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400 h-48 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          {description.length > 0 ? `${description.length} characters` : 'Start typing when you\'re ready...'}
        </p>
      </div>

      {/* Location Field */}
      <div>
        <label htmlFor="location" className="block text-sm font-bold text-gray-900 mb-2">
          📍 Location <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., City/District, venue name, or 'Online'"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
        />
        <p className="text-xs text-gray-500 mt-1">General location only—nothing that could identify you</p>
      </div>

      {/* Contact Method Field */}
      <div>
        <label htmlFor="contact" className="block text-sm font-bold text-gray-900 mb-2">
          📧 How Would You Like to Be Contacted? <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <input
          id="contact"
          type="text"
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
          placeholder="e.g., email@example.com, phone number, or 'Prefer not to be contacted'"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-gray-900 placeholder-gray-400"
        />
        <p className="text-xs text-gray-500 mt-1">
          We will only contact you if you provide this information. Your choice is respected.
        </p>
      </div>

      {/* Privacy Acknowledgement */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 mt-0.5 flex-shrink-0"
          />
          <span className="text-sm text-gray-700">
            <span className="font-bold text-gray-900">I understand and agree</span> that my report is completely anonymous and confidential. SafeVoice will never share my personal information without consent.
          </span>
        </label>
      </div>

      {/* Success/Error Messages */}
      {status && (
        <div
          className={`p-4 rounded-xl font-medium text-sm ${
            status === 'submitted'
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : status === 'loading'
              ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
              : 'bg-red-100 text-red-800 border-2 border-red-300'
          }`}
        >
          {status === 'submitted' && '✓ Report submitted successfully! Thank you for your courage. Your voice matters.'}
          {status === 'loading' && '⏳ Submitting your report securely...'}
          {status !== 'submitted' && status !== 'loading' && `❌ Error: ${status}`}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-200">
        <button
          type="submit"
          disabled={status === 'loading' || !agreePrivacy || !description.trim()}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <span>🚀</span>
              Submit Report
            </>
          )}
        </button>
        
        <button
          type="reset"
          onClick={() => {
            setTitle('')
            setDescription('')
            setLocation('')
            setCategory('')
            setContactMethod('')
            setAgreePrivacy(false)
            setStatus(null)
          }}
          className="px-6 py-4 bg-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-300 transition-colors"
        >
          Clear Form
        </button>
      </div>

      {/* Help Text */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <p className="text-sm text-gray-700 mb-3 font-bold">💡 Tips for Your Report:</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✓ Be as specific as you can, but only share what you're comfortable with</li>
          <li>✓ Include dates and times if you remember them</li>
          <li>✓ Describe exactly what happened in your own words</li>
          <li>✓ You can include other people involved (without names if preferred)</li>
          <li>✓ This will help us better understand and respond to your situation</li>
        </ul>
      </div>

      {/* Emergency Help */}
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
        <p className="text-sm font-bold text-red-900 mb-2">🆘 In Immediate Danger?</p>
        <p className="text-sm text-red-800 mb-3">
          If you or someone you know is in immediate danger, please hang up and call emergency services now: <span className="font-bold">911</span>
        </p>
        <p className="text-sm text-red-800">
          Don't wait—your safety comes first. This form can wait. Help is available right now.
        </p>
      </div>
    </form>
  )
}
