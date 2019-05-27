import React from 'react';

class Fish extends React.Component {
  render() {
    const { details, index } = this.props;
    // const isAvailable = details.status === 'available';
    // const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <h3 className="fish-name">
          {details.time}
          <span className="price"></span>
        </h3>
        <p>{details.status}</p>
        <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

// Fish.propTypes = {
//   details: React.PropTypes.object.isRequired,
//   index: React.PropTypes.string.isRequired,
//   addToOrder: React.PropTypes.func.isRequired
// };

export default Time;

