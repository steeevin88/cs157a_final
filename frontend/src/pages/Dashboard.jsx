import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExerciseForm from "../components/ExerciseForm";
import Spinner from "../components/Spinner";
import { getExercises, reset } from "../features/exercises/exerciseSlice";
import ExerciseCard from "../components/ExerciseCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { exercises, isLoading, isError, message} = useSelector((state) => state.exercises);

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else dispatch(getExercises());

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
        <h1>Welcome {user && user.name}</h1>
        <p className="font-semibold text-gray-500">Exercises!</p>
      </section>
      <ExerciseForm />
      <section className='mx-auto'>
        {exercises.length > 0 ? (
          <div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
            {exercises.map((exercise) => (
              <ExerciseCard key={exercise.EID} exercise={exercise}/>
            ))}
          </div>
        ) : (
          <h3>You have not added any exercises</h3>
        )}
      </section>
    </>
  )
}
