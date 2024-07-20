import { useState } from 'react'


const ShowAnecdote = ({anecdote,votes,title}) => {

  return(
    <>
    <h1>{title}</h1>
    <h3>
      {anecdote}
    </h3>
    <h3>has {votes} votes</h3>   
    </>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]





  const [selected, setSelected] = useState(0)

  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))


  
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)

  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1;
    setVotes(newVotes)

  }


  const maxValue = Math.max(...votes)
  const indexMaxValue = votes.indexOf(maxValue)


  return (
    <div>
      <ShowAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} title='Anecdote of the day'/>
      <button onClick={handleClick}>Next</button>
      <button onClick={handleVote}>Vote</button>
      <ShowAnecdote anecdote={anecdotes[indexMaxValue]} title='Anecdote with most values' votes={votes[indexMaxValue]} />

    </div>
  )
}

export default App