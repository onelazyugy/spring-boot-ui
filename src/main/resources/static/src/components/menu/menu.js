import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

export class Menu extends Component {

    constructor(props, context) {
        super(props, context);
    }

    selectMenu = (event) => {
        let parent = document.getElementById('menu');
        for (let i = 0; i < parent.children.length; i++) {
            let anchor = parent.children[i].children[0];
            anchor.classList.remove('active');
        }
        document.getElementById(event.target.id).classList.add('active');

        let id = event.target.id;
        let newRoute = '/';
        if (id === 'home') {
            newRoute += 'home';
        } else {
            newRoute += 'home/' + event.target.id;
        }
        this.props.history.push(newRoute);
    }

    render() {
        return (
            <div className="sidenav scrollable">
                <ul className="nav" id="menu">
                    <li><a onClick={this.selectMenu} className="active" id="home"><i className="icon_home" />Home</a></li>
                    <li><a onClick={this.selectMenu} id="components"><i className="icon_dashboard" />Components</a></li>
                </ul>
            </div>
        );
    }
}

Menu.propTypes = {
    history: PropTypes.object
};

export default withRouter(Menu);
