import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import './TimeLineBar.css';

export default class TimeLineBar extends AutoBindComponent {

    static propTypes = {
        initialDate: PropTypes.number.isRequired,
        endDate: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };

    static MAX_DATE = Date.now();
    static MIN_DATE = TimeLineBar.MAX_DATE - (1000 * 60 * 60 * 24 * 365 * 10);

    render() {
        return (
            <div className="time-line-bar">
                <Range
                    onAfterChange={this.onAfterChange}
                    min={TimeLineBar.MIN_DATE}
                    max={TimeLineBar.MAX_DATE}
                    value={[this.props.initialDate, this.props.endDate]}/>
                <span className="initial-date">{new Date(this.props.initialDate).toLocaleString()}</span>
                &nbsp;to&nbsp;
                <span className="end-date">{new Date(this.props.endDate).toLocaleString()}</span>
            </div>
        );
    }

    onAfterChange([initialDate, endDate]) {
        this.props.onChange({
            initialDate,
            endDate
        });
    }
}
