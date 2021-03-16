import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import DataLayer from './context/DataLayer'
import {reducer,initialState } from './context/reducer'
ReactDOM.render(
  <DataLayer reducer={reducer} initialState={initialState}>
    <App />
  </DataLayer>,
  document.getElementById('root')
);

