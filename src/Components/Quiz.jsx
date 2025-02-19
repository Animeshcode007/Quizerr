import { useState, useEffect } from "react";
import quizData from "../data/quizData";
import { saveQuizAttempt } from "../utils/indexedDB";

const Quiz = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const currentQuiz = quizData[currentQuestion];

  const handleMCQAnswer = (answer) => {
    if (isAnswered) return; // Prevent multiple clicks
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQuiz.answer) {
      setScore(score + 1);
    }

    setTimeout(() => handleNext(), 1000);
  };

  const handleIntegerSubmit = () => {
    if (isAnswered || userInput.trim() === "") return;
    setIsAnswered(true);

    const userValue = parseInt(userInput, 10);
    if (!isNaN(userValue) && userValue === currentQuiz.answer) {
      setScore(score + 1);
    }

    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setUserInput("");
      setTimer(30);
      setIsAnswered(false);
    } else {
      saveQuizAttempt(score, quizData.length);
      onFinish(score, quizData.length);
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-4xl font-bold">{currentQuiz.question}</h2>

      {currentQuiz.type === "MCQ" ? (
        <div className="mt-4">
          {currentQuiz.options.map((option, index) => (
            <button
              key={index}
              className={`block w-full p-2 my-2 border rounded-md 
                ${
                  selectedAnswer === option
                    ? option === currentQuiz.answer
                      ? "bg-green-400"
                      : "bg-red-400"
                    : "bg-gray-200"
                }`}
              onClick={() => handleMCQAnswer(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <input
            type="number"
            className="p-2 border rounded-md w-2/3"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isAnswered}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            onClick={handleIntegerSubmit}
          >
            Submit
          </button>
        </div>
      )}

      <p className="mt-4 text-lg">Time Left: {timer}s</p>
    </div>
  );
};

export default Quiz;
