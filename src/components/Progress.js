const Progress = ({ numQuestion, index, points, maxPossiblePoints ,answer }) => {
  return (
    <header className="d-flex align-items-center p-3 mb-4 bg-light border rounded">
      
      <div className="flex-grow-1 me-3">
        <progress 
          className="w-100" 
          max={numQuestion} 
          value={index + Number(answer !== null)} 
        />
      </div>

      <p className="mb-0 me-3">
        Question <strong>{index + 1}</strong> / {numQuestion}
      </p>

      <p className="mb-0">
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
      
    </header>
  );
};

export default Progress;
