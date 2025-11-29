import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'

const MyPrescriptions = ({ appointmentId }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { slotDateFormat } = useContext(AppContext) || {}

  useEffect(() => {
    if (appointmentId) fetchPrescriptions(appointmentId)
  }, [appointmentId])

  const fetchPrescriptions = async (appointmentId) => {
    try {
      setLoading(true)
      setError('')
      const token = localStorage.getItem('token') || ''
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointment/${appointmentId}/files`, {
        headers: { token }
      })

      if (data.success) {
        // filter only eprescriptions
        const eprescriptions = data.files.filter(f => f.type === 'eprescription')
        const sorted = eprescriptions.sort((a, b) => new Date(b.date) - new Date(a.date))
        setPrescriptions(sorted)
      } else {
        setError(data.message || 'Failed to fetch')
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">E-Prescriptions</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {prescriptions.length === 0 && !loading && <p>No prescriptions found.</p>}

      <div className="space-y-3">
        {prescriptions.map((p) => (
          <div key={p._id} className="border rounded p-3 flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500">
                Date: {slotDateFormat ? slotDateFormat(p.date) : new Date(p.date).toLocaleString()}
              </div>
              <div className="font-medium mt-1">Appointment: {p.appointmentId || '—'}</div>
              <div className="text-sm text-gray-600 mt-1">Uploaded by: {p.doctorId || 'Doctor'}</div>
              {p.notes && <div className="mt-2 text-sm text-gray-700">Notes: {p.notes}</div>}
              <div className="mt-1 text-sm text-gray-600">Type: {p.type}</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded bg-blue-600 text-white text-sm"
                >
                  View File
                </a>
              )}
              <div className="text-xs text-gray-400">{new Date(p.date).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPrescriptions
