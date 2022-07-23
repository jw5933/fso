import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [feedback, setFeedback] = useState(false);
  return(
    <div>
      <h1>Give Feedback</h1>
      <Button func = {setGood} val = {good} str = "good" boolFunc = {setFeedback} />
      <Button func = {setNeutral} val = {neutral} str = "neutral" boolFunc = {setFeedback} />
      <Button func = {setBad} val = {bad} str = "bad" boolFunc = {setFeedback} />
      
      <h1>Statistics</h1>
      <Statistics props = {[good, neutral, bad]} feedback = {feedback}/>
    </div>
  )
}

const Button = ({func, val, str, boolFunc}) => {
  const f = () =>{
    func(val+1)
    boolFunc(true)
  }
  return (
    <button onClick = {f}>{str}</button>
  )
}

const Statistics = ({props, feedback}) => {
  const arr = props
  const Sum = (props) => props.reduce((partialSum, a) => partialSum + a, 0)

  const Avg = (props) => {
    const sum = props[0]*1 + props[2]*-1;
    return sum/Sum(props);
  }
  if (feedback){
    return(
      <table>
        <tbody>
          <Value str = "good" value = {arr[0]}/>
          <Value str = "neutral" value = {arr[1]}/>
          <Value str = "bad" value = {arr[2]}/>
          <Value str = "all" value = {Sum(arr)}/>
          <Value str = "avg" value = {(Avg(arr) || 0).toFixed(2)}/>
          <Value str = "positive" value = {(arr[0]/Sum(arr)*100 || 0).toFixed(2)} extra = "%"/>
        </tbody>
        
      </table>
      )
  }
  else return (
    <>
      <p>No feedback given</p>
    </>
    
  )
  
}

const Value = ({str, value, extra}) =>
  <tr>
    <td>{str}</td>
    <td>{value}{extra}</td>
  </tr>

export default App;
