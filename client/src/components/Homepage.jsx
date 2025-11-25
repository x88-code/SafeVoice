import React from 'react'

export default function Homepage({ setCurrentPage }) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white rounded-lg shadow-lg p-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Voice Matters</h2>
        <p className="text-xl text-gray-600 mb-8">SafeVoice is a safe, anonymous platform where women and girls can report harassment and abuse without fear.</p>
        <button onClick={() => setCurrentPage('report')} className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">
          Submit a Report
        </button>
      </section>

      {/* Why SafeVoice */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Completely Anonymous</h3>
          <p className="text-gray-600">No personal information required. Your identity is never exposed.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
          <p className="text-gray-600">Your reports are encrypted and stored securely with care.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-4xl mb-4">📞</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Support Available</h3>
          <p className="text-gray-600">Access resources and support networks to help you heal.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-lg shadow-lg p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white text-lg font-bold">1</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Fill Out the Form</h3>
              <p className="text-gray-600 mt-1">Share your experience in detail. No names or personal info needed.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white text-lg font-bold">2</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Submit Anonymously</h3>
              <p className="text-gray-600 mt-1">Your report is submitted securely. You remain completely anonymous.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white text-lg font-bold">3</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Get Support</h3>
              <p className="text-gray-600 mt-1">Access resources and connect with support services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
        <p className="text-lg mb-8 opacity-90">You are not alone. SafeVoice is here to listen and support you.</p>
        <button onClick={() => setCurrentPage('report')} className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
          Submit a Report Now
        </button>
      </section>
    </div>
  )
}
