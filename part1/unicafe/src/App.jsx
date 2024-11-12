import { useState } from "react";

const StatisticLine = ({ text, score }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{score}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} score={good} />
        <StatisticLine text={"neutral"} score={neutral} />
        <StatisticLine text={"bad"} score={bad} />
        <StatisticLine text={"all"} score={total} />
        <StatisticLine text={"average"} score={average} />
        <StatisticLine text={"positive"} score={positive + "%"} />
      </tbody>
    </table>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    console.log("good has been clicked");
    setGood((prev) => prev + 1);
  };
  const handleNeutral = () => {
    console.log("neutral has been clicked");
    let count = neutral + 1;
    setNeutral(count);
  };
  const handleBad = () => {
    console.log("bad has been clicked");
    let count = bad + 1;
    setBad(count);
  };

  const total = good + neutral + bad;
  const totalScores = good * 1 + neutral * 0 + bad * -1;
  const average = total === 0 ? 0 : totalScores / total;
  const positive = total === 0 ? 0 : ((good / total) * 100).toFixed(8);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGood} text={"good"} />
        <Button handleClick={handleNeutral} text={"neutral"} />
        <Button handleClick={handleBad} text={"bad"} />
      </div>
      <h1>Statistics</h1>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default App;
