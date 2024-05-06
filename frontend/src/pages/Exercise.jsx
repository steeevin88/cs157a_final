import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getExerciseById } from "../features/exercises/exerciseSlice";
import Spinner from "../components/Spinner";

export default function Exercise() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams(); // Get the id from the URL

  const { user } = useSelector((state) => state.auth);
  const { exercises, isLoading, isError, message} = useSelector((state) => state.exercises);

  const [formData, setFormData] = useState({
    weight: "",
    repetitions: "",
  });

  const { weight, repetitions } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else dispatch(getExerciseById(id));
  }, [user, navigate, isError, message, dispatch, id]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex flex-row justify-center gap-2 mx-auto text-center">
      <div className="w-[45vw] flex gap-4 flex-col">
        <div>
          <p className="text-5xl font-bold">{exercises.name}</p>
          <p className="text-2xl font-bold">Muscle Group: {exercises.muscle_group}</p>
        </div>
        <hr className="border-2 border-black rounded-lg"/>
        <p className="text-2xl font-bold">Record Your PRs!</p>
        <form className="flex flex-col justify-center gap-2" onSubmit={handleSubmit}>
          <input
            className="p-2 border-2 border-black rounded-lg"
            type="text"
            name="weight"
            value={weight}
            onChange={handleChange}
            placeholder="Weight"
          />
          <input
            className="p-2 border-2 border-black rounded-lg"
            type="text"
            name="repetitions"
            value={repetitions}
            onChange={handleChange}
            placeholder="Repetitions"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="w-[45vw]">
        text
      </div>
    </div>
  )
}
