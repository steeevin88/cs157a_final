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
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor='text'>Muscle Groups (optional)</label>
          <input
            type='text'
            name='text'
            id='text'
            value={muscle_group}
            onChange={(e) => setMuscle_Group(e.target.value)}
          />
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
