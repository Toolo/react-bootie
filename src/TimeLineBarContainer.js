import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import AutoBindComponent from './AutoBindComponent';
import TimeLineBar from './TimeLineBar';
import {updateTimeLine} from './actions';

class TimeLineBarContainer extends AutoBindComponent {

    static propTypes = {
        initialDate: PropTypes.number.isRequired,
        endDate: PropTypes.number.isRequired,
        updateTimeLine: PropTypes.func.isRequired
    };

    render() {
        const {initialDate, endDate} = this.props;
        return (
            <TimeLineBar initialDate={initialDate} endDate={endDate} onChange={this.onChange}/>
        );
    }

    onChange({initialDate, endDate}) {
        this.props.updateTimeLine({
            initialDate,
            endDate
        });
    }
}

function select(state) {
    const initialDate = new Date().getTime() - (1000 * 60 * 60 * 24 * 365 * 5);
    const endDate = new Date().getTime();
    return {
        initialDate,
        endDate
    };
}

export default connect(select, {
    updateTimeLine
})(TimeLineBarContainer);
