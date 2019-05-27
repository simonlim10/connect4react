import React from 'react';
import Column from './Column';
import Fishcall from './Fishcall';
import base from '../base';

//fish
import sampleFishes from '../sample-fishes';

class ConnectBoard extends React.Component {

  constructor() {
    super();

    this.changeBoxColor = this.changeBoxColor.bind(this);
    this.dropCoin = this.dropCoin.bind(this);
    this.whoseTurn = this.whoseTurn.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
    this.checkIfMatch = this.checkIfMatch.bind(this);
    this.checkIfVertMatch = this.checkIfVertMatch.bind(this);
    this.checkIfDiagMatch = this.checkIfDiagMatch.bind(this);
    this.whereCoinWillStop = this.whereCoinWillStop.bind(this);

    //fish
    // this.loadSamples = this.loadSamples.bind(this);

    //error note 10: mistakenly put cols = 7 and rows = 6

    this.cols = 8;
    this.rows = 7;

    this.state = {
      gridFull: Array(this.cols).fill().map(() => Array(this.rows).fill("box")),
      // whereCoinStopped: null,
      // fishes: {},
      turns: 0,
      // matches: 0,
      winnerplayer: "",
      winner: null
    };
  }

  //fish

  // loadSamples() {
  componentWillMount() {
    // this.setState({
    //   fishes: sampleFishes
    // });
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
      console.log("turning into red");
    } else if (this.state.gridFull[i][k] === "p-yellow") {
      gridFull[i][k] = "box p-yellow";
      console.log("turning into yellow");
    }

    this.setState({ gridFull });

  }


  checkForWinner(winner) {
      console.log("zaw checkForWinner!!!");
    if (winner !== null && winner !== undefined) {
      console.log("ya won FOOL: " + winner);
      let winnerplayer = {...this.state.winnerplayer};
      winnerplayer = "showit";
      this.setState({ winnerplayer });
    }
    if (this.state.turns > 41) {
      console.log("zaw NOBODY won!");
      let winnerplayer = {...this.state.winnerplayer};
      winnerplayer = "showit";
      this.setState({ winnerplayer });
    }

  }

  checkIfMatch(i, k) {
    console.log("zazm MATCHING START");
    const gridFull = {...this.state.gridFull};
    let winner = "";
    let matchez = 0;
    // let checki = i;
    // let checkk = k;

    //checks horizontally from 0 to this.rows
    for (var checki = 0; checki <= this.cols; checki++) {
      // console.log("zazm checki: " + checki + " || i: " + i + " || k: " + k + " || [checki+k]: " + gridFull[checki][k] + " || [i+k]: " + gridFull[i][k]);
      if (this.state.gridFull[checki][k] === this.state.gridFull[i][k]) {
        // let newmatches = this.state.matches + 1;
        // this.setState({
        //   matches: newmatches
        // })
        // this.setState({ matches });
        // console.log("zazm matches++ so far: " + this.state.matches);
        // let matches = {...this.state.matches};
        // matches++;
        // this.setState(matches);

        // matches++;
        // this.setState({ matches });

        // this.setState({ matches: this.state.matches + 1 })

        // this.setState((prevState, state) => ({
        //   matches: prevState.matches + 1
        // }));

        matchez++;

        console.log("zazm matches++ so far: " + matchez);

        //error note 16: got damn state won't update properly. so gotta use the same old variable for now. ask why this is happening later on
        if (matchez >= 4) {
          console.log("zazm match FOUR: " + matchez + " || win:" + gridFull[i][k]);
          return gridFull[i][k];
        }

      } else {
        // this.setState({
        //   matches: 0
        // })

        // let matches = {...this.state.matches};
        // matches = 0;
        // this.setState({ matches });

        // this.setState({ matches: 0 })

        // this.setState((prevState, state) => ({
        //   matches: 0
        // }));

        matchez = 0;

        console.log("zazm combo breaker: " + matchez);

      }
    }

    // let matches = {...this.state.matches};
    // matches = 0;
    // this.setState({ matches });

    // matches = matches + 1;
    // this.setState({ matches });

    // this.setState((prevState, state) => ({
    //   matches: 0
    // }));
    matchez = 0;

    console.log("zazm *END*- matches reset: " + matchez);


    // gridFull[i][k] = this.whoseTurn();
    // this.setState({ gridFull });

  }


  checkIfVertMatch(i, k) {
    console.log("zazv VERT MATCHING START");
    const gridFull = {...this.state.gridFull};
    let winner = "";
    let matchez = 0;

    //checks vertically from 0 to this.rows
    for (var checkk = 0; checkk <= this.rows; checkk++) {
      console.log("zazv checkk: " + checkk + " || i: " + i + " || k: " + k + " || [i+checkk]: " + gridFull[i][checkk] + " || [i+k]: " + gridFull[i][k]);
      if (gridFull[i][checkk] === gridFull[i][k]) {

        matchez++;
        console.log("zazv matches++ so far: " + matchez);

        //error note 16: got damn state won't update properly. so gotta use the same old variable for now. ask why this is happening later on
        if (matchez >= 4) {
          console.log("zazv match FOUR: " + matchez + " || win:" + gridFull[i][k]);
          return gridFull[i][k];
        }

      } else {

        matchez = 0;
        console.log("zazv combo breaker: " + matchez);

      }
    }
    matchez = 0;
    console.log("zazv *END*- matches reset: " + matchez);

  }


  checkIfDiagMatch(i, k) {
    console.log("zazd DIAGONAL MATCHING START");
    const gridFull = {...this.state.gridFull};
    let winner = "";
    let matchez = 0;


    //checks diagonally from 0 to this.rows
    for (var ULchecki = i, ULcheckk = k; ULchecki > 0 && ULcheckk > 0; ULcheckk--, ULchecki--) {
      console.log("zazd ULchecki: " + ULchecki + " || ULcheckk: " + ULcheckk);
    }
    console.log("zazdout ULchecki: " + ULchecki + " || ULcheckk: " + ULcheckk);

    //checks diagonally from 0 to this.rows
    for (var ULchecki = i, ULcheckk = k; ULchecki < this.cols && ULcheckk < this.rows; ULcheckk++, ULchecki++) {
      console.log("zazd ULchecki: " + ULchecki + " || ULcheckk: " + ULcheckk);
      if (gridFull[ULchecki][ULcheckk] === gridFull[i][k]) {

        matchez++;
        console.log("zazd matches++ so far: " + matchez);

        //error note 16: got damn state won't update properly. so gotta use the same old variable for now. ask why this is happening later on
        if (matchez >= 4) {
          console.log("zazd match FOUR: " + matchez + " || win:" + gridFull[i][k]);
          return gridFull[i][k];
        }

      } else {

        matchez = 0;
        console.log("zazd combo breaker: " + matchez);

      }
    }
    matchez = 0;
    console.log("zazd *END*- matches reset: " + matchez);




    //checks diagonally from 0 to this.rows
    for (var URchecki = i, URcheckk = k; URchecki < this.cols && URcheckk > 0; URchecki++, URcheckk--) {
      console.log("zazd URchecki: " + URchecki + " || URcheckk: " + URcheckk);
    }
    console.log("zazdout URchecki: " + URchecki + " || URcheckk: " + URcheckk);

    //checks diagonally from 0 to this.rows
    for (var URchecki = i, URcheckk = k; URchecki > 0 && URcheckk < this.rows; URchecki--, URcheckk++) {
      console.log("zazd URchecki: " + URchecki + " || URcheckk: " + URcheckk);
      if (gridFull[URchecki][URcheckk] === gridFull[i][k]) {

        matchez++;
        console.log("zazd matches++ so far: " + matchez);

        //error note 16: got damn state won't update properly. so gotta use the same old variable for now. ask why this is happening later on
        if (matchez >= 4) {
          console.log("zazd match FOUR: " + matchez + " || win:" + gridFull[i][k]);
          return gridFull[i][k];
        }

      } else {

        matchez = 0;
        console.log("zazd combo breaker: " + matchez);

      }
    }
    matchez = 0;
    console.log("zazd *END*- matches reset: " + matchez);

  }

  whoseTurn() {

    // let turns = {...this.state.turns};
    // console.log("turnsz: " + turns);
    // turns[0] = turns[0] + 1;
    // this.setState({ turns });

    this.setState(prevState => {
       return {turns: prevState.turns + 1}
    })

    console.log("turns: " + this.state.turns);
    console.log("turns%2: " + (this.state.turns % 2));

    if (this.state.turns % 2 === 1) {
      return "box p-red";
    };
    return "box p-yellow";

  }

  whereCoinWillStop(i, j) {

    console.log("i: " + i + " || j: " + j);
    const gridFull = {...this.state.gridFull};

    //error note 11: this.rows was 8, which is past the array that started at 0. the actual 8th row should be 7 

    if (i >= this.cols || i < 0 || j >= this.rows || j < 0) console.log("titi"); 
    // return "stop";

    for (var k = (this.rows - 1); k > -1; k--) {
      let newvalue = 1;
      console.log("k: " + k);
      console.log("grdfl[ik]: " + gridFull[i][k]);

      if (gridFull[i][k] == "box") { 
        gridFull[i][k] = this.whoseTurn();
        console.log("zaw new grdfl[ik]: " + gridFull[i][k]);
        console.log(this.state.gridFull);
        console.log('zaw returning'); 
        let wherecoini = i;
        let wherecoink = k;
        console.log("zaw new grdfl[ik]: " + gridFull[i][k]);
        this.setState({ gridFull });
        break;
      };
      // newvalue = !gridFull[i][k] ? 1 : null;
      // gridFull[i][k] = newvalue;
    };


    console.log("zaw prepping wherecoin");
    let wherecoini = i;
    let wherecoink = k;
    console.log("zaw wherecoini: " + wherecoini);
    console.log("zaw wherecoink: " + wherecoink);
    return [wherecoini, wherecoink];
  }


  dropCoin(i, j) {
    console.log("droppedCoin");
    //whereCoinWillStop()
    const coinstopresult = this.whereCoinWillStop(i, j);
    if (coinstopresult === "stop") {
      console.log("stopping everything!!");
      return;
    }
    const coinstopi = coinstopresult[0]
    const coinstopk = coinstopresult[1]
    // console.log("zaz wherecoini: " + wherecoini);
    // console.log("zaz wherecoink: " + wherecoink);

    console.log("zazq coinstopi: " + coinstopi);
    console.log("zazq coinstopk: " + coinstopk);
    console.log("zazq GOT wherecoin");

    //checkIfMatch()
    console.log("checkIfMatch");

    console.log("CHECKING Horiz***");

    const matchresultd = this.checkIfDiagMatch(coinstopi, coinstopk);
    this.checkForWinner(matchresultd);

    const matchresultv = this.checkIfVertMatch(coinstopi, coinstopk);
    this.checkForWinner(matchresultv);

    const matchresult = this.checkIfMatch(coinstopi, coinstopk);
    this.checkForWinner(matchresult);

    // console.log("zazq matchresult[0]: " + matchresult);
    // console.log("zazq matchresult[0]: " + matchresult[0]);
    // console.log("zazq matchresult[1]: " + matchresult[1]);
    // const matchresulti = matchresult[0]
    // const matchresultk = matchresult[1]
    // console.log("zazq matchresulti: " + matchresulti);
    // console.log("zazq matchresultk: " + matchresultk);
    // console.log(`Quotient = ${quotient}`) // Quotient = 3
    // console.log(`Remainder = ${remainder}`)

  }


  render() {

    console.log(this.state.gridFull);
    let winningplayer = this.state.turns % 2 === 0 ? "red " : "yellow ";

    const boardFull = (this.state.turns % 2 > 41) ? "heh" : null;
    
    return (
      <div className="connect-board">

        <div className={this.state.winnerplayer} id="winnercover">
          <div className={this.state.winnerplayer} id="winnermodal">
            {boardFull ? "nobody " : null} {winningplayer} won!
          </div>
        </div>

        <Column className="comp-column" onClick={this.dropCoin} col={0} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={1} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={2} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={3} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={4} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={5} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={6} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
        <Column className="comp-column" onClick={this.dropCoin} col={7} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>

      </div>
    )
  }
}


export default ConnectBoard;
