import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App.jsx';
import { GlobalStyle } from './utils/style/GlobalStyle.js';
import reportWebVitals from './utils/reportWebVitals.js';
import { UserDataProvider } from './utils/contexts/UserDataContext.js';

ReactDOM.render(
  <React.StrictMode>
    <UserDataProvider>
      <GlobalStyle />
      <App />
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
