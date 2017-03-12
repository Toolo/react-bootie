import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import {updateFilter} from './actions';
import {filterSelector} from './selectors';

/** @extends React.PureComponent */
class SearchBarContainer extends AutoBindComponent {
    static propTypes = {
        filter: PropTypes.string.isRequired,
        updateFilter: PropTypes.func.isRequired
    };

    render() {
        return (<SearchBar filter={this.props.filter} onChange={this.onChange}/>);
    }

    onChange(filter) {
        this.props.updateFilter({filter});
    }

}

function select(state) {
    return {
        filter: filterSelector(state),
    };
}

export default connect(select, {
    updateFilter
})(SearchBarContainer);

