import Options from "./Options";

const Question = ({ question }) => {
  return (
    <div className="mb-4">
      <h4 className="mb-3">{question.question}</h4>

      <div className="d-grid gap-2">
        {question.options.map(option => (
          <Options key={option} option={option} />
        ))}
      </div>
    </div>
  );
};

export default Question;
