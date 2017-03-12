import React, { Component, PropTypes } from 'react';

class Cluster extends Component {
    render() {
        const cluster = this.props.cluster;
        const style = {};
        if (cluster.markers.length === 1) {
            return (
                <div style={style} >{cluster.markers[0].name}</div>
            );
        }

        return (
            <div style={style}>{cluster.markers.length} items</div>
        );
    }
}

Cluster.propTypes = {
    cluster: PropTypes.object.isRequired
};

export default Cluster;
