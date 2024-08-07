import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteMotivationWall } from '../features/motivationWalls/motivationWallSlice';

function MotivationWallCard({ motivationWall }) {
  const dispatch = useDispatch()

  return (
    <div className='border-black rounded-lg exercise'>
      <Link to={`/motivation/${motivationWall.MWID}`} className="mb-2 text-2xl font-bold">   
        {motivationWall.name}
      </Link>
      <p className='px-2'>{motivationWall.description}</p>
      <h5>Created by: {motivationWall.email}</h5>
      <button onClick={() => dispatch(deleteMotivationWall(motivationWall.MWID))} className='close'>
        X
      </button>
    </div>
  )
}

export default MotivationWallCard
