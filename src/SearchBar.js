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

    constructor() {
        super();

        this.state = {
            highlightedResult: null,
            filter: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.events !== this.props.events) {
            this.setState({
                highlightedResult: null
            });
        }
        if (prevProps.filter !== this.props.filter) {
            this.setState({
                filter: this.props.filter
            });
        }
    }

    render() {
        return (
            <div className="search-bar">
                <label className="sr-only" htmlFor="search">Search</label>
                <input type="search" value={this.state.filter}
                       name="search"
                       id="search"
                       className="form-control"
                       placeholder="Search..."
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
        return this.props.events.slice(0, SearchBar.MAX_TYPEAHEAD_RESULTS).map((event, index) => {
            return (
                <div className={classnames('search-result', {highlight: this.state.highlightedResult === index})}
                     key={event.id}
                     onClick={this.onEventClick.bind(this, event)}>
                    <span className="event-name">{event.name}</span><span
                    className="event-date">{TimeLineBar.formatDate(event.time)}</span>
                </div>
            );
        });
    }

    onChange(e) {
        const filter = e.target.value;
        this.setState({filter});
        this.props.onChange(filter);
    }

    onKeyUp(e) {
        const KEY_UP = 38;
        const KEY_DOWN = 40;
        const KEY_INTRO = 13;
        const totalResults = Math.min(this.props.events.length, SearchBar.MAX_TYPEAHEAD_RESULTS);
        switch (e.keyCode) {
            case KEY_DOWN:
                if (this.state.highlightedResult === null) {
                    this.setState({highlightedResult: 0});
                } else {
                    this.setState({highlightedResult: Math.min(this.state.highlightedResult + 1, totalResults - 1)});
                }
                break;
            case KEY_UP:
                if (this.state.highlightedResult) {
                    this.setState({
                        highlightedResult: Math.max(this.state.highlightedResult - 1, 0)
                    });
                }
                break;
            case KEY_INTRO:
                if (this.state.highlightedResult !== null) {
                    const event = this.props.events[this.state.highlightedResult];
                    this.props.onEventClick(event);
                }
                break;
            default:
                return;
        }
    }

    onEventClick(event) {
        this.props.onEventClick(event);
    }
}

export default SearchBar;

