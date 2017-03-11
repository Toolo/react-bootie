import React, {PureComponent, PropTypes} from 'react';
import './SearchBar.css';

/** @extends React.PureComponent */
class SearchBar extends PureComponent {
    static propTypes = {};

    render() {
        return (
            <div className="search-bar">
                <div className="input-group input-lg">
                    <input type="search" className="form-control" placeholder="Search..."/>
                    <span className="input-group-btn"><button className="btn btn-link" type="button">Search</button></span>
                </div>
            </div>
        );
    }
}

export default SearchBar;

