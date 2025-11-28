import React, { useEffect, useState } from 'react'
import { login, getReports, markReportReviewed } from '../api'

export default function AdminDashboard(){
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selected, setSelected] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const fetchReports = async (tokenOverride) => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category) params.category = category
      if (startDate) params.startDate = startDate
      if (endDate) params.endDate = endDate
      const tokenToUse = tokenOverride || token
      const { data, ok, status } = await getReports(tokenToUse, params)
      if (!ok) {
        if (status === 401) {
          setLoginError(data && data.message ? data.message : 'Unauthorized')
          localStorage.removeItem('admin_token')
          setToken('')
        }
        setReports([])
      } else {
        setReports(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error(err)
    } finally { setLoading(false) }
  }

  useEffect(() => {
    // only fetch when authenticated
    if (token) {
      fetchReports()
    }
  }, [token, search, category, startDate, endDate])

  const markReviewed = async (id) => {
    try {
      const { ok } = await markReportReviewed(id, token)
      if (!ok) throw new Error('Failed')
      setReports(prev => prev.map(r => r._id === id ? {...r, reviewed: true} : r))
    } catch (err) { console.error(err) }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const { data, ok } = await login(loginUsername, loginPassword)
      if (!ok) {
        setLoginError(data.message || 'Login failed')
        return
      }
      localStorage.setItem('admin_token', data.token)
      setToken(data.token)
      setLoginPassword('')
      setLoginUsername('')
      fetchReports(data.token)
    } catch (err) {
      console.error(err)
      setLoginError('Network error')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken('')
    setReports([])
  }

  const categories = Array.from(new Set(reports.map(r => r.category).filter(Boolean)))
  // guard if reports is not an array (e.g. error object)
  const reportList = Array.isArray(reports) ? reports : []
  const safeCategories = Array.from(new Set(reportList.map(r => r.category).filter(Boolean)))

  return (
    <div>
      {!token ? (
        <div className="max-w-md mx-auto bg-gray-50 p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
          <form onSubmit={handleLogin} className="space-y-3">
            <input value={loginUsername} onChange={e=>setLoginUsername(e.target.value)} placeholder="Username" className="w-full px-3 py-2 border rounded" />
            <input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 border rounded" />
            {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Sign in</button>
              <div>
                <button type="button" onClick={() => { setLoginUsername('admin'); setLoginPassword('safe1234') }} className="text-sm text-gray-500">fill demo</button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div />
            <div>
              <button onClick={handleLogout} className="text-sm text-red-600">Logout</button>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title or description" className="border px-3 py-2 rounded w-1/3" />
            <select value={category} onChange={e => setCategory(e.target.value)} className="border px-3 py-2 rounded">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border px-3 py-2 rounded" />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border px-3 py-2 rounded" />
            <button onClick={fetchReports} className="ml-auto bg-purple-600 text-white px-4 py-2 rounded">Apply</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2">Reviewed</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="6" className="px-3 py-6">Loading...</td></tr>}
                {!loading && reports.length === 0 && <tr><td colSpan="6" className="px-3 py-6">No reports found</td></tr>}
                {reports.map(r => (
                  <tr key={r._id} className="border-t">
                    <td className="px-3 py-2 text-sm">{new Date(r.date).toLocaleString()}</td>
                    <td className="px-3 py-2 font-medium">{r.title || '—'}</td>
                    <td className="px-3 py-2">{r.category || '—'}</td>
                    <td className="px-3 py-2">{r.location || '—'}</td>
                    <td className="px-3 py-2">{r.reviewed ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2">
                      <button onClick={() => setSelected(r)} className="mr-2 text-sm text-blue-600">View</button>
                      <button onClick={() => markReviewed(r._id)} disabled={r.reviewed} className="text-sm text-green-600" >Mark Reviewed</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selected && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white max-w-2xl w-full p-6 rounded shadow-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{selected.title || 'Report Details'}</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-500">Close</button>
                </div>
                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <p><strong>Description:</strong></p>
                  <p className="whitespace-pre-wrap">{selected.description}</p>
                  <p><strong>Location:</strong> {selected.location || '—'}</p>
                  <p><strong>Category:</strong> {selected.category || '—'}</p>
                  <p><strong>Date:</strong> {new Date(selected.date).toLocaleString()}</p>
                  <p><strong>Anonymous:</strong> {selected.anonymous ? 'Yes' : 'No'}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  {!selected.reviewed && <button onClick={() => { markReviewed(selected._id); setSelected(prev => ({...prev, reviewed: true})); }} className="bg-green-600 text-white px-4 py-2 rounded mr-2">Mark Reviewed</button>}
                  <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
