import React from 'react';

class Stopwatch extends React.Component {
  constructor(){
    super();

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);


    this.state = {
      time: 0,
      isOn: false,
      start: 0,
      displayedtime: 0
    };
  }

  resetTimer() {
    this.setState({time: 0, start: 0, displayedtime: 0})
  }

  startTimer() {
    this.resetTimer()
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time,
      displayedtime: this.start
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start,
      displayedtime: Date.now() - this.state.start
    }), 1);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)

    // update our state
    // const solvetimes = {...this.props.solvetimes};
    // // add in our new fish
    // const timestamp = Date.now();
    // solvetimes[`singletime-${timestamp}`] = this.state.time;
    // // set state
    // this.setState({ solvetimes });
    this.props.addTime(this.state.time)

    this.setState({time: 0, start: 0})

  }

  render() {
    let start = (!this.state.isOn) ? <button onClick={this.startTimer}>start</button> : null
    let stop = (this.state.time === 0 || !this.state.isOn) ? null : <button onClick={this.stopTimer}>stop</button>
    return(
      <div>
        <h3>timer: {this.state.displayedtime}</h3>
        {start} 
        {stop}
      </div>
    )
  }
}


export default Stopwatch;