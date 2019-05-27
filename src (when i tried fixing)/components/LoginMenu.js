import React from 'react';
import { getFunName } from '../helpers';

class LoginMenu extends React.Component {

  goToPage(event) {
    event.preventDefault();
    console.log('You Changed the URL');
    // first grab the text from the box
    const userId = this.nameInput.value;
    const pageDestination = this.storeInput.value;
    console.log(`Going to ${pageDestination}`)
    // second we're going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/${userId}/${pageDestination}`);
  }

  render() {
    return (
      <div className="container-center">
      <form className="store-selector">
        <h2>TimerPlus</h2>
        <h4>Please type your name:</h4>
        <input type="text" required placeholder="User" defaultValue={getFunName()} ref={(input) => { this.nameInput = input}} />
      </form>

        <button type="button"
        ref={(input) => { this.storeInput = input}}
        onClick={(e) => {this.storeInput.value = "timer";
        this.goToPage(e);}} >Timer →</button>

        <button type="button"
        onClick={(e) => {this.storeInput.value = "stats";
        this.goToPage(e);}} >Stats →</button>

        <button type="button"
        onClick={(e) => {this.storeInput.value = "rankings";
        this.goToPage(e);}} >Rankings →</button>

      </div>
    )
  }
}

LoginMenu.contextTypes = {
  router: React.PropTypes.object
}

export default LoginMenu;
