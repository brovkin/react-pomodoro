import React, { Component } from "react";
import { connect } from 'react-redux';
import './Settings.css';

class Settings extends Component {

    isDisabledWorkMinus = (value) => value <= 1;
    isDisabledWorkPlus = (value) => value === 30;

    isDisabledRestMinus = (value) => !value;
    isDisabledRestPlus = (value) => value === 10;

    disabledClass = (settingsStatus) => settingsStatus ? 'disabled' : '';

    render() {
        return(
            <div className="settings__wrapper col-12">
                <div className="settings__title-block">
                    <h1>Настройки:</h1>
                </div>

                <div className="settings__time-block">
                    <b>Время рабочей сессии:</b>
                    <div className={"settings__btn-group btn-group-md " + (this.disabledClass(this.props.saveSettings))}>
                        <button
                            className="btn btn-lg btn-success"
                            disabled={this.isDisabledWorkMinus(this.props.workMinutes)}
                            onClick={this.props.subWorkMinute}
                        >-</button>
                        <span className="settings__minutes">
                            { this.props.saveSettings ? this.props.settings.work : this.props.workMinutes }
                        </span>
                        <button
                            className="btn btn-lg btn-success"
                            disabled={this.isDisabledWorkPlus(this.props.workMinutes)}
                            onClick={this.props.addWorkMinute}
                        >+</button>
                    </div>
                </div>

                <div className="settings__time-block">
                    <b>Время перерыва между рабочими сессиями:</b>
                    <div className={"settings__btn-group btn-group-md " + (this.disabledClass(this.props.saveSettings))}>
                        <button
                            className="btn btn-lg btn-success"
                            disabled={this.isDisabledRestMinus(this.props.restMinutes)}
                            onClick={this.props.subRestMinute}>-</button>
                        <span className="settings__minutes">
                            { this.props.saveSettings ? this.props.settings.rest : this.props.restMinutes }
                        </span>
                        <button
                            className="btn btn-lg btn-success"
                            disabled={this.isDisabledRestPlus(this.props.restMinutes)}
                            onClick={this.props.addRestMinute}
                        >+</button>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        workMinutes: state.workMinutes,
        restMinutes: state.restMinutes,
        settings: state.settings,
        isWork: state.isWork,
        seconds: state.seconds,
        saveSettings: state.saveSettings
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addWorkMinute: () => dispatch({type: 'ADD_WORK_MINUTE'}),
        subWorkMinute: () => dispatch({type: 'SUB_WORK_MINUTE'}),
        addRestMinute: () => dispatch({type: 'ADD_REST_MINUTE'}),
        subRestMinute: () => dispatch({type: 'SUB_REST_MINUTE'}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
