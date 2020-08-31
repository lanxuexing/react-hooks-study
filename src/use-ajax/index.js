import React, { useReducer, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function useAjax(url) {
  let [offset, setOffset] = useState(0);
  let [data, setData] = useState([]);
  function loadMore() {
    fetch(`${url}?page=${offset}&count=10`)
      .then(response => response.json())
      .then(res => {
        console.log('得到： ', res);
        return res.result;
      })
      .then(pageData => {
        setData([...data, ...pageData]);
        setOffset(offset + pageData.length);
      })
  }
  useEffect(loadMore, []);
  return [data, loadMore];
}

function Demo() {
  const [users, loadMore] = useAjax('https://api.apiopen.top/getWangYiNews');

  if (users === null) {
    return <div>loading...</div>
  }

  return (
    <>
      <ul>
        {
          users.map((item, index) =>
            <li key={index}>
              {index + 1}: {item.title}
              <img src={item.image} alt="item.title"/>
            </li>)
        }
      </ul>
      <button onClick={loadMore}>load more</button>
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
