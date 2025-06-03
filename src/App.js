import { useEffect, useReducer } from "react";
import Main from './Main';
import Header from "./Header";
import Loader from './Loader';
import Error from './Error';
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  question: [],
  status: 'loading'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, question: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {...state,status : 'active'}
    default:
      throw new Error('Action unknown');
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { question, status } = state;
  const numQuestion = question.length;

  useEffect(() => {
    fetch('http://localhost:8000/question')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="container py-5">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen 
                                  numQuestion={numQuestion} 
                                  dispatch={dispatch}
                                />}
        {status === 'active' && <Question/>}
      </Main>
    </div>
  );
};

export default App;
