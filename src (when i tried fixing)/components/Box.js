import React from 'react';

class Box extends React.Component {
  // selectBox = () => {
  //   this.props.selectBox(this.props.row, this.props.col);
  // }

  constructor(){
    super();

    this.boxClick = this.boxClick.bind(this);
    //error note 12: forgot that state is used, you don't state variables 
    this.state = {
      boxClassCopy: "box"
    };
  }

  boxClick() {
    this.props.dropCoin(this.props.col, this.props.row);

    let colz = this.props.col;
    let rowz = this.props.row;

    // let boxClassCopy = {...this.state.boxClassCopy};

    // //error note 14: fukken put the class changer in here. so it doesn't update automattically
    // if (this.props.gridFull[i][k] === "p-red") {
    //   boxClassCopy = "box p-red";
    // } else if (this.props.gridFull[i][k] === "p-yellow") {
    //   boxClassCopy = "box p-yellow";
    // }

    // this.setState({ boxClassCopy });
  }


  render() {
    let colz = this.props.col;
    let rowz = this.props.row;

    console.log("colz: " + colz);
    console.log("rowz: " + rowz);

    console.log("Box.js-this.props.grd[ik]: " + this.props.gridFull[colz][rowz]);

    const cellstate = this.props.gridFull[colz][rowz];


    return (
      <div
        className={this.state.boxClassCopy}
        id={this.props.id}
        onClick={this.boxClick}>
        {colz}-{rowz}
        {console.log("cellstate:"+cellstate)}
        {cellstate}
        <br />
        <div className="dropping-coin" />
      </div>
    );
  }
}

export default Box;