import { useDispatch } from 'react-redux'
import { deleteRecord } from '../features/records/recordSlice'

function RecordCard({ record }) {
  const dispatch = useDispatch()

  return (
    <div className='px-8 mx-auto border-2 border-black rounded-lg'>
      <p className="text-lg font-bold">Weight: {record.weight}</p>
      <p className="">Repetitions: {record.repetitions}</p>
      <button onClick={() => dispatch(deleteRecord(record.RID))} className='close'>
        X
      </button>
    </div>
  )
}

export default RecordCard
