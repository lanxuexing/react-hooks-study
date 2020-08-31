import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function Demo() {
  let [color, setColor] = useState('red');

  useLayoutEffect(() => {
    alert('useLayoutEffect: ' + color)
  });

  useEffect(() => {
    console.log('当前的颜色useEffect', color);
  });

  return (
    <>
      <div id="myDiv" style={{backgroundColor: color}}>颜色</div>
      <button onClick={() => setColor('red')}>红</button>
      <button onClick={() => setColor('yellow')}>黄</button>
      <button onClick={() => setColor('blue')}>蓝</button>
    </>
  )
}

ReactDOM.render(
  // <React.StrictMode>
    <Demo/>
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
