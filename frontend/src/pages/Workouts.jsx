import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { deleteWorkout, getWorkouts, reset } from "../features/workouts/workoutSlice";
import WorkoutForm from "../components/WorkoutForm";
import { Link } from "react-router-dom";

export default function Workouts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { workouts, isLoading, isError, message} = useSelector((state) => state.workouts);

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else dispatch(getWorkouts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>{user && user.name}'s Workouts</h1>
      </section>
      <div className="flex gap-4">
        <WorkoutForm />
        <section className='mx-auto w-[100%]'>
          {workouts.length > 0 ? (
            <div className='grid grid-cols-3 gap-2'>
              {workouts.map((workout) => (
                <div key={workout.WID} className='w-40 p-2 border-2 border-black card'>
                  <Link to={`/workouts/${workout.WID}`} className="text-2xl font-bold">
                    {workout.name}
                  </Link>
                  <p className="text-md">{workout.time}</p>
                  <p className="text-sm">{workout.notes}</p>
                  <button onClick={() => dispatch(deleteWorkout(workout.WID))} className='close'>
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <h3>You have not added any workouts</h3>
          )}
        </section>
      </div>
    </>
  )
}
