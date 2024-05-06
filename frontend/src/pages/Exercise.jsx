import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getExerciseById } from "../features/exercises/exerciseSlice";
import Spinner from "../components/Spinner";

export default function Exercise() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { exercises, isLoading, isError, message} = useSelector((state) => state.exercises);

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else dispatch(getExerciseById(id));
  }, [user, navigate, isError, message, dispatch, id]);

  if (isLoading) {
    return <Spinner />
  }

  console.log(id)
  console.log(exercises)

  return (
    <div></div>
  )
}
