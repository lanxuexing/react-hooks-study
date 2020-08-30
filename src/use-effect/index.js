import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
 
// 以前的做法
class Counter extends React.Component { 
  state = { number: 0 };

  componentDidMount() {
    document.title = this.state.number;
  }

  componentDidUpdate() {
    document.title = this.state.number;
  }

  render() { 
    return (
        <div>
            <p>{this.state.number}</p>
            <button onClick={()=> this.setState({ number: this.state.number + 1 })}>+</button>
        </div>
    )
  }
}

// 现在的做法：Hooks ==> useEffect
function Counter2() {
  let [state, setState] = useState({ number: 0 });

  // useEffect里的函数会在组件挂载完成后或者组件更新完成之后进行调用
  // 如果没有给第二个参数，那么函数会在每次执行渲染后调用
  useEffect(() => {
    console.log('useEffect');
    document.title = state.number;
  })

  return (
    <div>
        <p>{state.number}</p>
        <button onClick={()=> setState({ number: state.number + 1 })}>+</button>
    </div>
  )
}

function Counter3() {
  let [state, setState] = useState({ number: 0 });

  // useEffect里的函数会在组件挂载完成后或者组件更新完成之后进行调用
  // 如果没有给第二个参数，那么函数会在每次执行渲染后调用
  // Warning: Can't perform a React state update on an unmounted component. 
  // This is a no-opr but it indicates a memory leak in your application.
  // Tofix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  useEffect(() => {
    console.log('开启一个定时器');
    let timer = setInterval(() => {
      setState(x => ({number: x.number + 1}))
    }, 1000);

    // useEffect会返回一个清理函数，当组件即将要卸载的时候执行这个清理函数
    return () => {
      console.log('销毁一个定时器')
      clearInterval(timer);
    }
  }, [])

  return (
    <div>
        <p>{state.number}</p>
        <button onClick={()=> setState({ number: state.number + 1 })}>+</button>
    </div>
  )
}

function Demo() {
  let [visible, setVisible] = useState(true);
  return (
    <div>
      <button onClick={() => setVisible(false)}>hide</button>
      {visible && <Counter3/>}
    </div>
  )
}

ReactDOM.render(
  // <React.StrictMode>
    <Counter2/>
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
