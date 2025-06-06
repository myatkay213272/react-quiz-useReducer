// App.js
import { useEffect, useReducer } from "react";
import Main from './Main';
import Header from "./Header";
import Loader from './Loader';
import Error from './Error';
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SEC_PER_QUESTION = 30

const initialState = {
  question: [],
  status: 'loading',
  index: 0,
  answer: null,
  points : 0,
  highscore : 0,
  secondRemaining : null
};


const reducer = (state, action) => {

  switch (action.type) {
    case 'dataReceived':
      return { ...state, question: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { 
        ...state,
        status: 'active',
        secondRemaining : state.question.length * SEC_PER_QUESTION
       };
   case 'newAnswer': {
      const currentQuestion = state.question[state.index]
      const selectedOption = currentQuestion.options[action.payload]
      const isCorrect = selectedOption === currentQuestion.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + currentQuestion.points : state.points
      };
    }
    case 'nextQuestion' :
      return {
        ...state,
        index : state.index + 1,
        answer : null
      }
    case 'finish' :
      return {
        ...state,
        status : 'finished',
        highscore : state.points > state.highscore 
          ? state.points 
          : state.highscore
      }
    case 'restart':
      return {
        ...initialState,
        question : state.question,
        status : 'ready'
      }
      // return {
      //   ...state,
      //   points : 0,
      //   highscore : 0,
      //   index :0,
      //   answer : null,
      //   status : 'ready'
      // }
    case 'tick' :
      return{
        ...state,
        secondRemaining : state.secondRemaining - 1,
        status : state.secondRemaining === 0 
          ? 'finished'
          : state.status
      }
    default:
      throw new Error('Action unknown');
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { question, status, index, answer,points,highscore ,secondRemaining} = state;
  const numQuestion = question.length 
  const maxPossiblePoints = question.reduce(
    (prev,cur)=>prev + cur.points
  ,0)

  useEffect(() => {
    fetch('http://localhost:8000/question')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="container py-5">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen 
            numQuestion={numQuestion} 
            dispatch={dispatch} />)}
        {status === 'active' && (
          <>
            <Progress 
              index={index} 
              numQuestion={numQuestion} 
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}/>
            <Question
              question={question[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer 
                dispatch={dispatch}
                secondRemaining={secondRemaining}
              />
              <NextButton 
              dispatch={dispatch} 
              answer={answer}
              index={index}
              numQuestion={numQuestion}/>
            </Footer>
          </>
        )}

         {status === 'finished' &&(
            <FinishScreen 
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
              />
          )}
      </Main>
    </div>
  );
};

export default App;
