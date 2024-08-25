/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"


// eslint-disable-next-line react/prop-types
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(showNotification(`you created '${content}'`,5))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

