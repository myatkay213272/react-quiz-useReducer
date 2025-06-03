import Options from "./Options";

const Question = ({ question, dispatch, answer }) => {
  return (
    <div className="mb-4">
      <h4 className="mb-3">{question.question}</h4>
      <div className="d-grid gap-2">
        <Options 
          question={question}
          dispatch={dispatch}
          answer={answer}
        />
      </div>
    </div>
  );
};

export default Question;
