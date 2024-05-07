import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(addGoal({ 
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
          <label htmlFor='text'>What's the name of your goal?</label>
          <input
            type='text'
            name='text'
            id='text'
            value={name}
            placeholder='Enter Goal Name'
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='text'>Description</label>
          <input
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
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
