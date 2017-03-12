import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import classnames from 'classnames';
import TimeLineBar from './TimeLineBar';
import './SearchBar.css';

/** @extends React.PureComponent */
class SearchBar extends AutoBindComponent {
    static MAX_TYPEAHEAD_RESULTS = 3;
    static propTypes = {
        filter: PropTypes.string.isRequired,
        currentEvent: PropTypes.object.isRequired,
        events: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        onEventClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="search-bar">
                <input type="search" value={this.props.filter} className="form-control" placeholder="Search..."
                       onChange={this.onChange}
                       onKeyUp={this.onKeyUp}
                />
                <span className="search-icon fa fa-search"/>
                {this.renderTypeAhead()}
            </div>
        );
    }

    renderTypeAhead() {
        const {events, filter} = this.props;
        return (
            <div className={classnames('search-type-ahead', {'filtering': this.isFiltering()})}>
                {filter && !events.length ? this.renderNoSearchResults() : this.renderSearchResults()}
            </div>
        );
    }

    isFiltering() {
        return this.props.filter && this.props.filter !== this.props.currentEvent.name;
    }

    renderNoSearchResults() {
        return (
            <div className="no-search-results">
                There are no events matching the filter '{this.props.filter}'.
            </div>
        );
    }

    renderSearchResults() {
        return this.props.events.slice(0, SearchBar.MAX_TYPEAHEAD_RESULTS).map(event => {
            return (
                <div className="search-result" key={event.id} onClick={this.onEventClick.bind(this, event)}>
                    <span className="event-name">{event.name}</span><span
                    className="event-date">{TimeLineBar.formatDate(event.time)}</span>
                </div>
            );
        });
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    onKeyUp(e) {
        // TODO implement typeahead highlighting
    }

    onEventClick(event) {
        this.props.onEventClick(event);
    }
}

export default SearchBar;

