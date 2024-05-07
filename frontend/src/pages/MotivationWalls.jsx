import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import MotivationWallForm from "../components/MotivationWallForm";
import { getMotivationWalls, reset } from "../features/motivationWalls/motivationWallSlice";
import MotivationWallCard from "../components/MotivationWallCard";

export default function MotivationWalls() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { motivation_walls, isLoading, isError, message} = useSelector((state) => state.motivationWalls);

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else dispatch(getMotivationWalls());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="flex flex-row justify-center gap-5 mb-10 text-center">
        <p className="leading-none w-[70%] text-5xl font-bold">
          {user && user.name}, here's some motivation...
        </p>
        <button className="h-auto border-black btn rounded-3xl w-[30%]" onClick={()=>document.getElementById('my_modal_1').showModal()}>Start a new wall</button>
      </section>
      {/* daisyui modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="bg-gray-500 modal-box">
          <MotivationWallForm />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <section className='mx-auto'>
        {motivation_walls.length > 0 ? (
          <div className='grid grid-cols-2 gap-2'>
            {motivation_walls.map((motivation_wall) => (
              <MotivationWallCard key={motivation_wall.MWID} motivationWall={motivation_wall}/>
            ))}
          </div>
        ) : (
          <h3>Be the first to create a motivational wall by clicking the button above!</h3>
        )}
      </section>
    </>
  )
}
