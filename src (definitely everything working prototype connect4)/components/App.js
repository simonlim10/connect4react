import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './TimerPage';

class App extends React.Component {
  render() {
    return (
      <Menu/>
      <Order/>
      <FishForm/>
    )
  }
}

export default App;
