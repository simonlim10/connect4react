import React from 'react';
import Column from './Column';
import Fishcall from './Fishcall';
import base from '../base';

//fish
import sampleFishes from '../sample-fishes';

class ConnectBoard extends React.Component {

  constructor() {
    super();

    this.dropCoin = this.dropCoin.bind(this);
    this.checkIfMatch = this.checkIfMatch.bind(this);
    this.whereCoinWillStop = this.whereCoinWillStop.bind(this);

    //fish
    this.loadSamples = this.loadSamples.bind(this);

    //error note 10: mistakenly put cols = 7 and rows = 6

    this.cols = 8;
    this.rows = 7;

    this.state = {
      gridFull: Array(this.cols).fill().map(() => Array(this.rows).fill("box")),
      whereCoinStopped: null,
      fishes: {}
    };
  }

  //fish
  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  // componentWillMount() {
  //   // this runs right before the <App> is rendered
  //   this.ref = base.syncState(`connect4/grid-full`, {
  //     context: this,
  //     state: 'gridFull'
  //   });

  //   // // check if there is any order in localStorage
  //   // const localStorageRef = localStorage.getItem(`session-${this.props.params.userId}`);

  //   // if(localStorageRef) {
  //   //   // update our App component's order state
  //   //   this.setState({
  //   //     solvetimes: JSON.parse(localStorageRef)
  //   //   });
  //   // }

  // }

  // componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem(`session-${this.props.params.userId}`, JSON.stringify(nextState.solvetimes));
  // }

  addTime(singletime) {
    // update our state
    const solvetimes = {...this.state.solvetimes};
    // add in our new fish
    const timestamp = Date.now();
    solvetimes[`singletime-${timestamp}`] = singletime;
    // set state
    this.setState({ solvetimes });
  }

  // startTime(event) {
  //   //reset time first to 0
  //   //start time
  // }

  // stopTime(event) {
  //   event.preventDefault();

  //   //stop the time

  //   console.log('GOnna make some fish! 🎣');
  //   const singletime = {
  //     time: this.time.value,
  //     status: this.status.value,
  //   }
  //   this.props.addTime(singletime);
  // }

  removeTime(key) {
    const solvetimes = {...this.state.solvetimes};
    solvetimes[key] = null;
    this.setState({ solvetimes });
  }

  // calculateMean() {
  //   const solvetimes = {...this.state.solvetimes};
  //   const average = solvetimes.reduce() / (solvetimes.length - 1);
  //   return average;
  // }

  // calculateAverageTwelvez() {
  //   const solvetimes = {...this.state.solvetimes};
  //   const solves = Object.values(solvetimes);
  //   const add = (a, b) => a + b;
  //   // use reduce to sum our array
  //   const sum = solves.reduce(add);
  //   // debugger;
  //   return (sum / 12);
  // }

  changeBoxColor(i,k) {

    let gridFull = {...this.state.gridFull};

    //error note 14: fukken put the class changer in here. so it doesn't update automattically
    if (this.state.gridFull[i][k] === "p-red") {
      gridFull[i][k] = "box p-red";
    } else if (this.state.gridFull[i][k] === "p-yellow") {
      gridFull[i][k] = "box p-yellow";
    }

    this.setState({ gridFull });

  }

  checkIfMatch(i, k) {
    for (var l = (this.rows - 1); l > -1; l--) {
    }
  }

  whoseTurn() {

  }

  whereCoinWillStop(i, j) {

    console.log("i: " + i + " || j: " + j);
    const gridFull = {...this.state.gridFull};


    //error note 11: this.rows was 8, which is past the array that started at 0. the actual 8th row should be 7 

    for (var k = (this.rows - 1); k > -1; k--) {
      let newvalue = 1;
      console.log("k: " + k);
      console.log("grdfl[ik]: " + gridFull[i][k]);

      if (gridFull[i][k] == "box") { 
        gridFull[i][k] = "p-red";
        console.log("new grdfl[ik]: " + gridFull[i][k]);
        console.log(this.state.gridFull);
        console.log('returning'); return k;
      };
      // newvalue = !gridFull[i][k] ? 1 : null;
      // gridFull[i][k] = newvalue;
    };

    this.setState({ gridFull });
    return i, k;
  }


  dropCoin(i, j) {
    this.whereCoinWillStop(i, j);
    // got i and k
    // this.checkIfMatch(i, k);

    let whereCoinStopped = {...this.state.whereCoinStopped};
    whereCoinStopped = {i}
    console.log("stopped: " + whereCoinStopped);
    this.setState({ whereCoinStopped });
  }


  render() {

    console.log(this.state.gridFull);

    return (
      <div className="connect-board">

        <Column className="comp-column" onClick={this.dropCoin} col={0} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={1} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={2} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={3} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={5} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={6} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={7} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>

      </div>
    )
  }
}


export default ConnectBoard;
