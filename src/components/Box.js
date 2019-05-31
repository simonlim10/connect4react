import React from 'react';

class Box extends React.Component {

  constructor(props){
    super(props);

    this.boxClick = this.boxClick.bind(this);

    this.state = {
      boxClassCopy: "box"
    };  
  }

  componentWillMount() {
    let colz = this.props.col;
    let rowz = this.props.row;

    this.props.changeBoxColor(colz,rowz); 
  }

  boxClick() {
    this.props.dropCoin(this.props.col, this.props.row);
  }

  render() {
    let colz = this.props.col;
    let rowz = this.props.row;

    const cellstate = this.props.gridFull[colz][rowz];

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