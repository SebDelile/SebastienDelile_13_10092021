import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './app/App.jsx';
import { GlobalStyle } from './utils/style/GlobalStyle.js';
import reportWebVitals from './utils/reportWebVitals.js';
import { store } from './app/store.js';

/**
 * the root of the app, linked to the #root div in index.html.
 * Implement the store provider (redux), the global style elements and the App component.
 * @namespace _index
 */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//-----namespace initializers
/**
 * all util elements.
 * @namespace utils
 */
/**
 * all style elements.
 * @namespace style
 */
