import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Timer.css';

class Timer extends Component {

    fixZero(value) {
        if (value.toString().length === 1) {
            return '0' + value;
        }
        return value;
    }

    render() {
        return (
            <Fragment>
                <div className="timer__time-block">
                    {this.props.isRest
                        ?
                        <Fragment>
                            <h1 className="timer__time-title">Перерыв</h1>
                            {`${this.fixZero(this.props.restMinutes)}:${this.fixZero(this.props.seconds)}`}
                        </Fragment>
                        :
                        <Fragment>
                            <h1 className="timer__time-title">Рабочее время</h1>
                            {`${this.fixZero(this.props.workMinutes)}:${this.fixZero(this.props.seconds)}`}
                        </Fragment>
                    }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        workMinutes: state.workMinutes,
        restMinutes: state.restMinutes,
        isRest: state.isRest,
        seconds: state.seconds
    }
};

export default connect(mapStateToProps)(Timer);
