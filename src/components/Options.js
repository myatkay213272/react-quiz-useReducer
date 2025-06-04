const Options = ({ question, dispatch, answer }) => {
  if (!question || !Array.isArray(question.options)) return null;

  const isAnswered = answer !== null;

  return (
    <div>
      {question.options.map((option, index) => {
        console.log(option,index,answer,question.correctOption)

        const isCorrect = option === question.correctOption
        const isSelected = index === answer

        let btnClass = 'btn d-block w-100 text-start mb-2 ';

        if(!isAnswered){
          btnClass += 'btn-outline-primary'
        }else if(isCorrect){
          btnClass += 'btn-success'
        }else if(isSelected && !isCorrect){
           btnClass += 'btn-danger';
        }else {
          btnClass += 'btn-outline-secondary'; 
        }
      
        let icon = ''
        if(isAnswered){
           if (isCorrect) icon = ' ✔️';
          else if (isSelected && !isCorrect) icon = ' ❌'; 
        }

        return (
          <button
            key={index}
            onClick={() => dispatch({ type: 'newAnswer', payload: index })}
            disabled={isAnswered}
            className={btnClass}
          >
            {option} {icon}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
