import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TranslationProvider from './i18n/translation-provider';
import DataProvider from './api/data-provider';

import '@reach/tooltip/styles.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
