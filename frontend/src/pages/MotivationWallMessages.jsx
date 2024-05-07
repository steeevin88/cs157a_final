import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MotivationForm from "../components/MotivationForm";
import Spinner from "../components/Spinner";
import { getExercises, reset } from "../features/exercises/exerciseSlice";
import ExerciseCard from "../components/ExerciseCard";
import { getMotivationWallById } from "../features/motivationWalls/motivationWallSlice";

export default function MotivationWallMessages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams(); // Get the id from the URL

  const { user } = useSelector((state) => state.auth);
  const { motivation_walls } = useSelector((state) => state.motivationWalls);
  const { exercises, isLoading, isError, message} = useSelector((state) => state.exercises);

  // this will be a single wall bc we used getMotivationWallById
  const wall_info = motivation_walls;

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else {
      dispatch(getMotivationWallById(id));
      dispatch(getExercises());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, id]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <p className="mb-3 text-5xl font-bold">{wall_info.name}</p>
        <p className="text-2xl">{wall_info.description}</p>
      </section>
      <div className="flex flex-row gap-4">
        <MotivationForm />
        <section className='mx-auto w-[100%]'>
          {exercises.length > 0 ? (
            <div className='grid gap-2'>
              {exercises.map((exercise) => (
                <ExerciseCard key={exercise.EID} exercise={exercise}/>
              ))}
            </div>
          ) : (
            <h3>You have not added any exercises</h3>
          )}
        </section>
      </div>
    </>
  )
}
