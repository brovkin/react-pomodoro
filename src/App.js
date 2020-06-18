import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);
    this.startInterval = this.startInterval.bind(this);
    this.stopInterval = this.stopInterval.bind(this);
  }

  componentDidMount() {

  }

  startInterval() {
    this.interval = setInterval(() => {
      if (this.props.seconds === 0) {
        this.props.start();
        this.props.subMinute();
      } else {
        this.props.start();
      }
    }, 1000)
  }

  stopInterval() {
    console.log(this.interval);
    this.props.stop();
    clearInterval(this.interval);
  }

  fixZero(value) {
    if (value.toString().length === 1) {
      return '0' + value;
    }

    return value;
  }

  render() {
    console.log('TIME', this.props.time);

    return (
        <div>

          <h1>Time: {`${this.fixZero(this.props.minutes)}:${this.fixZero(this.props.seconds)}`}</h1>
          <h1>Minutes: {this.props.minutes}</h1>
          <h1>Seconds: {this.props.seconds}</h1>
          <hr/>
          <div>

            <button onClick={this.startInterval}>Start</button>
            <button onClick={this.stopInterval}>Stop</button>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
    minutes: state.minutes,
    seconds: state.seconds
  }
};

const mapDispatchToProps = dispatch => {
  return {
    start: () => dispatch({type: 'START'}),
    subMinute: () => dispatch({type: 'SUB_MINUTE'}),
    stop: () => dispatch({type: 'STOP'}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
