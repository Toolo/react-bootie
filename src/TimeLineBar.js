import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import './TimeLineBar.css';

export default class TimeLineBar extends AutoBindComponent {
    render() {
        return (
            <div className="time-line-bar">
                <Range/>
            </div>
        );
    }
}
