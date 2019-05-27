import React from 'react';

class App extends React.Component {
  render() {
    return (
      <form className="store-selector">
      <h2>Pick a Store</h2>
      <input type="text" required placeholder="Store Name"/>
      <button>Visit Store +</button>
      </form>
    )
  }
}

export default App;
