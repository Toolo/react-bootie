import React from 'react';
import autobind from 'react-autobind';

/** @extends React.PureComponent */
class AutoBindComponent extends React.PureComponent {

    constructor() {
        super();
        autobind(this);
    }
}

export default AutoBindComponent;

