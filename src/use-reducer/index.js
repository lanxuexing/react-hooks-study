import React, { useReducer, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let initialState = { number: 0 };
const INCRMENT = 'INCRMENT';
const DECRMENT = 'DECRMEN;T';

function reducer(state, action) {
  switch (action.type) {
    case INCRMENT:
      return { number: state.number + 1 };
    case DECRMENT:
      return { number: state.number - 1 };
    default:
      return state;
  }
}

// 自定义useState
function useState(initialState) {
  const reducer = useCallback((state, action) => action);
  let [state, dispatch] = useReducer(reducer, initialState);
  function mSetState(payload) {
    dispatch(payload);
  }
  return [state, mSetState];
}
 
function Counter() { 
  // let [state, dispatch] = useReducer(reducer, initialState);
  // 使用我们自定义的useState
  let [state, setState] = useState(initialState);
  return (
      <div>
          <p>{state.number}</p>
          {/* <button onClick={() => dispatch({ type: INCRMENT })}>+</button>
          <button onClick={() => dispatch({ type: DECRMENT })}>-</button> */}
          <button onClick={() => setState({ number: state.number + 1 })}>+</button>
          <button onClick={() => setState({ number: state.number - 1 })}>-</button>
      </div>
  )
}
 
ReactDOM.render(
  // <React.StrictMode>
    <Counter />
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
