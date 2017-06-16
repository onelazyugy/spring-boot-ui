import React, { Component } from 'react';

export default class HomeInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="home-message flex-column">
                    <label className="home-title">React + Redux Framework</label>
                    <span>This framework contains the following features to help kickstart your product <i>(*=still in development)</i></span>
                </div>
                <div className="home-links flex-row">
                    <a className="button" href="http://ux.homedepot.com/style-guide/" target="_blank">View Style Guide</a>
                    <a className="button" href="https://github.homedepot.com/ux/react-framework" target="_blank">View GitHub Page</a>
                </div>
                <div className="home-features">
                    <div className="flex-column">
                        <img src="assets/react-redux.png" />
                        <label className="feature-header">React + Redux</label>
                        <label>React-Redux Router</label>
                        <label>Redux Thunk</label>
                        <label>Webpack</label>
                    </div>
                    <div className="flex-column">
                        <i className="icon_eux" />
                        <label className="feature-header">UX STANDARDS</label>
                        <label>Style Guide</label>
                        <label>Pattern Library</label>
                        <label>Analytics*</label>
                    </div>
                    <div className="flex-column">
                        <i className="icon_devices" />
                        <label className="feature-header">DESKTOP & MOBILE</label>
                        <label>Mobile First*</label>
                        <label>Repsonsive Design*</label>
                        <label>Cross Platform</label>
                    </div>
                    <div className="flex-column">
                        <img src="assets/pcf.png" />
                        <label className="feature-header">PIVOTAL CLOUD FOUNDRY</label>
                        <label>Node.js & Express.js Server</label>
                        <label>Generates Manifest Files</label>
                        <label>Multiple Environment Configs</label>
                    </div>
                    <div className="flex-column">
                        <i className="icon_bug" />
                        <label className="feature-header">TDD</label>
                        <label>Jest & Enzyme</label>
                        <label>Snapshot Testing</label>
                        <label>Test Coverage Reports</label>
                    </div>
                    <div className="flex-column">
                        <i className="icon_homedepot" />
                        <label className="feature-header">THD INTEGRATIONS</label>
                        <label>Single Sign On</label>
                        <label>Security Static Analysis*</label>
                        <label>CI/CD Workflow*</label>
                    </div>
                </div>
            </div>
        );
    }
}
