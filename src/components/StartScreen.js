const StartScreen = ({ numQuestion,dispatch }) => {
  return (
    <div className="text-center">
      <h3>Welcome to the React Quiz!</h3>
      <p>{numQuestion} questions to test your mastery.</p>
      <button 
        className="btn btn-primary mt-3"
        onClick={()=>dispatch({type : 'start'})}
      >Start Quiz</button>
    </div>
  );
};

export default StartScreen;
