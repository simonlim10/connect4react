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
      console.log("turning into red");
    } else if (this.state.gridFull[i][k] === "p-yellow") {
      gridFull[i][k] = "dropping-coin p-yellow";
      console.log("turning into yellow");
    }

    this.setState({ gridFull });

  }


  checkForWinner(winner) {
      console.log("zaw checkForWinner!!!");
      console.log("WINNERZ:" + winner);
    if (winner !== null && winner !== undefined) {
      console.log("ya won FOOL: " + winner);
      let winnerplayer = {...this.state.winnerplayer};
      winnerplayer = "showitwin";
      this.setState({ winnerplayer });
      return 1;
    } else if (winner === undefined) {
      console.log("CHECKING checkIfBoardFull from dropCoin > checkForWinner!!");
      this.checkIfBoardFull(winner);
      return;
    }
  }

  checkIfBoardFull(winner) {
    console.log("zaw checkingIfBoardFull!!!");
    let turnz = this.state.turns;
    console.log("zaw turnz:"+turnz);
    if (turnz > 41 && winner === undefined) {
      console.log("zaw NOBODY won!");
      let winnerplayer = {...this.state.winnerplayer};
      winnerplayer = "showit";
      this.setState({ winnerplayer });
      let nobody = {...this.state.nobody};
      nobody = "nobody ";
      this.setState({ nobody });
    }

  }

  checkIfMatch(i, k) {
    console.log("zazm MATCHING START");
    const gridFull = {...this.state.gridFull};
    let matchez = 0;
    let storei = i;
    let storek = k;
    let ik = this.state.gridFull[i][k];

    //checks horizontally for matches, based on where the coin was dropped
    for (var checki = 0; checki <= this.cols; checki++) {
      let cisk = this.state.gridFull
              && this.state.gridFull[checki]
              && this.state.gridFull[checki][storek];

      console.log("zazms checkk: " + checki + " || i: " + storei + " || k: " + storek + " || [checki+storek]: " + ik + " || cisk: " + cisk);
      if (cisk === ik) {

        matchez++;
        console.log("zazm matches++ so far: " + matchez);

        if (matchez >= 4) {
          console.log("zazm match FOUR: " + matchez + " || win:" + gridFull[i][k]);
          return gridFull[i][k];
        }

      } else {
        matchez = 0;
        console.log("zazm combo breaker: " + matchez);
      }
    }
    matchez = 0;
    console.log("zazm *END*- matches reset: " + matchez);
  }


  checkIfVertMatch(i, k) {
    console.log("zazv VERT MATCHING START");
    const gridFull = {...this.state.gridFull};
    let matchez = 0;

    //checks vertically for matches, based on where the coin was dropped
    for (var checkk = 0; checkk <= this.rows; checkk++) {
      console.log("zazv checkk: " + checkk + " || i: " + i + " || k: " + k + " || [i+checkk]: " + gridFull[i][checkk] + " || [i+k]: " + gridFull[i][k]);
      if (gridFull[i][checkk] === gridFull[i][k]) {

        matchez++;
        console.log("zazv matches++ so far: " + matchez);

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
    let matchez = 0;


    //checks diagonally what's the UPPER LEFT most value based on drop 
    for (var ULchecki = i, ULcheckk = k; ULchecki > 0 && ULcheckk > 0; ULcheckk--, ULchecki--) {
      console.log("zazd ULchecki: " + ULchecki + " || ULcheckk: " + ULcheckk);
    }
    console.log("zazdout ULchecki: " + ULchecki + " || ULcheckk: " + ULcheckk);

    //checks diagonally from UPPER LEFT to LOWER RIGHT 
    for (var ULcheckcol = ULchecki, ULcheckrow = ULcheckk; ULcheckcol < this.cols && ULcheckrow < this.rows; ULcheckrow++, ULcheckcol++) {
      console.log("zazd ULcheckcol: " + ULcheckcol + " || ULcheckrow: " + ULcheckrow);
      if (gridFull[ULcheckcol][ULcheckrow] === gridFull[i][k]) {

        matchez++;
        console.log("zazd matches++ so far: " + matchez);

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




    console.log("zazd *STARTING*- UR matches: " );

    //checks diagonally what's the UPPER LEFT most value based on drop 
    for (var URchecki = i, URcheckk = k; URchecki < (this.cols - 1) && URcheckk > 0; URchecki++, URcheckk--) {
      console.log("zazd URchecki: " + URchecki + " || URcheckk: " + URcheckk);
    }
    console.log("zazdout URchecki: " + URchecki + " || URcheckk: " + URcheckk);

    //checks diagonally from UPPER RIGHT to LOWER LEFT 
    for (var URcheckcol = URchecki, URcheckrow = URcheckk; URcheckcol >= 0 && URcheckrow < this.rows; URcheckcol--, URcheckrow++) {
      console.log("zazd URcheckcol: " + URcheckcol + " || URcheckrow: " + URcheckrow);
      if (gridFull[URcheckcol][URcheckrow] === gridFull[i][k]) {

        matchez++;
        console.log("zazd matches++ so far: " + matchez);

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

    console.log("i: " + i + " || j: " + j);
    const gridFull = {...this.state.gridFull};

    if (i >= this.cols || i < 0 || j >= this.rows || j < 0) console.log("test"); 

    for (var k = (this.rows - 1); k > -1; k--) {

      console.log("k: " + k);
      console.log("grdfl[ik]: " + gridFull[i][k]);

      if (gridFull[i][k] === "dropping-coin") { 
        gridFull[i][k] = this.whoseTurn();
        console.log("zaw new grdfl[ik]: " + gridFull[i][k]);
        console.log(this.state.gridFull);
        console.log('zaw returning'); 

        console.log("zaw new grdfl[ik]: " + gridFull[i][k]);
        this.setState({ gridFull });
        break;
      };
    };


    console.log("zaw prepping wherecoin");
    let wherecoini = i;
    let wherecoink = k;
    return [wherecoini, wherecoink];
  }


  dropCoin(i, j) {
    console.log("droppedCoin");

    const coinstopresult = this.whereCoinWillStop(i, j);
    if (coinstopresult === "stop") {
      console.log("stopping everything!!");
      return;
    }
    const coinstopi = coinstopresult[0]
    const coinstopk = coinstopresult[1]

    const matchresultd = this.checkIfDiagMatch(coinstopi, coinstopk);
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

    let whosdropping = this.state.turns % 2 === 0 ? "yellow's " : "red's ";

    let winningplayer = (this.state.turns % 2 === 0) ? "red " : "yellow ";
    winningplayer = (this.state.winnerplayer === "showitwin") ? winningplayer : "";
    winningplayer = (this.state.winnerplayer === "showit") ? this.state.nobody : winningplayer;

    return (
      <div className="connect-background">
        <div className={this.state.winnerplayer} id="winnercover">
        </div>

        <div className="whos-dropping">
          {whosdropping} turn!
        </div>

        <div className="connect-board">
        
          <div className={this.state.winnerplayer} id="winnercoverboard">
            <div className={this.state.winnerplayer} id="winnermodal">
              {winningplayer} won!
            </div>
          </div>

          <Column className="comp-column" onClick={this.dropCoin} col={0} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
          <Column className="comp-column" onClick={this.dropCoin} col={1} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
          <Column className="comp-column" onClick={this.dropCoin} col={2} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
          <Column className="comp-column" onClick={this.dropCoin} col={3} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
          <Column className="comp-column" onClick={this.dropCoin} col={4} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
          <Column className="comp-column" onClick={this.dropCoin} col={5} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>
          <Column className="comp-column" onClick={this.dropCoin} col={6} gridFull={this.state.gridFull} dropCoin={this.dropCoin} changeBoxColor={this.changeBoxColor} cols={this.cols} rows={this.rows}></Column>


        </div>  
      </div>
    )
  }
}


export default ConnectBoard;
