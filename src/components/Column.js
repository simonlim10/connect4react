import React from 'react';
import Box from './Box';


class Column extends React.Component {

  render() {

    let rowsArr = [];

    // const { gridFull } = this.props;

    for (var j = 0; j < this.props.rows; j++) {
      let i = this.props.col;
      let boxId = i + "_" + j;

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