import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 自定义hooks，以use开头，实现逻辑的封装
function useCounter() {
  let [number, setNumber] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNumber(x => x + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  });

  return number;
}

function Counter1() {
  let number = useCounter();

  return (
    <>
      <div>{ number }</div>
    </>
  )
}

function Counter2() {
  let number = useCounter();

  return (
    <>
      <div>{ number }</div>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Counter1/>
    <Counter2/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
