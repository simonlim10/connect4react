import React from 'react';
import Fish from './Fish';

class Box extends React.Component {
  // selectBox = () => {
  //   this.props.selectBox(this.props.row, this.props.col);
  // }

  // constructor(){
  //   super();
  // }



  render() {

    return (
      <ul className="list-of-fishes">
        {
          Object
            .keys(this.props.fishes)
            .map(key => <Fish key={key} index={key} details={this.props.fishes[key]}/>)
        }
      </ul>
    );
  }
}

export default Box;