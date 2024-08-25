import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

/* export const vote = (id) => {
  return{
    type:'VOTE',
    payload:id
  }
}
export const addAnecdote = (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  return ({
    type: 'ADD',
    payload: asObject(content)
  })
}

const initialState = anecdotesAtStart.map(asObject)


const anecdoteReducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.payload ? {...anecdote, votes: anecdote.votes + 1 }: anecdote)
    case 'ADD':
      return [...state, action.payload]
    default:
      return state
  } 


}

export default anecdoteReducer */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    addAnecdote(state,action){
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    }
  }
})

export const {vote,addAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer