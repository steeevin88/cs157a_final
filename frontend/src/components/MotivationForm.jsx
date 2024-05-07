import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addExercise } from '../features/exercises/exerciseSlice'

function MotivationForm() {
  const [content, setContent] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(addExercise({ 
      content:content
    }))

    setContent('')
    window.location.reload()
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text' className='text-2xl font-bold'>Message Content</label>
          <textarea
            type='text'
            name='text'
            id='text'
            value={content}
            placeholder='Write your message content...'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Post to this Motivation Wall
          </button>
        </div>
      </form>
    </section>
  )
}

export default MotivationForm
