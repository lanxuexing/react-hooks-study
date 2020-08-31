import React, { useReducer, useCallback, useEffect } from 'react';
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

// 实现redux-logger，在每次状态变更后打印新的状态值
function useLogger(reducer, initialState) {
  let [state, dispatch] = useReducer(reducer, initialState);
  function loggerDispatch(action) {
    console.log('old state: ', state);
    dispatch(action);
  }
  useEffect(() => {
    console.log('new state: ', state);
  });
  return [state, loggerDispatch];
}

// 实现中间件Thunk
function useThunk(reducer, initialState) {
  let [state, dispatch] = useReducer(reducer, initialState);
  function thunkDispatch(action) {
    if (typeof action === 'function') {
      action(thunkDispatch, () => state);
    } else {
      dispatch(action);
    }
  }
  return [state, thunkDispatch];
}

// 实现中间件Promise
function usePromise(reducer, initialState) {
  let [state, dispatch] = useReducer(reducer, initialState);
  function promiseDispatch(action) {
    if (typeof action.then === 'function') {
      action.then(promiseDispatch);
    } else {
      dispatch(action);
    }
  }
  return [state, promiseDispatch];
}

function Counter() { 
  let [state, dispatch] = usePromise(reducer, initialState);

  return (
      <div> 
          <p>{state.number}</p>
          <button onClick={() => dispatch({ type: INCRMENT })}>+</button>
          <button onClick={() => dispatch({ type: DECRMENT })}>-</button>
          <button onClick={() => dispatch(function (dispatch, getState) {
            dispatch({type: 'INCRMENT'})
          })}>Thunk+</button>
          <button onClick={() => dispatch(new Promise(function (resolve) {
            setTimeout(() => {
              resolve({type: 'INCRMENT'})
            }, 1000);
          }))}>Promise+</button>
      </div>
  )
}

ReactDOM.render(
  // <React.StrictMode>
    <Counter/>
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
