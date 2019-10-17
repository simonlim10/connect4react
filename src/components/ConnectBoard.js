import React from 'react';
import Column from './Column';

class ConnectBoard extends React.Component {

  constructor() {
    super();

    this.dropCoin = this.dropCoin.bind(this);
    this.whoseTurn = this.whoseTurn.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
    this.checkIfBoardFull = this.checkIfBoardFull.bind(this);
    this.checkForHorizontalMatch = this.checkForHorizontalMatch.bind(this);
    this.checkForVerticalMatch = this.checkForVerticalMatch.bind(this);
    this.checkForDiagonalMatch = this.checkForDiagonalMatch.bind(this);
    this.whereCoinWillStop = this.whereCoinWillStop.bind(this);

    this.cols = 7;
    this.rows = 6;

    this.state = {
      grid: Array(this.cols).fill().map(() => Array(this.rows).fill("dropping-coin")),
      turns: 1,
      winnerplayer: "",
      nobody: null,
      winner: null
    };

  }
  // variable legend:
  // i = which column we're dropping the coin in, j = which row was clicked in that column, k = 

  checkForWinner(winner) {
    if (winner !== null && winner !== undefined) {
      let winnerplayer = {...this.state.winnerplayer};
      winnerplayer = "show-winner-modal";
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
      winnerplayer = "show-winner";
      this.setState({ winnerplayer });
      let nobody = {...this.state.nobody};
      nobody = "nobody ";
      this.setState({ nobody });
    }
  }

  checkForHorizontalMatch(i, k) {
    const grid = {...this.state.grid};
    let matchCount = 0;

    //checks horizontally for matches from LEFT to RIGHT, from where the coin landed
    for (let checki = 0; checki <= this.cols; checki++) {

      if (grid[checki][k] === grid[i][k]) {
        matchCount++;
        if (matchCount >= 4) {
          return grid[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;
  }

  checkForVerticalMatch(i, k) {
    const grid = {...this.state.grid};
    let matchCount = 0;

    //checks vertically for matches, based on where the coin landed
    for (let checkk = 0; checkk <= this.rows; checkk++) {
      if (grid[i][checkk] === grid[i][k]) {
        matchCount++;
        if (matchCount >= 4) {
          return grid[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;
  }

  checkForDiagonalMatch(i, k) {
    const grid = {...this.state.grid};
    let matchCount = 0;
    let ULchecki = i;
    let ULcheckk = k;
    let URchecki = i;
    let URcheckk = k;

    // starting from where the coin dropped, this sets the variables first to the UPPER LEFT most cell until it hits the edge
    for (; ULchecki > 0 && ULcheckk > 0; ULcheckk--, ULchecki--) {
    }

    //now starts check diagonally from UPPER LEFT to LOWER RIGHT 
    for (let ULcheckcol = ULchecki, ULcheckrow = ULcheckk; ULcheckcol < this.cols && ULcheckrow < this.rows; ULcheckrow++, ULcheckcol++) {
      if (grid[ULcheckcol][ULcheckrow] === grid[i][k]) {
        matchCount++;
        if (matchCount >= 4) {
          return grid[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;

    // starting from where the coin dropped, this sets the variables first to the UPPER RIGHT most cell until it hits the edge
    for (; URchecki < (this.cols - 1) && URcheckk > 0; URchecki++, URcheckk--) {
    }

    // now starts check diagonally from UPPER RIGHT to LOWER LEFT 
    for (let URcheckcol = URchecki, URcheckrow = URcheckk; URcheckcol >= 0 && URcheckrow < this.rows; URcheckcol--, URcheckrow++) {
      if (grid[URcheckcol][URcheckrow] === grid[i][k]) {
        matchCount++;
        if (matchCount >= 4) {
          return grid[i][k];
        }
      } else {
        matchCount = 0;
      }
    }
    matchCount = 0;
  }

  whoseTurn() {
    //increment this.state.turns by +1
    this.setState(prevState => {
      return {turns: prevState.turns + 1}
    })

    // checks whose turn is it, based on if it's an odd or even count from the total turns taken in the game
    if (this.state.turns % 2 === 1) {
      return "dropping-coin p-red";
    };
    return "dropping-coin p-yellow";

  }

  whereCoinWillStop(i, j) {

    const grid = {...this.state.grid};
    let k = (this.rows - 1);

    // checks the clicked column from the bottom most item, going to top for a blank cell where the coin should stop
    for (; k > -1; k--) {

      if (grid[i][k] === "dropping-coin") { 
        grid[i][k] = this.whoseTurn();

        this.setState({ grid });
        break;
      };
    };
    return [i, k];
  }


  dropCoin(i, j) {
    const coinstopresult = this.whereCoinWillStop(i, j);

    //check for matches for all directions, based on where the new coin had just dropped
    let diagresult = this.checkForWinner(this.checkForDiagonalMatch(coinstopresult[0], coinstopresult[1]));
    let vertresult = undefined;

    if (diagresult === undefined) {
      vertresult = this.checkForWinner(this.checkForVerticalMatch(coinstopresult[0], coinstopresult[1]));
    }
    
    if (diagresult === undefined && vertresult === undefined) {
      this.checkForWinner(this.checkForHorizontalMatch(coinstopresult[0], coinstopresult[1]));
    }

  }


  render() {

    let whoseTurn = this.state.turns % 2 === 0 ? "yellow's " : "red's ";

    let winningPlayer = (this.state.turns % 2 === 0) ? "red " : "yellow ";
    winningPlayer = (this.state.winnerplayer === "show-winner-modal") ? winningPlayer : "";
    winningPlayer = (this.state.winnerplayer === "show-winner") ? this.state.nobody : winningPlayer;

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

          {[...Array(this.cols)].map((e, i) => <Column className="comp-column" 
                                                        onClick={this.dropCoin} 
                                                        col={i} 
                                                        grid={this.state.grid} 
                                                        dropCoin={this.dropCoin} 
                                                        cols={this.cols} 
                                                        rows={this.rows}
                                                />
            )}

        </div>  

      </div>
    )
  }
}


export default ConnectBoard;
