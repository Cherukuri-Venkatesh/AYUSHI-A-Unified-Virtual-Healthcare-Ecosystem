import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) return toast.error('Image Not Selected')
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='px-5 py-6 w-full'>

      <h2 className='text-2xl font-semibold mb-6 border-b pb-2'>Add New Doctor</h2>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>

        <div className='flex flex-col items-center gap-3 bg-white border rounded-xl p-6'>
          <label htmlFor='doc-img'>
            <img
              className='w-28 h-28 rounded-full object-cover cursor-pointer border'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=''
            />
          </label>
          <input id='doc-img' type='file' hidden onChange={e => setDocImg(e.target.files[0])} />
          <p className='text-gray-600 text-sm tracking-wide'>Click to upload doctor photo</p>
        </div>

        <div className='xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border rounded-xl p-6'>

          <input type="text" placeholder="Doctor Name" className='border px-3 py-2 rounded' value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className='border px-3 py-2 rounded' value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className='border px-3 py-2 rounded' value={password} onChange={e => setPassword(e.target.value)} required />
          
          <select className='border px-3 py-2 rounded' value={experience} onChange={e => setExperience(e.target.value)}>
            <option>1 Year</option><option>2 Years</option><option>3 Years</option><option>4 Years</option>
            <option>5 Years</option><option>6 Years</option><option>8 Years</option><option>9 Years</option><option>10 Years</option>
          </select>

          <input type="number" placeholder="Consulting Fees" className='border px-3 py-2 rounded' value={fees} onChange={e => setFees(e.target.value)} required />

          <select className='border px-3 py-2 rounded' value={speciality} onChange={e => setSpeciality(e.target.value)}>
            <option>General physician</option><option>Gynecologist</option><option>Dermatologist</option>
            <option>Pediatricians</option><option>Neurologist</option><option>Gastroenterologist</option>
          </select>

          <input type="text" placeholder="Degree" className='border px-3 py-2 rounded' value={degree} onChange={e => setDegree(e.target.value)} required />

          <input type="text" placeholder="Address line 1" className='border px-3 py-2 rounded' value={address1} onChange={e => setAddress1(e.target.value)} required />
          <input type="text" placeholder="Address line 2" className='border px-3 py-2 rounded' value={address2} onChange={e => setAddress2(e.target.value)} required />

        </div>
      </div>

      <div className='mt-6 bg-white border rounded-xl p-6'>
        <textarea rows={5} placeholder='Write about doctor' className='border w-full px-4 py-2 rounded'
          value={about} onChange={e => setAbout(e.target.value)}></textarea>
      </div>

      <div className='mt-6 text-right'>
        <button type='submit' className='bg-primary text-white px-12 py-3 rounded-full font-medium'>Add Doctor</button>
      </div>

    </form>
  )
}

export default AddDoctor
