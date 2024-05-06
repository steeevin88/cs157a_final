import { useDispatch } from 'react-redux'
import { deleteExercise } from '../features/exercises/exerciseSlice'

import { Link } from 'react-router-dom';

function ExerciseCard({ exercise }) {
  const dispatch = useDispatch()

  return (
    <Link to={`/exercise/${exercise.EID}`}>
      <div className='border-2 border-black rounded-lg exercise'>
        <p className="mb-2 text-2xl font-bold">{exercise.name}</p>
        <h4>{exercise.muscle_group}</h4>
        <button onClick={() => dispatch(deleteExercise(exercise.EID))} className='close'>
          X
        </button>
      </div>
    </Link>
  )
}

export default ExerciseCard
