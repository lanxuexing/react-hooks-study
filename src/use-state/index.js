import React, { useState, useCallback, memo, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Counter1 extends React.Component {
  state = { number: 0 }
  render() {
      return (
          <div>
              <p>{this.state.number}</p>
              <button onClick={() => this.setState({ number: this.state.number + 1 })}>+</button>
          </div>
      )
  }
}

function Counter2() {
  let [state, setState] = useState({ number: 0 });
  function alertNumber() {
    setTimeout(() => {
        alert(state.number);
    }, 3000);
  }
  return (
      <div>
          <p>{state.number}</p>
          <button onClick={() => setState({ number: state.number + 1 })}>+</button>
          <button onClick={alertNumber}>alertNumber</button>
      </div>
  )
}

// 函数式更新
function Counter3() {
  let [state, setState] = useState({ number: 0 });
  function lazy() {
    setTimeout(() => {
        setState({ number: state.number + 1 })
    }, 3000);
  }
  function lazyFunction() {
    setTimeout(() => {
        setState(state => ({ number: state.number + 1 }))
    }, 3000);
  }
  return (
      <div>
          <p>{state.number}</p>
          <button onClick={() => setState({ number: state.number + 1 })}>+</button>
          <button onClick={lazy}>lazy</button>
          <button onClick={lazyFunction}>lazyFunction</button>
      </div>
  )
}

// 惰性初始state
function Counter4() {
  let [state, setState] = useState(function () {
    console.log('初始化...')
    return { number: 0, name: '计数器' }
  });
  return (
    <div>
        <p>{state.name}：{state.number}</p>
        <button onClick={() => setState({ number: state.number + 1 })}>+</button>
        <button onClick={() => setState({...state, number: state.number + 1 })}>+</button>
    </div>
  )
};

// 性能优化
function Counter5() {
  let [state, setState] = useState(function () {
    return { number: 0, name: '计数器' }
  });
  console.log('性能优化')
  return (
    <div>
        <p>{state.name}：{state.number}</p>
        <button onClick={() => setState({...state, number: state.number + 1 })}>+</button>
        <button onClick={() => setState(state)}>+</button>
    </div>
  )
};

// 减少渲染次数
let lastAddClick;
let lastChangeName;
function Counter6() {
  let [number, setNumber] = useState(0);
  let [name, setName] = useState('名字');
  // 会在每次渲染的时候都会生成一个新的函数
  // const addClick = () => setNumber(number + 1);
  // 只有在依赖的变量发生变化的时候才会重新生成
  const addClick = useCallback(() => setNumber(number + 1), [number]);
  console.log('numnber: ', lastAddClick === addClick);
  lastAddClick = addClick;
  const changeName = useCallback(() => setName(new Date().toString()), [name]);
  console.log('name: ', lastChangeName === changeName);
  lastChangeName = changeName;
  return (
    <div>
        <p>{name}：{number}</p>
        <button onClick={addClick}>+</button>
        <button onClick={changeName}>+</button>
    </div>
  ) 
};

function Child1(props) {
  console.log('render Child');
  return (
    <button onClick={props.addClick}>{props.data.number}</button>
  )
}

// 让函数组件拥有记忆功能，只有当组件的属性发生变更的时候才会刷新，否则不更新
Child1 = memo(Child1);
let lastAddClick1;
let lastData1;
function Parent1() {
  let [ number, setNumber] = useState(0);
  let [ name, setName] = useState('名字');
  // useCallback第一个参数deps，表示此函数缓存依赖的变量，如果变量变了，会重新生成函数
  const addClick = useCallback(() => setNumber(x => x + 1), [number]);
  console.log('lastAddClick1 === addClick', lastAddClick1 === addClick);
  lastAddClick1 = addClick;
  // 缓存
  const data = useMemo(() => ({ number }), [number]);
  console.log('lastData1 === data', lastData1 === data);
  lastData1 = data;
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e. target. value)}/>
      <Child1 addClick={addClick} data={data}/>
    </div>
  )
}
 
ReactDOM.render(
  // <React.StrictMode>
    <Parent1 />
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
