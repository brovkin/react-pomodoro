import React, { Component } from 'react';
import Timer from './components/Timer/Timer';
import Settings from "./components/Settings/Settings";
import Tomato from './components/Tomato/Tomato';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.startInterval = this.startInterval.bind(this);
    this.stopInterval = this.stopInterval.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.startRest = this.startRest.bind(this);
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
    if (this.props.isRest) {
      this.startRest();
    } else {
      this.startInterval();
    }

  }

  pauseTimer() {
    clearInterval(this.interval);
    this.props.pause({settings: this.props.settings, status: this.props.isRest});
  }

  startInterval() {
    this.interval = setInterval(() => {

      if (this.props.seconds === 0) {

        if (this.props.workMinutes === 0) {
          this.props.changeRest();
          clearInterval(this.interval);
          this.props.addTomato();
          this.startRest();
        } else {
          this.props.start();
          this.props.subMinute();
        }
      } else {
        this.props.start();
      }

    }, 1000)
  }

  startRest() {
    this.interval = setInterval(() => {
      if (this.props.seconds === 0) {

        if (this.props.restMinutes === 0) {
          this.props.changeWork();
          clearInterval(this.interval);
          alert(`Цикл завершен. Ваши томаты: ${this.props.tomato}`)
          // this.startInterval();
        } else {
          this.props.start();
          this.props.subMinuteRest();
        }
      } else {
        this.props.start();
      }

    }, 1000)
  }

  stopInterval() {
    this.props.stop();
    clearInterval(this.interval);
  }

  render() {

    return (
        <div className="app__wrapper col-md-6">
          <h1 className="app__title">Pomodoro
            <Tomato tomato={this.props.tomato}/>
          </h1>
          <Timer/>
          <Settings/>
          <hr/>
          <div className="col-md-12 d-flex justify-content-between">
            {this.props.isWork
                ? <button className="btn btn-lg btn-warning" onClick={this.pauseTimer}>Пауза</button>
                : this.props.saveSettings
                    ? <button className="btn btn-lg btn-primary" onClick={this.continueTimer}>Продолжить</button>
                    : <button className="btn btn-lg btn-primary" onClick={this.startTimer}>Старт</button>
            }

            <button className="btn btn-lg btn-outline-danger" onClick={this.stopInterval}>Сброс</button>
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
    isRest: state.isRest,
    saveSettings: state.saveSettings,
    settings: state.settings,
    seconds: state.seconds,
    tomato: state.tomato
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    start: () => dispatch({type: 'START'}),
    subMinute: () => dispatch({type: 'SUB_MINUTE'}),
    subMinuteRest: () => dispatch({type: 'SUB_MINUTE_REST'}),
    stop: () => dispatch({type: 'STOP'}),
    pause: (settings) => dispatch({type: 'PAUSE', payload: settings}),
    continue: () => dispatch({type: 'CONTINUE'}),
    save: (value) => dispatch({type: 'SAVE_SETTINGS', payload: value}),
    changeRest: () => dispatch({type: 'CHANGE_REST'}),
    changeWork: () => dispatch({type: 'CHANGE_WORK'}),
    addTomato: () => dispatch({type: 'ADD_TOMATO'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
