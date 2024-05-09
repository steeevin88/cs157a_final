import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getGyms, deleteGym, reset } from "../features/gyms/gymSlice";
import GymForm from "../components/GymForm";

export default function Gyms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { gyms, isLoading, isError, message} = useSelector((state) => state.gyms);
  console.log(user)
  console.log(gyms)

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else dispatch(getGyms());

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
        <p className="text-5xl font-bold text-black">View all Gyms</p>
        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add a new Gym</button>
      </section>
      {/* daisyui modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="bg-gray-500 modal-box">
          <GymForm />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <section className='mx-auto'>
        {gyms.length > 0 ? (
          <div className='flex flex-col gap-2'>
            {gyms.map((gym) => (
              <div key={gym.LID} className='border-2 border-black rounded-lg exercise'>
                <p className="mb-2 text-2xl font-bold">{gym.name}</p>
                <h4> {gym.address} </h4>
                <h5> {gym.description} </h5>
                {(gym.email === user.email) && <button onClick={() => dispatch(deleteGym(gym.LID))} className='close'>
                  X
                </button>}
                <h5> {gym.email} </h5>
            </div>
            ))}
          </div>
        ) : (
          <h3>There are no gyms to view</h3>
        )}
      </section>
    </>
  )
}
