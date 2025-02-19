import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";
import Quiz from "./Components/Quiz.jsx";
import Scoreboard from "./Components/Scoreboard.jsx";
import History from "./Components/History.jsx";

const App = () => {
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      {quizFinished ? (
        <Scoreboard
          score={score}
          totalQuestions={10}
          onRestart={() => setQuizFinished(false)}
        />
      ) : (
        <Quiz
          onFinish={(s) => {
            setScore(s);
            setQuizFinished(true);
          }}
        />
      )}
      <History />
    </div>
  );
};

export default App;
