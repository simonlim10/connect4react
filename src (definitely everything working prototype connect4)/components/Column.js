import React from 'react';
import Box from './Box';


class Column extends React.Component {
  // constructor(){
  //   super();

  //   this.startTimer = this.startTimer.bind(this);
  //   this.stopTimer = this.stopTimer.bind(this);
  //   this.resetTimer = this.resetTimer.bind(this);

  // }

  // startTimer() {
  //   this.resetTimer()
  //   this.setState({
  //     time: this.state.time
  //   })
  // }

  // selectBox = () => {
  //   this.props.selectBox(this.props.col, this.props.row);
  // }

  render() {

    let rowsArr = [];

    const { gridFull } = this.props;
    // const gridFull = {...this.props.gridFull};


    for (var j = 0; j < this.props.rows; j++) {
      let i = this.props.col;
      let boxId = i + "_" + j;
      // console.log("CALOG:" + this.props.col)
      rowsArr.push(
        <Box
          key={boxId}
          col={this.props.col}
          row={j}
          selectBox={this.props.selectBox}
          dropCoin={this.props.dropCoin}
          gridFull={this.props.gridFull}
          changeBoxColor={this.props.changeBoxColor}
        />
      );
    }
    

    return (
      <div className="connect-column">
        {rowsArr}
      </div>
    );

  }

}

export default Column;