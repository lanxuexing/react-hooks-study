import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
 
let lastRef;
function Child1() {
  // 以前
  // let refObject = React.createRef(); // refObject = {current: 要引用的组件}
  // 现在：使用Hooks
  let refObject = useRef();

  console.log('lastRef === refObject', lastRef === refObject);
  lastRef = refObject;
  function getFocus() {
    refObject.current.focus();
  }
  return (
    <div>
      <input ref={refObject}></input>
      <button onClick={getFocus}>子-获得焦点</button>
    </div>
  )
}

// Function components cannot be given refs.Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
function Child2(props, ref) {
  let refObject = useRef();
  // 封装自己内部的方法，防止权限被暴露到外边
  useImperativeHandle(ref, () => ({
    focus() {
      refObject.current.focus();
    }
  }))
  return (
    <div>
      <input ref={refObject}></input>
    </div>
  )
}

let ForwardChild = React.forwardRef(Child2);
function Parent() {
  let [number, setNumber] = useState(0);
  let refObject = useRef();
  function getFocus() {
    refObject.current.focus();
  }
  return ( 
    <div>
      <Child1/>
      <button onClick={() => setNumber(x => x + 1)}>+</button>
      <ForwardChild ref={refObject}/>
      <button onClick={getFocus}>父-获得焦点</button>
    </div>
  )
}

ReactDOM.render(
  // <React.StrictMode>
    <Parent/>
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
