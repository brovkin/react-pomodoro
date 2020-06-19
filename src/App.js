import React, { Component } from 'react';
import Timer from './components/Timer/Timer';
import Settings from "./components/Settings/Settings";
import { connect } from 'react-redux';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.startInterval = this.startInterval.bind(this);
    this.stopInterval = this.stopInterval.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.continueTimer = this.continueTimer.bind(this);
  }

  startTimer() {
      const settings = {
        work: this.props.workMinutes,
        rest: this.props.restMinutes,
      };

      this.props.save(settings);

    this.startInterval()
  }

  continueTimer() {
    this.props.continue();
    this.startInterval();
  }

  pauseTimer() {
    clearInterval(this.interval);
    console.log('PAUSE', this.props.settings);
    this.props.pause(this.props.settings);
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

  render() {
    console.log('APP', this.props);

    return (
        <div className="app__wrapper col-md-6">
          <h1 className="app__title">Pomodoro</h1>
          <Timer/>
          <Settings/>
          <hr/>
          <div className="col-md-3 d-flex justify-content-between">
            {this.props.isWork
                ? <button className="btn btn-lg btn-warning" onClick={this.pauseTimer}>Пауза</button>
                : this.props.saveSettings
                    ? <button className="btn btn-lg btn-primary" onClick={this.continueTimer}>Продолжить</button>
                    : <button className="btn btn-lg btn-primary" onClick={this.startTimer}>Старт</button>
            }

            <button className="btn btn-lg btn-outline-danger" onClick={this.stopInterval}>Стоп</button>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    workMinutes: state.workMinutes,
    restMinutes: state.restMinutes,
    isWork: state.isWork,
    isPause: state.isPause,
    saveSettings: state.saveSettings,
    settings: state.settings,
    seconds: state.seconds
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    start: () => dispatch({type: 'START'}),
    subMinute: () => dispatch({type: 'SUB_MINUTE'}),
    stop: () => dispatch({type: 'STOP'}),
    pause: (settings) => dispatch({type: 'PAUSE', payload: settings}),
    continue: () => dispatch({type: 'CONTINUE'}),
    save: (value) => dispatch({type: 'SAVE_SETTINGS', payload: value})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
