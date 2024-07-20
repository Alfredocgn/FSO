import { useState } from "react"


const Button = ({onClick,text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}



const App = () => {

  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)

  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    setBad(bad + 1)
  }

  const StatisticsLine = (props) => {
    return (
      <p>{props.text} {props.statistic}</p>
    )
  }
  const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad
    const average = (props.good - props.bad)/ all
    const positivePercentage = (props.good * 100)/all

    

    return(
      <div>
        {props.good === 0 && props.neutral === 0 && props.bad === 0 ? 'No feedback given' : (
          <>
            <StatisticsLine text='good' statistic={good} />
            <StatisticsLine text='bad' statistic={bad} />
            <StatisticsLine text='neutral' statistic={neutral} />
            <StatisticsLine text='all' statistic={all} />
            <StatisticsLine text='average' statistic={average} />
            <StatisticsLine text='positive' statistic={positivePercentage} />  
          </>

        )}
      </div>
    )

  }




  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text={'good'} />
      <Button onClick={handleClickNeutral} text={'neutral'} />
      <Button onClick={handleClickBad} text={'bad'} />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />


    </>

  )
}

export default App
