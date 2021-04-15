import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './0415';

ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );


