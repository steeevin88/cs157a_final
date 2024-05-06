import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addExercise } from '../features/exercises/exerciseSlice'

function ExerciseForm() {
  const [name, setName] = useState('')
  const [muscle_group, setMuscle_Group] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(addExercise({ 
      name:name,
      muscle_group:muscle_group
    }))

    setName('')
    setMuscle_Group('')
    window.location.reload()
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Exercise Name</label>
          <input
            type='text'
            name='text'
            id='text'
            value={name}
            placeholder='Enter Exercise Name'
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='text'>Muscle Group</label>
          <select
            name='muscle_group'
            id='muscle_group'
            value={muscle_group}
            onChange={(e) => setMuscle_Group(e.target.value)}
          >
            <option value=''>Select Muscle Group</option>
            <option value='Chest'>Chest</option>
            <option value='Back'>Back</option>
            <option value='Legs'>Legs</option>
            <option value='Arms/Shoulders'>Arms/Shoulders</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Exercise
          </button>
        </div>
      </form>
    </section>
  )
}

export default ExerciseForm
