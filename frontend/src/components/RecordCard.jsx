import { useDispatch } from 'react-redux'
import { deleteRecord } from '../features/records/recordSlice'

function formatDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const formattedMonth = (month + 1).toString().padStart(2, "0");

  return `${formattedMonth}/${day}/${year}`;
}

function RecordCard({ record }) {
  const dispatch = useDispatch()

  return (
    <div className='px-8 mx-auto border-2 border-black rounded-lg'>
      <p className="text-lg font-bold">Weight: {record.weight}</p>
      <p className="text-md">Repetitions: {record.repetitions}</p>
      <p className="text-md">Date: {formatDate(record.date)}</p>
      <button onClick={() => dispatch(deleteRecord(record.RID))} className='font-bold close'>
        X
      </button>
    </div>
  )
}

export default RecordCard
