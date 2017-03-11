import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import './SearchBar.css';

/** @extends React.PureComponent */
class SearchBar extends AutoBindComponent {
    static propTypes = {
        filter: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="search-bar">
                <input type="search" className="form-control" placeholder="Search..." onChange={this.onChange}/>
                <span className="search-icon fa fa-search"/>
            </div>
        );
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }
}

export default SearchBar;

