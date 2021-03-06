import React from 'react';
import Box from './Box';


class Column extends React.Component {

  render() {

    let rowsArr = [];

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
          grid={this.props.grid}
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