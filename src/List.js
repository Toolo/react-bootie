import React, { PropTypes } from 'react';
import moment from 'moment';
import AutoBindComponent from './AutoBindComponent';
import './List.css';
import loader from './loader.gif';

class List extends AutoBindComponent {
    render() {
        return (
            <div className="eventList container-fluid">
                <h1 className="col-xs-12 eventList-title">
                    Events happening near you
                </h1>
                {
                    this.props.events.length === 0
                    ? <img className="event-loader col-xs-12" src={loader} />
                    : this.props.events.map(event => (
                        <div className="event col-xs-12" key={event.id}>
                            <div className="panel panel-default">
                                <div className="panel-heading event-title">
                                    <span>{event.name}</span>
                                </div>
                                <div className="panel-body event-body">
                                    <div className="event-info">
                                        <div>
                                            <i className="fa fa-calendar" />
                                            <span>{moment(event.time, 'x').format('MM/DD hh:mm a')}</span>
                                        </div>
                                        <div>
                                            <i className="fa fa-ticket" />
                                            <span>{event.source}</span>
                                        </div>
                                        <div>
                                            <i className="fa fa-map-marker" />
                                            <span>667 mission street</span>
                                        </div>
                                    </div>
                                    <div className="event-link">
                                        <a className="btn btn-primary btn-sm" href={event.url}>Learn more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

List.propTypes = {
    events: PropTypes.array.isRequired
};

export default List;
