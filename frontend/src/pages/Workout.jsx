import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getWorkoutById } from "../features/workouts/workoutSlice";
import { getExercises } from "../features/exercises/exerciseSlice";
import Spinner from "../components/Spinner";
import { addWorkoutExercise, deleteWorkoutExercise, getWorkoutExercises } from "../features/workoutExercises/workoutExerciseSlice";

export default function Workout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams(); // Get the id from the URL

  const { user } = useSelector((state) => state.auth);
  const { workouts, isWorkoutLoading, isWorkoutError, workoutMessage } = useSelector((state) => state.workouts);
  const { exercises, isExerciseLoading, isExerciseError, exerciseMessage } = useSelector((state) => state.exercises);
  const { workout_exercises } = useSelector((state) => state.workout_exercises);

  useEffect(() => {
    if (isExerciseError) alert(exerciseMessage);
    if (isWorkoutError) alert(workoutMessage);
    if (!user) navigate("/login");
    else {
      dispatch(getWorkoutById(id));
      dispatch(getExercises(id));
      dispatch(getWorkoutExercises(id));
    }
  }, [user, navigate, isWorkoutError, workoutMessage, isExerciseError, exerciseMessage, dispatch, id]);

  if (isWorkoutLoading || isExerciseLoading) {
    return <Spinner />
  }

  return (
    <div className="flex flex-row justify-center gap-2 mx-auto text-center">
      <div className="w-[45vw] flex gap-4 flex-col">
        <div>
          <p className="mb-3 text-5xl font-bold">{workouts.name}</p>
          <p className="text-2xl">This workout will take {workouts.time}</p>
          <p className="text-md">{workouts.notes}</p>
        </div>
        <hr className="border-2 border-black rounded-lg"/>
        {workout_exercises.length > 0 ? (
          <div className='grid grid-cols-1 gap-4'>
            {workout_exercises
              .map((exercise) => (
                <div key={exercise.EID} className="flex justify-center gap-4">
                  <p className="text-5xl font-bold text-red-500">{exercise.name}</p>
                  <button 
                    className='font-bold close'
                    onClick={() => {
                      dispatch(deleteWorkoutExercise({ WID: id, EID: exercise.EID }))
                      window.location.reload()
                    }} 
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <h3>You have not added any exercises...</h3>
        )}
      </div>
      <section className='w-[45vw]'>
        {exercises.length > 0 ? (
          <div className='grid grid-cols-1 gap-2'>
            {exercises
              .filter(exercise => !workout_exercises.some(workoutExercise => workoutExercise.EID === exercise.EID))
              .map((exercise) => (
                <div key={exercise.EID} className="p-2 bg-gray-100 border-2 border-black rounded-lg">
                  <p className="text-2xl font-bold text-red-500">{exercise.name}</p>
                  <button 
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700" onClick={() => {
                      dispatch(addWorkoutExercise({ WID: id, EID: exercise.EID }))
                      window.location.reload()
                    }
                  }>
                    Add Exercise to Workout
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <h3>You have not added any exercises...</h3>
        )}
      </section>
    </div>
  )
}
