import { useDispatch } from 'react-redux'
import { deleteExercise } from '../features/exercises/exerciseSlice'

import { Link } from 'react-router-dom';

function ExerciseCard({ exercise }) {
  const dispatch = useDispatch()

  return (
    <div className='border-2 border-black rounded-lg exercise'>
      <Link to={`/exercise/${exercise.EID}`}>
        <h2>{exercise.name}</h2>
      </Link>
      <h4>{exercise.muscle_group}</h4>
      <button onClick={() => dispatch(deleteExercise(exercise.EID))} className='close'>
        X
      </button>
    </div>
  )
}

export default ExerciseCard
