import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getExerciseById } from "../features/exercises/exerciseSlice";
import { addRecord, getRecords } from "../features/records/recordSlice";
import Spinner from "../components/Spinner";
import RecordCard from "../components/RecordCard";

export default function Exercise() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams(); // Get the id from the URL

  const { user } = useSelector((state) => state.auth);
  const { exercises, isExerciseLoading, isExerciseError, exerciseMessage } = useSelector((state) => state.exercises);
  const { records, isRecordLoading, isRecordError, recordMessage } = useSelector((state) => state.records);
  

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
    
    dispatch(addRecord({ 
      weight:weight,
      repetitions:repetitions,
      exercise_id: String(id)
    }))

    setFormData({ weight: "", repetitions: "" });
    window.location.reload();
  };

  useEffect(() => {
    if (isRecordError) alert(recordMessage);
    if (isExerciseError) alert(exerciseMessage);
    if (!user) navigate("/login");
    else {
      dispatch(getExerciseById(id));
      dispatch(getRecords(id));
    }
  }, [user, navigate, isExerciseError, exerciseMessage, isRecordError, recordMessage, dispatch, id]);

  if (isExerciseLoading || isRecordLoading) {
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
          <button type="submit" className="border-2 border-black">Submit</button>
        </form>
      </div>
      <section className='w-[45vw]'>
        {records.length > 0 ? (
          <div className='grid grid-cols-1 gap-2'>
            {records
              .slice() // Create a copy of the array
              .sort((a, b) => {
                if (a.weight !== b.weight) {
                  return b.weight - a.weight; // Sort by weight in descending order
                } else {
                  return b.repetitions - a.repetitions; // Sort by repetitions in descending order
                }
              })
              .map((record) => (
                <RecordCard key={record.RID} record={record}/>
              ))}
          </div>
        ) : (
          <h3>You have not recorded any PRs</h3>
        )}
      </section>
    </div>
  )
}
