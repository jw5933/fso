import { useState } from 'react'

const App = () => {
  const getRandom = (max) => Math.floor(Math.random()*max)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [most, setMost] = useState({votes: 0, index: 0})
  
  const castVote = ()=>{
    const arr = [...votes]
    arr[selected]++
    setVotes(arr);

    if (arr[selected] > most.votes){
      const newMost = {
        votes: arr[selected],
        index: selected
      }
      setMost(newMost)
    }
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick = {castVote}>vote</button>
        <button onClick = {() => setSelected(getRandom(anecdotes.length))}>next anecdote</button>
      </div>
      <h1>Most Voted Anecdote</h1>
      <MostVoted most = {most} anecdotes = {anecdotes}/>
    </div>
  )
}
const MostVoted = ({most, anecdotes}) => {
  //console.log("refresh", most.votes)
  return (
  <>
    <p>{anecdotes[most.index]} <br/> has {most.votes} votes</p>
  </>
  )
}

export default App