import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';

import ConnectBoard from './components/ConnectBoard';
import NotFound from './components/NotFound';


const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={ConnectBoard} />
        <Miss pattern="/" component={NotFound} />
      </div>
    </BrowserRouter>
  )
}


render(<Root/>, document.querySelector('#main'));
