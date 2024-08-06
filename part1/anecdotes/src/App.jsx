import { useState } from "react";

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Anecdote = ({ text }) => {
  return <p>{text}</p>;
};

const Votes = ({ votes }) => {
  return <p>has {votes} votes</p>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const nextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const setVotes = () => {
    const pointsCopy = { ...points };
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
  };

  const mostVotes = (points) => {
    let best = 0;
    let pointsCount = 0;
    for (const [pointsKey, pointsValue] of Object.entries(points)) {
      if (pointsValue > pointsCount) {
        pointsCount = pointsValue;
        best = pointsKey;
      }
    }

    return best;
  };

  const mostVotated = mostVotes(points);

  return (
    <div>
      <Heading text={"Anecdote of the day"} />
      <Anecdote text={anecdotes[selected]} />
      <Votes votes={points[selected]} />
      <Button handleClick={setVotes} text={"vote"} />
      <Button handleClick={nextAnecdote} text={"next anecdote"} />
      <Heading text={"Anecdote with most votes"} />
      <Anecdote text={anecdotes[mostVotated]} />
      <Votes votes={points[mostVotated]} />
    </div>
  );
};

export default App;
