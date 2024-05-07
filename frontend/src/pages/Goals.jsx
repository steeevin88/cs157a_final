import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getGoals, deleteGoal, reset } from "../features/goals/goalSlice";
import GoalForm from "../components/GoalForm";

export default function Goals() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message} = useSelector((state) => state.goals);

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="flex flex-col justify-center gap-5 mb-5">
        <p className="text-5xl font-bold text-black">View your Goals</p>
        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add a new Goal</button>
      </section>
      {/* daisyui modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="bg-gray-500 modal-box">
          <GoalForm />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <section className='mx-auto'>
        {goals.length > 0 ? (
          <div className='flex flex-col gap-2'>
            {goals.map((goal) => (
              <div key={goal.GID} className='border-2 border-black rounded-lg exercise'>
                <p className="mb-2 text-2xl font-bold">{goal.name}</p>
                <h4>{goal.description}</h4>
                <button onClick={() => dispatch(deleteGoal(goal.GID))} className='close'>
                  X
                </button>
            </div>
            ))}
          </div>
        ) : (
          <h3>You have not added any goals</h3>
        )}
      </section>
    </>
  )
}
