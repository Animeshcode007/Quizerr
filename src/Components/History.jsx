import { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/indexedDB";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getQuizHistory().then(setHistory);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Quiz History</h2>
      {history.length === 0 ? (
        <p>No attempts yet.</p>
      ) : (
        <ul className="mt-2">
          {history.map((attempt, index) => (
            <li key={index} className="border p-2 my-2">
              Score: {attempt.score}/{attempt.totalQuestions} -{" "}
              {new Date(attempt.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
