import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

// eslint-disable-next-line react/prop-types
const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const sortedAnecdotes = [...filteredAnecdotes].sort((a,b) => b.votes - a.votes)
  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(showNotification(`you voted '${anecdote.content}'`,5))
  }
  

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList

