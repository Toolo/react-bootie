import React, {PropTypes} from 'react';
import AutoBindComponent from './AutoBindComponent';
import classnames from 'classnames';
import constants from './constants';
import './ViewSelector.css';

/** @extends React.PureComponent */
class ViewSelector extends AutoBindComponent {
    static propTypes = {
        activeView: PropTypes.string.isRequired,
        onMapViewSelected: PropTypes.func.isRequired,
        onListViewSelected: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="view-selector">
                <div className="btn-group">
                    <button className={classnames('btn btn-default', {active: this.props.activeView === constants.LIST_VIEW})} onClick={this.onListViewSelected}><span className="fa fa-th-list"/>
                    </button>
                    <button className={classnames('btn btn-default', {active: this.props.activeView === constants.MAP_VIEW})} onClick={this.onMapViewSelected}><span className="fa fa-map"/>
                    </button>
                </div>
            </div>
        );
    }

    onMapViewSelected() {
        this.props.onMapViewSelected();
    }

    onListViewSelected() {
        this.props.onListViewSelected();
    }

}

export default ViewSelector;

