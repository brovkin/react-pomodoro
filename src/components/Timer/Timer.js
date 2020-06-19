import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Timer.css';

class Timer extends Component {

    fixZero(value) {
        console.log('fixZero', value);
        if (value.toString().length === 1) {
            return '0' + value;
        }

        return value;
    }

    render() {
        return (
            <div>

                <div className="timer__time-block">
                    <h1>Рабочее время</h1>
                    {`${this.fixZero(this.props.workMinutes)}:${this.fixZero(this.props.seconds)}`}
                    <h1>Перерыв</h1>
                    {`${this.fixZero(this.props.restMinutes)}:${this.fixZero(this.props.seconds)}`}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        workMinutes: state.workMinutes,
        restMinutes: state.restMinutes,
        seconds: state.seconds
    }
};

export default connect(mapStateToProps)(Timer);
