import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import {updateFilter, setCurrentEvent} from './actions';
import {filterSelector, filteredEventsSelector, currentEventSelector} from './selectors';

/** @extends React.PureComponent */
class SearchBarContainer extends AutoBindComponent {
    static propTypes = {
        filter: PropTypes.string.isRequired,
        events: PropTypes.array.isRequired,
        currentEvent: PropTypes.object.isRequired,
        updateFilter: PropTypes.func.isRequired,
        setCurrentEvent: PropTypes.func.isRequired
    };

    render() {
        return (<SearchBar filter={this.props.filter}
                           events={this.props.events}
                           currentEvent={this.props.currentEvent}
                           onChange={this.onChange}
                           onEventClick={this.onEventClick}/>);
    }

    onChange(filter) {
        this.props.updateFilter({filter});
    }

    onEventClick(event) {
        this.props.setCurrentEvent({event});
    }

}

function select(state) {
    return {
        filter: filterSelector(state),
        events: filteredEventsSelector(state),
        currentEvent: currentEventSelector(state)
    };
}

export default connect(select, {
    updateFilter,
    setCurrentEvent
})(SearchBarContainer);

