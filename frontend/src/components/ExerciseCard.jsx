import { useDispatch } from 'react-redux'
import { deleteExercise } from '../features/exercises/exerciseSlice'

function ExerciseCard({ exercise }) {
  const dispatch = useDispatch()
  console.log(exercise)

  return (
    <div className='border-2 border-black rounded-lg exercise'>
      <h2>{exercise.name}</h2>
      <h4>{exercise.muscle_group}</h4>
      <button onClick={() => dispatch(deleteExercise(exercise.EID))} className='close'>
        X
      </button>
    </div>
  )
}

export default ExerciseCard
