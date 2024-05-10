import { useDispatch } from 'react-redux'
import { deleteRecord } from '../features/records/recordSlice'
import { formatDate } from '../utils/formatDate'

function RecordCard({ record }) {
  const dispatch = useDispatch()

  return (
    <div className='px-8 mx-auto border-2 border-black rounded-lg'>
      <p className="text-lg font-bold">Weight: {record.weight}</p>
      <p className="text-md">Repetitions: {record.repetitions}</p>
      <p className="text-md">Date: {formatDate(record.record_date)}</p>
      <button onClick={() => dispatch(deleteRecord(record.RID))} className='font-bold close'>
        X
      </button>
    </div>
  )
}

export default RecordCard
