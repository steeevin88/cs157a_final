import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
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
      <section className="heading">
        <p>Goals!</p>
      </section>
      <GoalForm />
      <section className='mx-auto'>
        {goals.length > 0 ? (
          <div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
            {goals.map((goal) => (
              <p>{goal.name}</p>
            ))}
          </div>
        ) : (
          <h3>You have not added any goals</h3>
        )}
      </section>
    </>
  )
}
