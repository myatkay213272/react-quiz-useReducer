const NextButton = ({ dispatch, answer,index,numQuestion }) => {
  if (answer === null) return null;

  if(index < numQuestion -1) return (
    <button 
      className="btn btn-primary mt-3" 
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  );

  if(index === numQuestion -1) return (
    <button 
      className="btn btn-primary mt-3" 
      onClick={() => dispatch({ type: 'finish'})}
    >
     Finish
    </button>
  );
};

export default NextButton;
