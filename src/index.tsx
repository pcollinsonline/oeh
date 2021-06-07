import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import TranslationProvider from './i18n/TranslationProvider';

ReactDOM.render(
  <React.StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
