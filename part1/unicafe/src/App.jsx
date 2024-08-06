import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ name, total, end, totalOpinions }) => {
  if (totalOpinions == 0) {
    return;
  }

  return (
    <p>
      {name} {total} {end}
    </p>
  );
};

const StatisticControl = ({ totalOpinions }) => {
  if (totalOpinions == 0) {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalOpinions = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <StatisticControl totalOpinions={totalOpinions} />
      <StatisticLine
        name="good"
        total={good}
        end=""
        totalOpinions={totalOpinions}
      />
      <StatisticLine
        name="neutral"
        total={neutral}
        end=""
        totalOpinions={totalOpinions}
      />
      <StatisticLine
        name="bad"
        total={bad}
        end=""
        totalOpinions={totalOpinions}
      />
      <StatisticLine
        name="all"
        total={good + neutral + bad}
        end=""
        totalOpinions={totalOpinions}
      />
      <StatisticLine
        name="average"
        total={(good * 1 + neutral * 0 + bad * -1) / totalOpinions}
        end=""
        totalOpinions={totalOpinions}
      />
      <StatisticLine
        name="positive"
        total={(good / totalOpinions) * 100}
        end="%"
        totalOpinions={totalOpinions}
      />
    </div>
  );
};

export default App;
