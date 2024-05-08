import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addWorkout } from '../features/workouts/workoutSlice'

function WorkoutForm() {
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(addWorkout({ 
      name:name,
      time:time,
      notes:notes
    }))

    setName('')
    setTime('')
    setNotes('')
    window.location.reload()
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Workout Name</label>
          <input
            type='text'
            name='text'
            id='text'
            value={name}
            placeholder='Enter Workout Name'
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='text'>Workout Time Length</label>
          <input
            type='text'
            name='text'
            id='text'
            value={time}
            placeholder='Enter time length of Workout'
            onChange={(e) => setTime(e.target.value)}
          />
          <label htmlFor='text'>Workout Notes</label>
          <textarea
            type='text'
            name='text'
            id='text'
            value={notes}
            placeholder='Add any notes here...'
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Workout
          </button>
        </div>
      </form>
    </section>
  )
}

export default WorkoutForm
