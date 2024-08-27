import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */

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
  initialState: [],
  reducers: {
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    },
    updateAnecdote(state,action){
      const id = action.payload.id
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
      if (anecdoteToUpdate) {
        anecdoteToUpdate.votes += 1
      }
    }
  }
})

export const {vote,appendAnecdote,setAnecdotes,updateAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.getById(id)
    const updatedAnecdote = {...anecdote,votes:anecdote.votes + 1}
    await anecdoteService.update(id,updatedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer