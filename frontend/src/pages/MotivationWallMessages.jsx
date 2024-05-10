import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MotivationMessageForm from "../components/MotivationMessageForm";
import Spinner from "../components/Spinner";
import { getMotivationWallById } from "../features/motivationWalls/motivationWallSlice";
import { getMessages, reset } from "../features/motivationMessages/motivationMessageSlice";
import { formatDate } from "../utils/formatDate";

export default function MotivationWallMessages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams(); // Get the id from the URL

  const { user } = useSelector((state) => state.auth);
  const { motivation_walls } = useSelector((state) => state.motivationWalls);
  const { motivation_messages, isLoading, isError, message} = useSelector((state) => state.motivationMessages);

  // this will be a single wall bc we used getMotivationWallById
  const wall_info = motivation_walls;

  useEffect(() => {
    if (isError) alert(message);
    if (!user) navigate("/login");
    else {
      dispatch(getMotivationWallById(id));
      dispatch(getMessages(id));
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
        <MotivationMessageForm id={id}/>
        <section className='mx-auto w-[100%]'>
          {motivation_messages.length > 0 ? (
            <div className='grid gap-2'>
              {[...motivation_messages]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((message) => (
                  <div className="flex flex-col gap-4 p-3 border-2 border-black rounded-lg">
                    <p className="text-2xl">{message.content}</p>
                    <p className="text-sm">
                      Posted on: {formatDate(message.message_date) + " at " + new Date(message.message_date).toLocaleTimeString()} | Posted by: {message.email}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <h3>No messages have been posted...</h3>
          )}
        </section>
      </div>
    </>
  )
}
