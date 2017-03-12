import React, { PropTypes } from 'react';
import moment from 'moment';
import AutoBindComponent from './AutoBindComponent';
import './List.css';

class List extends AutoBindComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 0
        }
    }

    handleScroll(e) {
        const nearToBottom = 100;
        if (document.body.scrollTop + window.innerHeight > document.body.scrollHeight - nearToBottom) {
            this.setState({page: this.state.page + 1});
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    render() {
        return (
            <div className="eventList container-fluid">
                <h1 className="col-xs-12 eventList-title">
                    Events happening near you
                </h1>
                {
                    this.props.events.length === 0
                    ? <div className="col-xs-12 text-center">
                        <span className="fa fa-spinner fa-spin fa-2x" />
                    </div>
                    : this.props.events.slice(0, (this.state.page + 1) * 10).map(event => (
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
                                            <span>{event.address}</span>
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
