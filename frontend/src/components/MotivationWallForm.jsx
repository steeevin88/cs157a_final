import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMotivationWall } from '../features/motivationWalls/motivationWallSlice'

function MotivationWallForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(addMotivationWall({ 
      name:name,
      description:description
    }))

    setName('')
    setDescription('')
    window.location.reload()
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text' className='text-2xl'>Wall Title</label>
          <input
            type='text'
            name='text'
            id='text'
            value={name}
            placeholder='Enter Motivation Wall Title'
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='text' className='text-2xl'>Description</label>
          <textarea
            type='text'
            name='text'
            id='text'
            value={description}
            placeholder='Describe your goal here...'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Submit Motivation Wall
          </button>
        </div>
      </form>
    </section>
  )
}

export default MotivationWallForm
