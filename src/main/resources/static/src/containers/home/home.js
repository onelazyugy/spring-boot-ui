import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Header from 'components/header/header';
import Menu from 'components/menu/menu';
import HomeInfo from './home-info';
import ComponentShowcase from 'containers/component-showcase/component-showcase';
import * as LoginActions from 'actions/loginActions';

export class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.store = context.store;

        let loginState = this.store.getState().login;
        if (loginState.userProfile) {
            this.userProfile = loginState.userProfile;
        } else if (sessionStorage.getItem('userProfile')) {
            this.userProfile = JSON.parse(atob(sessionStorage.getItem('userProfile')));
        } else {
            this.userProfile = null;
        }
    }

    componentDidMount() {
        let useLogin = this.store.getState().login.useLogin;
        if (useLogin === true) {
            let unsubscribe = this.store.subscribe(() => {
                let loginState = this.store.getState().login;
                let sessionProfile = sessionStorage.getItem('userProfile');
                if (loginState.userProfile === null && sessionProfile === null) {
                    unsubscribe();
                    this.props.history.push('/login');
                }
            });
        }
    }

    render() {
        return (
            <div className="home">
                <Header empty={this.userProfile === null} userProfile={this.userProfile} logout={this.props.actions.logoutUser} />
                <div className="home-layout navigation-wrapper">
                    <Menu />
                    <div className="home-content">
                        <Route exact path="/home" component={HomeInfo} />
                        <Route path="/home/components" component={ComponentShowcase} />
                    </div>
                </div>
            </div>
        );
    }
}

Home.contextTypes = {
    store: PropTypes.object
};

Home.propTypes = {
    actions: PropTypes.object.isRequired,
    history: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(LoginActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Home);
