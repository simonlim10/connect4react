import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class TimesList extends React.Component {
  constructor() {
    super();
    this.renderSolvetimes = this.renderSolvetimes.bind(this);
    this.removeFromSolvetimes = this.removeFromSolvetimes.bind(this);
    this.calculateAverageTwelve = this.calculateAverageTwelve.bind(this);


  }

  removeFromSolvetimes(key) {
    // update our state
    const solvetimes = {...this.props.solvetimes};
    // null the value of the time
    this.props.solvetimes[key] = null;
    // set state
    this.setState({ solvetimes });
  }

  renderSolvetimes(key) {
    const singletime = this.props.solvetimes[key];
    const removeButton = <button onClick={() => this.props.removeTime(key)}>&times;</button>

    return (
      <li key={key}>
        <CSSTransitionGroup
          component="span"
          className="count"
          transitionName="count"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
        >
          <span>
            time {singletime} {removeButton}
          </span>
        </CSSTransitionGroup>
      </li>
    )
  }


  calculateAverageTwelve() {
    const solvetimes = {...this.state.solvetimes};
    const solves = Object.values(solvetimes);
    const add = (a, b) => a + b;
    // use reduce to sum our array
    const sum = solves.reduce(add);
    // debugger;
    return (sum / 12);
  }

  render() {
    const solveIds = Object.keys(this.props.solvetimes);
    const totalTime = solveIds.reduce((prevTotal, key) => {
      const singletime = this.props.solvetimes[key];
      // const count = this.props.order[key];
      const isAvailable = singletime;
      if(isAvailable) {
        return prevTotal + (singletime || 0);
      }
    }, 0);
    const sessionMean = totalTime / Object.keys(this.props.solvetimes).length;
    return (
      <div className="order-wrap">
        <h2>Your Times</h2>

        <ul>
          {solveIds.map(this.renderSolvetimes)}
          <li className="total">
            <strong>
              Average of 12: {this.calculateAverageTwelve}
              <br />
              sessionMean: {sessionMean}
            </strong>
          </li>
        </ul>

      </div>
    )
  }
}

TimesList.propTypes = {
  solvetimes: React.PropTypes.object.isRequired,
  // removeFromSolvetimes: React.PropTypes.func.isRequired,
};

export default TimesList;
