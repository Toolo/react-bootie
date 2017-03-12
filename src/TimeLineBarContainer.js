import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import AutoBindComponent from './AutoBindComponent';
import TimeLineBar from './TimeLineBar';
import {updateTimeLine} from './actions';
import {initialDateSelector, endDateSelector} from './selectors';

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
    return {
        initialDate: initialDateSelector(state),
        endDate: endDateSelector(state)
    };
}

export default connect(select, {
    updateTimeLine
})(TimeLineBarContainer);
