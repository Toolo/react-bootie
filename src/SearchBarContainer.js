import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import {connect} from 'react-redux';
import './SearchBar.css';

/** @extends React.PureComponent */
class SearchBarContainer extends AutoBindComponent {
    static propTypes = {
        filter: PropTypes.string.isRequired,
        doSearch: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="search-bar">
                <div className="input-group input-lg">
                    <input type="search" className="form-control" placeholder="Search..."/>
                    <span className="input-group-btn"><button className="btn btn-link" type="button" onClick={this.onClick}>Search</button></span>
                </div>
            </div>
        );
    }

    onClick() {
        this.props.doSearch();
    }


}

function select(state) {
    return {

    };
}

export default connect(select)(SearchBarContainer);

