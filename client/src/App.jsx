import React, { useState } from 'react'
import ReportForm from './components/ReportForm'
import Homepage from './components/Homepage'

export default function App(){
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600">SafeVoice</h1>
          <nav className="space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`text-sm font-medium ${currentPage === 'home' ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}>Home</button>
            <button onClick={() => setCurrentPage('report')} className={`text-sm font-medium ${currentPage === 'report' ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}>Submit Report</button>
            <button onClick={() => setCurrentPage('resources')} className={`text-sm font-medium ${currentPage === 'resources' ? 'text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}>Resources</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {currentPage === 'home' && <Homepage setCurrentPage={setCurrentPage} />}
        {currentPage === 'report' && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Submit Anonymous Report</h2>
            <ReportForm />
          </div>
        )}
        {currentPage === 'resources' && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Safety Resources</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">24/7 Hotlines</h3>
                <p className="text-gray-600 mt-2">National Sexual Assault Hotline: +254695530598</p>
                <p className="text-gray-600">Domestic Violence Hotline: +2547695530598</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Online Support</h3>
                <p className="text-gray-600 mt-2">RAINN.org - Confidential support and resources</p>
                <p className="text-gray-600">Crisis Text Line: Text HOME to 741741</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>SafeVoice - Anonymous Reporting Platform | All reports are confidential</p>
        </div>
      </footer>
    </div>
  )
}
