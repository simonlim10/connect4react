import React from 'react';

class Box extends React.Component {

  constructor(props){
    super(props);

    this.boxClick = this.boxClick.bind(this);
  }

  boxClick() {
    this.props.dropCoin(this.props.col, this.props.row);
  }

  render() {
    let currentColumn = this.props.col;
    let currentRow = this.props.row;

    const cellstate = this.props.grid[currentColumn][currentRow];

    return (
      <div
        className="box"
        id={this.props.id}
        onClick={this.boxClick}>
        <div className={cellstate} />
      </div>
    );
  }
}

export default Box;