import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ComponentShowcase extends Component {

    constructor(props, context) {
        super(props, context);

        this.store = context.store;
    }

    render() {
        return (
            <div>
                This is the ComponentShowcase!
            </div>
        );
    }
}

ComponentShowcase.contextTypes = {
    store: PropTypes.object
};

ComponentShowcase.propTypes = {
    history: PropTypes.object
};

export default ComponentShowcase;
