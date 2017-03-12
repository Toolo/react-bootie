import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import {Range} from 'rc-slider';
import moment from 'moment';
import 'rc-slider/assets/index.css';
import './TimeLineBar.css';

export default class TimeLineBar extends AutoBindComponent {

    static propTypes = {
        initialDate: PropTypes.number.isRequired,
        endDate: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static STEP = 1000 * 60 * 60 * 24;
    static MAX_DATE = Date.now() + (TimeLineBar.STEP * 187);
    static MIN_DATE = Date.now() - (TimeLineBar.STEP * 187);

    constructor() {
        super();

        this.state = {
            initialDate: TimeLineBar.MIN_DATE,
            endDate: TimeLineBar.MAX_DATE
        };
    }

    componentDidMount() {
        const {initialDate, endDate} = this.props;
        this.setState({initialDate, endDate})
    }

    render() {
        return (
            <div className="time-line-bar">
                <div className="time-line-label">
                    <span className="initial-date">{this.formatDate(this.state.initialDate)}</span>
                    &nbsp;to&nbsp;
                    <span className="end-date">{this.formatDate(this.state.endDate)}</span>
                </div>
                <Range
                    onChange={this.onChange}
                    onAfterChange={this.onAfterChange}
                    min={TimeLineBar.MIN_DATE}
                    max={TimeLineBar.MAX_DATE}
                    step={TimeLineBar.STEP}
                    value={[this.state.initialDate, this.state.endDate]}/>
            </div>
        );
    }

    formatDate(date) {
        return moment(date, 'x').format('MMM-DD-YYYY');
    }

    onChange([initialDate, endDate]) {
        this.setState({initialDate, endDate});
    }

    onAfterChange([initialDate, endDate]) {
        if (this.state.initialDate === this.props.initialDate && this.state.endDate === this.props.endDate) {
            return;
        }
        this.props.onChange({
            initialDate,
            endDate
        });
    }
}
