import {  getAnecdotes, updateAnecdote } from '../requests/requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import { useNotification } from './reducers/notificationReducer'



const App = () => {
  const queryClient = useQueryClient()
  const [notification,dispatch] = useNotification()

  const updateAnecdoteMutation = useMutation({mutationFn:updateAnecdote,onSuccess:(updatedAnecdote) =>{queryClient.invalidateQueries({queryKey:['anecdotes']})
  dispatch({ type: 'SET', payload: `Anecdote '${updatedAnecdote.content}' voted` })
  setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)}})
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote,votes:anecdote.votes+1})
  }

  const result = useQuery({
    queryKey:['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if(result.isLoading){
    return <div>loading data...</div>
  }

  const anecdotes = result.data



/*   const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ] */

  return (
    
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
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

export default App
