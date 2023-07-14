import { useState } from 'react'


const StatisticLine = (props) => {
  return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
  )
}

const Statistic = (props) => {

  if (props.all === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.percentage + " %"} />
      </tbody>
    </table>
  )
}

const Title = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Title text="statistics" />
      <Statistic good={good} neutral={neutral} bad={bad} all={good + neutral + bad} average={(good - bad) / (good + neutral + bad)} percentage={good / (good + neutral + bad) * 100} />
    </div>
  )
}

export default App