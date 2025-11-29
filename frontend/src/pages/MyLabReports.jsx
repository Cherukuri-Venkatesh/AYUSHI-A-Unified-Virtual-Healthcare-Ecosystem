import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom' // in case appointmentId is dynamic

const MyLabReports = ({ appointmentId }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { slotDateFormat } = useContext(AppContext) || {}

  useEffect(() => {
    if (appointmentId) fetchReports(appointmentId)
  }, [appointmentId])

  const fetchReports = async (appointmentId) => {
    try {
      setLoading(true)
      setError('')
      const token = localStorage.getItem('token') || ''
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointment/${appointmentId}/files`, {
        headers: { token }
      })
      if (data.success) {
        const sorted = data.files.sort((a, b) => new Date(b.date) - new Date(a.date))
        setReports(sorted)
      } else {
        setError(data.message || 'Failed to fetch')
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Lab Reports / E-Prescriptions</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {reports.length === 0 && !loading && <p>No reports found.</p>}

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r._id} className="border rounded p-3 flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500">
                Date: {slotDateFormat ? slotDateFormat(r.date) : new Date(r.date).toLocaleString()}
              </div>
              <div className="font-medium mt-1">Appointment: {r.appointmentId || '—'}</div>
              <div className="text-sm text-gray-600 mt-1">Uploaded by: {r.doctorId || 'Doctor'}</div>
              {r.notes && <div className="mt-2 text-sm text-gray-700">Notes: {r.notes}</div>}
              <div className="mt-1 text-sm text-gray-600">Type: {r.type}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded bg-green-600 text-white text-sm"
                >
                  View File
                </a>
              )}
              <div className="text-xs text-gray-400">{new Date(r.date).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyLabReports
