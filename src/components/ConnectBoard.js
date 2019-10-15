import React from 'react';
import Column from './Column';

class ConnectBoard extends React.Component {

  constructor() {
    super();

    this.changeBoxColor = this.changeBoxColor.bind(this);
    this.dropCoin = this.dropCoin.bind(this);
    this.whoseTurn = this.whoseTurn.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
    this.checkIfBoardFull = this.checkIfBoardFull.bind(this);
    this.checkIfMatch = this.checkIfMatch.bind(this);
    this.checkIfVertMatch = this.checkIfVertMatch.bind(this);
    this.checkIfDiagMatch = this.checkIfDiagMatch.bind(this);
    this.whereCoinWillStop = this.whereCoinWillStop.bind(this);

    this.cols = 7;
    this.rows = 6;

    this.state = {
      gridFull: Array(this.cols).fill().map(() => Array(this.rows).fill("dropping-coin")),
      turns: 1,
      winnerplayer: "",
      nobody: null,
      winner: null
    };

  }

  changeBoxColor(i,k) {

    let gridFull = {...this.state.gridFull};

    if (this.state.gridFull[i][k] === "p-red") {
      gridFull[i][k] = "dropping-coin p-red";
    } else if (this.state.gridFull[i][k] === "p-yellow") {
      gridFull[i][k] = "dropping-coin p-yellow";
    }
    this.setState({ gridFull });
  }

  checkForWinner(winner) {
    if (winner !== null && winner !== undefined) {
      let winnerplayer = {...this.state.winnerplayer};
      winnerplayer = "showitwin";
      this.setState({ winnerplayer });
      return 1;
    } else if (winner === undefined) {
      this.checkIfBoardFull(winner);
      return;
    }
  }

  checkIfBoardFull(winner) {
    let turns = this.state.turns;
    if (turns > 41 && winner === undefined) {
      let winnerplayer = {...this.state.winnerplayer};
      winnerplayer = "showit";
      this.setState({ winnerplayer });
      let nobody = {...this.state.nobody};
      nobody = "nobody ";
      this.setState({ nobody });
    }
  }

  checkIfMatch(i, k) {
    const gridFull = {...this.state.gridFull};
    let matchCount = 0;
    let storei = i;
    let storek = k;
    let ik = this.state.gridFull[i][k];

    //checks horizontally for matches, based on where the coin was dropped
    for (var checki = 0; checki <= this.cols; checki++) {
      let cisk = this.state.gridFull
              && this.state.gridFull[checki]
              && this.state.gridFull[checki][storek];
      console.log("cisk: " + cisk);
      if (cisk === ik) {
        matchCount++;
        if (matchCount >= 4) {
          return gridFull[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;
  }

  checkIfVertMatch(i, k) {
    const gridFull = {...this.state.gridFull};
    let matchCount = 0;

    //checks vertically for matches, based on where the coin was dropped
    for (var checkk = 0; checkk <= this.rows; checkk++) {
      if (gridFull[i][checkk] === gridFull[i][k]) {
        matchCount++;
        if (matchCount >= 4) {
          return gridFull[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;
  }

  checkIfDiagMatch(i, k) {
    const gridFull = {...this.state.gridFull};
    let matchCount = 0;

    //checks diagonally what's the UPPER LEFT most value based on drop 
    for (var ULchecki = i, ULcheckk = k; ULchecki > 0 && ULcheckk > 0; ULcheckk--, ULchecki--) {
    }

    //checks diagonally from UPPER LEFT to LOWER RIGHT 
    for (var ULcheckcol = ULchecki, ULcheckrow = ULcheckk; ULcheckcol < this.cols && ULcheckrow < this.rows; ULcheckrow++, ULcheckcol++) {
      if (gridFull[ULcheckcol][ULcheckrow] === gridFull[i][k]) {
        matchCount++;
        if (matchCount >= 4) {
          return gridFull[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;

    //checks diagonally what's the UPPER LEFT most value based on drop 
    for (var URchecki = i, URcheckk = k; URchecki < (this.cols - 1) && URcheckk > 0; URchecki++, URcheckk--) {
    }

    //checks diagonally from UPPER RIGHT to LOWER LEFT 
    for (var URcheckcol = URchecki, URcheckrow = URcheckk; URcheckcol >= 0 && URcheckrow < this.rows; URcheckcol--, URcheckrow++) {
      if (gridFull[URcheckcol][URcheckrow] === gridFull[i][k]) {
        matchCount++;
        if (matchCount >= 4) {
          return gridFull[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;
  }

  whoseTurn() {

    this.setState(prevState => {
       return {turns: prevState.turns + 1}
    })

    console.log("turns: " + this.state.turns);
    console.log("turns%2: " + (this.state.turns % 2));

    if (this.state.turns % 2 === 1) {
      return "dropping-coin p-red";
    };
    return "dropping-coin p-yellow";

  }

  whereCoinWillStop(i, j) {

    const gridFull = {...this.state.gridFull};

    for (var k = (this.rows - 1); k > -1; k--) {

      if (gridFull[i][k] === "dropping-coin") { 
        gridFull[i][k] = this.whoseTurn();

        this.setState({ gridFull });
        break;
      };
    };

    let wherecoini = i;
    let wherecoink = k;
    return [i, k];
  }


  dropCoin(i, j) {
    const coinstopresult = this.whereCoinWillStop(i, j);
    if (coinstopresult === "stop") {
      console.log("stopping everything!!");
      return;
    }
    const coinstopi = coinstopresult[0]
    const coinstopk = coinstopresult[1]

    const matchresultd = this.checkIfDiagMatch(coinstopresult[0], coinstopresult[1]);
    var diagresult = this.checkForWinner(matchresultd);
    console.log("zar diagresult before chkforwin: " + diagresult);
    
    if (diagresult === undefined) {
      const matchresultv = this.checkIfVertMatch(coinstopi, coinstopk);
      var vertresult = this.checkForWinner(matchresultv);
      console.log("zar vertresult before chkforwin: " + vertresult);
    }
    
    //error note 19: don't blame javascript all the time, sometimes its your logic that's missing a step
    if (diagresult === undefined && vertresult === undefined) {
      const matchresult = this.checkIfMatch(coinstopi, coinstopk);
      var horizresult = this.checkForWinner(matchresult);
      console.log("zar horizresult: " + horizresult);
    }
    //error note 18: missed important conditionals that reset the value that i needed. console log helps you trace the wrong logic/flow.
    console.log("zar end checks----");
  }


  render() {

    let whoseTurn = this.state.turns % 2 === 0 ? "yellow's " : "red's ";

    let winningPlayer = (this.state.turns % 2 === 0) ? "red " : "yellow ";
    winningPlayer = (this.state.winnerplayer === "showitwin") ? winningPlayer : "";
    winningPlayer = (this.state.winnerplayer === "showit") ? this.state.nobody : winningPlayer;

    return (
      <div className="connect-background">
        <div className={this.state.winnerplayer} id="winnercover">
        </div>

        <div className="whos-dropping">
          {whoseTurn} turn!
        </div>

        <div className="connect-board">
        
          <div className={this.state.winnerplayer} id="winnercoverboard">
            <div className={this.state.winnerplayer} id="winnermodal">
              {winningPlayer} won!
            </div>
          </div>

          {[...Array(this.cols)].map((e, i) => <Column className="comp-column" onClick={this.dropCoin} col={i} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>)}

        </div>  

      </div>
    )
  }
}


export default ConnectBoard;
