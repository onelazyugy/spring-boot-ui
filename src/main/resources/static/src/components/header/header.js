import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppVersion, CONFIG } from 'globals';

export default class Header extends Component {

    constructor(props, context) {
        super(props, context);

        this.name = CONFIG.projectInfo.appName;
        this.version = AppVersion;
    }

    render() {
        return (
            <div className="header">
                <div className="header-logo">
                    <i className="icon_homedepot" />
                </div>
                <div className="header-info">
                    <label className="product-info">{this.name}<label className="version"> v{this.version}</label></label>
                    {!this.props.empty && this.props.userProfile && <label className="user-info">{this.props.userProfile.full_name}</label>}
                    {this.props.empty && <label className="user-info">Login</label>}
                </div>
                <div className="header-search" />
                <div className="header-actions">
                    {!this.props.empty &&
                        <div onClick={this.props.logout}><i className="icon_exit_to_app" />Logout</div>
                    }
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func,
    empty: PropTypes.bool.isRequired,
    userProfile: PropTypes.object
};
