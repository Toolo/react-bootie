import React, {PureComponent, PropTypes} from 'react';
import './TimeLineBar.css';

import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import logo from './logo.png';

export default class TimeLineBar extends PureComponent {
    render() {
        return (
            <div className="time-line-bar">
                <Range/>
            </div>
        );
    }
}
