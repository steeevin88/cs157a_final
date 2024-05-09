import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGym } from '../features/gyms/gymSlice'

function GymForm() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(addGym({ 
      name:name,
      address:address,
      description:description
    }))

    setName('')
    setAddress('')
    window.location.reload()
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit} className=''>
        <div className='text-lg form-group'>
          <label htmlFor='text'>What's the name of your gym?</label>
          <input
            type='text'
            name='text'
            id='text'
            value={name}
            placeholder='Enter Gym Name'
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='text'>Address</label>
          <textarea
            type='text'
            name='text'
            id='text'
            value={address}
            placeholder='Enter Address'
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor='text'>Description</label>
          <textarea
            type='text'
            name='text'
            id='text'
            value={description}
            placeholder='Enter Description'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Gym
          </button>
        </div>
      </form>
    </section>
  )
}

export default GymForm
