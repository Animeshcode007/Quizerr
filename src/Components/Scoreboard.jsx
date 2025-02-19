const Scoreboard = ({ score, totalQuestions, onRestart }) => {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold">Quiz Completed!</h2>
        <p className="text-lg">
          You scored {score} out of {totalQuestions}
        </p>
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={onRestart}
        >
          Try Again
        </button>
      </div>
    );
  };
  
  export default Scoreboard;
  