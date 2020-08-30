import React, { useState, useReducer, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let MyContext = React.createContext();
 
function Counter() { 
  // 以前的做法
  // let [state, setState] = useState(0);
  // return (
  //   <div>
  //     <MyContext.Consumer>
  //       {
  //         value => (
  //           <div>
  //             <p>{value.state.number}</p>
  //             <button onClick={()=> value.setState({ number: value.state.number + 1 })}>+</button>
  //           </div>
  //         )
  //       }
  //     </MyContext.Consumer>
  //   </div>
  // )

  // 现在的做法：Hooks ==> useContext
  let {state, setState} = useContext(MyContext);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={()=> setState({ number: state.number + 1 })}>+</button>
    </div>
  )
}

function Demo() {
  const [state, setState] = useState({ number: 0 });
  return (
    <MyContext.Provider value={{state, setState}}>
      <Counter/>
    </MyContext.Provider>
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
