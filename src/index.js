import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const height = { 'minHeight':'700px', 'maxHeight': '5000px' }

ReactDOM.render(
  <React.StrictMode>
    <App style={height}/>
  </React.StrictMode>,
  document.getElementById('root')
);

